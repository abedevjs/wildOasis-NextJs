//!Watch Google Developer Console guide by jonas on video 471 'Setting Up NextAuth'
//https://authjs.dev/getting-started/providers/google

import NextAuth from "next-auth"; //It is a third party library for Authentication for Next.js
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

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

  // NextAuth is going to call this fn whenever a user tries to access the selected/protected which we define in middleware.js
  callbacks: {
    authorized({ auth, request }) {
      //returning boolean if there's a user or not
      return !!auth?.user;
    },
    async signIn({ user, account, profile }) {
      try {
        const existingGuest = await getGuest(user.email);
        if (!existingGuest)
          await createGuest({ email: user.email, fullName: user.name });

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    //This fn runs after the signIn fn
    async session({ session, user }) {
      const currentUser = await getGuest(session.user.email);

      //We mutate or add the current user.id or current session.user.id with the existing user id in the database who has the db id because we need that user db id when making a reservation.
      // We cant execute the line of code below in the signIn callback because at that point (signIn callback being executed) the session hasnt been created yet. This is how NextAuth works.
      session.user.guestId = currentUser.id;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const {
  //This auth fn, It will make the entire route dynamic. Because this authentication works with cookies and headers.
  //This auth fn needs to read these cookies from the incoming request. Reading cookies actually switches the route to dynamic rendering. Because, these cookies can only be known at runtime, never at build time.
  //If build this in static, we cant know all the users that might eventually be logged in
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
