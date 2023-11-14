// Importando as bibliotecas necessárias.
const errors = require("restify-errors");

// Exportando uma função que aceita o servidor e o cliente knex como argumentos.
module.exports = (servidor, knex) => {
    
    // Endpoint para obter todas as categorias.
    servidor.get('/categorias', (req, res, next) => {
        
        // Utilizando knex para selecionar todos os registros da tabela 'categorias'.
        knex('categorias').then((dados) => {
            res.send(dados);  // Envia os dados obtidos como resposta.
        }, next)
        .catch(error => {
            res.send(new errors.InternalError(error.message));
        });
    });

    // Endpoint para obter uma categoria específica por ID.
    servidor.get('/categorias/:id', (req, res, next) => {
        const categoriaID = req.params.id;  // Obtendo o ID da categoria a partir dos parâmetros da requisição.

        // Utilizando knex para selecionar a categoria com o ID fornecido.
        knex('categorias')
            .where('id', categoriaID)
            .first()
            .then((dados) => {
                if(!dados) {
                    // Se não for encontrada uma categoria com o ID fornecido, retorna um erro.
                    return res.send(new errors.BadRequestError('Categoria não encontrada'));
                }
                res.send(dados);  // Envia os dados da categoria como resposta.
            }, next)
            .catch(error => {
                res.send(new errors.InternalError(error.message));
            });
    });

    // Endpoint para adicionar uma nova categoria.
    servidor.post('/categorias', (req, res, next) => {
        
        // Utilizando knex para inserir um novo registro na tabela 'categorias' com os dados da requisição.
        knex('categorias')
            .insert(req.body)
            .then((dados) => {
                res.send(dados);  // Envia os dados da categoria inserida como resposta.
            }, next)
            .catch(error => {
                res.send(new errors.InternalError(error.message));
            });
    });

    // Endpoint para atualizar uma categoria específica por ID.
    servidor.put('/categorias/:id', (req, res, next) => {
        const categoriaID = req.params.id;

        // Utilizando knex para atualizar o registro da categoria com o ID fornecido.
        knex('categorias')
            .where('id', categoriaID)
            .update(req.body)
            .then((dados) => {
                if(!dados) {
                    return res.send(new errors.BadRequestError('Categoria não encontrada'));
                }
                res.send('Categoria atualizada com sucesso.');
            }, next)
            .catch(error => {
                res.send(new errors.InternalError(error.message));
            });
    });

    // Endpoint para excluir uma categoria específica por ID.
    servidor.del('/categorias/:id', (req, res, next) => {
        const categoriaID = req.params.id;

        // Utilizando knex para deletar o registro da categoria com o ID fornecido.
        knex('categorias')
            .where('id', categoriaID)
            .delete()
            .then((dados) => {
                if(!dados) {
                    return res.send(new errors.BadRequestError('Categoria não encontrada'));
                }
                res.send('Categoria deletada com sucesso.');
            }, next)
            .catch(error => {
                res.send(new errors.InternalError(error.message));
            });
    });

};
