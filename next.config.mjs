// next.config.mjs
// eslint-disable-next-line import/no-anonymous-default-export

const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'drive.google.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'secure.meetupstatic.com',
        port: '',
        pathname: '/**',
      },
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'a.slack-edge.com',
        port: '',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
