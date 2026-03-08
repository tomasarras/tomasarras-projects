import createNextIntlPlugin from 'next-intl/plugin';
import withBundleAnalyzer from '@next/bundle-analyzer';

const withNextIntl = createNextIntlPlugin();

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  swcMinify: true,
  compress: true,
  optimizeFonts: true,
  
  // Optimizaciones de producción
  productionBrowserSourceMaps: false,
  reactStrictMode: true,
  
  // Optimizaciones de imágenes
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
  
  // Configuración de compilación optimizada
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Optimizaciones experimentales para reducir JavaScript
  experimental: {
    optimizePackageImports: ['framer-motion', '@heroicons/react', '@headlessui/react'],
  },
  
  // Configuración de webpack para reducir archivos JS
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Configuración agresiva para unificar chunks
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: 5,
          maxAsyncRequests: 5,
          minSize: 40000,
          cacheGroups: {
            default: false,
            vendors: false,
            // Framework chunk (React + Next.js)
            framework: {
              name: 'framework',
              chunks: 'all',
              test: /[\\/]node_modules[\\/](react|react-dom|scheduler|next)[\\/]/,
              priority: 40,
              enforce: true,
            },
            // Todas las demás librerías en un solo chunk
            lib: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
              priority: 30,
              enforce: true,
            },
            // Código compartido de la aplicación
            commons: {
              name: 'commons',
              minChunks: 2,
              priority: 20,
              reuseExistingChunk: true,
              enforce: true,
            },
          },
        },
        runtimeChunk: {
          name: 'runtime',
        },
      };
    }
    return config;
  },
  
  async headers() {
    return [
      {
        // Aplicar headers de cache a assets estáticos
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
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
 
export default withNextIntl(bundleAnalyzer(nextConfig));