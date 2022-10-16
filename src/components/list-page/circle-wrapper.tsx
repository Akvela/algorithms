import React, { FC } from "react";
import listPageStyles from "./list-page.module.css";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { ElementStates } from "../../types/element-states";

interface ICircleWrapper {
  state?: ElementStates;
  letter?: string;
  head?: string | React.ReactElement | null;
  index?: number;
  tail?: string | React.ReactElement | null;
  tailType?: 'string' | 'element';
  extraClass?: string;
  fill?: string;
  isSmall?: boolean;
  arrowIcon: boolean;
}

export const CircleWrapper: FC<ICircleWrapper> = (props) => {
  return (
    <li className={listPageStyles.wrapper}>
      <Circle
        state={props.state}
        tail={props.tail}
        head={props.head}
        letter={props.letter}
        index={props.index}
      />
      {!props.arrowIcon && <ArrowIcon fill={props.fill} />}
    </li>
  );
};