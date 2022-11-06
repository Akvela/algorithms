import { selectorCircle, selectorChanging, selectoreDefault, selectoreModified } from "../../src/utils/const";

describe('Проверка страницы с алгоритмом Строка', () => {
  it('Input должен быть пустой', () => {
    cy.visit('/recursion');
    cy.get('input').should('have.value', '');
  });

  it('Button должен быть disabled', () => {
    cy.get('button').eq(1).should('be.disabled');
  });

  it('Cтрока разворачивается корректно', () => {
    cy.get('input').type('12345');
    cy.get('button').eq(1).click();

    cy.get(selectorCircle)
      .should('have.length', 5)
      .each((el, index) => {
        cy.wrap(el).contains(index + 1);
        if (index === 0 || index === 4) {
          cy.wrap(el).find(`div${selectorChanging}`);
        }
        if (index === 1) {
          cy.wrap(el).find(`div${selectoreDefault}`);
        }
      });

    cy.get(selectorCircle)
      .should('have.length', 5)
      .each((el, index) => {
        cy.wrap(el).contains(5 - index);
        cy.wrap(el).find(`div${selectoreModified}`);
      });
  });
});
