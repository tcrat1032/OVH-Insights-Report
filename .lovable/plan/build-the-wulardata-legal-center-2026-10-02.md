# Build the WularData legal center

## Scope
- Add `/legal` and eight legal-document routes using the nine existing markdown files without changing their wording.
- Render GitHub-style tables, internal links, headings with deep-link IDs, and the existing site header and footer.
- Add desktop sidebar navigation, a mobile document selector, breadcrumbs, and print support.
- Set route-specific titles, descriptions, canonical URLs, and social metadata through the existing SEO helper.
- Add all nine public legal URLs to the generated sitemap and point the footer Privacy, Terms, and Cookies links to their legal pages.

## Technical details
- Install `react-markdown` and `remark-gfm`.
- Create a single route-aware `LegalPage` that maps valid slugs to raw markdown imports and delegates unknown slugs to the existing 404 page.
- Use custom markdown renderers for router-aware internal links, slugged H2 headings, accessible tables, and the special last-updated presentation.
- Add scoped legal-page and print styles to the global stylesheet.
- Verify desktop/mobile rendering, navigation, document tables, one H1 per page, canonical metadata, unknown-slug handling, and a clean preview build.
