module.exports = function(eleventyConfig) {

  // Copy assets and other files
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("images");

  // Ignore conversion scripts
  eleventyConfig.ignores.add("node_modules/**");
  eleventyConfig.ignores.add("convert-to-11ty.js");
  eleventyConfig.ignores.add("replace-headers.js");

  // Ignore files that couldn't be converted
  eleventyConfig.ignores.add("join-us.html");
  eleventyConfig.ignores.add("gitcoin.html");
  eleventyConfig.ignores.add("feedback.html");
  eleventyConfig.ignores.add("discord.html");
  eleventyConfig.ignores.add("collaborate.html");
  eleventyConfig.ignores.add("calendar.html");
  eleventyConfig.ignores.add("bugs-embedded.html");
  eleventyConfig.ignores.add("blog-category/*.html");

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["html", "njk", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    serverOptions: {
      port: 8082
    }
  };
};
