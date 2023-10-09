import { safeParse } from "lib/util";
import { useOurTeamData } from "queries";
import { FC } from "react";
import styles from "./Banner.module.scss";
import { motion } from "framer-motion";

const Banner: FC = () => {
  const {
    ourTeam: { header, snippet }
  } = useOurTeamData();

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <motion.h1
          animate={{
            opacity: 1,
            translateX: 0
          }}
          transition={{ duration: 0.9 }}
          initial={{ opacity: 0, translateX: "-30%" }}
        >
          {header}
        </motion.h1>
        <motion.div
          animate={{
            opacity: 1,
            translateX: 0
          }}
          transition={{ duration: 0.9 }}
          initial={{ opacity: 0, translateX: "30%" }}
          className={styles.snippet}
        >
          {safeParse(snippet)}
        </motion.div>
      </div>
    </div>
  );
};

export default Banner;
