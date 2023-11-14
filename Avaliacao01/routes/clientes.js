// Importando bibliotecas necessárias.
const errors = require("restify-errors");

// Exportando uma função que aceita o servidor e o cliente knex como argumentos.
module.exports = (servidor, knex) => {
    
    // Endpoint para obter todos os clientes.
    servidor.get('/clientes', (req, res, next) => {
        
        // Utilizando knex para selecionar todos os registros da tabela 'clientes'.
        knex('clientes').then((dados) => {
            res.send(dados);  // Envia os dados obtidos como resposta.
        }, next)
        .catch(error => {
            res.send(new errors.InternalError(error.message));
        });
    });

    // Endpoint para obter um cliente específico por ID.
    servidor.get('/clientes/:id', (req, res, next) => {
        const clienteID = req.params.id;  // Obtendo o ID do cliente a partir dos parâmetros da requisição.

        // Utilizando knex para selecionar o cliente com o ID fornecido.
        knex('clientes')
            .where('id', clienteID)
            .first()
            .then((dados) => {
                if(!dados) {
                    // Se não for encontrado um cliente com o ID fornecido, retorna um erro.
                    return res.send(new errors.BadRequestError('Cliente não encontrado'));
                }
                res.send(dados);  // Envia os dados do cliente como resposta.
            }, next)
            .catch(error => {
                res.send(new errors.InternalError(error.message));
            });
    });

    // Endpoint para adicionar um novo cliente.
    servidor.post('/clientes', (req, res, next) => {
        
        // Utilizando knex para inserir um novo registro na tabela 'clientes' com os dados da requisição.
        knex('clientes')
            .insert(req.body)
            .then((dados) => {
                res.send(dados);  // Envia os dados do cliente inserido como resposta.
            }, next)
            .catch(error => {
                res.send(new errors.InternalError(error.message));
            });
    });

    // Endpoint para atualizar um cliente específico por ID.
    servidor.put('/clientes/:id', (req, res, next) => {
        const clienteID = req.params.id;

        // Utilizando knex para atualizar o registro do cliente com o ID fornecido.
        knex('clientes')
            .where('id', clienteID)
            .update(req.body)
            .then((dados) => {
                if(!dados) {
                    return res.send(new errors.BadRequestError('Cliente não encontrado'));
                }
                res.send('Cliente atualizado com sucesso.');
            }, next)
            .catch(error => {
                res.send(new errors.InternalError(error.message));
            });
    });

    // Endpoint para excluir um cliente específico por ID.
    servidor.del('/clientes/:id', (req, res, next) => {
        const clienteID = req.params.id;

        // Utilizando knex para deletar o registro do cliente com o ID fornecido.
        knex('clientes')
            .where('id', clienteID)
            .delete()
            .then((dados) => {
                if(!dados) {
                    return res.send(new errors.BadRequestError('Cliente não encontrado'));
                }
                res.send('Cliente deletado com sucesso.');
            }, next)
            .catch(error => {
                res.send(new errors.InternalError(error.message));
            });
    });

};
