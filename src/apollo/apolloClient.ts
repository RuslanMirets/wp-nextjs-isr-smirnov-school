import { useMemo } from "react";
import {
	ApolloClient,
	HttpLink,
	InMemoryCache,
	NormalizedCacheObject,
	from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import merge from "deepmerge";
import isEqual from "lodash/isEqual";
import { setContext } from "@apollo/client/link/context";
import Cookies from "js-cookie";

export const APOLLO_STATE_PROP_NAME = "__APOLLO_STATE__";

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

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
});

// const authLink = setContext((_, { headers }) => {
// 	const token = Cookies.get("jwtAuthToken");
// 	return {
// 		headers: {
// 			...headers,
// 			authorization: token ? `Bearer ${token}` : "",
// 		},
// 	};
// });

function createApolloClient() {
	return new ApolloClient({
		ssrMode: typeof window === "undefined",
		link: from([errorLink, httpLink]),
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
