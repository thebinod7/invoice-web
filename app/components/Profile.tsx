"use client";

import React, { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { LOGGED_IN_MENU } from "../constants";
import Link from "next/link";
import {
  clearLocalStorage,
  getLocalUser,
  LOCAL_KEYS,
} from "../helpers/local-storage";
import { deleteCookie } from "cookies-next/client";
import { set } from "zod";

export default function Profile() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<any>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);

  const handleClickOutside = (event: any) => {
    if (dropdownRef.current && !dropdownRef?.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setCurrentUser(getLocalUser());
  }, []);

  const handleLogoutClick = () => {
    clearLocalStorage();
    deleteCookie(LOCAL_KEYS.ACCESS_TOKEN);
    window.location.href = "/";
  };

  const handleItemClick = () => setIsDropdownOpen(false);

  return (
    <div ref={dropdownRef}>
      <button
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        className="font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
        type="button"
        onClick={toggleDropdown}
      >
        {currentUser ? `👋 ${currentUser.name}` : "👋 Hello Guest"}
        {currentUser && <ChevronDown size={16} className="ml-2" />}
      </button>

      {currentUser && (
        <div
          id="dropdown"
          style={{ zIndex: 1000 }}
          className={`absolute right-8 mt-2 z-100 divide-y bg-slate-100 rounded-lg shadow w-44 ${
            isDropdownOpen ? "block" : "hidden"
          }`}
        >
          <ul className="py-2 text-sm" aria-labelledby="dropdownDefaultButton">
            {LOGGED_IN_MENU.map((item, index) => {
              return (
                <li key={index}>
                  <Link
                    onClick={handleItemClick}
                    href={item.href}
                    className="block px-4 py-2 hover:bg-gray-600 dark:hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
            <li>
              <Link
                onClick={handleLogoutClick}
                href="#logout"
                className="block px-4 py-2 hover:bg-gray-600 dark:hover:text-white"
              >
                Logout
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
