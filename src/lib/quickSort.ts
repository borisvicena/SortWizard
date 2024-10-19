import React from "react";
import { delay } from "./utils";

export const quickSort = async (
  arr: number[],
  low: number,
  high: number,
  setArray: React.Dispatch<React.SetStateAction<number[]>>,
  setComparing: React.Dispatch<React.SetStateAction<number[]>>,
  speed: number,
  isDelay: boolean
) => {
  if (low < high) {
    let pi = await partition(arr, low, high, setComparing, setArray, speed, isDelay);
    await quickSort(arr, low, pi - 1, setArray, setComparing, speed, isDelay);
    await quickSort(arr, pi + 1, high, setArray, setComparing, speed, isDelay);
  }
  setComparing(Array.from({ length: arr.length }, (_, idx) => idx));
};

/*
    Partition
    - function for partition
*/
const partition = async (
  arr: number[],
  low: number,
  high: number,
  setComparing: React.Dispatch<React.SetStateAction<number[]>>,
  setArray: React.Dispatch<React.SetStateAction<number[]>>,
  speed: number,
  isDelay: boolean
) => {
  const pivot = arr[high];
  let i = low - 1;

  for (let j = low; j <= high - 1; j++) {
    setComparing([j, high]);
    if (isDelay) await delay(speed);
    if (arr[j] < pivot) {
      i++;
      await swap(arr, i, j, setArray, speed, isDelay);
    }
  }

  await swap(arr, i + 1, high, setArray, speed, isDelay);
  return i + 1;
};

/*
    Swap
    - function to swap 2 values
*/
const swap = async (
  arr: number[],
  i: number,
  j: number,
  setArray: React.Dispatch<React.SetStateAction<number[]>>,
  speed: number,
  isDelay: boolean
) => {
  let tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
  setArray([...arr]);
  if (isDelay) await delay(speed);
};
