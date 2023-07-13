import { useState, useEffect, ComponentType } from "react";
import { NextPage } from "next";

interface WithIsClientProps {
	isClient: boolean;
}

export const withIsClient = <P extends object>(
	Component: ComponentType<P & WithIsClientProps>,
): ComponentType<P> => {
	const WithIsClient: NextPage<P> = (props) => {
		const [isClient, setIsClient] = useState(false);

		useEffect(() => {
			setIsClient(true);
		}, []);

		if (!isClient) {
			return null;
		}

		return <Component {...props} isClient={isClient} />;
	};

	return WithIsClient;
};
