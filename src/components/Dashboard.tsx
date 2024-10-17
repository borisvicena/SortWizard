"use client";

import React, { useEffect, useState } from "react";
import Chart from "./Chart";
import { delay, generateRandomArray } from "@/lib/utils";
import { bubbleSort } from "@/lib/bubbleSort";
import { quickSort } from "@/lib/quickSort";

const Dashboard = () => {
  const [array, setArray] = useState<number[]>([]);
  const [isSorting, setIsSorting] = useState(false);
  const [comparing, setComparing] = useState([-1, -1]);
  const [sorted, setSorted] = useState<number[]>([]);
  const [isSorted, setIsSorted] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string | null>(null);
  const [arraySize, setArraySize] = useState(50);
  const [maxValue, setMaxValue] = useState(200);

  useEffect(() => {
    resetArray();
  }, [arraySize, maxValue]);

  const resetArray = () => {
    setIsSorted(false);
    setArray(generateRandomArray(arraySize, 1, maxValue));
    setComparing([-1, -1]);
    setSorted([]);
  };

  const finalCheck = async () => {
    for (let i = 0; i < array.length; i++) {
      setSorted((prev) => [...prev, i]);
      await delay(10);
    }
    setIsSorted(true);
  };

  const runQS = async () => {
    setIsSorting(true);
    setSorted([]);
    await quickSort([...array], 0, array.length - 1, setArray, setComparing, 5);
    await finalCheck();
    setIsSorting(false);
  };

  const runBS = async () => {
    setIsSorting(true);
    setSorted([]);
    await bubbleSort([...array], setArray, setComparing, 1);
    await finalCheck();
    setIsSorting(false);
  };

  const run = async () => {
    switch (selectedAlgorithm) {
      case "Bubble sort":
        await runBS();
        break;
      case "Quicksort":
        await runQS();
        break;
      default:
        break;
    }
  };

  return (
    <main className="container rounded-box mt-12 w-full max-w-7xl mx-auto bg-base-200 border border-white/[0.1] p-8">
      <div className="font-bold text-2xl">Dashboard</div>
      <div className="mt-4 flex justify-start space-x-4">
        <button onClick={resetArray} disabled={isSorting} className="btn btn-sm btn-primary">
          Generate New Array
        </button>
        <div>
          <label className="form-control w-full max-w-xs">
            <select className="select select-sm select-bordered" onChange={(e) => setSelectedAlgorithm(e.target.value)}>
              <option disabled selected>
                Choose Algorithm
              </option>
              <option>Bubble sort</option>
              <option>Quicksort</option>
            </select>
          </label>
        </div>
        <div>
          <label className="form-control w-full max-w-xs">
            <select className="select select-sm select-bordered" onChange={(e) => setArraySize(Number(e.target.value))}>
              <option disabled selected>
                Array size
              </option>
              <option>25</option>
              <option>50</option>
              <option>100</option>
              <option>500</option>
            </select>
          </label>
        </div>
        <div>
          <label className="form-control w-full max-w-xs">
            <select className="select select-sm select-bordered" onChange={(e) => setMaxValue(Number(e.target.value))}>
              <option disabled selected>
                Max Value
              </option>
              <option>100</option>
              <option>200</option>
              <option>300</option>
              <option>500</option>
            </select>
          </label>
        </div>
        <button onClick={run} disabled={isSorting || !selectedAlgorithm} className="btn btn-sm btn-primary">
          Run
        </button>
      </div>
      <Chart array={array} sorted={sorted} isSorted={isSorted} comparing={comparing} />
    </main>
  );
};

export default Dashboard;
