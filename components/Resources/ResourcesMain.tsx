import { FC } from "react";
import Banner from "./Sections/Banner";
import Links from "./Sections/Links";
import styles from "./ResourcesMain.module.scss";

const ResourcesMain: FC = () => {
  return (
    <div className={styles.resourcesWrapper}>
      <Banner />
      <Links />
    </div>
  );
};

export default ResourcesMain;
