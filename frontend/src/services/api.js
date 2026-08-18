import { businessUnits as fallbackUnits } from '@/data/businessUnits'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

function getAuthHeader() {
  const token = localStorage.getItem('adminToken')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export async function adminLogin(email, password) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  const data = await res.json()
  if (!res.ok) {
    throw new Error(data.message || 'Failed to sign in')
  }
  localStorage.setItem('adminToken', data.token)
  return data
}

export async function getAdminProfile() {
  const res = await fetch(`${API_BASE}/auth/me`, {
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
  })
  const data = await res.json()
  if (!res.ok) {
    throw new Error(data.message || 'Session expired')
  }
  return data.user
}

export async function updateAdminProfile(profileData) {
  const res = await fetch(`${API_BASE}/auth/profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
    body: JSON.stringify(profileData),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Failed to update profile')
  return data
}

export async function changeAdminPassword(passwordData) {
  const res = await fetch(`${API_BASE}/auth/change-password`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
    body: JSON.stringify(passwordData),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Failed to change password')
  return data
}

// --- Units ---
export async function fetchUnits() {
  try {
    const res = await fetch(`${API_BASE}/units`)
    if (res.ok) {
      const data = await res.json()
      if (data.units && data.units.length > 0) {
        return data.units
      }
    }
  } catch (err) {
    console.warn('Backend API unavailable, using local businessUnits data:', err.message)
  }
  return fallbackUnits
}

export async function fetchUnitBySlug(slug) {
  try {
    const res = await fetch(`${API_BASE}/units/${slug}`)
    if (res.ok) {
      const data = await res.json()
      if (data.unit) return data.unit
    }
  } catch (err) {
    console.warn('Backend API unavailable, using local slug lookup:', err.message)
  }
  return fallbackUnits.find((u) => u.slug === slug)
}

export async function createUnitAdmin(unitData) {
  const res = await fetch(`${API_BASE}/units/admin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
    body: JSON.stringify(unitData),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Failed to create division')
  return data.unit
}

export async function updateUnitAdmin(slug, unitData) {
  const res = await fetch(`${API_BASE}/units/admin/${slug}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
    body: JSON.stringify(unitData),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Failed to update division')
  return data.unit
}

export async function deleteUnitAdmin(slug) {
  const res = await fetch(`${API_BASE}/units/admin/${slug}`, {
    method: 'DELETE',
    headers: {
      ...getAuthHeader(),
    },
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Failed to delete division')
  return data
}

// --- Submissions ---
export async function fetchSubmissionsAdmin(type = '', status = '') {
  const params = new URLSearchParams()
  if (type) params.append('type', type)
  if (status) params.append('status', status)

  const res = await fetch(`${API_BASE}/submissions/admin?${params.toString()}`, {
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Failed to fetch submissions')
  return data
}

export async function updateSubmissionStatusAdmin(id, status) {
  const res = await fetch(`${API_BASE}/submissions/admin/${id}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
    body: JSON.stringify({ status }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Failed to update submission status')
  return data.submission
}

export async function deleteSubmissionAdmin(id) {
  const res = await fetch(`${API_BASE}/submissions/admin/${id}`, {
    method: 'DELETE',
    headers: {
      ...getAuthHeader(),
    },
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Failed to delete submission')
  return data
}

// --- Public Form Submissions ---
export async function submitContactFormAPI(formData) {
  const res = await fetch(`${API_BASE}/submissions/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Failed to submit message')
  return data
}

export async function submitCareerFormAPI(formData) {
  let body
  let headers = {}

  if (formData instanceof FormData) {
    body = formData
  } else {
    headers['Content-Type'] = 'application/json'
    body = JSON.stringify(formData)
  }

  const res = await fetch(`${API_BASE}/submissions/career`, {
    method: 'POST',
    headers,
    body,
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Failed to submit application')
  return data
}

// --- Settings ---
export async function fetchSetting(key) {
  try {
    const res = await fetch(`${API_BASE}/settings/${key}`)
    if (res.ok) {
      const data = await res.json()
      return data.data
    }
  } catch (err) {
    console.warn(`Backend API unavailable for setting "${key}":`, err.message)
  }
  return null
}

export async function updateSettingAdmin(key, settingData) {
  const res = await fetch(`${API_BASE}/settings/admin/${key}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader(),
    },
    body: JSON.stringify({ data: settingData }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Failed to update setting')
  return data.data
}
