// "use client";

import Link from "next/link";
import { auth } from "../_lib/auth";
// import { usePathname } from "next/navigation";

const links = [
  {
    name: "Cabins",
    href: "/cabins",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Guest Area",
    href: "/account",
  },
];

async function Navigation() {
  //This auth fn, It will make the entire route dynamic. Because this authentication works with cookies and headers.
  //This auth fn needs to read these cookies from the incoming request. Reading cookies actually switches the route to dynamic rendering. Because, these cookies can only be known at runtime, never at build time.
  //If build this in static, we cant know all the users that might eventually be logged in
  //This Navigation component appears in the every single route (inside Header component). So this make our website is dynamic, because we use/need the user.image inside this jsx Navigation component
  const session = await auth();
  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li>
          <Link
            href="/cabins"
            className="hover:text-accent-400 transition-colors"
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-accent-400 transition-colors"
          >
            About
          </Link>
        </li>
        {session?.user?.image ? (
          <li>
            <Link
              href="/account"
              className=" flex items-center gap-4 hover:text-accent-400 transition-colors"
            >
              <img
                src={session.user.image}
                className=" h-8 rounded-full"
                alt={session.user.name}
                referrerPolicy="no-referrer"
              />
              <span>Guest area</span>
            </Link>
          </li>
        ) : (
          <li>
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors"
            >
              Guest area
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );

  // const pathName = usePathname();
  // return (
  //   <nav className="z-10 text-xl">
  //     <ul className="flex gap-16 items-center">
  //       {links.map((link, index) => (
  //         <li key={index}>
  //           <Link
  //             href={link.href}
  //             className={`hover:text-accent-400 transition-colors ${
  //               pathName === link.href && "text-accent-400"
  //             }`}
  //           >
  //             {link.name}
  //           </Link>
  //         </li>
  //       ))}
  //     </ul>
  //   </nav>
  // );
}

export default Navigation;
