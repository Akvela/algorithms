import renderer from "react-test-renderer";
import { Button } from "./button";
import { render, screen, fireEvent } from "@testing-library/react";

describe('Компонент Button рендерится без ошибок', () => {
  it('Отрисовка кнопки с текстом', () => {
    const tree = renderer.create(<Button text="Кнопка" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Отрисовка кнопки без текста', () => {
    const tree = renderer.create(<Button />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Отрисовка заблокированной кнопки', () => {
    const tree = renderer.create(<Button disabled={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Отрисовка кнопки с индикацией загрузки', () => {
    const tree = renderer.create(<Button isLoader={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('Проверка работы кнопки', () => {
  it('Нажатие на кнопку вызывает корректный alert', () => {
    window.alert = jest.fn();
    render(<Button text="Click" onClick={() => alert("Кнопка была нажата")} />);
    const button = screen.getByText('Click');
    fireEvent.click(button);
    expect(window.alert).toHaveBeenCalledWith("Кнопка была нажата");
  });
});