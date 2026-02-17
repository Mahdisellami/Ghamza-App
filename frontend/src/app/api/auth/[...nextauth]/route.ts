import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'
import type { NextAuthOptions } from 'next-auth'
import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001'

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      // Sync OAuth user with backend database
      try {
        const response = await axios.post(`${API_URL}/api/users/oauth/sync`, {
          email: user.email,
          full_name: user.name || user.email,
          provider: account?.provider || 'unknown',
        })

        // Store backend JWT token in the user object
        if (response.data.access_token) {
          user.backendToken = response.data.access_token
        }

        return true
      } catch (error) {
        console.error('Failed to sync OAuth user with backend:', error)
        // Still allow sign in even if backend sync fails
        return true
      }
    },
    async session({ session, token }) {
      // Add custom fields to session
      if (session.user) {
        session.user.id = token.sub as string
        // Add backend token to session for API calls
        if (token.backendToken) {
          session.backendToken = token.backendToken as string
        }
      }
      return session
    },
    async jwt({ token, user, account }) {
      // Add user id and backend token to token
      if (user) {
        token.id = user.id
        // Store backend token in JWT
        if (user.backendToken) {
          token.backendToken = user.backendToken
        }
      }
      return token
    },
  },
  session: {
    strategy: 'jwt',
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
