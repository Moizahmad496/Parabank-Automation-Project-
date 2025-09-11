import { faker } from "@faker-js/faker";

describe("Update Contact Info", () => {
  beforeEach(() => {
    cy.readFile('cypress/fixtures/registeredUser.json').then((user) => {
      cy.login(user.username, user.password);
    });
  });

  it("Update name in Parabank contact info", () => {
    // Navigate to Update Contact Info page
    cy.get("a[href*='updateprofile.htm']").click();

    // Generate new fake names
    const newFirstName = faker.person.firstName();
    const newLastName = faker.person.lastName();

    // Clear and update the First Name
    cy.get("#customer\\.firstName")
      .clear()
      .type(newFirstName);

    // Clear and update the Last Name
    cy.get("#customer\\.lastName")
      .clear()
      .type(newLastName);

    // Submit the form
    cy.get("input[value='Update Profile']").click();

    // Assertion: Confirm success message
    cy.contains("Profile Updated").should("be.visible");

    // Optional: Verify the updated names are displayed
   // cy.get("#customer\\.firstName").should("have.value", newFirstName);
    //cy.get("#customer\\.lastName").should("have.value", newLastName);
  });
});
