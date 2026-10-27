const { readResume } = require('../scripts/resume-page.cjs');

// Publish /resume/ (and its nav link) only when the resume has been rendered.
module.exports = () => {
  const resume = readResume();
  return {
    resume,
    permalink: resume ? '/resume/index.html' : false,
    eleventyExcludeFromCollections: !resume,
    eleventyNavigation: resume ? { key: 'Resume', order: 2 } : undefined,
  };
};
