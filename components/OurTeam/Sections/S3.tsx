import StyledLink from "components/Global/StyledLink";
import { safeParse } from "lib/util";
import { useOurTeamData } from "queries";
import { FC } from "react";
import styles from "./S3.module.scss";
import Image from "next/image";

import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

const S3: FC = () => {
  const {
    ourTeam: { styledHeader, secondarySnippet, multiLinks, asset, thirdSnippet }
  } = useOurTeamData();

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3
  });

  return (
    <div ref={ref} className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.leftCol}>
          <motion.h2
            animate={{
              translateX: inView ? 0 : "-30%",
              opacity: inView ? 1 : 0
            }}
            transition={{
              duration: +inView * 0.9
            }}
          >
            {safeParse(styledHeader)}
          </motion.h2>
          <motion.div
            animate={{
              translateX: inView ? 0 : "-30%",
              opacity: inView ? 1 : 0
            }}
            transition={{
              duration: +inView * 0.9,
              delay: +inView * 0.1
            }}
            className={styles.snippet}
          >
            {safeParse(secondarySnippet)}
          </motion.div>
          <motion.div
            animate={{
              translateX: inView ? 0 : "-30%",
              opacity: inView ? 1 : 0
            }}
            transition={{
              duration: +inView * 0.9,
              delay: +inView * 0.2
            }}
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
              translateX: inView ? 0 : "30%",
              opacity: inView ? 1 : 0
            }}
            transition={{
              duration: +inView * 0.9,
              delay: +inView * 0.1
            }}
            className={styles.image}
          >
            {asset[0] && (
              <img
                alt={asset[0].title}
                src={asset[0].url}
                
                
                
              />
            )}
          </motion.div>
          <motion.div
            animate={{
              translateX: inView ? 0 : "30%",
              opacity: inView ? 1 : 0
            }}
            transition={{
              duration: +inView * 0.9,
              delay: +inView * 0.2
            }}
            className={styles.secondSnippet}
          >
            {safeParse(thirdSnippet)}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default S3;
