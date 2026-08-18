import mongoose from 'mongoose'

const unitSectionItemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    cta: {
      label: String,
      to: String,
    },
  },
  { _id: false }
)

const unitSectionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    body: [String],
    items: [unitSectionItemSchema],
  },
  { _id: false }
)

const businessUnitSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
    },
    shortLabel: {
      type: String,
      required: true,
    },
    cluster: {
      type: String,
      default: null,
    },
    heroImage: {
      type: String,
      default: null,
    },
    heroImageAlt: {
      type: String,
      default: '',
    },
    summary: {
      type: String,
      required: true,
    },
    body: {
      type: [String],
      default: [],
    },
    sections: [unitSectionSchema],
    subPage: {
      label: String,
      to: String,
      description: String,
    },
    externalSiteUrl: {
      type: String,
      default: null,
    },
    contentStatus: {
      type: String,
      enum: ['complete', 'placeholder'],
      default: 'placeholder',
    },
    imageStatus: {
      type: String,
      enum: ['placeholder', 'final'],
      default: 'placeholder',
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('BusinessUnit', businessUnitSchema)
