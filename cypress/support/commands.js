// cypress/support/commands.js

Cypress.Commands.add('createUserViaUI', (username, password) => {
  cy.visit('https://demoqa.com/register');
  //cy.contains('New User').click();

  cy.get('#firstname').type('Teste');
  cy.get('#lastname').type('Automatizado');
  cy.get('#userName').type(username);
  cy.get('#password').type(password);

  cy.log('⚠️ Aguarde a resolução manual do CAPTCHA antes de clicar em "Register"');
  cy.wait(20000); // aguarda até que o CAPTCHA seja resolvido manualmente

  cy.get('#register').click();
});

Cypress.Commands.add('createUserViaAPI', (username, password) => {
  return cy.request({
    method: 'POST',
    url: 'https://demoqa.com/Account/v1/User',
    body: {
      userName: username,
      password: password
    },
    failOnStatusCode: false // evita falha automática em caso de erro 4xx/5xx
  });
});

Cypress.Commands.add('loginViaUI', (username, password) => {
  cy.visit('https://demoqa.com/login');

  cy.get('#userName').type(username);
  cy.get('#password').type(password);
  cy.get('#login').click();
});

Cypress.Commands.add('loginViaAPI', (username, password) => {
  return cy.request({
    method: 'POST',
    url: 'https://demoqa.com/Account/v1/GenerateToken',
    body: {
      userName: username,
      password: password
    }
  });
});


  