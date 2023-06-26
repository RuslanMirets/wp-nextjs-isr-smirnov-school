// import { NextApiRequest, NextApiResponse } from "next";

// type BodyType = {
// 	secret: string;
// 	key: "blog";
// };

// const pages = {
// 	blog: "/blog",
// };

// export default async function handler(
// 	req: NextApiRequest,
// 	res: NextApiResponse,
// ) {
// 	const { secret, key }: BodyType = req.body;

// 	if (secret !== "secret") {
// 		return res.status(401).json({ message: "Invalid secret" });
// 	}

// 	const revalidatePage = `/${pages[key]}`;

// 	try {
// 		await res.revalidate(revalidatePage);

// 		return res.json({ revalidate: true, revalidatePage: revalidatePage });
// 	} catch (error) {
// 		return res.status(500).send(`Error revalidating page: ${revalidatePage}`);
// 	}
// }

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
): Promise<void> {
	const { path, token } = req.query;

	if ((token as string) !== process.env.REVALIDATION_TOKEN) {
		return res.status(401).json({ message: "Invalid token" });
	} else if ((path as string).length === 0) {
		return res.status(401).json({ message: "Path is required" });
	}

	try {
		await res.revalidate(path as string);
	} catch (err) {
		return res.status(500).send("Error revalidating page");
	}

	return res.status(200).json({
		revalidated: true,
		message: `Path ${path} revalidated successfully`,
	});
}
