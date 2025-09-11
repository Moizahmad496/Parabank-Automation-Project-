import { faker } from "@faker-js/faker";

describe("User Registration", () => {
  it("Should register a new user and login", () => {
    const username = faker.string.alphanumeric(8);
    const password = faker.internet.password();

    cy.visit("https://parabank.parasoft.com/parabank/register.htm");
    cy.get("#customer\\.firstName").type(faker.person.firstName());
    cy.get("#customer\\.lastName").type(faker.person.lastName());
    cy.get('input[name="customer.address.street"]').type(faker.location.streetAddress());
    cy.get('input[name="customer.address.city"]').type(faker.location.city());
    cy.get('input[name="customer.address.state"]').type(faker.location.state());
    cy.get('input[name="customer.address.zipCode"]').type(faker.location.zipCode());
    cy.get('input[name="customer.ssn"]').type(faker.string.numeric(9));
    cy.get('input[name="customer.username"]').type(username);
    cy.get('input[name="customer.password"]').type(password);
    cy.get("#repeatedPassword").type(password);
    cy.get("input[value='Register']").click();

    // Check if registration was successful and user is logged in
    cy.contains("Your account was created successfully").should("be.visible");
    cy.contains("Accounts Overview").should("be.visible");

    // Save the credentials to a fixture file for use in other tests
    cy.writeFile('cypress/fixtures/registeredUser.json', { username, password });
  });
});
