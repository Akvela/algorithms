describe('Проверка страницы с алгоритмом Стек', () => {
  it('Input должен быть пустой', () => {
    cy.visit('http://localhost:3000/algorithms/stack');
    cy.get('input').should('have.value', '');
  });

  it('Кнопка добавления должна быть disabled', () => {
    cy.get('button').eq(1).should('be.disabled');
  });

  it('Добавление элемента рендерится корректно', () => {
    cy.get('input').type('1');
    cy.get('button').eq(1).click();
    const arr = [1, 2, 3];

    cy.get('[class*=circle_content]')
      .should('have.length', 1)
      .each((el, index) => {
        cy.wrap(el).contains(arr[index]);
      });

    cy.get('[class*=circle_content]').eq(0).find('[class*=circle_changing]');
    cy.wait(500);
    cy.get('[class*=circle_content]').eq(0).find('[class*=circle_default]');

    cy.get('input').type('2');
    cy.get('button').eq(1).click();

    cy.get('[class*=circle_content]')
      .should('have.length', 2)
      .each((el, index) => {
        cy.wrap(el).contains(arr[index]);
      });
    cy.get('[class*=circle_content]').eq(1).find('[class*=circle_changing]');
    cy.wait(500);
    cy.get('[class*=circle_content]').eq(1).find('[class*=circle_default]');

    cy.get('input').type('3');
    cy.get('button').eq(1).click();

    cy.get('[class*=circle_content]')
      .should('have.length', 3)
      .each((el, index) => {
        cy.wrap(el).contains(arr[index]);
      });
    cy.get('[class*=circle_content]').eq(2).find('[class*=circle_changing]');
    cy.wait(500);
    cy.get('[class*=circle_content]').eq(2).find('[class*=circle_default]');

  });

  it('Удаление элемента рендерится корректно', () => {
    cy.get('input').type('4');
    cy.get('button').eq(1).click();
    cy.get('button').eq(2).click();
    cy.get('div[class*=circle_changing]');
    cy.get('div[class*=circle_circle]').should('have.length', 3);
    cy.get('div[class*=circle_default]').eq(1).should('have.text', '2');
    cy.get('button').eq(2).click();
    cy.get('div[class*=circle_changing]');
    cy.get('div[class*=circle_circle]').should('have.length', 2);
    cy.get('div[class*=circle_default]').should('have.text', '12');
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
    cy.get('[class*=circle_content]').should('not.exist');
    cy.get('div[class*=circle_circle]').should('have.length', 0);
  });
});
