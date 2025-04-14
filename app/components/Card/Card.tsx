import Link from "next/link";
import React from "react";

interface CardProps {
  name: string;
  description: string;
  image: string;
}

export default function Card({ name, description, image }: CardProps) {
  return (
    <div className="max-w-sm border bg-whitish text-greyish border-gray-200 rounded-lg shadow">
      <Link href="#">
        <img className="rounded-t-lg" src={image} alt="" />
      </Link>
      <div className="p-4">
        <Link href="#">
          <h5 className="mb-2 text-1xl font-bold tracking-tight text-grayish">
            {name}
          </h5>
        </Link>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {description}
        </p>
      </div>
    </div>
  );
}
