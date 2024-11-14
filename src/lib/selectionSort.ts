import { delay } from "./utils";

export const selectionSort = async (
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
  let len = arr.length;

  // Reset states
  setSwapCount(0);
  setComparedCount(0);
  setNumOfSorted(0);

  for (let i = 0; i < len - 1; i++) {
    let min = i;

    setComparing([i, min]);
    await delay(speed);

    for (let j = i + 1; j < len; j++) {
      setComparing([min, j]);
      await delay(speed);
      setComparedCount((prev) => prev + 1);

      if (arr[j] < arr[min]) {
        min = j;
        setComparing([min, -1]);
        await delay(speed);
      }
    }

    if (min !== i) {
      setSwapping([i, min]);
      await delay(speed);

      [arr[i], arr[min]] = [arr[min], arr[i]];
      setSwapCount((prev) => prev + 1);
      setArray([...arr]);

      setSwapping([]);
      await delay(speed);
    }

    // Mark current position as sorted
    setSorted((prev) => [...prev, i]);
    setNumOfSorted(i + 1);
  }

  // Mark the last element as sorted
  setSorted((prev) => [...prev, len - 1]);
  setNumOfSorted(len);
  setComparing([-1, -1]);
};
