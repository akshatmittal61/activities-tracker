import { Error } from "@/components";
import { frontendBaseUrl } from "@/constants";
import { Page } from "@/layouts";
import { useRouter } from "next/router";
import React from "react";

type PageNotFoundProps = {
	title?: string;
	description?: string;
	image?: string;
};

const PageNotFound: React.FC<PageNotFoundProps> = ({
	title = "Oops! You seem to be lost",
	description = "The page you are looking for does not exist.",
	image = `${frontendBaseUrl}/vectors/not-found.svg`,
}) => {
	const router = useRouter();
	return (
		<Page>
			<Error
				title={title}
				description={description}
				image={image}
				button={{
					label: "Let's get you home",
					action: () => router.push("/"),
				}}
			/>
		</Page>
	);
};

export default PageNotFound;
