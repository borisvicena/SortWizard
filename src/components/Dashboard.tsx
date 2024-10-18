"use client";

import React, { useEffect, useState } from "react";
import Chart from "./Chart";
import {
  delay,
  generateAlmostSortedArray,
  generateRandomArray,
  generateSortedArray,
  generateUniqueArray,
} from "@/lib/utils";
import { bubbleSort } from "@/lib/bubbleSort";
import { quickSort } from "@/lib/quickSort";
import { selectionSort } from "@/lib/selectionSort";
import { insertionSort } from "@/lib/insertionSort";
import { mergeSort } from "@/lib/mergeSort";
import { bogoSort } from "@/lib/bogoSort";

const Dashboard = () => {
  const [array, setArray] = useState<number[]>([]);
  const [originalArray, setOriginalArray] = useState<number[]>([]);
  const [isSorting, setIsSorting] = useState(false);
  const [comparing, setComparing] = useState([-1, -1]);
  const [sorted, setSorted] = useState<number[]>([]);
  const [isSorted, setIsSorted] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string | null>("Bubble sort");
  const [arraySize, setArraySize] = useState(50);
  const [maxValue, setMaxValue] = useState(200);
  const [speed, setSpeed] = useState(50);
  const [sortingDuration, setSortingDuration] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    resetArray();
  }, [arraySize, maxValue]);

  const resetArray = () => {
    setIsSorted(false);
    const newArray = generateRandomArray(arraySize, 1, maxValue);
    setArray(newArray);
    setOriginalArray(newArray);
    setComparing([-1, -1]);
    setSorted([]);
  };

  const almostSortedArray = () => {
    setIsSorted(false);
    const newArray = generateAlmostSortedArray(arraySize, 1, maxValue);
    setArray(newArray);
    setOriginalArray(newArray);
    setComparing([-1, -1]);
    setSorted([]);
  };

  const sortedArray = () => {
    setIsSorted(false);
    const newArray = generateSortedArray(arraySize, 1, maxValue);
    setArray(newArray);
    setOriginalArray(newArray);
    setComparing([-1, -1]);
    setSorted([]);
  };

  const uniqueArray = () => {
    setIsSorted(false);
    const newArray = generateUniqueArray(arraySize, maxValue);
    setArray(newArray);
    setOriginalArray(newArray);
    setComparing([-1, -1]);
    setSorted([]);
  };

  const resetToOriginalArray = () => {
    setIsSorted(false);
    setArray(originalArray);
    setComparing([-1, -1]);
    setSorted([]);
  };

  const finalCheck = async () => {
    for (let i = 0; i < array.length; i++) {
      setSorted((prev) => [...prev, i]);
      await delay(5);
    }
    setIsSorted(true);
  };

  const runQS = async () => {
    setSorted([]);
    await quickSort([...array], 0, array.length - 1, setArray, setComparing, speed);
    await finalCheck();
    setIsSorting(false);
  };

  const runBS = async () => {
    setSorted([]);
    await bubbleSort([...array], setArray, setComparing, speed);
    await finalCheck();
  };

  const runSS = async () => {
    setSorted([]);
    await selectionSort([...array], setArray, setComparing, speed);
    await finalCheck();
  };

  const runIS = async () => {
    setSorted([]);
    await insertionSort([...array], setArray, setComparing, speed);
    await finalCheck();
  };

  const runMS = async () => {
    setSorted([]);
    await mergeSort([...array], 0, array.length - 1, setArray, setComparing, speed);
    await finalCheck();
  };

  const runBGS = async () => {
    setSorted([]);
    await bogoSort([...array], setArray, speed);
    await finalCheck();
  };

  const run = async () => {
    setIsSorting(true);
    setElapsedTime(0);
    const startTime = performance.now();

    const timerInterval = setInterval(() => {
      const currentTime = performance.now();
      setElapsedTime((currentTime - startTime) / 1000);
    }, 100);

    switch (selectedAlgorithm) {
      case "Bubble sort":
        await runBS();
        break;
      case "Quicksort":
        await runQS();
        break;
      case "Selection sort":
        await runSS();
        break;
      case "Insertion sort":
        await runIS();
        break;
      case "Merge sort":
        await runMS();
        break;
      case "Bogosort":
        await runBGS();
        break;
      default:
        break;
    }

    clearInterval(timerInterval);
    const endTime = performance.now();
    setSortingDuration((endTime - startTime) / 1000);
    setIsSorting(false);
  };

  const convertSpeed = (speedStyle: string): number => {
    switch (speedStyle) {
      case "Super-Slow":
        return 500;
      case "Slow":
        return 100;
      case "Normal":
        return 50;
      case "Fast":
        return 10;
      case "Super-Fast":
        return 0;
      default:
        return 50;
    }
  };

  console.log("MAX: " + maxValue);

  return (
    <main className="flex flex-col rounded-box mt-12 w-full max-w-7xl mx-auto bg-base-200 border border-white/[0.1] p-8 indicator">
      <span className="indicator-item badge badge-secondary">welcome</span>
      <div className="font-bold text-2xl">Dashboard 🪄 </div>
      <div className="mt-4 flex justify-start space-x-4">
        <div className="p-4 bg-base-300 w-full rounded-box border border-white/[0.1]">
          <div className="text-base font-bold">Settings</div>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Algorithm</span>
                </div>
                <select
                  className="select select-sm select-bordered"
                  onChange={(e) => setSelectedAlgorithm(e.target.value)}
                >
                  <option selected>Bubble sort</option>
                  <option>Quicksort</option>
                  <option>Selection sort</option>
                  <option>Insertion sort</option>
                  <option>Merge sort</option>
                  <option>Bogosort</option>
                </select>
              </label>
            </div>
            <div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Array size</span>
                </div>
                <select
                  className="select select-sm select-bordered"
                  onChange={(e) => setArraySize(Number(e.target.value))}
                >
                  <option>25</option>
                  <option selected>50</option>
                  <option>100</option>
                  <option>500</option>
                </select>
              </label>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Max value</span>
                </div>
                <select
                  className="select select-sm select-bordered"
                  onChange={(e) => setMaxValue(Number(e.target.value))}
                >
                  <option>100</option>
                  <option selected>200</option>
                  <option>300</option>
                  <option>500</option>
                </select>
              </label>
            </div>
            <div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Speed</span>
                </div>
                <select
                  className="select select-sm select-bordered"
                  onChange={(e) => setSpeed(Number(convertSpeed(e.target.value)))}
                >
                  <option>Super-Slow</option>
                  <option>Slow</option>
                  <option selected>Normal</option>
                  <option>Fast</option>
                  <option>Super-Fast</option>
                </select>
              </label>
            </div>
          </div>
        </div>
        <div className="p-4 bg-base-300 w-full rounded-box border border-white/[0.1]">
          <div className="text-base font-bold">Control</div>
          <div className="grid grid-cols-4 gap-4 mt-4">
            <button onClick={resetArray} disabled={isSorting} className="btn btn-sm btn-primary">
              Random
            </button>

            <button onClick={sortedArray} disabled={isSorting} className="btn btn-sm btn-primary">
              Sorted
            </button>
            <button onClick={almostSortedArray} disabled={isSorting} className="btn btn-sm btn-primary">
              Almost sorted
            </button>
            <button onClick={uniqueArray} disabled={isSorting} className="btn btn-sm btn-primary">
              Unique
            </button>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <button
              onClick={() => alert("Pause is not working!")}
              disabled={isSorting}
              className="btn btn-sm btn-neutral"
            >
              Pause
            </button>
            <button onClick={resetToOriginalArray} disabled={isSorting} className="btn btn-sm btn-primary">
              Reset
            </button>
            <button
              onClick={() => alert("Step is not working!")}
              disabled={isSorting}
              className="btn btn-sm btn-neutral"
            >
              Step
            </button>
          </div>
          <div className="grid grid-cols-1 gap-4 mt-4">
            <button onClick={run} disabled={isSorting} className="btn btn-sm btn-primary">
              {isSorting ? <span className="loading loading-infinity loading-lg"></span> : <span>Run</span>}
            </button>
          </div>
        </div>
        <div className="p-4 bg-base-300 w-full rounded-box border border-white/[0.1]">
          <div className="text-base font-bold">Info</div>
          <div className="grid grid-cols-1 gap-4 mt-4">
            <div className="text-base">Duration: {elapsedTime.toFixed(1)}s</div>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4"></div>
          <div className="grid grid-cols-1 gap-4 mt-4"></div>
        </div>
      </div>
      <Chart array={array} sorted={sorted} isSorted={isSorted} comparing={comparing} />
    </main>
  );
};

export default Dashboard;
