const { DateTime } = require("luxon"); // commonConfig

module.exports = function (eleventyConfig) {
  // console.log("### elevenyConfig: ", eleventyConfig);

  // eleventyConfig = commonConfig(eleventyConfig);
  // TODO: add to commonConfig
  // Date formatting (machine readable)
  eleventyConfig.addFilter("machineDate", dateObj => {
    return DateTime.fromJSDate(dateObj).toFormat("yyyy-MM-dd");
  });

  eleventyConfig.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj).toFormat("dd LLL yyyy");
  });

  eleventyConfig.setLibrary('md', {
    permalink: (_, inputPath) => {
      return inputPath.substr(0, inputPath.lastIndexOf('.')) + '.gmi';
    },
    render: async (data) => {
      const gemdown = await import('gemdown');
      return gemdown.md2gemini(data);
    },
  });

  eleventyConfig.addGlobalData('eleventyComputed', {
    permalink: data => {
      if (data.permalink && data.permalink.endsWith('.html')) {
        return data.permalink.replace('.html', '.gmi');
      }
      return data.permalink;
    },
  });

  eleventyConfig.addGlobalData('isGemini', true);

  eleventyConfig.addTransform('unescape-html', function (content) {
    // HTML escapes don't make any sense in Gemini content.
    return content
      .replaceAll('&gt;', '>')
      .replaceAll('&lt;', '<')
      .replaceAll('&quot;', '"')
      .replaceAll('&amp;', '&');
  });

  eleventyConfig.ignores.add('all.md');
  eleventyConfig.ignores.add('404.md');
  // eleventyConfig.ignores.add('**/*.njk');
  eleventyConfig.ignores.add('/pages/**');
  eleventyConfig.ignores.add('admin/**');
  eleventyConfig.ignores.add('authors/**');
  eleventyConfig.ignores.add('author.njk');
  eleventyConfig.ignores.add('authors.njk');
  eleventyConfig.ignores.add('tags.njk');
  eleventyConfig.ignores.add('_includes/**');
  eleventyConfig.ignores.add('layouts/**');
  eleventyConfig.ignores.add('assets/*');
  eleventyConfig.ignores.add('index.html');
  // eleventyConfig.addPassthroughCopy('./index.gmi');

  return {
    dir: {
      input: './',
      output: '_gemini',
      layouts: 'gemini',
      includes: 'gemini',
      data: '_data',
    },
  };
};