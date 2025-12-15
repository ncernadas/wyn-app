# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

WYN Logistics - A Next.js 16 application for a package delivery and logistics company. Built with TypeScript, React 19, Chakra UI v3, and includes 3D visualizations using Three.js/React Three Fiber. Features smooth scrolling with Lenis and animations with GSAP.

## Development Commands

- `npm run dev` or `pnpm dev` - Start development server on http://localhost:3000
- `npm run build` or `pnpm build` - Create production build
- `npm start` or `pnpm start` - Run production server (requires build first)
- `npm run lint` or `pnpm lint` - Run ESLint

## Architecture

### Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript (strict mode, target ES2017)
- **UI Library**: Chakra UI v3 with custom theme system
- **3D Graphics**: React Three Fiber + Three.js + Drei
- **Animations**: GSAP for complex animations, Lenis for smooth scrolling
- **Styling**: Chakra UI system + CSS modules
- **Fonts**: Roboto (weights: 300, 400, 500, 700)
- **React Compiler**: Enabled for automatic optimizations

### Directory Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with Provider and font setup
│   ├── page.tsx           # Home page (main entry)
│   └── globals.css        # Global styles
├── components/
│   ├── hero/              # Hero section with 3D package and video
│   ├── navbar/            # Navigation components
│   ├── stats/             # Statistics display section
│   ├── services/          # Logistics services and FAQ
│   ├── testimonials/      # Customer testimonials with marquee
│   ├── footer/            # Footer component
│   └── ui/                # Chakra UI component wrappers
└── theme/                 # Chakra UI v3 theme configuration
    ├── index.ts           # Theme system entry point
    ├── tokens/            # Design tokens (colors, spacing, etc.)
    ├── semantic-tokens/   # Semantic color tokens
    ├── recipes/           # Single-part component styles
    ├── slot-recipes/      # Multi-part component styles
    ├── text-styles.ts     # Typography styles
    ├── layer-styles.ts    # Layer/box styles
    ├── global-css.ts      # Global CSS configuration
    ├── keyframes.ts       # Animation keyframes
    └── breakpoints.ts     # Responsive breakpoints
```

### Path Aliases

- `@/*` → `src/*` (configured in tsconfig.json)

### Key Configuration Details

**Next.js Config (next.config.ts)**:
- React Compiler enabled for automatic component optimization
- Chakra UI package imports optimized via `optimizePackageImports`

**Chakra UI Theme**:
- Custom theme system created in `src/theme/index.ts`
- Theme merged with Chakra's `defaultBaseConfig`
- Provider component at `src/components/ui/provider.tsx` wraps the app
- Color mode provider included for light/dark theme support
- CSS variables prefix: `chakra`

**3D Components**:
- Three.js models loaded from `/public/package3d/` (OBJ + textures)
- Uses OBJLoader for 3D package model
- Implements PBR materials (diffuse, normal, metallic, roughness maps)
- Canvas with OrbitControls for interactive 3D scenes

**Public Assets**:
- `/public/package3d/` - 3D model assets (base.obj + texture maps)
- `/public/logos/` - Brand logo assets
- `/public/patterns/` - Background patterns
- `/public/*.svg` - Illustration assets (undraw1-4.svg)
- `/public/headervideo.mp4` - Hero section video
- `/public/Isotype-1.ico` - Favicon

### Page Structure

The home page (`src/app/page.tsx`) is composed of these sections in order:
1. **Navbar** - Navigation bar
2. **HeroSection** - Hero with 3D package visualization and video
3. **StatsSection** - Company statistics display
4. **LogisticServices** - Services overview
5. **TestimonialSlider** - Customer testimonials with marquee animation
6. **LogisticsFaqSection** - FAQ section
7. **Footer** - Site footer

### Component Patterns

**Chakra UI v3 Usage**:
- Import components from `@chakra-ui/react`
- Use custom theme system from `@/theme`
- Wrapped in Provider component that includes ChakraProvider + ColorModeProvider
- Components in `src/components/ui/` are Chakra UI wrappers following v3 patterns

**Client Components**:
- Use `"use client"` directive when components need:
  - React hooks (useState, useEffect, useRef, etc.)
  - Browser APIs
  - Event handlers
  - Three.js/React Three Fiber
  - GSAP animations
  - Lenis smooth scrolling

**3D Components**:
- Wrap Three.js components in `<Canvas>` from `@react-three/fiber`
- Use `<Suspense>` for lazy loading 3D assets
- Implement animations with `useFrame` hook
- Use `useLoader` for loading models and textures

### Important Notes

- **Language**: All content is in Spanish (lang="es")
- **React 19**: Uses automatic JSX transform (no React import needed)
- **Hydration**: Root HTML has `suppressHydrationWarning` for theme compatibility
- **Module Resolution**: Using "bundler" mode for optimal Next.js compatibility

## Working with Chakra UI v3

This project uses Chakra UI v3, which has significant API differences from v2:

- Theme system uses `createSystem()` and `defineConfig()`
- Components imported from `@chakra-ui/react`
- Custom theme in `src/theme/` with tokens, recipes, and slot recipes
- Provider pattern: ChakraProvider with custom system + ColorModeProvider

When modifying UI components, always check the custom theme configuration in `src/theme/` for design tokens and component recipes.
