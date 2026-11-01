const { build } = require('esbuild');
module.exports = () => build({
  entryPoints: ['src/siteping.js'], outdir: '_site/assets/siteping',
  bundle: true, splitting: true, format: 'esm', platform: 'browser', target: 'es2022',
  minify: true, define: { 'process.env.NODE_ENV': '"production"' },
});
