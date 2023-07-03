import Login from "@/src/screens/login/Login";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const LoginForm = () => {
	const { data, status } = useSession();
	const { replace } = useRouter();

	if (status == "loading") {
		return null;
	}
	if (data) {
		replace("/profile");
		return null;
	}

	return <Login />;
};

export default LoginForm;
