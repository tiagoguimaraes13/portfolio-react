import React, { useEffect, useState } from "react";
import StudioCut from "./demos/StudioCut";
import {
  ServicePackages,
  CompanyFAQ,
} from "./components/company/BusinessSections";
import EnquiryWizard from "./components/company/EnquiryWizard";
import {
  PromotionBanner,
  DemoPromotion,
  PartnerShowcase,
} from "./components/company/PromotionPartners";
import LegalPage, { LegalLinks } from "./components/company/LegalPages";
import { company } from "./components/company/company";
import NordBuild from "./demos/NordBuild";
import FormStore from "./demos/FormStore";
import OliveTable from "./demos/OliveTable";
import StudioDashboard, { sampleAppointments } from "./demos/StudioDashboard";

const services = [
  [
    "01",
    "A fresh start.",
    "Business websites",
    "A clear, distinctive website that introduces your business and makes it easy for customers to take the next step.",
  ],
  [
    "02",
    "Your next chapter.",
    "Website redesigns",
    "Give your existing website a new direction, with better navigation, responsive layouts and a stronger brand presence.",
  ],
  [
    "03",
    "Beyond the ordinary.",
    "Custom web solutions",
    "Online stores, booking experiences and web applications built around what your business needs.",
  ],
  [
    "04",
    "An identity of your own.",
    "Logo design & visual identity",
    "Original logo design, colour palettes and a consistent visual direction for your business. Start with a logo or bring your brand and website together.",
  ],
];
const steps = [
  [
    "Discover",
    "We talk about your business, your customers and what your website needs to achieve.",
  ],
  [
    "Design",
    "We shape the visual direction and page layouts together, with room for your feedback.",
  ],
  [
    "Build",
    "Your design becomes a responsive website, with the features your business needs.",
  ],
  [
    "Launch",
    "We check the details, help you go live and discuss any ongoing support.",
  ],
];

