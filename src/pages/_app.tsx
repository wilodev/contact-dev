import "../styles/globals.css";
import { Provider } from "react-redux";
import type { AppProps } from "next/app";
import { AppLayout } from "../layouts/appLayout";
import { store } from "../store";
import { NextDataHooksProvider } from "next-data-hooks";
function MyApp({ Component, pageProps }: AppProps) {
  const { children, ...rest } = pageProps;
  return (
    <Provider store={store}>
      <NextDataHooksProvider {...rest}>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </NextDataHooksProvider>
    </Provider>
  );
}

export default MyApp;
