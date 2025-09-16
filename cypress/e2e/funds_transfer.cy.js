import accountData from "../fixtures/accountNumber.json";

describe("Funds Transfer", () => {
  beforeEach(() => {
    cy.readFile('cypress/fixtures/registeredUser.json').then((user) => {
      cy.login(user.username, user.password);
    });
  });

  it("Should transfer funds successfully", () => {
    cy.contains("Transfer Funds").click();
    cy.get("input#amount").type("10");
    cy.get("select#fromAccountId").select(0); // Select first account
    cy.get("select#toAccountId").select(accountData.accountNumber);
    cy.get('input[value="Transfer"]').click();
    cy.contains("Transfer Complete!").should("be.visible");

    // Step 1: Open Account Overview
    cy.contains("Accounts Overview").click();

    // Step 2: Click the first account number
    cy.get("a[href*='activity.htm']").first().click();

    // Step 3: Wait for page to load and click "Funds Transfer Sent" link
    cy.wait(2000);
    cy.get("table").should("be.visible");

    // Step 4: Find all "Funds Transfer Sent" links and get the last one's href
    cy.get("a").filter((index, element) => {
      return Cypress.$(element).text().trim() === "Funds Transfer Sent";
    }).last().invoke("attr", "href").then((href) => {
      const transactionId = href.split("id=")[1]; // Extract ID from href
      cy.log("Captured Transaction ID: " + transactionId);

      // Step 5: Write to JSON fixture
      cy.writeFile("cypress/fixtures/transaction.json", { transactionId });
    });
  });
});