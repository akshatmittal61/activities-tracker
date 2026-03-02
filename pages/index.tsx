import { authRouterInterceptor } from "@/client";
import { LandingPageHero } from "@/components";
import { Routes } from "@/constants";
import { Page } from "@/layouts";
import { GetServerSidePropsContext } from "next";
import React from "react";

const HomePage: React.FC = () => {
	return (
		<Page>
			<LandingPageHero />
		</Page>
	);
};

export default HomePage;

export const getServerSideProps = (context: GetServerSidePropsContext) => {
	return authRouterInterceptor(context, {
		onLoggedIn() {
			return {
				redirect: {
					destination: Routes.HOME,
					permanent: false,
				},
			};
		},
		onLoggedOut() {
			return {
				props: {},
			};
		},
	});
};
