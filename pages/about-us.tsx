import LayoutMain from "components/Layout/LayoutMain";
import { GetStaticProps, NextPage } from "next";
import AboutMain from "components/About/AboutMain";
import { SinglePageVars, SiteCtx, siteFromLocale } from "ctx/siteCtx";
import {
  GLOBAL,
  Global,
  GlobalQueryVars,
  ABOUT_US,
  AboutUs,
  useAboutUsData
} from "queries";
import { addApolloState } from "lib/apolloLib";
import { initializeApollo } from "lib/apollo";
import { getPreviewToken } from "lib/preview";
import { FC } from "react";

const AboutUsLayout: FC = () => {
  const {
    aboutUs: { seomatic }
  } = useAboutUsData();

  return (
    <LayoutMain seoMarkup={seomatic}>
      <AboutMain />
    </LayoutMain>
  );
};

const AboutUsPage: NextPage<SinglePageVars> = ({ site }) => {
  return (
    <SiteCtx.Provider value={{ site }}>
      <AboutUsLayout />
    </SiteCtx.Provider>
  );
};

export default AboutUsPage;

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
    apolloClient.query<AboutUs, SinglePageVars>({
      query: ABOUT_US,
      context,
      variables: { site }
    })
  ]);

  const { aboutUs } = pageRes.data || {};

  return addApolloState(apolloClient, {
    notFound: !aboutUs,
    props: { site },
    revalidate: 60 * 3
  });
};
