describe('Cashier Home Page Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');

    cy.get('#input-with-icon-id').type('cashier1');
    cy.get('#input-with-icon-password').type('@Cashier1test');
    cy.get('button').contains('Login').click();
  });

  it('Checks the presence of key elements on the cashier home page', () => {
    cy.get('nav').should('be.visible');
    cy.contains('h1', 'Yarl Vibe').should('be.visible');
    cy.get('input[placeholder="Search"]').should('be.visible');
    cy.get('.cart-icon').should('be.visible');
    cy.get('.menu-row-cashier').should('be.visible');
  });
});
