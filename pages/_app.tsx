import { PagePropsProvider } from "@/contexts/PagePropsContext";
import { AppModule } from "@/layouts";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<PagePropsProvider props={pageProps}>
			<AppModule>
				<Component {...pageProps} />
			</AppModule>
		</PagePropsProvider>
	);
}
