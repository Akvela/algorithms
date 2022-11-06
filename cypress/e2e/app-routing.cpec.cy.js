describe('Тестирование работоспособности приложения', () => {
  it('Приложение запустилось', () => {
    cy.visit('http://localhost:3000/algorithms/');
    cy.get('h1').should('have.text', 'МБОУ АЛГОСОШ');
    cy.get('a').should('have.length', '6');
  });

  it('Посетить страницу с алгоритмом Строка', () => {
    cy.visit('http://localhost:3000/algorithms/recursion');
  });

  it('Посетить страницу с алгоритмом Последовательность Фибоначчи', () => {
    cy.visit('http://localhost:3000/algorithms/fibonacci');
  });

  it('Посетить страницу с алгоритмом Сортировка массива', () => {
    cy.visit('http://localhost:3000/algorithms/sorting');
  });

  it('Посетить страницу с алгоритмом Стек', () => {
    cy.visit('http://localhost:3000/algorithms/stack');
  });

  it('Посетить страницу с алгоритмом Очередь', () => {
    cy.visit('http://localhost:3000/algorithms/queue');
  });

  it('Посетить страницу с алгоритмом Связный список', () => {
    cy.visit('http://localhost:3000/algorithms/list');
  });
});
