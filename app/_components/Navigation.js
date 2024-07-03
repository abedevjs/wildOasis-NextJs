// "use client";

import Link from "next/link";
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

function Navigation() {
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
        <li>
          <Link
            href="/account"
            className="hover:text-accent-400 transition-colors"
          >
            Guest area
          </Link>
        </li>
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
