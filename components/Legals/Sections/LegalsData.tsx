import { queryBlogData } from "queries";
import { FC, useEffect, useState } from "react";
import styles from "./S2.module.scss";
import { useInView } from "react-intersection-observer";
import { useRouter } from "next/router";
import { useLegal } from "queries/legal";

const LegalsData: FC = () => {

    const router = useRouter();
    const legalDatas = useLegal("");
  
    const [legalPageData, setLegalPageData] = useState<any>(null);
    const [legalCategoryData, setLegalCategoryData] = useState([]);
  
    useEffect(() => {
      if (legalDatas.data != undefined) {
        setLegalPageData(legalDatas.data.legalMain[0]);
        setLegalCategoryData(legalDatas.data.legal);
      }
    });
  
    const [ref, inView] = useInView({
      triggerOnce: true,
      threshold: 0.8
    });
  
    const onLegalCategoryChange = async (event: any, slug: string) => {
      router.push(`/legal/${slug}`)
    };
  
    if (legalPageData === null || legalCategoryData === null) {
      return null;
    }
    return (
        <div ref={ref} className={styles.wrapper}>
          <div className={styles.container}>
            <section className="page-header">
              <div className="page-header-container">
                <h2> {"LEGAL".toUpperCase()}</h2>
              </div>
            </section>
    
            <section className="loan-detalis S1_wrapper__EnYw2">
              <div className="blog-section-row">
              <div className="custom-colunm-4">
                <div className="loan-lists">
                  <ul className="service-sidebar-menu"  >
                    {legalCategoryData.map((_data: any) => {
                        return (
                          <li key={_data.id}>
                            <a onClick={(e) => { onLegalCategoryChange(e, _data.slug); }}>{_data.title}
                              <svg className="feather feather-chevron-right" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><polyline points="9 18 15 12 9 6"></polyline></svg>
                            </a>
                          </li>)    
                    })}
                  </ul>
                </div>
                </div>
                <div className="custom-colunm-8">
                <div className="loan-detalis-content">
                <div dangerouslySetInnerHTML={{ __html: legalPageData["fullDescription"] }} />
                </div>
                </div>
                
              </div>
            </section>
           
          </div>
        </div>
      )
};


export default LegalsData;