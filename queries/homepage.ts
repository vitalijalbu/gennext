import { gql, useQuery } from "@apollo/client";
import { SinglePageVars, useSiteCtx } from "ctx/siteCtx";
import { AssetLinks, SeoMarkup, SingleAsset, StyledLinks } from "types";
import {
  AssetHeaderSnippetLinkRepeater,
  AssetHeaderSnippetRepeater
} from "types/repeaters";

export const HOMEPAGE = gql`
  query Homepage($site: String) {
    homepage: entry(site: [$site], section: "homepage") {
      id
      siteId
      uri
      title
      seomatic(site: $site) {
        metaTitleContainer
        metaTagContainer
        metaLinkContainer
      }
      ... on homepage_homepage_Entry {
        styledHeader
        subheader
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
        asset {
          id
          url
          mimeType
          title
        }
        secondaryStyledHeader
        secondarySnippet
        assetHeaderSnippetLinkRepeater {
          ... on assetHeaderSnippetLinkRepeater_assetHeaderSnippetLink_BlockType {
            asset {
              id
              url
              mimeType
              title
            }
            header
            snippet
            path
            label
            entry {
              id
              title
              uri
            }
          }
        }
        header
        thirdSnippet
        assetLinks {
          ... on assetLinks_assetLink_BlockType {
            asset {
              id
              url
              mimeType
              title
            }
            path
            entry {
              id
              title
              uri
            }
          }
        }
        secondaryAssetLinks {
          ... on secondaryAssetLinks_assetLink_BlockType {
            asset {
              id
              url
              mimeType
              title
            }
            path
            entry {
              id
              title
              uri
            }
          }
        }
        thirdStyledHeader
        fourthSnippet
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
      }
    }
  }
`;

export interface Homepage {
  homepage: {
    id: string;
    siteId: number;
    uri: string;
    title: string;
    seomatic: SeoMarkup;
    styledHeader: string | null;
    subheader: string | null;
    snippet: string | null;
    multiLinks: StyledLinks;
    asset: SingleAsset;
    secondaryStyledHeader: string | null;
    secondarySnippet: string | null;
    assetHeaderSnippetLinkRepeater: AssetHeaderSnippetLinkRepeater;
    header: string | null;
    thirdSnippet: string | null;
    assetLinks: AssetLinks;
    secondaryAssetLinks: AssetLinks;
    thirdStyledHeader: string | null;
    fourthSnippet: string | null;
    assetHeaderSnippetRepeater: AssetHeaderSnippetRepeater;
  };
}

export const useHomepageData = (): Homepage => {
  const variables = useSiteCtx();
  const { data } = useQuery<Homepage, SinglePageVars>(HOMEPAGE, { variables });

  return data as Homepage;
};
