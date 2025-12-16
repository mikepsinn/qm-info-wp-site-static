const fs = require('fs');
const cssbeautify = require('cssbeautify');

const inputFile = 'wp-content/themes/kleo/assets/css/app.min.css';
const outputFile = 'wp-content/themes/kleo/assets/css/app.css';

// Read the minified CSS
const minifiedCSS = fs.readFileSync(inputFile, 'utf8');

// Un-minify it
const beautifiedCSS = cssbeautify(minifiedCSS, {
  indent: '  ',
  openbrace: 'end-of-line',
  autosemicolon: true
});

// Fix the problematic line-height rules
let fixedCSS = beautifiedCSS;

// Replace line-height:22px on h1-h6 with line-height:1.2
fixedCSS = fixedCSS.replace(/h1,\s*h2,\s*h3,\s*h4,\s*h5,\s*h6\s*\{[^}]*line-height:\s*22px/g, (match) => {
  return match.replace(/line-height:\s*22px/g, 'line-height: 1.2');
});

// Replace line-height:36px on h2 with line-height:1.2
fixedCSS = fixedCSS.replace(/h2\s*\{[^}]*line-height:\s*36px/g, (match) => {
  return match.replace(/line-height:\s*36px/g, 'line-height: 1.2');
});

// Also fix any other fixed pixel line-heights on headings that might be too small
// h1 line-height:48px is okay for 36px font, but let's make it relative
fixedCSS = fixedCSS.replace(/h1\s*\{[^}]*line-height:\s*48px/g, (match) => {
  return match.replace(/line-height:\s*48px/g, 'line-height: 1.2');
});

// h3 line-height:28px for 22px font is okay, but let's make it relative too
fixedCSS = fixedCSS.replace(/h3\s*\{[^}]*line-height:\s*28px/g, (match) => {
  return match.replace(/line-height:\s*28px/g, 'line-height: 1.2');
});

// Write the fixed CSS
fs.writeFileSync(outputFile, fixedCSS, 'utf8');

console.log(`✅ Un-minified and fixed CSS saved to ${outputFile}`);
console.log(`📝 Fixed line-height issues on h1, h2, h3, h4, h5, h6`);

