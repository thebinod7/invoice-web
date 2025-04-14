import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  matcher: ["/dashboard/:path*", "/profile/:path*", "/settings/:path*"],
};

export default nextConfig;
