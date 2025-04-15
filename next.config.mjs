import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
//TODO origins
const nextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        // Routes this applies to
        source: "/api/(.*)",
        // Headers
        headers: [
          {
            key: "Access-Control-Allow-Credentials",
            value: "true"
          },
          {
            key: "Access-Control-Expose-Headers",
            value: "Access-Control-Allow-Origin"
          },
          // Allow for specific domains to have access or * for all
          {
            key: "Access-Control-Allow-Origin",
            value: process.env.ALLOWED_ORIGIN,
            // DOES NOT WORK
            // value: process.env.ALLOWED_ORIGIN,
          },
          // Allows for specific methods accepted
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers", 
            value: "X-CSRF-Token, Authorization, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
          },
        ],
      },
    ];
  },
};
 
export default withNextIntl(nextConfig);