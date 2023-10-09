import Router, { NextRouter, useRouter } from "next/router";
import { useEffect } from "react";

type Handler = (route: string, router: NextRouter) => void;
interface Options {
  onInit?: boolean;
}

const useOnRouteComplete = (handler: Handler, options: Options = {}): void => {
  const { onInit = true } = options;
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (route: string): void => {
      handler(route, Router);
    };

    if (onInit) {
      handler(router.asPath, Router);
    }

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [onInit, handler]);
};

export default useOnRouteComplete;
