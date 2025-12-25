import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function truncate(text: string, maxLength = 15): string {
  if (typeof text !== "string") return "";
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + "...";
}

export async function verifyUserHash(userId: string): Promise<boolean> {
  const allowedHash = process.env.ADMIN_GITHUB_ID_HASH
  const salt = process.env.ADMIN_GITHUB_SALT

  if (!allowedHash || !salt) {
    console.warn("ADMIN_GITHUB_ID_HASH or ADMIN_GITHUB_SALT not set in environment variables.")
    return false
  }

  const encoder = new TextEncoder()
  const data = encoder.encode(userId + salt)
  const hashBuffer = await crypto.subtle.digest("SHA-256", data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const userHash = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")

  return userHash === allowedHash
}
