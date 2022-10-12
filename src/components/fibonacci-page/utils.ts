export const getNumbersFibonacci = (n: number | string): number[] => {
  let arr: number[] = [0, 1];
  for (let i = 2; i < Number(n) + 1; i++) {
    arr.push(arr[i - 2] + arr[i - 1]);
  }
  return arr;
}

export const checkIndex = (index: number, current: number): boolean => {
  if (index <= current) {
    return true;
  } else {
    return false;
  }
};
