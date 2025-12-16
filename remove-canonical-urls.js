const fs = require('fs');
const glob = require('glob');

// Find all HTML files
const files = glob.sync('**/index.html', {
  ignore: ['node_modules/**', '_site/**', 'dark-website/**']
});

let fixed = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  const original = content;

  // Remove canonicalUrl lines from frontmatter
  content = content.replace(/^canonicalUrl:.*$/gm, '');

  // Clean up any double blank lines in frontmatter
  content = content.replace(/\n\n\n/g, '\n\n');

  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log(`Fixed: ${file}`);
    fixed++;
  }
});

console.log(`\nRemoved canonicalUrl from ${fixed} files`);
