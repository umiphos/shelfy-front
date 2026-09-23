export const API_BASE = import.meta.env.VITE_API_BASE_URL

export async function publicApi(path, options = {}) {
  return fetch(`${API_BASE}${path}`, options)
}

export function imageUrl(path) {
  if (!path) return ''
  return `${API_BASE}${path}`
}
