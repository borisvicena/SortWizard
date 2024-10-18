"use client";
import React, { useState } from "react";

interface ChartProps {
  array: number[];
  sorted: number[];
  isSorted: boolean;
  comparing: number[];
}

const Chart: React.FC<ChartProps> = ({ array, sorted, isSorted, comparing }) => {
  const maxHeight = Math.max(...array) || 0;
  const [tooltip, setTooltip] = useState<{ value: number; top: number; left: number } | null>(null);

  const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>, value: number) => {
    const { clientX, clientY } = event;
    setTooltip({ value, top: clientY, left: clientX });
  };

  const handleMouseLeave = () => {
    setTooltip(null);
  };

  return (
    <div className="w-full max-w-full mt-4">
      <div
        className={`flex items-end justify-center bg-base-300 rounded-box p-4 border ${
          isSorted ? "border-success" : "border-white/[0.1]"
        }`}
        style={{ height: `${maxHeight + 50}px` }}
      >
        {array.map((value, idx) => (
          <div
            key={idx}
            className={`w-[10px] mx-[1px] transition-all ${
              sorted.includes(idx) ? "bg-success" : comparing.includes(idx) ? "bg-secondary" : "bg-primary"
            } rounded-badge`}
            style={{
              height: `${value}px`,
            }}
            onMouseEnter={(e) => handleMouseEnter(e, value)}
            onMouseLeave={handleMouseLeave}
          ></div>
        ))}
      </div>
      {tooltip && (
        <div
          className="absolute bg-neutral text-neutral-content border border-white/[0.1] rounded-md p-2"
          style={{ top: tooltip.top - 180, left: tooltip.left - 100 }}
        >
          {tooltip.value}
        </div>
      )}
    </div>
  );
};

export default Chart;
