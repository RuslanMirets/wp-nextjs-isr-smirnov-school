import { UserApollo } from "@/src/apollo/user.apollo";
import Layout from "@/src/components/Layout";
import AuthTime from "@/src/components/auth-time/AuthTime";
import RequestTime from "@/src/components/request-time/RequestTime";
import { useAuthTimeStore } from "@/src/store";
import { IUser } from "@/src/types/user.interface";
import Container from "@/src/ui/container/Container";
import Heading from "@/src/ui/heading/Heading";
import { useQuery } from "@apollo/client";
import { useState } from "react";

const Profile = () => {
	const [requestTime, setRequestTime] = useState(0);

	const { data, loading } = useQuery(UserApollo.GET_PROFILE, {
		onCompleted: (data) => {
			const requestTime = new Date().getTime() - requestStartTime;
			setRequestTime(requestTime);
		},
	});

	const requestStartTime = new Date().getTime();

	const user: IUser = data?.viewer;

	const authTime = useAuthTimeStore((state: any) => state.value);

	return (
		<Layout title="Профиль">
			<Container>
				<Heading>Профиль</Heading>

				<AuthTime authTime={authTime} />

				{loading ? (
					<div>Loading...</div>
				) : (
					<>
						<RequestTime requestTime={requestTime} />
						<div>{user.name}</div>
						<div>{user.email}</div>
					</>
				)}
			</Container>
		</Layout>
	);
};

export default Profile;
