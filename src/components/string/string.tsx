import React, { ChangeEvent } from "react";
import stringStyles from "./string.module.css";
import { ElementStates } from "../../types/element-states";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { setDelay } from "../../utils/utils";
import { getStepsReverse } from "./utils";
import { changeState, makeStep } from "./utils";

export type TStringCircle = {
  value: string;
  index: number;
  state: ElementStates;
};

export const StringComponent: React.FC = () => {
  const [valueInput, setValueInput] = React.useState('');
  const [invertedString, setInvertedString] = React.useState<JSX.Element[]>([]);
  const [loadingState, setLoadingState] = React.useState(false);

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValueInput(e.target.value)
  };

  const renderAlgorithm = (circle: TStringCircle[]) => {
    setInvertedString(
      circle.map((item, index) => (
        <li key={index}>
          <Circle letter={item.value} state={item.state} />
        </li>
      ))
    );
  };

  const reverseString = async () => {
    const steps = getStepsReverse(valueInput);
    const modifiedIndex = [];
    let changingIndex = [];
    let currentStep = makeStep(steps[0]);
    renderAlgorithm(currentStep);
    if (steps?.length === 1) {
      await setDelay(1000);
      changeState(currentStep, [0], ElementStates.Modified);
      renderAlgorithm(currentStep);
    } else {
      let start = 0;
      const end = steps.length - 1;
      let firstInd = 0;
      let lastInd = steps[0].length - 1;
      while (start < end) {
        currentStep = makeStep(steps[start]);
        if (start > 0) {
          await setDelay(1000);
          changeState(currentStep, modifiedIndex, ElementStates.Modified);
          renderAlgorithm(currentStep);
        }
        changingIndex = [firstInd, lastInd];
        await setDelay(1000);
        changeState(currentStep, changingIndex, ElementStates.Changing);
        renderAlgorithm(currentStep);
        modifiedIndex.push(firstInd, lastInd);
        start++;
        firstInd++;
        lastInd--;
      }
      await setDelay(1000);
      currentStep = makeStep(steps[end]);
      changeState(currentStep, modifiedIndex, ElementStates.Modified);
      renderAlgorithm(currentStep);
      await setDelay(1000);
      modifiedIndex.push(end)
      changeState(currentStep, modifiedIndex, ElementStates.Modified);
      renderAlgorithm(currentStep);
    }
  }
  
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoadingState(true);
    setValueInput('');
    setInvertedString([])
    await reverseString()
    setLoadingState(false);
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
            onChange={changeHandler}
          />
          <Button 
            text="Развернуть"
            extraClass={stringStyles.button}
            type="submit"
            isLoader={loadingState}
            disabled={loadingState || !valueInput}
          />
        </form>
        <ul className={stringStyles.circles}>
          {invertedString}
        </ul>
      </div>
    </SolutionLayout>
  );
};
