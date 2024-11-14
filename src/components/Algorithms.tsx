"use client";
import React from "react";

interface AlgorithmsProps {
  selectedAlgorithm: string | null;
}

const algorithmData = {
  "Bubble sort": {
    title: "Bubble Sort",
    description:
      "Bubble Sort repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.",
    timeComplexity: "O(n²)",
    timeDescription: "Worst & Average Case",
    spaceComplexity: "O(1)",
    spaceDescription: "Auxiliary Space",
    bestFor: ["Small datasets", "Nearly sorted arrays", "Educational purposes"],
  },
  Quicksort: {
    title: "Quick Sort",
    description:
      "Quick Sort is a divide-and-conquer algorithm that picks a 'pivot' element and partitions the array around it, recursively sorting the sub-arrays.",
    timeComplexity: "O(n log n)",
    timeDescription: "Average Case",
    spaceComplexity: "O(log n)",
    spaceDescription: "Due to recursion",
    bestFor: ["Large datasets", "Random data", "When space is not a constraint"],
  },
  "Merge sort": {
    title: "Merge Sort",
    description:
      "Merge Sort divides the array into two halves, recursively sorts them, and then merges the sorted halves.",
    timeComplexity: "O(n log n)",
    timeDescription: "All cases",
    spaceComplexity: "O(n)",
    spaceDescription: "Requires extra space",
    bestFor: ["Stable sorting requirement", "Linked lists", "External sorting"],
  },
  "Heap sort": {
    title: "Heap Sort",
    description:
      "Heap Sort builds a max-heap from the array and repeatedly extracts the maximum element to sort the array.",
    timeComplexity: "O(n log n)",
    timeDescription: "All cases",
    spaceComplexity: "O(1)",
    spaceDescription: "In-place sorting",
    bestFor: ["Memory constraints", "Guaranteed performance", "Priority queue implementation"],
  },
  "Selection sort": {
    title: "Selection Sort",
    description: "Selection Sort finds the minimum element in the unsorted portion and places it at the beginning.",
    timeComplexity: "O(n²)",
    timeDescription: "All cases",
    spaceComplexity: "O(1)",
    spaceDescription: "In-place sorting",
    bestFor: ["Small datasets", "Memory constraints", "Simple implementation"],
  },
  "Insertion sort": {
    title: "Insertion Sort",
    description:
      "Insertion Sort builds the final sorted array one item at a time by repeatedly inserting elements into their correct position.",
    timeComplexity: "O(n²)",
    timeDescription: "Worst & Average Case",
    spaceComplexity: "O(1)",
    spaceDescription: "In-place sorting",
    bestFor: ["Small datasets", "Nearly sorted arrays", "Online sorting"],
  },
  "Shell sort": {
    title: "Shell Sort",
    description:
      "Shell Sort is an optimization of insertion sort that allows the exchange of items that are far apart.",
    timeComplexity: "O(n log n)",
    timeDescription: "Best known gap sequence",
    spaceComplexity: "O(1)",
    spaceDescription: "In-place sorting",
    bestFor: ["Medium-sized datasets", "Hardware optimization", "When quick sort performs poorly"],
  },
  Bogosort: {
    title: "Bogo Sort",
    description:
      "Bogo Sort randomly shuffles the array until it happens to be sorted. Highly inefficient and used only as an example of what not to do.",
    timeComplexity: "O((n+1)!)",
    timeDescription: "Average Case",
    spaceComplexity: "O(1)",
    spaceDescription: "In-place sorting",
    bestFor: ["Never use in production", "Educational purposes", "Understanding randomization"],
  },
};

const Algorithms: React.FC<AlgorithmsProps> = ({ selectedAlgorithm }) => {
  if (!selectedAlgorithm || !algorithmData[selectedAlgorithm as keyof typeof algorithmData]) {
    return null;
  }

  const algorithm = algorithmData[selectedAlgorithm as keyof typeof algorithmData];

  return (
    <div className="mt-8 card bg-base-300 border border-white/[0.1] shadow-xl">
      <div className="card-body">
        <div className="flex items-center gap-2">
          <h2 className="card-title text-2xl">Algorithm Info</h2>
          <div className="badge badge-primary">{algorithm.title}</div>
        </div>

        {/* Description Card */}
        <div className="bg-base-200 p-4 rounded-lg mt-4">
          <div className="flex items-center gap-2 mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="font-semibold">Description</span>
          </div>
          <p className="text-sm opacity-90">{algorithm.description}</p>
        </div>

        {/* Stats Section */}
        <div className="stats stats-vertical lg:stats-horizontal shadow bg-base-200 mt-4">
          <div className="stat">
            <div className="stat-title">Time Complexity</div>
            <div className="stat-value text-3xl">{algorithm.timeComplexity}</div>
            <div className="stat-desc">{algorithm.timeDescription}</div>
          </div>
          <div className="stat">
            <div className="stat-title">Space Complexity</div>
            <div className="stat-value text-3xl">{algorithm.spaceComplexity}</div>
            <div className="stat-desc">{algorithm.spaceDescription}</div>
          </div>
        </div>

        {/* Best For Section */}
        <div className="bg-base-200 p-4 rounded-lg mt-4">
          <div className="flex items-center gap-2 mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="font-semibold">Best Use Cases</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {algorithm.bestFor.map((item, index) => (
              <div key={index} className="badge badge-outline p-3">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Algorithms;
