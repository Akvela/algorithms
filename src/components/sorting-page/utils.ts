import { swap } from "../../utils/utils";

export type TStep = {
  type: string;
  data: number[];
  arr: number[];
};

export const getBubbleSortAscending = (arr: number[] = []): TStep[] => {
  let arrCopy: number[] = [...arr];
  let steps: TStep[] = [];
  if (arr.length === 0) {
    steps.push({ type: "defaultBubble", data: [], arr: [] });
    return steps;
  };
  for (let j = arrCopy!.length - 1; j >= 0; j--) {
    for (let i = 0; i <= j; i++) {
      let first = i;
      let second = i + 1;
      steps.push({ type: "select", data: [first, second], arr: [...arrCopy] });
      if (arrCopy[first] > arrCopy[second]) {
        swap(arrCopy, first, second);
        steps.push({ type: "swap", data: [first, second], arr: [...arrCopy] });
      };
      steps.push({ type: "defaultBubble", data: [first, second, second + 1], arr: { ...arrCopy } });
    };
    steps.push({ type: "end", data: [j], arr: [...arrCopy] });
  };
  return steps;
};

export const getBubbleSortDescending = (arr: number[] = []): TStep[] => {
  let arrCopy: number[] = [...arr];
  let steps: TStep[] = [];
  if (arr.length === 0) {
    steps.push({ type: "defaultBubble", data: [], arr: [] });
    return steps;
  };
  for (let j = arrCopy!.length - 1; j >= 0; j--) {
    for (let i = 0; i <= j; i++) {
      let first = i;
      let second = i + 1;
      steps.push({ type: "select", data: [first, second], arr: [...arrCopy] });
      if (arrCopy[first] < arrCopy[second]) {
        swap(arrCopy, first, second);
        steps.push({ type: "swap", data: [first, second], arr: [...arrCopy] });
      };
      steps.push({ type: "defaultBubble", data: [first, second, second + 1], arr: { ...arrCopy } });
    };
    steps.push({ type: "end", data: [j], arr: [...arrCopy] });
  };
  return steps;
}

export const getSelectSortAscending = (arr: number[] = []): TStep[] => {
  let arrCopy: number[] = [...arr];
  let steps: TStep[] = [];
  if (arr.length === 0) {
    steps.push({ type: "default", data: [], arr: [] });
    return steps;
  };
  const { length } = arrCopy;
  for (let i = 0; i < length; i++) {
    let curr = i;
    for (let j = i + 1; j < length; j++) {
      steps.push({ type: "select", data: [curr, j], arr: [...arrCopy] });
      if (arrCopy[j] < arrCopy[curr]) {
        swap(arrCopy, curr, j);
        steps.push({ type: "swap", data: [curr, j], arr: [...arrCopy] });
      };
      steps.push({ type: "defaultSelect", data: [i, j, i + 1], arr: { ...arrCopy } });
    };
    steps.push({ type: "end", data: [i], arr: [...arrCopy] });
  };
  return steps;
};

export const getSelectSortDescending = (arr: number[] = []): TStep[] => {
  let arrCopy: number[] = [...arr];
  let steps: TStep[] = [];
  if (arr.length === 0) {
    steps.push({ type: "default", data: [], arr: [] });
    return steps;
  };
  const { length } = arrCopy;
  for (let i = 0; i < length; i++) {
    let curr = i;
    for (let j = i + 1; j < length; j++) {
      steps.push({ type: "select", data: [curr, j], arr: [...arrCopy] });
      if (arrCopy[j] > arrCopy[curr]) {
        swap(arrCopy, curr, j);
        steps.push({ type: "swap", data: [curr, j], arr: [...arrCopy] });
      };
      steps.push({ type: "defaultSelect", data: [i, j, i + 1], arr: { ...arrCopy } });
    };
    steps.push({ type: "end", data: [i], arr: [...arrCopy] });
  };
  return steps;
};
