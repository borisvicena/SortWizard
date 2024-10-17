import { delay } from "./utils";

export const insertionSort = async (
  arr: number[],
  setArray: React.Dispatch<React.SetStateAction<number[]>>,
  setComparing: React.Dispatch<React.SetStateAction<number[]>>,
  speed: number
) => {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;

    setComparing([i, -1]);
    await delay(speed);

    while (j >= 0 && arr[j] > key) {
      setComparing([j, -1]);
      await delay(speed);
      arr[j + 1] = arr[j];
      j = j - 1;
    }
    arr[j + 1] = key;
    setArray([...arr]);
    await delay(speed);
  }
  setComparing(Array.from({ length: arr.length }, (_, idx) => idx));
};
