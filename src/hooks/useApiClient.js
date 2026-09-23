import { useAuth0 } from '@auth0/auth0-react'
import { useCallback } from 'react'
import { API_BASE } from '../lib/api'

export default function useApiClient() {
  const { getAccessTokenSilently } = useAuth0()

  return useCallback(
    async (path, options = {}) => {
      const token = await getAccessTokenSilently()
      const headers = new Headers(options.headers)
      headers.set('Authorization', `Bearer ${token}`)

      return fetch(`${API_BASE}${path}`, { ...options, headers })
    },
    [getAccessTokenSilently],
  )
}
