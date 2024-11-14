import { delay } from "./utils";

export const shellSort = async (
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

  // Start with a big gap, then reduce the gap
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    // Do a gapped insertion sort
    for (let i = gap; i < n; i++) {
      const temp = arr[i];
      let j;

      // Compare elements with gap
      for (j = i; j >= gap; j -= gap) {
        setComparing([j, j - gap]);
        setComparedCount((prev) => prev + 1);
        await delay(speed);

        if (arr[j - gap] > temp) {
          setSwapping([j, j - gap]);
          await delay(speed);

          arr[j] = arr[j - gap];
          setSwapCount((prev) => prev + 1);
          setArray([...arr]);

          setSwapping([]);
          await delay(speed);
        } else {
          break;
        }
      }

      // Put temp in its correct location
      if (arr[j] !== temp) {
        setSwapping([j]);
        await delay(speed);

        arr[j] = temp;
        setSwapCount((prev) => prev + 1);
        setArray([...arr]);

        setSwapping([]);
        await delay(speed);
      }
    }

    // Mark elements as partially sorted
    const sortedIndices = Array.from({ length: n }, (_, i) => i).filter((i) => i % gap === 0);
    setSorted((prev) => Array.from(new Set([...prev, ...sortedIndices])));
    setNumOfSorted((prev) => Math.min(prev + sortedIndices.length, n));
  }

  // Mark all elements as sorted
  setSorted(Array.from({ length: n }, (_, i) => i));
  setNumOfSorted(n);
};
