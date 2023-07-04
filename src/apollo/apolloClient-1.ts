import { onError } from "@apollo/client/link/error";
import { useMemo } from "react";
import {
	ApolloClient,
	HttpLink,
	InMemoryCache,
	NormalizedCacheObject,
	from,
} from "@apollo/client";
import merge from "deepmerge";
import isEqual from "lodash/isEqual";
import { setContext } from "@apollo/client/link/context";
import Cookies from "js-cookie";
import { AuthApollo } from "./auth.apollo";
import jwtDecode from "jwt-decode";

export const APOLLO_STATE_PROP_NAME = "__APOLLO_STATE__";

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

const customFetch = (uri: string, options: any) => {
	const { operationName } = JSON.parse(options.body);
	return fetch(`${uri}?opname=${operationName}`, options);
};

export function getTokenState(token?: string | null) {
	if (!token) {
		console.log("No token");
		return { valid: false, needRefresh: true };
	}

	const decoded: any = jwtDecode(token);
	if (!decoded) {
		return { valid: false, needRefresh: true };
	} else if (decoded.exp * 1000 <= Date.now()) {
		return { valid: true, needRefresh: true };
	} else {
		return { valid: true, needRefresh: false };
	}
}

const refreshAuthToken = async () => {
	const apolloClient = initializeApollo();

	return apolloClient
		.mutate({
			mutation: AuthApollo.REFRESH_TOKEN,
		})
		.then((res) => {
			const newAccessToken = res.data?.refreshJwtAuthToken?.authToken;
			Cookies.set("jwtAuthToken", newAccessToken);
			return newAccessToken;
		});
};

const errorLink = onError(({ graphQLErrors, networkError }) => {
	if (graphQLErrors)
		graphQLErrors.forEach(({ message, locations, path }) =>
			console.log(
				`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
			),
		);
	if (networkError) console.log(`[Network error]: ${networkError}`);
});

const httpLink = new HttpLink({
	uri: `${process.env.WORDPRESS_API_URL}/graphql`,
	credentials: "same-origin",
	fetch: customFetch,
});

const authLink = setContext(async (request, { headers }) => {
	if (request.operationName == "RefreshAuthToken") {
		const refreshToken = Cookies.get("jwtRefreshToken");
		if (refreshToken) {
			return {
				headers: {
					...headers,
					authorization: `Bearer ${refreshToken}`,
				},
			};
		} else {
			return { headers };
		}
	}

	let authToken = Cookies.get("jwtAuthToken");

	const tokenState = getTokenState(authToken);

	if (tokenState.needRefresh) {
		const refreshPromise = refreshAuthToken();

		if (tokenState.valid === false) {
			authToken = await refreshPromise;
		}
	}

	if (authToken) {
		return {
			headers: {
				...headers,
				authorization: `Bearer ${authToken}`,
			},
		};
	} else {
		return { headers };
	}
});

function createApolloClient() {
	return new ApolloClient({
		ssrMode: typeof window === "undefined",
		link: from([errorLink, authLink.concat(httpLink)]),
		cache: new InMemoryCache(),
	});
}

export function initializeApollo(initialState = null) {
	const _apolloClient = apolloClient ?? createApolloClient();

	if (initialState) {
		const existingCache = _apolloClient.extract();

		const data = merge(existingCache, initialState, {
			arrayMerge: (destinationArray, sourceArray) => [
				...sourceArray,
				...destinationArray.filter((d) =>
					sourceArray.every((s) => !isEqual(d, s)),
				),
			],
		});

		_apolloClient.cache.restore(data);
	}
	if (typeof window === "undefined") return _apolloClient;
	if (!apolloClient) apolloClient = _apolloClient;

	return _apolloClient;
}

export function addApolloState(
	client: ApolloClient<NormalizedCacheObject>,
	pageProps: any,
) {
	if (pageProps?.props) {
		pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
	}

	return pageProps;
}

export function useApollo(pageProps: any) {
	const state = pageProps[APOLLO_STATE_PROP_NAME];
	const store = useMemo(() => initializeApollo(state), [state]);
	return store;
}
