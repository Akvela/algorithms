import React from "react";
import fibonacciStyles from "./fibonacci-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { getNumbersFibonacci, checkIndex } from "./utils";
import { setUniqueId, setDelay } from "../../utils/utils";

export const FibonacciPage: React.FC = () => {
  const [valueInput, setValueInput] = React.useState<number | string>(0);
  const [loadingState, setLoadingState] = React.useState<boolean>(false);
  const [current, setCurrent] = React.useState<number>(0);
  const [numberArray, setNumberArray] = React.useState<number[]>([]);

  const setNumbersFibonacci = async () => {
    setLoadingState(true);  
    const arrFibonacci = getNumbersFibonacci(valueInput!);
    setNumberArray(arrFibonacci);
    let i = 0;
    while (i < arrFibonacci.length) {
      await setDelay(500);
      setCurrent(i);
      i++;
    }
    setLoadingState(false); 
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={fibonacciStyles.page}>
        <div className={fibonacciStyles.form}>
          <Input 
            extraClass={fibonacciStyles.input} 
            isLimitText 
            max={19}
            min={1}
            type="number"
            value={valueInput}
            onChange={(e) => {setValueInput(e.currentTarget.value)}}
          />
          <Button 
            text="Рассчитать"
            type="submit"
            extraClass={fibonacciStyles.button}
            isLoader={loadingState}
            disabled={loadingState}
            onClick={setNumbersFibonacci}
          />
        </div>
        <ul className={fibonacciStyles.circles}>
          {numberArray.map((circle: number, index: number) => (
            <li key={setUniqueId()}>
              <Circle
                index={index}
                letter={circle.toString()}
                extraClass={
                  checkIndex(index, current!)
                    ? fibonacciStyles.circle_visible
                    : fibonacciStyles.invisible
                }
              />
            </li>
          ))}
        </ul>
      </div>
    </SolutionLayout>
  );
};
