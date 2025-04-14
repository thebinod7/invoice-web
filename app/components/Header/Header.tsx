import Link from "next/link";
import { AlignJustify, X } from "lucide-react";
import { useState } from "react";
import Profile from "../Profile";
import { NAV_LINKS } from "@/app/constants";
import Logo from "./Logo";

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <header className="py-3 z-10 border-b-2">
      <nav className="flex justify-between items-center w-[95%]">
        <div>
          <Logo />
        </div>

        {/* Desktop Nav */}
        <div className="hidden sm:block">
          <ul className="flex justify-center items-center gap-8">
            {NAV_LINKS.map((item) => (
              <li className="hover:text-primary" key={item.label}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Desktop Profile */}
        <div className="hidden sm:block">
          <Profile />
        </div>

        <div className="block sm:hidden">
          <button onClick={toggleMenu}>
            <AlignJustify size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile sliding menu */}
      <div
        className={`block sm:hidden fixed top-0 right-0 h-full w-[65%] max-w-xs bg-primary text-white shadow-lg transform ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-20`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button onClick={toggleMenu}>
            <X size={24} />
          </button>
        </div>

        {/* Nav Links */}
        <ul className="flex flex-col items-center gap-4 mt-8">
          {NAV_LINKS.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                onClick={() => setMenuOpen(false)} // Close menu on link click
                className="text-lg hover:text-blue-400"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Profile */}
        <div className="mt-8 flex justify-center">
          <Profile />
        </div>
      </div>
    </header>
  );
};

export default Nav;
