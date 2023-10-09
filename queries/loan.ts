import { gql, useQuery } from "@apollo/client";
import { SinglePageVars, useSiteCtx } from "ctx/siteCtx";
import { SeoMarkup } from "types";

export const LOAN = gql`
query {
  loanEntries {
    ... on loan_loan_Entry {
      id
      previewText
      headline
    }
  }
  loan : entries(section: "loans", level: 1) {
    dateCreated @formatDateTime(format: "Y-m-d")
    title
    id
    url
    status
    slug
    ... on loans_default_Entry {
      loanShortDescription
      loanIcon {
        url @transform (width: 400, immediately: true)
      }
      loanImage {
        url @transform (width: 400, immediately: true)
      }
    }
  }
}
`;

export interface Loan {
  loan: {
    seomatic: SeoMarkup;

  };
}

export const useLoanData = () => {
  const variables = useSiteCtx();
  const { data } = useQuery(LOAN, { variables });
  return data;
};
