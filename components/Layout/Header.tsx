import StyledLink from "components/Global/StyledLink";
import { Logo, Menu, MenuCross } from "components/Svg";
import { FlexLink } from "lib/link";
import Link from "next/link";
import { useGlobalData } from "queries";
import { FC, useEffect, useRef, useState } from "react";
import styles from "./Header.module.scss";
import cn from "classnames";
import { RemoveScroll } from "react-remove-scroll";
import useMediaQuery from "hooks/useMediaQuery";
import useOutsideClick from "hooks/useOutsideClick";
import { useRouter } from "next/router";

const Header: FC = () => {

  const data  = useGlobalData();
  const multiLinks = data.header.multiLinks;
  const secondaryMultiLinks = data.header.secondaryMultiLinks;
  const navigationNodes = data.navigationNodes;
  const [open, setOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, () => setOpen(false));

  const isTablet = useMediaQuery("(max-width: 1192px)");

  const [isOpen, setIsOpen] = useState("");

  const toggleMenu = (id:string) => {
    if(id == isOpen){
      setIsOpen("");
    }else{
      setIsOpen(id);
    }
   
  };

  useEffect(() => {
    if (!isTablet) {
      setOpen(false);
    }
  }, [isTablet]);

  return (
    <header ref={ref} className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logoLink}>
          <a className={styles.logoContainer}>
            <Logo />
          </a>
        </Link>
        <div className={styles.mainLinks}>
          {navigationNodes.map((item: any) => {
            return (
              <div className="dropdown" key={item.id}>
                <a className="dropdown-toggle" href="javascript:void(0);">
                {item.title} {item.children.length > 0 ? <svg fill="none" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M6 9L12 15L18 9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg> : <></>}
                </a>
                {(
                  <ul className="dropdown-menu">
                    {item.children.map((option:any) => (
                      <li key={option.href} className="dropdown-item">
                        {option.title == "Client Portal" || option.title == "Partners" ?
                      
                      <Link href={item.title == "Loan Offers" ?  option.title == "Types of Loans"  ? `/${option.urlSuffix}` :  `/loan_detail/${option.urlSuffix}`: `${option.urlSuffix === "_home_" ? "/" : option.urlSuffix}`}>
                        <a target="_blank">{option.title}</a>
                      </Link> 
                      : <Link href={item.title == "Loan Offers" ?  option.title == "Types of Loans"  ? `/${option.urlSuffix}` :  `/loan_detail/${option.urlSuffix}`: `${option.urlSuffix === "_home_" ? "/" : option.urlSuffix}`}>
                      <a >{option.title}</a>
                    </Link>}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>




        <div className={styles.secondaryLinks}>
          {secondaryMultiLinks.map((item, id) => {
            if (
              "icon" in item &&
              (item.icon?.includes("genniemac") || item.icon?.includes("login"))
            )
              return null;

            return <StyledLink key={id} linkSet={item} />;
          })}
        </div>
        <div className={styles.tabletLinks}>
          {secondaryMultiLinks.map((item, id) => {
            if (!item.__typename.includes("imageSet")) return null;

            return <StyledLink key={id} linkSet={item} />;
          })}
        </div>
        <div
          className={styles.toggler}
          onClick={() => {
            setOpen((prev) => !prev);
          }}
        >
          <Menu className={cn({ [styles.active]: !open })} />
          <MenuCross className={cn(styles.close, { [styles.active]: open })} />
        </div>
        <RemoveScroll enabled={open}>
          <div className={cn(styles.tabletMenu, { [styles.active]: open })}>
            <div className={styles.tabletSecLinks}>
              {secondaryMultiLinks.map((item, id) => {
                if (!item.__typename.includes("linkSet")) return null;

                return <StyledLink key={id} linkSet={item} />;
              })}
            </div>


            <div className={styles.tabletMainLinks}>
            {navigationNodes.map((item: any) => {
            return (
              <div className="dropdown" key={item.id}>
                <a className="dropdown-toggle" href="javascript:void(0);"  onClick={() => {toggleMenu(item.id)}}>
                {item.title} {item.children.length > 0 ? <svg fill="none" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M6 9L12 15L18 9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg> : <></>}
                </a>
                {(
                 <ul className={isOpen == item.id ? "dropdown-menu-active" : "dropdown-menu"}>
                    {item.children.map((option:any) => (
                      <li key={option.href} className="dropdown-item">
                       {option.title == "Client Portal" || option.title == "Partners" ?
                      
                      <a target="_blank" rel="noreferrer" href={item.title == "Loan Offers" ?  option.title == "Types of Loans"  ? `/${option.urlSuffix}` :  `/loan_detail/${option.urlSuffix}`: `${option.urlSuffix === "_home_" ? "/" : option.urlSuffix}`}>
                         {option.title}
                      </a> 
                      : <a href={item.title == "Loan Offers" ?  option.title == "Types of Loans"  ? `/${option.urlSuffix}` :  `/loan_detail/${option.urlSuffix}`: `${option.urlSuffix === "_home_" ? "/" : option.urlSuffix}`}>
                      {option.title}
                    </a>}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
            </div>



          </div>
        </RemoveScroll>
      </div>
    </header>
  );
};

export default Header;
