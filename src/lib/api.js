export const API_BASE = import.meta.env.VITE_API_BASE_URL

export function imageUrl(path) {
  if (!path) return ''
  return `${API_BASE}${path}`
}

export function getStoredUser() {
  const raw = localStorage.getItem('user')
  return raw ? JSON.parse(raw) : null
}
