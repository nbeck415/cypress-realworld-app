import { User } from "models";
const userId = Cypress._.random(1000, 9999);
describe("Create new user", function () {
  beforeEach(function () {
    //console.log(process.env.SHIPYARD_DOMAIN_FRONTEND)
    const urlToVisit = "/signup";
    cy.visit(urlToVisit);
    cy.url().then((url) => {
      cy.log(`Current URL: ${url}`);
    });
    //cy.task("db:seed");
  });
  // go to sign up page and register
  it("should create a new user", function () {
    //cy.visit('/signup')
    const username = `user${userId}`;
    const firstName = `Name${userId}`
    const lastName = `T${userId}`
    cy.get("input[name='username']").type(username);
    cy.get("input[name='firstName']").type(firstName);
    cy.get("input[name='lastName']").type(lastName);
    // only field that really matters is username because uses ID
    // maybe we track user by the auto assigned ID instead of username?
    cy.get("input[name='password']").type("testingPwd");
    cy.get("input[name='confirmPassword']").type("testingPwd");

    // add user to db
    cy.get("button[type='submit']").click();

  });
});

describe("Login as new user", function () {
  it("should log in as the user we just created", function () {
    cy.visit('/');
    const username = `user${userId}`;
    const password = "testingPwd";
    cy.get("input[name='username']").type(username);
    cy.get("input[name='password']").type(password);
    cy.get("button[type='submit']").click();
  });
});

describe("Initialize user", function() {
  beforeEach(function () {
    cy.visit('/signup');
    const username = `user${userId}`;
    const firstName = `Name${userId}`
    const lastName = `T${userId}`
    cy.get("input[name='username']").type(username);
    cy.get("input[name='firstName']").type(firstName);
    cy.get("input[name='lastName']").type(lastName);
    // only field that really matters is username because uses ID
    // maybe we track user by the auto assigned ID instead of username?
    cy.get("input[name='password']").type("testingPwd");
    cy.get("input[name='confirmPassword']").type("testingPwd");

    // add user to db
    cy.get("button[type='submit']").click();

    cy.visit('/');
    const password = "testingPwd";
    cy.get("input[name='username']").type(username);
    cy.get("input[name='password']").type(password);
    cy.get("button[type='submit']").click();
  });
  it("should register user for a bank account", function() {
    cy.contains('button', 'Next').click();
    cy.get("input[name='bankName']").type("US Bank");
    cy.get("input[name='routingNumber']").type("987123745");
    cy.get("input[name='accountNumber']").type("112987234");
    cy.get("button[type='submit']").click();
    cy.contains('button', 'Done').click();

  });
  it("should edit a user's information", function () {
    cy.wait(2000);
    cy.getBySel("sidenav-user-settings").click();
    cy.wait(2000);
    cy.get("input[name='email']").should('have.value', '');
    cy.get("input[name='email']").type("email@gmail.com");
  });
});