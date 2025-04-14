import React from "react";

export default function Advertisement() {
  return (
    <div className="flex flex-col sm:flex-row justify-around gap-4 sm:items-center">
      <div className="flex-1">
        <img
          className="w-full h-[150px] object-cover rounded-sm"
          src="/images/banners/space.jpg"
          alt="visa-advertisement"
        />
      </div>
      <div className="flex-1">
        <img
          className="w-full h-[150px] object-cover rounded-sm"
          src="/images/banners/space.jpg"
          alt="visa-advertisement"
        />
      </div>
    </div>
  );
}
