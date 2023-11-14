// Importando bibliotecas necessárias.
const errors = require("restify-errors");

// Exportando uma função que aceita o servidor e o cliente knex.
module.exports = (servidor, knex) => {

    // Rota GET para obter todas as cidades.
    servidor.get('/cidades', (req, res, next) => {
        knex('cidades').then(dados => {
            res.send(dados);
        }).catch(err => {
            return next(new errors.InternalServerError(err));
        });
    });

    // Rota GET para obter uma cidade específica pelo ID.
    servidor.get('/cidades/:id', (req, res, next) => {
        const { id } = req.params;

        knex('cidades').where('id', id).first().then(dado => {
            if(!dado) {
                return next(new errors.NotFoundError('Cidade não encontrada'));
            }
            res.send(dado);
        }).catch(err => {
            return next(new errors.InternalServerError(err));
        });
    });

    // Rota POST para adicionar uma nova cidade.
    servidor.post('/cidades', (req, res, next) => {
        const { nome } = req.body;

        if(!nome) {
            return next(new errors.BadRequestError('Nome é obrigatório'));
        }

        knex('cidades').insert({ nome }).then(dado => {
            res.send(dado);
        }).catch(err => {
            return next(new errors.InternalServerError(err));
        });
    });

    // Rota PUT para atualizar uma cidade existente pelo ID.
    servidor.put('/cidades/:id', (req, res, next) => {
        const { id } = req.params;
        const { nome } = req.body;

        if(!nome) {
            return next(new errors.BadRequestError('Nome é obrigatório'));
        }

        knex('cidades').where('id', id).update({ nome }).then(numRowsAffected => {
            if(!numRowsAffected) {
                return next(new errors.NotFoundError('Cidade não encontrada'));
            }
            res.send({ message: 'Cidade atualizada com sucesso!' });
        }).catch(err => {
            return next(new errors.InternalServerError(err));
        });
    });

    // Rota DELETE para remover uma cidade pelo ID.
    servidor.del('/cidades/:id', (req, res, next) => {
        const { id } = req.params;

        knex('cidades').where('id', id).delete().then(numRowsAffected => {
            if(!numRowsAffected) {
                return next(new errors.NotFoundError('Cidade não encontrada'));
            }
            res.send({ message: 'Cidade deletada com sucesso!' });
        }).catch(err => {
            return next(new errors.InternalServerError(err));
        });
    });

};
