export const randomIntFromInterval = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const delay = (n: number) => new Promise<void>((resolve) => setTimeout(resolve, n));

export const generateRandomArray = (size: number, min: number, max: number): number[] => {
  return Array.from({ length: size }, () => randomIntFromInterval(min, max));
};

export const generateAlmostSortedArray = (size: number, min: number, max: number): number[] => {
  const sortedArr = Array.from({ length: size }, () => randomIntFromInterval(min, max));

  sortedArr.sort((a, b) => a - b);

  const i = Math.floor(Math.random() * size);
  const j = Math.floor(Math.random() * size);

  [sortedArr[i], sortedArr[j]] = [sortedArr[j], sortedArr[i]];

  return sortedArr;
};

export const generateSortedArray = (size: number, min: number, max: number): number[] => {
  const sortedArr = Array.from({ length: size }, () => randomIntFromInterval(min, max));

  return sortedArr.sort((a, b) => a - b);
};

export const generateUniqueArray = (size: number, max: number): number[] => {
  const uniqueSet = new Set<number>();

  while (uniqueSet.size < size) {
    const randomValue = Math.floor(Math.random() * max);
    uniqueSet.add(randomValue);
  }

  return Array.from(uniqueSet);
};
