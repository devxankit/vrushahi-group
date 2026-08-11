import { sendMail } from '../services/mail.service.js'
import { careerEmail, contactEmail } from '../templates/formEmail.js'
import { ApiError } from '../utils/ApiError.js'

/**
 * Contact and Career submission handlers.
 *
 * By the time a request reaches these, it has passed rate limiting, schema
 * validation, the honeypot/timing checks and (when configured) Turnstile — so
 * the only job left is composing the mail and reporting the outcome.
 */

/** POST /api/contact */
export async function submitContact(req, res) {
  const { name, email, phone, message } = req.body

  const mail = contactEmail(
    { name, email, phone, message },
    { receivedAt: new Date().toISOString() }
  )

  await deliver({ ...mail, replyTo: `${name} <${email}>` }, 'contact')

  res.status(200).json({
    success: true,
    message: 'Thanks for getting in touch. We’ll come back to you shortly.',
  })
}

/** POST /api/career (multipart/form-data — resume optional) */
export async function submitCareer(req, res) {
  const { name, email, phone, address, designation, message } = req.body
  const resume = req.file

  const mail = careerEmail(
    { name, email, phone, address, designation, message },
    {
      receivedAt: new Date().toISOString(),
      resumeFilename: resume?.originalname,
    }
  )

  await deliver(
    {
      ...mail,
      replyTo: `${name} <${email}>`,
      attachments: resume
        ? [
            {
              filename: resume.originalname,
              content: resume.buffer,
              contentType: resume.mimetype,
            },
          ]
        : undefined,
    },
    'career'
  )

  res.status(200).json({
    success: true,
    message: 'Thanks for applying. We’ll be in touch if there’s a match.',
  })
}

/**
 * Sends the mail and converts any transport failure into a clean 502.
 *
 * The underlying error is logged rather than returned: SMTP failures routinely
 * quote credentials and internal hostnames.
 */
async function deliver(message, formName) {
  try {
    const result = await sendMail(message)
    console.log(
      `[${formName}] submission handled via "${result.provider}" (delivered: ${result.delivered})`
    )
  } catch (error) {
    console.error(`[${formName}] mail delivery failed:`, error)
    throw new ApiError(
      502,
      'We couldn’t send your message right now. Please try again, or email us directly.',
      { code: 'MAIL_DELIVERY_FAILED' }
    )
  }
}
