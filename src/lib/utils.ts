export const randomIntFromInterval = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const delay = (n: number) => new Promise<void>((resolve) => setTimeout(resolve, n));

export const generateRandomArray = (size: number, min: number, max: number): number[] => {
  return Array.from({ length: size }, () => randomIntFromInterval(min, max));
};
