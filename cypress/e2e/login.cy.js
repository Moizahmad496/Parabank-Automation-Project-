import testData from "../fixtures/user.json";

describe("Login Functionality", () => {
  it("Should login with valid credentials", () => {
    cy.login(testData.validUser.username, testData.validUser.password);
    cy.contains("Accounts Overview").should("be.visible");
  });

  it("Should fail with invalid credentials", () => {
    cy.login("wronguser", "wrongpass");
    cy.contains("The username and password could not be verified.").should("be.visible");
  });
});
