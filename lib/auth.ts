import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { authConfig } from "./auth.config"
import { verifyUserHash } from "./utils"

export const { auth, handlers, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [GitHub],
  callbacks: {
    ...authConfig.callbacks,
    async signIn({ profile }) {
      return await verifyUserHash(String(profile?.id))
    },
  },
})
