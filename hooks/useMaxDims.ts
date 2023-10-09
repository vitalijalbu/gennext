import { useCallback, useMemo, useState } from "react";

export function useMaxDims(length: number) {
  const [heights, setHeights] = useState(Array.from({ length }, () => 0));
  const [widths, setWidths] = useState(Array.from({ length }, () => 0));
  const setItemHeight = useCallback((idx: number, height: number) => {
    setHeights((heights) => heights.map((h, j) => (j === idx ? height : h)));
  }, []);
  const setItemWidth = useCallback((idx: number, height: number) => {
    setWidths((widths) => widths.map((h, j) => (j === idx ? height : h)));
  }, []);
  const maxHeight = useMemo(() => {
    return Math.max(...(heights.length > 0 ? heights : [0]));
  }, [heights]);
  const maxWidth = useMemo(() => {
    return Math.max(...(widths.length > 0 ? widths : [0]));
  }, [widths]);

  return { maxHeight, setItemHeight, maxWidth, setItemWidth };
}
