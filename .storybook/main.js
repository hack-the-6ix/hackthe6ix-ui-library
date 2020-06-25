module.exports = {
  stories: ['../src/**/*.stories.mdx'],
  addons: [
    {
      name: '@storybook/preset-scss',
      options: {
        cssLoaderOptions: {
          modules: {
            localIdentName: '[local]-[hash:base64:6]',
          },
          importLoaders: 1,
        },
      },
    },
    '@storybook/addon-docs',
  ],
};
