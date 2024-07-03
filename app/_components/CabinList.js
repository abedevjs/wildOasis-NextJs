import { unstable_noStore } from "next/cache";
import { getCabins } from "../_lib/data-service";
import CabinCard from "@/app/_components/CabinCard";
import { notFound } from "next/navigation";

async function CabinList({ filter }) {
  //This is Partial Pre-Rendering (PPR) concept
  //Here we are performing/executing Non Cache data request
  //Caching only works on Production. Run npm run prod to test this out.
  //This is revalidating cache at the component level or individual fetch level. This will opt-out/activate/effect the route who using this component is non-cached on the dynamic hole of the page
  // unstable_noStore();

  const cabins = await getCabins();

  if (!cabins.length) return null;

  let displayedCabins;
  switch (filter) {
    case "small":
      displayedCabins = cabins.filter((cabin) => cabin.maxCapacity <= 3);
      break;

    case "medium":
      displayedCabins = cabins.filter(
        (cabin) => cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7
      );
      break;

    case "large":
      displayedCabins = cabins.filter((cabin) => cabin.maxCapacity >= 8);
      break;

    // case "all" || "":
    //   displayedCabins = cabins;
    //   break;

    default:
      displayedCabins = cabins;
      break;
  }

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {displayedCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}

export default CabinList;
