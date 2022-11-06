import renderer from "react-test-renderer";
import { Circle } from "./circle";
import { ElementStates } from "../../../types/element-states";

describe('Компонент Circle рендерится без ошибок', () => {
  it('Отрисовка без букв', () => {
    const tree = renderer.create(<Circle />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Отрисовка с буквами', () => {
    const tree = renderer.create(<Circle letter="aaa" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Отрисовка с head', () => {
    const tree = renderer.create(<Circle head="1" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Отрисовка с react-элементом в head', () => {
    const tree = renderer.create(<Circle head={<Circle />} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Отрисовка с tail', () => {
    const tree = renderer.create(<Circle tail="11" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Отрисовка с react-элементом в tail', () => {
    const tree = renderer.create(<Circle tail={<Circle />} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Отрисовка с index', () => {
    const tree = renderer.create(<Circle index={1} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Отрисовка с пропсом isSmall ===  true', () => {
    const tree = renderer.create(<Circle isSmall={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Отрисовка в состоянии default', () => {
    const tree = renderer.create(<Circle state={ElementStates.Default} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Отрисовка в состоянии changing', () => {
    const tree = renderer.create(<Circle state={ElementStates.Changing} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Отрисовка в состоянии modified', () => {
    const tree = renderer.create(<Circle state={ElementStates.Modified} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});