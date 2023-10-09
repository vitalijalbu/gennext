import LayoutMain from "components/Layout/LayoutMain";
import { GetStaticProps, NextPage } from "next";
import ResourcesMain from "components/Resources/ResourcesMain";
import { SinglePageVars, SiteCtx, siteFromLocale } from "ctx/siteCtx";
import {
  GLOBAL,
  Global,
  GlobalQueryVars,
  RESOURCES,
  Resources,
  useResourcesData
} from "queries";
import { addApolloState } from "lib/apolloLib";
import { initializeApollo } from "lib/apollo";
import { getPreviewToken } from "lib/preview";
import { FC } from "react";

const ResourcesLayout: FC = () => {
  const {
    resources: { seomatic }
  } = useResourcesData();

  return (
    <LayoutMain seoMarkup={seomatic}>
      <ResourcesMain />
    </LayoutMain>
  );
};

const ResourcesPage: NextPage<SinglePageVars> = ({ site }) => {
  return (
    <SiteCtx.Provider value={{ site }}>
      <ResourcesLayout />
    </SiteCtx.Provider>
  );
};

export default ResourcesPage;

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
    apolloClient.query<Resources, SinglePageVars>({
      query: RESOURCES,
      context,
      variables: { site }
    })
  ]);

  const { resources } = pageRes.data || {};

  return addApolloState(apolloClient, {
    notFound: !resources,
    props: { site },
    revalidate: 60 * 3
  });
};
