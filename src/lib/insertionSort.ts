import { delay } from "./utils";

export const insertionSort = async (
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
  setSorted([0]); // Start with first element as sorted

  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;

    // Show current element being inserted
    setComparing([i]);
    await delay(speed);

    while (j >= 0 && arr[j] > key) {
      // Compare current element with sorted portion
      setComparing([j, j + 1]);
      setComparedCount((prev) => prev + 1);
      await delay(speed);

      // Show shifting animation
      setSwapping([j, j + 1]);
      await delay(speed);

      arr[j + 1] = arr[j];
      setSwapCount((prev) => prev + 1);
      setArray([...arr]);

      setSwapping([]);
      await delay(speed);

      j = j - 1;
    }

    arr[j + 1] = key;
    setArray([...arr]);

    // Update sorted portion
    setSorted((prev) => [...prev, i].sort((a, b) => a - b));
    setNumOfSorted(i + 1);

    // Clear comparisons
    setComparing([-1, -1]);
    await delay(speed);
  }

  // Final state
  setNumOfSorted(arr.length);
  setComparing([-1, -1]);
  setSorted(Array.from({ length: arr.length }, (_, i) => i)); // Mark all as sorted
};
