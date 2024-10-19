import React from "react";
import { delay } from "./utils";

export const bubbleSort = async (
  arr: number[],
  setArray: React.Dispatch<React.SetStateAction<number[]>>,
  setComparing: React.Dispatch<React.SetStateAction<number[]>>,
  setSwapCount: React.Dispatch<React.SetStateAction<number>>,
  speed: number,
  isDelay: boolean,
  setNumOfSorted: React.Dispatch<React.SetStateAction<number>>
) => {
  let len = arr.length;
  let swapped;
  let sortedCount = 0;

  for (let i = 0; i < len; i++) {
    swapped = false;
    for (let j = 0; j < len - i - 1; j++) {
      setComparing([j, j + 1]);
      if (isDelay) await delay(speed);

      if (arr[j] > arr[j + 1]) {
        // Swap elements
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
        setSwapCount((prev) => prev + 1);
        // Update the array state
        setArray([...arr]);
        if (isDelay) await delay(speed);
      }
    }
    sortedCount += 1;
    setNumOfSorted(sortedCount);
    if (!swapped) {
      // If no swaps occurred, array is sorted
      setNumOfSorted(len);
      break;
    }
  }
  setComparing(Array.from({ length: len }, (_, idx) => idx));
};
