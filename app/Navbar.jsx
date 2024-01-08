"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";
import { FaBugSlash } from "react-icons/fa6";
import classNames from "classnames";

const Navbar = () => {
  const currentPath = usePathname();
  const navbarsLinks = [
    { title: "Dashboard", link: "/" },
    { title: "Issues", link: "/issues" },
  ];

  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href={"/"}>
        {" "}
        <FaBugSlash />
      </Link>
      <ul className="flex  space-x-4">
        {navbarsLinks.map((link) => (
          <Link
            key={link.title}
            href={link.link}
            className={classNames({
              "text-zinc-900": currentPath === link.link,
              "text-zinc-500": currentPath !== link.link,
              "hover:text-zinc-700 transition-colors": true,
            })}
          >
            {link.title}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;

// make an navbar with attributes (logo , issues , dashboard)
//  npm i react-icons for logo and add css to navbar
// need to make the link active onclick :
// we use usePathname hook to get the current path and set the color
// we need to add 'use client' to run usePathname hook
// npm i classnames : for  making the classnames dynamically
