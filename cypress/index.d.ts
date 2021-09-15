declare namespace Cypress {
  interface Chainable {
    getTestData(testId: string): Chainable;
  }
}