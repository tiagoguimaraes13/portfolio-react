import React, { useState } from "react";
import { partners, demonstrations, ownProduct } from "./company";
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
  const [paused, setPaused] = useState(false);
  return <section id="partners" className="section company-partners">
    <div className="section-heading"><div><p className="eyebrow">Partners & demonstrations</p><h2>Real businesses.<br /><em>Fresh possibilities.</em></h2></div><p>Independent website concepts created for real businesses. Explore the designs and interactions to see what we could build for you.</p></div>
    <p className="company-concept-disclosure">TOIMU is our own live product. The other websites are uncommissioned portfolio demonstrations, not confirmed client websites or partnerships; their forms and shopping flows are illustrative.</p>
    <div className={`company-logo-carousel${paused ? " is-paused" : ""}`}>
      <div className="company-logo-track">
        {[false, true].map(duplicate => <div className="company-logo-group" key={String(duplicate)} aria-hidden={duplicate ? "true" : undefined}>
          {[ownProduct, ...demonstrations].map(demo => <a key={demo.name} href={demo.website} target="_blank" rel="noreferrer" className="company-logo-card" tabIndex={duplicate ? -1 : undefined} aria-label={demo === ownProduct ? "Explore TOIMU — our own product" : `View ${demo.name} website demonstration`}>
            <img src={demo.logo} alt={demo.name} loading="lazy" />
            <span>{demo.category}</span>
            <span className="company-logo-visit">{demo === ownProduct ? "Explore TOIMU ↗" : "View demo ↗"}</span>
          </a>)}
        </div>)}
      </div>
    </div>
    <div className="company-logo-caption"><p>Original logos created by us. Our own product and independent website demonstrations.</p><button type="button" aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? "Play logo animation" : "Pause logo animation"}</button></div>
    {partners.length > 0 && <div className="company-confirmed-partners"><h3>Confirmed partners</h3><div className="company-partner-grid">{partners.map(p => <a key={p.name} href={p.website} target="_blank" rel="noreferrer"><img src={p.logo} alt={p.name} loading="lazy"/><h3>{p.name}</h3><p>{p.description}</p><span>Visit website</span></a>)}</div></div>}
    <aside className="company-collaboration-banner"><div><p className="eyebrow">Your next chapter</p><h3>Your business could be our next collaboration.</h3></div><a className="button dark" href="#contact">Let’s talk</a></aside>
  </section>;
}
