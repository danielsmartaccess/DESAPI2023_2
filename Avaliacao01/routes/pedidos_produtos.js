// Importando as bibliotecas necessárias.
const errors = require("restify-errors");

// Exportando uma função que aceita o servidor e o cliente knex como argumentos.
module.exports = (servidor, knex) => {
    
    // Endpoint para obter todos os produtos de um determinado pedido.
    servidor.get('/pedidos/:pedido_id/produtos', (req, res, next) => {
        
        const pedidoID = req.params.pedido_id;  // Obtendo o ID do pedido a partir dos parâmetros da requisição.

        // Utilizando knex para selecionar todos os registros da tabela 'pedidos_produtos' associados ao pedidoID.
        knex('pedidos_produtos')
            .where('pedido_id', pedidoID)
            .then((dados) => {
                res.send(dados);  // Envia os dados obtidos como resposta.
            }, next)
            .catch(error => {
                res.send(new errors.InternalError(error.message));
            });
    });

    // Endpoint para adicionar um produto a um pedido.
    servidor.post('/pedidos/:pedido_id/produtos', (req, res, next) => {
        
        const pedidoID = req.params.pedido_id;  // Obtendo o ID do pedido a partir dos parâmetros da requisição.

        // Criando um objeto com as informações do produto e do pedido.
        let produtoPedido = {
            pedido_id: pedidoID,
            produto_id: req.body.produto_id,
            preco: req.body.preco,
            quantidade: req.body.quantidade
        };

        // Utilizando knex para inserir um novo registro na tabela 'pedidos_produtos'.
        knex('pedidos_produtos')
            .insert(produtoPedido)
            .then((dados) => {
                res.send(dados);  // Envia os dados do produto inserido no pedido como resposta.
            }, next)
            .catch(error => {
                res.send(new errors.InternalError(error.message));
            });
    });

    // Endpoint para atualizar a quantidade ou o preço de um produto em um pedido específico.
    servidor.put('/pedidos/:pedido_id/produtos/:produto_id', (req, res, next) => {
        
        const pedidoID = req.params.pedido_id;
        const produtoID = req.params.produto_id;

        // Utilizando knex para atualizar o registro na tabela 'pedidos_produtos' associado ao produtoID e pedidoID.
        knex('pedidos_produtos')
            .where({
                pedido_id: pedidoID,
                produto_id: produtoID
            })
            .update(req.body)
            .then((dados) => {
                if(!dados) {
                    return res.send(new errors.BadRequestError('Produto não encontrado no pedido especificado.'));
                }
                res.send('Produto no pedido atualizado com sucesso.');
            }, next)
            .catch(error => {
                res.send(new errors.InternalError(error.message));
            });
    });

    // Endpoint para remover um produto de um pedido.
    servidor.del('/pedidos/:pedido_id/produtos/:produto_id', (req, res, next) => {
        
        const pedidoID = req.params.pedido_id;
        const produtoID = req.params.produto_id;

        // Utilizando knex para remover o registro na tabela 'pedidos_produtos' associado ao produtoID e pedidoID.
        knex('pedidos_produtos')
            .where({
                pedido_id: pedidoID,
                produto_id: produtoID
            })
            .delete()
            .then((dados) => {
                if(!dados) {
                    return res.send(new errors.BadRequestError('Produto não encontrado no pedido especificado.'));
                }
                res.send('Produto removido do pedido com sucesso.');
            }, next)
            .catch(error => {
                res.send(new errors.InternalError(error.message));
            });
    });
};
