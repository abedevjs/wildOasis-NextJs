import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";
import { signOutAction } from "../_lib/actions";

function SignOutButton() {
  return (
    //This SignOutButton component is a Client Component because it is imported/child of another Client Component (SideNavigation).
    //But why cant we use the signOutAction? The very special things about a server action is that they can even be called from the Client Component and will still only be executed on the Server.
    //See video Jonas 476
    <form action={signOutAction}>
      <button className="py-3 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200 w-full">
        <ArrowRightOnRectangleIcon className="h-5 w-5 text-primary-600" />
        <span>Sign out</span>
      </button>
    </form>
  );
}

export default SignOutButton;
