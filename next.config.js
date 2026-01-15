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

};

module.exports = nextConfig;
