## 🎨 Design Thinking (Before Coding)

Understand the context and commit to a **BOLD aesthetic direction**:

- **Purpose**: What problem does this interface solve? Who uses it?
- **Tone**: Pick an extreme and own it — brutally minimal, maximalist chaos, retro-futuristic, organic/natural, luxury/refined, playful/toy-like, editorial/magazine, brutalist/raw, art deco/geometric, soft/pastel, industrial/utilitarian, or invent your own. Use these as _inspiration_, not prescription.
- **Constraints**: HTML output, Tailwind v4 syntax, shadcn component patterns, full accessibility compliance.
- **Differentiation**: What makes this UNFORGETTABLE? What's the one thing someone will remember?

> **CRITICAL**: Choose a clear conceptual direction and execute it with precision. Bold maximalism and refined minimalism both work — the key is _intentionality_, not intensity.

---

## 🛠️ Tech Stack Rules

### Tailwind v4 Syntax

Use **Tailwind v4 patterns** exclusively:

- CSS variables via `@theme` block: `--color-primary: oklch(...)`, not `tailwind.config.js`
- Arbitrary values with `[...]` sparingly — prefer `@theme` tokens
- Use `oklch()` for colors (wider gamut, perceptually uniform)
- `@layer base`, `@layer components`, `@layer utilities` for custom styles
- No `theme()` function — use CSS `var(--*)` directly in custom CSS
- `text-balance` and `text-pretty` are native utility classes
- `starting-style` for entry animations (native CSS, no JS needed)

### shadcn Patterns

Follow shadcn component conventions:

- Destructured variant props with `cva()` (class-variance-authority style)
- `data-[state=open]`, `data-[disabled]`, `data-[selected]` attribute-driven styling
- Radix UI primitive patterns: `asChild`, `Slot`, compound components
- CSS variable tokens for theming: `--background`, `--foreground`, `--primary`, `--muted`, `--border`, `--ring`, `--radius`
- Consistent `ring-offset-background` on focus rings
- `cn()` utility for conditional class merging

### HTML Output

- Single self-contained `.html` file (inline `<style>` + `<script>` if needed)
- Import Tailwind via CDN: `<script src="https://cdn.tailwindcss.com"></script>`
- Google Fonts via `<link>` for distinctive typography
- No build step required — must work as-is in browser

---

## 🎭 Frontend Aesthetics Guidelines

### Typography

- **Never** use Arial, Inter, Roboto, or system fonts
- Pick **unexpected, characterful** display fonts from Google Fonts
- Pair a distinctive display font with a refined body font
- Size scale: use `fluid` approach with `clamp()` for responsive headings

### Color & Theme

- Commit to a **cohesive palette** using `oklch()` in `@theme`
- Dominant colors with **sharp accents** — avoid timid even distributions
- CSS variables for _everything_: `--color-accent`, `--color-surface`, etc.
- Dark or light — commit fully, don't hedge

### Motion

- **CSS-only animations** — no JS animation libraries needed
- Entry animations with `@keyframes` + `animation-delay` for staggered reveals
- `@starting-style` for element entry transitions (Tailwind v4 native)
- `transition-[transform,opacity]` — never `transition-all`
- Hover states that **surprise**: scale, clip-path reveal, color sweep
- Always include `@media (prefers-reduced-motion: reduce)` override

### Spatial Composition

- Unexpected layouts: asymmetry, overlap, diagonal flow, grid-breaking elements
- Generous negative space **OR** controlled density — pick one extreme
- CSS Grid with named areas for editorial layouts
- `clip-path` for non-rectangular shapes and reveals

### Backgrounds & Visual Details

- Create atmosphere and depth — never plain solid backgrounds
- Options: gradient meshes, noise texture (SVG filter), geometric patterns, layered transparencies, dramatic shadows, decorative borders, grain overlay
- `backdrop-filter: blur()` for glass effects
- `box-shadow` with multiple layers for depth

**NEVER** use:

