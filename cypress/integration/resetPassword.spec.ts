
const testMovingToVerification = (): void => {
  cy.getTestData("이메일").type("ably452@dummy.com");
  cy.getTestData("다음").click();
  cy.url().should("eq", Cypress.config().baseUrl + "/reset-password/verify-authcode");
}

const testMovingToChangePassword = (): void => {
  cy.getTestData("인증 코드").type("171009");
  cy.getTestData("다음").click();
  cy.url().should("eq", Cypress.config().baseUrl + "/reset-password/change-password");
}

describe("비밀번호 재설정 테스트", function() {
  beforeEach(function() {
    cy.visit("/reset-password");
  });

  it("인증 코드 요청 성공하면 인증 코드 검증 페이지로 이동해야 함", function() {
    testMovingToVerification();
  });

  it("인증 코드 검증 성공하면 비밀번호 변경 페이지로 이동해야 함", function() {
    testMovingToVerification();
    testMovingToChangePassword();
  });

  it("비밀번호 변경 성공하면 메시지가 나와야 함", function() {
    testMovingToVerification();
    testMovingToChangePassword();
    cy.getTestData("새로운 비밀번호").type("!abc321#$");
    cy.getTestData("새로운 비밀번호 확인").type("!abc321#$");
    cy.getTestData("비밀번호 변경하기").click();
    cy.getTestData("성공 메시지").should("be.visible");
  })
});