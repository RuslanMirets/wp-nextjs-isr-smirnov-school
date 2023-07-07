import { onError } from "@apollo/client/link/error";
import { useMemo } from "react";
import {
	ApolloClient,
	ApolloLink,
	HttpLink,
	InMemoryCache,
	NormalizedCacheObject,
	from,
} from "@apollo/client";
import merge from "deepmerge";
import isEqual from "lodash/isEqual";
import { setContext } from "@apollo/client/link/context";
import Cookies from "js-cookie";
import jwtDecode, { JwtPayload } from "jwt-decode";
import { AuthApollo } from "./auth.apollo";

export const APOLLO_STATE_PROP_NAME = "__APOLLO_STATE__";

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

const customFetch = (uri: string, options: any) => {
	const { operationName } = JSON.parse(options.body);
	return fetch(`${uri}?opname=${operationName}`, options);
};

export function isRefreshNeeded(token?: string | null) {
	if (!token) {
		return { valid: false, needRefresh: true };
	}

	const decoded = jwtDecode<JwtPayload>(token);

	if (!decoded) {
		return { valid: false, needRefresh: true };
	}
	if (decoded.exp && Date.now() >= decoded.exp * 1000) {
		return { valid: false, needRefresh: true };
	}
	return { valid: true, needRefresh: false };
}

const refreshAuthToken = async () => {
	const refreshToken = Cookies.get("jwtRefreshToken");

	const apolloClient = initializeApollo();

	if (refreshToken) {
		const newToken = await apolloClient
			.mutate({
				mutation: AuthApollo.REFRESH_TOKEN,
				variables: { jwtRefreshToken: refreshToken },
			})
			.then((res) => {
				const newAccessToken = res.data?.refreshJwtAuthToken?.authToken;
				Cookies.set("jwtAuthToken", newAccessToken);
				return newAccessToken;
			});

		return newToken;
	}
};

const errorLink = onError(({ graphQLErrors, networkError }) => {
	if (graphQLErrors)
		graphQLErrors.forEach(({ message, locations, path }) =>
			console.error(
				`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
			),
		);
	if (networkError) console.error(`[Network error]: ${networkError}`);
});

export const middleware = new ApolloLink((operation, forward) => {
	const session = Cookies.get("woo-session");
	if (session) {
		operation.setContext(({ headers = {} }) => ({
			headers: {
				"woocommerce-session": `Session ${session}`,
			},
		}));
	}

	return forward(operation);
});

export const afterware = new ApolloLink((operation, forward) => {
	return forward(operation).map((response) => {
		const context = operation.getContext();
		const {
			response: { headers },
		} = context;

		const session = headers.get("woocommerce-session");

		if (session) {
			if (session === "false") {
				Cookies.remove("woo-session");
			} else if (Cookies.get("woo-session") !== session) {
				Cookies.set("woo-session", headers.get("woocommerce-session"));
			}
		}

		return response;
	});
});

const httpLink = new HttpLink({
	// uri: `${process.env.WORDPRESS_API_URL}/graphql`,
	uri: "http://localhost/e-commerce/graphql",
	credentials: "same-origin",
	headers: {
		"Content-Type": "application/json",
	},
	fetch: customFetch,
});

const authLink = setContext(async (request, { headers }) => {
	if (request.operationName !== "RefreshAuthToken") {
		let token = Cookies.get("jwtAuthToken");

		const shouldRefresh = isRefreshNeeded(token);

		if (shouldRefresh.needRefresh) {
			const refreshPromise = await refreshAuthToken();

			if (shouldRefresh.valid === false) {
				token = await refreshPromise;
			}
		}

		if (token) {
			return {
				headers: {
					...headers,
					authorization: `Bearer ${token}`,
				},
			};
		}
		return { headers };
	}
	return { headers };
});

// =================================================
const createSessionLink = () => {
	return setContext(async ({ context: { headers: currentHeaders } = {} }) => {
		const headers = { ...currentHeaders };
		const sessionToken = Cookies.get("woo-session");
		const authToken = Cookies.get("jwtAuthToken");

		if (authToken) {
			headers.Authorization = `Bearer ${authToken}`;
		}

		if (sessionToken) {
			headers["woocommerce-session"] = `Session ${sessionToken}`;
		}

		if (authToken || sessionToken) {
			return { headers };
		}

		return {};
	});
};
const createUpdateLink = new ApolloLink((operation, forward) => {
	return forward(operation).map((response) => {
		const context = operation.getContext();
		const {
			response: { headers },
		} = context;

		const session = headers.get("woocommerce-session");

		if (session) {
			if (session === "false") {
				Cookies.remove("woo-session");
			} else if (Cookies.get("woo-session") !== session) {
				Cookies.set("woo-session", headers.get("woocommerce-session"));
			}
		}

		return response;
	});
});
// =================================================

function createApolloClient() {
	return new ApolloClient({
		ssrMode: typeof window === "undefined",
		// link: from([
		// 	errorLink,
		// 	middleware.concat(afterware.concat(authLink.concat(httpLink))),
		// ]),
		// link: from([createSessionLink(), createUpdateLink, httpLink]),
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
