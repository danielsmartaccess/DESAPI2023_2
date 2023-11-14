// Importando as bibliotecas necessárias.
const errors = require("restify-errors");

// Exportando uma função que aceita o servidor e o cliente knex como argumentos.
module.exports = (servidor, knex) => {
    
    // Endpoint para obter todos os pedidos.
    servidor.get('/pedidos', (req, res, next) => {
        
        // Utilizando knex para selecionar todos os registros da tabela 'pedidos'.
        knex('pedidos').then((dados) => {
            res.send(dados);  // Envia os dados obtidos como resposta.
        }, next)
        .catch(error => {
            res.send(new errors.InternalError(error.message));
        });
    });

    // Endpoint para obter um pedido específico por ID.
    servidor.get('/pedidos/:id', (req, res, next) => {
        const pedidoID = req.params.id;  // Obtendo o ID do pedido a partir dos parâmetros da requisição.

        // Utilizando knex para selecionar o pedido com o ID fornecido.
        knex('pedidos')
            .where('id', pedidoID)
            .first()
            .then((dados) => {
                if(!dados) {
                    // Se não for encontrado um pedido com o ID fornecido, retorna um erro.
                    return res.send(new errors.BadRequestError('Pedido não encontrado'));
                }
                res.send(dados);  // Envia os dados do pedido como resposta.
            }, next)
            .catch(error => {
                res.send(new errors.InternalError(error.message));
            });
    });

    // Endpoint para adicionar um novo pedido.
    servidor.post('/pedidos', (req, res, next) => {
        
        // Utilizando knex para inserir um novo registro na tabela 'pedidos' com os dados da requisição.
        knex('pedidos')
            .insert(req.body)
            .then((dados) => {
                res.send(dados);  // Envia os dados do pedido inserido como resposta.
            }, next)
            .catch(error => {
                res.send(new errors.InternalError(error.message));
            });
    });

    // Endpoint para atualizar um pedido específico por ID.
    servidor.put('/pedidos/:id', (req, res, next) => {
        const pedidoID = req.params.id;

        // Utilizando knex para atualizar o registro do pedido com o ID fornecido.
        knex('pedidos')
            .where('id', pedidoID)
            .update(req.body)
            .then((dados) => {
                if(!dados) {
                    return res.send(new errors.BadRequestError('Pedido não encontrado'));
                }
                res.send('Pedido atualizado com sucesso.');
            }, next)
            .catch(error => {
                res.send(new errors.InternalError(error.message));
            });
    });

    // Endpoint para excluir um pedido específico por ID.
    servidor.del('/pedidos/:id', (req, res, next) => {
        // Em vez de deletar o pedido, retornamos uma mensagem informando que pedidos não podem ser deletados.
        return res.send('Pedidos não podem ser deletados.');
    });
};
