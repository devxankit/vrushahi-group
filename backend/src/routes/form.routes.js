import { Router } from 'express'
import { submitCareer, submitContact } from '../controllers/form.controller.js'
import { validate } from '../middleware/validate.js'
import { honeypot } from '../middleware/honeypot.js'
import { formLimiter } from '../middleware/rateLimiter.js'
import { requireResume, uploadResume } from '../middleware/upload.js'
import { verifyCaptcha } from '../services/captcha.service.js'
import { careerSchema, contactSchema } from '../validation/formSchemas.js'

/**
 * The two form endpoints replacing the legacy contact-us.php and career.php —
 * which, notably, were fully functional but linked from nowhere on the old site
 * (PRD A9.1).
 *
 * Middleware order matters:
 *   1. rate limit    — cheapest rejection first
 *   2. upload        — multer parses multipart bodies, so it must precede
 *                      validation on the career route or req.body is empty
 *   3. validate      — schema + normalisation; controllers see clean data only
 *   4. honeypot      — reads the parsed body
 *   5. captcha       — the only step that makes a network call
 */
const router = Router()

router.post(
  '/contact',
  formLimiter,
  validate(contactSchema),
  honeypot,
  verifyCaptcha,
  submitContact
)

router.post(
  '/career',
  formLimiter,
  uploadResume,
  requireResume,
  validate(careerSchema),
  honeypot,
  verifyCaptcha,
  submitCareer
)

export default router
