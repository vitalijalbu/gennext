import breakPts from "scss/vars.module.scss";

export function sizesOnDevice(props: SizesProps): string {
  const { wide, desktop, laptop, tablet, phone } = props;
  const pairs = [
    [breakPts.wideBreak, wide],
    [breakPts.desktopBreak, desktop],
    [breakPts.laptopBreak, laptop],
    [breakPts.tabletBreak, tablet]
  ];
  const filteredPairs = pairs.filter(([, w]) => typeof w === "string");
  const last = typeof phone === "string" ? phone : "100vw";
  const joined = commaJoined(cascaded(filteredPairs as Pairs));
  const array = joined.length ? [joined, last] : [last];

  return commaJoined(array);
}

function cascaded(breakSizePairs: Pairs): string[] {
  return breakSizePairs.map((pair) => {
    const [breakPt, containerWidth] = pair;
    return `(min-width: ${addOne(breakPt)}) ${containerWidth}`;
  });
}

function addOne(s: string): string {
  const n = parseFloat(s);
  return (n + 1).toString() + "px";
}

function commaJoined(a: string[]): string {
  return a.join(", ");
}

type Pairs = [string, string][];

export interface SizesProps {
  wide?: string;
  desktop?: string;
  laptop?: string;
  tablet?: string;
  phone?: string;
}
