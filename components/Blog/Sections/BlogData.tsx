import { queryBlogData } from "queries";
import { FC, useEffect, useState } from "react";
import styles from "./S2.module.scss";
import { useInView } from "react-intersection-observer";
import { useRouter } from "next/router";

const BlogData: FC = () => {
  const router = useRouter();
  const [offsetValue , setOffsetValue] = useState(0);
  const [limitValue , setLimitValue] = useState(5);
  const [categoryId , setCategoryId] = useState("");
  const [blogData, setBlogData] = useState([]);
  const [categoryData , setCategoryData] = useState([]);
  const [recentPostData , SetRecentPostData] = useState([]);
  const [selectedIndex , setSelectedIndex] = useState(1);
  const [noOfPageOfBlog , setnoOfPageOfBlog] = useState(0);
  
  const blog = queryBlogData(limitValue , offsetValue, categoryId);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.8
  });
  useEffect(()=>{
    if(blog.data != undefined){
      setBlogData(blog.data.ourBlogsEntries);
      setCategoryData(blog.data.categories);
      SetRecentPostData(blog.data.blog);
      setnoOfPageOfBlog(Math.ceil((blog.data.entryCount)/5))
    }
  });
  const itemElements = [];
  for (let i = 0; i < noOfPageOfBlog; i++) {
    itemElements.push(i + 1);
  }

  const handlePaginationClick = (numberofPage: string | undefined) =>{
    setSelectedIndex(Number(numberofPage));
  }

  const handleCategoryClick = (categoryId: string) => {
    setCategoryId(categoryId);
    setSelectedIndex(1);
    setOffsetValue(0);
    setLimitValue(5);
  }

  const handleReadMore = (blogId: number) => {
    router.push(`/blog_detail/${blogId}`)
  };

  const handleRecentClick = (recentId: string) => {
    router.push(`/blog_detail/${recentId}`)
  }


 if(blogData === null || categoryData === null){
      return null ;
 }
  return (
    <div ref={ref} className={styles.wrapper}>
      <div className={styles.container}>
      <section className="blog-section S1_wrapper__EnYw2">
          <div className="blog-section-row">
            <div className="blog-section-entry entries">
              {blogData.map((_blog: any) => {
                return (
                  <article className="entry" key={_blog.id}>
                    <div className="entry-img">
                      <img className="service-image"
                        src={_blog.image[0].url}
                        alt=""
                      />
                    </div>
                    <h2 className="entry-title">
                      <a>{_blog.title}</a>
                    </h2>
                    <div className="entry-meta">
                      <ul>
                        <li className="d-flex align-items-center">
                          <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path d="M24 8c-4.42 0-8 3.58-8 8 0 4.41 3.58 8 8 8s8-3.59 8-8c0-4.42-3.58-8-8-8zm0 20c-5.33 0-16 2.67-16 8v4h32v-4c0-5.33-10.67-8-16-8z" /><path d="M0 0h48v48h-48z" fill="none" /></svg>
                          <a>{_blog.author.fullName}</a>
                        </li>
                        <li className="d-flex align-items-center">
                          <svg id="Layer_1" version="1.1" viewBox="0 0 512 512" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><g><path d="M256,48C141.1,48,48,141.1,48,256s93.1,208,208,208c114.9,0,208-93.1,208-208S370.9,48,256,48z M273,273H160v-17h96V128h17   V273z" /></g></svg>
                          <a><time dateTime="2020-01-01">{_blog.postDate}</time></a></li>
                      </ul>
                    </div>
                    <div className="entry-content">
                      <p>
                        {_blog.shortDescription}
                      </p>
                      <div className="read-more" onClick={() => {handleReadMore(_blog.id)}}>
                        <a>Read More</a>
                      </div>
                    </div>
                  </article>
                )
              })}
              <div className="blog-pagination">
                <ul className="justify-content-center" >
                  {itemElements.map((_mm: any) => {
                    if (selectedIndex == _mm) {
                      return (
                        <li onClick={(e) => { 
                          setOffsetValue((Number(_mm) - 1) * limitValue);
                          handlePaginationClick(_mm);
                        }} className="active" key={_mm}><a>{_mm}</a></li>
                      )
                    } else {
                      return (
                        <li onClick={(e) => { 
                          setOffsetValue((Number(_mm) - 1) * limitValue);
                          handlePaginationClick(_mm);
                        }} key={_mm}><a>{_mm}</a></li>
                      )
                    }
                  })}
                </ul>
              </div>
            </div>

            <div className="blog-section-colunm">
              <div className="sidebar">
                <h3 className="sidebar-title">Recent Posts</h3>
                <div className="sidebar-item recent-posts">
                  {recentPostData.map((_recent: any) => {
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
                  <ul>
                    {categoryData.map((_category: any) => {
                      return (
                          <li key={_category.id}><a href="javascript:void(0);" onClick={() => { handleCategoryClick(_category.id) }}>{_category.title} <span></span></a></li>
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


export default BlogData;