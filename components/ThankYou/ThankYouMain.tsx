import { FlexLink } from "lib/link";
import { safeParse } from "lib/util";
import { useThankYouData } from "queries";
import { FC } from "react";
import styles from "./ThankYouMain.module.scss";

const ThankYouMain: FC = () => {
  const {
    thankYou: { header, snippet, singleLink }
  } = useThankYouData();

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1>{header}</h1>
          <div className={styles.snippet}>{safeParse(snippet)}</div>
          {singleLink[0] && (
            <FlexLink linkSet={singleLink[0]} className={styles.link} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ThankYouMain;
