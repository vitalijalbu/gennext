export interface Asset {
  id: string;
  url: string;
  mimeType: string;
  title: string;
}

export interface FullAsset extends Asset {
  width: number;
  height: number;
}

export type SingleAsset = [Asset] | [];

export type FullSingleAsset = [FullAsset] | [];

export type MultiAssets = Asset[];

export type FullMultiAssets = FullAsset[];
