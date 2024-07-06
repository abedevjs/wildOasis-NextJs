import { auth } from "./app/_lib/auth";

//Whenever a user visit these routes that we specify below, this will run the auth fn in auth.js
export const config = {
  matcher: ["/account"],
};
export const middleware = auth;
