import { FC } from "react";
import BlogDetailData from "./Sections/BlogDetailData";

const BlogDetailMain: FC <{ id: string }> = ({ id }) => {
  return (
    <>
      <BlogDetailData id={id}/>
    </>
  );
};

export default BlogDetailMain;