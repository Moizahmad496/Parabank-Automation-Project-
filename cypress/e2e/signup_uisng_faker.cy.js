
import { faker } from '@faker-js/faker';

describe('Signup Test with Faker in Swaggy labs ', () => {
  it('should generate fake data for signup form ', () => {
   // const fakeName = faker.person.fullName();
    const fakeEmail = faker.internet.email();
    let fakePassword = faker.internet.password();
    if (!/[!@#$%^&*]/.test(fakePassword)) {
      fakePassword += '@';
    }

    //cy.log('Generated Name:', fakeName);
    cy.log('Generated Email:', fakeEmail);
    cy.log('Generated Password:', fakePassword); 

    // Example usage in test
    cy.visit('https://searchsahtein.com/signup/customer');
       cy.get('input[name="username"]').type('John')

             cy.get('input[name="lastName"]').type('Doe')
    //cy.get('input[name="name"]').type(fakeName);
     cy.get('input[name="email"]').should('be.visible');
    cy.get('input[name="email"]').type(fakeEmail);
      cy.get('input[name="password"]').should('be.visible');
    cy.get('input[name="password"]').type(fakePassword);
          cy.get('input[name="confirmPassword"]').should('be.visible');
     cy.get('input[name="confirmPassword"]').type(fakePassword);
    // Add more test steps as needed
    cy.get('input[type="checkbox"]').check({ force: true }).should('be.checked');
     //cy.get('button[type="submit"]').click()

  
  });
});
