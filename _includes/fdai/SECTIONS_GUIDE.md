# FDAi Sections Guide

All 58 sections from fdai.earth have been downloaded, split, and renamed with meaningful names.

## Core Content Sections

### Hero & Introduction
- `entry-content.njk` - Main entry content wrapper
- `here8217s-why.njk` - "Here's why" intro section
- `2-billion-people-are-suffering.njk` - Opening suffering statistics
- `since-the-19908217s-we8217ve-seen-a-continual-rise.njk` - Disease trend analysis
- `80-of-clinical-trials-fail-due-to-insufficient-par.njk` - Clinical trials failure stats

### Vision & Solution
- `but-imagine-if-we-could-automate-clinical-research.njk` - Automation vision

## 1. Automated Data Collection
- `import-from-wearables-and-apps.njk` - Wearable/app integration
- `browser-ai-agents.njk` - AI agent data collection
- `manual-data-collection.njk` - Manual input options
- `data-from-speech.njk` - Voice-based data entry
- `images-to-data.njk` - Image-to-data conversion
- `notifications.njk` - Smart reminders

## 2. Automated Data Analysis
- `2-automated-data-.njk` - Section header
- `automated-causal-.njk` - Causal inference automation
- `-personal-.njk` - Personalized analysis
- `onset-delays.njk` - Onset delay analysis
- `-discovering-.njk` - Discovery mechanisms

## 3. Effortless Trial Participation
- `3-effortless-trial-.njk` - Section header
- `through-automated.njk` - Automation benefits
- `1-trial-search.njk` - Trial discovery
- `2-trial-enrollment.njk` - One-click enrollment
- `3-data-collection.njk` - Passive data sharing
- `4-data-analysis-and-publishing.njk` - Results publishing
- `citizen-science.njk` - Citizen science platform
- `global-scale-studies.njk` - Global mega-studies
- `mega-studies.njk` - Mega-study capabilities
- `outcome-labels.njk` - Outcome labeling system

## Call to Action
- `fdai-act-cta.njk` - FDAi Act support call-to-action

## Layout & Structure (WordPress blocks)
- `wp-site-blocks.njk` - Main site blocks wrapper
- `wp-block-group.njk` through `wp-block-group-6.njk` - Content group containers
- `wp-block-column.njk` through `wp-block-column-12.njk` - Column layouts
- `wp-block-columns.njk`, `wp-block-columns-1.njk`, `wp-block-columns-2.njk` - Column wrappers
- `wp-block-media-text.njk` - Media with text block
- `modal-1.njk` - Modal dialog

## Footer
- `footer-logo.njk` - Footer logo section
- `footer-nav.njk` - Footer navigation links
- `footer-copyright.njk` - Copyright notice

## Technical Components
- `jetpack-search.njk` - Jetpack search widget
- `lightbox-1.njk`, `lightbox-2.njk` - Lightbox image viewers
- `nsl-redirect.njk` - NextScripts social login redirect

## Usage

Include all sections:
```njk
{% include "fdai/all-sections.njk" %}
```

Include specific sections:
```njk
{% include "fdai/2-billion-people-are-suffering.njk" %}
{% include "fdai/automated-causal-.njk" %}
{% include "fdai/citizen-science.njk" %}
```

## Files

- **Total sections**: 58 individual .njk files
- **Master include**: all-sections.njk
- **Images**: 88 images in fdai-homepage/images/
- **All image paths**: Updated to /fdai-homepage/images/
