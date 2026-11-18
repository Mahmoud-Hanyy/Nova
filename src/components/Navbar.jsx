"use client";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [["#gallery", "The details"], ["#technology", "Technology"], ["#shop", "Shop"]];
export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 35);
    update(); window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return <header className={`site-nav${scrolled ? " scrolled" : ""}`}>
    <a className="brand" href="#home" aria-label="New Balance Nova home">new balance<span style={{fontSize:10,marginLeft:5}}>®</span></a>
    <nav className="nav-links" aria-label="Main navigation">{links.map(([href, label]) => <a key={href} href={href}>{label}</a>)}</nav>
    <a className="nav-cta" href="#shop">Discover Nova <span aria-hidden="true">↗</span></a>
    <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>{open ? <X size={22}/> : <Menu size={22}/>}</button>
    {open && <nav className="mobile-menu" aria-label="Mobile navigation">{links.map(([href, label]) => <a key={href} onClick={() => setOpen(false)} href={href}>{label}</a>)}</nav>}
  </header>;
}
