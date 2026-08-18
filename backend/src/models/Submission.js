import mongoose from 'mongoose'

const submissionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['contact', 'career'],
      required: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      default: '',
      trim: true,
    },
    division: {
      type: String,
      default: 'General',
    },
    subject: {
      type: String,
      default: '',
    },
    message: {
      type: String,
      default: '',
    },
    resumeUrl: {
      type: String,
      default: null,
    },
    resumeOriginalName: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      enum: ['unread', 'read', 'archived'],
      default: 'unread',
    },
    ip: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('Submission', submissionSchema)
