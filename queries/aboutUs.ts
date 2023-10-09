import { gql, useQuery } from "@apollo/client";
import { SinglePageVars, useSiteCtx } from "ctx/siteCtx";
import { MultiAssets, SeoMarkup, SingleLink, StyledLinks } from "types";
import { AssetHeaderSnippetRepeater } from "types/repeaters";

export const ABOUT_US = gql`
  query AboutUs($site: String) {
    aboutUs: entry(site: [$site], section: "aboutUs") {
      id
      siteId
      uri
      title
      seomatic(site: $site) {
        metaTitleContainer
        metaTagContainer
        metaLinkContainer
      }
      ... on aboutUs_aboutUs_Entry {
        styledHeader
        snippet
        multiAssets {
          id
          url
          mimeType
          title
        }
        infoTable {
          ... on infoTable_TableRow {
            item
          }
        }
        secondaryStyledHeader
        secondarySnippet
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
        assetHeaderSnippetRepeater {
          ... on assetHeaderSnippetRepeater_assetHeaderSnippet_BlockType {
            asset {
              id
              url
              mimeType
              title
            }
            header
            snippet
          }
        }
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
      }
    }
  }
`;

export interface AboutUs {
  aboutUs: {
    id: string;
    siteId: number;
    uri: string;
    title: string;
    seomatic: SeoMarkup;
    styledHeader: string | null;
    snippet: string | null;
    multiAssets: MultiAssets;
    infoTable: { item: string | null }[] | [];
    secondaryStyledHeader: string | null;
    secondarySnippet: string | null;
    singleLink: SingleLink;
    assetHeaderSnippetRepeater: AssetHeaderSnippetRepeater;
    multiLinks: StyledLinks;
  };
}

export const useAboutUsData = (): AboutUs => {
  const variables = useSiteCtx();
  const { data } = useQuery<AboutUs, SinglePageVars>(ABOUT_US, { variables });
  return data as AboutUs;
};
