import { useMemo } from "react";
import { useAuthUser, useIsAuthenticated, useSignOut } from "react-auth-kit";

import { AUTH_ROUTE, PUBLIC_ROUTE } from "@Constants/route.constant";
import useNavigation from "@Hooks/useNavigation.hook";

const useAuth = () => {
  const isAuthenticated = useIsAuthenticated();
  const { pathname, navigation } = useNavigation();

  const auth = useAuthUser();
  const signOut = useSignOut();

  const handleLogout = () => {
    signOut();
    navigation({
      pathname: AUTH_ROUTE,
    });
  };

  const isPrivateRoute = useMemo(() => {
    return !PUBLIC_ROUTE.includes(pathname);
  }, [pathname]);

  return {
    isLogged: isAuthenticated(),
    isPrivateRoute,
    loggedUser: auth(),
    handleLogout,
  };
};

export default useAuth;
