import { Router } from 'express'
import healthRoutes from './health.routes.js'

const router = Router()

// Mount feature routers here as the app grows, e.g.:
// router.use('/users', userRoutes)
router.use('/health', healthRoutes)

export default router
