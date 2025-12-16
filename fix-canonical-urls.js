const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Find all HTML files
const files = glob.sync('**/index.html', {
  ignore: ['node_modules/**', '_site/**', 'dark-website/**']
});

let fixed = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // Fix backslashes in canonicalUrl
  const original = content;
  content = content.replace(
    /canonicalUrl: "([^"]*?)\\([^"]*?)"/g,
    (match, before, after) => `canonicalUrl: "${before}/${after}"`
  );

  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log(`Fixed: ${file}`);
    fixed++;
  }
});

console.log(`\nFixed ${fixed} files`);
