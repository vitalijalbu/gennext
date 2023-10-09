import { PreviewData } from "next";

interface TPreviewData {
  token?: string;
}

export const getPreviewToken = (
  previewData: PreviewData
): string | undefined => {
  if (typeof previewData === "object") {
    const data = previewData as TPreviewData;
    return data.token;
  }
  return undefined;
};
