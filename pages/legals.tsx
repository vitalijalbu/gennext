import LayoutMain from "components/Layout/LayoutMain";
import LegalsMain from "components/Legals/LegalsMain";
import { SinglePageVars, SiteCtx, siteFromLocale } from "ctx/siteCtx";
import { initializeApollo } from "lib/apollo";
import { addApolloState } from "lib/apolloLib";
import { getPreviewToken } from "lib/preview";
import { GetStaticProps, NextPage } from "next";
import { GLOBAL, GlobalQueryVars } from "queries";
import { LEGAL } from "queries/legal";
import { FC } from "react";

const LegalsLayout: FC = () => {
    const seomatic = {
      metaTitleContainer: "<title>Legal</title>",
      metaTagContainer: null,
      metaLinkContainer: "<link href=\"https://gennext.mortgage/legals\" rel=\"canonical\"><link href=\"https://gennext.mortgage\" rel=\"home\"><link type=\"text/plain\" href=\"https://gennext.mortgage/humans.txt\" rel=\"author\">",
    }
  
    return (
      <LayoutMain seoMarkup={seomatic}>
        <LegalsMain />
      </LayoutMain>
    );
  };
  
  const LegalsPage: NextPage<SinglePageVars> = ({ site }) => {
    return (
      <SiteCtx.Provider value={{ site }}>
        <LegalsLayout />
      </SiteCtx.Provider>
    );
  };
  
  export default LegalsPage;
  
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
      apolloClient.query({
        query: LEGAL,
        context,
        variables: { site }
      })
    ]);
  
    const { legal } = pageRes.data || {};
  
    return addApolloState(apolloClient, {
      notFound: !legal,
      props: { site },
      revalidate: 60 * 3
    });
  };