import { useDemoLanguage, DemoLanguageSwitcher } from "../i18n/DemoLanguage";
import React, { useEffect, useRef, useState } from "react";
const services = [{
  name: "Signature cut",
  time: 45,
  price: 35,
  description: "A consultation, precision cut and a finish that feels like you."
}, {
  name: "Cut & beard",
  time: 60,
  price: 50,
  description: "A fresh cut, beard shaping and the details taken care of."
}, {
  name: "Beard sculpt",
  time: 30,
  price: 25,
  description: "Clean lines, balanced shape and a little extra attention."
}];
const stylists = [{
  name: "Alex",
  detail: "Classic cuts & modern fades",
  initials: "A"
}, {
  name: "Robin",
  detail: "Texture & scissor work",
  initials: "R"
}, {
  name: "Sam",
  detail: "Beard shaping & sharp detail",
  initials: "S"
}];
const slots = ["09:00", "10:15", "11:30", "13:00", "14:15", "15:30", "16:45"];
const stages = ["Service", "Stylist", "Date & time", "Your details"];

function nextDay() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function displayDate(value, language) {
  return new Intl.DateTimeFormat(language, {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(`${value}T12:00:00`));
}

export default function StudioCut({
  onDemoBooking
}) {
  const {
    tr,
    language
  } = useDemoLanguage();
  const [service, setService] = useState(null);
  const [stylist, setStylist] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [step, setStep] = useState(0);
  const [confirmed, setConfirmed] = useState(false);
  const [customer, setCustomer] = useState("");
  const [error, setError] = useState("");
  const heading = useRef(null);
  const firstMount = useRef(true);
  useEffect(() => {
    document.title = tr('STUDIO CUT — Interactive booking concept | TOIMU');
  }, [language, tr]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    if (firstMount.current) {
      firstMount.current = false;
      return;
    }

    heading.current?.focus({
      preventScroll: true
    });
  }, [step, confirmed]);

  function moveToBooking() {
    document.getElementById("cut-booking")?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
    });
  }

  function next() {
    const valid = [!!service, !!stylist, !!date && date >= nextDay() && slots.includes(time)][step];

    if (!valid) {
      setError(["Choose a service to continue.", "Choose a stylist to continue.", "Choose a future date and a time to continue."][step]);
      return;
    }

    setError("");
    setStep(step + 1);
  }

  function confirm(event) {
    event.preventDefault();

    if (!service || !stylist || !date || date < nextDay() || !slots.includes(time)) {
      setStep(2);
      setError("Please choose a future date and time.");
      return;
    }

    const name = new FormData(event.currentTarget).get("name").trim();
    setCustomer(name);
    onDemoBooking?.({
      name,
      service: service.name,
      stylist: stylist.name,
      date,
      time,
      duration: service.time,
      price: service.price,
      status: "Booked"
    });
    setConfirmed(true);
  }

  function reset() {
    setService(null);
    setStylist(null);
    setDate("");
    setTime("");
    setCustomer("");
    setConfirmed(false);
    setStep(0);
    setError("");
  }

  return <div className="cut-site">
      <div className="cut-demo-banner">
        <a href="#work">{tr("Back to TOIMU Technologies")}</a>
        <span>{tr("Concept website \xB7 Interactive demo \xB7 No real bookings")}</span>
        <a href="#/demo/studio-cut/dashboard">{tr("Try the staff dashboard")}</a>
      </div>
      <header className="cut-header">
      <DemoLanguageSwitcher />
        <a href="#/demo/studio-cut" className="cut-logo">
          STUDIO<span>CUT.</span>
        </a>
        <nav aria-label={tr("Studio Cut navigation")}>
          <button onClick={() => document.getElementById("cut-services").scrollIntoView({
          behavior: "smooth"
        })}>{tr("The services")}</button>
          <button onClick={() => document.getElementById("cut-team").scrollIntoView({
          behavior: "smooth"
        })}>{tr("The team")}</button>
          <button className="cut-button" onClick={moveToBooking}>{tr("Book a chair")}</button>
        </nav>
      </header>
      <main>
        <section className="cut-hero">
          <div>
            <p className="cut-kicker">{tr("Good hair. Good company.")}</p>
            <h1>{tr("A fresh cut.")}<br />{tr("A fresh")}{" "}<em>{tr("perspective.")}</em>
            </h1>
            <p>{tr("A little time for yourself. A cut that feels right.")}<br />{tr("Welcome to your new favourite chair.")}</p>
            <button className="cut-button" onClick={moveToBooking}>{tr("Find your next cut")}</button>
          </div>
          <span className="cut-hero-caption">{tr("STUDIO CUT / BARBER & GROOMING CONCEPT")}</span>
        </section>
        <section id="cut-services" className="cut-section">
          <div className="cut-section-title">
            <p className="cut-kicker">{tr("01 / The services")}</p>
            <h2>{tr("Keep it simple.")}<br />
              <em>{tr("Make it yours.")}</em>
            </h2>
            <p>{tr("Illustrative services and prices for this concept studio.")}</p>
          </div>
          <div className="cut-services">
            {services.map((s, i) => {
            return <article key={s.name}>
                <span className="cut-number">0{i + 1}</span>
                <h3>{tr(s.name)}</h3>
                <p>{tr(s.description)}</p>
                <div className="cut-service-meta">
                  <span>{s.time}{" "}{tr("minutes")}</span>
                  <strong>€{s.price}</strong>
                </div>
                <button onClick={() => {
                setService(s);
                setStep(1);
                setConfirmed(false);
                setError("");
                moveToBooking();
              }}>{tr("Choose")}{" "}{language === "en" ? s.name.toLowerCase() : tr(s.name)}
                </button>
              </article>;
          })}
          </div>
        </section>
        <section id="cut-team" className="cut-section cut-team">
          <div className="cut-section-title">
            <p className="cut-kicker">{tr("02 / The people")}</p>
            <h2>{tr("Find your")}<br />
              <em>{tr("kind of stylist.")}</em>
            </h2>
            <p>{tr("Meet the fictional team behind our demo.")}</p>
          </div>
          <div className="cut-stylists">
            {stylists.map(s => {
            return <article key={s.name}>
                <span className="cut-initial" aria-hidden="true">
                  {s.initials}
                </span>
                <div>
                  <h3>{tr(s.name)}</h3>
                  <p>{tr(s.detail)}</p>
                </div>
              </article>;
          })}
          </div>
        </section>
        <section id="cut-booking" className="cut-section cut-booking">
          <div className="cut-section-title">
            <p className="cut-kicker">{tr("03 / Your next visit")}</p>
            <h2>{tr("Your chair")}<br />
              <em>{tr("is waiting.")}</em>
            </h2>
            <p>{tr("Try the booking experience. All dates and times are simulated; no appointment is reserved and no email is sent.")}</p>
          </div>
          <div className="cut-booking-panel">
            {confirmed ? <div className="cut-confirmation">
                <span className="cut-kicker">{tr("Demo complete")}</span>
                <h3 ref={heading} tabIndex={-1}>{tr("Looking sharp,")}{" "}{customer}.
                </h3>
                <p>{tr("This is your simulated booking confirmation.")}</p>
                <dl>
                  <dt>{tr("Service")}</dt>
                  <dd>{tr(service.name)}</dd>
                  <dt>{tr("Stylist")}</dt>
                  <dd>{stylist.name}</dd>
                  <dt>{tr("When")}</dt>
                  <dd>
                    {displayDate(date, language)}{" "}{tr("at")}{" "}{time}
                  </dd>
                  <dt>{tr("Duration")}</dt>
                  <dd>{service.time}{" "}{tr("minutes")}</dd>
                  <dt>{tr("Price")}</dt>
                  <dd>€{service.price}{" "}{tr("\xB7 No payment taken")}</dd>
                </dl>
                <p className="cut-notice">{tr("No real appointment was made. Your details were used only for this on-screen demo.")}</p>
                <button className="cut-button" onClick={reset}>{tr("Try another booking")}</button>
                <a className="cut-enquiry" href="#/demo/studio-cut/dashboard">{tr("View this booking in the sample dashboard")}</a>
                <a className="cut-enquiry" href="#contact">{tr("Want a booking website for your business?")}</a>
              </div> : <>
                <ol className="cut-progress" aria-label={tr("Booking steps")}>
                  {stages.map((label, i) => {
                return <li key={label} aria-current={step === i ? "step" : undefined} className={i <= step ? "active" : ""}>
                      <span>{i + 1}</span>
                      {tr(label)}
                    </li>;
              })}
                </ol>
                <h3 ref={heading} tabIndex={-1}>
                  {tr(["Choose your service", "Choose your stylist", "Choose a date & time", "A few final details"][step])}
                </h3>
                {step === 0 && <fieldset className="cut-options">
                    <legend className="cut-sr-only">{tr("Select a service")}</legend>
                    {services.map(s => {
                return <label className={service?.name === s.name ? "selected" : ""} key={s.name}>
                        <input type="radio" name="service" checked={service?.name === s.name} onChange={() => {
                    setService(s);
                    setError("");
                  }} />
                        <span>
                          {tr(s.name)}
                          <small>{s.time}{" "}{tr("minutes")}</small>
                        </span>
                        <strong>€{s.price}</strong>
                      </label>;
              })}
                  </fieldset>}
                {step === 1 && <fieldset className="cut-options">
                    <legend className="cut-sr-only">{tr("Select a stylist")}</legend>
                    {stylists.map(s => {
                return <label className={stylist?.name === s.name ? "selected" : ""} key={s.name}>
                        <input type="radio" name="stylist" checked={stylist?.name === s.name} onChange={() => {
                    setStylist(s);
                    setError("");
                  }} />
                        <span>
                          {tr(s.name)}
                          <small>{tr(s.detail)}</small>
                        </span>
                      </label>;
              })}
                  </fieldset>}
                {step === 2 && <div className="cut-date">
                    <label htmlFor="cut-date">{tr("Your preferred date")}</label>
                    <input id="cut-date" type="date" min={nextDay()} value={date} onChange={e => {
                setDate(e.target.value);
                setTime("");
                setError("");
              }} />
                    <fieldset className="cut-times">
                      <legend>{tr("Demo time slots")}</legend>
                      {slots.map(t => {
                  return <label className={t === time ? "selected" : ""} key={t}>
                          <input type="radio" name="time" value={t} checked={time === t} disabled={!date || date < nextDay()} onChange={() => {
                      setTime(t);
                      setError("");
                    }} />
                          {t}
                        </label>;
                })}
                    </fieldset>
                    <p className="cut-notice">{tr("Choose tomorrow or a later date. These are example slots, not live availability.")}</p>
                  </div>}
                {step === 3 && <form id="cut-details" onSubmit={confirm}>
                    <label>{tr("Your name")}<input name="name" autoComplete="off" required maxLength={80} pattern=".*\S.*" placeholder={tr("Try a fictional name")} />
                    </label>
                    <label>{tr("Email address")}<input type="email" name="email" autoComplete="off" required placeholder="you@example.com" maxLength={200} />
                    </label>
                    <p className="cut-notice">{tr("Use fictional details. Nothing is sent or saved to a server.")}</p>
                  </form>}
                {service && <div className="cut-summary">
                    <span>
                      {tr(service.name)} · {service.time}{" "}{tr("min \xB7 \u20AC")}{" "}{service.price}
                    </span>
                    {stylist && <span>{tr("With")}{" "}{stylist.name}</span>}
                    {date && time && <span>
                        {displayDate(date, language)} · {time}
                      </span>}
                  </div>}
                {error && <p className="cut-error" role="alert">
                    {tr(error)}
                  </p>}
                <div className="cut-actions">
                  {step > 0 && <button className="cut-back" onClick={() => {
                setStep(step - 1);
                setError("");
              }}>{tr("Back")}</button>}
                  {step < 3 ? <button className="cut-button" onClick={next}>{tr("Continue")}</button> : <button className="cut-button" type="submit" form="cut-details">{tr("Confirm demo booking")}</button>}
                </div>
              </>}
          </div>
        </section>
        <section className="cut-closing">
          <p className="cut-kicker">{tr("A concept by TOIMU Technologies O\xDC")}</p>
          <h2>{tr("A better experience.")}<br />{tr("For your customers, too.")}</h2>
          <a href="#contact" className="cut-button">{tr("Discuss your website")}</a>
        </section>
      </main>
      <footer className="cut-footer">
        <span className="cut-logo">
          STUDIO<span>CUT.</span>
        </span>
        <p>{tr("Fictional studio. Real design possibilities.")}</p>
        <a href="#work">{tr("Back to the portfolio")}</a>
      </footer>
    </div>;
}
