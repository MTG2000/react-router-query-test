import React from "react";
import { Link, NavLink } from "react-router-dom";
import { twMerge } from "tailwind-merge";

export default function Navbar() {
  return (
    <nav className="bg-black py-24 px-32 flex justify-between items-center">
      <Link to="/" className="text-body1 text-white hover:text-white font-bold">
        App Logo
      </Link>

      <ul className="flex gap-16 ">
        <li>
          <NavLink
            className={({ isActive, isPending }) =>
              twMerge(
                `text-body3 text-white
              ${!isActive && !isPending && "hover:text-gray-300"}
               ${isPending && "text-orange-300"} ${
                  isActive && "text-violet-400 underline underline-offset-4"
                }`
              )
            }
            to="/characters"
            state={{ loadingText: "Fetching characters..." }}
          >
            Characters
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive, isPending }) =>
              twMerge(
                `text-body3 text-white
              ${!isActive && !isPending && "hover:text-gray-300"}
              ${isPending && "text-orange-300"} ${
                  isActive && "text-violet-400 underline underline-offset-4"
                }`
              )
            }
            to="/episodes"
            state={{ loadingText: "Fetching episodes..." }}
          >
            Episodes
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
