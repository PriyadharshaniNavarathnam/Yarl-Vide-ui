describe('Waiter Notification Page Tests', () => {
  beforeEach(() => {
    // Visit the login page
    cy.visit('http://localhost:3000');

    // Perform login
    cy.get('#input-with-icon-id').type('waiter1');
    cy.get('#input-with-icon-password').type('@Waiter1test');
    cy.get('button').contains('Login').click();

    
  

    // Navigate to the notification page
    cy.visit('http://localhost:3000/waiter-page/notification-page');
  
  });

  it('Checks the presence of key elements on the notification page', () => {
    cy.get('nav').should('be.visible');
    cy.contains('h1', 'Notifications').should('be.visible');
    cy.get('input[placeholder="Search"]').should('be.visible');
    cy.get('.header').should('be.visible');
    cy.get('.titleContainer').should('be.visible');
  });

  it('Fetches and displays notification data', () => {
    cy.intercept('GET', '/api/notifications', { fixture: 'notifications.json' }).as('getNotifications');
    cy.wait('@getNotifications').its('response.statusCode').should('eq', 200);

    cy.get('.detailsContainer').should('be.visible');
    cy.get('.detailsContainer .row').should('have.length.greaterThan', 0);
  });

  it('Searches for a specific order ID', () => {
    cy.intercept('GET', '/api/notifications', { fixture: 'notifications.json' }).as('getNotifications');
    cy.wait('@getNotifications').its('response.statusCode').should('eq', 200);

    cy.get('input[placeholder="Search"]').type('12345');
    cy.get('.detailsContainer').should('contain', '12345');
  });

  it('Filters out non-matching order IDs', () => {
    cy.intercept('GET', '/api/notifications', { fixture: 'notifications.json' }).as('getNotifications');
    cy.wait('@getNotifications').its('response.statusCode').should('eq', 200);

    cy.get('input[placeholder="Search"]').type('nonexistentID');
    cy.get('.detailsContainer').should('not.contain', 'nonexistentID');
  });

  it('Navigates to another page via the navbar', () => {
    // Replace 'SomeOtherPage' with the actual link text if needed
    cy.get('nav a').contains('SomeOtherPage').click();
    cy.url().should('include', '/some-other-page');
  });

  it('Logs out successfully', () => {
    cy.get('.title').click();
    cy.url().should('eq', 'http://localhost:3000');
  });
});
