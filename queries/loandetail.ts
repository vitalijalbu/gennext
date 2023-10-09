import { gql, useQuery } from "@apollo/client";
import { useSiteCtx } from "ctx/siteCtx";
import { MultiAssets, SeoMarkup, SingleLink, StyledLinks } from "types";

export const LOANDETAIL = gql`
  query GetLoanDetail($slug: String) {
    loanDetail: entries(section: "loans", level: 1) {
      title
      id
      slug
    },
    loansEntries(slug: [$slug]) {
      ... on loans_default_Entry {
        id
        loanIcon {
          url @transform(width: 45, immediately: true)
        }
        loanImage {
          url @transform(width: 800, immediately: true)
        }
        loanDescription
        loanBenefitsTitle
        loanBenefitsLists {
          benefitTitle
        }
        loanBenefitsContent
        title
        uri
        slug
        applyTitle
        applyContent
        applyPhoneNumber
        applyLink
        applyImage {
          url @transform(width: 400, immediately: true)
        }
      }
    }
  }
`;

export interface LoanDetail {
  loanDetail: {
    seomatic: SeoMarkup;
  };
}

export function useLoanDetail(slug : string) {
  const data = useQuery(LOANDETAIL, {
    variables: { slug: slug },
  });
return data;
}