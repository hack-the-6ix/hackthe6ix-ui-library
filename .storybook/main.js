const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.mdx'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-docs',
  ],
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        'style-loader',
        {
          loader: require.resolve('css-loader'),
          options: {
            importLoaders: 1,
            modules: true,
          },
        },
        'sass-loader',
      ],
      include: [
        path.resolve(__dirname, './index.scss'),
        path.resolve(__dirname, '../src'),
      ],
    });

    return config;
  },
};
