import { useRouter } from "next/router";
import { FC, useEffect } from "react";

const ResourcesPage: FC = () => {
  const router = useRouter();

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      router.query.link &&
      typeof router.query.link === "string"
    ) {
      window.location.href = router.query.link;
    }
  }, [router]);

  return <></>;
};

export default ResourcesPage;
