import parse from "html-react-parser";
import { SingleEntry, SingleLink } from "types";

export const getLinkUrl = (
  path: string | null | undefined,
  entry: SingleEntry | undefined
): string => {
  let href = path || "#";

  if (entry?.length) {
    const [entryItem] = entry;

    href = `/${entryItem.uri}`;
  }

  if (href.startsWith("#")) {
    return `/${href}`;
  }

  return href;
};

export const getLinkInfo = (
  link: SingleLink
): { label: string | null | undefined; href: string } => {
  const { label, path, entry } = link[0] || {};
  const href = getLinkUrl(path, entry);

  return { label, href };
};

export const safeParse = (string: string | null): ReturnType<typeof parse> => {
  return parse(string || "");
};

interface DateParams {
  month?: "long" | "numeric" | "2-digit" | "short" | "narrow" | undefined;
  day?: "numeric" | "2-digit" | undefined;
  year?: "numeric" | "2-digit" | undefined;
}

export const parseDate = (date: string, dateParams?: DateParams): string => {
  const d = new Date(date);
  const dateString = d.toLocaleString("default", {
    month: dateParams?.month || "long",
    day: dateParams?.day || "numeric",
    year: dateParams?.year || "numeric"
  });

  return dateString;
};

export const replaceNewlineWithBreakTag = (s: string): string => {
  return s.replace(/(\r\n|\r|\n)/g, "<br>");
};
