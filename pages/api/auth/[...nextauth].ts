import { setCookie } from "nookies";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";
import { initializeApollo } from "@/src/apollo/apolloClient";
import { AuthApollo } from "@/src/apollo/auth.apollo";
import jwt_decode from "jwt-decode";
import { NextApiRequest, NextApiResponse } from "next";
import { NextAuthOptions } from "next-auth";

type NextAuthOptionsCallback = (
	req?: NextApiRequest,
	res?: NextApiResponse,
) => NextAuthOptions;

export const nextAuthOptions: NextAuthOptionsCallback = (
	req?: NextApiRequest,
	res?: NextApiResponse,
) => {
	return {
		providers: [
			CredentialsProvider({
				name: "Credentials",
				credentials: {
					email: { label: "email", type: "email" },
					password: { label: "password", type: "password" },
				},
				async authorize(credentials) {
					if (!credentials?.email || !credentials.password)
						throw new Error("Invalid credentials");

					const apolloClient = initializeApollo();

					const { data } = await apolloClient.mutate({
						mutation: AuthApollo.LOGIN,
						variables: {
							username: credentials?.email,
							password: credentials?.password,
						},
					});

					if (data) {
						const jwtAuthToken = data.login.user.jwtAuthToken;
						const jwtRefreshToken = data.login.user.jwtRefreshToken;

						const decodeJwtAuthToken: any = jwt_decode(jwtAuthToken);
						const decodeJwtRefreshToken: any = jwt_decode(jwtRefreshToken);

						setCookie({ res }, "jwtAuthToken", jwtAuthToken, {
							expires: new Date(decodeJwtAuthToken.exp * 1000),
							path: "/",
						});
						setCookie({ res }, "jwtRefreshToken", jwtRefreshToken, {
							expires: new Date(decodeJwtRefreshToken.exp * 1000),
							path: "/",
						});

						return data.login.user;
					} else return null;
				},
			}),
		],
		pages: {
			signIn: "/login",
		},
		callbacks: {
			async jwt({ token, user }) {
				return { ...token, ...user };
			},

			async session({ session, token }) {
				session.user = token as any;
				return session;
			},
		},
		session: { strategy: "jwt" },
		secret: process.env.NEXTAUTH_SECRET,
	};
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (req: NextApiRequest, res: NextApiResponse) => {
	return NextAuth(req, res, nextAuthOptions(req, res));
};
