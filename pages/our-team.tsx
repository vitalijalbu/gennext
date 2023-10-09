import LayoutMain from "components/Layout/LayoutMain";
import { GetStaticProps, NextPage } from "next";
import OurTeamMain from "components/OurTeam/OurTeamMain";
import { SinglePageVars, SiteCtx, siteFromLocale } from "ctx/siteCtx";
import {
  GLOBAL,
  Global,
  GlobalQueryVars,
  OUR_TEAM,
  OurTeam,
  useOurTeamData
} from "queries";
import { addApolloState } from "lib/apolloLib";
import { initializeApollo } from "lib/apollo";
import { getPreviewToken } from "lib/preview";
import { FC } from "react";

const OurTeamLayout: FC = () => {
  const {
    ourTeam: { seomatic }
  } = useOurTeamData();

  return (
    <LayoutMain seoMarkup={seomatic} hasForm>
      <OurTeamMain />
    </LayoutMain>
  );
};

const OurTeamPage: NextPage<SinglePageVars> = ({ site }) => {
  return (
    <SiteCtx.Provider value={{ site }}>
      <OurTeamLayout />
    </SiteCtx.Provider>
  );
};

export default OurTeamPage;

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
    apolloClient.query<OurTeam, SinglePageVars>({
      query: OUR_TEAM,
      context,
      variables: { site }
    })
  ]);

  const { ourTeam } = pageRes.data || {};

  return addApolloState(apolloClient, {
    notFound: !ourTeam,
    props: { site },
    revalidate: 60 * 3
  });
};
