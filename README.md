# Nova — A New Balance Concept

A cinematic, scroll-driven 3D product showcase built with React Three Fiber. Nova reimagines what a New Balance product-launch page could look like: a full-screen 3D shoe choreographed to scroll, warm editorial content sections, and a working Shop concept — built as a design and engineering portfolio piece.

> **Disclaimer:** Nova is an independent design concept and is not affiliated with, endorsed by, or produced by New Balance Athletics, Inc. All New Balance trademarks belong to their respective owner.

## Overview

The site opens on a full-screen cinematic sequence: a giant title card, then a scroll-scrubbed camera journey through four staged shots of the shoe (exterior mesh, sole/cushioning, and a closing hero shot), each with its own lighting mood and copy. From there it settles into a conventional, warmly-lit page: a detail gallery, a shop section with three colorways, and an About section telling Nova's origin story.

**Sections:** Home · Gallery · Shop · About

## Features

- **Scroll-driven cinematography** — GSAP `ScrollTrigger` scrubs a single progress value that drives the camera through four waypoints, cross-fades scene copy, and shifts lighting color/intensity per scene, instead of a static orbiting viewer.
- **Camera-based composition, not cropping** — text-left scenes render the model off-axis using `camera.setViewOffset` (a true asymmetric frustum), so the product sits correctly framed at any viewport width instead of just being centered behind empty space.
- **Living motion** — scroll-velocity camera roll (banks on fast scroll, settles level when you slow down), continuous idle drift, and a shoe that visibly turns and breathes through the journey.
- **Resilient by design** — a scene-level error boundary means a failed asset or WebGL context loss degrades to a graceful fallback instead of taking down the whole page.
- **Fully responsive** — tuned and verified across desktop, tablet, and mobile, including a dedicated mobile nav and reduced-cost rendering (lower DPR, no shadows) on small screens.

## Tech Stack

| Category      | Technologies                                    |
|----------------|-------------------------------------------------|
| 3D Rendering   | React Three Fiber, Three.js, @react-three/drei  |
| UI Framework   | React                                            |
| Animation      | GSAP + ScrollTrigger, AOS (content sections)     |
| Styling        | Tailwind CSS v4 (`@tailwindcss/vite`)            |
| Build Tool     | Vite                                              |
| Icons          | lucide-react                                     |

## Performance

- 3D model is Draco-compressed with WebP textures (~1.1 MB, down from a 35 MB source export).
- Draco decoder is self-hosted (`/public/draco`) rather than fetched from a third-party CDN.
- The 3D experience is code-split and lazy-loaded, so it doesn't block first paint; `three` / `@react-three/fiber` / `gsap` ship as separate cacheable chunks.

## Getting Started

```bash
# install dependencies
npm install

# start the dev server
npm run dev

# production build
npm run build

# preview the production build locally
npm run preview
```

## Project Structure

```
src/
├── components/          # Page-level UI (Navbar, Footer, Shop, Gallery/About content)
│   └── Model.jsx         # The GLB shoe model + idle/parallax motion
├── experience/           # The scroll-driven cinematic sequence
│   ├── scenes.js          # Camera/light/copy waypoints for each scene
│   ├── CameraRig.jsx      # Interpolates camera + lighting between waypoints
│   ├── Experience.jsx     # Canvas, lights, and scene composition
│   ├── HeroStory.jsx      # Scroll pinning, text reveal, and layout
│   └── SceneErrorBoundary.jsx
├── App.jsx
└── index.css
public/
├── draco/                # Self-hosted Draco decoder
└── sneaker-compressed.glb
```

## Credits

- 3D model: [New Balance 997](https://sketchfab.com/3d-models/new-balance-997-05e79a2dffbc4356bba7e0751fada08f) via Sketchfab
- Reference imagery: [ArtStation](https://www.artstation.com/artwork/x83ar)

## License

This project is available for personal and portfolio use. The Nova concept, copy, and design are original work by the project author; the 3D model and reference imagery are credited above and subject to their original licenses.