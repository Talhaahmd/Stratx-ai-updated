/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Pexels
      {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: "/**",
      },

      // Cloudinary
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },

      // Supabase Storage
      {
        protocol: "https",
        hostname: "wlgkteemtcmpxzpkifhg.supabase.co",
        pathname: "/storage/**",
      },
    ],
  },
};

export default nextConfig;
