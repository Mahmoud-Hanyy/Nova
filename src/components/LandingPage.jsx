import Image from "next/image";
import { HeroStory } from "../experience/HeroStory";
import { Shop } from "./Shop";
import BottomImage from "../assets/bottom.jpg";
import DarkImage from "../assets/dark.jpg";
import LightImage from "../assets/light.jpg";
import SideImage from "../assets/side.jpg";

export function LandingPage() {
  return <>
    <HeroStory />
    <section id="technology" className="section">
      <div className="intro">
        <div><span className="eyebrow">Performance, in a new light</span><h2 className="section-title">Made for what’s next.</h2></div>
        <p className="intro-copy">Meet a new kind of distance runner. Nova pairs the unmistakable character of New Balance with a considered, forward-looking approach to every mile. Nothing extra. Nothing held back.</p>
      </div>
      <div className="spec-strip"><div className="spec"><strong>01 / 03</strong><span>Engineered knit upper</span></div><div className="spec"><strong>FuelCell</strong><span>Responsive cushioning</span></div><div className="spec"><strong>Every mile</strong><span>Designed for the long run</span></div></div>
    </section>
    <section id="gallery" className="section gallery-section">
      <div className="gallery-head"><div><span className="eyebrow">A closer look</span><h2 className="section-title">Every line has a reason.</h2></div><span className="eyebrow">Form follows forward motion</span></div>
      <div className="gallery-grid">
        <figure className="gallery-card"><Image src={SideImage} alt="Nova sneaker profile, showing the engineered layered upper" fill sizes="(max-width: 560px) 100vw, (max-width: 760px) 50vw, 60vw"/><figcaption className="gallery-caption">Sculpted profile / 01</figcaption></figure>
        <figure className="gallery-card"><Image src={BottomImage} alt="Close detail of the Nova outsole and cushioning" fill sizes="(max-width: 560px) 100vw, (max-width: 760px) 50vw, 35vw"/><figcaption className="gallery-caption">Ground contact / 02</figcaption></figure>
        <figure className="gallery-card"><Image src={LightImage} alt="Nova upper construction in soft studio light" fill sizes="(max-width: 560px) 100vw, (max-width: 760px) 50vw, 35vw"/><figcaption className="gallery-caption">Precision knit / 03</figcaption></figure>
      </div>
    </section>
    <Shop />
    <section id="about" className="section story-section">
      <div className="story-image"><Image src={DarkImage} alt="Nova in a dramatic studio setting"/></div>
      <div className="story-text"><span className="eyebrow">The thinking behind Nova</span><h2 className="section-title">Built to feel like possibility.</h2><p>For more than a century, New Balance has believed that movement changes everything. Nova takes that belief somewhere new: a performance concept shaped by the quiet confidence of the archive and the open-ended energy of what comes next.</p><p>Every curve is purposeful. Every material earns its place. The result is a shoe that feels at home in the everyday, and ready for whatever lies beyond it.</p><ul className="feature-list"><li>Engineered mesh construction <span>01</span></li><li>Energy-return cushioning platform <span>02</span></li><li>Signature New Balance fit <span>03</span></li></ul></div>
    </section>
    <section className="launch-banner"><div><span className="eyebrow">The next step starts here</span><h2>Find your forward.</h2></div><a className="pill" href="#shop">Explore the collection <span aria-hidden="true">↗</span></a></section>
  </>;
}
