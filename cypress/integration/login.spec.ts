import { DummyData } from "../constants";

const inputInfoAndLogin = (): void => {
  cy.getTestData("아이디").type(DummyData.email);
  cy.getTestData("비밀번호").type(DummyData.password);
  cy.getTestData("로그인").click();
}

describe("로그인 페이지 테스트", function() {
  beforeEach(function() {
    cy.visit("/login");
  });

  it("로그인이 성공하면 회원정보 페이지로 이동해야 함", function() {
    inputInfoAndLogin();
    cy.url().should("eq", Cypress.config().baseUrl + "/user");
  });

  it("비밀번호 재설정 클릭하면 재설정 페이지로 이동해야 함", function() {
    cy.getTestData("비밀번호 재설정").click();
    cy.url().should("eq", Cypress.config().baseUrl + "/reset-password");
  });

  describe("사용자 정보 테스트", function() {
    beforeEach(function() {
      inputInfoAndLogin();
    })

    it("사용자 이름, 이메일, 프로필 이미지가 나와야 함", function() {
      ["이름", "이메일", "프로필"].forEach(testId => cy.getTestData(testId).should("be.visible"))
    });

    it("로그아웃 클릭하면 로그인 페이지로 이동해야 함", function() {
      cy.getTestData("로그아웃").click();
      cy.url().should("eq", Cypress.config().baseUrl + "/login");
    })
  })
});