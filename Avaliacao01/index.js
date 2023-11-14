const restify = require("restify");
const errors = require("restify-errors");

const servidor = restify.createServer({
    name: 'loja_avaliacao',
    version: '1.0.0'
});

servidor.use(restify.plugins.acceptParser(servidor.acceptable));
servidor.use(restify.plugins.queryParser());
servidor.use(restify.plugins.bodyParser());

// Configuração do banco de dados
const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'loja_avaliacao'
    }
});

// Importação das rotas
require('./routes/cidades')(servidor, knex);
require('./routes/clientes')(servidor, knex);
require('./routes/categorias')(servidor, knex);
require('./routes/produtos')(servidor, knex);
require('./routes/pedidos')(servidor, knex);
require('./routes/pedidos_produtos')(servidor, knex);

// Rota inicial
servidor.get('/', (req, res, next) => {
    res.send('Bem-vindo(a) à API Loja Avaliação!');
});

// Iniciando o servidor
servidor.listen(8001, function() {
    console.log("%s executando em %s", servidor.name, servidor.url);
});
