import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({ profile }) {
      // Restrict access to a specific GitHub User ID
      const allowedId = process.env.ADMIN_GITHUB_ID;
      
      if (!allowedId) {
        console.warn("ADMIN_GITHUB_ID not set in environment variables.");
        return false;
      }

      // Check if the signing in user matches the allowed ID
      // profile.id from GitHub is a number, env var is a string
      return String(profile?.id) === allowedId;
    },
  },
  pages: {
    signIn: "/login",
  },
})
