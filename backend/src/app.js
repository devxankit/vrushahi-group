import 'express-async-errors'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import compression from 'compression'
import cookieParser from 'cookie-parser'

import { env, isProduction } from './config/env.js'
import routes from './routes/index.js'
import { notFound } from './middleware/notFound.js'
import { errorHandler } from './middleware/errorHandler.js'

const app = express()

// --- Security & core middleware ---
app.use(helmet())
app.use(
  cors({
    origin: env.clientUrl,
    credentials: true,
  })
)
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(morgan(isProduction ? 'combined' : 'dev'))

// --- Routes ---
app.get('/', (req, res) => {
  res.json({ message: 'API is running' })
})
app.use('/api', routes)

// --- Error handling (must be last) ---
app.use(notFound)
app.use(errorHandler)

export default app
