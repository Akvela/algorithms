describe('Проверка страницы с алгоритмом Строка', () => {
  it('Input должен быть пустой', () => {
    cy.visit('http://localhost:3000/algorithms/recursion');
    cy.get('input').should('have.value', '');
  });

  it('Button должен быть disabled', () => {
    cy.get('button').eq(1).should('be.disabled');
  });

  it('Cтрока разворачивается корректно', () => {
    cy.get('input').type('12345');
    cy.get('button').eq(1).click();

    cy.get('[class*=circle_content]')
      .should('have.length', 5)
      .each((el, index) => {
        cy.wrap(el).contains(index + 1);
        if (index === 0 || index === 4) {
          cy.wrap(el).find('div[class*=circle_changing]');
        }
        if (index === 1) {
          cy.wrap(el).find('div[class*=circle_default]');
        }
      });

    cy.get('div[class*=circle_content]')
      .should('have.length', 5)
      .each((el, index) => {
        cy.wrap(el).contains(5 - index);
        cy.wrap(el).find('div[class*=modified]');
      });
  });
});
