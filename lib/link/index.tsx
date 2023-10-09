import { AnchorHTMLAttributes, FC } from "react";

export * from "./FlexLink";

export interface ExtLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  newTab?: boolean;
}

export const ExtLink: FC<ExtLinkProps> = (props) => {
  const { href = "#", children, newTab = true, ...rest } = props;
  const atts = newTab
    ? { ...rest, target: "_blank", rel: "noopener noreferrer" }
    : { ...rest };

  if (href.startsWith("http") || href.startsWith("//")) {
    return (
      <a href={`/redirect?link=${href}`} {...atts}>
        {children}
      </a>
    );
  }

  return (
    <a href={href} {...atts}>
      {children}
    </a>
  );
};
