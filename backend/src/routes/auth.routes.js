import { Router } from 'express'
import { loginAdmin, getMe, updateProfile, changePassword } from '../controllers/auth.controller.js'
import { protectAdmin } from '../middleware/authMiddleware.js'

const router = Router()

router.post('/login', loginAdmin)
router.get('/me', protectAdmin, getMe)
router.put('/profile', protectAdmin, updateProfile)
router.put('/change-password', protectAdmin, changePassword)

export default router
