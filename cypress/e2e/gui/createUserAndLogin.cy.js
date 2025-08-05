describe('Fluxo completo: Register to Book Store', () => {
    Cypress.on('uncaught:exception', () => false); // ignora erro de scripts externos
  
    const username = `usuario_${Date.now()}`;
    const password = 'Teste@12345';
  
    it('Deve registrar, logar e validar o username no perfil', () => {
      // Etapa 1 - Registro
      cy.createUserViaAPI(username, password);
  
      // Etapa 3 - Ir para login
      cy.visit('https://demoqa.com/login');
  
      // Etapa 4 - Login com o usuário criado
      cy.loginViaUI(username, password);
  
      // Etapa 5 - Verificar se username aparece no perfil
      cy.url().should('include', '/profile');
      cy.get('#userName-value').should('have.text', username);
  
      // Etapa 6 - Captura de tela do perfil com o username
      cy.screenshot(`perfil_${username}`);
  
      cy.log('✅ Screenshot tirado com o username visível na tela de perfil');
    });
  });
  