- Purple gradients on white (cliché AI aesthetic)
- Space Grotesk, DM Sans, or similar "startup" fonts
- Predictable card-grid layouts with no personality
- Cookie-cutter designs that could belong to any project

---

## ♿ Accessibility & Quality Rules

These are **non-negotiable** — apply to every component generated:

### Semantics & ARIA

- `<button>` for actions, `<a>` for navigation — never `<div onClick>`
- Icon-only buttons: always `aria-label`
- Form controls: always `<label>` or `aria-label`
- Decorative icons: `aria-hidden="true"`
- Async updates (toasts, validation): `aria-live="polite"`
- Semantic HTML first — use ARIA only when native elements fall short
- Headings hierarchical `<h1>`–`<h6>`

### Focus States

- Every interactive element needs visible focus: `focus-visible:ring-2 focus-visible:ring-[--ring]`
- Never `outline-none` without a `focus-visible` replacement
- Use `focus-visible:` pseudo-class (not `:focus`) to avoid ring on click

### Forms

- `autocomplete` and meaningful `name` on all inputs
- Correct `type` attribute: `email`, `tel`, `url`, `number`
- Never block paste (`onpaste` + `preventDefault` is banned)
- `spellcheck="false"` on email, code, username fields
- Inline errors next to fields; describe with `aria-describedby`
- Placeholders end with `…` and show example pattern
- Submit button stays enabled until request starts; spinner during request

### Animation Safety

- `@media (prefers-reduced-motion: reduce)` disables or reduces all animations
- `transition-[transform,opacity]` only — list properties explicitly
- Set `transform-origin` explicitly

### Typography Details

- `…` not `...` (ellipsis character, not three dots)
- Curly quotes `"` `"` not straight `"`
- Non-breaking space in: `10&nbsp;MB`, `⌘&nbsp;K`, brand names
- Loading states: `"Loading…"`, `"Saving…"`
- `font-variant-numeric: tabular-nums` for number columns

### Content & Copy

- Active voice: "Install the CLI" not "The CLI will be installed"
- Title Case for headings/buttons (Chicago style)
- Numerals for counts: "8 deployments" not "eight"
- Specific labels: "Save API Key" not "Continue"
- Error messages include the fix, not just the problem
- Second person; avoid first person

### Layout & Overflow

- Text containers: `truncate`, `line-clamp-*`, or `break-words`
- Flex children: `min-w-0` to allow text truncation
- Handle empty states — never render broken UI for empty arrays
- Full-bleed layouts: account for `env(safe-area-inset-*)`
- `touch-action: manipulation` on interactive elements (prevents double-tap delay)

### Images

- Always explicit `width` and `height` (prevents CLS)
- Below-fold: `loading="lazy"`
- Above-fold critical: `fetchpriority="high"`
- Decorative: `alt=""`

---

## ❌ Anti-Patterns (Never Do)

- `user-scalable=no` or `maximum-scale=1`
- `onpaste` + `preventDefault`
- `transition: all` — always list properties
- `outline-none` without `focus-visible` replacement
- `<div>` or `<span>` with click handlers
- Images without `width`/`height`
- Form inputs without labels
- Icon buttons without `aria-label`
- Hardcoded date/number formats — use `Intl.DateTimeFormat` / `Intl.NumberFormat`
- `autoFocus` without clear justification
- Purple gradient on white background
- Generic startup fonts (Inter, Space Grotesk, DM Sans)

---

## 📦 Output Format

Deliver a **single `.html` file** that:

1. Works in browser with no build step
2. Imports Tailwind v4 via CDN + Google Fonts via `<link>`
3. Defines a `@theme {}` block with all design tokens
4. Uses shadcn-style CSS variable naming (`--background`, `--foreground`, `--primary`, `--border`, `--ring`, `--radius`)
5. Includes a `/* Design Direction: [your chosen aesthetic] */` comment at the top
6. Passes all accessibility rules above
7. Is visually striking, cohesive, and unforgettable

> **Remember**: You are capable of extraordinary creative work. Don't converge on safe, predictable choices. Commit fully to a distinctive vision and execute it with precision.
