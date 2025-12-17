#!/bin/bash

# Script to replace deprecated app.QuAnTiMo.Do URLs with new destinations
# Run from the project root directory

echo "Starting URL replacements..."

# Find all HTML files
find . -type f -name "*.html" | while read -r file; do
    echo "Processing: $file"

    # 1. Replace API Explorer URL
    sed -i 's|https://app\.quantimo\.do/api/v2/account/api-explorer|https://docs.dfda.earth|g' "$file"

    # 2. Replace Web App reminders-inbox URL with base app URL
    sed -i 's|https://app\.quantimo\.do/ionic/Modo/www/index\.html#/app/reminders-inbox|https://app.QuAnTiMo.Do/|g' "$file"

    # 3. Replace embedded iframe with link to studies
    sed -i 's|<iframe src="https://app\.quantimo\.do/embeddable/?plugin=search-relationships&outcome=Overall%20Mood&commonOrUser=common"[^>]*></iframe>|<a href="https://studies.QuAnTiMo.Do/" style="display: inline-block; background: #FF0066; color: white; padding: 20px 40px; border: 4px solid #000; box-shadow: 6px 6px 0 #000; font-family: '"'"'Raleway'"'"', sans-serif; font-weight: 700; font-size: 24px; text-transform: uppercase; text-decoration: none; letter-spacing: 1px;">Browse All 50,000+ Studies →</a>|g' "$file"

    # 4. Replace Developer Portal apps URL
    sed -i 's|https://app\.quantimo\.do/api/v2/apps#|https://builder.QuAnTiMo.Do|g' "$file"
    sed -i 's|https://app\.quantimo\.do/api/v2/apps|https://builder.QuAnTiMo.Do|g' "$file"

done

echo "URL replacements complete!"
echo ""
echo "Summary of changes:"
echo "- API Explorer → docs.dfda.earth"
echo "- Web App → app.QuAnTiMo.Do (base URL)"
echo "- Embedded iframe → studies.QuAnTiMo.Do button"
echo "- Developer Portal → builder.QuAnTiMo.Do"
