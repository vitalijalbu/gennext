import Script from "next/script";
import { FC, useEffect, useRef, useState } from "react";

const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
const grId = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
const notDev = process.env.NEXT_PUBLIC_ENVIRONMENT !== "dev";

declare global {
  interface Window {
    waited?: boolean;
  }
}

const GlobalScripts: FC<{ wait?: number }> = ({ wait = 0 }) => {
  // waitRef should never change, if it does we don't care since this is only meant to happen once
  const waitRef = useRef(wait);
  // we need this to trigger the component to render after the initial timeout
  const [, setIsReady] = useState(false);
  const ready = typeof window !== "undefined" && window.waited;

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (!window.waited) {
      timeoutId = setTimeout(() => {
        window.waited = true;
        setIsReady(true);
      }, waitRef.current);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <>
      {ready && (
        <Script
          {...{
            id: "bnt_script",
            widget: "1506",
            src: "https://www.bntouchmortgage.net/api/chat/chat.generator.js"
          }}
        />
      )}
      {!!grId && ready && (
        <Script
          id="__gr__"
          src={`https://www.google.com/recaptcha/api.js?render=${grId}`}
        />
      )}
      {!!gtmId && ready && notDev && (
        <>
          <Script id="__gtm__">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');`}
          </Script>
          <Script id="__gtm_noscript__">
            {`var noscript = document.createElement("noscript");
              var iframe = document.createElement("iframe");
              
              iframe.src = "https://www.googletagmanager.com/ns.html?id=${gtmId}";
              iframe.height = "0";
              iframe.width = "0";
              iframe.style.display = "none";
              iframe.style.visibility = "hidden";
              noscript.appendChild(iframe);
              document.body.insertBefore(noscript, document.body.childNodes[0]);`}
          </Script>
        </>
      )}
    </>
  );
};

export default GlobalScripts;
