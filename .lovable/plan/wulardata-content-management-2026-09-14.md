# WularData Content Management

## Goal
Add a secure content-management area inside the existing administration panel so the current administrator can maintain the public website without changing code. Customers and signed-out visitors can only read published content.

## What will be built

### 1. Secure content store
- Add structured content records for site settings, navigation, footer, homepage sections, standard pages, service pages, FAQs, and calls to action.
- Add structured product/plan records for names, specifications, pricing, billing periods, currency, ordering, visibility, and featured labels.
- Add page records with URL slug, title, SEO title/description, publication status, and ordered sections.
- Preserve the current website content by seeding it as the initial managed content, so the site does not become empty after rollout.
- Add an image library for uploads, replacement, selection, alt text, and deletion.

### 2. Administrator-only permissions
- Public visitors may read only published website content and published images.
- Only authenticated users with the existing `admin` role may create, edit, reorder, publish, unpublish, or delete content and images.
- Content permissions will be enforced in Lovable Cloud, not only hidden in the interface.
- Existing quote, ticket, customer, and profile permissions remain unchanged.

### 3. Content manager in `/admin`
Add a **Content** workspace with:
- **Pages:** create pages, edit URL/title/SEO, publish/unpublish, reorder sections, duplicate, and delete with confirmation.
- **Homepage:** edit slider text/images/buttons, introduction, trust figures, pillars, featured plans, onshore content, benefits, industries, and final call to action.
- **Services & pricing:** edit categories, services, features, FAQs, plan specifications, prices, billing units, currency, visibility, and display order.
- **Header & footer:** edit menu labels/links, quote button, phone/email/location, footer columns, legal links, newsletter text, and social links.
- **Media:** upload, preview, replace, edit alt text, detect usage, and safely delete unused images.
- Clear save, publishing, loading, empty, error, and unsaved-change states; destructive actions require confirmation.

### 4. Public website integration
- Replace hard-coded public copy and pricing with managed content while keeping the present visual design and route structure.
- Keep safe built-in defaults while content is loading or if the content service is temporarily unavailable.
- Render newly created pages through the existing public layout at their chosen slugs.
- Keep hidden and draft pages inaccessible to public visitors.
- Update navigation, footer, contact details, cards, pricing tables, service pages, About, and homepage from the managed content.

### 5. Search and publishing safeguards
- Apply managed SEO title, description, canonical URL, and one H1 per published page.
- Include published custom pages in sitemap generation and exclude drafts, admin, account, and portal pages.
- Prevent reserved or duplicate URLs such as `/admin`, `/auth`, `/portal`, and existing system routes.
- Sanitize rich text and validate links, prices, currency codes, slugs, image types, and file sizes.

### 6. Verification
- Verify the current administrator can create, edit, publish, unpublish, reorder, and delete content.
- Verify a normal customer cannot access content-management data or actions.
- Verify signed-out visitors see only published content.
- Verify image upload/replacement/deletion, pricing and currency updates, header/footer updates, and a newly created page on desktop and mobile.
- Run targeted tests, security checks, and confirm the final build is clean.

## Technical details
- Use Lovable Cloud tables with explicit grants and row-level policies checked through the existing `has_role(auth.uid(), 'admin')` function.
- Store page structure as validated ordered sections, while products/plans and global settings remain structured for reliable filtering and pricing displays.
- Use a public-read/admin-write storage bucket for managed images, plus metadata and usage references in the database.
- Introduce a shared content provider and typed query hooks so all public sections use one cached source of truth.
- Keep the current hand-built specialist layouts; the CMS supplies their content rather than replacing them with a generic visual template.
