Cypress.Commands.add("getTestData", (testId) => cy.get(`[data-testid="${testId}"]`));

