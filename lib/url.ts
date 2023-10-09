const craftInternal = process.env.CRAFT_INTERNAL_SERVICE_URL;
const craftExternal = process.env.NEXT_PUBLIC_API_URL;
const nextInternal = process.env.NEXT_INTERNAL_SERVICE_URL;
const nextExternal = process.env.NEXT_PUBLIC_MAIN_SITE_URL;
const assetUrl = process.env.NEXT_PUBLIC_ASSET_URL;

export const getCraftUrl = (): string => {
  if (typeof window === "undefined") {
    return craftInternal || craftExternal || "";
  }
  return craftExternal || "";
};

export const getNextUrl = (): string => {
  if (typeof window === "undefined") {
    return nextInternal || nextExternal || "";
  }
  return nextExternal || "";
};

export const getNextCacheUrl = (): string => {
  return assetUrl || nextExternal || "";
};
