import { getCraftUrl } from "lib/url";
import { NextApiHandler } from "next";

const craftUrl = getCraftUrl();
const headers: Record<string, string> = {
  "Content-Type": "application/json"
};

if (process.env.CRAFT_GRAPHQL_AUTH_TOKEN) {
  headers.Authorization = `Bearer ${process.env.CRAFT_GRAPHQL_AUTH_TOKEN}`;
}

const apiHandler: NextApiHandler = async (req, res) => {
  const path = req.url || "";
  const proxyPath = path.slice(10); // slice off `/api/cache`
  const fetchRes = await fetch(craftUrl + proxyPath, {
    method: "GET",
    headers
  });
  const craftRes = await fetchRes.json();

  res.status(200).json(craftRes);
};

export default apiHandler;
