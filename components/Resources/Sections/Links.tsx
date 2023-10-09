import { ExtLink } from "lib/link";
import { useResourcesData } from "queries";
import { FC } from "react";
import styles from "./Links.module.scss";
import { useScrollPercentage } from "hooks/useScrollPercentage";
import { SimpleHouseLogo } from "components/Svg";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { HeaderLinks } from "types/repeaters";

const Links: FC = () => {
  const {
    resources: { headerLinksRepeater }
  } = useResourcesData();

  const [ref, percentage] = useScrollPercentage({
    offset: 120
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div ref={ref} className={styles.leftCol}>
          <div
            style={{
              top: `${percentage}%`,
              transform: `translateY( -${percentage}%)`
            }}
            className={styles.animatedItems}
          >
            <div className={styles.text}>take a look</div>
            <div className={styles.circle}>
              <div>
                <div>
                  <SimpleHouseLogo />
                </div>
              </div>
            </div>
          </div>

          <div className={styles.line}>
            <div
              className={styles.highlight}
              style={{
                height: `${percentage}%`
              }}
            />
            <div
              className={styles.filler}
              style={{
                height: `${percentage}%`
              }}
            />
          </div>
        </div>
        <div className={styles.rightCol}>
          {headerLinksRepeater.map((item, id) => {
            return <Item key={id} item={item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Links;

const Item: FC<{ item: HeaderLinks }> = ({ item }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5
  });

  return (
    <motion.div
      ref={ref}
      animate={{
        translateX: inView ? 0 : "30%",
        opacity: inView ? 1 : 0
      }}
      transition={{
        duration: +inView * 0.9
      }}
      className={styles.item}
    >
      <h3>{item.header}</h3>
      <div className={styles.linksContainer}>
        {item.links.map((link, idx) => {
          if (!link.link) return null;

          return (
            <ExtLink key={idx} href={link.link}>
              {link.link}
            </ExtLink>
          );
        })}
      </div>
    </motion.div>
  );
};
