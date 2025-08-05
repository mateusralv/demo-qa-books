describe('Criar usuário pela API com Cypress.Commands', () => {
    const username = `usuario_api_${Date.now()}`;
    const password = 'Teste@12345';
  
    it('Deve criar um usuário via API e retornar os dados', () => {
      cy.createUserViaAPI(username, password).then((response) => {
        // Verifica status
        expect(response.status).to.eq(201);
  
        // Exibe dados no log
        cy.log(`userID: ${response.body.userID}`);
        cy.log(`username: ${response.body.username}`);
  
        // Verificações
        expect(response.body).to.have.property('userID');
        expect(response.body).to.have.property('username', username);
      });
    });
  });
  