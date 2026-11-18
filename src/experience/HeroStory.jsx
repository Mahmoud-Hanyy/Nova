"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { ArrowRight, ChevronDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scenes } from "./scenes";
import { SceneErrorBoundary } from "./SceneErrorBoundary";

// Begin downloading the WebGL scene as soon as this hero module is evaluated.
// The model and Draco decoder are preloaded by the root layout, so starting
// this chunk early lets code, geometry, and decoder arrive in parallel instead
// of waiting for the hero to hydrate before the scene can even be requested.
const experienceModulePromise =
  typeof window === "undefined" ? null : import("./Experience");

const Experience = dynamic(
  () =>
    (experienceModulePromise ?? import("./Experience")).then(
      (module) => module.Experience,
    ),
  {
    ssr: false,
    loading: () => <div className="hero-fallback" aria-hidden="true" />,
  },
);

gsap.registerPlugin(ScrollTrigger);

const TRANSITION_BAND = 0.23;
const sceneMotion = [
  { x: 0, y: 28, scale: 0.96 },
  { x: -56, y: 0, scale: 1 },
  { x: 0, y: 42, scale: 0.98 },
  { x: 56, y: 0, scale: 1.02 },
];
const getVisibility = (progress, stop) =>
  Math.max(0, 1 - Math.abs(progress - stop) / TRANSITION_BAND);

export function HeroStory() {
  const wrapperRef = useRef(null);
  const progressContainerRef = useRef(null);
  const progressRef = useRef(0);
  const panelRefs = useRef([]);
  const progressFillRef = useRef(null);
  const progressCountRef = useRef(null);
  const progressTrackRef = useRef(null);
  useEffect(() => {
    // Some mobile browser shells/extensions add an inline translate before
    // hydration. It is not part of the page layout, so remove it after mount.
    progressContainerRef.current?.style.removeProperty("translate");

    const trigger = ScrollTrigger.create({
      trigger: wrapperRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.7,
      onUpdate: ({ progress }) => {
        progressRef.current = progress;

        const activeIndex = scenes.reduce(
          (active, scene, index) =>
            progress >= scene.progress ? index : active,
          0,
        );
        if (progressCountRef.current) {
          progressCountRef.current.textContent = String(activeIndex + 1).padStart(
            2,
            "0",
          );
        }
        if (progressFillRef.current) {
          progressFillRef.current.style.transform = `scaleX(${progress})`;
        }
        progressTrackRef.current?.setAttribute(
          "aria-valuenow",
          String(Math.round(progress * 100)),
        );

        panelRefs.current.forEach((element, index) => {
          if (!element) return;

          const amount = getVisibility(progress, scenes[index].progress);
          const motion = sceneMotion[index];
          element.style.opacity = String(amount);
          element.style.transform = `translate3d(${(1 - amount) * motion.x}px, ${(1 - amount) * motion.y}px, 0) scale(${motion.scale + (1 - motion.scale) * amount})`;
          element.inert = amount < 0.05;
          element.setAttribute("aria-hidden", String(amount < 0.05));
        });
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <section id="home" ref={wrapperRef} className="hero-wrap">
      <div className="hero-sticky">
        <div className="hero-canvas">
          <SceneErrorBoundary>
            <Experience progressRef={progressRef} />
          </SceneErrorBoundary>
        </div>

        {scenes.map((scene, index) => (
          <div
            key={scene.id}
            ref={(element) => (panelRefs.current[index] = element)}
            className={`hero-content${scene.hero ? " hero-opening" : ""}`}
            style={{ opacity: index === 0 ? 1 : 0 }}
            aria-hidden={index !== 0}
            inert={index !== 0}
          >
            <div className="hero-copy">
              <span className="hero-eyebrow">{scene.eyebrow}</span>
              {scene.hero ? (
                <h1 className="hero-title">{scene.heading}</h1>
              ) : (
                <h2 className="hero-title">{scene.heading}</h2>
              )}
              <p className="hero-body">{scene.body}</p>
              {scene.cta && (
                <div className="hero-actions hero-primary-action">
                  <a className="pill" href={scene.ctaHref}>
                    {scene.ctaLabel} <ArrowRight size={15} />
                  </a>
                </div>
              )}
              {scene.hero && (
                <div className="hero-actions hero-scroll-cue">
                  <span>Scroll to explore</span>
                  <ChevronDown size={15} aria-hidden="true" />
                </div>
              )}
            </div>
          </div>
        ))}

        <div
          className="hero-progress"
          aria-label="Product story progress"
          ref={progressContainerRef}
          suppressHydrationWarning
        >
          <div className="hero-progress-label">
            <span ref={progressCountRef}>01</span>
            <span className="hero-progress-total">/ 04</span>
            <span className="hero-progress-hint">Scroll to explore</span>
          </div>
          <div
            className="hero-progress-track"
            ref={progressTrackRef}
            role="progressbar"
            aria-label="Product story"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={0}
          >
            <span ref={progressFillRef} className="hero-progress-fill" />
          </div>
          <span className="hero-progress-edition">Nova / 2026</span>
        </div>
      </div>
    </section>
  );
}
