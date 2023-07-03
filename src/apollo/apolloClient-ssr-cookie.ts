import { useMemo } from "react";
import {
	ApolloClient,
	HttpLink,
	InMemoryCache,
	NormalizedCacheObject,
} from "@apollo/client";
import merge from "deepmerge";
import isEqual from "lodash/isEqual";
import { setContext } from "@apollo/client/link/context";
import nookies from "nookies";
import { GetServerSidePropsContext } from "next";

export const APOLLO_STATE_PROP_NAME = "__APOLLO_STATE__";
export const COOKIES_TOKEN_NAME = "jwtAuthToken";

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

function createApolloClient(ctx?: GetServerSidePropsContext) {
	const httpLink = new HttpLink({
		uri: `${process.env.WORDPRESS_API_URL}/graphql`,
		credentials: "same-origin",
	});

	const authLink = setContext((_, { headers }) => {
		const cookies = nookies.get(ctx);
		const token = cookies.jwtAuthToken;

		return {
			headers: {
				...headers,
				authorization: token ? `Bearer ${token}` : "",
			},
		};
	});

	if (ctx) {
		return new ApolloClient({
			ssrMode: typeof window === "undefined",
			link: authLink.concat(httpLink),
			cache: new InMemoryCache(),
		});
	} else {
		return new ApolloClient({
			ssrMode: typeof window === "undefined",
			link: httpLink,
			cache: new InMemoryCache(),
		});
	}
}

export function initializeApollo(initialState = null, ctx?: any) {
	const _apolloClient = apolloClient ?? createApolloClient(ctx);

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
