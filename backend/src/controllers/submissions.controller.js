import Submission from '../models/Submission.js'
import { ApiError } from '../utils/ApiError.js'

export async function submitContactForm(req, res) {
  const { name, email, phone, division, message } = req.body

  if (!name || !email || !message) {
    throw new ApiError(400, 'Name, email and message are required')
  }

  const submission = await Submission.create({
    type: 'contact',
    fullName: name,
    email: email.toLowerCase(),
    phone: phone || '',
    division: division || 'General Inquiry',
    message,
    ip: req.ip || '',
  })

  res.status(201).json({
    success: true,
    message: 'Thank you for getting in touch. Your message has been received.',
    submissionId: submission._id,
  })
}

export async function submitCareerForm(req, res) {
  const { fullName, email, phone, division, message } = req.body

  if (!fullName || !email) {
    throw new ApiError(400, 'Full name and email are required')
  }

  const resumeUrl = req.file ? `/uploads/${req.file.filename}` : null
  const resumeOriginalName = req.file ? req.file.originalname : null

  const submission = await Submission.create({
    type: 'career',
    fullName,
    email: email.toLowerCase(),
    phone: phone || '',
    division: division || 'General Application',
    message: message || '',
    resumeUrl,
    resumeOriginalName,
    ip: req.ip || '',
  })

  res.status(201).json({
    success: true,
    message: 'Application received successfully. We will review your profile.',
    submissionId: submission._id,
  })
}

export async function getAllSubmissions(req, res) {
  const { type, status } = req.query
  const filter = {}

  if (type) filter.type = type
  if (status) filter.status = status

  const submissions = await Submission.find(filter).sort({ createdAt: -1 })
  const total = await Submission.countDocuments(filter)
  const unreadCount = await Submission.countDocuments({ ...filter, status: 'unread' })

  res.json({
    success: true,
    count: submissions.length,
    total,
    unreadCount,
    submissions,
  })
}

export async function updateSubmissionStatus(req, res) {
  const { id } = req.params
  const { status } = req.body

  if (!['unread', 'read', 'archived'].includes(status)) {
    throw new ApiError(400, 'Invalid status value')
  }

  const submission = await Submission.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  )

  if (!submission) {
    throw new ApiError(404, 'Submission not found')
  }

  res.json({
    success: true,
    submission,
  })
}

export async function deleteSubmission(req, res) {
  const { id } = req.params

  const submission = await Submission.findByIdAndDelete(id)
  if (!submission) {
    throw new ApiError(404, 'Submission not found')
  }

  res.json({
    success: true,
    message: 'Submission deleted successfully',
  })
}
