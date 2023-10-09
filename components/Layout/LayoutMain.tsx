import Form from "components/Global/Form";
import { FC, ReactNode } from "react";
import { SeoMarkup } from "types";
import Footer from "./Footer";
import GlobalScripts from "./GlobalScripts";
import Header from "./Header";
import HeadTag from "./HeadTag";
import styles from "./LayoutMain.module.scss";

const LayoutMain: FC<{
  children?: ReactNode;
  seoMarkup?: SeoMarkup | null;
  hasForm?: boolean;
}> = ({ children, seoMarkup, hasForm = false }) => {
  return (
    <>
      <GlobalScripts wait={0} />
      <HeadTag seoMarkup={seoMarkup} />
      <div className={styles.app}>
        <Header />
        <main className={styles.main}>{children}</main>
        {hasForm && <Form />}
        <Footer />
      </div>
    </>
  );
};

export default LayoutMain;
