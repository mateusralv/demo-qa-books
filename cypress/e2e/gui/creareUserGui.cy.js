describe('Criar usuário com comando customizado', () => {
  Cypress.on('uncaught:exception', () => false); // ignora erros de scripts externos

  const username = `usuario_comando_${Date.now()}`;
  const password = 'Teste@12345';

  it('Deve criar um usuário novo pela interface', () => {
    cy.createUserViaUI(username, password);
  });
});

