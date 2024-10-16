"use client";
import { spawn } from "child_process";
import { resolve } from "path";
import React, { useEffect, useState } from "react";

const Chart = () => {
  const [array, setArray] = useState<number[]>([]);
  const [isSorting, setIsSorting] = useState(false);
  const [comparing, setComparing] = useState([-1, -1]);
  const [sorted, setSorted] = useState<number[]>([]);

  useEffect(() => {
    resetArray();
  }, []);

  const resetArray = () => {
    const newArray = [];
    for (let i = 0; i < 50; i++) {
      newArray.push(randomIntFromInterval(5, 200));
    }
    setArray(newArray);
    setComparing([-1, -1]);
    setSorted([]);
  };

  const randomIntFromInterval = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const bubbleSort = async () => {
    setIsSorting(true);
    setSorted([]);
    let arr = [...array];
    let len = arr.length;
    let swapped;

    for (let i = 0; i < len; i++) {
      swapped = false;
      for (let j = 0; j < len - i - 1; j++) {
        setComparing([j, j + 1]);
        await new Promise((resolve) => setTimeout(resolve, 20));

        if (arr[j] > arr[j + 1]) {
          let tmp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = tmp;
          swapped = true;

          setArray([...arr]);
          await new Promise((resolve) => setTimeout(resolve, 20));
        }
      }
      if (!swapped) break;
    }
    setComparing([-1, -1]);
    await finalCheck();
    setIsSorting(false);
  };

  const swap = async (arr: number[], i: number, j: number) => {
    let tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
    setArray([...arr]);
    await new Promise((resolve) => setTimeout(resolve, 50));
  };

  const partition = async (arr: number[], low: number, high: number) => {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j <= high - 1; j++) {
      setComparing([j, high]);
      await new Promise((resolve) => setTimeout(resolve, 50));

      if (arr[j] < pivot) {
        i++;
        await swap(arr, i, j);
      }
    }

    await swap(arr, i + 1, high);
    return i + 1;
  };

  const quicksort = async (arr: number[], low: number, high: number) => {
    if (low < high) {
      let pi = await partition(arr, low, high);
      await quicksort(arr, low, pi - 1);
      await quicksort(arr, pi + 1, high);
    }
  };

  const startQuickSort = async () => {
    setIsSorting(true);
    setSorted([]);
    await quicksort([...array], 0, array.length - 1);
    setComparing([-1, -1]);
    await finalCheck();
    setIsSorting(false);
  };

  const finalCheck = async () => {
    for (let i = 0; i < array.length; i++) {
      setSorted((prev) => [...prev, i]);
      await new Promise((resolve) => setTimeout(resolve, 20));
    }
  };

  return (
    <div>
      <div className="flex items-end justify-center h-64 bg-base-300 rounded-box p-4 border border-white/[0.1]">
        {array.map((value, idx) => (
          <div
            key={idx}
            className={`w-[10px] mx-[1px] ${
              sorted.includes(idx) ? "bg-success" : comparing.includes(idx) ? "bg-secondary" : "bg-primary"
            } rounded-badge`}
            style={{
              height: `${value}px`,
            }}
          ></div>
        ))}
      </div>
      <div className="mt-4 flex justify-center space-x-4">
        <button onClick={resetArray} disabled={isSorting} className="btn btn-primary">
          Generate New Array
        </button>
        <button onClick={bubbleSort} disabled={isSorting} className="btn btn-secondary">
          Bubble Sort
        </button>
        <button onClick={startQuickSort} disabled={isSorting} className="btn btn-secondary">
          QuickSort
        </button>
      </div>
    </div>
  );
};

export default Chart;
