import LayoutMain from "components/Layout/LayoutMain";
import { GetStaticProps, NextPage } from "next";
import ThankYouMain from "components/ThankYou/ThankYouMain";
import { SinglePageVars, SiteCtx, siteFromLocale } from "ctx/siteCtx";
import {
  GLOBAL,
  Global,
  GlobalQueryVars,
  THANK_YOU,
  ThankYou,
  useThankYouData
} from "queries";
import { addApolloState } from "lib/apolloLib";
import { initializeApollo } from "lib/apollo";
import { getPreviewToken } from "lib/preview";
import { FC } from "react";

const ThankYouLayout: FC = () => {
  const {
    thankYou: { seomatic }
  } = useThankYouData();

  return (
    <LayoutMain seoMarkup={seomatic}>
      <ThankYouMain />
    </LayoutMain>
  );
};

const ThankYouPage: NextPage<SinglePageVars> = ({ site }) => {
  return (
    <SiteCtx.Provider value={{ site }}>
      <ThankYouLayout />
    </SiteCtx.Provider>
  );
};

export default ThankYouPage;

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
    apolloClient.query<ThankYou, SinglePageVars>({
      query: THANK_YOU,
      context,
      variables: { site }
    })
  ]);

  const { thankYou } = pageRes.data || {};

  return addApolloState(apolloClient, {
    notFound: !thankYou,
    props: { site },
    revalidate: 60 * 3
  });
};
