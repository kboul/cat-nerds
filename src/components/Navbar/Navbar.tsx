import { useId, useRef } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

import { routes } from "../../routes";

export default function Navbar() {
  const id = useId();
  const { pathname } = useLocation();
  const menuRef = useRef<HTMLInputElement>(null);

  const handleBurgerIconClick = () =>
    menuRef.current?.classList.toggle("hidden");

  return (
    <>
      <nav className="flex flex-wrap items-center justify-between w-full py-4 md:py-0 px-4 text-lg text-gray-700 bg-white sticky top-0 z-50">
        <div className="font-bold">Cat Nerds</div>

        <svg
          aria-label="burgerIcon"
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 cursor-pointer md:hidden block"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          onClick={handleBurgerIconClick}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>

        <div
          aria-label="menu"
          className="hidden w-full md:flex md:items-center md:w-auto"
          ref={menuRef}>
          <ul className="pt-4 text-base text-gray-700 md:flex md:justify-between md:pt-0">
            {Object.values(routes).map(({ name, path }) => (
              <li key={`${path}-${id}`}>
                <Link
                  className={`md:p-4 py-2 block hover:text-blue-700 ${
                    pathname.includes(path) ? "text-blue-700" : "text-gray-700"
                  }`}
                  to={path}>
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <Outlet />
    </>
  );
}
