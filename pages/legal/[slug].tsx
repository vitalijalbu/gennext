import LayoutMain from "components/Layout/LayoutMain";
import { FC } from "react";
import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { SinglePageVars, SiteCtx, siteFromLocale } from "ctx/siteCtx";
import LegalMain from "components/Legal/LegalMain";
import { getPreviewToken } from "lib/preview";
import { initializeApollo } from "lib/apollo";
import { GLOBAL, GlobalQueryVars } from "queries";
import { LEGAL } from "queries/legal";
import { addApolloState } from "lib/apolloLib";

const LegalLayout: FC = () => {
    const router = useRouter();
    const slug = router.query.slug;
    const seomatic = {
      metaTitleContainer: "<title>Legal</title>",
      metaTagContainer: null,
      metaLinkContainer: "<link href=\"https://gennext.mortgage/legal\" rel=\"canonical\"><link href=\"https://gennext.mortgage\" rel=\"home\"><link type=\"text/plain\" href=\"https://gennext.mortgage/humans.txt\" rel=\"author\">",
    }
  
    return (
      <LayoutMain seoMarkup={seomatic}>
       <LegalMain name={String(slug)}/>
      </LayoutMain>
    );
  };
  
  const LegalPage: NextPage<SinglePageVars> = ({ site }) => {
    return (
      <SiteCtx.Provider value={{ site }}>
        <LegalLayout />
      </SiteCtx.Provider>
    );
  };
  
  export default LegalPage;


  export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {

    return {
        paths: [],
        fallback: 'blocking'
    }
  }
  
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
          variables: { site },
        })
      ]);
    
      const { legal } = pageRes.data || {};
    
      return addApolloState(apolloClient, {
        notFound: !legal,
        props: { site },
        revalidate: 60 * 3
      });
    };