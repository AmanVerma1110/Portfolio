# Tech Spec — Aman Verma Portfolio

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | ^19.0 | UI framework |
| react-dom | ^19.0 | DOM renderer |
| gsap | ^3.12 | Animation engine, ScrollTrigger, SplitText |
| lenis | ^1.1 | Smooth scroll with lerp |
| lucide-react | ^0.460 | Icon library |
| @fontsource/playfair-display | ^5.0 | Display font |
| @fontsource/inter | ^5.0 | Body font |
| @fontsource/jetbrains-mono | ^5.0 | Mono font |
| tailwindcss | ^4.0 | Utility CSS |
| @tailwindcss/vite | ^4.0 | Tailwind Vite integration |
| typescript | ^5.6 | Type safety |
| vite | ^6.0 | Build tool |
| @vitejs/plugin-react | ^4.0 | React Vite plugin |
| @types/react | ^19.0 | React type defs |
| @types/react-dom | ^19.0 | ReactDOM type defs |

No shadcn/ui — all components are custom-built per the design spec.

---

## Component Inventory

### Layout

| Component | Source | Reuse |
|-----------|--------|-------|
| Navigation | Custom | Single instance, fixed position, scroll-aware background |
| Footer | Custom | Single instance |
| MobileMenuOverlay | Custom | Single instance, full-screen overlay |

### Sections

| Component | Source | Notes |
|-----------|--------|-------|
| HeroSection | Custom | Contains ParticleNetwork canvas + content overlay + pinned scroll |
| ExperienceSection | Custom | Title area + DepthScrollTimeline wrapper |
| ProjectsSection | Custom | Grid of HolographicProjectCard |
| SkillsSection | Custom | Two-column: text left + OrbitalRings right |
| CertificationsSection | Custom | Row of CredentialCard |
| ContactSection | Custom | Two-column CTA + ContactCard |

### Reusable Components

| Component | Source | Used By |
|-----------|--------|---------|
| SectionHeader | Custom | Experience, Projects, Skills, Certifications, Contact — renders eyebrow/title/subtitle with staggered entrance |
| ParticleNetwork | Custom | HeroSection — canvas-based particle system |
| DepthScrollTimeline | Custom | ExperienceSection — GSAP-pinned horizontal scroll with 3D item animation |
| HolographicProjectCard | Custom | ProjectsSection — CSS-only expand-on-hover card |
| OrbitalRings | Custom | SkillsSection — CSS-rotating concentric skill rings |
| CredentialCard | Custom | CertificationsSection — certification card with hover lift |
| ContactCard | Custom | ContactSection — glassmorphic contact info panel |
| ScrollIndicator | Custom | HeroSection — animated scroll cue |

### Hooks

| Hook | Purpose |
|------|---------|
| useLenis | Initialize Lenis, connect to GSAP ticker, cleanup on unmount |
| useReducedMotion | Detect `prefers-reduced-motion`, return boolean for conditional animation |

---

## Animation Implementation

| Animation | Library | Approach | Complexity |
|-----------|---------|----------|------------|
| Hero particle network | Canvas 2D API | Custom Particle class + rAF loop with cursor influence. No library — direct imperative canvas code. Pause via IntersectionObserver when off-screen. | 🔒 High |
| Hero pinned scroll transition | GSAP ScrollTrigger | Pin hero for additional 50vh, animate particle opacity/rotation, fade text content. | 🔒 High |
| Depth scroll timeline | GSAP ScrollTrigger | Pin wrapper, scrub horizontal track translateX. Per-item ScrollTriggers with `containerAnimation` for 3D translateZ/rotateY/filter keyframes. | 🔒 High |
| Holographic card expansion | CSS transitions | Pure CSS hover state — width/height/transform transitions with staggered content reveal via transition-delay. No JS. | Medium |
| Orbital skill rings | CSS @keyframes | Three concentric rings with `animation: rotate` at different durations/directions. Hover pauses animation. | Low |
| Section entrance animations | GSAP ScrollTrigger | Consistent pattern: eyebrow fade, title slideUp, subtitle fade, content stagger. Extracted into reusable ScrollTrigger configs. | Low |
| Certification card stagger | GSAP ScrollTrigger | Staggered translateY+opacity with 0.12s delay between cards. | Low |
| Contact section entrance | GSAP ScrollTrigger | Left column slideIn from left, right card scale+fade. | Low |
| Nav background transition | Scroll listener + CSS | Toggle class based on scroll position past hero. CSS transition on background property. | Low |
| Scroll indicator pulse | CSS @keyframes | Circle translateY down the line in 2s infinite loop. | Low |
| Mobile menu | CSS transition | Overlay opacity + transform. Menu links stagger in. | Low |

---

## State & Logic

### Lenis ↔ GSAP Integration

Lenis must be initialized once at the app root. Its scroll events feed into `ScrollTrigger.update()`. The GSAP ticker drives Lenis's rAF loop. This is a singleton pattern — the `useLenis` hook creates one instance and shares it via a ref (no context needed since only ScrollTrigger consumes it).

```
Lenis.on('scroll') → ScrollTrigger.update()
GSAP ticker → Lenis.raf()
```

### Hero Pin Coordination

The hero section has two ScrollTriggers:
1. **Pin trigger**: Pins the hero wrapper for 50vh additional scroll. Controls the section-level pin.
2. **Particle intensity trigger**: Nested timeline that ramps particle glow/rotation during the pinned phase. Reads the same ScrollTrigger progress.

These must share the same pin container to avoid conflict. Use a single GSAP timeline with the pin ScrollTrigger, and child tweens for the particle and text animations.

### Depth Scroll Horizontal Math

The horizontal scroll distance is `wrapper.scrollWidth - window.innerWidth`. This value changes on resize, so `invalidateOnRefresh: true` is required on the pin ScrollTrigger. The per-item depth animations use `containerAnimation` pointing to the main horizontal timeline — this is the GSAP feature that makes individual items animate relative to the horizontal scrub position.

### Particle Network Lifecycle

The ParticleNetwork component manages its own rAF loop imperatively (not React state). On each frame, it reads cursor position from a ref and mutates particle positions directly. React is only used for the canvas element and cleanup. The loop starts when the component mounts and pauses/resumes based on IntersectionObserver visibility.

### Holographic Card — CSS-Only Constraint

The card expansion uses no JavaScript. The hover state is pure CSS. Critical detail: the card grid must use CSS Grid (not Flex) so that expanding one card does not shift siblings. The expanded card (400px) overflows its grid cell — `overflow: visible` on the grid cell and `z-index` on the hovered card to layer above neighbors.

---

## Other Key Decisions

### No Three.js / React Three Fiber

The design spec's "3D" is achieved through CSS `perspective` + `transform-style: preserve-3d` and GSAP-driven transforms, not a WebGL scene. The particle network is Canvas 2D (not Three.js Points). This keeps the bundle smaller and avoids the R3F reconciler overhead for what is essentially 2.5D visual effects.

### Canvas 2D for Particles (not WebGL)

The particle count is modest (~100-200 based on viewport). Canvas 2D is sufficient and simpler than setting up a WebGL context + shaders. The connection lines are standard `ctx.beginPath()` / `ctx.moveTo()` / `ctx.lineTo()` calls.

### Font Loading Strategy

Use `@fontsource` packages with `font-display: swap`. Import the specific weights needed (Playfair Display 700, Inter 400/500/600, JetBrains Mono 400/500) to keep bundle size minimal. No Google Fonts CDN — self-hosted only.
