describe('Проверка страницы с алгоритмом Связный список', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/algorithms/list');
  });

  it('Кнопки добавления должны быть disabled, если импут пустой', () => {
    cy.get('input').eq(0).clear();
    cy.get('button').eq(1).should('be.disabled');
    cy.get('button').eq(2).should('be.disabled');
    cy.get('input').eq(1).clear();
    cy.get('button').eq(5).should('be.disabled');
  });

  it('Рандомный массив отрисовывается корректно', () => {
    cy.get('[class*=circles]').children('[class*=wrapper]').should('exist');
    cy.get('[class*=circle_content]').each((el) => {
      cy.wrap(el).find('[class*=letter]').contains(/\d{1,4}/);
    });
    cy.get('[class*=circle_content]').eq(0).contains('head');
    cy.get('[class*=circle_content]').last().contains('tail');
  });

  it('Добавление элемента в head рендерится правильно', () => {
    cy.get('input').eq(0).type('11');
    cy.get('button').eq(1).click();

    cy.get('[class*=circle_content]').eq(0).find('[class*=circle_changing]');
    cy.wait(600);
    cy.get('[class*=circle_content]').eq(0).find('[class*=circle_modified]').contains('11');
    cy.get('[class*=circle_content]').eq(0).contains('head').should('exist');
    cy.wait(300);
    cy.get('[class*=circle_content]').eq(0).find('[class*=circle_default]').contains('11');
  });

  it('Добавление элемента в tail рендерится правильно', () => {
    cy.get('input').eq(0).type('22');
    cy.get('button').eq(2).click();

    cy.get('[class*=circles]').children().its('length').then(($length) => {
      cy.get('[class*=circle_content]').eq($length - 1).find('[class*=circle_changing]');
      cy.wait(600);
      cy.get('[class*=circle_content]').eq($length).find('[class*=circle_modified]').contains('22');
      cy.get('[class*=circle_content]').eq($length).contains('tail').should('exist');
      cy.wait(300);
      cy.get('[class*=circle_content]').eq($length).find('[class*=circle_default]').contains('22');
    });
  });

  it('Добавление элемента по индексу рендерится правильно', () => {
    cy.get('[class*=circles]').children().its('length').then(($length) => {
      cy.get('input').eq(1).type($length - 3);
      cy.get('input').eq(0).type('5');
      cy.get('button').eq(5).click();

      for (let i = 0; i <= $length - 3; i++) {
        cy.get('[class*=circle_content]').eq(i).find('[class*=circle_changing]').should('have.length', 2);
        cy.wait(300);
        if (i === $length - 3) {
          cy.get('[class*=circle_content]').eq(i).find('[class*=circle_changing]').should('have.length', 2);
          cy.wait(300);
          cy.get('[class*=circle_content]').eq(i).find('[class*=circle_modified]').contains('5');
        }
      }
      cy.wait(300);
      cy.get('[class*=circle_content]').each((el) => {
        cy.wrap(el).find('[class*=circle_default]');
      });
    });
  });

  it('Удаление элемента по индексу рендерится правильно', () => {
    cy.get('[class*=circles]').children().its('length').then(($length) => {
      cy.get('input').eq(1).type($length - 3);
      cy.get('button').eq(6).click();

      for (let i = 0; i <= $length - 3; i++) {
        cy.get('[class*=circle_content]').eq(i).find('[class*=circle_changing]');
        cy.wait(300);
        if (i === $length - 3) {
          cy.wait(300);
          cy.get('[class*=circle_content]').eq(i).find('[class*=circle_changing]').should('have.length', 0);
          cy.get('[class*=circle_content]').eq(i).find('[class*=circle_changing]').should('not.have.value', /\d{1,4}/);
          cy.get('[class*=circle_content]').eq(i).find('[class*=small]').contains(/\d{1,4}/);
          cy.wait(300);
          cy.get('[class*=circle_content]').should('have.length', $length - 1);
        }
      }
      cy.get('[class*=circle_content]').each((el) => {
        cy.wrap(el).find('[class*=circle_default]');
      });
    });
  });

  it('Удаление элемента из head рендерится правильно', () => {
    cy.get('[class*=circles]').children().its('length').then(($length) => {
      cy.get('button').eq(3).click();
      cy.get('[class*=circle_content]').eq(0).should('not.have.value', /\d{1,4}/);
      cy.get('[class*=circle_content]').eq(0).find('[class*=circle_changing]').contains(/\d{1,4}/);
      cy.wait(600);
      cy.get('[class*=circle_content]').eq(0).find('[class*=circle_changing]').should('not.exist');
      cy.get('[class*=circle_content]').should('have.length', $length - 1);
    });
  });

  it('Удаление элемента из tail рендерится правильно', () => {
    cy.get('[class*=circles]').children().its('length').then(($length) => {
      cy.get('button').eq(4).click();
      cy.get('[class*=circle_content]').eq($length - 1).should('not.have.value', /\d{1,4}/);
      cy.get('[class*=circle_content]').eq($length - 1).find('[class*=circle_changing]').contains(/\d{1,4}/);
      cy.wait(600);
      cy.get('[class*=circle_content]').should('have.length', $length - 1);
    });
  });  
});
