import "../styles/globals.scss";
import type { AppProps } from "next/app";
import DashboardWrapper from "../src/Composites/DashboardWrapper/dashboardWrapper";
import { ProSidebarProvider } from "react-pro-sidebar";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ProSidebarProvider>
			<DashboardWrapper>
				<Component {...pageProps} />
			</DashboardWrapper>
		</ProSidebarProvider>
	);
}
