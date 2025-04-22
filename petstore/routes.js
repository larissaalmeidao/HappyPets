import express from 'express'
import authRoutes from './routes/authroutes.js'
import agendRoutes from './routes/agendRoutes.js'

const router = express.Router()
router.use(authRoutes)
router.use(agendRoutes)


export default router