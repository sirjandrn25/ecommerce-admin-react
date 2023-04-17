import type { AppProps } from "next/app";
import "../styles/globals.scss";

import dynamic from "next/dynamic";
import SlidingPaneUtil from "@Utils/slidingPane.utils";
import SlidingPaneWrapper from "@Components/SlidingPane/slidingPaneWrapper.component";

import { ProSidebarProvider } from "react-pro-sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy } from "react";
const queryClient = new QueryClient();

const DashboardWrapper = lazy(
  () => import("@Composites/DashboardWrapper/dashboardWrapper")
);

const RootContextProvider = dynamic(
  () => import("../src/Context/rootContextProvider"),
  {
    loading: () => <div>loading ...</div>,
    ssr: false,
  }
);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <RootContextProvider>
        <div className="root">
          <ProSidebarProvider>
            <DashboardWrapper>
              <Component {...pageProps} />
            </DashboardWrapper>
          </ProSidebarProvider>

          <SlidingPaneWrapper
            ref={(ref) => {
              if (ref) {
                SlidingPaneUtil.register(ref);
              }
            }}
          />
        </div>
      </RootContextProvider>
    </QueryClientProvider>
  );
}
