import Slider from "components/Global/Slider";
import SvgSnippet from "components/Global/SvgSnippet";
import { safeParse } from "lib/util";
import { useHomepageData } from "queries";
import { FC } from "react";
import styles from "./S1.module.scss";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

const S1: FC = () => {
  const {
    homepage: {
      secondaryStyledHeader,
      secondarySnippet,
      assetHeaderSnippetLinkRepeater
    }
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
        <div className={styles.h2}>{safeParse(secondaryStyledHeader)}</div>
        {!!secondarySnippet && (
          <SvgSnippet>{safeParse(secondarySnippet)}</SvgSnippet>
        )}
      </motion.div>
      <Slider items={assetHeaderSnippetLinkRepeater} />
    </div>
  );
};

export default S1;
