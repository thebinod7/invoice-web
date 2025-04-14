import { SearchX } from "lucide-react";
import React from "react";

export default function SearchToolBar() {
  return (
    <div className="flex flex-col gap-2 lg:flex-row justify-around items-center shadow-lg p-3">
      <div>
        <input
          type="text"
          placeholder="Search by name..."
          className="border-solid border-2 rounded-lg px-2 py-1"
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Search by phone..."
          className="border-solid border-2 rounded-lg px-2 py-1"
        />
      </div>
      <div className="w-[40%]">
        <select className="px-2 py-2 rounded-md w-full">
          <option value="">--Status--</option>
          <option value="Pending">Pending</option>
          <option value="In Review">In Review</option>
          <option value="Visa Granted">Visa Granted</option>
          <option value="Dismissed">Dismissed</option>
        </select>
      </div>
      <div className="cursor-pointer text-sm outline-2 p-2">
        <a href="#clear" title="Reset Filter">
          <SearchX />
        </a>
      </div>
    </div>
  );
}
