import { useLoanData } from "queries";
import { useRouter } from "next/router";
import { FC, useEffect, useState} from "react";
import styles from "./S2.module.scss";
import { useInView } from "react-intersection-observer";
import { GetStaticPaths } from "next";

const LoanData: FC = () => {
  const router = useRouter();
  const loan = useLoanData();

  const [loanData, setloanData] = useState([]);
  const [loanPreviewText, setloanPreviewText] = useState("");
  const [loanHeadline, setloanHeadline] = useState("");
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.8
  });  

  const handleSubmit = (loanId: string) => {
    router.push(`/loan_detail/${loanId}`)
  };

  useEffect(() =>{
    if(loan != null){
      setloanData(loan.loan);
      setloanPreviewText(loan.loanEntries[0].previewText);
      setloanHeadline(loan.loanEntries[0].headline)
    }
  });
  
  return (
    <div ref={ref} className={styles.wrapper}>
      <div className="loan-bg"> 
          <section className="loan-section S1_wrapper__EnYw2">
          <p className="block-title__tagline">{loanPreviewText}</p>
            <h2 className="block-title-heading">{loanHeadline}</h2>
            <div className="blog-section-row">
            {loanData.map((_data: any) =>{
              const loanid = _data.id as String;
              return(
                <div className="custom-colunm-4 custom-colunm-12"  key={_data.id}> 
              <div className="service-card" onClick={() => {handleSubmit(_data.slug)}}>
              {/* <div className="service-card"> */}
                <div className="service-card-image"> 
                <img className="service-image"
                    src={_data.loanImage[0].url}
                    alt=""
                />
                </div>
                <div className="service-card-content" >
                  <div className="service-card-content-inner">
                    <div className="service-card-icon"> 
                  <img
                    src={_data.loanIcon[0].url}
                    alt=""/>
                    </div>
                    <div >
                    <h3 className="service-card-title"> 
                      <a>{_data.title}</a>
                    </h3>
                    </div>
                    
                    {/* <p>{_data.loanShortDescription}</p> */}
                    <div>
      {(_data.loanShortDescription).length > 250 ?
        (<p>{`${(_data.loanShortDescription).substring(0, 250)}...`}</p>) :
        <p>{_data.loanShortDescription.length}</p>
      }
    </div>
                    <a className="service-card-link">
                      <div className="Team_openModal__1baNi">
                        <div><div><div>
                          <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.7071 8.70711C17.0976 8.31658 17.0976 7.68342 16.7071 7.29289L10.3431 0.928932C9.95262 0.538408 9.31946 0.538408 8.92893 0.928932C8.53841 1.31946 8.53841 1.95262 8.92893 2.34315L14.5858 8L8.92893 13.6569C8.53841 14.0474 8.53841 14.6805 8.92893 15.0711C9.31946 15.4616 9.95262 15.4616 10.3431 15.0711L16.7071 8.70711ZM0 9H16V7H0V9Z" fill="white"></path></svg>
                        </div></div></div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
              )
            })};
            
            </div>
          
          
        </section>
        </div>
    </div>
  );
};

export default LoanData;
