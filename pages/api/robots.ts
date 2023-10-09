import { NextApiHandler } from "next";

// Not used at the moment. Kept here for reference.
// If you want to use this scheme rather than the static robots from next-sitemap npmjs module
// add this to next.config.js
// async rewrites() {
//   return [{ source: "/robots.txt", destination: "/api/robots" }];
// }

const mainSiteUrl = process.env.NEXT_PUBLIC_MAIN_SITE_URL;
const robots = process.env.ROBOTS;
const env = process.env.NEXT_PUBLIC_ENVIRONMENT;

const apiHandler: NextApiHandler = async (req, res) => {
  if (env === "production" && robots !== "nofollow") {
    res.end(followFile);
    return;
  }
  res.end(noFollowFile);
};

export default apiHandler;

const followFile = `# robots.txt for ${mainSiteUrl}

sitemap: ${mainSiteUrl}/sitemap.xml

User-agent: *
Allow: /
Disallow: /api/*
Disallow: /_next/*
`;

const noFollowFile = `User-Agent: *
Disallow: /`;
