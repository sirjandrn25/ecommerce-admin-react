import { ReactNode } from "react";
import Header from "./Components/header.component";
import CustomSidebar from "./Components/sidebar.component";

type dashboardWrapperProps = {
  children: ReactNode;
};

const DashboardWrapper = ({ children }: dashboardWrapperProps) => {
  return (
    <div className="flex w-screen h-screen bg-base-200">
      <CustomSidebar />

      <main className="w-full h-full">
        <Header />
        {children}
      </main>
    </div>
  );
};

export default DashboardWrapper;
