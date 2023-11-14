express = require('express');
http = require('http');
app = express();

produtos = ['Coca-Cola', 'Pepsi']

app.get('/', (req, res) => {
    res.status(200).send('Bem vindo ao API REST');
});

app.get('/produtos', (req, res) => {
    res.status(200).send(produtos);
});

app.get('/produtos/:posicao', (req, res) => {
    index = parseInt(req.params.posicao) -1;
    res.status(200).send(produtos[index]);
});

app.post('/produtos', (req, res) => {
    nome = "Pord_"  + produtos.length;
    produtos.push(nome);  
    res.status(200).send("Produto " + nome + " adicionado com sucesso");
});

app.delete('/produtos/:posicao', (req, res) => {
    index = parseInt(req.params.posicao) -1;
    produtos.splice(index, 1);
    res.status(200).send("Produto removido com sucesso");
});


http.createServer(app).listen(8001, () => {
    console.log('Servidor iniciado em localhost:8001');
});