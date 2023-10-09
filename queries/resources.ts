import { gql, useQuery } from "@apollo/client";
import { SinglePageVars, useSiteCtx } from "ctx/siteCtx";
import { SeoMarkup, StyledLinks } from "types";
import { HeaderLinksRepeater } from "types/repeaters";

export const RESOURCES = gql`
  query Resources($site: String) {
    resources: entry(site: [$site], section: "resources") {
      id
      siteId
      uri
      title
      seomatic(site: $site) {
        metaTitleContainer
        metaTagContainer
        metaLinkContainer
      }
      ... on resources_resources_Entry {
        styledHeader
        snippet
        multiLinks {
          ... on multiLinks_linkSet_BlockType {
            path
            label
            entry {
              id
              title
              uri
            }
          }
          ... on multiLinks_imageSet_BlockType {
            icon
            path
            entry {
              id
              title
              uri
            }
          }
          ... on multiLinks_styledLink_BlockType {
            path
            label
            entry {
              id
              title
              uri
            }
          }
        }
        headerLinksRepeater {
          ... on headerLinksRepeater_headerLinks_BlockType {
            header
            links {
              ... on links_TableRow {
                link
              }
            }
          }
        }
      }
    }
  }
`;

export interface Resources {
  resources: {
    id: string;
    siteId: number;
    uri: string;
    title: string;
    seomatic: SeoMarkup;
    styledHeader: string | null;
    snippet: string | null;
    multiLinks: StyledLinks;
    headerLinksRepeater: HeaderLinksRepeater;
  };
}

export const useResourcesData = (): Resources => {
  const variables = useSiteCtx();
  const { data } = useQuery<Resources, SinglePageVars>(RESOURCES, {
    variables
  });

  return data as Resources;
};
