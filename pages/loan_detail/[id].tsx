import LayoutMain from "components/Layout/LayoutMain";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { SinglePageVars, SiteCtx, siteFromLocale } from "ctx/siteCtx";
import {
    GLOBAL,
    Global,
    GlobalQueryVars,
    LOANDETAIL,
    LoanDetail,
  } from "queries";
import { addApolloState } from "lib/apolloLib";
import { initializeApollo } from "lib/apollo";
import { getPreviewToken } from "lib/preview";
import { FC } from "react";
import LoanDetailMain from "components/LoanDetails/LoanDetails";
import { useRouter } from "next/router";

const LoanDetailsLayout: FC = () => {
  const router = useRouter();
  const id  = router.query.id;

  const title = String(router.query.id).replace(/-/g, ' ').split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  console.log(title , " Title");
  const seomatic = {
    metaTitleContainer: `<title>${title}</title>`,
    metaTagContainer: null,
    metaLinkContainer: "<link href=\"https://gennext.mortgage/loan_detail\" rel=\"canonical\"><link href=\"https://gennext.mortgage\" rel=\"home\"><link type=\"text/plain\" href=\"https://gennext.mortgage/humans.txt\" rel=\"author\">",
  }

  return (
    <LayoutMain seoMarkup={seomatic}>
      <LoanDetailMain name={String(id)}/>
    </LayoutMain>
  );
};

const LoanDetailPage: NextPage<SinglePageVars> = ({ site }) => {
  return (
    <SiteCtx.Provider value={{ site }}>
      <LoanDetailsLayout />
    </SiteCtx.Provider>
  );
};

export default LoanDetailPage;


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
        query: LOANDETAIL,
        context,
        variables: { site },
      })
    ]);
  
    const { loanDetail } = pageRes.data || {};
  
    return addApolloState(apolloClient, {
      notFound: !loanDetail,
      props: { site },
      revalidate: 60 * 3
    });
  };



