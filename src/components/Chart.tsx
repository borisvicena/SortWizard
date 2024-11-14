"use client";
import React from "react"; // Removed unused useState import

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
