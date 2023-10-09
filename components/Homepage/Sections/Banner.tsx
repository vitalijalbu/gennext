import { useHomepageData } from "queries";
import { FC } from "react";
import styles from "./Banner.module.scss";
import Image from "next/image";

import { safeParse } from "lib/util";
import StyledLink from "components/Global/StyledLink";
import { motion } from "framer-motion";

const Banner: FC = () => {
  const {
    homepage: { styledHeader, subheader, snippet, multiLinks, asset }
  } = useHomepageData();

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.leftCol}>
          <motion.div
            animate={{
              opacity: 1,
              translateX: 0
            }}
            transition={{ duration: 0.9 }}
            initial={{ opacity: 0, translateX: "-30%" }}
            className={styles.h1}
          >
            {safeParse(styledHeader)}
          </motion.div>
          <motion.h4
            animate={{
              opacity: 1,
              translateX: 0
            }}
            transition={{ duration: 0.9, delay: 0.1 }}
            initial={{ opacity: 0, translateX: "-30%" }}
          >
            {subheader}
          </motion.h4>
          <motion.div
            animate={{
              opacity: 1,
              translateX: 0
            }}
            transition={{ duration: 0.9, delay: 0.2 }}
            initial={{ opacity: 0, translateX: "-30%" }}
            className={styles.snippet}
          >
            {safeParse(snippet)}
          </motion.div>
          <motion.div
            animate={{
              opacity: 1,
              translateX: 0
            }}
            transition={{ duration: 0.9, delay: 0.3 }}
            initial={{ opacity: 0, translateX: "-30%" }}
            className={styles.links}
          >
            {multiLinks.map((item, id) => {
              return <StyledLink key={id} linkSet={item} />;
            })}
          </motion.div>
        </div>
        <div className={styles.rightCol}>
          <motion.div
            animate={{
              opacity: 1,
              translateX: 0
            }}
            transition={{ duration: 0.9, delay: 0.1 }}
            initial={{ opacity: 0, translateX: "30%" }}
            className={styles.image}
          >
            {asset[0] && (
              <img
                alt={asset[0].title}
                src={asset[0].url}
                
                
                
              />
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
