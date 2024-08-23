/// <reference types="cypress" />

describe("Franchise", () => {
  beforeEach(() => {
    cy.on("uncaught:exception", (err) => {
      if (err.message.includes("The user is not authenticated")) {
        return false; // Ignora o erro e continua o teste
      }
      return true; // Permite que outros erros sejam lançados
    });
    cy.visit("http://franqueadora.localhost:5173/");
    cy.get("[data-testid=username]").type("leoaraujo");
    cy.get("[data-testid=password]").type("Abc123@@");
    cy.get("[data-testid=login]").click();
  });

  //   it("should search for a franchise", () => {
  //     cy.get("[data-testid=search]").type("Franquinha");
  //     cy.get("[data-testid=Franquia]").should("exist");
  //   });

  it("shoud create a new franchise", () => {
    cy.get("[data-testid=create]").click();
    cy.get("[data-testid=cnpj]")
      .type("26171237000129")
      .then(() => cy.wait(2000));
    cy.get("[data-testid=franchise_name]").clear().type("Franquia teste");
    cy.get("[data-testid=company_name]").clear().type("Franquia teste");
    cy.get("[data-testid=state_registration]").clear().type("123456789");
    cy.get("[data-testid=cep]").clear().type("85813410");
    cy.get("[data-testid=number]").clear().type("210");
    cy.get("[data-testid=complement]").clear().type("teste");

    cy.get("[data-testid=area_codes]").select("15");
    cy.get("data-testid=counties").select("Cascavel");
    cy.get("data-testid=modules").select("Fichas");
  });
});
