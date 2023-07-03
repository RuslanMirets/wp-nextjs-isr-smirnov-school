import Profile from "@/src/screens/profile/Profile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const ProfilePage = () => {
	// const router = useRouter();

	// const session = useSession();

	// useEffect(() => {
	// 	if (!session.data && session.status !== "loading") {
	// 		router.push("/login");
	// 	}
	// }, [session, router]);

	// if (!session.data) return null;

	return <Profile />;
};

export default ProfilePage;
