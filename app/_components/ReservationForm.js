"use client";

import { differenceInDays } from "date-fns";
import { useReservation } from "../_contexts/ReservationContext";
import { createReservationAction } from "../_lib/actions";
import SubmitButton from "./SubmitButton";

function ReservationForm({ cabin, user }) {
  const {
    range: { from: startDate, to: endDate },
    resetRange,
  } = useReservation();
  const { maxCapacity, regularPrice, discount, id: cabinId } = cabin;
  const numNights = differenceInDays(endDate, startDate);
  const cabinPrice = numNights * (regularPrice - discount);

  const reservationData = {
    startDate,
    endDate,
    numNights,
    cabinPrice,
    cabinId,
  };

  const abe =
    "this abe variable will not be read if passed on the server action argument";

  // Watch explanation of the bind method on video 489.Creating a New Reservation minute 7:30
  // This is how we pass the more rich data into the action which is not inside the form, using the bind method
  // The bind method does on a fn: set the 'this' keyword of that fn and plus, is allows us to pass some additional arguments into the fn.
  // First argument is the new value of the this keyword
  // Second argument is the new value
  // Because we set the first argument is null, so the second argument willl become the first argument of the fn that we are binding, so basically these are getting set by order.
  const reservationDataAfterBind = createReservationAction.bind(
    abe,
    reservationData
  );

  return (
    <div className="scale-[1.01]">
      <div className="bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center">
        <p>Logged in as</p>

        <div className="flex gap-4 items-center">
          <img
            // Important to display google profile images
            referrerPolicy="no-referrer"
            className="h-8 rounded-full"
            src={user.image}
            alt={user.name}
          />
          <p>{user.name}</p>
        </div>
      </div>
      <form
        // action={reservationDataAfterBind}
        // Because we need to call the resetRange fn which only available on the Client Component, we do some trick here so we can to call the createReservationAction fn and the resetRange fn simultaneously
        action={async (formdata) => {
          await reservationDataAfterBind(formdata);
          resetRange();
        }}
        className="bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          {!(startDate && endDate) ? (
            <p className="text-primary-300 text-base">
              Start by selecting dates
            </p>
          ) : (
            <SubmitButton pendingLabel="Reserving...">Reserve now</SubmitButton>
          )}
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
