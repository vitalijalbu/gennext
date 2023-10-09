import { gql, useQuery } from "@apollo/client";
import { SinglePageVars, useSiteCtx } from "ctx/siteCtx";
import { SeoMarkup, SingleAsset, StyledLinks } from "types";
import { TeamMembers } from "types/repeaters";

export const OUR_TEAM = gql`
  query OurTeam($site: String) {
    ourTeam: entry(site: [$site], section: "ourTeam") {
      id
      siteId
      uri
      title
      seomatic(site: $site) {
        metaTitleContainer
        metaTagContainer
        metaLinkContainer
      }
      ... on ourTeam_ourTeam_Entry {
        header
        snippet
        secondaryHeader
        teamCards {
          id
          title
          ... on teamMembers_default_Entry {
            asset {
              id
              url
              mimeType
              title
            }
            header
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
            secondarySnippet
            linkedin
          }
        }
        styledHeader
        secondarySnippet
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
        thirdSnippet
      }
    }
  }
`;

export interface OurTeam {
  ourTeam: {
    id: string;
    siteId: number;
    uri: string;
    title: string;
    seomatic: SeoMarkup;
    header: string | null;
    snippet: string | null;
    secondaryHeader: string | null;
    teamCards: TeamMembers;
    styledHeader: string | null;
    secondarySnippet: string | null;
    multiLinks: StyledLinks;
    asset: SingleAsset;
    thirdSnippet: string | null;
  };
}

export const useOurTeamData = (): OurTeam => {
  const variables = useSiteCtx();
  const { data } = useQuery<OurTeam, SinglePageVars>(OUR_TEAM, { variables });
  return data as OurTeam;
};
