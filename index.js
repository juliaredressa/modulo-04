//modulo 4 deverá acrescentar duas novas funcionalidades ao nosso projeto
//exibir a data do ultimo acesso do usuario. (cookies)
//autenticar o usuario para controlar o acesso aos recursos da aplicação. (sessão)

import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import session from 'express-session';

const porta = 3000;
const host = 'localhost';
var listaUsuarios = [];

function processaCadastroUsuario(requisicao, resposta){
    //extrair os dados do corpo da requisição, além de validar os dados
    const dados = requisicao.body
    let conteudoDaResposta = '';
    //é necessario validar os dados antes de serem enviados
    //a validação dos dados é de responsabilidade da aplicação servidor
    if(!(dados.nome && dados.preco && dados.codigo && dados.descricao && dados.categoria)) {
      //estão faltando dados dos usuarios
    conteudoDaResposta  = `
    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <title>Cadastro</title>
    </head>
    <body>
    <div class="container">
        <form action='/cadastraUsuario' method='POST' class="row g-3 needs-validation" novalidate>
            <fieldset class="border p-2">
            <legend class="mb-3">Cadastro de produtos</legend>
            <div class="col-md-4">
              <label for="nome" class="form-label">Nome</label>
              <input type="text" class="form-control" id="nome" name="nome" value="${dados.nome}" required>
            </div>
    `;
      if(!dados.nome){
        conteudoDaResposta += `
        <div>
          <p class="text-danger">Por favor, informe o nome!</p>
        </div>`}
    conteudoDaResposta +=`
    <div class="col-md-4">
      <label for="preco" class="form-label">Preço</label>
      <input type="text" class="form-control" id="preco" name="preco" value="${dados.preco}" required>
    </div>`;
      if(!dados.preco){
        conteudoDaResposta += `
        <div>
          <p class="text-danger">Por favor, informe o preço!</p>
        </div>`;}
    conteudoDaResposta += `
    <div class="col-md-4">
      <label for="codigo" class="form-label">Codigo</label>
        <div class="input-group has-validation">
        <input type="text" class="form-control" id="codigo" name="codigo" aria-describedby="inputGroupPrepend" value="${dados.codigo}" required>
        </div>
    </div>`;
      if(!dados.codigo){
        conteudoDaResposta += `
        <div>
          <p class="text-danger">Por favor, informe o código!</p>
        </div>`;}
    conteudoDaResposta += `
    <div class="col-md-6">
      <label for="descricao" class="form-label">Descrição</label>
      <input type="text" class="form-control" id="descricao" name="descricao" value="${dados.descricao}" required>
    </div>`;
        if(!dados.descricao){
          conteudoDaResposta += `
          <div>
            <p class="text-danger">Por favor, informe a descrição!</p>
          </div>`;}
    conteudoDaResposta += `
    <div class="col-md-3">
    <label for="categoria" class="form-label">Categoria</label>
    <select class="form-select" id="categoria" name="categoria" value="${dados.categoria}">
      <option selected disabled value="">Escolha um produto...</option>
      <option value="Padaria">Padaria</option>
      <option value="Carnes">Carnes</option>
      <option value="Mercearia">Mercearia</option>
      <option value="Matinais">Matinais</option>
      <option value="Frios">Frios</option>
      <option value="Laticínios">Laticínios</option>
      <option value="Bebidas">Bebidas</option>
      <option value="Ultidades domesticas">Ultidades domesticas</option>
      <option value="Limpeza">Limpeza</option>
      <option value="Higiene">Higiene</option>
      <option value="Hortifruti">Horti-fruti</option>
      <option value="Não Listado">Não listado</option>
    </select>
  </div>`;
        if(!dados.categoria){
          conteudoDaResposta += `
          <div>
            <p class="text-danger">Por favor, informe o categoria!</p>
          </div>`;}
    conteudoDaResposta += `
        <div class="col-12 mt-2">
          <button class="btn btn-primary" type="submit" >Cadastrar</button>
          </div>
          </form>
          </fieldset>
          </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous">
    </script>   
    </body>
    </html>`;
    resposta.end(conteudoDaResposta);
      }
    
    else{
    const usuario = {
                nome : dados.nome,
                preco : dados.preco,
                codigo : dados.codigo,
                descricao : dados.descricao,
                categoria : dados.categoria
                }
    //adicionar um novo usuario na lista de usuarios já cadastrados
    listaUsuarios.push(usuario);
    //retornar lista de usuarios
    
     conteudoDaResposta = `
                <!DOCTYPE html>
                <meta charset="UTF-8">
                <html lang="pt-br">
                <head>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
                <title>Menu do sistema</title>
                </head>
                <body>
                    <h1>Lista de usuarios cadastrados</h1>
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Preço</th>
                                <th>Codigo</th>
                                <th>Descrição</th>
                                <th>Categoria</th>
                            </tr>
                        </thead>
                        <tbody>`;
        
        for (const usuario of listaUsuarios){
            conteudoDaResposta += `
                                    <tr>
                                        <td>${usuario.nome}</td>
                                        <td>${usuario.preco}</td>
                                        <td>${usuario.codigo}</td>
                                        <td>${usuario.descricao}</td>
                                        <td>${usuario.categoria}</td>
                                    </tr>
                                `;
        }

        conteudoDaResposta+=`
                                </tbody>
                            </table>
                            <a class="btn btn-primary" href="/" role="button">Voltar ao menu</a>
                            <a class="btn btn-primary" href="/cadastraUsuario.html" role="button">Continuar cadastrando</a>

                            </body>
                            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous">
                            </script>
                            <html>
                            `
    resposta.end(conteudoDaResposta);
 //fim do if/else 
}}


