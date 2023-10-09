import LayoutMain from "components/Layout/LayoutMain";
import { GetStaticProps, NextPage } from "next";
import { SinglePageVars, SiteCtx, siteFromLocale } from "ctx/siteCtx";
import {
    GLOBAL,
    Global,
    GlobalQueryVars,
    BLOG,
    Blog
  } from "queries";
import { addApolloState } from "lib/apolloLib";
import { initializeApollo } from "lib/apollo";
import { getPreviewToken } from "lib/preview";
import { FC } from "react";
import BlogMain from "components/Blog/BlogMain";


const BlogLayout: FC = () => {

  const seomatic = {
    metaTitleContainer: "<title>Blogs</title>",
    metaTagContainer: null,
    metaLinkContainer: "<link href=\"https://gennext.mortgage/blog\" rel=\"canonical\"><link href=\"https://gennext.mortgage\" rel=\"home\"><link type=\"text/plain\" href=\"https://gennext.mortgage/humans.txt\" rel=\"author\">",
  }
 
  return (
    <LayoutMain seoMarkup={seomatic}>
      <BlogMain />
    </LayoutMain>
  );
};

const BlogPage: NextPage<SinglePageVars> = ({ site }) => {
  return (
    <SiteCtx.Provider value={{ site }}>
      <BlogLayout />
    </SiteCtx.Provider>
  );
};

export default BlogPage;

export const getStaticProps: GetStaticProps = async (ctx) => {
    const token = getPreviewToken(ctx.previewData);
    const site = siteFromLocale(ctx.locale);
    const apolloClient = initializeApollo(null, { token });
    const context = ctx.preview ? {} : { clientName: "cacheable" };
  
    const [,pageRes] = await Promise.all([
      apolloClient.query<Global, GlobalQueryVars>({
        query: GLOBAL,
        context,
        variables: { site }
      }),
      apolloClient.query<Blog>({
        query: BLOG,
        context,
        variables: { site }
      })
    ]);

    const { blog } = pageRes.data || {};

    return addApolloState(apolloClient, {
      notFound: !blog,
      props: { site },
      revalidate: 60 * 3
    });
  };
