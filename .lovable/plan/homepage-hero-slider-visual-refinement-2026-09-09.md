# Homepage hero slider visual refinement

## Scope
Update the shared styling used by all three homepage slides without changing copy, routes, layout structure, grid, or component order.

## Changes
- Replace the current image overlays with a left-heavy 100-degree directional scrim that preserves text contrast while revealing more imagery on the right.
- Add shared image brightness, contrast, and saturation treatment.
- Restyle only the secondary “Get a quote” action as a higher-contrast ghost button; leave the cyan primary action unchanged.
- Increase chip definition with the requested translucent background, border, and text contrast.
- Add a 24-second alternating Ken Burns animation to active slide images.
- Change slide opacity transitions to a 500ms crossfade.
- Animate the active text group upward by 20px while fading in over 400ms.
- Disable the Ken Burns and text motion under `prefers-reduced-motion: reduce`, while keeping slide content immediately visible.

## Technical details
- Add semantic hero overlay and translucent-control tokens in the global stylesheet rather than scattering raw color values through the component.
- Keep the existing carousel timing, controls, slide order, and image assets unchanged.
- Use CSS classes and keyframes for motion so reduced-motion behavior is centralized and consistent.

## Verification
- Check all three slides in the live preview at desktop and mobile widths.
- Confirm crossfade, image motion, text entrance, chip styling, and the secondary action states.
- Verify reduced-motion mode removes movement.
- Measure foreground/background contrast across the text area at representative breakpoints and ensure normal text reaches WCAG AA (4.5:1) and large headings reach at least 3:1.
