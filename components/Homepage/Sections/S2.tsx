import SvgSnippet from "components/Global/SvgSnippet";
import { useHomepageData } from "queries";
import { FC } from "react";
import styles from "./S2.module.scss";
import Marquee from "react-fast-marquee";
import { FlexLink } from "lib/link";
import Image from "next/image";

import { safeParse } from "lib/util";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

const S2: FC = () => {
  const {
    homepage: { header, thirdSnippet, assetLinks, secondaryAssetLinks }
  } = useHomepageData();

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.4
  });

  return (
    <div ref={ref} className={styles.wrapper}>
      <motion.div
        animate={{
          translateY: inView ? 0 : "-30%",
          opacity: inView ? 1 : 0
        }}
        transition={{
          duration: +inView * 0.9
        }}
        className={styles.header}
      >
        <h2>{header}</h2>
        {!!thirdSnippet && <SvgSnippet>{safeParse(thirdSnippet)}</SvgSnippet>}
      </motion.div>
      <motion.div
        animate={{
          translateY: inView ? 0 : "30%",
          opacity: inView ? 1 : 0
        }}
        transition={{
          duration: +inView * 0.9
        }}
      >
        <Marquee
          className={styles.marquee}
          pauseOnHover
          pauseOnClick
          gradient={false}
        >
          {assetLinks.map((item, id) => {
            if (!item.asset[0]) return null;

            return (
              <FlexLink key={id} linkSet={item} className={styles.imageLink}>
                <div className={styles.imageContainer}>
                  <img
                    alt={item.asset[0].title}
                    src={item.asset[0].url}
                    
                    
                    
                  />
                </div>
              </FlexLink>
            );
          })}
        </Marquee>
        <Marquee
          className={styles.marquee}
          pauseOnHover
          pauseOnClick
          direction="right"
          gradient={false}
        >
          {secondaryAssetLinks.map((item, id) => {
            if (!item.asset[0]) return null;

            return (
              <FlexLink key={id} linkSet={item} className={styles.imageLink}>
                <div className={styles.imageContainer}>
                  <img
                    alt={item.asset[0].title}
                    src={item.asset[0].url}
                    
                    
                    
                  />
                </div>
              </FlexLink>
            );
          })}
        </Marquee>
      </motion.div>
    </div>
  );
};

export default S2;
