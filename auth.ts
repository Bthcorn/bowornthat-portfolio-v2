import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { createHash } from "crypto"
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({ profile }) {
      // Restrict access to a specific GitHub User ID via Salted Hash
      const allowedHash = process.env.ADMIN_GITHUB_ID_HASH;
      const salt = process.env.ADMIN_GITHUB_SALT;
      
      if (!allowedHash || !salt) {
        console.warn("ADMIN_GITHUB_ID_HASH or ADMIN_GITHUB_SALT not set in environment variables.");
        return false;
      }

      // Hash the signing in user's ID with the salt
      const userId = String(profile?.id);
      const userHash = createHash("sha256").update(userId + salt).digest("hex");

      // Check if the hash matches
      return userHash === allowedHash;
    },
  },
  pages: {
    signIn: "/login",
  },
})
