//!Watch Google Developer Console guide by jonas on video 471
//https://authjs.dev/getting-started/providers/google

import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

// export const { handlers, auth, signIn, signOut } = NextAuth({
//   providers: [Google],
// });

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
