#!/usr/bin/env node

/**
 * Fix HTML Entities Script
 *
 * This script systematically finds and replaces HTML entities in all HTML files
 * across the site. It's particularly useful for fixing entities that appear in
 * YAML frontmatter and meta tags where they can cause display issues.
 *
 * Usage:
 *   node scripts/fix-html-entities.js [--dry-run]
 */

const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

// Configuration
const HTML_ENTITIES = {
  // Quotation marks
  '&#8216;': "'",  // Left single quotation mark
  '&#8217;': "'",  // Right single quotation mark (curly apostrophe)
  '&#8220;': '"',  // Left double quotation mark
  '&#8221;': '"',  // Right double quotation mark
  '&lsquo;': "'",  // Left single quotation mark (named entity)
  '&rsquo;': "'",  // Right single quotation mark (named entity)
  '&ldquo;': '"',  // Left double quotation mark (named entity)
  '&rdquo;': '"',  // Right double quotation mark (named entity)

  // Dashes
  '&#8211;': '–',  // En dash
  '&#8212;': '—',  // Em dash
  '&ndash;': '–',  // En dash (named entity)
  '&mdash;': '—',  // Em dash (named entity)

  // Other common entities
  '&nbsp;': ' ',   // Non-breaking space (in YAML frontmatter, use regular space)
  '&#160;': ' ',   // Non-breaking space (numeric)
};

// Track statistics
const stats = {
  filesScanned: 0,
  filesModified: 0,
  totalReplacements: 0,
  replacementsByEntity: {}
};

/**
 * Replace HTML entities in text
 */
function replaceEntities(text) {
  let modified = text;
  let replacements = 0;

  for (const [entity, replacement] of Object.entries(HTML_ENTITIES)) {
    const regex = new RegExp(entity, 'g');
    const matches = (modified.match(regex) || []).length;

    if (matches > 0) {
      modified = modified.replace(regex, replacement);
      replacements += matches;
      stats.replacementsByEntity[entity] = (stats.replacementsByEntity[entity] || 0) + matches;
    }
  }

  return { modified, replacements };
}

/**
 * Process a single HTML file
 */
function processFile(filePath, dryRun = false) {
  stats.filesScanned++;

  const content = fs.readFileSync(filePath, 'utf8');
  const { modified, replacements } = replaceEntities(content);

  if (replacements > 0) {
    stats.filesModified++;
    stats.totalReplacements += replacements;

    console.log(`✓ ${path.relative(process.cwd(), filePath)}: ${replacements} replacement(s)`);

    if (!dryRun) {
      fs.writeFileSync(filePath, modified, 'utf8');
    }
  }
}

/**
 * Main execution
 */
async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');

  console.log('🔍 Scanning for HTML files with HTML entities...\n');

  if (dryRun) {
    console.log('⚠️  DRY RUN MODE - No files will be modified\n');
  }

  // Find all HTML files (excluding node_modules and other common excludes)
  const files = await glob('**/*.html', {
    ignore: [
      'node_modules/**',
      '_site/**',
      'dist/**',
      '.git/**',
      '*.min.html'
    ]
  });

  console.log(`Found ${files.length} HTML file(s) to scan\n`);

  // Process each file
  for (const file of files) {
    try {
      processFile(file, dryRun);
    } catch (error) {
      console.error(`✗ Error processing ${file}: ${error.message}`);
    }
  }

  // Print summary
  console.log('\n' + '='.repeat(60));
  console.log('Summary:');
  console.log('='.repeat(60));
  console.log(`Files scanned:    ${stats.filesScanned}`);
  console.log(`Files modified:   ${stats.filesModified}`);
  console.log(`Total replacements: ${stats.totalReplacements}`);

  if (Object.keys(stats.replacementsByEntity).length > 0) {
    console.log('\nReplacements by entity:');
    for (const [entity, count] of Object.entries(stats.replacementsByEntity).sort((a, b) => b[1] - a[1])) {
      console.log(`  ${entity.padEnd(10)} → ${HTML_ENTITIES[entity].padEnd(5)} (${count}x)`);
    }
  }

  if (dryRun && stats.filesModified > 0) {
    console.log('\n⚠️  This was a dry run. Run without --dry-run to apply changes.');
  } else if (stats.filesModified > 0) {
    console.log('\n✅ All changes applied successfully!');
  } else {
    console.log('\n✓ No HTML entities found that need fixing.');
  }
}

// Run the script
main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
