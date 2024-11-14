import React from "react";
import { delay } from "./utils";

export const bubbleSort = async (
  arr: number[],
  setArray: React.Dispatch<React.SetStateAction<number[]>>,
  setComparing: React.Dispatch<React.SetStateAction<number[]>>,
  setSwapCount: React.Dispatch<React.SetStateAction<number>>,
  speed: number,
  setNumOfSorted: React.Dispatch<React.SetStateAction<number>>,
  setComparedCount: React.Dispatch<React.SetStateAction<number>>,
  setSwapping: React.Dispatch<React.SetStateAction<number[]>>,
  setSorted: React.Dispatch<React.SetStateAction<number[]>>
) => {
  const len = arr.length;
  let swapped: boolean;
  let lastUnsorted = len - 1;

  // Reset states at the start
  setSwapCount(0);
  setComparedCount(0);
  setNumOfSorted(0);

  for (let i = 0; i < len; i++) {
    swapped = false;
    // Only iterate up to the last unsorted element
    for (let j = 0; j < lastUnsorted; j++) {
      setComparing([j, j + 1]);
      await delay(speed);

      if (arr[j] > arr[j + 1]) {
        // Show swapping animation
        setSwapping([j, j + 1]);
        await delay(speed);

        // Perform swap
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
        setSwapCount((prev) => prev + 1);
        setArray([...arr]);

        // Clear swapping animation
        setSwapping([]);
        await delay(speed);
      }
      setComparedCount((prev) => prev + 1);
    }

    // After each pass, the last element is guaranteed to be in place
    lastUnsorted--;
    setNumOfSorted(len - lastUnsorted - 1);
    setSorted((prev) => [...prev, lastUnsorted + 1]);

    if (!swapped) {
      // If no swaps occurred, array is sorted
      setNumOfSorted(len);
      setComparing([]); // Clear comparison indicators
      break;
    }
  }
};
