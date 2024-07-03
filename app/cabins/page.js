import { Suspense } from "react";
import CabinList from "../_components/CabinList";
import Spinner from "../_components/Spinner";
import { Filter } from "../_components/Filter";
import ReservationReminder from "../_components/ReservationReminder";

//This is revalidating cache at the route level
//Caching only works on Production. Run npm run prod to test this out.
//Always in seconds and a direct number not some computational action
//This only applies to Static Generate pages who needs to revalidate its cache in a given/time.
export const revalidate = 86400; //60s*60s=3600s = once an hour. 86400 once a day

export const metadata = {
  title: "Cabins",
};

//Here we are using the built-in Next API searchParams props which only available on the page.js route
//Using searchParams automatically makes this page dynamic not static anymore. Because the searchParams is constantly changing related to the user preference.
//When this page is become dynamic the code line (Next API Caching option) above (export const revalidate = 86400;) is useless because it is for the static page. There is no need to revalidate the static page who is dynamic anyway.
//A server component will re-render if navigation changes, in this case the searchParams prop which contain the query params requested/set by user
//This searchParams prop is unknown at build time, the page will now need to be regenerated at runtime, basically for each new request. That means that the page no longer static but dynamic.
export default function Home({ searchParams }) {
  const filter = searchParams?.capacity ?? "all";
  return (
    <div>
      {/* The H1 and P element are called Static Shell */}
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature's beauty in your own little home
        away from home. The perfect spot for a peaceful, calm vacation. Welcome
        to paradise.
      </p>

      <div className=" flex justify-end mb-8">
        <Filter />
      </div>

      {/* This is Partial Pre-Rendering (PPR) concept */}
      {/* The CabinList which wrapped by Suspense is called Dynamic Hole, the data inside this component will be cached using  revalidating cache at the component level or individual fetch level.*/}
      {/* The suspense needs key because naturally all page navigations are automatically wrapped in transition in Next. In that case, suspense will not re-render the fallback, to fix that is to pass in a unique key. So each time the navigation is changed because the key (filter) is changed thus the fallback(spinner) is re-render */}
      <Suspense fallback={<Spinner />} key={filter}>
        <CabinList filter={filter} />
        <ReservationReminder />
      </Suspense>
    </div>
  );
}
