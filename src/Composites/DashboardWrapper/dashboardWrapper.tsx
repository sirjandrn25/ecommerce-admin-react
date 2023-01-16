import { ReactNode } from "react";
import Header from "./Components/header.component";
import CustomSidebar from "./Components/sidebar.component";

type dashboardWrapperProps = {
	children: ReactNode;
};

const DashboardWrapper = ({ children }: dashboardWrapperProps) => {
	return (
		<div className="h-screen flex  w-screen">
			<CustomSidebar />

			<main className="w-full h-full">
				<Header />
			</main>
		</div>
	);
};

export default DashboardWrapper;
