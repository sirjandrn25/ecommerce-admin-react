import { ReactNode, lazy, useEffect } from "react";
import Header from "./Components/header.component";
import CustomSidebar from "./Components/sidebar.component";
import { AUTH_ROUTE } from "@Constants/route.constant";
import useNavigation from "@Hooks/useNavigation.hook";
import useAuth from "./Hooks/useAuth.hook";

type dashboardWrapperProps = {
  children: ReactNode;
};

const DashboardWrapper = ({ children }: dashboardWrapperProps) => {
  const { navigation } = useNavigation();

  const { isLogged, isPrivateRoute } = useAuth();
  useEffect(() => {
    if (!isLogged && isPrivateRoute) {
      return navigation({ pathname: AUTH_ROUTE });
    }
  }, [isLogged, isPrivateRoute, navigation]);

  if (!isLogged && !isPrivateRoute) {
    return <div>{children}</div>;
  }
  return (
    <div className="flex w-screen max-h-full min-h-screen bg-base-200">
      <CustomSidebar />

      <main className="w-full h-full">
        <Header />
        {children}
      </main>
    </div>
  );
};

export default DashboardWrapper;
