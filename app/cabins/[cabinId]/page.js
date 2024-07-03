import Cabin from "@/app/_components/Cabin";
import Reservations from "@/app/_components/Reservations";
import Spinner from "@/app/_components/Spinner";
import TextExpander from "@/app/_components/TextExpander";
import { getCabin, getCabins } from "@/app/_lib/data-service";
import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { Suspense } from "react";

// // PLACEHOLDER DATA
// const cabin = {
//   id: 89,
//   name: "001",
//   maxCapacity: 2,
//   regularPrice: 250,
//   discount: 0,
//   description:
//     "Discover the ultimate luxury getaway for couples in the cozy wooden cabin 001. Nestled in a picturesque forest, this stunning cabin offers a secluded and intimate retreat. Inside, enjoy modern high-quality wood interiors, a comfortable seating area, a fireplace and a fully-equipped kitchen. The plush king-size bed, dressed in fine linens guarantees a peaceful nights sleep. Relax in the spa-like shower and unwind on the private deck with hot tub.",
//   image:
//     "https://dclaevazetcjjkrzczpc.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg",
// };

//Untuk metadata title di tab browser
export async function generateMetadata({ params }) {
  const { name } = await getCabin(params.cabinId);

  return { title: `Cabin ${name}` };
}

//Untuk convert dynamic page ke static page dengan mengambil id dr each cabin
//jadi di page ini akan sudah di generate saat build time (npm build)
//dgn fn generateStaticParams, ketika user navigate ke cabins/:id, asset dari page tsb sdh siap di bundle tdk perlu di ambil dari db, krn sdh ready saat npm run build.
//fn generateStaticParams di kombinasikan dgn setting pada Next.config.mjs menjadi output: "export"
//fn generateStaticParams dipakai jika kita ingin menjadikan page di app kita semua static tanpa harus ambil aset/data di db setiap id dari cabin/:id berganti. jd istilahnya semua aset/data tsb sdh ready di bundle saat npm run build sebelum deploy.
// Jika ini di pake bersamaa dgn setting di Next.config.mjs menjadi output: "export", maka deploy nya bisa ke hosting/provider yg cuma bisa handle static page seperti netlify, render.com dll
export async function generateStaticParams() {
  const cabins = await getCabins();

  const ids = cabins.map((cabin) => ({ cabinId: String(cabin.id) }));

  return ids;
}

export default async function Page({ params }) {
  const cabin = await getCabin(params.cabinId);
  // const settings = await getSettings();
  // const bookedDates = await getBookedDatesByCabinId(params.cabinId);

  // const [cabin, settings, bookedDates ] = await Promise.all([getCabin(params.cabinId), getSettings(), getBookedDatesByCabinId(params.cabinId)])

  const { name } = cabin;

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin} />

      <div>
        <h2 className=" mb-10 text-5xl text-accent-400 font-semibold text-center">
          Reserve cabin {name} today. Pay on arrival.
        </h2>

        <Suspense fallback={<Spinner />}>
          <Reservations cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
