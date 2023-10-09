import StyledLink from "components/Global/StyledLink";
import { safeParse } from "lib/util";
import { useResourcesData } from "queries";
import { FC } from "react";
import styles from "./Banner.module.scss";
import { motion } from "framer-motion";

const Banner: FC = () => {
  const {
    resources: { styledHeader, snippet, multiLinks }
  } = useResourcesData();

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
          {safeParse(styledHeader)}
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
        <motion.div
          animate={{
            opacity: 1,
            translateX: 0
          }}
          transition={{ duration: 0.9 }}
          initial={{ opacity: 0, translateX: "-30%" }}
          className={styles.links}
        >
          {multiLinks.map((item, id) => {
            return <StyledLink key={id} linkSet={item} />;
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default Banner;
