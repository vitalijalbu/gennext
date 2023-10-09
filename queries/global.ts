import { gql, useQuery } from "@apollo/client";
import { SiteNames, useSiteCtx } from "ctx/siteCtx";
import { StyledLinks } from "types";

export const GLOBAL = gql`
  query Global($site: String) {
    company: globalSet(site: [$site], handle: "company") {
      id
      ... on company_GlobalSet {
        snippet
        copyright
        created
        google
        facebook
        linkedin
        twitter
      }
    }
    navigationNodes(level: 1) {
      ... on mainMenu_Node {
        id
        typeLabel
        status
        title
        urlSuffix
        children {
          id
          title
          typeLabel
          enabled
          urlSuffix
          url
        }
      }
    }
    header: globalSet(site: [$site], handle: "header") {
      id
      ... on header_GlobalSet {
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
        secondaryMultiLinks {
          ... on secondaryMultiLinks_linkSet_BlockType {
            path
            label
            entry {
              id
              title
              uri
            }
          }
          ... on secondaryMultiLinks_imageSet_BlockType {
            icon
            path
            entry {
              id
              title
              uri
            }
          }
          ... on secondaryMultiLinks_styledLink_BlockType {
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

export interface Global {
  company: {
    id: string;
    snippet: string | null;
    copyright: string | null;
    created: string | null;
    google: string | null;
    facebook: string | null;
    linkedin: string | null;
    twitter: string | null;
  };
  header: {
    id: string;
    multiLinks: StyledLinks;
    secondaryMultiLinks: StyledLinks;
  };
  navigationNodes: StyledLinks;

}

export interface GlobalQueryVars {
  site: SiteNames;
}

export const useGlobalData = (): Global => {
  const variables = useSiteCtx();
  const { data } = useQuery<Global, GlobalQueryVars>(GLOBAL, { variables });
  return data as Global;
};
