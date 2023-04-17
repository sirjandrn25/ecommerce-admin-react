import React from "react";
import { ThemeProvider as ThemeContextProvider } from "./useTheme.context";
import { AuthProvider, createRefresh } from "react-auth-kit";
import { useLocation } from "react-use";
import { BASE_URL } from "@Constants/api.constant";
import axios from "axios";

type RootContextProviderProps = {
  children: React.ReactNode;
};

const refreshApi = createRefresh({
  interval: 3, // Refreshs the token in every 10 minutes
  refreshApiCallback: async ({
    // arguments
    authToken,
    refreshToken,
  }) => {
    // API container function
    try {
      const response = await axios.post(
        `${BASE_URL}/auth/refresh_token`,
        { token: refreshToken },
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      const { access_token } = response?.data || {};

      return {
        isSuccess: true,
        newAuthToken: access_token,
        newAuthTokenExpireIn: 3,
        newRefreshTokenExpiresIn: 60,
      };
    } catch (error) {
      return {
        isSuccess: false,
        newAuthToken: "",
        newAuthTokenExpireIn: 0,
        newRefreshTokenExpiresIn: 0,
      };
    }
  },
});

const RootContextProvider = ({ children }: RootContextProviderProps) => {
  const state = useLocation();
  const { host, protocol } = state;
  return (
    <AuthProvider
      authType={"localstorage"}
      authName={"_auth"}
      cookieDomain={host}
      cookieSecure={protocol === "https:"}
      refresh={refreshApi}
    >
      <ThemeContextProvider>{children}</ThemeContextProvider>
    </AuthProvider>
  );
};

export default RootContextProvider;
