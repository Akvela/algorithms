import React from "react";
import listPageStyles from "./list-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { CircleWrapper } from "./circle-wrapper";
import { ListNode, List } from "./list";
import { setUniqueId, setDelay } from "../../utils/utils";
import { ElementStates } from "../../types/element-states";
import { randomArr } from "../../utils/utils";

export const ListPage: React.FC = () => {
  const [valueInputStop, setValueInputStop] = React.useState('');
  const [valueInputIndex, setValueInputIndex] = React.useState(0);
  const [array, setArray] = React.useState<any>([]);
  const [currentIndex, setCurrentIndex] = React.useState<number | null>(null);
  const [stateHead, setStateHead] = React.useState<ElementStates>();
  const [stateTail, setStateTail] = React.useState<ElementStates>();
  const [indexTail, setIndexTail] = React.useState<number | null>(null);
  const [changeHead, setChangeHead] = React.useState<boolean>();
  const [changeTail, setChangeTail] = React.useState<boolean>();
  const [lastIndexTail, setLastIndexTail] = React.useState<number | null>();
  const [circleSmall, setCircleSmall] = React.useState<boolean>();
  const [deletionHead, setDeletionHead] = React.useState<boolean>();
  const [deletionTail, setDeletionTail] = React.useState<boolean>();
  const [deletion, setDeletion] = React.useState<boolean>(true);
  const [search, setSearch] = React.useState<boolean>();
  const [cycle, setCycle] = React.useState<boolean>();
  const [process, setProcess] = React.useState<boolean>();
  const ref = React.useRef<List<string> | null>(null);

  const addList = (): List<string> => {
    if (ref.current === null) {
      ref.current = new List<string>();
    };
    return ref.current;
  };

  const list = addList();

  const getRandomArr = () => {
    randomArr(3).forEach((item) => {
      list.append(item.value.toString());
    });
    setArray(list.putArray());
  };

  React.useEffect(() => {
    getRandomArr();
  }, []);

  const prepend = async () => {
    setProcess(true);
    setChangeHead(true);
    await setDelay(300);
    list.prepend(valueInputStop);
    await setDelay(300);
    setArray(list.putArray());
    setStateHead(ElementStates.Modified);
    setValueInputStop('');
    setChangeHead(false);
    await setDelay(300);
    setStateHead(ElementStates.Default);
    setProcess(false);
  };

  const append = async () => {
    setProcess(true);
    setChangeTail(true);
    await setDelay(300);
    list.append(valueInputStop);
    await setDelay(300);
    setArray(list.putArray());
    setStateTail(ElementStates.Modified);
    setValueInputStop('');
    setChangeTail(false);
    await setDelay(300);
    setStateTail(ElementStates.Default);
    setProcess(false);
  };

  const deleteHead = async () => {
    setProcess(true);
    setDeletionHead(true);
    await setDelay(300);
    list.deleteHead();
    setArray(list.putArray());
    setDeletionHead(false);
    setValueInputStop('');
    setProcess(false);
  };

  const deleteTail = async () => {
    setProcess(true);
    setDeletionTail(true);
    await setDelay(300);
    list.deleteTail();
    setArray(list.putArray());
    setValueInputStop('');
    setDeletionTail(false);
    setProcess(false);
  };

  const addIndex = async (value: string, index: number) => {
    setProcess(true);
    setSearch(true);
    setCircleSmall(true);
    let i = 0;
    setCycle(true);
    while (i <= index) {
      setCurrentIndex(i);
      await setDelay(300);
      i++;
    }
    await setDelay(300);
    setCycle(false);
    list.addIndex(value, index);
    setArray(list.putArray());
    setCircleSmall(false);
    await setDelay(300);
    setCurrentIndex(null);
    setSearch(false);
    await setDelay(300);
    setValueInputIndex(0);
    setValueInputStop('');
    setProcess(false);
  };

  const deleteIndex = async (index: number) => {
    setCycle(true);
    setProcess(true);
    setSearch(true);
    setDeletion(true);
    setCircleSmall(true);
    let i = 0;
    while (i <= index) {
      setIndexTail(i);
      await setDelay(300);
      i++;
    }
    await setDelay(300);
    setLastIndexTail(i - 1);
    await setDelay(300);
    setDeletion(false);
    await setDelay(300);
    setSearch(false);
    await setDelay(300);
    list.deleteIndex(index);
    setArray(list.putArray());
    setDeletion(true);
    setCycle(false);
    setCircleSmall(false);
    await setDelay(300);
    setLastIndexTail(null);
    setIndexTail(null);
    setValueInputIndex(0);
    setProcess(false);
  };

  const setHead = (
    item: ListNode<string>,
    index: number,
    value: string | number,
    changeHead: boolean
  ) => {
    if (index === 0 || (!!currentIndex && currentIndex === 0)) {
      return changeHead || (currentIndex === 0 && circleSmall) ? (
        <Circle
          state={ElementStates.Changing}
          isSmall={true}
          letter={`${value}`}
        />
      ) : 'head';
    } else if (index === currentIndex && circleSmall) {
      return (
        <Circle
          state={ElementStates.Changing}
          isSmall={true}
          letter={`${value}`}
        />
      );
    } else if (item.next === null && changeTail) {
      return (
        <Circle
          state={ElementStates.Changing}
          isSmall={true}
          letter={`${value}`}
        />
      );
    };
  };

  const setTail = (item: ListNode<string>, index: number) => {
    if (index === lastIndexTail && !deletion) {
      return (
        <Circle
          state={ElementStates.Changing}
          isSmall={true}
          letter={`${item.value}`}
        />
      );
    } else if (index === 0 && deletionHead) {
      return (
        <Circle
          state={ElementStates.Changing}
          isSmall={true}
          letter={`${item.value}`}
        />
      );
    } else if (item.next === null) {
      if (index === array.length - 1 && deletionTail) {
        return (
          <Circle
            state={ElementStates.Changing}
            isSmall={true}
            letter={`${item.value}`}
          />
        );
      }
      return 'tail';
    }
  };

  const changeValue = (
    item: ListNode<string>,
    curr: number,
    index: number,
    change: boolean
  ) => {
    if (index === curr && !change) {
      return '';
    } else if (curr === 0 && deletionHead) {
      return '';
    } else if (curr === array.length - 1 && deletionTail) {
      return '';
    }
    return item.value;
  };

  const setState = (
    stateHead: ElementStates,
    index: number,
    item: ListNode<string>,
    stateIndex: number
  ) => {
    if (index === 0 && !search) {
      return !!stateHead ? stateHead : ElementStates.Default;
    } else if (item.next === null && !search) {
      return !!stateTail ? stateTail : ElementStates.Default;
    } else if (search && index <= currentIndex!) {
      if (index === Number(stateIndex) && search && !cycle) {
        return ElementStates.Modified;
      }
      return ElementStates.Changing;
    } else if (search && index <= indexTail!) {
      return ElementStates.Changing;
    }
  };

  return (
    <SolutionLayout title="Связный список">
      <div className={listPageStyles.page}>
        <div className={listPageStyles.frame}>
          <Input 
            extraClass={listPageStyles.input} 
            isLimitText 
            maxLength={4}
            value={valueInputStop}
            onChange={(e) => {setValueInputStop(e.currentTarget.value)}}
          />
          <Button 
            text="Добавить в head"
            extraClass={listPageStyles.button_head_tail}
            isLoader={changeHead}
            disabled={process || valueInputStop === ''}
            onClick={prepend}
          />
          <Button 
            text="Добавить в tail"
            extraClass={listPageStyles.button_head_tail}
            isLoader={changeTail}
            disabled={process || valueInputStop === ''}
            onClick={append}
          />
          <Button 
            text="Удалить из head"
            extraClass={listPageStyles.button_head_tail}
            disabled={process || array.length === 0}
            isLoader={deletionHead}
            onClick={deleteHead}
          />
          <Button 
            text="Удалить из tail"
            extraClass={listPageStyles.button_head_tail}
            disabled={process || array.length === 0}
            isLoader={deletionTail}
            onClick={deleteTail}
          />
          <Input 
            extraClass={listPageStyles.input} 
            isLimitText 
            type="number"
            min={0}
            max={array.length - 1}
            placeholder ="Введите индекс"
            value={valueInputIndex}
            onChange={(e) => {setValueInputIndex(Number(e.currentTarget.value))}}
          />
          <Button 
            text="Добавить по индексу"
            extraClass={listPageStyles.button_index}
            isLoader={!(currentIndex === null)}
            disabled={process || !valueInputStop || valueInputIndex > array.length - 1}
            onClick={() => addIndex(valueInputStop, valueInputIndex)}
          />
          <Button 
            text="Удалить по индексу"
            extraClass={listPageStyles.button_index}
            disabled={process || valueInputIndex > array.length - 1}
            isLoader={!(currentIndex === null)}
            onClick={() => deleteIndex(valueInputIndex)}
          />
        </div>
        <ul className={listPageStyles.circles}>
          {array && array.map((circle: ListNode<string>, index: number) => {
            return (
              <CircleWrapper
                arrowIcon={array.length - 1 === index}
                letter={`${changeValue(circle, index, valueInputIndex, deletion!)}`}
                state={setState(stateHead!, index, circle, valueInputIndex)}
                tail={setTail(circle, index)}
                head={setHead(circle, index, valueInputStop, changeHead!)}
                key={setUniqueId()}
                fill={currentIndex! > index || indexTail! > index ? "#D252E1" : "#0032FF"}
                index={index}
              />
            )
          })}
        </ul>
      </div>
    </SolutionLayout>
  );
};
