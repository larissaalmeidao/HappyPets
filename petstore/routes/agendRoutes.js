import express from 'express';
import multer from 'multer';
import db from '../db.js';

const router = express.Router();

// Configuração do Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    }
});

const upload = multer({ storage });

// Rota POST para criar um agendamento
router.post('/agendamentos', upload.single('petImage'), async (req, res) => {
    try {
        const usuarioId = req.session.usuarioId;
        if (!usuarioId) {
            return res.send(`<script>alert("Você precisa estar logado para agendar."); window.location.href = "/login.html";</script>`);
        }

        const { petName, petBreed, serviceType, appointmentDate, appointmentTime, observations } = req.body;
        const petImage = req.file?.filename;

        if (!petImage) {
            return res.status(400).send('Imagem do pet é obrigatória');
        }

        const query = `
            INSERT INTO agendamentos (nome_pet, raca_pet, tipo_servico, data_agendamento, horario_agendamento, imagem_pet, observacoes, usuario_id)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [petName, petBreed, serviceType, appointmentDate, appointmentTime, petImage, observations, usuarioId];

        await db.execute(query, values);

        res.send(`<script>alert("Agendamento realizado com sucesso!"); window.location.href = "/index.html";</script>`);
    } catch (error) {
        console.error('Erro ao realizar agendamento:', error);
        res.status(500).send('Erro ao realizar agendamento');
    }
});

// Rota GET para listar agendamentos de um usuário logado
router.get('/agendamentos', async (req, res) => {
    try {
        const usuarioId = req.session.usuarioId;

        if (!usuarioId) {
            return res.send(`<script>alert("Você precisa estar logado para ver os agendamentos"); window.location.href = "/login.html";</script>`);
        }

        const [agendamentos] = await db.execute('SELECT * FROM agendamentos WHERE usuario_id = ?', [usuarioId]);

        res.send(`
            <!DOCTYPE html>
            <html lang="pt-BR">
            <head>
                <meta charset="UTF-8">
                <title>Meus Agendamentos</title>
            </head>
            <body>
                <h1>Meus Agendamentos</h1>
                <ul>
                    ${agendamentos.map(item => {
                        const data = new Date(item.data_agendamento);
                        const dataFormatada = data.toLocaleDateString('pt-BR');
                        const hora = item.horario_agendamento.slice(0, 5);
                        return `
                            <li>
                                <strong>Pet:</strong> ${item.nome_pet} |
                                <strong>Serviço:</strong> ${item.tipo_servico} |
                                <strong>Data:</strong> ${dataFormatada} |
                                <strong>Horário:</strong> ${hora}
                            </li>
                        `;
                    }).join('')}
                </ul>
                <a href="/index.html">Voltar</a>
            </body>
            </html>
        `);
    } catch (error) {
        console.error('Erro ao buscar agendamentos:', error);
        res.status(500).send('Erro ao buscar agendamentos');
    }
});

export default router;
