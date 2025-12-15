module.exports = function(eleventyConfig) {

  // Copy static assets to output
  eleventyConfig.addPassthroughCopy("wp-content");
  eleventyConfig.addPassthroughCopy("wp-includes");
  eleventyConfig.addPassthroughCopy("static");
  eleventyConfig.addPassthroughCopy("imgs");
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("CNAME");
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPassthroughCopy("sitemap.xml");
  eleventyConfig.addPassthroughCopy("**/*.png");
  eleventyConfig.addPassthroughCopy("**/*.jpg");
  eleventyConfig.addPassthroughCopy("**/*.gif");
  eleventyConfig.addPassthroughCopy("**/*.ico");

  // Ignore files we don't want to process
  eleventyConfig.ignores.add("node_modules/**");
  eleventyConfig.ignores.add("perfect-your-life/**");
  eleventyConfig.ignores.add("update-app-urls.ps1");
  eleventyConfig.ignores.add("update-app-urls.sh");
  eleventyConfig.ignores.add("package.json");
  eleventyConfig.ignores.add("package-lock.json");
  eleventyConfig.ignores.add(".git/**");

  return {
    dir: {
      input: ".",            // Use current directory as input
      output: "_site",       // Built site goes to _site
      includes: "_includes", // Template includes
      data: "_data"          // Data files
    },
    templateFormats: ["html", "njk", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
