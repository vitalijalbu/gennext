import { useCallback, useEffect, useState } from "react";

export interface UsePresentationProps {
  length: number;
  initial?: number;
  autoplay?: boolean;
  autoplayDuration?: number;
  infinite?: boolean;
}

export interface UsePresentationState {
  current: number;
  next: number;
  prev: number;
  direction: "fwd" | "rev" | undefined;
  orderList: number[];
  onFirst: boolean;
  onLast: boolean;
  goTo: (n: number) => void;
  goToNext: () => void;
  goToPrev: () => void;
  getPrevIdx: (current: number) => number;
  getNextIdx: (current: number) => number;
}

export const usePresentation = (
  usePresentationProps: UsePresentationProps
): UsePresentationState => {
  const {
    length,
    initial = 0,
    autoplay = false,
    autoplayDuration = 8899,
    infinite = true
  } = usePresentationProps;
  const [{ current, next, prev, direction, orderList }, setSliderState] =
    useState<{
      current: number;
      next: number;
      prev: number;
      direction: "fwd" | "rev" | undefined;
      orderList: number[];
    }>({
      current: initial,
      next: getNext(initial, length),
      prev: getPrev(initial, length),
      direction: undefined,
      orderList: getOrderList(initial, length)
    });
  const goTo = useCallback(
    (idx: number): void => {
      setSliderState((prevState) => {
        const direction = getDirection(prevState.current, idx, length);

        return {
          current: idx,
          next: getNext(idx, length),
          prev: getPrev(idx, length),
          direction,
          orderList: getOrderList(idx, length)
        };
      });
    },
    [length]
  );
  const goToNext = useCallback((): void => {
    setSliderState((prevState) => {
      return prevState.current === length - 1 && !infinite
        ? prevState
        : {
            current: getNext(prevState.current, length),
            next: getNext(prevState.next, length),
            prev: getNext(prevState.prev, length),
            direction: "fwd",
            orderList: getOrderList(prevState.next, length)
          };
    });
  }, [infinite, length]);
  const goToPrev = useCallback((): void => {
    setSliderState((prevState) => {
      return prevState.current === 0 && !infinite
        ? prevState
        : {
            current: getPrev(prevState.current, length),
            next: getPrev(prevState.next, length),
            prev: getPrev(prevState.prev, length),
            direction: "rev",
            orderList: getOrderList(prevState.prev, length)
          };
    });
  }, [infinite, length]);
  const getPrevIdx = useCallback(
    (current: number): number => {
      return getPrev(current, length);
    },
    [length]
  );
  const getNextIdx = useCallback(
    (current: number): number => {
      return getNext(current, length);
    },
    [length]
  );
  const onFirst = current === 0;
  const onLast = current === length - 1;

  useEffect(() => {
    let id: number | undefined = undefined;

    if (autoplay) {
      id = window.setInterval(() => {
        goToNext();
      }, autoplayDuration);
    } else {
      window.clearInterval(id);
    }
    return () => {
      window.clearInterval(id);
    };
  }, [autoplay, autoplayDuration, goToNext]);

  return {
    current,
    next,
    prev,
    direction,
    orderList,
    onFirst,
    onLast,
    goTo,
    goToNext,
    goToPrev,
    getPrevIdx,
    getNextIdx
  };
};

const getNext = (current: number, total: number): number => {
  if (total === 0) return 0;
  return current + 1 > total - 1 ? 0 : current + 1;
};

const getPrev = (current: number, total: number): number => {
  if (total === 0) return 0;
  return current - 1 < 0 ? total - 1 : current - 1;
};

const getOrderList = (current: number, total: number): number[] => {
  if (total <= 0) return [];

  const totalArray = new Array(total).fill(0);

  const orderList = totalArray.map((_, id) => {
    if (current + id >= total) return current + id - total;

    return current + id;
  });

  return orderList;
};

const getDirection = (
  prev: number,
  current: number,
  total: number
): Direction => {
  if (prev === total - 1 && current === 0) return "fwd";
  if (prev === 0 && current === total - 1) return "rev";
  if (prev < current) return "fwd";
  if (prev > current) return "rev";
  return undefined;
};

export type Direction = "fwd" | "rev" | undefined;
