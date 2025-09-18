describe("Open New Account", () => {
  beforeEach(() => {
    cy.readFile('cypress/fixtures/registeredUser.json').then((user) => {
      cy.login(user.username, user.password);
    });
  });

  it("Should open a new Savings account", () => {
    cy.contains("Open New Account").click();
    cy.get("select#type").select("SAVINGS");
    cy.wait(1000);
    cy.get('input[value="Open New Account"]').click({force: true});
    cy.contains("Account Opened!").should("be.visible");
    // Copying the account number for future use 
   
    cy.get('a[href*="activity.htm?id="]')
  .invoke('text')
  .then((accountNumber) => {
    cy.writeFile('cypress/fixtures/accountNumber.json', { accountNumber });
  });

  });
<<<<<<< HEAD
});
=======
});
>>>>>>> 27624282cd414e4b5b2a26f0de2ca681bc303c50
