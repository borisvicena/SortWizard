"use client";
import React from "react";

interface ChartProps {
  array: number[];
  sorted: number[];
  isSorted: boolean;
  comparing: number[];
}

const Chart: React.FC<ChartProps> = ({ array, sorted, isSorted, comparing }) => {
  return (
    <div className="w-full my-4">
      <div
        className={`flex items-end justify-center h-64 bg-base-300 rounded-box p-4 border ${
          isSorted ? "border-success" : "border-white/[0.1]"
        }`}
      >
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
    </div>
  );
};

export default Chart;
