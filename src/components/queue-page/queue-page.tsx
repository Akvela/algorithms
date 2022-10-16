import React from "react";
import queuePageStyles from "./queue-page.module.css"
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { setDelay } from "../../utils/utils";
import { Queue } from "./queue";

const queue = new Queue<string | null>(7);

export const QueuePage: React.FC = () => {
  const [valueInput, setValueInput] = React.useState('');
  const [array, setArray] = React.useState<Array<string | null>>([]);
  const [addition, setAddition] = React.useState<boolean>();
  const [deletion, setDeletion] = React.useState<boolean>();
  const [change, setChange] = React.useState<boolean>();
  const [styleChange, setStyleChange] = React.useState<boolean>(true);

  const addQueue = async (): Promise<void> => {
    setAddition(true);
    queue.enqueue(valueInput, setAddition);
    setChange(true);
    await setDelay(200);
    setArray([...queue.elements()]);
    setValueInput('');
    setChange(false);
    setAddition(false);
  };

  const deleteQueue = async (): Promise<void> => {
    setDeletion(true);
    setStyleChange(false);
    queue.dequeue();
    setChange(true);
    await setDelay(200);
    setArray([...queue.elements()]);
    setChange(false);
    setStyleChange(true);
    setDeletion(false);
  };

  const clearQueue = () => {
    queue.clear();
    setArray([...queue.elements()]);
    setAddition(false);
    setValueInput('');
  };

  const setHead = (index: number) => {
    if (array && (queue.getHead() !== null) && (queue.getHead() !== undefined) && (array.indexOf(queue.getHead()) === index)) {
      return 'head';
    };
  };

  const setTail = (index: number) => {
    if (array && (queue.getLength() - 1 === index) && (queue.getTail() !== null)) {
      return 'tail';
    }
  };

  const setColor = (head: number, tail: number, curr: number, change: boolean, styleChange: boolean) => {
    if (tail === curr && change && styleChange) {
      return ElementStates.Changing;
    } else if (head === curr && change && !styleChange) {
      return ElementStates.Changing;
    }
  };

  return (
    <SolutionLayout title="Очередь">
      <div className={queuePageStyles.page}>
        <div className={queuePageStyles.form}>
          <Input 
            extraClass={queuePageStyles.input} 
            isLimitText 
            maxLength={4}
            value={valueInput}
            onChange={(e) => {setValueInput(e.currentTarget.value)}}
          />
          <Button 
            text="Добавить"
            extraClass={queuePageStyles.button_add}
            isLoader={addition}
            disabled={addition || valueInput === ''}
            onClick={addQueue}
          />
          <Button 
            text="Удалить"
            extraClass={queuePageStyles.button_delete}
            isLoader={deletion}
            disabled={queue.fullness()}
            onClick={deleteQueue}
          />
          <Button 
            text="Очистить"
            extraClass={queuePageStyles.button_reset}
            disabled={queue.elements()[0] === undefined}
            onClick={clearQueue}
          />
        </div>
        <ul className={queuePageStyles.circles}>
          <li className={queuePageStyles.circle}>
            <Circle state={setColor(queue.getIndexHead(), queue.getLength(), 1, change!, styleChange)}
              index={0}
              letter={array && `${array[0] ?? ''}`}
              head={setHead(0)}
              tail={setTail(0)}
            />
          </li>
          <li className={queuePageStyles.circle}>
            <Circle state={setColor(queue.getIndexHead(), queue.getLength(), 2, change!, styleChange)}
              index={1}
              letter={array && `${array[1] ?? ''}`}
              head={setHead(1)}
              tail={setTail(1)}
            />
          </li>
          <li className={queuePageStyles.circle}>
            <Circle state={setColor(queue.getIndexHead(), queue.getLength(), 3, change!, styleChange)}
              index={2}
              letter={array && `${array[2] ?? ''}`}
              head={setHead(2)}
              tail={setTail(2)}
            />
          </li>
          <li className={queuePageStyles.circle}>
            <Circle state={setColor(queue.getIndexHead(), queue.getLength(), 4, change!, styleChange)}
              index={3}
              letter={array && `${array[3] ?? ''}`}
              head={setHead(3)}
              tail={setTail(3)}
            />
          </li>
          <li className={queuePageStyles.circle}>
            <Circle state={setColor(queue.getIndexHead(), queue.getLength(), 5, change!, styleChange)}
              index={4}
              letter={array && `${array[4] ?? ''}`}
              head={setHead(4)}
              tail={setTail(4)}
            />
          </li>
          <li className={queuePageStyles.circle}>
            <Circle state={setColor(queue.getIndexHead(), queue.getLength(), 6, change!, styleChange)}
              index={5}
              letter={array && `${array[5] ?? ''}`}
              head={setHead(5)}
              tail={setTail(5)}
            />
          </li>
          <li className={queuePageStyles.circle}>
            <Circle state={setColor(queue.getIndexHead(), queue.getLength(), 7, change!, styleChange)}
              index={6}
              letter={array && `${array[6] ?? ''}`}
              head={setHead(6)}
              tail={setTail(6)}
            />
          </li>
        </ul>
      </div>
    </SolutionLayout>
  );
};
