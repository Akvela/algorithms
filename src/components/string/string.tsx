import React from "react";
import stringStyles from "./string.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { setUniqueId, setDelay } from "../../utils/utils";
import { reverseString, findIndex } from "./utils";


export const StringComponent: React.FC = () => {
  const [valueInput, setValueInput] = React.useState('');
  const [loadingState, setLoadingState] = React.useState(false);
  const [visibilityСircles, setVisibilityСircles] = React.useState(false);
  const [start, setStart] = React.useState<number>();
  const [end, setEnd] = React.useState<number>();

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    reverseString(valueInput, setVisibilityСircles, setLoadingState, setDelay, setValueInput, setStart, setEnd);
  };

  return (
    <SolutionLayout title="Строка">
      <div className={stringStyles.page}>
        <form className={stringStyles.form} onSubmit={submitHandler}>
          <Input 
            extraClass={stringStyles.input} 
            isLimitText 
            maxLength={11}
            value={valueInput}
            onChange={(e) => {
              setValueInput(e.currentTarget.value);
              setStart(undefined);
              setEnd(undefined);
            }}
          />
          <Button 
            text="Развернуть"
            extraClass={stringStyles.button}
            type="submit"
            isLoader={loadingState}
            disabled={loadingState}
          />
        </form>
        <ul className={stringStyles.circles}>
          {visibilityСircles &&
            valueInput
              .split('')
              .map((circle: string, index: number) => (
                <li key={setUniqueId()}>
                  <Circle
                    state={findIndex(start!, end!, index)}
                    letter={circle}
                  />
                </li>
              ))}
        </ul>
      </div>
    </SolutionLayout>
  );
};
