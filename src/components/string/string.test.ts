import { getStepsReverse } from "./utils";

describe('Строка разворачивается корректно', () => {
  it('Разворот строки с четным количеством символов', () => {
    expect(getStepsReverse('1234')).toEqual([
      ['1', '2', '3', '4'],
      ['4', '2', '3', '1'],
      ['4', '3', '2', '1'],
    ]);
  });

  it('Разворот строки с нечетным количеством символов', () => {
    expect(getStepsReverse('123')).toEqual([
      ['1', '2', '3'],
      ['3', '2', '1']
    ]);
  });

  it('Разворот строки с одним символом', () => {
    expect(getStepsReverse('1')).toEqual([['1']]);
  });

  it('Разворот пустой строки', () => {
    expect(getStepsReverse('')).toEqual([[]]);
  });
});
