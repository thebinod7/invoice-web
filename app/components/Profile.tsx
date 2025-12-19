'use client';

import { deleteCookie } from 'cookies-next/client';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { APP_PATHS } from '../constants';
import {
  clearLocalStorage,
  getLocalUser,
  LOCAL_KEYS,
} from '../helpers/local-storage';
import { useAuthContext } from '../context/useAuthContext';

const MENU_ITEMS = [
  {
    label: 'Dashboard',
    href: '/dashboard',
  },
  {
    label: 'Settings',
    href: '/settings',
  },
];

export default function Profile({}) {
  const { currentUser, setCurrentUser } = useAuthContext();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<any>(null);

  const handleClickOutside = (event: any) => {
    if (dropdownRef.current && !dropdownRef?.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setCurrentUser(getLocalUser());
  }, []);

  const handleLogoutClick = useCallback(() => {
    clearLocalStorage();
    deleteCookie(LOCAL_KEYS.ACCESS_TOKEN);
    window.location.href = '/';
  }, []);

  const handleItemClick = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div ref={dropdownRef}>
      <button
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        className="font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
        type="button"
        onClick={toggleDropdown}
      >
        {currentUser ? (
          `Hi, ${currentUser.firstName}`
        ) : (
          <Link
            className="outline outline-1 px-5 py-1.5 rounded-sm outline-offset-2"
            href={APP_PATHS.AUTH}
          >
            Sign In
          </Link>
        )}
        {currentUser && <ChevronDown size={16} className="ml-2" />}
      </button>

      {currentUser && (
        <div
          id="dropdown"
          style={{ zIndex: 1000 }}
          className={`absolute right-8 mt-2 z-100 divide-y bg-slate-100 rounded-lg shadow w-44 ${
            isDropdownOpen ? 'block' : 'hidden'
          }`}
        >
          <ul className="py-2 text-sm" aria-labelledby="dropdownDefaultButton">
            {MENU_ITEMS.map((item, index) => {
              return (
                <li key={index}>
                  <Link
                    onClick={handleItemClick}
                    href={item.href}
                    className="block px-4 py-2 hover:bg-slate-200 dark:hover:text-white"
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
                className="block px-4 py-2 hover:bg-slate-100 dark:hover:text-white"
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