//pseudo middleware
function autenticar(requisicao, resposta, next){
    if(requisicao.session.usuarioAutenticado){
        next();
    }
    else{
      resposta.redirect("/login.html");
    }
}

const app = express();
//ativando a funcionalidade de manipular cookies
app.use(cookieParser());

//adicionar uma nova capacidade para essa aplicação: Memorizar com quem o servidor está falando
//durante o uso do sistema, a aplicação saberá, dentro de uma sessão valida, com quem ela se comunica.
app.use(session({
    secret: "M1nH4Ch4v3S3cR3t4",
    resave: true, //atualiza a sessão mesmo que não haja alterações a cada requisição.
    saveUninitialized: true,
    cookie: {
      //tempo de vida da sessão
      maxAge: 1000 * 60 * 15 //15 minutos
    }
}));

//ativar a extenção que manipula exibições HTTP
//opção false ativa a extenção querystring
//opção true ativa a extenção qs(manipula objetos (LISTAS, ANINHADOS))
app.use(express.urlencoded({extended: true}));

//indicando para a aplicação como servir arquivos estaticos localizados na pasta 'paginas'
app.use(express.static('./paginas'));

app.get('/', autenticar, (req, res) => {
    const dataUltimoAcesso = req.cookies.DataUltimoAcesso;
    const data = new Date();
    res.cookie("DataUltimoAcesso", data.toLocaleString(), {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true
    });
    res.end(`
            <!DOCTYPE html>
                <html lang="pt-br">
            <head>
                <title>Cadastro de produtos</title>
            </head>
            <body>
                <h1>MENU</h1>
                <ul>
                    <li><a href="/cadastraUsuario.html">Cadastrar produtos</a></li>
                </ul>
            </body>
            <footer>
                <p>Seu ultimo acesso foi em ${dataUltimoAcesso}</p>
            </footer>
            </html>
    `)
})
app.get('/cadastraUsuario.html', (requisicao, resposta) => {
    resposta.end(`
    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
        <title>Cadastro</title>
    </head>
    <body>
        <div class="container">
            <form action='/cadastraUsuario' method='post' class="row g-3 needs-validation" novalidate>
                <fieldset class="border p-2">
                <legend class="mb-3">Cadastro de produtos</legend>
                <div class="col-md-4">
                  <label for="nome" class="form-label">Nome</label>
                  <input type="text" class="form-control" id="nome" name="nome"  required>
                  <div class="valid-feedback">
                    Por favor, informe o nome!
                  </div>
                </div>
    
                <div class="col-md-4">
                  <label for="preco" class="form-label">Preço</label>
                  <input type="text" class="form-control" id="preco" name="preco" required>
                  <div class="valid-feedback">
                    Por favor, informe o preço!
                  </div>
                </div>
    
                <div class="col-md-4">
                  <label for="codigo" class="form-label">Codigo</label>
                  <div class="input-group has-validation">
                    <input type="text" class="form-control" id="codigo" name="codigo" aria-describedby="inputGroupPrepend" required>
                    <div class="invalid-feedback">
                    Por favor, informe o codigo!
                    </div>
                  </div>
                </div>
    
                <div class="col-md-6">
                  <label for="descricao" class="form-label">Descrição</label>
                  <input type="text" class="form-control" id="descricao" name="descricao" required>
                  <div class="invalid-feedback">
                    Por favor, informe a Descrição!
                  </div>
                </div>
    
                <div class="col-md-3">
                  <label for="categoria" class="form-label">Categoria</label>
                  <select class="form-select" id="categoria" name="categoria">
                    <option selected disabled value="">Escolha um produto...</option>
                    <option value="Padaria">Padaria</option>
                    <option value="Carnes">Carnes</option>
                    <option value="Mercearia">Mercearia</option>
                    <option value="Matinais">Matinais</option>
                    <option value="Frios">Frios</option>
                    <option value="Laticínios">Laticínios</option>
                    <option value="Bebidas">Bebidas</option>
                    <option value="Ultidades domesticas">Ultidades domesticas</option>
                    <option value="Limpeza">Limpeza</option>
                    <option value="Higiene">Higiene</option>
                    <option value="Hortifruti">Horti-fruti</option>
                    <option value="Não Listado">Não listado</option>
                  </select>
                  <div class="invalid-feedback">
                    Por favor, informe a categoria!
                  </div>
                </div>
                
                <div class="col-12 mt-2">
                  <button class="btn btn-primary" type="submit" >Cadastrar</button>
                </div>
              </form>
            </fieldset>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous">
        </script>
        <script>
            (function() {
                'use strict'
                var forms = document.querySelectorAll('.needs-validation')
                const form = forms[0];
                form.addEventListener('submit', (event) => {
                    if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                    }
                form.classList.add('was-validated')
                 });
                })();
        </script>
    </body>
    </html>
    `)
})
app.get('/login.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'paginas', 'login.html'));
});

//endopoint login que irá processar o login da aplicação
app.post('/login', (requisicao, resposta)=>{
  const usuario = requisicao.body.usuario;
  const senha = requisicao.body.senha;
  if(usuario && senha && (usuario === 'julia') && (senha === '123')){
    requisicao.session.usuarioAutenticado = true ;
    resposta.redirect('/');
  }
  else{
    resposta.end(`
      <!DOCTYPE html>
        <head>
          <meta charset="UTF-8">
          <title>Falha no Login</title>
        <head>
        <body>
          <h2>Usuario ou senha invalido!</h2>
          <a href="/login.html">Voltar ao Login</a>
        </body>
      </html>`);
  }
});

//rota
app.post('/cadastraUsuario', autenticar, processaCadastroUsuario)
app.listen(porta, host, () => {
    console.log(`Servidor executando na url http://${host}:${porta}`);
});