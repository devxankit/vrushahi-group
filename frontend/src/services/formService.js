import { api } from './api'

/**
 * Contact and Career submissions.
 *
 * `formStartedAt` is stamped when the form mounts and sent with the payload —
 * the server uses it to reject submissions completed impossibly fast, which is
 * half of the honeypot/timing spam check that replaced the legacy math captcha.
 */

/**
 * @param {{name: string, email: string, phone: string, message: string, website?: string}} values
 * @param {{formStartedAt: number, captchaToken?: string}} meta
 */
export async function submitContact(values, meta) {
  const { data } = await api.post('/contact', {
    ...values,
    formStartedAt: meta.formStartedAt,
    captchaToken: meta.captchaToken ?? '',
  })

  return data
}

/**
 * Career applications go up as multipart/form-data because of the resume file.
 *
 * @param {Object} values - career form values, `resume` being a FileList
 * @param {{formStartedAt: number, captchaToken?: string}} meta
 */
export async function submitCareer(values, meta) {
  const formData = new FormData()

  formData.append('name', values.name)
  formData.append('email', values.email)
  formData.append('phone', values.phone)
  formData.append('address', values.address)
  formData.append('designation', values.designation)
  formData.append('message', values.message)
  formData.append('website', values.website ?? '')
  formData.append('formStartedAt', String(meta.formStartedAt))
  formData.append('captchaToken', meta.captchaToken ?? '')

  const file = values.resume?.[0]
  if (file) formData.append('resume', file)

  const { data } = await api.post('/career', formData)

  return data
}
