import { Router } from 'express'
import {
  getAllUnits,
  getUnitBySlug,
  createUnit,
  updateUnit,
  deleteUnit,
} from '../controllers/units.controller.js'
import { protectAdmin } from '../middleware/authMiddleware.js'

const router = Router()

// Public
router.get('/', getAllUnits)
router.get('/:slug', getUnitBySlug)

// Admin Protected
router.post('/admin', protectAdmin, createUnit)
router.put('/admin/:slug', protectAdmin, updateUnit)
router.delete('/admin/:slug', protectAdmin, deleteUnit)

export default router
