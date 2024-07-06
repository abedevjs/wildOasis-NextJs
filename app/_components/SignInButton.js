import { signInAction } from "../_lib/actions";

function SignInButton() {
  return (
    // We cant use/call/wire the signIn fn to the onClick fn on the button element here because this is a Server Component and needs to stay one. We use server action (signInAction) which we import.
    //If we use the onClick, it will make this component interactive which turn it to a Client Component
    <form action={signInAction}>
      <button className="flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium">
        <img
          src="https://authjs.dev/img/providers/google.svg"
          alt="Google logo"
          height="24"
          width="24"
        />
        <span>Continue with Google</span>
      </button>
    </form>
  );
}

export default SignInButton;
