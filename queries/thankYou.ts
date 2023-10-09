import { gql, useQuery } from "@apollo/client";
import { SinglePageVars, useSiteCtx } from "ctx/siteCtx";
import { SeoMarkup, SingleLink } from "types";

export const THANK_YOU = gql`
  query ThankYou($site: String) {
    thankYou: entry(site: [$site], section: "thankYou") {
      id
      siteId
      uri
      title
      seomatic(site: $site) {
        metaTitleContainer
        metaTagContainer
        metaLinkContainer
      }
      ... on thankYou_thankYou_Entry {
        header
        snippet
        singleLink {
          ... on singleLink_linkSet_BlockType {
            path
            label
            entry {
              id
              title
              uri
            }
          }
        }
      }
    }
  }
`;

export interface ThankYou {
  thankYou: {
    id: string;
    siteId: number;
    uri: string;
    title: string;
    seomatic: SeoMarkup;
    header: string | null;
    snippet: string | null;
    singleLink: SingleLink;
  };
}

export const useThankYouData = (): ThankYou => {
  const variables = useSiteCtx();
  const { data } = useQuery<ThankYou, SinglePageVars>(THANK_YOU, { variables });

  return data as ThankYou;
};
