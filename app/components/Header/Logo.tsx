import Link from "next/link";
import React from "react";

export default function Logo() {
  return (
    <>
      <Link href={"/"}>
        <img src="/logo.png" alt="logo" className="ml-10 w-[40px] h-[40px]" />
      </Link>
    </>
  );
}