function CompanyWebsite() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  function chooseService(service) {
    setSelectedService(service);
    document
      .getElementById("contact")
      ?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
      });
  }
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <PromotionBanner />
      <header className="header">
        <a
          className="wordmark"
          href="#home"
          aria-label="TOIMU Technologies home"
        >
          TOIMU Technologies OÜ
        </a>
        <button
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
        <nav
          id="navigation"
          className={menuOpen ? "navigation open" : "navigation"}
          aria-label="Main navigation"
        >
          {[
            ["services", "Services"],
            ["work", "Our work"],
            ["packages", "Solutions"],
            ["contact", "Contact"],
          ].map(([id, label]) => (
            <a
              key={id}
              className={id === "contact" ? "nav-contact" : ""}
              href={`#${id}`}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
        </nav>
      </header>
      <main id="main">
        <section id="home" className="hero section">
          <div className="hero-content">
            <p className="eyebrow">Web design & development</p>
            <h1>
              Websites that
              <br />
              <em>make a mark.</em>
            </h1>
            <p className="hero-description">
              Thoughtful design. Purposeful development.
              <br />
              Websites built for your next chapter.
            </p>
            <a className="button lime" href="#contact">
              Start your project
            </a>
          </div>
          <a className="hero-scroll" href="#work">
            Explore our work
          </a>
        </section>
        <section id="work" className="section work">
          <div className="section-heading">
            <div>
              <p className="eyebrow">01 / Selected work</p>
              <h2>
                Ideas made
                <br />
                <em>real.</em>
              </h2>
            </div>
            <p>
              Explore our own product and interactive concept websites. See what
              a tailored experience could look like for your business.
            </p>
          </div>
          <article className="studio-preview">
            <div className="studio-preview-art">
              <div>
                <p>Concept website · Interactive demo</p>
                <h3>STUDIO CUT.</h3>
                <span>A fresh cut. A fresh perspective.</span>
              </div>
              <a href="#/demo/studio-cut">View demo</a>
            </div>
            <div className="project-details">
              <div>
                <h3>A booking experience with style.</h3>
                <p>
                  A fictional barber studio with service selection, stylist
                  choice and an interactive appointment flow. Try it without
                  making a real booking.
                </p>
              </div>
              <div className="tags">
                <span>Barber & grooming</span>
                <span>Interactive booking</span>
                <span>Concept website</span>
              </div>
            </div>
          </article>
          <div className="extra-preview-grid">
            <article>
              <div className="extra-preview-cover build-preview">
                <div>
                  <p>Concept website · Construction</p>
                  <h3>NORD BUILD</h3>
                  <span>Built with care. Made to last.</span>
                </div>
                <a href="#/demo/nord-build">View construction demo</a>
              </div>
              <div className="project-details">
                <div>
                  <h3>A solid first impression.</h3>
                  <p>
                    Explore project concepts, filter by service and try an
                    example quote-request flow.
                  </p>
                </div>
              </div>
            </article>
            <article>
              <div className="extra-preview-cover store-preview">
                <div>
                  <p>Concept website · Online store</p>
                  <h3>FORM & FIELD</h3>
                  <span>A softer kind of home.</span>
                </div>
                <a href="#/demo/form-field">View store demo</a>
              </div>
              <div className="project-details">
                <div>
                  <h3>A shopping experience to explore.</h3>
                  <p>
                    Browse a fictional collection, choose finishes and try the
                    cart and simulated checkout.
                  </p>
                </div>
              </div>
            </article>
          </div>
          <article className="restaurant-preview">
            <div className="restaurant-preview-cover">
              <div>
                <p>Concept website · Restaurant</p>
                <h3>OLIVE & TABLE</h3>
                <span>Good food. Better company.</span>
              </div>
              <a href="#/demo/olive-table">View restaurant demo</a>
            </div>
            <div className="project-details">
              <div>
                <h3>An evening starts with a good website.</h3>
                <p>
                  A seasonal sample menu and a simulated table-reservation
                  experience.
                </p>
              </div>
              <div className="tags">
                <span>Restaurant</span>
                <span>Table reservations</span>
              </div>
            </div>
          </article>
        </section>
        <section id="services" className="section services">
          <p className="eyebrow">02 / What we do</p>
          <h2>
            Big ideas.
            <br />
            <em>Practical solutions.</em>
          </h2>
          <div className="service-list">
            {services.map(([number, title, label, description]) => (
              <article className="service" key={number}>
                <span className="service-number">{number}</span>
                <div>
                  <span className="eyebrow">{label}</span>
                  <h3>{title}</h3>
                </div>
                <p>{description}</p>
              </article>
            ))}
          </div>
          <div className="service-footer">
            <p>Starting from scratch or rebuilding what you have?</p>
            <a className="text-link" href="#contact">
              Let’s find the right approach
            </a>
          </div>
        </section>
        <DemoPromotion />
        <ServicePackages onChoose={chooseService} />
        <section className="section process">
          <div className="section-heading">
            <div>
              <p className="eyebrow">03 / The process</p>
              <h2>
                No mystery.
                <br />
                <em>Just momentum.</em>
              </h2>
            </div>
            <p>
              A straightforward process, clear communication and your feedback
              along the way.
            </p>
          </div>
          <div className="steps">
            {steps.map(([title, description], i) => (
              <article key={title}>
                <span className="step-index">0{i + 1}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>
        <PartnerShowcase />
        <CompanyFAQ />
        <section id="contact" className="section contact">
          <div>
            <p className="eyebrow">04 / Start a conversation</p>
            <h2>
              Your next
              <br />
              big thing
              <br />
              <em>starts here.</em>
            </h2>
            <p>
              Tell us a little about your business and what you have in mind.
              You don’t need a finished brief.
            </p>
            <a className="contact-email" href="mailto:hello@toimu.ee">
              hello@toimu.ee
            </a>
          </div>
          <EnquiryWizard selectedService={selectedService} />
        </section>
      </main>
      <footer className="footer">
        <div className="footer-top">
          <a className="wordmark" href="#home">
            TOIMU Technologies OÜ
          </a>
          <p>
            Websites with personality.
            <br />
            Solutions with purpose.
          </p>
        </div>
        <div className="company-footer-details">
          <span>
            {company.name} · Registry code {company.registry}
          </span>
          <span>{company.address}</span>
          <a href={`mailto:${company.email}`}>{company.email}</a>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} TOIMU Technologies OÜ</span>
          <span>Based in Estonia · Built for your business</span>
          <a href="#home">Back to top</a>
        </div>
      </footer>
    </>
  );
}
function App() {
  const [hash, setHash] = useState(window.location.hash);
  const [appointments, setAppointments] = useState(sampleAppointments);
  useEffect(() => {
    function handleHash() {
      setHash(window.location.hash);
    }
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);
  const demo = hash.split("?")[0];
  const isDemo = [
    "#/demo/studio-cut",
    "#/demo/nord-build",
    "#/demo/form-field",
    "#/demo/olive-table",
    "#/demo/studio-cut/dashboard",
  ].includes(demo);
  useEffect(() => {
    if (!isDemo && !hash.startsWith("#/legal/")) {
      document.title = "TOIMU Technologies OÜ — Web Design & Development";
      const target = hash.slice(1);
      if (target) document.getElementById(target)?.scrollIntoView();
      else window.scrollTo(0, 0);
    }
  }, [hash, isDemo]);
  let page = <CompanyWebsite />;
  if (demo === "#/demo/studio-cut")
    page = (
      <StudioCut
        onDemoBooking={(booking) =>
          setAppointments((previous) => [
            ...previous,
            { ...booking, id: `booking-${Date.now()}-${previous.length}` },
          ])
        }
      />
    );
  if (demo === "#/demo/studio-cut/dashboard")
    page = (
      <StudioDashboard
        appointments={appointments}
        onUpdate={(id, status) =>
          setAppointments((previous) =>
            previous.map((a) => (a.id === id ? { ...a, status } : a))
          )
        }
        onReset={() => setAppointments(sampleAppointments())}
      />
    );
  if (demo === "#/demo/olive-table") page = <OliveTable />;
  if (demo === "#/demo/nord-build") page = <NordBuild />;
  if (demo === "#/demo/form-field") page = <FormStore />;

  if (demo.startsWith("#/legal/"))
    page = <LegalPage kind={demo.split("/")[2]} />;
  return (
    <>
      {page}
      <LegalLinks />
    </>
  );
}
export default App;
