# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**vibe-view-report-1** is a React + Vite frontend project with its own independent visual style and content scene. The style and content are defined in `DESIGN.md` — complete it with user input before writing any component code.

**Development workflow:** user describes visual style → complete `DESIGN.md` and get approval → implement components.

## Commands

```bash
npm run dev        # Vite dev server with HMR
npm run build      # tsc -b && vite build
npm run lint       # ESLint
npm run preview    # Preview production build
```

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | React 19 + TypeScript |
| Bundler | Vite 8 |
| Styling | Tailwind CSS v4 (CSS-first, via `@tailwindcss/vite` — no `tailwind.config.js`) |
| Animation | `motion/react` (Framer Motion v12+) |
| UI Components | shadcn/ui (Tailwind v4 mode) |
| Headless | `@base-ui/react` (Modal, Dialog, etc.) |
| Font | Geist Variable (`@fontsource-variable/geist`) |
| Icons | `lucide-react` |

Path alias: `@/` → `./src/`

## Architecture

- **`src/index.css`** — global design tokens in `:root` using `oklch()`. All colors reference CSS variables mapped through `@theme inline`. Customize token values after `DESIGN.md` is confirmed.
- **`src/components/ui/`** — shadcn base components (button, etc.).
- **`src/lib/utils.ts`** — `cn()` helper (clsx + tailwind-merge).

## Design System

All design decisions (color tokens, typography, spacing, easing curves, component list) must be frozen in `DESIGN.md` before any component development begins. Update `DESIGN.md`'s decision log whenever a token or component structure changes.

## Critical Engineering Constraints

### Motion easing — arrays only

```tsx
// ✅
transition={{ duration: 0.5, ease: [0.165, 0.84, 0.44, 1] }}
// ❌ TypeScript error with motion/react
transition={{ duration: 0.5, ease: 'easeOut' }}
```

Hero sections use `animate={…}`. All other sections use `whileInView={…}`.

### Tailwind v4 hover scale — use motion variants

`scale-[1.04]` in Tailwind v4 generates a standalone `scale:` CSS property; `transition: transform` cannot capture it, causing silent hover failures. Always use motion/react variant propagation for scale effects:

```tsx
<motion.div initial="rest" whileHover="hover" animate="rest">
  <motion.img
    variants={{ rest: { scale: 1 }, hover: { scale: 1.04 } }}
    transition={{ duration: 0.28, ease: [0.45, 0, 0.55, 1] }}
  />
</motion.div>
```

### Full-screen canvas — WebGL only, never Canvas 2D

Canvas 2D `fillText()` loops hit 14k–22k main-thread draws at 1440p and will stutter. All full-screen animated backgrounds must use **WebGL + glyph atlas** so rendering happens on the GPU; the main thread only calls `drawArrays()` once per frame.

### WebGL shader pitfalls

- `half`, `input`, `output` are **reserved keywords in GLSL ES 1.0** — using them as variable names causes silent shader compile failure (blank canvas, no JS error). Always call `gl.getShaderInfoLog(s)` inside the `compile()` helper to surface errors.
- Before `texImage2D()` with a Canvas 2D texture, call `gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)` to fix Y-axis inversion.
- TypeScript doesn't carry null guards across nested closures (`resize()` / `draw()`). Add `if (!canvas || !gl) return` at the top of every nested function body; if the function has a return type, use `throw new Error()` instead.

### ResizeObserver + Canvas DPR

Never accumulate transforms with `ctx.scale(dpr, dpr)` — it compounds on each resize. Always use the absolute form:

```ts
ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
```
