module.exports = {
  stories: ['../src/**/*.stories.mdx'],
  addons: [
    {
      name: '@storybook/preset-scss',
      options: {
        cssLoaderOptions: {
          modules: true,
        },
      },
    },
    '@storybook/addon-docs',
  ],
};
