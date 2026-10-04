import React, { useEffect, useState } from "react";
import "./more-demos.css";
import "./solutions.css";
import QuoteCalculator from "./QuoteCalculator";
const projects = [
  {
    title: "The woodland home",
    category: "New homes",
    description:
      "A concept for a timber-clad family home with open living spaces and a generous connection to the outdoors.",
    scope: "New build · Timber & stone · Family home",
  },
  {
    title: "A kitchen, reimagined",
    category: "Renovations",
    description:
      "An illustrative renovation bringing better storage, natural materials and a brighter layout into an existing home.",
    scope: "Interior renovation · Kitchen & living space",
  },
  {
    title: "Room to grow",
    category: "Extensions",
    description:
      "A concept extension creating more room for everyday life while respecting the character of the original home.",
    scope: "Home extension · Planning & construction",
  },
];
export default function NordBuild() {
  const [filter, setFilter] = useState("All projects");
  const [selected, setSelected] = useState(null);
  const [request, setRequest] = useState(null);
  const [quoteText, setQuoteText] = useState("");
  const [quoteType, setQuoteType] = useState("New home");
  useEffect(() => {
    document.title = "NORD BUILD — Construction website concept | TOIMU";
    window.scrollTo(0, 0);
  }, []);
  function scroll(id) {
    document.getElementById(id)?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  }
  function submit(e) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    setRequest({
      name: d.get("name").trim(),
      type: d.get("type"),
      location: d.get("location"),
      budget: d.get("budget"),
      timing: d.get("timing"),
    });
  }
  return (
    <div className="build-site">
      <div className="demo-strip">
        <a href="#work">Back to TOIMU Technologies</a>
        <span>Concept website · Fictional company · No enquiries sent</span>
      </div>
      <header className="build-header">
        <a href="#/demo/nord-build" className="build-logo">
          NORD<span>BUILD</span>
        </a>
        <nav aria-label="Construction navigation">
          <button onClick={() => scroll("build-services")}>Expertise</button>
          <button onClick={() => scroll("build-projects")}>Projects</button>
          <button
            className="build-button"
            onClick={() => scroll("build-quote")}
          >
            Discuss a project
          </button>
        </nav>
      </header>
      <main>
        <section className="build-hero">
          <div>
            <p className="demo-kicker">Spaces for the way you live.</p>
            <h1>
              Built with care.
              <br />
              Made to last.
            </h1>
            <p>
              From the first conversation to the final detail.
              <br />A thoughtful approach to homes and renovations.
            </p>
            <button
              className="build-button"
              onClick={() => scroll("build-quote")}
            >
              Plan your project
            </button>
          </div>
          <div
            className="build-hero-image"
            role="img"
            aria-label="Illustrative contemporary timber and stone home"
          />
        </section>
        <section id="build-services" className="build-section">
          <div className="build-heading">
            <p className="demo-kicker">01 / Our expertise</p>
            <h2>
              Your vision.
              <br />
              Solid foundations.
            </h2>
          </div>
          <div className="build-services">
            {[
              [
                "New homes",
                "A home shaped around your needs, from initial plans to the finishing touches.",
              ],
              [
                "Renovations",
                "Make more of the space you already have, with thoughtful layouts and considered finishes.",
              ],
              [
                "Extensions",
                "Space to grow, designed to sit naturally alongside your existing home.",
              ],
            ].map(([name, description], i) => (
              <article key={name}>
                <span>0{i + 1}</span>
                <h3>{name}</h3>
                <p>{description}</p>
                <button onClick={() => scroll("build-quote")}>
                  Explore your options
                </button>
              </article>
            ))}
          </div>
        </section>
        <section id="build-projects" className="build-section build-projects">
          <p className="demo-kicker">02 / Project concepts</p>
          <h2>A sense of possibility.</h2>
          <p className="build-intro">
            Illustrative project stories for this fictional construction
            company.
          </p>
          <div
            className="build-filters"
            role="group"
            aria-label="Filter project concepts"
          >
            {["All projects", "New homes", "Renovations", "Extensions"].map(
              (f) => (
                <button
                  key={f}
                  aria-pressed={f === filter}
                  onClick={() => {
                    setFilter(f);
                    setSelected(null);
                  }}
                >
                  {f}
                </button>
              )
            )}
          </div>
          <div className="build-project-grid">
            {projects
              .filter((p) => filter === "All projects" || filter === p.category)
              .map((p, i) => (
                <article key={p.title}>
                  <div
                    className={`build-project-cover project-cover-${projects.indexOf(
                      p
                    )}`}
                  >
                    <span>{p.category}</span>
                  </div>
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                  <button
                    aria-expanded={selected === p.title}
                    onClick={() =>
                      setSelected(selected === p.title ? null : p.title)
                    }
                  >
                    {selected === p.title
                      ? "Close project details"
                      : "View project details"}
                  </button>
                  {selected === p.title && (
                    <div className="build-project-detail">
                      <strong>Concept scope</strong>
                      <p>{p.scope}</p>
                      <p>
                        Illustrative imagery and project details. This is a
                        design demonstration, not a completed client project.
                      </p>
                      <button
                        className="build-button"
                        onClick={() => scroll("build-quote")}
                      >
                        Plan something similar
                      </button>
                    </div>
                  )}
                </article>
              ))}
          </div>
        </section>
        <section className="build-section build-process">
          <div>
            <p className="demo-kicker">03 / How we work</p>
            <h2>
              Clear plans.
              <br />
              At every step.
            </h2>
          </div>
          <ol>
            {[
              ["Listen", "Your goals, your property and your priorities."],
              ["Plan", "Scope, materials and a programme you can understand."],
              [
                "Build",
                "An organised approach, with regular progress updates.",
              ],
              [
                "Handover",
                "The final details checked and your space ready to use.",
              ],
            ].map(([title, description]) => (
              <li key={title}>
                <h3>{title}</h3>
                <p>{description}</p>
              </li>
            ))}
          </ol>
        </section>
        <QuoteCalculator
          onUse={(details) => {
            setQuoteText(details.text);
            setQuoteType(details.type);
            setRequest(null);
            scroll("build-quote");
          }}
        />
        <section id="build-quote" className="build-section build-quote">
          <div>
            <p className="demo-kicker">04 / Start with a conversation</p>
            <h2>
              What do you
              <br />
              have in mind?
            </h2>
            <p>
              Try this example quote request. Use fictional details; nothing is
              sent or stored on a server.
            </p>
          </div>
          {request ? (
            <div className="build-request" role="status">
              <p className="demo-kicker">Demo request prepared</p>
              <h3>Thanks, {request.name}.</h3>
              <p>This is how an enquiry confirmation could look.</p>
              <dl>
                <dt>Project</dt>
                <dd>{request.type}</dd>
                <dt>Location</dt>
                <dd>{request.location}</dd>
                <dt>Budget</dt>
                <dd>{request.budget}</dd>
                <dt>Timing</dt>
                <dd>{request.timing}</dd>
              </dl>
              <p>No request was sent and no quote will be issued.</p>
              <button className="build-button" onClick={() => setRequest(null)}>
                Try another request
              </button>
              <a href="#contact">Discuss a website for your company</a>
            </div>
          ) : (
            <form onSubmit={submit}>
              <div className="demo-form-row">
                <label>
                  Your name
                  <input
                    name="name"
                    required
                    pattern=".*\S.*"
                    maxLength={80}
                    placeholder="Demo Guest"
                  />
                </label>
                <label>
                  Email
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                  />
                </label>
              </div>
              <div className="demo-form-row">
                <label>
                  Project type
                  <select
                    name="type"
                    value={quoteType}
                    onChange={(e) => setQuoteType(e.target.value)}
                  >
                    <option>New home</option>
                    <option>Renovation</option>
                    <option>Extension</option>
                  </select>
                </label>
                <label>
                  Project location
                  <input
                    name="location"
                    required
                    maxLength={120}
                    placeholder="Town or area"
                  />
                </label>
              </div>
              <div className="demo-form-row">
                <label>
                  Approximate budget
                  <select name="budget">
                    <option>Still exploring</option>
                    <option>Under €50,000</option>
                    <option>€50,000–€150,000</option>
                    <option>€150,000+</option>
                  </select>
                </label>
                <label>
                  When are you thinking?
                  <select name="timing">
                    <option>Just gathering ideas</option>
                    <option>Within 3 months</option>
                    <option>Within 6 months</option>
                    <option>Later this year</option>
                  </select>
                </label>
              </div>
              <label>
                Your project
                <textarea
                  name="message"
                  value={quoteText}
                  onChange={(e) => setQuoteText(e.target.value)}
                  required
                  rows={4}
                  maxLength={4000}
                  placeholder="Tell us about your plans…"
                />
              </label>
              <p className="demo-form-note">
                Demo only. No real enquiry is sent.
              </p>
              <button className="build-button" type="submit">
                Preview enquiry confirmation
              </button>
            </form>
          )}
        </section>
      </main>
      <footer className="build-footer">
        <span className="build-logo">
          NORD<span>BUILD</span>
        </span>
        <p>Construction website concept by TOIMU Technologies OÜ</p>
        <a href="#work">Return to portfolio</a>
      </footer>
    </div>
  );
}
