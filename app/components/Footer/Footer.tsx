import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-slate-100 py-10 px-10 mt-10 text-gray-600 text-center">
      <p>
        &copy; {new Date().getFullYear()} Invomaker.com. All rights reserved.
      </p>
    </footer>
  );
}
