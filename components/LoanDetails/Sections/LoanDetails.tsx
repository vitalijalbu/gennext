
import { FC, useEffect, useState } from "react";
import styles from "./S2.module.scss";
import { useInView } from "react-intersection-observer";
import { useRouter } from 'next/router';
import { gql, useQuery } from "@apollo/client";
import { GetStaticPaths } from "next";
import { useLoanDetail } from "queries";

const LoanDetails: FC <{ id: string }> = ({ id }) => {
  const router = useRouter();
  const loanDetailsData = useLoanDetail(id);

  const [selectedid, setSelectedid] = useState(id);
  const [loanDetailData, setLoanDetailData] = useState<any>(null);
  const [categoryData, setCategoryData] = useState([]);

useEffect(()=>{
  if(loanDetailsData.data != undefined){
    setLoanDetailData(loanDetailsData.data.loansEntries[0]);
    setCategoryData(loanDetailsData.data.loanDetail);
  }
});


  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.8
  });

  const onCategoryChange = async (event: any, id: string) => {
    setSelectedid(id);
    router.push(`/loan_detail/${id}`)
  };
 
  if (loanDetailData === null || categoryData === null) {
    return null;
  }
  return (
    <div ref={ref} className={styles.wrapper}>
      
      <div className={styles.container}>
        <section className="page-header">
          <div className="page-header-container">
            <div className="thm-breadcrumb">
              <span><a href="#"><span>Home</span></a></span>/<span>{loanDetailData["title"]}</span>
            </div>
            <h2> {loanDetailData["title"]}</h2>
          </div>
        </section>

        <section className="loan-detalis S1_wrapper__EnYw2">
          <div className="blog-section-row">
            <div className="custom-colunm-4">
              <div className="loan-lists">
                <ul className="service-sidebar-menu"  >
                  {categoryData.map((_data: any) => {
                    if (selectedid == _data.slug) {
                      return (
                        <li key={_data.id}>
                          <a className="active" onClick={(e) => { onCategoryChange(e, _data.id); }}>{_data.title}
                            <svg className="feather feather-chevron-right" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><polyline points="9 18 15 12 9 6"></polyline></svg>
                          </a>
                        </li>
                      )
                    } else {
                      return (
                        <li key={_data.id}>
                          <a onClick={(e) => { onCategoryChange(e, _data.slug); }}>{_data.title}
                            <svg className="feather feather-chevron-right" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><polyline points="9 18 15 12 9 6"></polyline></svg>
                          </a>
                        </li>)
                    }

                  })}
                </ul>
              </div>
              <div className="call-agent">
                <div className="call-agent-inner" >
                  <div className="apply-btn">
                    <a target="_blank" rel="noreferrer" href="https://app.mortgage.meridianlink.com/Account/SignUp?lenderref=GennieMac-Production-2022-1116&" className="StyledLink_defaultLink__3sVH_">Apply Now</a>
                  </div>
                  <h3>{loanDetailData["applyTitle"]}</h3>
                  <hr />
                  <p>{loanDetailData["applyContent"]}</p>
                  <div className="call-btn">
                    <a className="StyledLink_iconLink__rMLNZ" href={`tel:+${loanDetailData["applyPhoneNumber"]}`}><svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="StyledLink_phone__xn3n_"><path d="M7.53251 3.22915C8.04041 3.32009 8.50719 3.54804 8.8731 3.88384C9.23902 4.21965 9.48741 4.64801 9.58651 5.11412M7.53251 1.32031C8.58773 1.42789 9.57174 1.86155 10.323 2.55008C11.0742 3.23861 11.548 4.1411 11.6665 5.10935M11.1465 8.91747V10.3491C11.1471 10.482 11.1174 10.6135 11.0594 10.7353C11.0014 10.8571 10.9163 10.9664 10.8096 11.0563C10.7029 11.1461 10.5769 11.2145 10.4397 11.2571C10.3025 11.2997 10.1571 11.3155 10.0129 11.3035C8.41278 11.144 6.87575 10.6422 5.52531 9.83848C4.2689 9.10581 3.20368 8.12825 2.40531 6.97523C1.5265 5.73029 0.979595 4.31288 0.808908 2.83783C0.795914 2.70587 0.813003 2.57287 0.859088 2.4473C0.905174 2.32173 0.979245 2.20634 1.07659 2.10848C1.17393 2.01062 1.29241 1.93243 1.42448 1.8789C1.55655 1.82536 1.69933 1.79765 1.84371 1.79752H3.40371C3.65607 1.79524 3.90072 1.87725 4.09206 2.02827C4.28341 2.17928 4.40839 2.389 4.44371 2.61832C4.50955 3.07647 4.63166 3.52632 4.80771 3.95927C4.87767 4.13008 4.89281 4.31571 4.85134 4.49417C4.80987 4.67263 4.71352 4.83644 4.57371 4.96618L3.91331 5.57224C4.65356 6.76695 5.73146 7.75616 7.03331 8.43549L7.69371 7.82943C7.83509 7.70113 8.01359 7.61271 8.20805 7.57465C8.40251 7.53659 8.60479 7.55048 8.79091 7.61469C9.26269 7.77625 9.75287 7.88831 10.2521 7.94874C10.5047 7.98144 10.7354 8.0982 10.9003 8.27681C11.0652 8.45543 11.1528 8.68343 11.1465 8.91747Z" stroke="white" stroke-width="1.06518" stroke-linecap="round" stroke-linejoin="round"></path></svg></a>
                    <a className="call" href={`tel:+${loanDetailData["applyPhoneNumber"]}`}>{loanDetailData["applyPhoneNumber"]}</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="custom-colunm-8">
              <div className="loan-detalis-content">
                <div>
                  <img
                    src={loanDetailData["loanImage"][0]["url"]}
                    alt=""
                  />
                </div>
                <div dangerouslySetInnerHTML={{ __html: loanDetailData["loanDescription"] }} />

                <h3>{loanDetailData["loanBenefitsTitle"]}</h3>
                <div dangerouslySetInnerHTML={{ __html: loanDetailData["loanBenefitsContent"] }} />
                {/* <p>{loanDetailData["loanBenefitsContent"]}</p> */}

                 {loanDetailData.loanBenefitsLists != null ? loanDetailData.loanBenefitsLists.map((benifit: any) => {
                  return (
                    <ul key={benifit.id}>
                      <li>{benifit.benefitTitle}</li>
                    </ul>
                  )
                }) : <></>}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LoanDetails;