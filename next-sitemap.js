const siteUrl = process.env.NEXT_PUBLIC_MAIN_SITE_URL;
const isProd = process.env.NEXT_PUBLIC_ENVIRONMENT === "production";
const nofollow = process.env.ROBOTS === "nofollow";

const prodPolicies = [
  { userAgent: "*", allow: "/", disallow: ["/api/*", "/_next/*"] }
];
const devPolicies = [{ userAgent: "*", disallow: "/" }];

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: isProd && !nofollow ? prodPolicies : devPolicies
  }
};
