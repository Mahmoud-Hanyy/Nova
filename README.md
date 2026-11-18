# Nova — A New Balance Concept

An independent product-launch concept for a New Balance performance shoe. Nova brings together a scroll-directed 3D reveal, editorial product storytelling, and a considered collection page.

> Nova is an independent design concept and is not affiliated with, endorsed by, or produced by New Balance Athletics, Inc. All New Balance trademarks belong to their respective owner.

## Stack

- Next.js App Router with server-rendered page sections
- React Three Fiber, Three.js, and drei for the client-only product experience
- GSAP ScrollTrigger for scroll-scrubbed camera choreography
- CSS for the responsive editorial layout

The 3D experience is loaded on the client and split from the initial page render. The product images and copy render with the page, while Draco assets are self-hosted under `public/draco`.

## Run locally

```bash
npm install
npm run dev
```

Create a production build with `npm run build` and serve it with `npm run start`.

## Project structure

```text
app/                 App Router layout, page, and global styles
src/components/      Navigation, product sections, and footer
src/experience/      Scroll narrative, camera rig, and 3D scene
src/assets/          Product detail photography
public/              GLB model and self-hosted Draco decoder
```

## Credits

- 3D model: [New Balance 997 on Sketchfab](https://sketchfab.com/3d-models/new-balance-997-05e79a2dffbc4356bba7e0751fada08f)
- Reference imagery: [ArtStation](https://www.artstation.com/artwork/x83ar)

This concept is available for personal and portfolio use. The model and reference imagery remain subject to their original licenses.
