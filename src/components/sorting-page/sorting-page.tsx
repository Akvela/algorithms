import React, { ChangeEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import sortingStyles from "./sorting-page.module.css";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { Choice } from "../../types/radio-choice";
import { Column } from "../ui/column/column";
import { getRandomInt, randomArr, setDelay, swap} from "../../utils/utils";
import { ElementStates } from "../../types/element-states";

export type TArrayElements = {
  value: number;
  state: ElementStates;
};

export const SortingPage: React.FC = () => {
  const [array, setArray] = React.useState<TArrayElements[]>([]);
  const [radioButton, setRadioButton] = React.useState<Choice>(Choice.sort);
  const [buttonState, setButtonState] = React.useState<boolean>();
  const [control, setControl] = React.useState<Direction>();
  const handlerRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    const valueSort = e.target.value as Choice;
    setRadioButton(valueSort);
  };


  const makeSort = async (arr: TArrayElements[], direction: Direction) => {
    const { length } = arr;
    for (let i = 0; i < length; i++) {
      let min = i;
      array[min].state = ElementStates.Changing;
      for (let j = i + 1; j < length; j++) {
        array[j].state = ElementStates.Changing;
        setArray([...array]);
        await setDelay(400);
        if (
          (direction === Direction.Ascending && array[j].value < array[min].value) ||
          (direction === Direction.Descending && array[j].value > array[min].value)
        ) {
          min = j;
          array[j].state = ElementStates.Changing;
          array[min].state = i === min ? ElementStates.Changing : ElementStates.Default;
        }
        if (j !== min) array[j].state = ElementStates.Default;
        setArray([...array]);
      }
      if (min !== i) swap<TArrayElements>(array, min, i);
      array[min].state = ElementStates.Default;
      array[i].state = ElementStates.Modified;
      setArray([...array]);
    }
  };

  const makeBubble = async (array: TArrayElements[], direction: Direction) => {
    const { length } = array;
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        array[j].state = ElementStates.Changing;
        if (array[j + 1]) array[j + 1].state = ElementStates.Changing;
        setArray([...array]);
        await setDelay(400);
        if (
          (direction === Direction.Ascending && array[j].value > array[j + 1]?.value) ||
          (direction === Direction.Descending && array[j].value < array[j + 1]?.value)
        ) {
          swap(array, j + 1, j);
        }
        array[j].state = ElementStates.Default;
        if (array[j + 1]) array[j + 1].state = ElementStates.Default;
        setArray([...array]);
      }
      array[array.length - i - 1].state = ElementStates.Modified;
      setArray([...array]);
    }
  };

  const makeAscendingSort = async () => {
    setButtonState(true);
    setControl(Direction.Ascending);
    if (radioButton === Choice.sort) {
      await makeSort(array, Direction.Ascending);
    }
    if (radioButton === Choice.bubble) {
      await makeBubble(array, Direction.Ascending);
    }
    setButtonState(false);
  };

  const makeDescendingSort = async () => {
    setButtonState(true);
    setControl(Direction.Descending);
    if (radioButton === Choice.sort) {
      await makeSort(array, Direction.Descending);
    }
    if (radioButton === Choice.bubble) {
      await makeBubble(array, Direction.Descending);
    }
    setButtonState(false);
  };

  const getRandomArr = () => {
    const run = getRandomInt(3, 17);
    setArray(randomArr(run));
  };

  React.useEffect(() => {
    getRandomArr();
  }, []);

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={sortingStyles.page}>
        <div className={sortingStyles.buttons}>
          <div className={sortingStyles.buttons_radio}>
            <RadioInput
              name="radio"
              label="Выбор"
              value={Choice.sort}
              onClick={() => setRadioButton(Choice.sort)}
              extraClass={sortingStyles.radio}
              onChange={handlerRadioChange}
              checked={radioButton === Choice.sort}
            />
            <RadioInput
              name="radio"
              label="Пузырёк"
              value={Choice.bubble}
              onClick={() => setRadioButton(Choice.bubble)}
              onChange={handlerRadioChange}
              checked={radioButton === Choice.bubble}
            />
          </div>
          <div className={sortingStyles.buttons_sorting}>
            <Button 
              text="По возрастанию"
              sorting={Direction.Ascending}
              extraClass={sortingStyles.button_sorting}
              isLoader={buttonState && control === Direction.Ascending}
              disabled={buttonState || !array || !radioButton}
              onClick={makeAscendingSort}
            />
            <Button 
              text="По убыванию"
              sorting={Direction.Descending}
              extraClass={sortingStyles.button_sorting}
              isLoader={buttonState && control === Direction.Descending}
              disabled={buttonState || !array || !radioButton}
              onClick={makeDescendingSort}
            />
            <Button 
              text="Новый массив"
              extraClass={sortingStyles.button_arr}
              disabled={buttonState}
              onClick={getRandomArr}
            />
          </div>
        </div>
        <ul className={sortingStyles.columns}>
          {array?.map((column, index) => (
            <li key={index}>
              <Column
                index={column.value}
                state={column.state}
              />
            </li>))}
        </ul>
      </div>
    </SolutionLayout>
  );
};
