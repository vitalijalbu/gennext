import LayoutMain from "components/Layout/LayoutMain";
import { GetStaticProps, NextPage } from "next";
import HomepageMain from "components/Homepage/HomepageMain";
import { SinglePageVars, SiteCtx, siteFromLocale } from "ctx/siteCtx";
import {
  GLOBAL,
  Global,
  GlobalQueryVars,
  HOMEPAGE,
  Homepage,
  useHomepageData
} from "queries";
import { addApolloState } from "lib/apolloLib";
import { initializeApollo } from "lib/apollo";
import { getPreviewToken } from "lib/preview";
import { FC } from "react";

const HomepageLayout: FC = () => {
  const {
    homepage: { seomatic }
  } = useHomepageData();

  return (
    <LayoutMain seoMarkup={seomatic} hasForm>
      <HomepageMain />
    </LayoutMain>
  );
};

const HomepagePage: NextPage<SinglePageVars> = ({ site }) => {
  return (
    <SiteCtx.Provider value={{ site }}>
      <HomepageLayout />
    </SiteCtx.Provider>
  );
};

export default HomepagePage;

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
    apolloClient.query<Homepage, SinglePageVars>({
      query: HOMEPAGE,
      context,
      variables: { site }
    })
  ]);

  const { homepage } = pageRes.data || {};

  return addApolloState(apolloClient, {
    notFound: !homepage,
    props: { site },
    revalidate: 60 * 3
  });
};
