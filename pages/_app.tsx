import { useEffect } from "react";
import "../styles/globals.scss";
import type { AppProps } from "next/app";
import RootContextProvider from "../src/Context/rootContextProvider";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<RootContextProvider>
			<Component {...pageProps} />
		</RootContextProvider>
	);
}
