import React from "react";
import { delay } from "./utils";

export const quickSort = async (
  arr: number[],
  low: number,
  high: number,
  setArray: React.Dispatch<React.SetStateAction<number[]>>,
  setComparing: React.Dispatch<React.SetStateAction<number[]>>,
  speed: number,
  setSwapCount: React.Dispatch<React.SetStateAction<number>>,
  setNumOfSorted: React.Dispatch<React.SetStateAction<number>>,
  setComparedCount: React.Dispatch<React.SetStateAction<number>>,
  setSwapping: React.Dispatch<React.SetStateAction<number[]>>,
  setSorted: React.Dispatch<React.SetStateAction<number[]>>
) => {
  // Reset states at start of sorting
  if (low === 0 && high === arr.length - 1) {
    setSwapCount(0);
    setComparedCount(0);
    setNumOfSorted(0);
    setComparing([]);
    setSwapping([]);
  }

  if (low < high) {
    // Highlight the current partition range
    setComparing([low, high]);
    await delay(speed);

    let pi = await partition(
      arr,
      low,
      high,
      setComparing,
      setArray,
      speed,
      setSwapCount,
      setComparedCount,
      setSwapping
    );

    // Mark the pivot as sorted and show it
    setNumOfSorted((prev) => prev + 1);
    setSorted((prev) => [...prev, pi]);

    await quickSort(
      arr,
      low,
      pi - 1,
      setArray,
      setComparing,
      speed,
      setSwapCount,
      setNumOfSorted,
      setComparedCount,
      setSwapping,
      setSorted
    );
    await quickSort(
      arr,
      pi + 1,
      high,
      setArray,
      setComparing,
      speed,
      setSwapCount,
      setNumOfSorted,
      setComparedCount,
      setSwapping,
      setSorted
    );
  }

  // Clear visual indicators at the end
  if (low === 0 && high === arr.length - 1) {
    setComparing([]);
    setSwapping([]);
    setNumOfSorted(arr.length);
  }
};

const partition = async (
  arr: number[],
  low: number,
  high: number,
  setComparing: React.Dispatch<React.SetStateAction<number[]>>,
  setArray: React.Dispatch<React.SetStateAction<number[]>>,
  speed: number,
  setSwapCount: React.Dispatch<React.SetStateAction<number>>,
  setComparedCount: React.Dispatch<React.SetStateAction<number>>,
  setSwapping: React.Dispatch<React.SetStateAction<number[]>>
) => {
  // Highlight pivot
  setComparing([high]);
  await delay(speed);

  const pivot = arr[high];
  let i = low - 1;

  for (let j = low; j <= high - 1; j++) {
    // Show current element being compared with pivot
    setComparing([j, high]);
    await delay(speed);

    // Increment comparison count
    setComparedCount((prev) => prev + 1);

    if (arr[j] < pivot) {
      i++;
      await swap(arr, i, j, setArray, speed, setSwapCount, setSwapping);
    }
  }

  // Final swap to put pivot in its correct position
  await swap(arr, i + 1, high, setArray, speed, setSwapCount, setSwapping);
  return i + 1;
};

const swap = async (
  arr: number[],
  i: number,
  j: number,
  setArray: React.Dispatch<React.SetStateAction<number[]>>,
  speed: number,
  setSwapCount: React.Dispatch<React.SetStateAction<number>>,
  setSwapping: React.Dispatch<React.SetStateAction<number[]>>
) => {
  if (i === j) return; // Don't swap if indices are the same

  // Show swapping animation
  setSwapping([i, j]);
  await delay(speed);

  // Perform swap
  [arr[i], arr[j]] = [arr[j], arr[i]];
  setSwapCount((prev) => prev + 1);
  setArray([...arr]);

  // Clear swapping animation
  setSwapping([]);
  await delay(speed / 2); // Reduced delay after swap for better flow
};
