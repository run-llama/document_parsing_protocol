import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Earlier editions and routes were shared internally; send those links to their current home.
  async redirects() {
    return [
      { source: "/research", destination: "/", permanent: false },
      { source: "/research/decisions", destination: "/decisions", permanent: false },
      { source: "/research/reference", destination: "/#adopt", permanent: false },
      { source: "/research-v:edition(\\d+)/:path*", destination: "/", permanent: false },
      { source: "/story", destination: "/", permanent: false },
      { source: "/original", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;
