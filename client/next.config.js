/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    config.externals.push({
      sharp: 'commonjs sharp',
      canvas: 'commonjs canvas',
    })

    return config
  },
  rewrites: async () => {
    return [
      {
        source: '/image/:path*',
        destination: 'https://res.cloudinary.com/:path*',
      },
    ]
  },
}

module.exports = nextConfig
