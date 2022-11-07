import { selectorCircle, selectorChanging, selectoreDefault } from "../../src/utils/const";

describe('Проверка страницы с алгоритмом Стек', () => {
  it('Input должен быть пустой', () => {
    cy.visit('/stack');
    cy.get('input').should('have.value', '');
  });

  it('Кнопка добавления должна быть disabled', () => {
    cy.get('button').eq(1).should('be.disabled');
  });

  it('Добавление элемента рендерится корректно', () => {
    cy.get('input').type('1');
    cy.get('button').eq(1).click();
    const arr = [1, 2, 3];

    cy.get(selectorCircle)
      .should('have.length', 1)
      .each((el, index) => {
        cy.wrap(el).contains(arr[index]);
      });

    cy.get(selectorCircle).eq(0).find(selectorChanging);
    cy.wait(500);
    cy.get(selectorCircle).eq(0).find(selectoreDefault);

    cy.get('input').type('2');
    cy.get('button').eq(1).click();

    cy.get(selectorCircle)
      .should('have.length', 2)
      .each((el, index) => {
        cy.wrap(el).contains(arr[index]);
      });
    cy.get(selectorCircle).eq(1).find(selectorChanging);
    cy.wait(500);
    cy.get(selectorCircle).eq(1).find(selectoreDefault);

    cy.get('input').type('3');
    cy.get('button').eq(1).click();

    cy.get(selectorCircle)
      .should('have.length', 3)
      .each((el, index) => {
        cy.wrap(el).contains(arr[index]);
      });
    cy.get(selectorCircle).eq(2).find(selectorChanging);
    cy.wait(500);
    cy.get(selectorCircle).eq(2).find(selectoreDefault);

  });

  it('Удаление элемента рендерится корректно', () => {
    cy.get('input').type('4');
    cy.get('button').eq(1).click();
    cy.get('button').eq(2).click();
    cy.get(`div${selectorChanging}`);
    cy.get('div[class*=circle_circle]').should('have.length', 3);
    cy.get(`div${selectoreDefault}`).eq(1).should('have.text', '2');
    cy.get('button').eq(2).click();
    cy.get(`div${selectorChanging}`);
    cy.get('div[class*=circle_circle]').should('have.length', 2);
    cy.get(`div${selectoreDefault}`).should('have.text', '12');
  });

  it('Кнопка Очистить работает корректно', () => {
    cy.get('input').type('3');
    cy.get('button').eq(1).click();
    cy.wait(500);
    cy.get('input').type('2');
    cy.get('button').eq(1).click();
    cy.wait(500);
    cy.get('input').type('1');
    cy.get('button').eq(1).click();
    cy.wait(500);
    cy.get('button').eq(3).click();
    cy.get(selectorCircle).should('not.exist');
    cy.get('div[class*=circle_circle]').should('have.length', 0);
  });
});
