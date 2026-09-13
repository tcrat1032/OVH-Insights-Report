# Fix the `/home` URL

## Implementation
- Add `/home` as a route to the existing WularData landing page.
- Keep `/` as the primary homepage and preserve all current page URLs.
- Verify `/home` opens the landing page directly and no longer shows the 404 screen.

## Technical details
- Reuse the existing homepage component in the app router; no duplicate page or content will be created.
