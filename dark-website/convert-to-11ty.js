const fs = require('fs');
const path = require('path');

// Read index.html
const indexPath = path.join(__dirname, 'index.html');
const html = fs.readFileSync(indexPath, 'utf8');

// Find the header section (from <body> to end of </nav></div></div></div>)
const bodyStart = html.indexOf('<body');
const headerEnd = html.indexOf('</div></div></div></div><section bind="68ca7fc0');
const headerHtml = html.substring(bodyStart, headerEnd + '</div></div></div></div>'.length);

// Find the footer section (from <footer to </body>)
const footerStart = html.indexOf('<footer bind="1356e90d');
const bodyEnd = html.indexOf('</body>') + '</body>'.length;
const footerHtml = html.substring(footerStart, bodyEnd);

// Find the head section
const headStart = html.indexOf('<!DOCTYPE');
const headEnd = html.indexOf('</head>') + '</head>'.length;
const headHtml = html.substring(headStart, headEnd);

// Create _includes directory if it doesn't exist
const includesDir = path.join(__dirname, '_includes');
if (!fs.existsSync(includesDir)) {
    fs.mkdirSync(includesDir);
}

// Write header.njk
fs.writeFileSync(
    path.join(includesDir, 'header.njk'),
    headHtml + '\n' + headerHtml
);

// Write footer.njk
fs.writeFileSync(
    path.join(includesDir, 'footer.njk'),
    footerHtml
);

// Extract the main content (between header and footer)
const mainContent = html.substring(headerEnd + '</div></div></div></div>'.length, footerStart);

console.log('✓ Created _includes/header.njk');
console.log('✓ Created _includes/footer.njk');
console.log('✓ Main content extracted');
console.log('\nNext: Run the replace script to update all HTML files');
