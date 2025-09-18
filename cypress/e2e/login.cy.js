import testData from "../fixtures/registeredUser.json";

describe("Login Functionality", () => {
  it("Should login with valid credentials", () => {
    cy.login(testData.username, testData.password);
    cy.contains("Accounts Overview").should("be.visible");
  });

  //it("Should fail with invalid credentials", () => {
   // cy.login("wronguser", "wrongpass");
    //cy.contains("The username and password could not be verified.").should("be.visible");
//  });
});
