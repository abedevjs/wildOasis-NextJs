import SelectCountry from "@/app/_components/SelectCountry";
import UpdateProfileForm from "@/app/_components/UpdateProfileForm";
import { auth } from "@/app/_lib/auth";
import { getGuest } from "@/app/_lib/data-service";

export const metadata = {
  title: "Update Profile",
};

async function page() {
  const session = await auth();
  const guest = await getGuest(session.user.email);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-4">
        Update your guest profile
      </h2>

      <p className="text-lg mb-8 text-primary-200">
        Providing the following information will make your check-in process
        faster and smoother. See you soon!
      </p>

      {/* Importing a server component (SelectCountry) inside a server component (page.js) */}
      {/* The server component (SelectCountry) will run here, it will already create the component instance and only that instance, this already executed component basically is then being passed into the client component (UpdateProfileForm).  */}
      {/* Because all the work here is already happened on the server. The data fetching has happened on the server, all the JSX has run . This already became a React Element, then this react element is whats gonna be passed into the client component*/}
      {/* All we did was render it on the server and then once it was already rendered,  so once the countries has been fetched and the react element had been generated, only then we passed it into the client component.*/}
      <UpdateProfileForm guest={guest}>
        <SelectCountry
          name="nationality"
          id="nationality"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          defaultCountry={guest.nationality}
        />
      </UpdateProfileForm>
    </div>
  );
}

export default page;
