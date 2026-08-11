import { Router } from 'express'
import healthRoutes from './health.routes.js'
import formRoutes from './form.routes.js'

const router = Router()

router.use('/health', healthRoutes)
router.use('/', formRoutes)

export default router
