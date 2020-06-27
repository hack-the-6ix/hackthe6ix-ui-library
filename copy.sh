mkdir dist
cp -r src/. dist/
cp -r static/ dist/
cp package.json dist/
cp package-lock.json dist/
rm -rf dist/index.scss dist/**/*.stories.mdx