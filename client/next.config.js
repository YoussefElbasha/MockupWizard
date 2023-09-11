/** @type {import('next').NextConfig} */
if (
  process.env.LD_LIBRARY_PATH == null ||
  !process.env.LD_LIBRARY_PATH.includes(
    `${process.env.PWD}/node_modules/canvas/build/Release:`
  )
) {
  process.env.LD_LIBRARY_PATH = `${
    process.env.PWD
  }/node_modules/canvas/build/Release:${process.env.LD_LIBRARY_PATH || ''}`
}

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
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
