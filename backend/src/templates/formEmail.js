import { escapeHtml, escapeHtmlMultiline } from '../utils/html.js'

/**
 * Email bodies for the Contact and Career submissions.
 *
 * Plain-table HTML with inline styles — the only layout technique mail clients
 * agree on — plus a text/plain alternative for clients that refuse HTML.
 * Every interpolated value is escaped; submissions are untrusted input.
 */

const WRAPPER_STYLE =
  'margin:0;padding:24px;background:#f7f7f7;font-family:Arial,Helvetica,sans-serif;color:#474747;'
const CARD_STYLE =
  'max-width:640px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #d7d7d7;'
const LABEL_STYLE =
  'padding:12px 20px;background:#f7f7f7;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#6b6b6b;width:150px;vertical-align:top;'
const VALUE_STYLE =
  'padding:12px 20px;font-size:14px;line-height:1.6;color:#262626;vertical-align:top;'

function row(label, value, { multiline = false } = {}) {
  const rendered = multiline ? escapeHtmlMultiline(value) : escapeHtml(value)

  return `<tr>
    <td style="${LABEL_STYLE}">${escapeHtml(label)}</td>
    <td style="${VALUE_STYLE}">${rendered}</td>
  </tr>`
}

function layout({ heading, subheading, rows, footerNote }) {
  return `<!doctype html>
<html>
  <body style="${WRAPPER_STYLE}">
    <div style="${CARD_STYLE}">
      <div style="padding:24px 20px;background:#0e0e0e;">
        <p style="margin:0;font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:#ff9900;">Vrushahi Group</p>
        <h1 style="margin:8px 0 0;font-size:20px;color:#ffffff;font-weight:bold;">${escapeHtml(heading)}</h1>
        <p style="margin:6px 0 0;font-size:13px;color:rgba(255,255,255,.6);">${escapeHtml(subheading)}</p>
      </div>
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;">
        ${rows.join('')}
      </table>
      <div style="padding:16px 20px;background:#f7f7f7;border-top:1px solid #d7d7d7;">
        <p style="margin:0;font-size:12px;color:#8a8a8a;">${escapeHtml(footerNote)}</p>
      </div>
    </div>
  </body>
</html>`
}

function textBody(title, entries) {
  const lines = entries.map(([label, value]) => `${label}: ${value}`)
  return [title, '='.repeat(title.length), '', ...lines].join('\n')
}

/** Contact form submission — PRD A5 field set. */
export function contactEmail(data, meta = {}) {
  const receivedAt = meta.receivedAt ?? new Date().toISOString()

  return {
    subject: `New contact enquiry from ${data.name}`,
    html: layout({
      heading: 'New contact enquiry',
      subheading: `Submitted via vrushahi.com on ${receivedAt}`,
      rows: [
        row('Name', data.name),
        row('Email', data.email),
        row('Phone', data.phone),
        row('Message', data.message, { multiline: true }),
      ],
      footerNote: `Reply directly to this email to respond to ${data.email}.`,
    }),
    text: textBody('New contact enquiry', [
      ['Name', data.name],
      ['Email', data.email],
      ['Phone', data.phone],
      ['Message', data.message],
      ['Received', receivedAt],
    ]),
  }
}

/** Career application — Contact's fields plus address, designation and resume. */
export function careerEmail(data, meta = {}) {
  const receivedAt = meta.receivedAt ?? new Date().toISOString()
  const resumeName = meta.resumeFilename ?? 'Not attached'

  return {
    subject: `Career application — ${data.designation} — ${data.name}`,
    html: layout({
      heading: 'New career application',
      subheading: `Submitted via vrushahi.com on ${receivedAt}`,
      rows: [
        row('Name', data.name),
        row('Email', data.email),
        row('Phone', data.phone),
        row('Address', data.address, { multiline: true }),
        row('Applying for', data.designation),
        row('Message', data.message, { multiline: true }),
        row('Resume', resumeName),
      ],
      footerNote: `Reply directly to this email to respond to ${data.email}.`,
    }),
    text: textBody('New career application', [
      ['Name', data.name],
      ['Email', data.email],
      ['Phone', data.phone],
      ['Address', data.address],
      ['Applying for', data.designation],
      ['Message', data.message],
      ['Resume', resumeName],
      ['Received', receivedAt],
    ]),
  }
}
