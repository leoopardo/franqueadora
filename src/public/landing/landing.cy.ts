/// <reference types="cypress" />

describe("Landing", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("should redirect to franchisor", () => {
    cy.on("uncaught:exception", (err) => {
      if (err.message.includes("The user is not authenticated")) {
        return false; // Ignora o erro e continua o teste
      }
      return true; // Permite que outros erros sejam lançados
    });

    cy.get("[data-testid=acessar-painel]").click();
    cy.get("[data-testid=franqueadora]").click();
    cy.origin("http://franqueadora.localhost:5173/", () => {
      cy.url().should("eq", "http://franqueadora.localhost:5173/");
    });
  });

  it("should redirect to franchise", () => {
    cy.on("uncaught:exception", (err) => {
      if (err.message.includes("The user is not authenticated")) {
        return false; // Ignora o erro e continua o teste
      }
      return true; // Permite que outros erros sejam lançados
    });

    cy.get("[data-testid=acessar-painel]").click();
    cy.get("[data-testid=franquia]").click();
    cy.origin("http://franquia.localhost:5173/", () => {
      cy.url().should("eq", "http://franquia.localhost:5173/");
    });
  });

  it("should redirect to promoter", () => {
    cy.on("uncaught:exception", (err) => {
      if (err.message.includes("The user is not authenticated")) {
        return false; // Ignora o erro e continua o teste
      }
      return true; // Permite que outros erros sejam lançados
    });

    cy.get("[data-testid=acessar-painel]").click();
    cy.get("[data-testid=promotor]").click();
    cy.origin("http://promotor.localhost:5173/", () => {
      cy.url().should("eq", "http://promotor.localhost:5173/");
    });
  });

  it("should redirect to client", () => {
    cy.on("uncaught:exception", (err) => {
      if (err.message.includes("The user is not authenticated")) {
        return false; // Ignora o erro e continua o teste
      }
      return true; // Permite que outros erros sejam lançados
    });

    cy.get("[data-testid=acessar-painel]").click();
    cy.get("[data-testid=cliente]").click();
    cy.origin("http://cliente.localhost:5173/", () => {
      cy.url().should("eq", "http://cliente.localhost:5173/");
    });
  });
});
