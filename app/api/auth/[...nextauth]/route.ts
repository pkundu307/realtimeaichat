import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Define the authentication options with proper typing
export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || "default-secret",
  pages: {
    signIn: "/", // Customize your login page if needed
  },
  session: {
    strategy: "jwt", // Use JWT for session
  },
};

// Define the handler using the typed authOptions
const handler = NextAuth(authOptions);

// Export the handlers as required by Next.js
