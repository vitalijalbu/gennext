import { gql } from "@apollo/client";
import { addApolloState } from "lib/apolloLib";
import ErrorPageMain from "components/ErrorPage/ErrorPageMain";
import Layout from "components/Layout/LayoutMain";
import { SiteNames, siteFromLocale } from "ctx/siteCtx";
import { initializeApollo } from "lib/apollo";
import { NextPage, NextPageContext } from "next";
import { GLOBAL, Global, GlobalQueryVars } from "queries";

interface ErrorProps {
  statusCode?: number;
  site: SiteNames;
}

const ErrorNextPage: NextPage<ErrorProps> = (props) => {
  return (
    <Layout>
      <ErrorPageMain {...props} />
    </Layout>
  );
};

export default ErrorNextPage;

ErrorNextPage.getInitialProps = async (
  ctx: NextPageContext
): Promise<ErrorProps> => {
  const { res, err } = ctx;
  const site = siteFromLocale(ctx.locale);
  const apolloClient = initializeApollo();
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  const uri = ctx.asPath;
  const redirectRes = await apolloClient.query({
    query: REDIRECT,
    variables: { uri }
  });
  const redirect =
    redirectRes.data && redirectRes.data.retour
      ? redirectRes.data.retour
      : null;

  if (
    redirect &&
    typeof redirect.redirectHttpCode === "number" &&
    typeof redirect.redirectDestUrl === "string"
  ) {
    if (ctx.res) {
      ctx.res.writeHead(redirect.redirectHttpCode, {
        Location: redirect.redirectDestUrl
      });
      ctx.res.end();
    } else {
      window.location.reload();
    }

    return { site };
  }

  await apolloClient.query<Global, GlobalQueryVars>({
    query: GLOBAL,
    context: { clientName: "cacheable" },
    variables: { site }
  });

  const state = addApolloState(apolloClient, {
    props: {
      statusCode,
      site
    }
  }) as { props: { statusCode: number; site: SiteNames } };

  return state.props;
};

const REDIRECT = gql`
  query ($uri: String) {
    retour(uri: $uri) {
      id
      redirectSrcUrl
      redirectDestUrl
      redirectSrcMatch
      redirectHttpCode
      redirectMatchType
      redirectSrcUrlParsed
    }
  }
`;
