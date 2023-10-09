import Slider from "components/Global/Slider";
import SvgSnippet from "components/Global/SvgSnippet";
import { safeParse } from "lib/util";
import { useHomepageData } from "queries";
import { FC } from "react";
import styles from "./S3.module.scss";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

const S3: FC = () => {
  const {
    homepage: { thirdStyledHeader, fourthSnippet, assetHeaderSnippetRepeater }
  } = useHomepageData();

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0
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
        <div className={styles.h2}>{safeParse(thirdStyledHeader)}</div>
        {!!fourthSnippet && <SvgSnippet>{safeParse(fourthSnippet)}</SvgSnippet>}
      </motion.div>
      <Slider items={assetHeaderSnippetRepeater} theme="reverse" />
    </div>
  );
};

export default S3;
