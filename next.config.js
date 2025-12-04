const nextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true,
    domains: [], // Add your image domains here
  },
  experimental: {
    serverComponentsExternalPackages: ['mongodb'],
  },
  webpack(config, { dev }) {
    if (dev) {
      // Reduce CPU/memory from file watching in development
      config.watchOptions = {
        poll: 2000,
        aggregateTimeout: 300,
        ignored: ['**/node_modules'],
      };
    }
    return config;
  },
  // Only apply these in development to reduce memory usage
  ...(process.env.NODE_ENV !== 'production' && {
    onDemandEntries: {
      maxInactiveAge: 10000,
      pagesBufferLength: 2,
    },
  }),
  async headers() {
    const isDevelopment = process.env.NODE_ENV !== 'production';

    return [
      {
        source: "/(.*)",
        headers: [
          // Security headers for production
          {
            key: "X-Frame-Options",
            value: isDevelopment ? "ALLOWALL" : "SAMEORIGIN"
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff"
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block"
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin"
          },
          {
            key: "Content-Security-Policy",
            value: isDevelopment
              ? "frame-ancestors *;"
              : "frame-ancestors 'self';"
          },
          // CORS headers
          {
            key: "Access-Control-Allow-Origin",
            value: process.env.CORS_ORIGINS || (isDevelopment ? "*" : "")
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS"
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization"
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
