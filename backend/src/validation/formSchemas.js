import { z } from 'zod'

/**
 * Server-side validation for the Contact and Career forms.
 *
 * Field sets mirror the legacy PHP handlers (PRD A5) — Career adds address,
 * designation and a resume upload on top of Contact's fields — but the rules
 * are modernised. The legacy `user_name` rule was "alphanumeric, 3–12
 * characters", which rejects any name containing a space, so "Ankit Ahirwar"
 * could never have submitted the old form.
 *
 * Keep in sync with frontend/src/lib/schemas.js. The two live in separate
 * packages so they cannot share a module; the shapes are intentionally
 * identical, and the server is the authority.
 */

const name = z
  .string()
  .trim()
  .min(2, 'Please enter your name')
  .max(80, 'Name must be 80 characters or fewer')
  .regex(
    /^[\p{L}\p{M}][\p{L}\p{M}\s'.-]*$/u,
    'Name may only contain letters, spaces, apostrophes, hyphens and full stops'
  )

const email = z
  .string()
  .trim()
  .min(1, 'Please enter your email address')
  .max(254, 'Email address is too long')
  .email('Please enter a valid email address')

/**
 * Indian 10-digit mobile numbers, tolerant of the ways people actually type
 * them: +91 / 0 prefixes, spaces and hyphens are stripped before checking.
 */
const phone = z
  .string()
  .trim()
  .min(1, 'Please enter your phone number')
  .transform((value) => value.replace(/[\s()-]/g, ''))
  .refine(
    (value) => /^(?:\+?91|0)?[6-9]\d{9}$/.test(value),
    'Please enter a valid 10-digit Indian mobile number'
  )

const message = z
  .string()
  .trim()
  .min(10, 'Please tell us a little more (at least 10 characters)')
  .max(5000, 'Message must be 5000 characters or fewer')

/** Anti-spam fields present on both forms. */
const spamFields = {
  /**
   * Honeypot. Hidden from real users via CSS and aria-hidden, so any value at
   * all means a bot filled the form in.
   *
   * Deliberately unconstrained here: rejecting it in the schema would return a
   * field error naming `website`, handing a bot the exact reason it failed.
   * middleware/honeypot.js does the rejection instead, with a vague message.
   */
  website: z.string().max(200).optional().default(''),
  /**
   * Milliseconds-since-epoch stamped when the form mounted. Used to reject
   * submissions completed impossibly fast, or from tabs left open for hours.
   */
  formStartedAt: z.coerce.number().int().positive('Invalid form session').optional(),
  /** Cloudflare Turnstile token; only required when Turnstile is configured. */
  captchaToken: z.string().optional().default(''),
}

export const contactSchema = z.object({
  name,
  email,
  phone,
  message,
  ...spamFields,
})

export const careerSchema = z.object({
  name,
  email,
  phone,
  address: z
    .string()
    .trim()
    .min(5, 'Please enter your address')
    .max(300, 'Address must be 300 characters or fewer'),
  designation: z
    .string()
    .trim()
    .min(2, 'Please enter the role you are applying for')
    .max(120, 'Designation must be 120 characters or fewer'),
  message,
  ...spamFields,
})
