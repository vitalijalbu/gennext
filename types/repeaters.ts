import { SingleAsset } from "./assets";
import { SingleEntry, StyledLinks } from "./links";

export interface AssetHeaderSnippet {
  id?: string;
  asset: SingleAsset;
  header: string | null;
  snippet: string | null;
}

export interface AssetHeaderSnippetLink {
  id?: string;
  asset: SingleAsset;
  header: string | null;
  snippet: string | null;
  label: string | null;
  path: string | null;
  entry: SingleEntry;
}

export interface TeamMember {
  id?: string;
  title?: string;
  asset: SingleAsset;
  header: string | null;
  snippet: string | null;
  multiLinks: StyledLinks;
  secondarySnippet: string | null;
  linkedin: string | null;
}

export interface HeaderLinks {
  id?: string;
  header: string | null;
  links: { link: string | null }[] | [];
}

export type AssetHeaderSnippetRepeater = AssetHeaderSnippet[];
export type AssetHeaderSnippetLinkRepeater = AssetHeaderSnippetLink[];
export type TeamMembers = TeamMember[];
export type HeaderLinksRepeater = HeaderLinks[];
