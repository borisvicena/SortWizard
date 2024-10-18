import React from "react";
import { delay } from "./utils";

export const bubbleSort = async (
  arr: number[],
  setArray: React.Dispatch<React.SetStateAction<number[]>>,
  setComparing: React.Dispatch<React.SetStateAction<number[]>>,
  setSwapCount: React.Dispatch<React.SetStateAction<number>>,
  speed: number
) => {
  let len = arr.length;
  let swapped;

  for (let i = 0; i < len; i++) {
    swapped = false;
    for (let j = 0; j < len - i - 1; j++) {
      setComparing([j, j + 1]);
      await delay(speed);

      if (arr[j] > arr[j + 1]) {
        // Swap elements
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
        setSwapCount((prev) => prev + 1);
        // Update the array state
        setArray([...arr]);
        await delay(speed);
      }
    }
    if (!swapped) break;
  }
  setComparing(Array.from({ length: len }, (_, idx) => idx));
};
