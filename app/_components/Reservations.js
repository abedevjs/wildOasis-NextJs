import { auth } from "../_lib/auth";
import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import DateSelector from "./DateSelector";
import LoginMessage from "./LoginMessage";
import ReservationForm from "./ReservationForm";

async function Reservations({ cabin }) {
  const [settings, bookedDates, session] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
    auth(),
  ]);
  return (
    <div className=" grid grid-cols-2 border border-primary-800 min-h-[400px]">
      {/* Ideally Client Components should actually only be passed the minimal amount of data not the entire objects (if possible)  */}
      <DateSelector
        settings={settings}
        bookedDates={bookedDates}
        cabin={cabin}
      />
      {session?.user ? (
        <ReservationForm cabin={cabin} user={session?.user} />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
}

export default Reservations;
