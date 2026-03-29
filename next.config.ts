import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    if (process.env.NODE_ENV === "development") {
      return [
        {
          source: "/assets/media/:path*",
          headers: [{ key: "Cache-Control", value: "no-store, max-age=0, must-revalidate" }],
        },
        {
          source: "/planets/:path*",
          headers: [{ key: "Cache-Control", value: "no-store, max-age=0, must-revalidate" }],
        },
      ];
    }
    return [];
  },
};

export default nextConfig;
