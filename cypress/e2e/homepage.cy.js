describe('Homepage Tests', () => {
  it('Logs in as cashier from homepage', () => {
    cy.visit('http://localhost:3000');

    cy.get('#input-with-icon-id').should('exist').and('be.visible').type('cashier1');
    cy.get('#input-with-icon-password').should('exist').and('be.visible').type('@Cashier1test');
    cy.get('button').contains('Login').should('exist').and('be.visible').click();
  });

  it('Logs in as waiter from homepage', () => {
    cy.visit('http://localhost:3000');

    cy.get('#input-with-icon-id').should('exist').and('be.visible').type('waiter1');
    cy.get('#input-with-icon-password').should('exist').and('be.visible').type('@Waiter1test');
    cy.get('button').contains('Login').should('exist').and('be.visible').click();
  });

  it('Logs in as kitchen staff from homepage', () => {
    cy.visit('http://localhost:3000');

    cy.get('#input-with-icon-id').should('exist').and('be.visible').type('kitchenStaff1');
    cy.get('#input-with-icon-password').should('exist').and('be.visible').type('@KitchenStaff1test');
    cy.get('button').contains('Login').should('exist').and('be.visible').click();
  });
});
