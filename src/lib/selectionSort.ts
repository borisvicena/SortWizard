import { delay } from "./utils";

export const selectionSort = async (
  arr: number[],
  setArray: React.Dispatch<React.SetStateAction<number[]>>,
  setComparing: React.Dispatch<React.SetStateAction<number[]>>,
  speed: number
) => {
  let len = arr.length;

  for (let i = 0; i < len - 1; i++) {
    let min = i;

    setComparing([i, min]);
    await delay(speed);

    for (let j = i + 1; j < len; j++) {
      setComparing([min, j]);
      await delay(speed);
      if (arr[j] < arr[min]) {
        min = j;
        setComparing([min, -1]);
        await delay(speed);
      }
    }

    if (min !== i) {
      [arr[i], arr[min]] = [arr[min], arr[i]];
      setArray([...arr]);
      await delay(speed);
    }
  }
  setComparing(Array.from({ length: len }, (_, idx) => idx));
};
