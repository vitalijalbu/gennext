import { ApolloProvider } from "@apollo/client";
import "intersection-observer";
import { useApollo } from "lib/apollo";
import { AppProps } from "next/app";
import Router, { useRouter } from "next/router";
import "node_modules/nprogress/nprogress.css";
import NProgress from "nprogress";
import { FC } from "react";
import "styles/index.scss";
import "../components/Loan/Sections/loan_style.css"

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

const CustomApp: FC<AppProps> = (appProps) => {
  const { Component, pageProps } = appProps;
  const router = useRouter();
  const apolloClient = useApollo(pageProps);

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} key={router.asPath} />
    </ApolloProvider>
  );
};

export default CustomApp;
