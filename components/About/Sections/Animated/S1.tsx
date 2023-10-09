import { FC, useRef } from "react";
import styles from "./S1.module.scss";
import dynamic from "next/dynamic";
import {
  ScrollContainer,
  ScrollPage,
  batch,
  Fade,
  FadeIn,
  FadeOut,
  MoveIn,
  MoveOut,
  Sticky,
  ZoomIn,
  ZoomOut,
  Animation
} from "react-scroll-motion";
import { useAboutUsData } from "queries";
import { safeParse } from "lib/util";
import { SimpleHouseLogo } from "components/Svg";
import StyledLink from "components/Global/StyledLink";
import cn from "classnames";
import Image from "next/image";


const Animator = dynamic(
  import("react-scroll-motion").then((it) => it.Animator),
  { ssr: false }
);

const SpinOut = (cycle: number) =>
  ({
    out: {
      style: {
        transform: (p) => `rotate(${p * 360 * cycle}deg)`
      }
    }
  } as Animation);

const imageAnimations = [
  batch(MoveIn(-200, 200), FadeIn(-1, 1), SpinOut(-1), FadeOut(1, 0)),
  batch(MoveIn(200, 200), FadeIn(-1, 1), SpinOut(-1), FadeOut(1, 0)),
  batch(MoveIn(200, -200), FadeIn(-1, 1), SpinOut(-1), FadeOut(1, 0)),
  batch(MoveIn(-200, -200), FadeIn(-1, 1), SpinOut(-1), FadeOut(1, 0)),
  batch(MoveIn(0, 200), FadeIn(-1, 1), SpinOut(-1), FadeOut(1, 0)),
  batch(MoveIn(0, -200), FadeIn(-1, 1), SpinOut(-1), FadeOut(1, 0)),
  batch(MoveIn(-200, 200), FadeIn(-1, 1), SpinOut(-1), FadeOut(1, 0))
];

const lastAnimations = [
  batch(MoveIn(-100, -100)),
  batch(MoveIn(100, -100)),
  batch(MoveIn(-100, 100)),
  batch(MoveIn(0, 100)),
  batch(MoveIn(100, 100))
];

const S1: FC = () => {
  const {
    aboutUs: {
      styledHeader,
      snippet,
      secondaryStyledHeader,
      secondarySnippet,
      singleLink,
      infoTable,
      multiAssets
    }
  } = useAboutUsData();

  return (
    <div className={styles.wrapper}>
      <ScrollContainer>
        <ScrollPage>
          <Animator
            animation={batch(Fade(), Sticky(), MoveOut(0, -300))}
            style={{ width: "100%" }}
          >
            <div className={styles.firsBlock}>
              <h1>{safeParse(styledHeader)}</h1>
              <div className={styles.snippet}>{safeParse(snippet)}</div>
            </div>
          </Animator>
        </ScrollPage>
        <ScrollPage>
          <Animator
            animation={batch(
              FadeIn(),
              Sticky(),
              ZoomIn(1, 5),
              ZoomOut(5, 5),
              FadeOut(1, 0)
            )}
          >
            <div className={styles.circle1}></div>
          </Animator>
          <Animator
            animation={batch(
              FadeIn(),
              Sticky(),
              ZoomIn(1, 5),
              ZoomOut(5, 5),
              FadeOut(1, 0)
            )}
          >
            <div className={styles.circle2} />
          </Animator>
          <Animator
            animation={batch(
              FadeIn(),
              Sticky(),
              ZoomIn(1, 5),
              ZoomOut(5, 5),
              FadeOut(1, 0)
            )}
          >
            <div className={styles.circle3}></div>
          </Animator>
          <Animator animation={batch(FadeIn(), Sticky(), FadeOut(1, 0))}>
            <div className={styles.svg}>
              <SimpleHouseLogo />
            </div>
          </Animator>
          <Animator
            animation={batch(Sticky(), SpinOut(1), ZoomOut(1, 0.5))}
            style={{ width: "100%" }}
          >
            <div className={styles.imageContainer}>
              {multiAssets?.map((item, id) => {
                return (
                  <Animator
                    key={id}
                    animation={imageAnimations[id]}
                    className={cn(styles.image, styles[`image${id}`])}
                  >
                    <img
                      alt={item.title}
                      src={item.url}
                    />
                  </Animator>
                );
              })}
            </div>
          </Animator>
        </ScrollPage>
        <ScrollPage>
          <Animator
            animation={batch(Sticky(), FadeIn(-1, 1))}
            style={{ width: "100%" }}
          >
            <div className={styles.lastSection}>
              <h1>{safeParse(secondaryStyledHeader)}</h1>
              <div className={styles.snippet}>
                {safeParse(secondarySnippet)}
              </div>
              {singleLink[0] && <StyledLink linkSet={singleLink[0]} />}
              {infoTable?.map((item, id) => {
                return (
                  <Animator
                    key={id}
                    animation={lastAnimations[id]}
                    className={cn(styles.block, styles[`block${id}`])}
                  >
                    {item.item}
                  </Animator>
                );
              })}
            </div>
          </Animator>
        </ScrollPage>
      </ScrollContainer>
    </div>
  );
};

export default S1;
