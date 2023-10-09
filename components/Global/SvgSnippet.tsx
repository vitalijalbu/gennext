import { FC, AnchorHTMLAttributes } from "react";
import styles from "./SvgSnippet.module.scss";

type AnchorAtt = AnchorHTMLAttributes<HTMLAnchorElement>;

const SvgSnippet: FC<AnchorAtt> = ({ children }) => {
  return <div className={styles.mainBlock}>{children}</div>;
};

export default SvgSnippet;
