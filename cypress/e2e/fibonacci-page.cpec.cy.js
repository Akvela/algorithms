import { selectorCircle } from "../../src/utils/const";

describe('Проверка страницы с алгоритмом Последовательность Фибоначчи', () => {
  it('Input должен быть пустой', () => {
    cy.visit('/fibonacci');
    cy.get('input').should('have.value', '');
  });

  it('Button должен быть disabled', () => {
    cy.get('button').eq(1).should('be.disabled');
  });

  it('Числа генерируются корректно', () => {
    cy.get('input').type('19');
    cy.get('button').eq(1).click();
    cy.wait(500 * 20);

    cy.get(`div${selectorCircle}`)
      .should('have.length', 20)
      .each((el, index) => {
        if (index === 0) cy.wrap(el).contains(0);
        if (index === 1) cy.wrap(el).contains(1);
        if (index === 2) cy.wrap(el).contains(1);
        if (index === 3) cy.wrap(el).contains(2);
        if (index === 4) cy.wrap(el).contains(3);
        if (index === 5) cy.wrap(el).contains(5);
        if (index === 6) cy.wrap(el).contains(8);
        if (index === 7) cy.wrap(el).contains(13);
        if (index === 8) cy.wrap(el).contains(21);
        if (index === 9) cy.wrap(el).contains(34);
        if (index === 10) cy.wrap(el).contains(55);
        if (index === 11) cy.wrap(el).contains(89);
        if (index === 12) cy.wrap(el).contains(144);
        if (index === 13) cy.wrap(el).contains(233);
        if (index === 14) cy.wrap(el).contains(377);
        if (index === 15) cy.wrap(el).contains(610);
        if (index === 16) cy.wrap(el).contains(987);
        if (index === 17) cy.wrap(el).contains(1597);
        if (index === 18) cy.wrap(el).contains(2584);
        if (index === 19) cy.wrap(el).contains(4181);
      });
  });
});
