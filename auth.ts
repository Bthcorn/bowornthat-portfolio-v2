import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({ profile }) {
      // Restrict access to a specific GitHub username
      const allowedEmail = process.env.ADMIN_GITHUB_EMAIL;
      
      if (!allowedEmail) {
        console.warn("ADMIN_GITHUB_EMAIL not set in environment variables.");
        return false; // Create security by default, don't allow if not set
      }

      // Check if the signing in user matches the allowed username (case-insensitive)
      return profile?.email?.toLowerCase() === "john.doe@example.com";
    },
  },
  pages: {
    signIn: "/login",
  },
})
