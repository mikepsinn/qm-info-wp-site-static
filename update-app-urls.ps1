# PowerShell script to replace deprecated app.quantimo.do URLs with new destinations
# Run from the project root directory

Write-Host "Starting URL replacements..." -ForegroundColor Green

# Find all HTML files
$htmlFiles = Get-ChildItem -Path . -Filter *.html -Recurse -File

foreach ($file in $htmlFiles) {
    Write-Host "Processing: $($file.FullName)"

    # Read file content
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8

    # 1. Replace API Explorer URL
    $content = $content -replace 'https://app\.quantimo\.do/api/v2/account/api-explorer', 'https://docs.dfda.earth'

    # 2. Replace Web App reminders-inbox URL with base app URL
    $content = $content -replace 'https://app\.quantimo\.do/ionic/Modo/www/index\.html#/app/reminders-inbox', 'https://app.quantimo.do/'

    # 3. Replace embedded iframe with link to studies (handle both & and &amp;)
    $iframePattern1 = '<iframe src="https://app\.quantimo\.do/embeddable/\?plugin=search-relationships&outcome=Overall%20Mood&commonOrUser=common"[^>]*></iframe>'
    $iframePattern2 = '<iframe src="https://app\.quantimo\.do/embeddable/\?plugin=search-relationships&amp;outcome=Overall%20Mood&amp;commonOrUser=common"[^>]*></iframe>'
    $buttonReplacement = '<a href="https://studies.quantimo.do/" style="display: inline-block; background: #FF0066; color: white; padding: 20px 40px; border: 4px solid #000; box-shadow: 6px 6px 0 #000; font-family: ' + "'" + 'Raleway' + "'" + ', sans-serif; font-weight: 700; font-size: 24px; text-transform: uppercase; text-decoration: none; letter-spacing: 1px;">Browse All 50,000+ Studies</a>'
    $content = $content -replace $iframePattern1, $buttonReplacement
    $content = $content -replace $iframePattern2, $buttonReplacement

    # 4. Replace Developer Portal apps URLs
    $content = $content -replace 'https://app\.quantimo\.do/api/v2/apps#?', 'https://builder.quantimo.do'

    # Write back to file
    [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
}

Write-Host ""
Write-Host "URL replacements complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Summary of changes:"
Write-Host "- API Explorer to docs.dfda.earth"
Write-Host "- Web App to app.quantimo.do (base URL)"
Write-Host "- Embedded iframe to studies.quantimo.do button"
Write-Host "- Developer Portal to builder.quantimo.do"
