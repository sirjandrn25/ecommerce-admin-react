import type { AppProps } from "next/app";
import "../styles/globals.scss";

import SlidingPaneWrapper from "@Components/SlidingPane/slidingPaneWrapper.component";
import SlidingPaneUtil from "@Utils/slidingPane.utils";
import dynamic from "next/dynamic";

import ModalWrapper from "@Components/Modal/modalWrapper.component";
import ModalUtil from "@Utils/modal.utils";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, useCallback } from "react";
import { ProSidebarProvider } from "react-pro-sidebar";
import { store } from "src/Store/store";
import { Provider } from "react-redux";
import { useRouter } from "next/router";

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
  const router = useRouter();
  const { asPath } = router || {};

  const AdminWrapper = useCallback(() => {
    return (
      <ProSidebarProvider>
        <DashboardWrapper>
          <Component {...pageProps} />
        </DashboardWrapper>
      </ProSidebarProvider>
    );
  }, [Component, pageProps]);
  const RenderWrapper = useCallback(() => {
    const isAdmin = asPath.includes("/admin");
    if (isAdmin) return <AdminWrapper />;
    return <Component {...pageProps} />;
  }, [AdminWrapper, Component, asPath, pageProps]);
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <RootContextProvider>
          <div className="root">
            <RenderWrapper />
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
