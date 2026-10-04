import "./solutions.css";
import { useDemoLanguage, DemoLanguageSwitcher } from "../i18n/DemoLanguage";
import React, { useEffect, useState } from "react";
import { futureDate } from "./StudioDashboard";
const dishes = [["Small plates", "Burrata & tomatoes", "Creamy burrata, seasonal tomatoes, basil oil.", 12, "Vegetarian"], ["Small plates", "Charred carrots", "Roasted carrots, whipped tahini, toasted seeds.", 9, "Vegan"], ["Main plates", "Roast chicken", "Herb-roasted chicken, seasonal greens, pan jus.", 22, ""], ["Main plates", "Wild mushroom risotto", "Arborio rice, woodland mushrooms, aged cheese.", 19, "Vegetarian"], ["Something sweet", "Olive oil cake", "Citrus, vanilla cream and a little sea salt.", 8, "Vegetarian"], ["Something sweet", "Seasonal sorbet", "A changing selection of fruit flavours.", 6, "Vegan"]];
export default function OliveTable() {
  const {
    tr,
    language
  } = useDemoLanguage();
  const [category, setCategory] = useState("All");
  const [confirmation, setConfirmation] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => {
    document.title = tr('OLIVE & TABLE — Restaurant concept | TOIMU');
  }, [language, tr]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function scroll(id) {
    document.getElementById(id)?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
    });
  }

  function reserve(e) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);

    if (d.get("date") < futureDate()) {
      setError("Choose tomorrow or a later date.");
      return;
    }

    setError("");
    setConfirmation({
      name: d.get("name").trim(),
      date: d.get("date"),
      time: d.get("time"),
      guests: d.get("guests")
    });
  }

  return <div className="olive-site">
      <div className="demo-strip">
        <a href="#work">{tr("Back to TOIMU Technologies")}</a>
        <span>{tr("Restaurant concept \xB7 No real table reservations")}</span>
      </div>
      <header className="olive-header">
      <DemoLanguageSwitcher />
        <a href="#/demo/olive-table" className="olive-logo">
          OLIVE <i>&</i> TABLE
        </a>
        <nav aria-label={tr("Restaurant navigation")}>
          <button onClick={() => scroll("olive-menu")}>{tr("The menu")}</button>
          <button className="olive-button" onClick={() => scroll("olive-reserve")}>{tr("Find a table")}</button>
        </nav>
      </header>
      <main>
        <section className="olive-hero">
          <div>
            <p className="demo-kicker">{tr("A place to slow down.")}</p>
            <h1>{tr("Good food.")}<br />{tr("Better company.")}</h1>
            <p>{tr("Seasonal plates, unhurried evenings")}<br />{tr("and a seat at the table.")}</p>
            <button className="olive-button" onClick={() => scroll("olive-reserve")}>{tr("Reserve your evening")}</button>
          </div>
        </section>
        <section className="olive-story">
          <p className="demo-kicker">{tr("The neighbourhood table")}</p>
          <h2>{tr("Come as you are.")}<br />
            <em>{tr("Stay for another course.")}</em>
          </h2>
          <p>{tr("A fictional neighbourhood restaurant, built around simple ingredients and the pleasure of sharing a meal. Explore the sample menu and try the reservation experience.")}</p>
        </section>
        <section id="olive-menu" className="olive-menu">
          <p className="demo-kicker">{tr("On the menu")}</p>
          <h2>{tr("A little of what you love.")}</h2>
          <div className="olive-filters" role="group" aria-label={tr("Menu categories")}>
            {["All", "Small plates", "Main plates", "Something sweet"].map(c => {
            return <button key={c} aria-pressed={c === category} onClick={() => setCategory(c)}>
                  {tr(c)}
                </button>;
          })}
          </div>
          <div className="olive-dishes">
            {dishes.filter(d => category === "All" || d[0] === category).map(([group, name, description, price, diet]) => {
            return <article key={name}>
                  <div>
                    <span>{tr(group)}</span>
                    <h3>{tr(name)}</h3>
                    <p>{tr(description)}</p>
                    {diet && <small>{tr(diet)}</small>}
                  </div>
                  <strong>€{price}</strong>
                </article>;
          })}
          </div>
          <p className="olive-note">{tr("Sample menu and prices. Dietary labels are illustrative; a real restaurant must confirm ingredients and allergens.")}</p>
        </section>
        <section id="olive-reserve" className="olive-reserve">
          <div>
            <p className="demo-kicker">{tr("Make an evening of it")}</p>
            <h2>{tr("A table")}<br />
              <em>{tr("for your people.")}</em>
            </h2>
            <p>{tr("Try a simulated reservation for 1\u20138 guests. Example time slots are shown; no real availability is checked.")}</p>
          </div>
          {confirmation ? <div className="olive-confirmation" role="status">
              <p className="demo-kicker">{tr("Demo reservation complete")}</p>
              <h3>{tr("A seat for you,")}{" "}{confirmation.name}.</h3>
              <dl>
                <dt>{tr("Guests")}</dt>
                <dd>{confirmation.guests}</dd>
                <dt>{tr("Date")}</dt>
                <dd>{confirmation.date}</dd>
                <dt>{tr("Time")}</dt>
                <dd>{confirmation.time}</dd>
              </dl>
              <p>{tr("No table was reserved and no email was sent. These details exist only in this demo session.")}</p>
              <button className="olive-button" onClick={() => setConfirmation(null)}>{tr("Try another reservation")}</button>
              <a href="#contact">{tr("Build a restaurant website with us")}</a>
            </div> : <form onSubmit={reserve}>
              <div className="demo-form-row">
                <label>{tr("Number of guests")}<select name="guests">
                    {Array.from({
                  length: 8
                }, (_, i) => {
                  return <option key={i + 1} value={i + 1}>
                        {i + 1} {tr(i === 0 ? "guest" : "guests")}
                      </option>;
                })}
                  </select>
                </label>
                <label>{tr("Date")}<input name="date" type="date" min={futureDate()} required />
                </label>
              </div>
              <label>{tr("Preferred time")}<select name="time">
                  {["17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30"].map(t => {
                return <option key={t} value={t}>{t}</option>;
              })}
                </select>
              </label>
              <div className="demo-form-row">
                <label>{tr("Your name")}<input name="name" required maxLength={80} pattern=".*\S.*" placeholder={tr("Demo Guest")} />
                </label>
                <label>{tr("Email address")}<input name="email" type="email" required placeholder="you@example.com" />
                </label>
              </div>
              <label>{tr("Anything to note?")}<textarea name="notes" rows={3} maxLength={1000} placeholder={tr("Optional demo notes")} />
              </label>
              <p className="olive-note">{tr("Use fictional details. No reservation or message is sent.")}</p>
              {error && <p role="alert">{tr(error)}</p>}
              <button className="olive-button" type="submit">{tr("Confirm demo reservation")}</button>
            </form>}
        </section>
      </main>
      <footer className="olive-footer">
        <span className="olive-logo">
          OLIVE <i>&</i> TABLE
        </span>
        <p>{tr("Restaurant concept by TOIMU Technologies O\xDC")}</p>
        <a href="#work">{tr("Back to portfolio")}</a>
      </footer>
    </div>;
}
