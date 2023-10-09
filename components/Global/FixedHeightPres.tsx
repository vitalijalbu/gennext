import { useMaxDims } from "hooks/useMaxDims";
import ResizeObserver from "rc-resize-observer";
import { FC } from "react";

type FcProps<T> = {
  items: T[];
  wrapperCn?: string;
  ItemCmp: FC<T & { index: number; activeId: number }>;
  currId: number;
};

function FixedHeightPres<T>({
  items,
  wrapperCn,
  ItemCmp,
  currId
}: FcProps<T>): JSX.Element {
  const length = items.length;
  const { maxHeight, setItemHeight, setItemWidth } = useMaxDims(length);

  return (
    <div className={wrapperCn}>
      <div style={{ height: maxHeight }}>
        {items.map((item, idx) => {
          return (
            <ResizeObserver
              key={idx}
              onResize={({ height, width }) => {
                setItemHeight(idx, height);
                setItemWidth(idx, width);
              }}
            >
              <ItemCmp key={idx} {...item} index={idx} activeId={currId} />
            </ResizeObserver>
          );
        })}
      </div>
    </div>
  );
}

export default FixedHeightPres;
