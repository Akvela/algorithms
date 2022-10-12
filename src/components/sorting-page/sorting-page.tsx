import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import sortingStyles from "./sorting-page.module.css";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { Choice } from "../../types/radio-choice";
import { Column } from "../ui/column/column";
import { getRandomInt, randomArr } from "../../utils/utils";

export const SortingPage: React.FC = () => {
  const [array, setArray] = React.useState<number[]>();
  const [radioButton, setRadioButton] = React.useState<Choice>(Choice.sort);
  
  const getRandomArr = () => {
    const run = getRandomInt(3, 17);
    console.log(run);
    const arrayUnique = randomArr(run);
    setArray(arrayUnique);
    console.log(arrayUnique);
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={sortingStyles.page}>
        <div className={sortingStyles.buttons}>
          <div className={sortingStyles.buttons_radio}>
            <RadioInput
              name="radio"
              label="Выбор"
              value="sort"
              checked
              onClick={() => setRadioButton(Choice.sort)}
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
            />
            <Button 
              text="По убыванию"
              sorting={Direction.Descending}
              extraClass={sortingStyles.button_sorting}
            />
            <Button 
              text="Новый массив"
              extraClass={sortingStyles.button_arr} 
              onClick={() => getRandomArr()}
            />
          </div>
        </div>
        <ul className={sortingStyles.columns}>
          {array?.map((column, index) => (
            <li key={index}>
              <Column
                index={column}
                
              />
            </li>))}
        </ul>
      </div>
    </SolutionLayout>
  );
};
