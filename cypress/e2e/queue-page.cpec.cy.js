import { selectorCircle, selectorChanging, selectoreDefault } from "../../src/utils/const";

describe('Проверка страницы с алгоритмом Очередь', () => {
  it('Input должен быть пустой', () => {
    cy.visit('/queue');
    cy.get('input').should('have.value', '');
  });

  it('Кнопка добавления должна быть disabled', () => {
    cy.get('button').eq(1).should('be.disabled');
  });

  it('Добавление элемента рендерится корректно, head и tail рендерятся правильно', () => {
    cy.get('input').type('1');
    cy.get('button').eq(1).click();

    cy.get(selectorCircle).eq(0).find(selectorChanging);
    cy.wait(500);
    cy.get(selectorCircle).eq(0).contains('1');
    cy.get(selectorCircle).eq(0).contains('head');
    cy.get(selectorCircle).eq(0).contains('tail');
    cy.get(selectorCircle).eq(0).find(selectoreDefault);

    cy.get('input').type('2');
    cy.get('button').eq(1).click();

    cy.get(selectorCircle).eq(1).find(selectorChanging);
    cy.get(selectorCircle).eq(1).contains('tail');
    cy.get(selectorCircle).eq(0).contains('tail').should('not.exist');
    cy.get(selectorCircle).eq(0).contains('head');
    cy.wait(500);

    cy.get('input').type('3');
    cy.get('button').eq(1).click();

    cy.get(selectorCircle).eq(2).find(selectorChanging);
    cy.get(selectorCircle).eq(2).contains('tail');
    cy.get(selectorCircle).eq(1).contains('tail').should('not.exist');
    cy.get(selectorCircle).eq(0).contains('head');
  });

  it('Удаление элемента рендерится корректно, head и tail рендерятся правильно', () => {
    cy.get('input').type('4');
    cy.get('button').eq(1).click();
    cy.wait(500);

    cy.get('input').type('5');
    cy.get('button').eq(1).click();
    cy.wait(500);

    cy.get('input').type('6');
    cy.get('button').eq(1).click();
    cy.wait(500);

    cy.get('button').eq(2).click();

    cy.get(selectorCircle)
    .each((el, index) => {
      if (index === 0) cy.wrap(el).find(selectorChanging);
      if (index !== 0) cy.wrap(el).find(selectoreDefault);
    });

  cy.get(selectorCircle)
    .each((el, index) => {
      if (index === 0) cy.wrap(el).find(selectoreDefault);
      if (index === 1) cy.wrap(el).contains('head');
    });

    cy.get('button').eq(2).click();
    
    cy.get(selectorCircle)
    .each((el, index) => {
      if (index === 1) cy.wrap(el).find(selectorChanging);
      if (index !== 1) cy.wrap(el).find(selectoreDefault);
    });

  cy.get(selectorCircle)
    .each((el, index) => {
      if (index === 1) cy.wrap(el).find(selectoreDefault);
      if (index === 2) cy.wrap(el).contains('head');
    });
  });

  it('Кнопка Очистить работает корректно', () => {
    cy.get('input').type('1');
    cy.get('button').eq(1).click();
    cy.wait(500);
    cy.get('input').type('2');
    cy.get('button').eq(1).click();
    cy.wait(500);
    cy.get('button').eq(3).click();

    cy.get(selectorCircle).eq(0).contains('1').should('not.exist');
    cy.get(selectorCircle).eq(1).contains('2').should('not.exist');
  });
});
