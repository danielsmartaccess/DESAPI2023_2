// Importando as bibliotecas necessárias.
const errors = require("restify-errors");

// Exportando uma função que aceita o servidor e o cliente knex como argumentos.
module.exports = (servidor, knex) => {
    
    // Endpoint para obter todos os produtos.
    servidor.get('/produtos', (req, res, next) => {
        
        // Utilizando knex para selecionar todos os registros da tabela 'produtos'.
        knex('produtos').then((dados) => {
            res.send(dados);  // Envia os dados obtidos como resposta.
        }, next)
        .catch(error => {
            res.send(new errors.InternalError(error.message));
        });
    });

    // Endpoint para obter um produto específico por ID.
    servidor.get('/produtos/:id', (req, res, next) => {
        const produtoID = req.params.id;  // Obtendo o ID do produto a partir dos parâmetros da requisição.

        // Utilizando knex para selecionar o produto com o ID fornecido.
        knex('produtos')
            .where('id', produtoID)
            .first()
            .then((dados) => {
                if(!dados) {
                    // Se não for encontrado um produto com o ID fornecido, retorna um erro.
                    return res.send(new errors.BadRequestError('Produto não encontrado'));
                }
                res.send(dados);  // Envia os dados do produto como resposta.
            }, next)
            .catch(error => {
                res.send(new errors.InternalError(error.message));
            });
    });

    // Endpoint para adicionar um novo produto.
    servidor.post('/produtos', (req, res, next) => {
        
        // Utilizando knex para inserir um novo registro na tabela 'produtos' com os dados da requisição.
        knex('produtos')
            .insert(req.body)
            .then((dados) => {
                res.send(dados);  // Envia os dados do produto inserido como resposta.
            }, next)
            .catch(error => {
                res.send(new errors.InternalError(error.message));
            });
    });

    // Endpoint para atualizar um produto específico por ID.
    servidor.put('/produtos/:id', (req, res, next) => {
        const produtoID = req.params.id;

        // Utilizando knex para atualizar o registro do produto com o ID fornecido.
        knex('produtos')
            .where('id', produtoID)
            .update(req.body)
            .then((dados) => {
                if(!dados) {
                    return res.send(new errors.BadRequestError('Produto não encontrado'));
                }
                res.send('Produto atualizado com sucesso.');
            }, next)
            .catch(error => {
                res.send(new errors.InternalError(error.message));
            });
    });

    // Endpoint para excluir um produto específico por ID.
    servidor.del('/produtos/:id', (req, res, next) => {
        const produtoID = req.params.id;

        // Utilizando knex para deletar o registro do produto com o ID fornecido.
        knex('produtos')
            .where('id', produtoID)
            .delete()
            .then((dados) => {
                if(!dados) {
                    return res.send(new errors.BadRequestError('Produto não encontrado'));
                }
                res.send('Produto deletado com sucesso.');
            }, next)
            .catch(error => {
                res.send(new errors.InternalError(error.message));
            });
    });

};
