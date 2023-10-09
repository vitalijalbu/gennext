import { GennieMacLogo, Login, Phone } from "components/Svg";
import { FlexLink } from "lib/link";
import { safeParse } from "lib/util";
import { FC } from "react";
import { IconLinkSet, LinkSet } from "types";
import styles from "./StyledLink.module.scss";

type StyledLinkProps = {
  linkSet: LinkSet | IconLinkSet;
};

const StyledLink: FC<StyledLinkProps> = ({ linkSet }) => {
  if (linkSet) {
    if ("icon" in linkSet && linkSet.__typename.includes("imageSet")) {
      return (
        <FlexLink className={styles.iconLink} linkSet={linkSet}>
          {chooseIcon(linkSet.icon)}
        </FlexLink>
      );
    }

    if ("label" in linkSet && linkSet.__typename.includes("styledLink")) {
      return (
        <FlexLink className={styles.styledLink} linkSet={linkSet}>
          {safeParse(linkSet.label)}
        </FlexLink>
      );
    }

    if (linkSet.__typename.includes("linkSet")) {
      return <FlexLink className={styles.defaultLink} linkSet={linkSet} />;
    }
  }

  return null;
};

export default StyledLink;

const chooseIcon = (name: string | null) => {
  if (name === "phone") {
    return <Phone className={styles.phone} />;
  }
  if (name === "genniemac") {
    return <GennieMacLogo className={styles.logo} />;
  }
  if (name === "login") {
    return <Login className={styles.login} />;
  }

  return null;
};
