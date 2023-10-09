import {
  Facebook,
  Google,
  LinkedIn,
  SimpleLogo,
  Twitter
} from "components/Svg";
import { safeParse } from "lib/util";
import { useGlobalData } from "queries";
import { FC } from "react";
import styles from "./Footer.module.scss";

const Footer: FC = () => {
  const {
    company: {
      google,
      facebook,
      linkedin,
      twitter,
      snippet,
      copyright,
      created
    }
  } = useGlobalData();

  const atts = { target: "_blank", rel: "noopener noreferrer" };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.socials}>
          {!!google && (
            <a href={google} {...atts}>
              <Google />
            </a>
          )}
          {!!facebook && (
            <a href={facebook} {...atts}>
              <Facebook />
            </a>
          )}
          {!!linkedin && (
            <a href={linkedin} {...atts}>
              <LinkedIn />
            </a>
          )}
          {!!twitter && (
            <a href={twitter} {...atts}>
              <Twitter />
            </a>
          )}
        </div>
        {!!snippet && <div className={styles.nmls}>{safeParse(snippet)}</div>}
        {!!copyright && (
          <div className={styles.copyright}>
            {safeParse(
              copyright.replace(/\[year\]/, new Date().getFullYear().toString())
            )}
          </div>
        )}
        <a className={styles.logoContainer}>
          <SimpleLogo />
        </a>
        {!!created && (
          <div className={styles.created}>{safeParse(created)}</div>
        )}
      </div>
    </footer>
  );
};

export default Footer;
