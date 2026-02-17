'use client'

import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

/**
 * Hook to sync backend token from NextAuth session to sessionStorage
 * This allows API calls to use the backend JWT token for authenticated requests
 */
export function useBackendAuth() {
  const { data: session } = useSession()

  useEffect(() => {
    if (session?.backendToken) {
      // Store backend token in sessionStorage for API requests
      sessionStorage.setItem('backend_token', session.backendToken)
    } else {
      // Clear token if no session
      sessionStorage.removeItem('backend_token')
    }
  }, [session])

  return { session }
}
