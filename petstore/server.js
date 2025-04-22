import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import routes from './routes.js'
import session from 'express-session';




dotenv.config()
const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.use(express.urlencoded({ extended: true })) // importante para formulário tradicional

app.use(express.static('public'))

app.use('/uploads', express.static('uploads'))

app.use(session({
    secret: 'seuSegredoSecreto',
    resave: false,
    saveUninitialized: true
}));

app.use('/api', routes)



app.listen(port, ()=>{
    console.log(`Servidor rodando em: http://localhost:${port}`)
})