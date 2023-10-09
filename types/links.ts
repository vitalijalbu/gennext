import { SingleAsset } from "./assets";

export interface LinkSet {
  id?: string;
  __typename: string;
  label: string | null;
  path: string | null;
  entry: SingleEntry;
}

export interface AssetLink {
  id?: string;
  asset: SingleAsset;
  path: string | null;
  entry: SingleEntry;
}

export interface IconLinkSet {
  id?: string;
  __typename: string;
  icon: string | null;
  path: string | null;
  entry: SingleEntry;
}

export interface Entry {
  id: string;
  uri: string;
  title?: string;
}

export interface Link {
  label: string | null;
  path: string | null;
}

export type SingleEntry = [Entry] | [];

export type MultiEntries = Entry[];

export type SingleLink = [LinkSet] | [];

export type MultiLinks = LinkSet[];

export type AssetLinks = AssetLink[];

export type LinkList = Link[];

export type StyledLinks = (LinkSet | IconLinkSet)[];
