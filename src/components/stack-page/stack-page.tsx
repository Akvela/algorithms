import React from "react";
import stackPageStyles from "./stack-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { Stack } from "./stack";
import { setDelay, setUniqueId } from "../../utils/utils";

const stack = new Stack<string>();

export const StackPage: React.FC = () => {
  const [valueInput, setValueInput] = React.useState('');
  const [current, setCurrent] = React.useState<number>(0);
  const [array, setArray] = React.useState<Array<string>>([]);
  const [addition, setAddition] = React.useState<boolean>();
  const [deletion, setDeletion] = React.useState<boolean>();
  const [change, setChange] = React.useState<boolean>();
  const [process, setProcess] = React.useState<boolean>();

  const addStack = async () => {
    setProcess(true);
    stack.push(valueInput, setAddition);
    setArray([...stack.getElements()]);
    setChange(true);
    await setDelay(500);
    setChange(false);
    setAddition(false);
    setProcess(false);
    setValueInput('');
  };

  const deleteStack = async () => {
    setProcess(true);
    setDeletion(true);
    stack.pop();
    setChange(true);
    await setDelay(500);
    setArray([...stack.getElements()]);
    setChange(false);
    setDeletion(false);
    setProcess(false);
  };

  const clearStack = () => {
    setProcess(true);
    stack.clear();
    setArray([...stack.getElements()]);
    setProcess(false);
    setValueInput('');
  };

  const findHead = (curr: number, index: number) => {
    if (curr === index + 1) {
      return 'top';
    };
  };

  const setColor = (curr: number, index: number, deletion: boolean, change: boolean) => {
    if (findHead(curr, index) === 'top' && change && !deletion) {
      return ElementStates.Changing;
    } else if (findHead(curr, index - 1) === 'top' && change && deletion) {
      return ElementStates.Changing;
    };
    return ElementStates.Default;
  };

  return (
    <SolutionLayout title="Стек">
      <div className={stackPageStyles.page}>
        <div className={stackPageStyles.form}>
          <Input 
            extraClass={stackPageStyles.input} 
            isLimitText 
            maxLength={4}
            value={valueInput}
            onChange={(e) => {setValueInput(e.currentTarget.value)}}
          />
          <Button 
            text="Добавить"
            extraClass={stackPageStyles.button_add}
            isLoader={addition}
            disabled={process || valueInput === ''}
            onClick={() => {setCurrent(current + 1); addStack()}}
          />
          <Button 
            text="Удалить"
            extraClass={stackPageStyles.button_delete}
            isLoader={deletion}
            disabled={process || array.length === 0}
            onClick={() => {
              setCurrent(current - 1);
              deleteStack();
            }}
          />
          <Button 
            text="Очистить"
            extraClass={stackPageStyles.button_reset}
            disabled={process || array.length === 0}
            onClick={() => {
              setCurrent(0);
              clearStack();
            }}
          />
        </div>
        <ul className={stackPageStyles.circles}>
          {array.map((circle, index) => {
            return (
              <li className={stackPageStyles.circle} key={setUniqueId()}>
                <Circle
                  index={index}
                  letter={circle}
                  state={setColor(current, index, deletion!, change!)}
                  head={!deletion ? findHead(current, index) : findHead(current, index - 1)}
                />
              </li>
            )
          })}
        </ul>
      </div>
    </SolutionLayout>
  );
};
