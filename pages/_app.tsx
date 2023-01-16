import type { AppProps } from "next/app";
import "../styles/globals.scss";

import dynamic from "next/dynamic";

const RootContextProvider = dynamic(
	() => import("../src/Context/rootContextProvider"),
	{
		loading: () => <div>loading ...</div>,
		ssr: false,
	}
);

export default function App({ Component, pageProps }: AppProps) {
	return (
		<RootContextProvider>
			<Component {...pageProps} />
		</RootContextProvider>
	);
}
