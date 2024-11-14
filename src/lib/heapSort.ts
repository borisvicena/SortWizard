import { delay } from "./utils";

export const heapSort = async (
  arr: number[],
  setArray: React.Dispatch<React.SetStateAction<number[]>>,
  setComparing: React.Dispatch<React.SetStateAction<number[]>>,
  speed: number,
  setSwapCount: React.Dispatch<React.SetStateAction<number>>,
  setNumOfSorted: React.Dispatch<React.SetStateAction<number>>,
  setComparedCount: React.Dispatch<React.SetStateAction<number>>,
  setSwapping: React.Dispatch<React.SetStateAction<number[]>>,
  setSorted: React.Dispatch<React.SetStateAction<number[]>>
) => {
  // Reset states
  setSwapCount(0);
  setComparedCount(0);
  setNumOfSorted(0);
  setSorted([]);

  const n = arr.length;

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    await heapify(arr, n, i, setArray, setComparing, speed, setSwapCount, setComparedCount, setSwapping);
  }

  // Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    setSwapping([0, i]);
    await delay(speed);

    // Swap root with last element
    [arr[0], arr[i]] = [arr[i], arr[0]];
    setSwapCount((prev) => prev + 1);
    setArray([...arr]);

    // Mark current position as sorted
    setSorted((prev) => [...prev, i]);
    setNumOfSorted(n - i);

    await delay(speed);
    setSwapping([]);

    // Heapify root element
    await heapify(arr, i, 0, setArray, setComparing, speed, setSwapCount, setComparedCount, setSwapping);
  }

  // Mark the first element as sorted
  setSorted((prev) => [...prev, 0]);
  setNumOfSorted(n);
};

const heapify = async (
  arr: number[],
  n: number,
  i: number,
  setArray: React.Dispatch<React.SetStateAction<number[]>>,
  setComparing: React.Dispatch<React.SetStateAction<number[]>>,
  speed: number,
  setSwapCount: React.Dispatch<React.SetStateAction<number>>,
  setComparedCount: React.Dispatch<React.SetStateAction<number>>,
  setSwapping: React.Dispatch<React.SetStateAction<number[]>>
) => {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  // Compare with left child
  if (left < n) {
    setComparing([largest, left]);
    setComparedCount((prev) => prev + 1);
    await delay(speed);

    if (arr[left] > arr[largest]) {
      largest = left;
    }
  }

  // Compare with right child
  if (right < n) {
    setComparing([largest, right]);
    setComparedCount((prev) => prev + 1);
    await delay(speed);

    if (arr[right] > arr[largest]) {
      largest = right;
    }
  }

  // If largest is not root
  if (largest !== i) {
    setSwapping([i, largest]);
    await delay(speed);

    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    setSwapCount((prev) => prev + 1);
    setArray([...arr]);

    setSwapping([]);
    await delay(speed);

    // Recursively heapify the affected sub-tree
    await heapify(arr, n, largest, setArray, setComparing, speed, setSwapCount, setComparedCount, setSwapping);
  }
};
