# Project Architecture Decisions

- Authentication email and social-login redirects use `https://wulardata.com` rather than the current browser origin, so links never point to preview or legacy hosting domains.
- Legal documents are rendered from the raw Markdown files in `src/content/legal`; keep those files as the single source of truth so legal wording is never duplicated or transformed.