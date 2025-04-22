import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db from '../db.js'

const router = express.Router()

//Registro
router.post('/register', async (req, res) => {
    const { username, password, cpf, telefone } = req.body;
    try {
      const [existing] = await db.execute(
        'SELECT * FROM users WHERE username = ?',
        [username]
      );
      if (existing.length > 0) return res.status(400).send('Usuário já existe');
  
      const hashed = await bcrypt.hash(password, 10);
  
      await db.execute(
        'INSERT INTO users (username, password, cpf, telefone) VALUES (?, ?, ?, ?)',
        [username, hashed, cpf, telefone]
      );
  
      res.redirect('/agendamento.html');
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao registrar usuário');
    }
  });

  // Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
      const [users] = await db.execute('SELECT * FROM users WHERE username = ?', [email]);
      const user = users[0];

      if (!user) {
          return res.send(`<script>alert("Usuário não encontrado"); window.location.href = "/login.html";</script>`);
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
          return res.send(`<script>alert("Senha incorreta"); window.location.href = "/login.html";</script>`);
      }

      // Salvar o ID do usuário na sessão
      req.session.usuarioId = user.id;

      res.redirect('/agendamento.html');
  } catch (error) {
      console.error(error);
      res.send(`<script>alert("Erro ao fazer login"); window.location.href = "/login.html";</script>`);
  }
});


// Middleware de autenticação
function authMiddleware(req, res, next) {
    const auth = req.headers.authorization
    if (!auth) return res.status(401).send('Token ausente')

    const token = auth.split(' ')[1]
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch {
        res.status(403).send('Token inválido ou expirado')
    }
}

// Rota privada
router.get('/private', authMiddleware, (req, res) => {
    res.json({ message: `Bem-vindo, ${req.user.username}` })
})

export default router