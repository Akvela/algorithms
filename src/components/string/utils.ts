import { swap } from "../../utils/utils";
import { TStringCircle } from "./string";
import { ElementStates } from "../../types/element-states";

export const getStepsReverse = (str: string) => {
  let arr = str.split('');
  let steps = [[...arr]]
  let start = 0;
  let end = arr.length - 1;

  if (arr.length <= 1) return steps;

  while (start < end) {
    swap(arr, start, end)
    steps.push([...arr])
    start++;
    end--;
  } 
  return steps;
};

export const makeStep = (arr: string[]) => {
  return arr.map((value, index) => ({ value, index, state: ElementStates.Default }));
};

export const changeState = (arr: TStringCircle[], numbers: number[], state: ElementStates): void => {
  numbers.forEach((item) => (
    arr[item].state = state
  ));
};
