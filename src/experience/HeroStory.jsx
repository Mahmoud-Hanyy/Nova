import { useEffect, useRef, Suspense, lazy } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scenes } from "./scenes";
import { SceneErrorBoundary } from "./SceneErrorBoundary";

// Three.js/R3F/drei are heavy - split them into their own chunk and load
// only once this section actually mounts, so first paint isn't blocked.
const Experience = lazy(() => import("./Experience").then((m) => ({ default: m.Experience })));

gsap.registerPlugin(ScrollTrigger);

// Each scene's copy fades in/out around its own progress "stop" as the user
// scrolls through it - a scrubbed reveal rather than a one-shot fade.
function sceneVisibility(progress, stop, band = 0.16) {
  const d = Math.abs(progress - stop);
  return Math.max(0, 1 - d / band);
}

export function HeroStory() {
  const wrapperRef = useRef(null);
  const progressRef = useRef(0);
  const panelRefs = useRef([]);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: wrapperRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        progressRef.current = progress;

        panelRefs.current.forEach((el, i) => {
          if (!el) return;
          const stop = scenes[i].progress;
          const visibility = sceneVisibility(progress, stop);
          // Direction-aware motion: panels rise up into place from below as
          // you scroll toward their stop, then continue rising out of frame
          // as you scroll past it - reinforcing the sense of travel rather
          // than a flat fade in both directions.
          const direction = progress > stop ? -1 : 1;
          const travel = direction * (1 - visibility) * 56;
          const scale = 0.94 + visibility * 0.06;
          el.style.opacity = visibility.toFixed(3);
          el.style.transform = `translateY(${travel}px) scale(${scale})`;
          el.style.filter = `blur(${((1 - visibility) * 5).toFixed(2)}px)`;
          el.style.pointerEvents = visibility > 0.4 ? "auto" : "none";
        });
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <section id="home" ref={wrapperRef} className="relative" style={{ height: "400vh" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-charcoal">
        {/* Constrain the whole composition (canvas + text) to a shared
            centered width. Without this, the canvas stretches full viewport
            width while the text stays pinned near the left edge - on wide
            monitors the shoe renders dead-center and everything past it is
            just empty. Letterboxing beyond this width keeps both elements
            visually tied together instead. */}
        <div className="relative mx-auto h-full max-w-[1680px]">
          <div className="absolute inset-0">
            <SceneErrorBoundary>
              <Suspense
                fallback={
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 border-2 border-clay/25 border-t-clay rounded-full animate-spin" />
                  </div>
                }
              >
                <Experience progressRef={progressRef} />
              </Suspense>
            </SceneErrorBoundary>
          </div>

          {scenes.map((scene, i) =>
            scene.hero ? (
              // Opening scene: huge centered wordmark + a distinct scroll-to-continue prompt
              <div
                key={scene.id}
                ref={(el) => (panelRefs.current[i] = el)}
                className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-4 text-center"
                style={{ opacity: 1, transition: "opacity 0.05s linear" }}
              >
                <span className="font-display text-clay text-xs sm:text-sm font-semibold tracking-[0.35em] uppercase">
                  {scene.eyebrow}
                </span>
                <h1 className="font-display mt-4 text-[16vw] leading-[0.9] sm:text-[13vw] md:text-[10vw] lg:text-[9rem] font-extrabold text-cream tracking-tighter">
                  {scene.heading}
                </h1>
                <p className="font-body mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-stone max-w-md">
                  {scene.body}
                </p>
                <div className="mt-10 sm:mt-14 flex flex-col items-center text-stone/80">
                  <span className="font-display text-[11px] sm:text-xs tracking-[0.3em] uppercase">
                    {scene.scrollPrompt}
                  </span>
                  <ChevronDown className="mt-2 animate-bounce" size={20} />
                </div>
              </div>
            ) : (
              <div
                key={scene.id}
                ref={(el) => (panelRefs.current[i] = el)}
                className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center md:items-start md:justify-center md:text-left md:pl-12 lg:pl-16"
                style={{ opacity: 0, transition: "opacity 0.05s linear" }}
              >
                <div className="max-w-xl">
                  <span className="font-display text-clay text-sm font-semibold tracking-[0.25em] uppercase">
                    {scene.eyebrow}
                  </span>
                  <h2 className="font-display mt-3 text-3xl sm:text-4xl lg:text-6xl font-bold text-cream leading-[1.05] tracking-tight">
                    {scene.heading}
                  </h2>
                  <p className="font-body mt-4 text-sm sm:text-base md:text-lg text-stone max-w-lg mx-auto md:mx-0">
                    {scene.body}
                  </p>
                  {scene.cta && (
                    <a
                      href={scene.ctaHref}
                      className="font-display mt-8 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-semibold tracking-tight rounded-md text-cream bg-clay hover:bg-clay-dark transition-colors duration-300 pointer-events-auto"
                    >
                      {scene.ctaLabel} <ArrowRight className="ml-2" size={20} />
                    </a>
                  )}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
