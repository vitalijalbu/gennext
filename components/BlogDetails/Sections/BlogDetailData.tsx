
import { FC, useEffect, useState } from "react";
import styles from "./S2.module.scss";
import { useInView } from "react-intersection-observer";
import { blogDetailData } from "queries";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";

const BlogDetailData: FC<{ id: string }> = ({ id }) => {
  const router = useRouter();
  const loanDetailsData = blogDetailData(id);
  const [selectedBlogid, setSelectedBlogId] = useState(id);
  const [blogData, setBlogDetailData] = useState<any>(null);
  const [blogDetailCategoryData, setblogDetailCategoryData] = useState([]);
  const [blogDetailRecentData, setblogDetailRecentData] = useState([]);
  const [categoryId , setCategoryId] = useState("");

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.8
  });

  useEffect(() => {
    if(loanDetailsData != null){
      setBlogDetailData(loanDetailsData.ourBlogsEntries[0]);
      setblogDetailCategoryData(loanDetailsData.categories);
      setblogDetailRecentData(loanDetailsData.blogdetail);
    }
  });

  const handleCategoryClick = (categoryId: string) => {
    setCategoryId(categoryId);
  }

  if (blogData === null || blogDetailCategoryData === null || blogDetailRecentData === null) {
    return null;
  }

  return (
    <div ref={ref} className={styles.wrapper}>
      <div className={styles.container}>
        <section className="blog-section S1_wrapper__EnYw2 blog-section-detalis">

          <div className="blog-section-row">

            <div className="blog-section-entry entries">
              <article className="entry entry-single">
                <h2 className="entry-title">
                  <a >{blogData["title"]}</a>
                </h2>

                <div className="author-main-sec">
                  <div className="author-main-img">
                    <a href="#">
                      <img
                        src=""
                        alt=""
                      />
                    </a>
                  </div>
                  <div className="author-main-content">
                    <div className="author-main-name">
                      <a>{blogData.author.fullName}</a>
                    </div>
                    <div className="author-main-bio">
                      {blogData.postDate}<span>•</span>{blogData.readingTime}
                    </div>
                  </div>
                </div>

                <div>
                  <img
                    src={blogData.image[0].url}
                    alt=""
                  />
                </div>
                <div className="entry-content" >
                  <div dangerouslySetInnerHTML={{ __html: blogData.fullDescription }} />
                </div>
              </article>
            </div>

            <div className="blog-section-colunm">

              <div className="sidebar">

                <h3 className="sidebar-title">Recent Posts</h3>
                <div className="sidebar-item recent-posts">
                  {blogDetailRecentData.map((_recent: any) => {
                    return (
                      <div className="post-item clearfix" key={_recent.id}>
                        <img
                          src={_recent.image[0].url}
                          alt=""
                          className="img-fluid"
                        />
                        <h4><a href={`/blog_detail/${_recent.id}`}>{_recent.title}</a></h4>
                        <time dateTime="2020-01-01">{_recent.postDate}</time>
                      </div>
                    )
                  })}

                </div>

                <h3 className="sidebar-title">Categories</h3>
                <div className="sidebar-item categories">
                  <ul>{blogDetailCategoryData.map((_category: any) => {
                    return (
                    
                       
                        <li key={_category.id}><a>{_category.title} <span></span></a></li>
                  
                    )
                  })}

                  </ul>
                </div>

              </div>

            </div>

          </div>

        </section>
      </div>
    </div>
  );
};

export default BlogDetailData;
