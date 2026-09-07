export const API_BASE = 'http://127.0.0.1:8000'

export function imageUrl(path) {
  if (!path) return ''
  return `${API_BASE}${path}`
}

export function getStoredUser() {
  const raw = localStorage.getItem('user')
  return raw ? JSON.parse(raw) : null
}
