import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.googleClient||"",
      clientSecret: process.env.secret||"",
    }),
  ],
  secret: "pkpkpk",  // Set the secret for encryption
  pages: {
    signIn: '/', // Customize your login page (optional)
  },
  session: {
    strategy: 'jwt', // Use JWT for session
  },
  // debug: process.env.NODE_ENV === "development",  // Debug only in development
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
