describe('Waiter Table Page Tests', () => {
  beforeEach(() => {
    // Visit the login page and login as a waiter
    cy.visit('http://localhost:3000');

    cy.get('#input-with-icon-id').type('waiter1');
    cy.get('#input-with-icon-password').type('@Waiter1test');
    cy.get('button').contains('Login').click();

    
  });

  it('Checks the presence of key elements on the waiter table page', () => {
    cy.get('nav').should('be.visible');
    cy.contains('h1', 'Tables').should('be.visible');
    cy.get('.notification-icon').should('be.visible');
    cy.get('.tableHeader').should('be.visible');
    cy.get('.tab').contains('Main Floor').should('be.visible');
    cy.get('.tab').contains('Upper Floor').should('be.visible');
  });

  it('Fetches table details for both floors', () => {
    cy.intercept('GET', '/api/table-details', { fixture: 'tableDetails.json' }).as('getTableDetails');
    cy.wait('@getTableDetails').its('response.statusCode').should('eq', 200);

    cy.get('.main-floor-tables').should('exist');
    cy.get('.upper-floor-tables').should('exist');
  });

  it('Updates table status on Main Floor', () => {
    cy.intercept('PUT', '/api/update-table-status', { fixture: 'updateTableStatus.json' }).as('updateTableStatus');
    cy.get('.main-floor-table .status-button').first().click();
    cy.wait('@updateTableStatus').its('response.statusCode').should('eq', 200);
    cy.get('.main-floor-table .status').first().should('contain', 'Updated Status');
  });

  it('Updates table status on Upper Floor', () => {
    cy.intercept('PUT', '/api/update-table-status', { fixture: 'updateTableStatus.json' }).as('updateTableStatus');
    cy.get('.upper-floor-table .status-button').first().click();
    cy.wait('@updateTableStatus').its('response.statusCode').should('eq', 200);
    cy.get('.upper-floor-table .status').first().should('contain', 'Updated Status');
  });

  it('Navigates to notification page on bell icon click', () => {
    cy.get('.notification-icon').click();
    cy.url().should('include', '/waiter-page/notification-page');
  });

  it('Logs out successfully', () => {
    cy.get('.title').click();
    cy.url().should('eq', 'http://localhost:3000');
  });

  it('Switches to Upper Floor tab', () => {
    cy.get('.tab').contains('Upper Floor').click();
    cy.get('.upper-floor-tables').should('be.visible');
  });

  it('Switches to Main Floor tab', () => {
    cy.get('.tab').contains('Main Floor').click();
    cy.get('.main-floor-tables').should('be.visible');
  });
});
