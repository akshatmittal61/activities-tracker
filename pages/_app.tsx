import { PagePropsProvider } from "@/contexts/PagePropsContext";
import { AppModule } from "@/layouts";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<meta
					name="viewport"
					content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
				/>
			</Head>
			<PagePropsProvider props={pageProps}>
				<AppModule>
					<Component {...pageProps} />
				</AppModule>
			</PagePropsProvider>
		</>
	);
}
