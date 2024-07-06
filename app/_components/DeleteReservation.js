"use client";

import { TrashIcon } from "@heroicons/react/24/solid";
import { deleteReservationAction } from "../_lib/actions";
import { useTransition } from "react";
import SpinnerMini from "./SpinnerMini";

function DeleteReservation({ bookingId }) {
  const [isPending, startTransition] = useTransition();

  //This is an example of how we create a Server Action in a Server Component
  function deleteReservation() {
    // 'use server'
    // Unfortunately we decide to place all of our Server Actions on a central place and use it on the onClick handler below. Please note using a Server Action on the onClick handler is only allowed on the Client Component hence the 'use client' directive on top of this file.
  }

  // This is the recipe if you want to render a loading indicatior in case that you directly call a Server Action from a button, not from a form.
  //  You need to wrap that server action fn (deleteReservationAction(bookingId)) into a transition fn (startTransition()) by using the useTransition hook.
  // Behind the scene this works because NextJs is using suspense boundaries for all of this. Also remember that all navigation in Next are wrapped into transiitions by the framework automatically.
  function handleDelete() {
    if (confirm("Are you sure you want to delete this reservation?"))
      startTransition(() => deleteReservationAction(bookingId));
  }

  return (
    <button
      onClick={handleDelete}
      className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
    >
      {!isPending ? (
        <>
          <TrashIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
          <span className="mt-1">Delete</span>
        </>
      ) : (
        <span className=" mx-auto">
          <SpinnerMini />
        </span>
      )}
    </button>
  );
}

export default DeleteReservation;
