export function calculateVerticalPercentage(
  bounds: ClientRect,
  offset: number = 0,
  root: Window | Element | null | undefined = window
) {
  if (!root) return 0;

  const vh =
    (root instanceof Element ? root.clientHeight : root.innerHeight) || 0;
  const visibleHeight = vh - bounds.y - offset;

  const percentage = (visibleHeight * 100) / bounds.height;

  return Math.max(0, Math.min(100, Number(percentage.toFixed(2))));
}

export function calculateHorizontalPercentage(
  bounds: ClientRect,
  threshold: number = 0,
  root: Window | Element | null | undefined = window
) {
  if (!root) return 0;
  const vw =
    (root instanceof Element ? root.clientWidth : root.innerWidth) || 0;
  const offset = threshold * bounds.width;
  const percentage = (bounds.right - offset) / (vw + bounds.width - offset * 2);

  return 1 - Math.max(0, Math.min(1, percentage));
}
