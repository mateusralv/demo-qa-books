# Book Store Challenge

Este repositório apresenta um estudo voltado para qualidade de software no site [Book Store - DemoQA](https://demoqa.com/books), aplicando práticas de QA em um cenário simulado de desenvolvimento ágil. O objetivo é explorar funcionalidades como:

- Registro de usuário  
- Login com o usuário criado  
- Pesquisa de livros e visualização de detalhes  
- Adição de livros à coleção pessoal  

Além disso, as interações com a [API pública do site](https://demoqa.com/swagger/) são consideradas como parte integrante do processo de testes.


## 📌 Objetivo

Demonstrar como um QA pode abordar o lançamento de novas funcionalidades, definindo regras, criando testes e automatizando validações para garantir qualidade e entregas confiáveis em um ambiente ágil.


## ✅ Escopo e Processo

Considerando a dinâmica de um time ágil, o fluxo proposto envolve:

1. **Levantamento de Regras de Negócio, Critérios de Aceitação e Figmas (caso disponíveis)**  
   - Análise dos requisitos da feature  
   - Entendimento da experiência esperada pelo usuário  

2. **Criação de Cenários de Teste**  
   - Utilização da linguagem Gherkin (Given / When / Then) para documentação de cenários baseados nos critérios de aceitação  

3. **Validação Manual (Staging)**  
   - Execução dos testes manuais no ambiente de staging após a entrega da feature  

4. **Abertura de Bugs**  
   - Criação de relatos de bugs com base em um modelo padronizado contendo:  
     - Título  
     - Descrição  
     - Passos para reproduzir  
     - Resultado esperado vs. resultado atual  
     - Ambiente de teste  
     - Evidências (prints, vídeos, logs)  

5. **Validação Pós-Correção (Round 2)**  
   - Reexecução dos testes após correção dos bugs, garantindo que a entrega esteja estável  

6. **Automação de Testes com Cypress**  
   - Escrita e manutenção de testes automatizados para os principais fluxos da aplicação  
   - Validação de cenários E2E (front)  
   - Cobertura de casos positivos e negativos
---

## 📋 1. Regras de Negócio

### Registro de Usuário
- O usuário deve conseguir criar uma conta com username e senha válidos.
- Após login, o username deve aparecer na tela “Profile”, acima do botão “Log out”.

### Pesquisa de Livros
- Usuário autenticado pode buscar livros pelo campo de busca na tela “Book Store”.
- A busca deve retornar uma lista com livros relacionados ao termo pesquisado.

### Detalhes e Adição à Coleção
- O usuário pode clicar em um livro para acessar sua tela de detalhes.
- É possível adicionar o livro à coleção.
- Após adição, aparece a mensagem “Book added to your collection.”
- O username e as informações do livro devem estar visíveis na coleção.

### Validação via API
- Os pontos citados anteriormente deverão ser validados via API

## 🧪 2. Criação de Cenários de Teste

```gherkin
Feature: Registro e gerenciamento de usuário e livros

  Scenario: Registro de novo usuário com sucesso
    Given o usuário está na tela de registro
    When ele preenche username e senha válidos
    And submete o formulário
    Then deve ver mensagem "Registration successful"
    And pode realizar login com as credenciais criadas
    And após login, username aparece na tela Profile acima do botão Log out

  Scenario: Pesquisa retorna múltiplos resultados
    Given usuário autenticado na tela Book Store
    When pesquisa pelo termo "JavaScript"
    Then vê no mínimo 2 resultados na lista
    // And sistema registra captura de tela da lista com tag {JavaScript}

  Scenario: Adição de livro à coleção
    Given usuário autenticado visualizando resultados da pesquisa "JavaScript"
    When clica em um livro e adiciona à coleção
    Then vê mensagem "Book added to your collection."
    And vê username e dados do livro na coleção
    And sistema registra capturas de tela correspondentes

  Scenario: Validação da coleção com dados da API (Opcional)
    Given usuário adicionou livro à coleção
    When consulta dados via API
    Then dados exibidos na coleção devem coincidir com API
    And sistema registra mensagens de feedback para as comparações
```


## 👨‍💻 3. Validação Manual (Staging)
Validação da funcionalidade em ambiente de staging. Envolve testes manuais exploratórios e direcionados com base nos critérios de aceitação que foram criados anteriormente, buscando garantir que tudo funcione corretamente antes da liberação.

## 🐞 4. Abertura de Bugs

### Exemplo de Template

```markdown
**Título:**  
Breve descrição clara e objetiva do problema.

**Descrição:**  
Detalhes sobre o comportamento inesperado.

**Passos para reproduzir:**  
1. Passo 1  
2. Passo 2  
3. Passo 3  
...

**Resultado esperado:**  
O que deveria acontecer.

**Resultado atual:**  
O que acontece de fato.

**Ambiente de teste:**  
- Navegador: [Nome e versão]  
- Sistema Operacional: [Nome e versão]  
- URL: [Ambiente testado]  
- Versão da aplicação: [Versão]

**Evidências:**  
- Screenshot ou vídeo
- Logs do console
- Resposta da API (se aplicável)
```

### Exemplo Real

```markdown
**Título:** Falha ao exibir username na tela Profile após login

**Descrição:**  
Após registrar e logar com um novo usuário, não é possivel adicionar um livro na coleção

**Passos para reproduzir:**  
1. Acessar /register  
2. Criar usuário válido 
3. Confirmar mensagem de sucesso  
4. Fazer login  
5. Ir para a ([Bookstore](https://demoqa.com/books))
6. Clicar em um livro

**Resultado esperado:**  
Adicionar livro a coleção

**Resultado atual:**  
O site retorna uma tela branca

**Ambiente de teste:**  
- Navegador: Chrome 114  
- Sistema Operacional: MacOS  
- URL: https://demoqa.com/books
- Versão: v1.2.3

**Evidências:**  
- Screenshot da tela Profile mostrando ausência do username.
```

## 🔁 5. Validação Pós-Correção (Round 2)
Após correções dos bugs identificados, essa etapa valida se os problemas foram resolvidos e se não houve regressões. São reexecutados os testes com falha e revisados fluxos impactados, garantindo estabilidade e qualidade da entrega antes da produção.

## 🤖 6. Automação de Testes com Cypress
### 6.1 Estrutura do Projeto

```text
cypress/
├── downloads/                  
├── e2e/                        # Casos de teste end-to-end
│   ├── api/                    # Testes focados em validações diretamente via API
│   │   └── createUserApi.cy.js
│   ├── gui/                    # Testes que interagem com a interface gráfica (UI)
│   │   └── createUserGui.cy.js
│   └── createUserAndLogin.cy.js
├── fixtures/                   
├── screenshots/                # Capturas de tela feitas automaticamente pelo Cypress
├── support/                    # Suporte aos testes (comandos customizados, setup global, etc)
│   ├── commands.js             # Comandos customizados do Cypress (ex: login, criação de dados)
│   └── e2e.js                  
node_modules/                   # Dependências do projeto
cypress.config.js               # Configuração principal do Cypress
package-lock.json               # Lockfile das dependências (npm)
package.json                    # Scripts e dependências do projeto
README.md                       # Documentação do projeto
```

### 6.2 Setup e Execução dos Testes

#### Requisitos
- Node.js >= 14
- NPM ou Yarn
- Navegador Chrome instalado

#### Instalação

```bash
npm install
# ou
yarn install
```

#### Executar testes no modo interativo (Cypress)

```bash
npx cypress open
```

#### Executar testes no modo headless (CI/CD)

```bash
npx cypress run
```

---

## 🧾 Considerações Finais

- Os testes seguem o padrão **BDD (Behavior Driven Development)** com uso de cenários Gherkin para facilitar a compreensão das regras de negócio.
- Capturas de tela são geradas automaticamente em pontos críticos para validação visual e evidência de sucesso.
- A validação de dados via **API** é opcional, mas recomendada para garantir consistência entre front-end e back-end.
- Utilize o modelo de bug report fornecido para documentar falhas de forma clara e rastreável.

---

## 📬 Contato

Para dúvidas, sugestões ou contribuições, entre em contato:  
Criado por **Mateus Silva** 
