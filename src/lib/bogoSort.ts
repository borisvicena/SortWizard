import { setSourceMapsEnabled } from "process";
import { delay } from "./utils";

export const bogoSort = async (
  arr: number[],
  setArray: React.Dispatch<React.SetStateAction<number[]>>,
  speed: number
) => {
  while (!isSorted(arr)) {
    shuffle(arr);
    setArray([...arr]);
    await delay(speed);
  }
};

const shuffle = (arr: number[]) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
};

const isSorted = (arr: number[]) => {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[i - 1]) return false;
  }
  return true;
};
