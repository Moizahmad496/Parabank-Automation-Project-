import accountData from "../fixtures/accountNumber.json";

describe("Funds Transfer", () => {
  beforeEach(() => {
    cy.fixture('user').then((user) => {
      cy.login(user.validUser.username, user.validUser.password);
    });
  });

  it("Should transfer funds successfully", () => {
    cy.contains("Transfer Funds").click();
    cy.get("input#amount").type("100");
    cy.get("select#fromAccountId").select(0); // Select first account
    cy.get("select#toAccountId").select(accountData.accountNumber);
    cy.get('input[value="Transfer"]').click();
    cy.contains("Transfer Complete!").should("be.visible");
// Capture the transaction ID
    cy.contains("Accounts Overview").click();
cy.get("a[href*='activity.htm']").first().click(); // opens first account

cy.get("table tr")
  .eq(1) // first row after the header
  .find("td") // all cells in that row
  .first() // first cell = Transaction ID
  .invoke("text")
  .then((transactionId) => {
    cy.log("Captured Transaction ID: " + transactionId);
    cy.writeFile("cypress/fixtures/transaction.json", { transactionId });
  });


  });
});
