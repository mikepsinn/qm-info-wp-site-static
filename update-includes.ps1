# PowerShell script to replace hardcoded email addresses and GitHub links with includes

$files = Get-ChildItem -Path . -Filter "*.html" -Recurse -File | Where-Object { $_.FullName -notlike "*\_site\*" }

$totalUpdated = 0

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $originalContent = $content

    # Replace GitHub links (various formats)
    $content = $content -replace '<a\s+href="https://github\.com/decentralized-fda"[^>]*>GitHub</a>', '{% include "github-link.njk" %}'
    $content = $content -replace '<a\s+href="https://github\.com/decentralized-fda"[^>]*>github\.com/decentralized-fda</a>', '{% include "github-link.njk" %}'

    # Replace email addresses in page headers like: <i class="icon-mail-alt"></i> m@quantimo.do
    $content = $content -replace '<i class="icon-mail-alt"></i>\s+m@quantimo\.do', '<i class="icon-mail-alt"></i> {% include "contact-email.njk" %}'
    $content = $content -replace '<i class="icon-mail-alt"></i>\s+development@quantimo\.do', '<i class="icon-mail-alt"></i> {% include "contact-email.njk" %}'

    # Replace email in text like "contact us at m@quantimo.do"
    $content = $content -replace '\bat m@quantimo\.do([.,)])', 'at {% include "contact-email.njk" %}$1'
    $content = $content -replace '\bat development@quantimo\.do([.,)])', 'at {% include "contact-email.njk" %}$1'

    # Replace standalone email addresses (not already in includes)
    $content = $content -replace '(?<!include ")m@quantimo\.do(?![@\w])', '{% include "contact-email.njk" %}'
    $content = $content -replace '(?<!include ")development@quantimo\.do(?![@\w])', '{% include "contact-email.njk" %}'

    # Replace mailto links
    $content = $content -replace '<a\s+href="mailto:m@quantimo\.do[^"]*"[^>]*>m@quantimo\.do</a>', '{% include "contact-email.njk" %}'
    $content = $content -replace '<a\s+href="mailto:development@quantimo\.do[^"]*"[^>]*>development@quantimo\.do</a>', '{% include "contact-email.njk" %}'

    if ($content -ne $originalContent) {
        Set-Content -Path $file.FullName -Value $content -NoNewline
        Write-Host "Updated: $($file.FullName)"
        $totalUpdated++
    }
}

Write-Host "`nReplacement complete! Updated $totalUpdated files."
