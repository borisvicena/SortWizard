"use client";
import React, { useEffect, useState } from "react";

interface ChartProps {
  array: number[];
  sorted: number[];
  isSorted: boolean;
  comparing: number[];
  swapping: number[];
  height: number;
}

const Chart: React.FC<ChartProps> = ({ array, sorted, isSorted, comparing, swapping, height }) => {
  const [isClient, setIsClient] = useState(false);
  const BAR_WIDTH = 10;
  const BAR_MARGIN = 1;
  const HEIGHT_PADDING = 50;

  useEffect(() => {
    setIsClient(true);
  }, []);

  const getBarColor = (index: number): string => {
    if (sorted.includes(index)) return "bg-success";
    if (swapping.includes(index)) return "bg-info-content";
    if (comparing.includes(index)) {
      if (comparing.length === 1) return "bg-error";
      return "bg-secondary";
    }
    return "bg-primary";
  };

  // Show loading state before client-side hydration
  if (!isClient) {
    return (
      <div className="w-full max-w-full mt-4">
        <div
          className="flex items-center justify-center bg-base-300 rounded-box p-4 border border-white/[0.1]"
          style={{ height: `${height + HEIGHT_PADDING}px` }}
        >
          <div className="loading loading-infinity loading-lg"></div>
        </div>
      </div>
    );
  }

  // Show skeleton if array is empty
  if (array.length === 0) {
    return (
      <div className="w-full max-w-full mt-4">
        <div
          className="flex items-end justify-center bg-base-300 rounded-box p-4 border border-white/[0.1]"
          style={{ height: `${height + HEIGHT_PADDING}px` }}
        >
          {[...Array(50)].map((_, idx) => (
            <div
              key={idx}
              className="animate-pulse mx-[1px] rounded-badge bg-white/10"
              style={{
                width: `${BAR_WIDTH}px`,
                height: `${50 + (idx % 5) * 30}px`, // Deterministic height based on index
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
        style={{ height: `${height + HEIGHT_PADDING}px` }}
      >
        {array.map((value, idx) => (
          <div
            key={idx}
            style={{
              width: `${BAR_WIDTH}px`,
              marginLeft: `${BAR_MARGIN}px`,
              marginRight: `${BAR_MARGIN}px`,
              height: `${Math.floor(value)}px`,
            }}
            className={`${getBarColor(idx)} rounded-badge transition-all duration-200`}
            aria-label={`Bar value: ${value}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Chart;
