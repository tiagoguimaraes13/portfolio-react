import React from "react";
import { partners, demonstrations } from "./company";
export function PromotionBanner() {
  return (
    <aside className="company-promo" aria-label="Website services">
      <span>A new business. A fresh start. A website that feels like you.</span>
      <a href="#packages">Explore our solutions</a>
    </aside>
  );
}
export function DemoPromotion() {
  return (
    <aside className="section company-demo-promo">
      <div>
        <p className="eyebrow">Try the possibilities</p>
        <h3>See what your website could do.</h3>
        <p>
          Bookings, enquiries, online shopping and more. Explore the interactive
          concepts.
        </p>
      </div>
      <a className="button dark" href="#work">
        Explore the demos
      </a>
    </aside>
  );
}
export function PartnerShowcase() {
  return <section id="partners" className="section company-partners">
    <div className="section-heading"><div><p className="eyebrow">Partners & demonstrations</p><h2>Real businesses.<br /><em>Fresh possibilities.</em></h2></div><p>Independent website concepts created for real businesses. Explore the designs and interactions to see what we could build for you.</p></div>
    <p className="company-concept-disclosure">These are uncommissioned portfolio demonstrations, not confirmed client websites or partnerships. Forms, bookings and shopping flows are illustrative.</p>
    <div className="company-demonstration-grid">{demonstrations.map(demo => <a key={demo.name} href={demo.website} target="_blank" rel="noreferrer" className="company-demonstration-card"><div className="company-demonstration-image"><img src={demo.image} alt={`${demo.name} concept imagery`} loading="lazy"/><span>Independent concept</span></div><div className="company-demonstration-copy"><p className="eyebrow">{demo.category}</p><h3>{demo.name}</h3><p>{demo.description}</p><span className="company-demonstration-link">View demonstration ↗</span></div></a>)}</div>
    {partners.length > 0 && <div className="company-confirmed-partners"><h3>Confirmed partners</h3><div className="company-partner-grid">{partners.map(p => <a key={p.name} href={p.website} target="_blank" rel="noreferrer"><img src={p.logo} alt={p.name} loading="lazy"/><h3>{p.name}</h3><p>{p.description}</p><span>Visit website</span></a>)}</div></div>}
    <aside className="company-collaboration-banner"><div><p className="eyebrow">Your next chapter</p><h3>Your business could be our next collaboration.</h3></div><a className="button dark" href="#contact">Let’s talk</a></aside>
  </section>;
}
