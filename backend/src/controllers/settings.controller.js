import SiteSetting from '../models/SiteSetting.js'
import { ApiError } from '../utils/ApiError.js'

export async function getSetting(req, res) {
  const { key } = req.params
  const setting = await SiteSetting.findOne({ key })

  if (!setting) {
    throw new ApiError(404, `Setting "${key}" not found`)
  }

  res.json({
    success: true,
    key: setting.key,
    data: setting.data,
  })
}

export async function updateSetting(req, res) {
  const { key } = req.params
  const { data } = req.body

  if (!data) {
    throw new ApiError(400, 'Data is required')
  }

  const setting = await SiteSetting.findOneAndUpdate(
    { key },
    { data },
    { upsert: true, returnDocument: 'after' }
  )

  res.json({
    success: true,
    key: setting.key,
    data: setting.data,
  })
}

export async function getAllSettings(req, res) {
  const settings = await SiteSetting.find()
  res.json({
    success: true,
    settings,
  })
}
