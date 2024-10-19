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
  const [swapCount, setSwapCount] = useState(0);
  const [isDelay, setIsDelay] = useState(true);
  const [numOfSorted, setNumOfSorted] = useState(0);

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
  };

  const run = async () => {
    setIsSorted(false);
    setIsSorting(true);
    setSorted([]);
    setElapsedTime(0);
    setSwapCount(0);
    const startTime = performance.now();

    const timerInterval = setInterval(() => {
      const currentTime = performance.now();
      setElapsedTime((currentTime - startTime) / 1000);
    }, 100);

    switch (selectedAlgorithm) {
      case "Bubble sort":
        await bubbleSort([...array], setArray, setComparing, setSwapCount, speed, isDelay, setNumOfSorted);
        break;
      case "Quicksort":
        await quickSort([...array], 0, array.length - 1, setArray, setComparing, speed);
        break;
      case "Selection sort":
        await selectionSort([...array], setArray, setComparing, speed);
        break;
      case "Insertion sort":
        await insertionSort([...array], setArray, setComparing, speed);
        break;
      case "Merge sort":
        await mergeSort([...array], 0, array.length - 1, setArray, setComparing, speed);
        break;
      case "Bogosort":
        await bogoSort([...array], setArray, speed);
        break;
      default:
        break;
    }

    await finalCheck();

    clearInterval(timerInterval);
    const endTime = performance.now();
    setSortingDuration((endTime - startTime) / 1000);
    setIsSorted(true);
    setIsSorting(false);
  };

  return (
    <main className="flex flex-col rounded-box mt-12 w-full max-w-7xl mx-auto bg-base-200 border border-white/[0.1] p-8 indicator">
      <span className="indicator-item badge badge-secondary text-secondary-content">welcome</span>
      <div className="font-bold text-2xl">Dashboard 🪄 </div>
      <div className="mt-4 flex justify-start space-x-4">
        {/* SETTINGS SECTION START */}
        <div className="p-4 bg-base-300 w-full rounded-box border border-white/[0.1] indicator">
          <span className="indicator-item indicator-center badge badge-info text-info-content">
            new algorithms coming soon
          </span>
          <div className="w-full">
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
                    defaultValue={"Bubble sort"}
                  >
                    <option value={"Bubble sort"}>Bubble sort</option>
                    <option value={"Quicksort"}>Quicksort</option>
                    <option value={"Selection sort"}>Selection sort</option>
                    <option value={"Insertion sort"}>Insertion sort</option>
                    <option value={"Merge sort"}>Merge sort</option>
                    <option value={"Bogosort"}>Bogosort</option>
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
                    defaultValue={50}
                  >
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                    <option value={500}>500</option>
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
                    defaultValue={200}
                  >
                    <option value={100}>100</option>
                    <option value={200}>200</option>
                    <option value={300}>300</option>
                    <option value={500}>500</option>
                  </select>
                </label>
              </div>
              <div>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Delay</span>
                  </div>
                  <select
                    className="select select-sm select-bordered"
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      setSpeed(value);
                      setIsDelay(value !== 0);
                    }}
                    defaultValue={50}
                  >
                    <option value={0}>0</option>
                    <option value={10}>10</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                    <option value={100}>250</option>
                  </select>
                </label>
              </div>
            </div>
          </div>
        </div>
        {/* SETTINGS SECTION END */}

        {/* CONTROL SECTION START */}
        <div className="p-4 bg-base-300 w-full rounded-box border border-white/[0.1] indicator">
          <span className="indicator-item indicator-center badge badge-warning text-warning-content">
            mostly working
          </span>
          <div className="w-full">
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
                {isSorting ? (
                  <span className="loading loading-infinity loading-lg"></span>
                ) : (
                  <span className="leading-3">Run</span>
                )}
              </button>
            </div>
          </div>
        </div>
        {/* CONTROL SECTION END */}

        {/* INFO SECTION START */}
        <div className="p-4 bg-base-300 w-full rounded-box border border-white/[0.1] indicator">
          <span className="indicator-item indicator-center badge badge-error text-error-content">in progress</span>
          <div className="w-full">
            <div className="text-base font-bold">Info</div>
            <div className="grid grid-cols-1 gap-4 mt-4">
              <div className="text-base leading-3">
                Algorithm:{" "}
                <span className={`font-bold ${isSorted ? "text-success" : "text-neutral-content"}`}>
                  {selectedAlgorithm}
                </span>
              </div>
              <div className="text-base leading-3">
                Duration:{" "}
                <span className={`font-bold ${isSorted ? "text-success" : "text-neutral-content"}`}>
                  {elapsedTime.toFixed(1)}s
                </span>
              </div>
              <div className="text-base leading-3">
                Comparisons:{" "}
                <span className={`font-bold ${isSorted ? "text-success" : "text-neutral-content"}`}>0</span>
              </div>
              <div className="text-base leading-3">
                Swaps:
                <span className={`font-bold ${isSorted ? "text-success" : "text-neutral-content"}`}>
                  {" "}
                  {swapCount || 0}
                </span>
              </div>
              <div className="text-base leading-3">
                Sorted:{" "}
                <span className={`font-bold ${isSorted ? "text-success" : "text-neutral-content"}`}>
                  {numOfSorted}/{array.length}
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* INFO SECTION END */}
      </div>
      <Chart array={array} sorted={sorted} isSorted={isSorted} comparing={comparing} />
    </main>
  );
};

export default Dashboard;
