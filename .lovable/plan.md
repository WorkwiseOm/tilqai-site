

# Restart: Bilingual Arabic Website Implementation

## What Happened
The previous attempt was interrupted/cancelled before any files were saved. The project currently has:
- No `src/i18n/` directory (no translation files)
- No `src/assets/fonts/` directory (no Arabic fonts)
- No language switcher in the Navbar
- All components still use hardcoded English strings

Everything needs to be built from scratch.

## Implementation Plan (same as approved)

The approved plan remains unchanged. Here is the execution order:

### Phase 1: Foundation
1. Copy font files into `src/assets/fonts/`
2. Create `src/i18n/en.ts` with all English strings from the document
3. Create `src/i18n/ar.ts` with all Arabic translations from the document
4. Create `src/i18n/LanguageContext.tsx` (locale state, `t()` function, localStorage persistence)
5. Update `src/index.css` with `@font-face` declarations and `[lang="ar"]` scoped typography/RTL rules

### Phase 2: App Wiring
6. Wrap app in `LanguageProvider` in `App.tsx`
7. Update `Layout.tsx` to apply `dir` attribute from context

### Phase 3: Component Updates
8. `Navbar.tsx` -- add EN/AR toggle, translate links and CTA, RTL flex
9. `HeroSection.tsx` -- translate strings, RTL column swap
10. `PipelineSection.tsx` -- translate strings, RTL step direction
11. `ROISimulator.tsx` -- translate all fields, dropdowns, results, arrow direction
12. `FooterCTA.tsx` -- translate heading and button
13. `ServiceTabs.tsx` -- translate 8 services, RTL panel layout
14. `Services.tsx` -- translate header, departments, bottom CTA
15. `Pricing.tsx` -- translate header, tiers, comparison table, add-ons
16. `About.tsx` -- translate mission, founder, values, bottom CTA

### Technical Notes
- Hacen Beirut Heading at `font-weight: 400` only (inherently bold)
- KFGQPC Uthman Taha Naskh for body text
- CSS logical properties where possible for automatic RTL flipping
- Directional arrows conditionally rendered based on locale
- Western numerals preserved for pricing
- Document content is the single source of truth for both languages

