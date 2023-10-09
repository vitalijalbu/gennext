import LayoutMain from "components/Layout/LayoutMain";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { SinglePageVars, SiteCtx, siteFromLocale } from "ctx/siteCtx";
import {
    GLOBAL,
    Global,
    GlobalQueryVars,
    BLOGDETAIL,
    BlogDetail
  } from "queries";
import { addApolloState } from "lib/apolloLib";
import { initializeApollo } from "lib/apollo";
import { getPreviewToken } from "lib/preview";
import { FC } from "react";
import BlogDetailMain from "components/BlogDetails/BlogDetailMain";
import { useRouter } from "next/router";


const BlogDetailLayout: FC = () => {
  const router = useRouter();
  const id  = router.query.id;

  const seomatic = {
    metaTitleContainer: "<title>Blog</title>",
    metaTagContainer: null,
    metaLinkContainer: "<link href=\"https://gennext.mortgage/blog_detail\" rel=\"canonical\"><link href=\"https://gennext.mortgage\" rel=\"home\"><link type=\"text/plain\" href=\"https://gennext.mortgage/humans.txt\" rel=\"author\">",
  }
  
  return (
    <LayoutMain seoMarkup={seomatic}>
      <BlogDetailMain id={String(id)}/>
    </LayoutMain>
  );
};

const BlogDetailPage: NextPage<SinglePageVars> = ({ site }) => {
  return (
    <SiteCtx.Provider value={{ site }}>
      <BlogDetailLayout />
    </SiteCtx.Provider>
  );
};

export default BlogDetailPage;

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
      apolloClient.query<BlogDetail>({
        query: BLOGDETAIL,
        context,
        variables: { site }
      })
    ]);
  
    const { blogdetail } = pageRes.data || {};
  
    return addApolloState(apolloClient, {
      notFound: !blogdetail,
      props: { site },
      revalidate: 60 * 3
    });
  };
