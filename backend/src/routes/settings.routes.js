import { Router } from 'express'
import { getSetting, updateSetting, getAllSettings } from '../controllers/settings.controller.js'
import { protectAdmin } from '../middleware/authMiddleware.js'

const router = Router()

// Public
router.get('/:key', getSetting)

// Admin Protected
router.get('/admin/all', protectAdmin, getAllSettings)
router.put('/admin/:key', protectAdmin, updateSetting)

export default router
