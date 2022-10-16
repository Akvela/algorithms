import React from "react";
import fibonacciStyles from "./fibonacci-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Delayed } from "../delayed/delayed";

export const FibonacciPage: React.FC = () => {
  const [valueInput, setValueInput] = React.useState<number>(1);
  const [loadingState, setLoadingState] = React.useState<boolean>(false);
  const [numberArray, setNumberArray] = React.useState<number[]>([]);

  const setNumbersFibonacci = () => {
    setLoadingState(true);
    let arrFibonacci: number[] = [0, 1];
    for (let i = 2; i < valueInput + 1; i++) {
      arrFibonacci.push(arrFibonacci[i - 2] + arrFibonacci[i - 1]);
    }
    setNumberArray(arrFibonacci);
    setTimeout(function() {setLoadingState(false)}, 500*(valueInput+1));
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={fibonacciStyles.page}>
        <form className={fibonacciStyles.form}>
          <Input 
            extraClass={fibonacciStyles.input} 
            isLimitText 
            max={19}
            min={1}
            type="number"
            value={valueInput}
            onChange={(e) => {setValueInput(Number(e.currentTarget.value))}}
          />
          <Button 
            text="Рассчитать"
            type="submit"
            extraClass={fibonacciStyles.button}
            isLoader={loadingState}
            disabled={loadingState || valueInput > 19}
            onClick={setNumbersFibonacci}
          />
        </form>
        <ul className={fibonacciStyles.circles}>
          {numberArray.map((circle, index) => {
            return (
              <Delayed key={index+100} delay={500*(index+1)}>
                <li className={fibonacciStyles.circle}>
                  <Circle
                    index={index}
                    letter={circle.toString()}
                  />
                </li>
              </Delayed>
            )
          })}
        </ul>
      </div>
    </SolutionLayout>
  );
};
