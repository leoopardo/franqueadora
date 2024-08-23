/// <reference types="cypress" />

describe("Login", () => {
  beforeEach(() => {
    cy.visit("http://franqueadora.localhost:5173/");
  });

  it("should login whent correct user and password", () => {
    cy.on("uncaught:exception", (err) => {
      if (err.message.includes("The user is not authenticated")) {
        return false; // Ignora o erro e continua o teste
      }
      return true; // Permite que outros erros sejam lançados
    });

    cy.get("[data-testid=username]").type("leoaraujo");
    cy.get("[data-testid=password]").type("Abc123@@");
    cy.get("[data-testid=login]").click();

    cy.url().should("eq", "http://franqueadora.localhost:5173/franquias");
  });

  it("should not login when incorrect user and password", () => {
    cy.on("uncaught:exception", (err) => {
        if (err.message.includes("The user is not authenticated")) {
          return false; // Ignora o erro e continua o teste
        }
        return true; // Permite que outros erros sejam lançados
      });

    cy.get("[data-testid=username]").type("leoaraujo");
    cy.get("[data-testid=password]").type("Abc123@");
    cy.get("[data-testid=login]").click();

    cy.get("[id=PASSWORD_help]").should("exist");

  })
});
