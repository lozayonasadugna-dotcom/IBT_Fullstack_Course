/** @type {import('next').Next.jsConfig} */
const nextConfig = {
  // Disables strict static optimization triggers causing workStore issues in v16
  experimental: {
    // forces dynamic server handling where needed
  },
};

export default nextConfig;