import type { AppProps } from "next/app";
import "../styles/globals.scss";

import SlidingPaneWrapper from "@Components/SlidingPane/slidingPaneWrapper.component";
import SlidingPaneUtil from "@Utils/slidingPane.utils";
import dynamic from "next/dynamic";

import ModalWrapper from "@Components/Modal/modalWrapper.component";
import ModalUtil from "@Utils/modal.utils";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy } from "react";
import { ProSidebarProvider } from "react-pro-sidebar";
import { store } from "src/Store/store";
import { Provider } from "react-redux";

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
      <Provider store={store}>
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
            <ModalWrapper
              ref={(ref) => {
                if (ref) {
                  ModalUtil.register(ref);
                }
              }}
            />
          </div>
        </RootContextProvider>
      </Provider>
    </QueryClientProvider>
  );
}
