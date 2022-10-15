import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import sortingStyles from "./sorting-page.module.css";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { Choice } from "../../types/radio-choice";
import { Column } from "../ui/column/column";
import { getRandomInt, randomArr, setUniqueId, setDelay } from "../../utils/utils";
import { TStep, getBubbleSortAscending, getBubbleSortDescending, getSelectSortAscending, getSelectSortDescending } from "./utils";

export const SortingPage: React.FC = () => {
  const [array, setArray] = React.useState<number[]>();
  const [radioButton, setRadioButton] = React.useState<Choice>(Choice.sort);
  const [buttonState, setButtonState] = React.useState<boolean>();
  const [control, setControl] = React.useState<Direction>();
  
  const getRandomArr = () => {
    const run = getRandomInt(3, 17);
    const arrayUnique = randomArr(run);
    setArray(arrayUnique);
  };

  React.useEffect(() => {
    getRandomArr();
  }, []);

  const showSteps = async (steps: TStep[]) => {
    for (const step of steps) {
      const { type, data, arr } = step;
      const [first, second, third] = data;
      await setDelay(150);
      if (type === "swap") {
        document.querySelector(`.column-${first}`)?.classList.add(sortingStyles.column_change);
        document.querySelector(`.column-${second}`)?.classList.add(sortingStyles.column_change);
      } else if (type === "select") {
        document.querySelector(`.column-${first}`)?.classList.add(sortingStyles.column_change);
        document.querySelector(`.column-${second}`)?.classList.add(sortingStyles.column_change);
      };
      if (type === "end") {
        document.querySelector(`.column-${first}`)?.classList.add(sortingStyles.column_end);
        Array.from(document.querySelectorAll(".node")).forEach((node) => {
          node.classList.remove(sortingStyles.column_default, sortingStyles.column_change);
        });
      };
      if (type === "defaultBubble") {
        document.querySelector(`.column-${first}`)?.classList.add(sortingStyles.column_default);
        document.querySelector(`.column-${second}`)?.classList.add(sortingStyles.column_change);
        document.querySelector(`.column-${third}`)?.classList.add(sortingStyles.column_change);
      };
      if (type === "defaultSelect") {
        document.querySelector(`.column-${first}`)?.classList.add(sortingStyles.column_change);
        document.querySelector(`.column-${second}`)?.classList.add(sortingStyles.column_default);
        document.querySelector(`.column-${third}`)?.classList.add(sortingStyles.column_change);
      };
      await setDelay(150);
      if (type === "swap" && arr) {
        setArray(arr);
      };
    };
  };

  const startSorting = async (algorithm: string, radioButton: Choice) => {
    algorithm && radioButton && setButtonState(true);
    let steps = [];
    if (algorithm === Direction.Ascending && radioButton === Choice.bubble) {
      steps = getBubbleSortAscending(array);
      await showSteps(steps);
      setButtonState(false);
    };
    if (algorithm === Direction.Descending && radioButton === Choice.bubble) {
      steps = getBubbleSortDescending(array);
      await showSteps(steps);
      setButtonState(false);
    };
    if (algorithm === Direction.Ascending && radioButton === Choice.sort) {
      steps = getSelectSortAscending(array);
      await showSteps(steps);
      setButtonState(false);
    };
    if (algorithm === Direction.Descending && radioButton === Choice.sort) {
      steps = getSelectSortDescending(array);
      await showSteps(steps);
      setButtonState(false);
    };
  };

  const resetStyles = () => {
    Array.from(document.querySelectorAll(".node")).forEach((node) => {
      node.classList.remove(sortingStyles.column_default, sortingStyles.column_change, sortingStyles.column_end);
    });
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={sortingStyles.page}>
        <div className={sortingStyles.buttons}>
          <div className={sortingStyles.buttons_radio}>
            <RadioInput
              name="radio"
              label="Выбор"
              value="sort"
              onClick={() => setRadioButton(Choice.sort)}
              extraClass={sortingStyles.radio}
            />
            <RadioInput
              name="radio"
              label="Пузырёк"
              value="bubble"
              onClick={() => setRadioButton(Choice.bubble)}
            />
          </div>
          <div className={sortingStyles.buttons_sorting}>
            <Button 
              text="По возрастанию"
              sorting={Direction.Ascending}
              extraClass={sortingStyles.button_sorting}
              isLoader={buttonState && control === Direction.Ascending}
              disabled={buttonState || !array || !radioButton}
              onClick={() => {
                startSorting(Direction.Ascending, radioButton!);
                setButtonState(true);
                setControl(Direction.Ascending);
                resetStyles();
              }}
            />
            <Button 
              text="По убыванию"
              sorting={Direction.Descending}
              extraClass={sortingStyles.button_sorting}
              isLoader={buttonState && control === Direction.Descending}
              disabled={buttonState || !array || !radioButton}
              onClick={() => {
                startSorting(Direction.Descending, radioButton!);
                setButtonState(true);
                setControl(Direction.Descending);
                resetStyles();
              }}
            />
            <Button 
              text="Новый массив"
              extraClass={sortingStyles.button_arr}
              disabled={buttonState}
              onClick={() => {
                getRandomArr();
                resetStyles();
              }}
            />
          </div>
        </div>
        <ul className={sortingStyles.columns}>
          {array?.map((column, index) => (
            <li key={index}>
              <Column
                index={column}
                extraClass={`column-${index} node`}
              />
            </li>))}
        </ul>
      </div>
    </SolutionLayout>
  );
};
