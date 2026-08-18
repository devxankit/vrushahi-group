import { Router } from 'express'
import multer from 'multer'
import path from 'path'
import {
  submitContactForm,
  submitCareerForm,
  getAllSubmissions,
  updateSubmissionStatus,
  deleteSubmission,
} from '../controllers/submissions.controller.js'
import { protectAdmin } from '../middleware/authMiddleware.js'
import { env } from '../config/env.js'

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename(req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  },
})

const upload = multer({
  storage,
  limits: { fileSize: env.upload.maxFileSizeBytes },
})

const router = Router()

// Public
router.post('/contact', submitContactForm)
router.post('/career', upload.single('resume'), submitCareerForm)

// Admin Protected
router.get('/admin', protectAdmin, getAllSubmissions)
router.patch('/admin/:id/status', protectAdmin, updateSubmissionStatus)
router.delete('/admin/:id', protectAdmin, deleteSubmission)

export default router
