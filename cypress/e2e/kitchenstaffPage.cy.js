describe('Kitchen Staff Page Tests', () => {
  beforeEach(() => {
    // Visit the login page and login as kitchen staff
    cy.visit('http://localhost:3000');

    cy.get('#input-with-icon-id').type('kitchenStaff1');
    cy.get('#input-with-icon-password').type('@kitchenStaff1test');
    cy.get('button').contains('Login').click();


  });

  it('Checks the presence of key elements on the kitchen staff page', () => {
    cy.get('nav').should('be.visible');
    cy.contains('div', 'OrderID').should('be.visible');
    cy.contains('div', 'Date and Time').should('be.visible');
    cy.contains('div', 'Status').should('be.visible');
    cy.get('input[placeholder="Search"]').should('be.visible');
  });

  it('Fetches and displays order data', () => {
    cy.intercept('GET', '/api/orders', { fixture: 'orders.json' }).as('getOrders');
    cy.wait('@getOrders').its('response.statusCode').should('eq', 200);

    cy.get('.detailsContainer').should('be.visible');
    cy.get('.kitchen-order-row').should('have.length.greaterThan', 0);
  });

  it('Searches for a specific order ID', () => {
    cy.intercept('GET', '/api/orders', { fixture: 'orders.json' }).as('getOrders');
    cy.wait('@getOrders').its('response.statusCode').should('eq', 200);

    cy.get('input[placeholder="Search"]').type('12345');
    cy.get('.kitchen-order-row').should('contain', '12345');
  });

  it('Filters out non-matching order IDs', () => {
    cy.intercept('GET', '/api/orders', { fixture: 'orders.json' }).as('getOrders');
    cy.wait('@getOrders').its('response.statusCode').should('eq', 200);

    cy.get('input[placeholder="Search"]').type('nonexistentID');
    cy.get('.kitchen-order-row').should('not.contain', 'nonexistentID');
  });

  it('Displays order details on selection', () => {
    cy.intercept('GET', '/api/orders', { fixture: 'orders.json' }).as('getOrders');
    cy.wait('@getOrders').its('response.statusCode').should('eq', 200);

    cy.get('.kitchen-order-row').first().click();
    cy.get('.order-details').should('be.visible');
  });

  it('Handles mobile screen layout correctly', () => {
    cy.viewport('iphone-6');
    cy.intercept('GET', '/api/orders', { fixture: 'orders.json' }).as('getOrders');
    cy.wait('@getOrders').its('response.statusCode').should('eq', 200);

    cy.get('.kitchen-order-row').first().click();
    cy.get('.order-details').should('be.visible');
    cy.get('.kitchen-titles').should('not.be.visible');
  });
});
