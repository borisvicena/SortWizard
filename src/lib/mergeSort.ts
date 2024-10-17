import React from "react";
import { delay } from "./utils";

export const mergeSort = async (
  arr: number[],
  left: number,
  right: number,
  setArray: React.Dispatch<React.SetStateAction<number[]>>,
  setComparing: React.Dispatch<React.SetStateAction<number[]>>,
  speed: number
) => {
  if (left < right) {
    const mid = Math.floor(left + (right - left) / 2);
    await mergeSort(arr, left, mid, setArray, setComparing, speed);
    await mergeSort(arr, mid + 1, right, setArray, setComparing, speed);
    await merge(arr, left, mid, right, setArray, setComparing, speed);
  }
  setComparing(Array.from({ length: arr.length }, (_, idx) => idx));
};

const merge = async (
  arr: number[],
  left: number,
  mid: number,
  right: number,
  setArray: React.Dispatch<React.SetStateAction<number[]>>,
  setComparing: React.Dispatch<React.SetStateAction<number[]>>,
  speed: number
) => {
  const n1 = mid - left + 1;
  const n2 = right - mid;

  const L = new Array(n1);
  const R = new Array(n2);

  for (let i = 0; i < n1; i++) {
    L[i] = arr[left + i];
  }
  for (let j = 0; j < n2; j++) {
    R[j] = arr[mid + 1 + j];
  }

  let i = 0,
    j = 0;
  let k = left;

  while (i < n1 && j < n2) {
    setComparing([left + i, mid + 1 + j]);
    await delay(speed);
    if (L[i] <= R[j]) {
      arr[k] = L[i];
      i++;
    } else {
      arr[k] = R[j];
      j++;
    }
    setArray([...arr]);
    k++;
  }

  while (i < n1) {
    arr[k] = L[i];
    setArray([...arr]);
    i++;
    k++;
  }

  while (j < n2) {
    arr[k] = R[j];
    setArray([...arr]);
    j++;
    k++;
  }
};
