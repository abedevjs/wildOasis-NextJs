// "use client";

import ReservationCard from "./ReservationCard";
// import { useOptimistic } from "react";

function ReservationList({ bookings }) {
  // Hook that mainly for experiencing a better UI/UX, when we fetch data we assume that fetch is successful so we provide...hence the name optimistic

  return (
    <ul className="space-y-6">
      {bookings.map((booking) => (
        <ReservationCard booking={booking} key={booking.id} />
      ))}
    </ul>
  );
}

export default ReservationList;
