module.exports = function(eleventyConfig) {

  // Copy entire directories (more efficient than glob patterns)
  eleventyConfig.addPassthroughCopy("wp-content");
  eleventyConfig.addPassthroughCopy("wp-includes");
  eleventyConfig.addPassthroughCopy("CNAME");
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPassthroughCopy("sitemap.xml");

  // Ignore files we don't want to process
  eleventyConfig.ignores.add("node_modules/**");
  eleventyConfig.ignores.add("perfect-your-life/**");
  eleventyConfig.ignores.add("dark-website/**");
  eleventyConfig.ignores.add("update-app-urls.ps1");
  eleventyConfig.ignores.add("update-app-urls.sh");
  eleventyConfig.ignores.add("migrate-to-11ty.js");
  eleventyConfig.ignores.add("package.json");
  eleventyConfig.ignores.add("package-lock.json");
  eleventyConfig.ignores.add(".git/**");
  eleventyConfig.ignores.add("README.md");

  return {
    dir: {
      input: ".",            // Use current directory as input
      output: "_site",       // Built site goes to _site
      includes: "_includes", // Template includes
      data: "_data"          // Data files
    },
    templateFormats: ["html", "njk", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    serverOptions: {
      port: 8081             // Use port 8081 instead of default 8080
    }
  };
};
