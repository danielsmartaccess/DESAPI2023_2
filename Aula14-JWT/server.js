const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const JWT_SECRET = 'your_jwt_secret'; // Mantenha isso seguro e use variáveis de ambiente em produção

// Mock de um banco de dados simples em memória
const users = {
  estudante: { password: "senhaestudante", role: "estudante" },
  professor: { password: "senhaprofessor", role: "professor" },
  cientista: { password: "senhacientista", role: "cientista" },
};

// Rota para autenticar usuário e gerar JWT
app.post('/login', (req, res) => {
  const { user, password } = req.body;
  const userData = users[user];

  if (userData && userData.password === password) {
    const token = jwt.sign(
      {
        user,
        role: userData.role
      },
      JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.send({ token });
  } else {
    res.status(401).send("Credenciais inválidas");
  }
});

// Middleware para verificar JWT
const verifyJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>

  if (!token) return res.status(403).send("Um token é necessário para autenticação");

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send("Token inválido");
  }
};

// Rota protegida para verificar acesso às trilhas
app.get('/trilhas', verifyJWT, (req, res) => {
  const trilhas = {
    estudante: ['Trilha 1', 'Trilha 2'],
    professor: ['Trilha 1', 'Trilha 2', 'Trilha 3'],
    cientista: ['Trilha 1', 'Trilha 2', 'Trilha 3', 'Trilha Especial'],
  };

  const { role } = req.user;
  res.send(trilhas[role]);
});

// Inicie o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
