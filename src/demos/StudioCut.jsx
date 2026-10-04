import React, { useEffect, useRef, useState } from "react";
import "./studio-cut.css";

const services = [
  {
    name: "Signature cut",
    time: 45,
    price: 35,
    description:
      "A consultation, precision cut and a finish that feels like you.",
  },
  {
    name: "Cut & beard",
    time: 60,
    price: 50,
    description: "A fresh cut, beard shaping and the details taken care of.",
  },
  {
    name: "Beard sculpt",
    time: 30,
    price: 25,
    description: "Clean lines, balanced shape and a little extra attention.",
  },
];
const stylists = [
  { name: "Alex", detail: "Classic cuts & modern fades", initials: "A" },
  { name: "Robin", detail: "Texture & scissor work", initials: "R" },
  { name: "Sam", detail: "Beard shaping & sharp detail", initials: "S" },
];
const slots = ["09:00", "10:15", "11:30", "13:00", "14:15", "15:30", "16:45"];
const stages = ["Service", "Stylist", "Date & time", "Your details"];
function nextDay() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(d.getDate()).padStart(2, "0")}`;
}
function displayDate(value) {
  return new Intl.DateTimeFormat("en", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${value}T12:00:00`));
}
export default function StudioCut({ onDemoBooking }) {
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
    document.title = "STUDIO CUT — Interactive booking concept | TOIMU";
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    if (firstMount.current) {
      firstMount.current = false;
      return;
    }
    heading.current?.focus({ preventScroll: true });
  }, [step, confirmed]);
  function moveToBooking() {
    document.getElementById("cut-booking")?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });
  }
  function next() {
    const valid = [
      !!service,
      !!stylist,
      !!date && date >= nextDay() && slots.includes(time),
    ][step];
    if (!valid) {
      setError(
        [
          "Choose a service to continue.",
          "Choose a stylist to continue.",
          "Choose a future date and a time to continue.",
        ][step]
      );
      return;
    }
    setError("");
    setStep(step + 1);
  }
  function confirm(event) {
    event.preventDefault();
    if (
      !service ||
      !stylist ||
      !date ||
      date < nextDay() ||
      !slots.includes(time)
    ) {
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
      status: "Booked",
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
  return (
    <div className="cut-site">
      <div className="cut-demo-banner">
        <a href="#work">Back to TOIMU Technologies</a>
        <span>Concept website · Interactive demo · No real bookings</span>
        <a href="#/demo/studio-cut/dashboard">Try the staff dashboard</a>
      </div>
      <header className="cut-header">
        <a href="#/demo/studio-cut" className="cut-logo">
          STUDIO<span>CUT.</span>
        </a>
        <nav aria-label="Studio Cut navigation">
          <button
            onClick={() =>
              document
                .getElementById("cut-services")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            The services
          </button>
          <button
            onClick={() =>
              document
                .getElementById("cut-team")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            The team
          </button>
          <button className="cut-button" onClick={moveToBooking}>
            Book a chair
          </button>
        </nav>
      </header>
      <main>
        <section className="cut-hero">
          <div>
            <p className="cut-kicker">Good hair. Good company.</p>
            <h1>
              A fresh cut.
              <br />A fresh <em>perspective.</em>
            </h1>
            <p>
              A little time for yourself. A cut that feels right.
              <br />
              Welcome to your new favourite chair.
            </p>
            <button className="cut-button" onClick={moveToBooking}>
              Find your next cut
            </button>
          </div>
          <span className="cut-hero-caption">
            STUDIO CUT / BARBER & GROOMING CONCEPT
          </span>
        </section>
        <section id="cut-services" className="cut-section">
          <div className="cut-section-title">
            <p className="cut-kicker">01 / The services</p>
            <h2>
              Keep it simple.
              <br />
              <em>Make it yours.</em>
            </h2>
            <p>Illustrative services and prices for this concept studio.</p>
          </div>
          <div className="cut-services">
            {services.map((s, i) => (
              <article key={s.name}>
                <span className="cut-number">0{i + 1}</span>
                <h3>{s.name}</h3>
                <p>{s.description}</p>
                <div className="cut-service-meta">
                  <span>{s.time} minutes</span>
                  <strong>€{s.price}</strong>
                </div>
                <button
                  onClick={() => {
                    setService(s);
                    setStep(1);
                    setConfirmed(false);
                    setError("");
                    moveToBooking();
                  }}
                >
                  Choose {s.name.toLowerCase()}
                </button>
              </article>
            ))}
          </div>
        </section>
        <section id="cut-team" className="cut-section cut-team">
          <div className="cut-section-title">
            <p className="cut-kicker">02 / The people</p>
            <h2>
              Find your
              <br />
              <em>kind of stylist.</em>
            </h2>
            <p>Meet the fictional team behind our demo.</p>
          </div>
          <div className="cut-stylists">
            {stylists.map((s) => (
              <article key={s.name}>
                <span className="cut-initial" aria-hidden="true">
                  {s.initials}
                </span>
                <div>
                  <h3>{s.name}</h3>
                  <p>{s.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section id="cut-booking" className="cut-section cut-booking">
          <div className="cut-section-title">
            <p className="cut-kicker">03 / Your next visit</p>
            <h2>
              Your chair
              <br />
              <em>is waiting.</em>
            </h2>
            <p>
              Try the booking experience. All dates and times are simulated; no
              appointment is reserved and no email is sent.
            </p>
          </div>
          <div className="cut-booking-panel">
            {confirmed ? (
              <div className="cut-confirmation">
                <span className="cut-kicker">Demo complete</span>
                <h3 ref={heading} tabIndex={-1}>
                  Looking sharp, {customer}.
                </h3>
                <p>This is your simulated booking confirmation.</p>
                <dl>
                  <dt>Service</dt>
                  <dd>{service.name}</dd>
                  <dt>Stylist</dt>
                  <dd>{stylist.name}</dd>
                  <dt>When</dt>
                  <dd>
                    {displayDate(date)} at {time}
                  </dd>
                  <dt>Duration</dt>
                  <dd>{service.time} minutes</dd>
                  <dt>Price</dt>
                  <dd>€{service.price} · No payment taken</dd>
                </dl>
                <p className="cut-notice">
                  No real appointment was made. Your details were used only for
                  this on-screen demo.
                </p>
                <button className="cut-button" onClick={reset}>
                  Try another booking
                </button>
                <a className="cut-enquiry" href="#/demo/studio-cut/dashboard">
                  View this booking in the sample dashboard
                </a>
                <a className="cut-enquiry" href="#contact">
                  Want a booking website for your business?
                </a>
              </div>
            ) : (
              <>
                <ol className="cut-progress" aria-label="Booking steps">
                  {stages.map((label, i) => (
                    <li
                      key={label}
                      aria-current={step === i ? "step" : undefined}
                      className={i <= step ? "active" : ""}
                    >
                      <span>{i + 1}</span>
                      {label}
                    </li>
                  ))}
                </ol>
                <h3 ref={heading} tabIndex={-1}>
                  {
                    [
                      "Choose your service",
                      "Choose your stylist",
                      "Choose a date & time",
                      "A few final details",
                    ][step]
                  }
                </h3>
                {step === 0 && (
                  <fieldset className="cut-options">
                    <legend className="cut-sr-only">Select a service</legend>
                    {services.map((s) => (
                      <label
                        className={service?.name === s.name ? "selected" : ""}
                        key={s.name}
                      >
                        <input
                          type="radio"
                          name="service"
                          checked={service?.name === s.name}
                          onChange={() => {
                            setService(s);
                            setError("");
                          }}
                        />
                        <span>
                          {s.name}
                          <small>{s.time} minutes</small>
                        </span>
                        <strong>€{s.price}</strong>
                      </label>
                    ))}
                  </fieldset>
                )}
                {step === 1 && (
                  <fieldset className="cut-options">
                    <legend className="cut-sr-only">Select a stylist</legend>
                    {stylists.map((s) => (
                      <label
                        className={stylist?.name === s.name ? "selected" : ""}
                        key={s.name}
                      >
                        <input
                          type="radio"
                          name="stylist"
                          checked={stylist?.name === s.name}
                          onChange={() => {
                            setStylist(s);
                            setError("");
                          }}
                        />
                        <span>
                          {s.name}
                          <small>{s.detail}</small>
                        </span>
                      </label>
                    ))}
                  </fieldset>
                )}
                {step === 2 && (
                  <div className="cut-date">
                    <label htmlFor="cut-date">Your preferred date</label>
                    <input
                      id="cut-date"
                      type="date"
                      min={nextDay()}
                      value={date}
                      onChange={(e) => {
                        setDate(e.target.value);
                        setTime("");
                        setError("");
                      }}
                    />
                    <fieldset className="cut-times">
                      <legend>Demo time slots</legend>
                      {slots.map((t) => (
                        <label className={t === time ? "selected" : ""} key={t}>
                          <input
                            type="radio"
                            name="time"
                            value={t}
                            checked={time === t}
                            disabled={!date || date < nextDay()}
                            onChange={() => {
                              setTime(t);
                              setError("");
                            }}
                          />
                          {t}
                        </label>
                      ))}
                    </fieldset>
                    <p className="cut-notice">
                      Choose tomorrow or a later date. These are example slots,
                      not live availability.
                    </p>
                  </div>
                )}
                {step === 3 && (
                  <form id="cut-details" onSubmit={confirm}>
                    <label>
                      Your name
                      <input
                        name="name"
                        autoComplete="off"
                        required
                        maxLength={80}
                        pattern=".*\S.*"
                        placeholder="Try a fictional name"
                      />
                    </label>
                    <label>
                      Email address
                      <input
                        type="email"
                        name="email"
                        autoComplete="off"
                        required
                        placeholder="you@example.com"
                        maxLength={200}
                      />
                    </label>
                    <p className="cut-notice">
                      Use fictional details. Nothing is sent or saved to a
                      server.
                    </p>
                  </form>
                )}
                {service && (
                  <div className="cut-summary">
                    <span>
                      {service.name} · {service.time} min · €{service.price}
                    </span>
                    {stylist && <span>With {stylist.name}</span>}
                    {date && time && (
                      <span>
                        {displayDate(date)} · {time}
                      </span>
                    )}
                  </div>
                )}
                {error && (
                  <p className="cut-error" role="alert">
                    {error}
                  </p>
                )}
                <div className="cut-actions">
                  {step > 0 && (
                    <button
                      className="cut-back"
                      onClick={() => {
                        setStep(step - 1);
                        setError("");
                      }}
                    >
                      Back
                    </button>
                  )}
                  {step < 3 ? (
                    <button className="cut-button" onClick={next}>
                      Continue
                    </button>
                  ) : (
                    <button
                      className="cut-button"
                      type="submit"
                      form="cut-details"
                    >
                      Confirm demo booking
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </section>
        <section className="cut-closing">
          <p className="cut-kicker">A concept by TOIMU Technologies OÜ</p>
          <h2>
            A better experience.
            <br />
            For your customers, too.
          </h2>
          <a href="#contact" className="cut-button">
            Discuss your website
          </a>
        </section>
      </main>
      <footer className="cut-footer">
        <span className="cut-logo">
          STUDIO<span>CUT.</span>
        </span>
        <p>Fictional studio. Real design possibilities.</p>
        <a href="#work">Back to the portfolio</a>
      </footer>
    </div>
  );
}
