// next.config.mjs
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};
