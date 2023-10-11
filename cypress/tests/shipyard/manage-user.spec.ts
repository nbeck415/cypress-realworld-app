import { User } from "models";
const userId = Cypress._.random(1000, 9999);

before(function() {
  const urlToVisit = "/signup";
  cy.visit(urlToVisit);
});

describe("Create new user", function () {
  // go to sign up page and register
  it("should create a new user", function () {
    const username = `user${userId}`;
    const firstName = `Name${userId}`
    const lastName = `T${userId}`
    cy.get("input[name='username']").type(username);
    cy.get("input[name='firstName']").type(firstName);
    cy.get("input[name='lastName']").type(lastName);
    cy.get("input[name='password']").type("testingPwd");
    cy.get("input[name='confirmPassword']").type("testingPwd");

    // add user to db
    cy.get("button[type='submit']").click();
    cy.wait(2000);
  });
  it("should log in as the user we just created", function () {
    cy.visit('/');
    // use existing creds
    const username = `user${userId}`;
    const password = "testingPwd";
    cy.get("input[name='username']").type(username);
    cy.get("input[name='password']").type(password);
    // click to log in
    cy.get("button[type='submit']").click();
    cy.wait(4000);
    // "onboarding" flow
    cy.contains('button', 'Next').click();
    cy.wait(2000);
    // enter bank info
    cy.get("input[name='bankName']").type("US Bank");
    cy.get("input[name='routingNumber']").type("987123745");
    cy.get("input[name='accountNumber']").type("112987234");
    cy.get("button[type='submit']").click();
    cy.wait(2000);
    // click "done"
    cy.contains('button', 'Done').click();
    cy.wait(2000);
    // go to edit user page
    cy.getBySel("sidenav-user-settings").click();
    cy.wait(2000);
    cy.get("input[name='email']").type("email@gmail.com");
    cy.get("input[name='phoneNumber']").type("4155558912");
    cy.wait(2000);
    // make sure this button is of type "submit"
    cy.contains('Save').should('have.attr', 'type', 'submit');
    cy.wait(2000);
  });
});