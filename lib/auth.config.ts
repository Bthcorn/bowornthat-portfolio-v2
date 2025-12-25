import type { NextAuthConfig } from "next-auth"
import { verifyUserHash } from "@/lib/utils"

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnAdmin = nextUrl.pathname.startsWith("/admin")
      
      if (isOnAdmin) {
        if (isLoggedIn) {
          const isAuthorized = await verifyUserHash(auth.user?.id as string)
          return isAuthorized
        }
        return false // Redirect unauthenticated users to login page
      }
      
      return true
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig
