import { getCraftUrl } from "lib/url";
import { NextApiHandler, NextApiRequest } from "next";
import qs from "querystring";

const headers: Record<string, string> = {
  "Content-Type": "application/json"
};

if (process.env.CRAFT_GRAPHQL_AUTH_TOKEN) {
  headers.Authorization = `Bearer ${process.env.CRAFT_GRAPHQL_AUTH_TOKEN}`;
}

const apiHandler: NextApiHandler = async (req, res) => {
  const token = getToken(req);
  const craftRes = await getCraftResponse(req, token);

  res.status(200).json(craftRes);
};

export default apiHandler;

const getCraftResponse = async (
  req: NextApiRequest,
  token: string | undefined
): Promise<Response> => {
  const fetchRes = await fetch(
    getCraftUrl() + "/graphql" + getQueryString(token),
    {
      method: "POST",
      body: JSON.stringify(req.body),
      headers
    }
  );
  return await fetchRes.json();
};

const getQueryString = (token: string | undefined): string => {
  if (typeof token === "string") {
    return "?" + qs.stringify({ token });
  }
  return "";
};

const getToken = (req: NextApiRequest): string | undefined => {
  if (typeof req.query.token === "string") {
    return req.query.token;
  }
  return undefined;
};
