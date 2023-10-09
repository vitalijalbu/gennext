import parse from "html-react-parser";
import Head from "next/head";
import { FC } from "react";
import { SeoMarkup } from "types";

const HeadTag: FC<{ seoMarkup?: SeoMarkup | null }> = ({ seoMarkup }) => {
  const seoBlob = seoMarkup
    ? [
        seoMarkup.metaTitleContainer,
        seoMarkup.metaTagContainer,
        seoMarkup.metaLinkContainer
      ].join("")
    : "";

  return (
    <>
      <Head>
        {parse(seoBlob)}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>
    </>
  );
};

export default HeadTag;
