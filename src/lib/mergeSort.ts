import React from "react";
import { delay } from "./utils";

export const mergeSort = async (
  arr: number[],
  left: number,
  right: number,
  setArray: React.Dispatch<React.SetStateAction<number[]>>,
  setComparing: React.Dispatch<React.SetStateAction<number[]>>,
  speed: number,
  setSwapCount: React.Dispatch<React.SetStateAction<number>>,
  setNumOfSorted: React.Dispatch<React.SetStateAction<number>>,
  setComparedCount: React.Dispatch<React.SetStateAction<number>>,
  setSwapping: React.Dispatch<React.SetStateAction<number[]>>,
  setSorted: React.Dispatch<React.SetStateAction<number[]>>
) => {
  if (left === 0 && right === arr.length - 1) {
    setSwapCount(0);
    setComparedCount(0);
    setNumOfSorted(0);
    setSorted([]);
  }

  if (left < right) {
    const mid = Math.floor(left + (right - left) / 2);

    await mergeSort(
      arr,
      left,
      mid,
      setArray,
      setComparing,
      speed,
      setSwapCount,
      setNumOfSorted,
      setComparedCount,
      setSwapping,
      setSorted
    );
    await mergeSort(
      arr,
      mid + 1,
      right,
      setArray,
      setComparing,
      speed,
      setSwapCount,
      setNumOfSorted,
      setComparedCount,
      setSwapping,
      setSorted
    );
    await merge(
      arr,
      left,
      mid,
      right,
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
};

const merge = async (
  arr: number[],
  left: number,
  mid: number,
  right: number,
  setArray: React.Dispatch<React.SetStateAction<number[]>>,
  setComparing: React.Dispatch<React.SetStateAction<number[]>>,
  speed: number,
  setSwapCount: React.Dispatch<React.SetStateAction<number>>,
  setNumOfSorted: React.Dispatch<React.SetStateAction<number>>,
  setComparedCount: React.Dispatch<React.SetStateAction<number>>,
  setSwapping: React.Dispatch<React.SetStateAction<number[]>>,
  setSorted: React.Dispatch<React.SetStateAction<number[]>>
) => {
  const tempArray = [...arr];
  let i = left;
  let j = mid + 1;
  let k = left;

  while (i <= mid && j <= right) {
    setComparing([i, j]);
    setComparedCount((prev) => prev + 1);
    await delay(speed);

    if (tempArray[i] <= tempArray[j]) {
      setSwapping([k]);
      arr[k] = tempArray[i];
      i++;
    } else {
      setSwapping([k]);
      arr[k] = tempArray[j];
      j++;
    }
    setArray([...arr]);
    if (arr[k] !== tempArray[k]) {
      setSwapCount((prev) => prev + 1);
    }
    await delay(speed);
    k++;
  }

  while (i <= mid) {
    setSwapping([k]);
    arr[k] = tempArray[i];
    setArray([...arr]);
    if (arr[k] !== tempArray[k]) {
      setSwapCount((prev) => prev + 1);
    }
    await delay(speed);
    i++;
    k++;
  }

  while (j <= right) {
    setSwapping([k]);
    arr[k] = tempArray[j];
    setArray([...arr]);
    if (arr[k] !== tempArray[k]) {
      setSwapCount((prev) => prev + 1);
    }
    await delay(speed);
    j++;
    k++;
  }

  if (right - left + 1 === arr.length) {
    for (let i = left; i <= right; i++) {
      setSorted((prev) => [...prev, i]);
    }
    setNumOfSorted(right - left + 1);
  }

  setComparing([-1, -1]);
  setSwapping([]);
};
