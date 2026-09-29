# Project Architecture Decisions

- Authentication email and social-login redirects use `https://wulardata.com` rather than the current browser origin, so links never point to preview or legacy hosting domains.