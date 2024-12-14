import GoogleProvider from "next-auth/providers/google";

export const options = {
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