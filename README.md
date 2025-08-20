# StoreManager

StoreManager é uma API RESTful desenvolvida para gerenciar produtos e vendas de uma loja. O projeto foi construído utilizando Node.js, Express e MySQL, seguindo boas práticas de desenvolvimento e arquitetura MSC (Model-Service-Controller).

## Sumário

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação](#instalação)
- [Configuração do Banco de Dados](#configuração-do-banco-de-dados)
- [Como Usar](#como-usar)
- [Endpoints](#endpoints)
- [Testes](#testes)

## Sobre o Projeto

O StoreManager permite o cadastro, edição, exclusão e listagem de produtos e vendas. O objetivo é fornecer uma solução simples para o gerenciamento de estoque e vendas de uma loja.

## Tecnologias Utilizadas

- Node.js
- Express
- MySQL
- Mocha, Chai e Sinon (para testes)
- Docker (opcional)

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/StoreManager.git
   cd StoreManager
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

## Configuração do Banco de Dados

1. Certifique-se de ter o MySQL instalado e rodando.
2. Crie o banco de dados utilizando o arquivo `StoreManager.sql` disponível na raiz do projeto:
   ```bash
   mysql -u seu_usuario -p < StoreManager.sql
   ```
3. Configure as variáveis de ambiente no arquivo `.env`:
   ```
   MYSQL_USER=seu_usuario
   MYSQL_PASSWORD=sua_senha
   MYSQL_DATABASE=StoreManager
   MYSQL_HOST=localhost
   ```

## Como Usar

1. Inicie o servidor:
   ```bash
   npm start
   ```
2. Acesse a API em `http://localhost:3000`.

## Endpoints

### Produtos

- `GET /products` - Lista todos os produtos
- `GET /products/:id` - Busca um produto pelo ID
- `POST /products` - Cadastra um novo produto
- `PUT /products/:id` - Atualiza um produto
- `DELETE /products/:id` - Remove um produto

### Vendas

- `GET /sales` - Lista todas as vendas
- `GET /sales/:id` - Busca uma venda pelo ID
- `POST /sales` - Cadastra uma nova venda
- `PUT /sales/:id` - Atualiza uma venda
- `DELETE /sales/:id` - Remove uma venda

## Testes

Para rodar os testes, utilize:

```bash
npm test
```
