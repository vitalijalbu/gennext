import { SiteNames } from "ctx/siteCtx";
import { FC } from "react";
import styles from "./ErrorPageMain.module.scss";

interface ErrorProps {
  statusCode?: number;
  site: SiteNames;
}

const ErrorPageMain: FC<ErrorProps> = (props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1>{props.statusCode}</h1>
          <div className={styles.snippet}>Not Found</div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPageMain;
