# INSP AUTO Design Direction

## Ground-truth reference
The supplied reference is https://primeinspectors.co.uk/. Its visual and UX role is the ground truth for the overall page rhythm: compact sticky header, dark automotive hero, light policy cards below the hero, editorial section progression, service tiles, premium pricing presentation, trust/value section, final CTA, and a deep multi-column footer. INSP AUTO will preserve the experience and information architecture while using original branding, original copy, original graphic assets, and UK-specific wording.

## Design Movement
Reference-led automotive editorial minimalism: a restrained, high-contrast vehicle-report interface that combines inspection-document clarity with the atmosphere of a premium automotive brand.

## Core Principles
1. **Evidence before hype.** The interface should feel like a trustworthy report companion, with clear labels, measured claims, and practical CTAs.
2. **Dark-to-light narrative.** Open with a cinematic, low-key automotive hero, then transition into bright report-like sections for comprehension and comparison.
3. **Asymmetric editorial rhythm.** Use offset text blocks, clipped image panels, thin rules, and staggered cards rather than a generic centered SaaS grid.
4. **Quiet motion.** Use short, purposeful reveals, card lift, dropdown transitions, and counter motion without turning the experience into a motion demo.

## Color Philosophy
The signature color is **Inspection Amber `#D99A32`**, chosen to evoke road markings, inspection lamps, and a visible decision signal. It is paired with **Carbon `#10161B`** and **Midnight Navy `#172632`** for automotive depth, **Paper `#F6F4EF`** for report-like readability, and **Slate `#51616A`** for supporting text. A muted **Moss `#788C5D`** is reserved for positive/supportive cues. The palette is deliberately not a dealership blue: it makes the brand feel like an independent evidence service.

## Layout Paradigm
The site follows the reference's long-form scroll structure but uses an editorial spine: each section is anchored by a small uppercase label, a strong left-edge heading, and a contrasting visual or card field. The hero uses a two-column composition with copy kept left and a vehicle/report visual occupying the right; policy and pricing sections break the rhythm with offset panels and a highlighted middle tier.

## Signature Elements
- **Inspection rail:** a thin amber vertical rule and micro-label system that recurs beside section headings.
- **Report stamp:** a small circular/rectangular INSP AUTO mark inspired by a verified document stamp, used in the header, hero visual, and CTA.
- **Evidence cards:** paper-toned cards with subtle ruled lines, numbered metadata, and compact icons to make report contents feel tangible.

## Interaction Philosophy
Interactions should feel like reviewing a clear document: navigation reveals cleanly, cards rise slightly on hover, buttons compress on press, and all focus states remain visible. Mobile navigation becomes a calm full-width drawer with an expandable Services group. Payment buttons leave the site directly for the configured Whop checkout links; the frontend does not imitate checkout or payment success.

## Animation
Hero copy enters with a short upward reveal and the report visual follows with a slight delayed fade. Sections use IntersectionObserver-driven opacity/translate reveals with a small stagger. Service and pricing cards use transform-only hover elevation. Dropdowns and the mobile drawer use opacity plus translate transitions under 260ms. Counter motion is used only for honest, non-fabricated product facts; no invented customer or performance statistics are shown. Respect `prefers-reduced-motion` by disabling non-essential transitions.

## Typography System
Use **Poppins** for headings, navigation, pricing figures, and labels to align with the requested brand-guideline direction while keeping the display system crisp and automotive. Use **Lora** sparingly for supporting editorial copy and policy text so the website feels like a considered report rather than a generic dashboard. Use a system sans fallback for compact utility metadata. Headlines are sentence case with tight tracking; labels are uppercase with generous letter spacing; body copy is 16–18px with a comfortable line length.

## Brand Essence
**INSP AUTO helps UK used-vehicle buyers read the evidence before they commit, through clear vehicle history reports and human support.** Personality: **measured, alert, reassuring**.

## Brand Voice
Headlines should be direct and confidence-building without overpromising. CTAs should describe the next action plainly. Microcopy should explain limitations and next steps in calm language.

Example lines:
- “Read the history before you write the cheque.”
- “Choose the report that matches the vehicle you are considering.”

## Wordmark & Logo
The wordmark is a custom-styled **INSP AUTO** lockup with a compact inspection-stamp symbol: an amber square with a dark diagonal check/road-line motif. The mark is a bold graphic symbol without text for favicon and small-scale use; the wordmark pairs the symbol with Poppins ExtraBold lettering and a small `UK VEHICLE REPORTS` descriptor.

## Style Decisions
The reference's structural hierarchy is followed, but fabricated testimonials and invented performance/customer statistics are excluded. A clearly labelled testimonial placeholder area is not used because the production site must not present synthetic customer evidence. The contact form is frontend validation-ready only and explicitly states that submission is not connected to email delivery yet.

## File reminder
Every authored CSS/component/page file should begin with a short comment naming this direction: “INSP AUTO — reference-led automotive editorial minimalism; Inspection Amber, Carbon/Midnight Navy, evidence-first copy, quiet motion.”
