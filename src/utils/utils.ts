import { ElementStates } from "../types/element-states";

export function setUniqueId(): number {
  return Date.now() * Math.random()
};

export const setDelay = (milliseconds: number) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export function swap<T>(arr: T[], firstIndex: number, secondIndex: number): void {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
};

export const getRandomInt = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const randomArr = (run: number) => {
  let arrUniqueNumbers: number[] = [];
  while (arrUniqueNumbers.length < run) {
    const randomNumber = Math.floor(Math.random() * 101);
    let found = false;
    for (let i = 0; i < arrUniqueNumbers.length; i++) {
      if (arrUniqueNumbers[i] === randomNumber) {
        found = true;
        break;
      }
    }
    if (!found) {
      arrUniqueNumbers[arrUniqueNumbers.length] = randomNumber;
    }
  }
  const arr = arrUniqueNumbers.map((item) => ({ value: item, state: ElementStates.Default }))
  return arr;
};
