import { ElementStates } from "../../types/element-states";
import { swap } from "../../utils/utils";

export const reverseString = async (
  value: string,
  circleState: React.Dispatch<React.SetStateAction<boolean>>,
  buttonState: React.Dispatch<React.SetStateAction<boolean>>,
  delay: (milliseconds: number) => Promise<unknown>,
  installValue: React.Dispatch<React.SetStateAction<string>>,
  installStart: React.Dispatch<React.SetStateAction<number | undefined>>,
  installEnd: React.Dispatch<React.SetStateAction<number | undefined>>
): Promise<void> => {
  circleState(true);
  buttonState(true);
  let arr = value.split('');
  let start = 0;
  let end = arr.length - 1;
  while (start <= end) {
    installStart(start);
    installEnd(end);
    swap(arr, start, end);
    installValue(arr.join(''));
    await delay(1000);
    start++;
    end--;
  }
  installStart(-1);
  installEnd(-1);
  buttonState(false);
};

export const findIndex = (start: number, end: number, index: number): ElementStates | undefined => {
  if (start === index) {
    return ElementStates.Changing;
  } else if (end === index) {
    return ElementStates.Changing;
  } else if (start > index) {
    return ElementStates.Modified;
  } else if (end < index) {
    return ElementStates.Modified;
  } else if (start === -1 && end === -1) {
    return ElementStates.Modified;
  }
};