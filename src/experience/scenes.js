// Each stop is a waypoint the camera moves through as scroll progress goes 0 -> 1.
// `progress` is where along the scrollytelling timeline (0-1) this waypoint sits.
// CameraRig interpolates smoothly between consecutive stops.

export const scenes = [
  {
    id: "arrival",
    progress: 0,
    hero: true,
    camera: { position: [0, 0.25, 5.3], target: [0, 0.9, 0] },
    light: { keyColor: "#F0D5AE", keyIntensity: 1.6, rimColor: "#C98868", rimIntensity: 0.8 },
    fov: 45,
    eyebrow: "A New Balance Concept",
    heading: "NOVA",
    body: "Footwear engineered for re-entry.",
    scrollPrompt: "Scroll to begin the descent",
  },
  {
    id: "mesh",
    progress: 0.34,
    camera: { position: [1.9, 0.35, 1.6], target: [0.1, 0, 0] },
    light: { keyColor: "#D9A066", keyIntensity: 1.3, rimColor: "#B08D57", rimIntensity: 0.75 },
    fov: 38,
    viewOffset: -0.22,
    eyebrow: "01 — Exterior",
    heading: "Aerospace-Grade Mesh",
    body: "A knitted upper inspired by thermal shielding — engineered to breathe under pressure and hold its shape through every stride.",
  },
  {
    id: "sole",
    progress: 0.67,
    camera: { position: [0.6, -1.05, 1.35], target: [0, -0.15, 0] },
    light: { keyColor: "#C98868", keyIntensity: 0.95, rimColor: "#EDE4D6", rimIntensity: 0.9 },
    fov: 42,
    viewOffset: -0.22,
    eyebrow: "02 — Propulsion",
    heading: "Zero-Gravity Cushioning",
    body: "A responsive foam platform tuned to absorb impact and return energy — the way a lander absorbs a touchdown.",
  },
  {
    id: "icon",
    progress: 1,
    camera: { position: [0, 0.5, 5.4], target: [0, 0, 0] },
    light: { keyColor: "#F5E6D3", keyIntensity: 1.2, rimColor: "#B5674A", rimIntensity: 0.6 },
    fov: 48,
    viewOffset: -0.2,
    eyebrow: "03 — Nova",
    heading: "Built to Go the Distance",
    body: "From orbit to the outdoors — Nova is a New Balance concept built for athletes who never stop moving forward.",
    cta: true,
    ctaLabel: "View the Collection",
    ctaHref: "#shop",
  },
];

// Smooth interpolation helpers shared by CameraRig + Model
export const clamp01 = (v) => Math.min(1, Math.max(0, v));

export function lerp(a, b, t) {
  return a + (b - a) * t;
}

export function lerpVec3(a, b, t) {
  return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
}

// Given global progress (0-1), find which two scene waypoints we're between
// and the local t (0-1) for interpolating between them.
export function getSceneSegment(progress) {
  const p = clamp01(progress);
  for (let i = 0; i < scenes.length - 1; i++) {
    const a = scenes[i];
    const b = scenes[i + 1];
    if (p >= a.progress && p <= b.progress) {
      const span = b.progress - a.progress || 1;
      const t = (p - a.progress) / span;
      return { a, b, t: clamp01(t), index: i };
    }
  }
  return { a: scenes[scenes.length - 1], b: scenes[scenes.length - 1], t: 0, index: scenes.length - 1 };
}
