import BusinessUnit from '../models/BusinessUnit.js'
import { ApiError } from '../utils/ApiError.js'

export async function getAllUnits(req, res) {
  const units = await BusinessUnit.find().sort({ order: 1, createdAt: 1 })
  res.json({
    success: true,
    count: units.length,
    units,
  })
}

export async function getUnitBySlug(req, res) {
  const { slug } = req.params
  const unit = await BusinessUnit.findOne({ slug: slug.toLowerCase() })

  if (!unit) {
    throw new ApiError(404, `Business unit with slug "${slug}" not found`)
  }

  res.json({
    success: true,
    unit,
  })
}

export async function createUnit(req, res) {
  const { slug, name, shortLabel } = req.body

  if (!slug || !name || !shortLabel) {
    throw new ApiError(400, 'Slug, name, and shortLabel are required')
  }

  const existing = await BusinessUnit.findOne({ slug: slug.toLowerCase() })
  if (existing) {
    throw new ApiError(400, `Division with slug "${slug}" already exists`)
  }

  const highestOrderUnit = await BusinessUnit.findOne().sort({ order: -1 })
  const nextOrder = highestOrderUnit ? highestOrderUnit.order + 1 : 1

  const unit = await BusinessUnit.create({
    ...req.body,
    slug: slug.toLowerCase(),
    order: req.body.order ?? nextOrder,
  })

  res.status(201).json({
    success: true,
    unit,
  })
}

export async function updateUnit(req, res) {
  const { slug } = req.params

  const unit = await BusinessUnit.findOne({ slug: slug.toLowerCase() })
  if (!unit) {
    throw new ApiError(404, `Business unit with slug "${slug}" not found`)
  }

  Object.assign(unit, req.body)
  await unit.save()

  res.json({
    success: true,
    unit,
  })
}

export async function deleteUnit(req, res) {
  const { slug } = req.params

  const unit = await BusinessUnit.findOneAndDelete({ slug: slug.toLowerCase() })
  if (!unit) {
    throw new ApiError(404, `Business unit with slug "${slug}" not found`)
  }

  res.json({
    success: true,
    message: `Division "${unit.name}" deleted successfully`,
  })
}
