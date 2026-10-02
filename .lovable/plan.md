# Cookie consent controls

## Scope
- Add a lightweight first-visit cookie banner with the supplied wording, Cookie Policy link, and three actions.
- Add a compact settings dialog with Essential fixed on and Analytics/Marketing choices.
- Save consent safely in `localStorage` as `wd_cookie_consent`, including category values and a timestamp.
- Load Google Analytics only after Analytics consent; no marketing scripts will load unless Marketing is accepted.
- Add a footer “Cookie settings” control that reopens the dialog from any public page.
- Keep the banner compact and mobile-safe so footer content remains reachable.

## Technical details
- Use a small React context/provider so the banner, settings dialog, footer, and script consent share one state.
- Remove the unconditional Google Analytics snippet from the document head and inject it client-side only after consent.
- Use the existing Button, Dialog, and Switch components and existing semantic design tokens.
- Verify first visit, accept, reject, custom settings, persistence, footer reopening, analytics gating, and mobile presentation.
