import { gql, useQuery } from "@apollo/client";
import { SinglePageVars, useSiteCtx } from "ctx/siteCtx";
import { SeoMarkup, SingleLink } from "types";

export const BLOGDETAIL = gql`
query GetBlogDetail($blogid: QueryArgument) {
  ourBlogsEntries(id: [$blogid]) {
    ... on ourBlogs_default_Entry {
      id
      title
      slug
      postDate @formatDateTime(format: "F d, Y")
      fullDescription
      image {
        url @transform(width: 800, immediately: true)
      }
      author {
        fullName
      }
      readingTime
    }
  }
  blogdetail : entries(
    section: "ourBlogs"
    orderBy: "dateCreated desc"
    limit: 3
  ) {
    postDate @formatDateTime(format: "F d, Y")
    title
    id
    url
    status
    slug
    ... on ourBlogs_default_Entry {
      image {
        url @transform(width: 80, immediately: true)
      }
    }
  }
  categories {
    ... on categories_Category {
      id
      title
    }
  }
}
`;

export interface BlogDetail {
  blogdetail: {
    seomatic: SeoMarkup;
  };
}

export const blogDetailData = (selectedBlogid: string) => {
  const { data } = useQuery(BLOGDETAIL, {variables: { blogid: selectedBlogid }});
  return data;
};
