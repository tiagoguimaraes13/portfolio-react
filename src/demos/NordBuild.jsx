import "./more-demos.css";
import "./solutions.css";
import { useDemoLanguage, DemoLanguageSwitcher } from "../i18n/DemoLanguage";
import React, { useEffect, useState } from "react";
import QuoteCalculator from "./QuoteCalculator";
const projects = [{
  title: "The woodland home",
  category: "New homes",
  description: "A concept for a timber-clad family home with open living spaces and a generous connection to the outdoors.",
  scope: "New build · Timber & stone · Family home"
}, {
  title: "A kitchen, reimagined",
  category: "Renovations",
  description: "An illustrative renovation bringing better storage, natural materials and a brighter layout into an existing home.",
  scope: "Interior renovation · Kitchen & living space"
}, {
  title: "Room to grow",
  category: "Extensions",
  description: "A concept extension creating more room for everyday life while respecting the character of the original home.",
  scope: "Home extension · Planning & construction"
}];
export default function NordBuild() {
  const {
    tr,
    language
  } = useDemoLanguage();
  const [filter, setFilter] = useState("All projects");
  const [selected, setSelected] = useState(null);
  const [request, setRequest] = useState(null);
  const [quoteText, setQuoteText] = useState("");
  const [quoteType, setQuoteType] = useState("New home");
  useEffect(() => {
    document.title = tr('NORD BUILD — Construction website concept | TOIMU');
  }, [language, tr]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function scroll(id) {
    document.getElementById(id)?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
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
      timing: d.get("timing")
    });
  }

  return <div className="build-site">
      <div className="demo-strip">
        <a href="#work">{tr("Back to TOIMU Technologies")}</a>
        <span>{tr("Concept website \xB7 Fictional company \xB7 No enquiries sent")}</span>
      </div>
      <header className="build-header">
      <DemoLanguageSwitcher />
        <a href="#/demo/nord-build" className="build-logo">
          NORD<span>BUILD</span>
        </a>
        <nav aria-label={tr("Construction navigation")}>
          <button onClick={() => scroll("build-services")}>{tr("Expertise")}</button>
          <button onClick={() => scroll("build-projects")}>{tr("Projects")}</button>
          <button className="build-button" onClick={() => scroll("build-quote")}>{tr("Discuss a project")}</button>
        </nav>
      </header>
      <main>
        <section className="build-hero">
          <div>
            <p className="demo-kicker">{tr("Spaces for the way you live.")}</p>
            <h1>{tr("Built with care.")}<br />{tr("Made to last.")}</h1>
            <p>{tr("From the first conversation to the final detail.")}<br />{tr("A thoughtful approach to homes and renovations.")}</p>
            <button className="build-button" onClick={() => scroll("build-quote")}>{tr("Plan your project")}</button>
          </div>
          <div className="build-hero-image" role="img" aria-label={tr("Illustrative contemporary timber and stone home")} />
        </section>
        <section id="build-services" className="build-section">
          <div className="build-heading">
            <p className="demo-kicker">{tr("01 / Our expertise")}</p>
            <h2>{tr("Your vision.")}<br />{tr("Solid foundations.")}</h2>
          </div>
          <div className="build-services">
            {[["New homes", "A home shaped around your needs, from initial plans to the finishing touches."], ["Renovations", "Make more of the space you already have, with thoughtful layouts and considered finishes."], ["Extensions", "Space to grow, designed to sit naturally alongside your existing home."]].map(([name, description], i) => {
            return <article key={name}>
                <span>0{i + 1}</span>
                <h3>{tr(name)}</h3>
                <p>{tr(description)}</p>
                <button onClick={() => scroll("build-quote")}>{tr("Explore your options")}</button>
              </article>;
          })}
          </div>
        </section>
        <section id="build-projects" className="build-section build-projects">
          <p className="demo-kicker">{tr("02 / Project concepts")}</p>
          <h2>{tr("A sense of possibility.")}</h2>
          <p className="build-intro">{tr("Illustrative project stories for this fictional construction company.")}</p>
          <div className="build-filters" role="group" aria-label={tr("Filter project concepts")}>
            {["All projects", "New homes", "Renovations", "Extensions"].map(f => {
            return <button key={f} aria-pressed={f === filter} onClick={() => {
              setFilter(f);
              setSelected(null);
            }}>
                  {tr(f)}
                </button>;
          })}
          </div>
          <div className="build-project-grid">
            {projects.filter(p => filter === "All projects" || filter === p.category).map((p, i) => {
            return <article key={p.title}>
                  <div className={`build-project-cover project-cover-${projects.indexOf(p)}`}>
                    <span>{tr(p.category)}</span>
                  </div>
                  <h3>{tr(p.title)}</h3>
                  <p>{tr(p.description)}</p>
                  <button aria-expanded={selected === p.title} onClick={() => setSelected(selected === p.title ? null : p.title)}>
                    {tr(selected === p.title ? "Close project details" : "View project details")}
                  </button>
                  {selected === p.title && <div className="build-project-detail">
                      <strong>{tr("Concept scope")}</strong>
                      <p>{tr(p.scope)}</p>
                      <p>{tr("Illustrative imagery and project details. This is a design demonstration, not a completed client project.")}</p>
                      <button className="build-button" onClick={() => scroll("build-quote")}>{tr("Plan something similar")}</button>
                    </div>}
                </article>;
          })}
          </div>
        </section>
        <section className="build-section build-process">
          <div>
            <p className="demo-kicker">{tr("03 / How we work")}</p>
            <h2>{tr("Clear plans.")}<br />{tr("At every step.")}</h2>
          </div>
          <ol>
            {[["Listen", "Your goals, your property and your priorities."], ["Plan", "Scope, materials and a programme you can understand."], ["Build", "An organised approach, with regular progress updates."], ["Handover", "The final details checked and your space ready to use."]].map(([title, description]) => {
            return <li key={title}>
                <h3>{tr(title)}</h3>
                <p>{tr(description)}</p>
              </li>;
          })}
          </ol>
        </section>
        <QuoteCalculator onUse={details => {
        setQuoteText(details.text);
        setQuoteType(details.type);
        setRequest(null);
        scroll("build-quote");
      }} />
        <section id="build-quote" className="build-section build-quote">
          <div>
            <p className="demo-kicker">{tr("04 / Start with a conversation")}</p>
            <h2>{tr("What do you")}<br />{tr("have in mind?")}</h2>
            <p>{tr("Try this example quote request. Use fictional details; nothing is sent or stored on a server.")}</p>
          </div>
          {request ? <div className="build-request" role="status">
              <p className="demo-kicker">{tr("Demo request prepared")}</p>
              <h3>{tr("Thanks,")}{" "}{request.name}.</h3>
              <p>{tr("This is how an enquiry confirmation could look.")}</p>
              <dl>
                <dt>{tr("Project")}</dt>
                <dd>{tr(request.type)}</dd>
                <dt>{tr("Location")}</dt>
                <dd>{request.location}</dd>
                <dt>{tr("Budget")}</dt>
                <dd>{tr(request.budget)}</dd>
                <dt>{tr("Timing")}</dt>
                <dd>{tr(request.timing)}</dd>
              </dl>
              <p>{tr("No request was sent and no quote will be issued.")}</p>
              <button className="build-button" onClick={() => setRequest(null)}>{tr("Try another request")}</button>
              <a href="#contact">{tr("Discuss a website for your company")}</a>
            </div> : <form onSubmit={submit}>
              <div className="demo-form-row">
                <label>{tr("Your name")}<input name="name" required pattern=".*\S.*" maxLength={80} placeholder={tr("Demo Guest")} />
                </label>
                <label>{tr("Email")}<input name="email" type="email" required placeholder="you@example.com" />
                </label>
              </div>
              <div className="demo-form-row">
                <label>{tr("Project type")}<select name="type" value={quoteType} onChange={e => setQuoteType(e.target.value)}>
                    <option value={"New home"}>{tr("New home")}</option>
                    <option value={"Renovation"}>{tr("Renovation")}</option>
                    <option value={"Extension"}>{tr("Extension")}</option>
                  </select>
                </label>
                <label>{tr("Project location")}<input name="location" required maxLength={120} placeholder={tr("Town or area")} />
                </label>
              </div>
              <div className="demo-form-row">
                <label>{tr("Approximate budget")}<select name="budget">
                    <option value={"Still exploring"}>{tr("Still exploring")}</option>
                    <option value={"Under \u20AC50,000"}>{tr("Under \u20AC50,000")}</option>
                    <option value={"\u20AC50,000\u2013\u20AC150,000"}>€50,000–€150,000</option>
                    <option value={"\u20AC150,000+"}>€150,000+</option>
                  </select>
                </label>
                <label>{tr("When are you thinking?")}<select name="timing">
                    <option value={"Just gathering ideas"}>{tr("Just gathering ideas")}</option>
                    <option value={"Within 3 months"}>{tr("Within 3 months")}</option>
                    <option value={"Within 6 months"}>{tr("Within 6 months")}</option>
                    <option value={"Later this year"}>{tr("Later this year")}</option>
                  </select>
                </label>
              </div>
              <label>{tr("Your project")}<textarea name="message" value={quoteText} onChange={e => setQuoteText(e.target.value)} required rows={4} maxLength={4000} placeholder={tr("Tell us about your plans…")} />
              </label>
              <p className="demo-form-note">{tr("Demo only. No real enquiry is sent.")}</p>
              <button className="build-button" type="submit">{tr("Preview enquiry confirmation")}</button>
            </form>}
        </section>
      </main>
      <footer className="build-footer">
        <span className="build-logo">
          NORD<span>BUILD</span>
        </span>
        <p>{tr("Construction website concept by TOIMU Technologies O\xDC")}</p>
        <a href="#work">{tr("Return to portfolio")}</a>
      </footer>
    </div>;
}
