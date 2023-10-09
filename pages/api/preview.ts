import { getNextUrl } from "lib/url";
import { NextApiHandler } from "next";

const previewApiHandler: NextApiHandler = async (req, res) => {
  const { query } = req;
  const url = getNextUrl();
  const uri = query.uri === "__home__" ? "" : query.uri;
  const path = "/" + uri;
  const fullUrl = url + path;

  if (query.secret !== process.env.CRAFT_PREVIEW_SECRET || !query.uri) {
    return res.status(401).json({ message: "Invalid token" });
  }

  // set cookies on response in order to get them below
  // these never reach craft because of the iframe, but we don't care
  // passing in the token to be able to receive it inside getStaticProps or getServerSideProps
  res.setPreviewData({ token: query.token });
  // get the headers that we just set above
  const headers = res.getHeaders();
  const cookiesToSet = headers["set-cookie"] as string[];
  const Cookie = cookiesToSet.join(";");

  // fetch with those set headers from server side right here
  const previewRes = await fetch(fullUrl, {
    method: "GET",
    headers: { Cookie }
  });
  if (previewRes.status === 404) {
    res.clearPreviewData();
    res.end("404 error");
    return;
  }
  const htmlText = await previewRes.text();

  // clear the preview data before sending back the response since we only need it for the above fetch request
  // if we dont do this all kinds of problems arise such as
  // 1. the browser still storing the cookies and then the site appears as though there is no ISG
  // 2. the <Link tags from the iframe in craft will start prefetching stuff with the cookies,
  // and the getStaticProps will start running with the preview in the context and querying all kinds of un-cached data.
  // It has been known to crash the resources
  res.clearPreviewData();
  // send back the response as plain text for the iframe
  res.end(htmlText);
};

export default previewApiHandler;
