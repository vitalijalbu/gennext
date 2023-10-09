import { usePresentation } from "hooks/usePresentation";
import { FC } from "react";
import {
  AssetHeaderSnippet,
  AssetHeaderSnippetLink,
  AssetHeaderSnippetLinkRepeater,
  AssetHeaderSnippetRepeater
} from "types/repeaters";
import styles from "./Slider.module.scss";
import cn from "classnames";
import Image from "next/image";

import FixedHeightPres from "./FixedHeightPres";
import { safeParse } from "lib/util";
import { FlexLink } from "lib/link";
import { SimpleLeftArrow, SimpleRightArrow } from "components/Svg";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

type SliderProps = {
  items: AssetHeaderSnippetLinkRepeater | AssetHeaderSnippetRepeater;
  theme?: "default" | "reverse";
};

const Slider: FC<SliderProps> = ({ items, theme = "default" }) => {
  const { current, goToPrev, goToNext, orderList } = usePresentation({
    length: items.length
  });

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5
  });

  return (
    <div ref={ref} className={cn(styles.slider, styles[theme])}>
      <motion.div
        animate={{
          translateX: inView ? 0 : `${theme === "reverse" ? "" : "-"}30%`,
          opacity: inView ? 1 : 0
        }}
        transition={{
          duration: +inView * 0.9
        }}
        className={styles.leftCol}
      >
        {items.map((item, id) => {
          return (
            <div
              key={id}
              className={cn(styles.imageContainer, {
                [styles.active]: id === orderList[0],
                [styles.next]: id === orderList[1],
                [styles.secondNext]: id === orderList[2],
                [styles.thirdNext]: id === orderList[3]
              })}
            >
              {item.asset[0] && (
                <img
                  alt={item.asset[0].title}
                  src={item.asset[0].url}
                />
              )}
            </div>
          );
        })}
      </motion.div>
      {items.length > 1 && (
        <motion.div
          animate={{
            opacity: inView ? 1 : 0
          }}
          transition={{
            duration: +inView * 0.9
          }}
          className={styles.phoneControls}
        >
          <button className={styles.left} onClick={() => goToPrev()}>
            <SimpleLeftArrow />
          </button>
          <button className={styles.right} onClick={() => goToNext()}>
            <SimpleRightArrow />
          </button>
        </motion.div>
      )}
      <motion.div
        animate={{
          translateX: inView ? 0 : `${theme === "reverse" ? "-" : ""}30%`,
          opacity: inView ? 1 : 0
        }}
        transition={{
          duration: +inView * 0.9
        }}
        className={styles.rightCol}
      >
        <FixedHeightPres
          items={items}
          ItemCmp={ItemCmp}
          wrapperCn={styles.fixedContainer}
          currId={current}
        />

        {items.length > 1 && (
          <div className={styles.controls}>
            <button className={styles.left} onClick={() => goToPrev()}>
              <SimpleLeftArrow />
            </button>
            <button className={styles.right} onClick={() => goToNext()}>
              <SimpleRightArrow />
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Slider;

const ItemCmp: FC<
  (AssetHeaderSnippet | AssetHeaderSnippetLink) & {
    index: number;
    activeId: number;
  }
> = (props) => {
  const { header, snippet, index, activeId } = props;

  return (
    <div className={cn(styles.item, { [styles.active]: index === activeId })}>
      <h2>{header}</h2>
      <div className={styles.blockSnippet}>{safeParse(snippet)}</div>
      {"label" in props && "path" in props && "entry" in props && (
        <FlexLink linkSet={props} className={styles.blockLink} />
      )}
    </div>
  );
};
