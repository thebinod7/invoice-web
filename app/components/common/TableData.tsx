"use client";

import { APP_PATHS } from "@/app/constants";
import Link from "next/link";
import Badge from "./Badge";

interface ITableDataProps {
  data: any[];
}

export default function TableData({ data }: ITableDataProps) {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="max-h-[342px] overflow-y-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-4 py-2">
                Name
              </th>
              <th scope="col" className="px-4 py-2">
                Phone
              </th>
              <th scope="col" className="px-4 py-2">
                Status
              </th>
              <th scope="col" className="px-4 py-2">
                Date of Birth
              </th>
              <th scope="col" className="px-4 py-2">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => {
              return (
                <tr key={item.id} className="bg-white border-b">
                  <th
                    scope="row"
                    className="px-4 py-3 font-medium whitespace-nowrap"
                  >
                    {item.firstName} {item.lastName}
                  </th>
                  <td className="px-4 py-3">{item.phone}</td>
                  <td className="px-4 py-3">
                    {<Badge status={item.status} />}
                  </td>
                  <td className="px-4 py-3">{item.dob}</td>
                  <td className="px-4 py-3">
                    <Link
                      href={APP_PATHS.SUBMISSIONS + "/" + item.id}
                      className="font-medium text-blue-600 hover:underline"
                    >
                      View
                    </Link>

                    <Link
                      href="#"
                      aria-disabled={true}
                      className="ml-4 font-medium text-blue-600 hover:underline"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
