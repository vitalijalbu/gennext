import LayoutMain from "components/Layout/LayoutMain";
import { GetStaticProps, NextPage } from "next";
import LoanMain from "components/Loan/LoanMain";
import { SinglePageVars, SiteCtx, siteFromLocale } from "ctx/siteCtx";
import {
  GLOBAL,
  Global,
  GlobalQueryVars,
  LOAN,
  Loan,
  useLoanData,
} from "queries";
import { addApolloState } from "lib/apolloLib";
import { initializeApollo } from "lib/apollo";
import { getPreviewToken } from "lib/preview";
import { FC } from "react";

const LoanLayout: FC = () => {
  const seomatic = {
    metaTitleContainer: "<title>Loan</title>",
    metaTagContainer: null,
    metaLinkContainer: "<link href=\"https://gennext.mortgage/loan\" rel=\"canonical\"><link href=\"https://gennext.mortgage\" rel=\"home\"><link type=\"text/plain\" href=\"https://gennext.mortgage/humans.txt\" rel=\"author\">",
  }

  return (
    <LayoutMain seoMarkup={seomatic}>
      <LoanMain />
    </LayoutMain>
  );
};

const LoanPage: NextPage<SinglePageVars> = ({ site }) => {
  return (
    <SiteCtx.Provider value={{ site }}>
      <LoanLayout />
    </SiteCtx.Provider>
  );
};

export default LoanPage;

export const getStaticProps: GetStaticProps = async (ctx) => {
  const token = getPreviewToken(ctx.previewData);
  const site = siteFromLocale(ctx.locale);
  const apolloClient = initializeApollo(null, { token });
  const context = ctx.preview ? {} : { clientName: "cacheable" };

  const [, pageRes] = await Promise.all([
    apolloClient.query<Global, GlobalQueryVars>({
      query: GLOBAL,
      context,
      variables: { site }
    }),
    apolloClient.query<Loan, SinglePageVars>({
      query: LOAN,
      context,
      variables: { site }
    })
  ]);

  const { loan } = pageRes.data || {};

  return addApolloState(apolloClient, {
    notFound: !loan,
    props: { site },
    revalidate: 60 * 3
  });
};
