import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import Banner from "./Sections/Banner";
import S1 from "./Sections/S1";
import S2 from "./Sections/S2";
import S3 from "./Sections/S3";

const HomepageMain: FC = () => {
  const router = useRouter();

  useEffect(() => {
    const anchor = sessionStorage.getItem("anchor");
    sessionStorage.removeItem("anchor");
    let tm: NodeJS.Timeout;

    if (anchor && typeof anchor === "string") {
      const el = document.getElementById(anchor);

      if (el) {
        tm = setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }

    return () => {
      clearTimeout(tm);
    };
  }, [router]);

  return (
    <>
      <Banner />
      <S1 />
      <S2 />
      <S3 />
    </>
  );
};

export default HomepageMain;
