import Image from "next/image";
import LightImage from "../assets/light.jpg";
import DarkImage from "../assets/dark.jpg";
import SideImage from "../assets/side.jpg";
import { LaunchUpdateLink } from "./LaunchUpdateLink";

const colorways = [
  {name:"Sea Salt / Moonbeam", note:"A new classic", image:LightImage, badge:"01 / Original"},
  {name:"Phantom / Castlerock", note:"Made for the after hours", image:DarkImage, badge:"02 / Night"},
  {name:"Stone / Solar Orange", note:"A limited edition", image:SideImage, badge:"03 / Limited"},
];

export function Shop() {
  return <section id="shop" className="section shop-section"><div className="shop-top"><div><span className="eyebrow">The Nova collection</span><h2 className="section-title">Three ways forward.</h2></div><p className="shop-note">One considered silhouette. Three distinct expressions. Find the colorway that feels like you.</p></div><div className="product-grid">{colorways.map((item) => <article className="product-card" key={item.name}><div className="product-image"><Image src={item.image} alt={`${item.name} Nova colorway`} /><span className="product-index">{item.badge}</span></div><div className="product-meta"><div><h3>{item.name}</h3><p>{item.note}</p></div><span className="product-price">$180</span></div><LaunchUpdateLink name={item.name} /></article>)}</div></section>;
}
