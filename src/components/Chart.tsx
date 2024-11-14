"use client";
import React from "react";

interface ChartProps {
  array: number[];
  sorted: number[];
  isSorted: boolean;
  comparing: number[];
  swapping: number[];
}

const Chart: React.FC<ChartProps> = ({ array, sorted, isSorted, comparing, swapping }) => {
  const maxHeight = Math.max(...array) || 0;
  const BAR_WIDTH = 10;
  const BAR_MARGIN = 1;
  const HEIGHT_PADDING = 50;

  // Helper function to determine bar color
  const getBarColor = (index: number): string => {
    if (sorted.includes(index)) return "bg-success";
    if (swapping.includes(index)) return "bg-info-content";
    if (comparing.includes(index)) {
      if (comparing.length === 1) return "bg-error";
      return "bg-secondary";
    }
    return "bg-primary";
  };

  // Show skeleton if array is empty
  if (array.length === 0) {
    return (
      <div className="w-full max-w-full mt-4">
        <div
          className="flex items-end justify-center bg-base-300 rounded-box p-4 border border-white/[0.1]"
          style={{ height: `${200 + HEIGHT_PADDING}px` }}
        >
          {[...Array(50)].map((_, idx) => (
            <div
              key={idx}
              className="animate-pulse mx-[1px] rounded-badge"
              style={{
                width: `${BAR_WIDTH}px`,
                height: `${Math.random() * 150 + 50}px`,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-full mt-4">
      <div
        className={`flex items-end justify-center bg-base-300 rounded-box p-4 border ${
          isSorted ? "border-success" : "border-white/[0.1]"
        }`}
        style={{ height: `${maxHeight + HEIGHT_PADDING}px` }}
      >
        {array.map((value, idx) => (
          <div
            key={idx}
            className={`w-[${BAR_WIDTH}px] mx-[${BAR_MARGIN}px] ${getBarColor(
              idx
            )} rounded-badge transition-all duration-200`}
            style={{
              height: `${value}px`,
            }}
            aria-label={`Bar value: ${value}`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Chart;
