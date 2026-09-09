import { Router } from 'express'
import multer from 'multer'
import path from 'path'
import {
  getAllUnits,
  getUnitBySlug,
  createUnit,
  updateUnit,
  deleteUnit,
  uploadUnitImage,
} from '../controllers/units.controller.js'
import { protectAdmin } from '../middleware/authMiddleware.js'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    const ext = path.extname(file.originalname) || '.jpg'
    cb(null, 'unit-' + uniqueSuffix + ext)
  },
})

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true)
    } else {
      cb(new Error('Only image files (JPG, PNG, WEBP, GIF, SVG) are allowed'), false)
    }
  },
})

const router = Router()

// Public
router.get('/', getAllUnits)
router.get('/:slug', getUnitBySlug)

// Admin Protected
router.post('/admin/upload-image', protectAdmin, upload.single('image'), uploadUnitImage)
router.post('/admin', protectAdmin, createUnit)
router.put('/admin/:slug', protectAdmin, updateUnit)
router.delete('/admin/:slug', protectAdmin, deleteUnit)

export default router
