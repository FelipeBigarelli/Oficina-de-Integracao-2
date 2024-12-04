describe('Form testing', () => {

  describe('Submitting login form with missing fields', () => {
    
    it('Given I am on the authentication page, when I submit the login form with missing fields, I should see an error', () => {
      // Visita a página de autenticação
      cy.visit('/');

      // Acessa o formulário de login
      cy.get('input[placeholder="Email"]').should('be.visible');
      cy.get('input[placeholder="Senha"]').should('be.visible');

      // Tenta submeter o formulário sem preencher os campos
      cy.get('button[type="submit"]').click();

      // Verifica se o erro é mostrado
      // Aqui, você pode adicionar a lógica para verificar se a mensagem de erro aparece
      // Por exemplo, uma mensagem de erro pode ser exibida indicando que os campos estão vazios
      cy.contains('Por favor, preencha todos os campos').should('be.visible');
    });

  });

  describe('Page rendering and navigation between login and signup', () => {

    it('Given I am on the authentication page, when the page loads, the login form should be displayed', () => {
      // Visita a página de autenticação
      cy.visit('/');

      // Verifica se os campos do formulário de login estão visíveis
      cy.get('input[placeholder="Email"]').should('be.visible');
      cy.get('input[placeholder="Senha"]').should('be.visible');
      cy.get('button[type="submit"]').contains('Log In').should('be.visible');

      // Verifica se o botão "Cadastre-se" está visível
      cy.contains('Não tem uma conta?').should('be.visible');
      cy.contains('Cadastre-se').should('be.visible');
    });

    it('Given I am on the authentication page, when I click on "Cadastre-se", the signup form should be displayed', () => {
      // Visita a página de autenticação
      cy.visit('/');

      // Clica no link "Cadastre-se" para exibir o formulário de cadastro
      cy.contains('Cadastre-se').click();

      // Verifica se os campos do formulário de cadastro estão visíveis
      cy.get('input[placeholder="Nome"]').should('be.visible');
      cy.get('input[placeholder="Email"]').should('be.visible');
      cy.get('input[placeholder="RA"]').should('be.visible');
      cy.get('input[placeholder="Senha"]').should('be.visible');
      cy.get('button[type="submit"]').contains('Cadastrar').should('be.visible');

      // Verifica se o botão "Faça login" está visível
      cy.contains('Já tem uma conta?').should('be.visible');
      cy.contains('Faça login').should('be.visible');
    });

    it('Given I am on the authentication page in signup form, when I click on "Faça login", the login form should be displayed', () => {
      cy.visit('/');

      cy.contains('Cadastre-se').click();

      cy.contains('Faça login').click();

      cy.get('input[placeholder="Email"]').should('be.visible');
      cy.get('input[placeholder="Senha"]').should('be.visible');
      cy.get('button[type="submit"]').contains('Log In').should('be.visible');
    });

  });

  it('Given I am on the signup form, when I submit with empty fields, I should see an error message', () => {
    cy.visit('/');
  
    // Clica no link "Cadastre-se" para acessar o formulário de cadastro
    cy.contains('Cadastre-se').click();
  
    // Tenta submeter o formulário de cadastro com campos vazios
    cy.get('button[type="submit"]').contains('Cadastrar').click();
  
    // Verifica se a mensagem de erro é exibida
    cy.contains('Por favor, preencha todos os campos.').should('be.visible');
  });
  
  
});
