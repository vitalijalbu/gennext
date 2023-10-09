import { default as NextLink } from "next/link";
import { useRouter } from "next/router";
import { AnchorHTMLAttributes, FC, ReactNode } from "react";

type AnchorAtt = AnchorHTMLAttributes<HTMLAnchorElement>;

export type LinkSet = {
  path?: string | null | undefined;
  label?: string | null | undefined | ReactNode;
  entry: ({
    id?: string | null | undefined;
    title?: string | null | undefined;
    uri?: string | null | undefined;
  } | null)[];
} | null;

export type FlexLinkProps = AnchorAtt & {
  linkSet: LinkSet;
};

export const FlexLink: FC<FlexLinkProps> = (props) => {
  const { linkSet, onClick, className, children, style } = props;
  const defProps = { onClick, className, style };

  const router = useRouter();

  if (linkSet) {
    const { path, label, entry } = linkSet;
    if (entry[0]) {
      const uri = entry[0].uri ?? "";
      const l = label ?? entry[0].title;

      return (
        <NextLink href={`/${uri === "__home__" ? "" : uri}`}>
          <a {...defProps}>{children ?? l}</a>
        </NextLink>
      );
    }
    if (path && (path.startsWith("#") || path.startsWith("/#"))) {
      return (
        <NextLink href="/" shallow={router.pathname === "/"}>
          <a
            {...defProps}
            onClick={(e) => {
              sessionStorage.setItem(
                "anchor",
                path.slice(path.startsWith("#") ? 1 : 2)
              );
              typeof defProps.onClick === "function" && defProps.onClick(e);
            }}
          >
            {children ?? label}
          </a>
        </NextLink>
      );
    }
    if (path) {
      const p = {
        target: "_blank",
        rel: "noreferrer"
      };

      if (path.startsWith("http") || path.startsWith("//")) {
        return (
          <NextLink href={`/redirect?link=${path}`}>
            <a {...p} {...defProps}>
              {children ?? label}
            </a>
          </NextLink>
        );
      }

      return (
        <NextLink href={path}>
          <a {...defProps}>{children ?? label}</a>
        </NextLink>
      );
    }

    return (
      <NextLink href="#">
        <a {...defProps}>{children ?? label}</a>
      </NextLink>
    );
  }

  return null;
};
