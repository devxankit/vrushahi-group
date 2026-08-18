import { Router } from 'express'
import healthRoutes from './health.routes.js'
import authRoutes from './auth.routes.js'
import unitsRoutes from './units.routes.js'
import submissionsRoutes from './submissions.routes.js'
import settingsRoutes from './settings.routes.js'

const router = Router()

router.use('/health', healthRoutes)
router.use('/auth', authRoutes)
router.use('/units', unitsRoutes)
router.use('/submissions', submissionsRoutes)
router.use('/settings', settingsRoutes)

export default router
