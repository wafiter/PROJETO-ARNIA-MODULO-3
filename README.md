API de premiações

Esta é uma API para gerenciamento de usuários, produtos em um sistema de resgate de produtos a troco joias.

Instalação
Para começar, clone este repositório e instale as dependências:

git clone https://github.com/wafiter/PROJETO-ARNIA-MODULO-3
cd PROJETO-ARNIA-MODULO-3
npm install

Uso
A API disponibiliza as seguintes rotas:

1. Cria um novo usuário.

Endpoint: POST /users

Parâmetros:

name (string): Nome do usuário.
email (string): E-mail do usuário.
password (string): Senha do usuário.
photo (arquivo): Foto do usuário (opcional)

Exemplo de uso:

"name": "John Doe"
"email": "johndoe@example.com"
"password": "senha123"
"photo": "caminho/para/foto.jpg"

2. Envio de Joia

Envia uma joia para um usuário. (Rota privada para admin)

Endpoint: POST /send-jew

Parâmetros:

userId (string): ID do usuário.
jewel (string): Nome da joia.
3. Login de Usuário

Loga um usuário no sistema.

Endpoint: POST /login

Parâmetros:

email (string): E-mail do usuário.
password (string): Senha do usuário.

4. Login de Admin

Loga apenas administradores.

Endpoint: POST /login/admin

Parâmetros:

email (string): E-mail do admin.
password (string): Senha do admin.

5. Cadastro de Produtos

Cadastra um produto no banco.

Endpoint: POST /products

Parâmetros:

name (string): Nome do produto.
value (number): Valor do produto.
amount (number): Quantidade disponível do produto.
description (string): Descrição do produto.
photo (string): Caminho da foto do produto.

6. Edição de Produto

Edita um produto existente.

Endpoint: POST /edit-product

Parâmetros:

_id (string): ID do produto existente.
name (string): Novo nome do produto.
value (number): Novo valor do produto.
amount (number): Nova quantidade disponível do produto.
description (string): Nova descrição do produto.
photo (string): Novo caminho da foto do produto.

7. Resgatar um Produto

Usuário resgata um produto, se tiver saldo suficiente.

Endpoint: POST /reedem

Parâmetros:

productId (string): ID do produto.
price (number): Preço do produto.

8. Lista Todos Produtos
Lista todos os produtos.

Endpoint: GET /product-list

9. Retornar um Produto Específico
Retorna um produto específico.

Endpoint: GET /product/:productId

10. Retorna Usuário Logado

Retorna o usuário logado.

Endpoint: GET /me
Autor
Criado por Wafiter Venancio.