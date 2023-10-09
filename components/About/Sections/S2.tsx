import Slider from "components/Global/Slider";
import StyledLink from "components/Global/StyledLink";
import { useAboutUsData } from "queries";
import { FC } from "react";
import styles from "./S2.module.scss";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

const S2: FC = () => {
  const {
    aboutUs: { assetHeaderSnippetRepeater, multiLinks }
  } = useAboutUsData();

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.8
  });

  return (
    <div ref={ref} className={styles.wrapper}>
      <div className={styles.container}>
        <Slider items={assetHeaderSnippetRepeater} />

        <motion.div
          animate={{
            translateY: inView ? 0 : "30%",
            opacity: inView ? 1 : 0
          }}
          transition={{
            duration: +inView * 0.9
          }}
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

export default S2;
