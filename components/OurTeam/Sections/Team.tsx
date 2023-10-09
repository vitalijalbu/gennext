import { useOurTeamData } from "queries";
import { FC, useRef, useState } from "react";
import styles from "./Team.module.scss";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { TeamMember } from "types/repeaters";
import {
  Cross,
  ImagePlaceholder,
  LeftArrow,
  LinkedIn,
  RightArrow,
  SimpleLinkedIn
} from "components/Svg";
import Image from "next/image";

import { safeParse } from "lib/util";
import StyledLink from "components/Global/StyledLink";
import Modal from "components/Global/Modal";
import { ExtLink } from "lib/link";
import useMediaQuery from "hooks/useMediaQuery";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

const Team: FC = () => {
  const {
    ourTeam: { secondaryHeader, teamCards }
  } = useOurTeamData();

  const sliderRef = useRef<Slider>(null);

  const isTablet = useMediaQuery("(max-width: 1192px)");
  const isPhone = useMediaQuery("(max-width: 559px)");

  const sliderSettings: Settings = {
    dots: false,
    infinite: true,
    slidesToShow: isPhone ? 1 : isTablet ? 2 : 3,
    slidesToScroll: 1,
    arrows: false,
    draggable: true,
    speed: 1000
  };

  const [openModal, setOpenModal] = useState(false);
  const [activeItem, setActiveItem] = useState<TeamMember | null>(null);

  const setActive = (item: TeamMember | null) => {
    setActiveItem(item);
    setOpenModal(true);
  };
  const closeModal = () => {
    setOpenModal(false);
    setActiveItem(null);
  };

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0
  });

  return (
    <div ref={ref} className={styles.wrapper}>
      <motion.h2
        animate={{
          translateY: inView ? 0 : "-30%",
          opacity: inView ? 1 : 0
        }}
        transition={{
          duration: +inView * 0.9
        }}
      >
        {secondaryHeader}
      </motion.h2>
      <motion.div
        animate={{
          translateY: inView ? 0 : "30%",
          opacity: inView ? 1 : 0
        }}
        transition={{
          duration: +inView * 0.9
        }}
        className={styles.sliderContainer}
      >
        <Slider {...sliderSettings} ref={sliderRef} className={styles.slider}>
          {teamCards.map((item, id) => {
            return <Card key={id} item={item} setActive={setActive} />;
          })}
        </Slider>
        <div className={styles.controls}>
          <button
            className={styles.left}
            onClick={() => sliderRef?.current?.slickPrev()}
          >
            <LeftArrow />
          </button>
          <button
            className={styles.right}
            onClick={() => sliderRef?.current?.slickNext()}
          >
            <RightArrow />
          </button>
        </div>
      </motion.div>
      <TeamModal
        openModal={openModal}
        closeModal={closeModal}
        item={activeItem}
      />
    </div>
  );
};

export default Team;

const Card: FC<{
  item: TeamMember;
  setActive: (i: TeamMember | null) => void;
}> = ({ item, setActive }) => {
  return (
    <div className={styles.itemWrapper}>
      <div className={styles.item}>
        <div className={styles.imageContainer}>
          <div className={styles.image}>
            {item.asset[0] ? (
              <img
                alt={item.asset[0].title}
                src={item.asset[0].url}
                
                
                
              />
            ) : (
              <ImagePlaceholder />
            )}
          </div>
          <div className={styles.openModal} onClick={() => setActive(item)}>
            <div>
              <div>
                <div>
                  <RightArrow />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.content}>
          <h3>{item.header}</h3>
          <div className={styles.blockSnippet}>{safeParse(item.snippet)}</div>
          <div className={styles.links}>
            {item.multiLinks.map((item, id) => {
              return <StyledLink key={id} linkSet={item} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

type TeamModalProps = {
  openModal: boolean;
  closeModal: () => void;
  item: TeamMember | null;
};

const TeamModal: FC<TeamModalProps> = ({ openModal, closeModal, item }) => {
  if (!item) return null;

  return (
    <Modal state={[openModal, closeModal]} className={styles.teamModal}>
      <div className={styles.modalContainer}>
        <div className={styles.closeBtn} onClick={() => closeModal()}>
          <div>
            <Cross />
          </div>
        </div>
        <div className={styles.leftCol}>
          <div className={styles.image}>
            {item.asset[0] ? (
              <img
                alt={item.asset[0].title}
                src={item.asset[0].url}/>
            ) : (
              <ImagePlaceholder />
            )}
          </div>
        </div>
        <div className={styles.rightCol}>
          <h2>{item.header}</h2>
          <div className={styles.infoSnippet}>{safeParse(item.snippet)}</div>
          <div className={styles.bioSnippet}>
            {safeParse(item.secondarySnippet)}
          </div>
          <div className={styles.links}>
            {item.multiLinks.map((item, id) => {
              return <StyledLink key={id} linkSet={item} />;
            })}
          </div>

          {!!item.linkedin && (
            <ExtLink className={styles.linkedInLink} href={item.linkedin}>
              <SimpleLinkedIn />
            </ExtLink>
          )}
        </div>
      </div>
    </Modal>
  );
};
