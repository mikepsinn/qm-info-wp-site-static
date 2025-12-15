const fs = require('fs');
const path = require('path');
const glob = require('glob');

console.log('Starting 11ty migration...\n');

// Read the template file (index.html)
const templateFile = 'index.html';
const templateContent = fs.readFileSync(templateFile, 'utf8');

// Find the markers
const headerEndMarker = '<!-- MAIN SECTION';
const footerStartMarker = '<!--END MAIN SECTION-->';

const headerEndIndex = templateContent.indexOf(headerEndMarker);
const footerStartIndex = templateContent.indexOf(footerStartMarker);

if (headerEndIndex === -1 || footerStartIndex === -1) {
  console.error('Could not find markers in template file!');
  process.exit(1);
}

// Extract header and footer
const header = templateContent.substring(0, headerEndIndex + headerEndMarker.length);
const footer = templateContent.substring(footerStartIndex);

console.log(`Header: ${header.split('\n').length} lines`);
console.log(`Footer: ${footer.split('\n').length} lines\n`);

// Create _includes directory if it doesn't exist
if (!fs.existsSync('_includes')) {
  fs.mkdirSync('_includes');
}

// Save header and footer as includes
fs.writeFileSync('_includes/header.njk', header);
fs.writeFileSync('_includes/footer.njk', footer);

console.log('✓ Created _includes/header.njk');
console.log('✓ Created _includes/footer.njk\n');

// Find all HTML files (excluding node_modules, _site, perfect-your-life)
const htmlFiles = glob.sync('**/*.html', {
  ignore: [
    'node_modules/**',
    '_site/**',
    '_includes/**',
    'perfect-your-life/**'
  ]
});

console.log(`Found ${htmlFiles.length} HTML files to migrate\n`);

let migratedCount = 0;

// Process each HTML file
htmlFiles.forEach(file => {
  try {
    let content = fs.readFileSync(file, 'utf8');

    // Find markers in this file
    const fileHeaderEndIndex = content.indexOf(headerEndMarker);
    const fileFooterStartIndex = content.indexOf(footerStartMarker);

    if (fileHeaderEndIndex === -1 || fileFooterStartIndex === -1) {
      console.log(`⚠ Skipping ${file} - markers not found`);
      return;
    }

    // Extract the main content (between header and footer)
    const mainContent = content.substring(
      fileHeaderEndIndex + headerEndMarker.length,
      fileFooterStartIndex
    );

    // Build new content with includes
    const newContent = `{% include "header.njk" %}\n${mainContent}\n{% include "footer.njk" %}`;

    // Write the new content
    fs.writeFileSync(file, newContent);

    migratedCount++;
    console.log(`✓ Migrated ${file}`);

  } catch (error) {
    console.error(`✗ Error processing ${file}:`, error.message);
  }
});

console.log(`\n✅ Migration complete! ${migratedCount} files migrated.`);
console.log('\nNext steps:');
console.log('1. Run: npm run build');
console.log('2. Check output in _site/ directory');
console.log('3. Update .gitignore to exclude _site/');
