/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['@azure/cosmos', '@azure/identity'],
  images: {
    domains: ['images.unsplash.com', 'cdn.flightvision2030.com'],
    unoptimized: process.env.NODE_ENV === 'development'
  },
  env: {
    AZURE_OPENAI_ENDPOINT: process.env.AZURE_OPENAI_ENDPOINT,
    AZURE_OPENAI_KEY: process.env.AZURE_OPENAI_KEY,
    COSMOS_DB_ENDPOINT: process.env.COSMOS_DB_ENDPOINT,
    REDIS_CONNECTION_STRING: process.env.REDIS_CONNECTION_STRING
  },
  headers: async () => {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' }
        ]
      }
    ]
  }
}

module.exports = nextConfig
