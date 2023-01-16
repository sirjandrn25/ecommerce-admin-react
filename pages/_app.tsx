import type { AppProps } from "next/app";
import "../styles/globals.scss";

import dynamic from "next/dynamic";
import DashboardWrapper from "../src/Composites/DashboardWrapper/dashboardWrapper";
import { ProSidebarProvider } from "react-pro-sidebar";
import CustomSlidingPane from "../src/Components/SlidingPane/slidingPane.component";

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
			<ProSidebarProvider>
				<DashboardWrapper>
					<Component {...pageProps} />
					<CustomSlidingPane />
				</DashboardWrapper>
			</ProSidebarProvider>
		</RootContextProvider>
	);
}
