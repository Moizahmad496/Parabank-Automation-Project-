import { cy } from "@faker-js/faker";
import accountData from "../fixtures/accountNumber.json";

describe("Bill Pay", () => {
  beforeEach(() => {
    cy.readFile('cypress/fixtures/registeredUser.json').then((user) => {
      cy.login(user.username, user.password);
    });
  });

  it("Should pay bills successfully", () => {
    cy.contains("Bill Pay").click();
    cy.get('input[name="payee.name"]').type('Moiz Ahmad');
    cy.get('input[name="payee.address.street"]').type('Islamabad, Pakistan');
    cy.get('input[name="payee.address.city"]').type('Islamabad');
    cy.get('input[name="payee.address.state"]').type('Islamabad');
    cy.get('input[name="payee.address.zipCode"]').type('44000');
    cy.get('input[name="payee.phoneNumber"]').type('1234567890');
    cy.get('input[name="payee.accountNumber"]').type(accountData.accountNumber);
    cy.get('input[name="verifyAccount"]').type(accountData.accountNumber);
    cy.get('input[name="payee.accountNumber"]').invoke('val').then((accountVal) => { 
      cy.get('input[name="verifyAccount"]').invoke('val').should('eq', accountVal);
    
    });
    cy.get('input[name="amount"]').type('50');
   // cy.get("select#accountId").select(0); // Select from account
    cy.wait(1000);
    cy.get('input[value="Send Payment"]').click();
    cy.contains("Bill Payment Complete").should("be.visible");
  });

  it("Should show error when account number and verify account do not match", () => {
    cy.contains("Bill Pay").click();
    cy.get('input[name="payee.name"]').type('Moiz Ahmad');
    cy.get('input[name="payee.address.street"]').type('Islamabad, Pakistan');
    cy.get('input[name="payee.address.city"]').type('Islamabad');
    cy.get('input[name="payee.address.state"]').type('Islamabad');
    cy.get('input[name="payee.address.zipCode"]').type('44000');
    cy.get('input[name="payee.phoneNumber"]').type('1234567890');
    cy.get('input[name="payee.accountNumber"]').type(accountData.accountNumber);
    cy.get('input[name="verifyAccount"]').type('99999'); // Different account number
    cy.get('input[name="amount"]').type('50');
   // cy.get("select#accountId").select(0);
    cy.get('input[value="Send Payment"]').click();
    cy.contains("The account numbers do not match.").should("be.visible");
  });
});