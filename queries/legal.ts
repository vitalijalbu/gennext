import { gql, useQuery } from "@apollo/client";
import { useSiteCtx } from "ctx/siteCtx";
import { MultiAssets, SeoMarkup, SingleLink, StyledLinks } from "types";

export const LEGAL = gql`
  query GetLegal($slug: String) {
    legal: entries(section: "legal") {
      title
      id
      slug
    },
    legalMain: entries(id: "3527") {
      ... on legals_legals_Entry {
        id,
        title,
        fullDescription
      }
    }
    legalEntries(slug: [$slug]) {
      ... on legal_default_Entry {
        id
        slug
        title
        postDate
        fullDescription
        expiryDate
      }
    }
  }
`;

export interface Legal {
    legal: {
    seomatic: SeoMarkup;
  };
}

export function useLegal(slug : string) {
  const data = useQuery(LEGAL, {
    variables: { slug: slug },
  });
return data;
}