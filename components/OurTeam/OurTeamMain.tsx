import { FC } from "react";
import Banner from "./Sections/Banner";
import S3 from "./Sections/S3";
import Team from "./Sections/Team";
import styles from "./OurTeamMain.module.scss";

const OurTeamMain: FC = () => {
  return (
    <div className={styles.ourTeamWrapper}>
      <Banner />
      <Team />
      <S3 />
    </div>
  );
};

export default OurTeamMain;
