import { IntersectionOptions } from "react-intersection-observer";

export interface ScrollPercentageOptions extends IntersectionOptions {
  offset?: number;
  horizontal?: boolean;
}

export type ScrollPercentageHookResponse = [
  (node?: Element | null) => void,
  number | string,
  IntersectionObserverEntry | undefined
];
