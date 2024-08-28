
function gerarCNPJ() {
  let n = 9;
  let n1 = Math.floor(Math.random() * n);
  let n2 = Math.floor(Math.random() * n);
  let n3 = Math.floor(Math.random() * n);
  let n4 = Math.floor(Math.random() * n);
  let n5 = Math.floor(Math.random() * n);
  let n6 = Math.floor(Math.random() * n);
  let n7 = Math.floor(Math.random() * n);
  let n8 = Math.floor(Math.random() * n);
  let n9 = 0; 
  let n10 = 0; 
  let n11 = 0; 
  let n12 = 1; 

  let d1 =
    n12 * 2 +
    n11 * 3 +
    n10 * 4 +
    n9 * 5 +
    n8 * 6 +
    n7 * 7 +
    n6 * 8 +
    n5 * 9 +
    n4 * 2 +
    n3 * 3 +
    n2 * 4 +
    n1 * 5;
  d1 = 11 - (d1 % 11);
  if (d1 >= 10) d1 = 0;

  let d2 =
    d1 * 2 +
    n12 * 3 +
    n11 * 4 +
    n10 * 5 +
    n9 * 6 +
    n8 * 7 +
    n7 * 8 +
    n6 * 9 +
    n5 * 2 +
    n4 * 3 +
    n3 * 4 +
    n2 * 5 +
    n1 * 6;
  d2 = 11 - (d2 % 11);
  if (d2 >= 10) d2 = 0;

  return `${n1}${n2}${n3}${n4}${n5}${n6}${n7}${n8}0001${d1}${d2}`;
}

describe("Franchise", () => {
  beforeEach(() => {
    cy.on("uncaught:exception", (err) => {
      if (err.message.includes("The user is not authenticated")) {
        return false; // Ignora o erro e continua o teste
      }
      return true; // Permite que outros erros sejam lançados
    });
    cy.login("leoaraujo", "Abc123@@");
  });

  //   it("should search for a franchise", () => {
  //     cy.get("[data-testid=search]").type("Franquinha");
  //     cy.get("[data-testid=Franquia]").should("exist");
  //   });

  it("shoud create a new franchise", () => {
    cy.get("[data-testid=create]").click();
    cy.get("[data-testid=cnpj]")
      .type(gerarCNPJ())
      .then(() => cy.wait(2000));
    cy.get("[data-testid=franchise_name]").clear().type("Franquia teste");
    cy.get("[data-testid=company_name]").clear().type("Franquia teste");
    cy.get("[data-testid=state_registration]").clear().type("123456789");
    cy.get("[data-testid=cep]").clear().type("85813410");
    cy.get("[data-testid=number]").clear().type("210");
    cy.get("[data-testid=complement]").clear().type("teste");

    cy.get("[data-testid=area_codes_input]").click();
    cy.get('[data-testid="area_codes_dropdown"] [title="11"]').click();

    cy.get("[data-testid=counties_input]")
      .click()
      .then(() => cy.wait(2000));
    cy.get(
      '[data-testid="counties_dropdown"] [title="Abadia Dos Dourados"]'
    ).click();

    cy.get("[data-testid=module_input]").click();
    cy.get(
      '[data-testid="module_dropdown"] [data-testid="module_select_all"]'
    ).click();

    cy.get("[data-testid=next]")
      .click()
      .then(() => cy.wait(1500));

    cy.get("[data-testid=cpf]").type("48822991001");
    cy.get("[data-testid=name]").type("Franquia teste");
    cy.get("[data-testid=email]").type("leo.san9+teste@hotmail.com");
    cy.get("[data-testid=phone]").type("44999999999");
    cy.get("[data-testid=username]").type("franquia_teste");
    cy.get("[data-testid=password]").type("Abc123@@");
    cy.get("[data-testid=confirm_password]").type("Abc123@@");

    cy.get("[data-testid=next]")
      .click()
      .then(() => cy.wait(1500));

    cy.get("[data-testid=enable_fees]").click();

    cy.get("[data-testid=licenses_input]").click();
    cy.get(
      '[data-testid="licenses_dropdown"] [data-testid="licenses_select_all"]'
    ).click();
    cy.get("[data-testid=licenses_input]").click();
    cy.get("[data-testid=licenses_LIVRE]").type("4.99");
    cy.get("[data-testid=licenses_MENSAL]").type("8.99");
    cy.get("[data-testid=licenses_AVULSO]").type("12.99");

    cy.get("[data-testid=next]").click();

    cy.get("[data-testid=success]").should("exists");
  });
});
