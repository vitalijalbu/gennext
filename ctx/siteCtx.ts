import { createContext, useContext } from "react";

export type SiteNames = "default" /* | "sitenameSpanish" | "sitenameFrench" */;

export interface SinglePageVars {
  site: SiteNames;
}

export interface DetailPageVars extends SinglePageVars {
  uri: string;
}

export const SiteCtx = createContext<SiteCtxProps>({
  site: "default"
});

export const useSiteCtx = (): SiteCtxProps => {
  return useContext(SiteCtx);
};

export interface SiteCtxProps {
  site: SiteNames;
}

export const siteFromLocale = (locale: string | undefined): SiteNames => {
  switch (locale) {
    case "en":
      return "default";
    // case "es":
    //   return "sitenameSpanish";
    default:
      return "default";
  }
};
