import { createContext, useContext } from "react";

export const DetailCtx = createContext<DetailCtxProps>({
  slug: ""
});

export const useDetailCtx = (): DetailCtxProps => {
  return useContext(DetailCtx);
};

export type DetailCtxProps = {
  slug: string;
};
