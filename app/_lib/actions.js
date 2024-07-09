// By using this directive 'use server', all these actions below always only be called on the server, it is never gonna leak to the client.
// This directive is declared for Server Actions not Server Component. Generally in Next, a component is a Server Component by default (not need any directive declaration on top)
"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateGuestAction(formData) {
  const session = await auth();
  // We are on the server doing a backend operation. Always treat input from the user as unsafe
  if (!session) throw new Error("You must be logged in");

  // The get method is a web api that available on the browser (check mdn)
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  const nationalID = formData.get("nationalID");
  // Check the national ID
  let nationalIDRegex = /^[a-zA-Z0-9]{6,12}$/;
  // The test method (return boolean) is available on regex (check google/mdn)
  if (!nationalIDRegex.test(nationalID))
    throw new Error("Please provide a valid national ID");

  const updateData = { nationality, countryFlag, nationalID };

  //Send the data to Supabase
  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId);
  if (error) throw new Error("Guest could not be updated");

  // validate data manually or on demand
  // When we do some server action, and we then want the result of that action to be reflected in the UI, al we do is to re-fetch the data. So we clear the cache, get the fresch data, and that fresh data will be rendered on the UI. So, we re validate/clear the cache.
  revalidatePath("/account/profile");
}

export async function deleteReservationAction(bookingId) {
  const session = await auth();
  // We are on the server doing a backend operation. Always treat input from the user as unsafe
  if (!session) throw new Error("You must be logged in");

  //Check if the current user is the owner of the current booking
  const currentGuestBookings = await getBookings(session.user.guestId);
  const currentGuestBookingsId = currentGuestBookings.map(
    (booking) => booking.id
  );
  if (!currentGuestBookingsId.includes(bookingId))
    throw new Error("You are not allowed to delete this reservation");

  //Performing the delete operation on the DB
  const { data, error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) throw new Error("Booking could not be deleted");

  // validate data manually or on demand
  // When we do some server action, and we then want the result of that action to be reflected in the UI, al we do is to re-fetch the data. So we clear the cache, get the fresch data, and that fresh data will be rendered on the UI. So, we re validate/clear the cache.
  revalidatePath("/account/reservations");
}

export async function updateReservationAction(formData) {
  const session = await auth();
  // We are on the server doing a backend operation. Always treat input from the user as unsafe
  if (!session) throw new Error("You must be logged in");

  // Get the reservationId/bookingId from the formData
  const bookingId = Number(formData.get("reservationId"));

  //Check if the current user is the owner of the current booking
  const currentGuestBookings = await getBookings(session.user.guestId);
  const currentGuestBookingsId = currentGuestBookings.map(
    (booking) => booking.id
  );
  if (!currentGuestBookingsId.includes(bookingId))
    throw new Error("You are not allowed to update this reservation");

  // Destructuring the formData
  const updateData = {
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
  };

  //Performing update booking on DB
  const { data, error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", bookingId)
    .select()
    .single();

  if (error) throw new Error("Reservation could not be updated");

  // Revalidate the cache/data
  revalidatePath(`/account/reservations/edit/${bookingId}`);
  revalidatePath(`/account/reservations`);

  //Redirecting the route
  redirect("/account/reservations");
}

export async function createReservationAction(reservationData, formData) {
  const session = await auth();
  // We are on the server doing a backend operation. Always treat input from the user as unsafe
  if (!session) throw new Error("You must be logged in");

  // console.log("reservationData:", reservationData);
  // console.log("==================================");
  // console.log("formData:", formData);

  // If we have a lot of formData datas, instead of numGuests: formData.get('numGuests'), we can use Object.entries(reservationData)

  const newReservation = {
    ...reservationData,
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 10000),
    extrasPrice: 0,
    totalPrice: reservationData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
    guestId: session.user.guestId,
  };

  // Create Booking/Reservation on Supabase
  const { data, error } = await supabase
    .from("bookings")
    .insert([newReservation]);

  if (error) {
    console.error(error);
    throw new Error("Reservation could not be created");
  }

  // Clear cache/update data on the ui
  revalidatePath(`/cabins/${reservationData.cabinId}`);

  // Redirect
  redirect("/cabins/thankyou");
}
