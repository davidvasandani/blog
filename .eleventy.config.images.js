const path = require('node:path');
const markdownIt = require('markdown-it');

module.exports = async eleventyConfig => {
  const { default: Image, eleventyImageTransformPlugin } = await import('@11ty/eleventy-img');

  eleventyConfig.addAsyncShortcode('image', async function(src, alt, widths, sizes) {
    const file = path.resolve(path.dirname(this.page.inputPath), src);
    const metadata = await Image(file, {
      widths: widths || ['auto'],
      formats: ['avif', 'webp', 'auto'],
      outputDir: path.join(eleventyConfig.dir.output, 'img'),
    });
    return Image.generateHTML(metadata, { alt, sizes, loading: 'lazy', decoding: 'async', 'eleventy:ignore': '' });
  });

  // Small link-preview copy of the headshot: Slack showed no thumbnail for the 700 KB original, and WhatsApp caps previews near 300 KB.
  eleventyConfig.on('eleventy.before', async ({ directories }) => {
    await Image('authors/david-vasandani.jpg', {
      widths: [600],
      formats: ['jpeg'],
      outputDir: path.join(directories.output, 'img', 'og'),
      filenameFormat: () => 'david-vasandani.jpg',
      sharpJpegOptions: { quality: 82, progressive: false },
    });
  });

  eleventyConfig.setLibrary('md', markdownIt({ html: true, breaks: true, linkify: true }));
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    extensions: 'html',
    widths: [800, 500, 300],
    formats: ['avif', 'webp', 'jpeg'],
    urlPath: '/images/',
    htmlOptions: {
      imgAttributes: { class: 'markdown-image', decoding: 'async', sizes: '100vw' },
    },
  });
};
