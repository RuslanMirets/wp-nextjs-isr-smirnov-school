import { useApollo } from "@/src/apollo/apolloClient";
import "@/styles/globals.scss";
import { SessionProvider } from "next-auth/react";
import { ApolloProvider } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
	Hydrate,
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query";
import { queryClientConfig } from "@/src/config/query-client.config";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
	const apolloClient = useApollo(pageProps);

	const [queryClient] = useState(() => new QueryClient(queryClientConfig));

	return (
		<QueryClientProvider client={queryClient}>
			<Hydrate state={pageProps.dehydratedState}>
				<ApolloProvider client={apolloClient}>
					<SessionProvider>
						<ChakraProvider>
							<Component {...pageProps} />
						</ChakraProvider>
					</SessionProvider>
				</ApolloProvider>
			</Hydrate>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}
