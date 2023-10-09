import { gql, useQuery } from "@apollo/client";
import { SinglePageVars, useSiteCtx } from "ctx/siteCtx";
import { MultiAssets, SeoMarkup, SingleLink, StyledLinks } from "types";
import { AssetHeaderSnippetRepeater } from "types/repeaters";

export const BLOG = gql`
query blog($limit: Int, $offset: Int){
  entryCount(section: "ourBlogs")
  ourBlogsEntries(limit: $limit, offset: $offset) {
    ... on ourBlogs_default_Entry {
      id
      title
      shortDescription  
      uri
      image {
        url @transform(width: 815, immediately: true)
      }
      slug
      postDate @formatDateTime(format: "F d, Y")
      author {
        fullName
      }
    }
  }
   blog : entries(section: "ourBlogs", orderBy: "dateCreated desc", limit: 3) {
    postDate @formatDateTime(format: "F d, Y")
    title
    id
    url
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


export const BLOGWITHCATEGORY = gql`
query blog($limit: Int, $offset: Int, $categoryId: QueryArgument){
  entryCount(section: "ourBlogs", categories: [$categoryId])
  ourBlogsEntries(limit: $limit, offset: $offset, categories: [$categoryId]) {
    ... on ourBlogs_default_Entry {
      id
      title
      shortDescription  
      uri
      image {
        url @transform(width: 815, immediately: true)
      }
      slug
      postDate @formatDateTime(format: "F d, Y")
      author {
        fullName
      }
    }
  }
   blog : entries(section: "ourBlogs", orderBy: "dateCreated desc", limit: 3) {
    postDate @formatDateTime(format: "F d, Y")
    title
    id
    url
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


export interface Blog {
  blog: {
    seomatic: SeoMarkup;
  };
}

export const queryBlogData = (limits: number , offsets : number, cateId : string) => {
  let data;
  if(cateId == ""){
    data  = useQuery(BLOG, { variables: { limit: limits, offset: offsets } });
  }else{
   data  = useQuery(BLOGWITHCATEGORY, { variables: { limit: limits, offset: offsets, categoryId: cateId } });
  }
  return data;
};
