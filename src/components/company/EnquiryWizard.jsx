import React, { useEffect, useRef, useState } from "react";
import "./company-solutions.css";
const serviceOptions = [
  "Website Launch",
  "Website Redesign",
  "Online Store",
  "Custom Solutions",
  "Logo Design & Branding",
  "Maintenance & Support",
  "Not sure yet",
];
const featureOptions = [
  "Appointment booking",
  "Online payments",
  "Product catalogue",
  "Customer accounts",
  "Multiple languages",
  "Admin dashboard",
  "External integrations",
  "Help with content",
  "Logo design & visual identity",
];
const stages = [
  "Your business",
  "What you need",
  "Project details",
  "Review & send",
];
export function buildProjectBrief(data) {
  const businessDetails = [
    `Business: ${data.business || "To discuss"}`,
    ...(data.industry ? [`Industry: ${data.industry}`] : []),
    ...(data.website ? [`Current website: ${data.website}`] : []),
  ].join("\n");
  const features = data.features.length
    ? data.features.map((feature) => `• ${feature}`).join("\n")
    : "I’d like your advice on the right features.";
  return `Hello TOIMU team,\n\nI’d like to discuss ${data.service === "Not sure yet" ? "a project" : data.service.toLowerCase()}${data.business ? ` for ${data.business}` : ""}. Here is a little more about what I have in mind.\n\nABOUT THE BUSINESS\n${businessDetails}\n\nMY PROJECT\n${data.message}\n\nFEATURES I’M INTERESTED IN\n${features}\n\nPREFERRED TIMING\nPreferred timeframe: ${data.timing}\n\nPlease let me know the next steps. You can reach me at ${data.email}.\n\nBest regards,\n${data.name}\n${data.email}\n\n—\nProject enquiry prepared at TOIMU Technologies OÜ\nhello@toimu.ee`;

}
export default function EnquiryWizard({ selectedService }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    business: "",
    industry: "",
    website: "",
    service: selectedService || "Not sure yet",
    features: [],
    timing: "Flexible / let’s discuss",
    name: "",
    email: "",
    message: "",
  });
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);
  const title = useRef(null);
  const first = useRef(true);
  useEffect(() => {
    if (selectedService) {
      setData((d) => ({ ...d, service: selectedService }));
      setStep(0);
      setReady(false);
    }
  }, [selectedService]);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    title.current?.focus({ preventScroll: true });
  }, [step]);
  function update(key, value) {
    setData((d) => ({ ...d, [key]: value }));
    setReady(false);
    setError("");
  }
  function submit(e) {
    e.preventDefault();
    if (step === 2) {
      if (
        !data.name.trim() ||
        !data.message.trim() ||
        !/^\S+@\S+\.\S+$/.test(data.email.trim())
      ) {
        setError(
          "Enter your name, a valid email address and a short project description."
        );
        return;
      }
      setData((d) => ({
        ...d,
        name: d.name.trim(),
        email: d.email.trim(),
        message: d.message.trim(),
      }));
    }
    setStep(Math.min(step + 1, 3));
    setError("");
  }
  const brief = buildProjectBrief(data);
  const email = `mailto:hello@toimu.ee?subject=${encodeURIComponent(
    `Project enquiry | ${data.business || data.name} | ${data.service}`
  )}&body=${encodeURIComponent(brief)}`;
  return (
    <div className="enquiry-wizard">
      <p className="enquiry-privacy-note">
        Your brief stays in this page until you choose to email it.{" "}
        <a href="#/legal/privacy" target="_blank" rel="noreferrer">
          Read the privacy policy
        </a>
        .
      </p>
      <ol className="enquiry-progress" aria-label="Project enquiry steps">
        {stages.map((s, i) => (
          <li
            key={s}
            className={i <= step ? "active" : ""}
            aria-current={i === step ? "step" : undefined}
          >
            <span>{i + 1}</span>
            {s}
          </li>
        ))}
      </ol>
      <h3 ref={title} tabIndex={-1}>
        {
          [
            "Let’s start with your business.",
            "What should your website do?",
            "Tell us a little more.",
            "Your project, in one brief.",
          ][step]
        }
      </h3>
      <p className="enquiry-intro">
        {
          [
            "Choose a starting point. We can work out the details together.",
            "Select any features you have in mind. It’s fine to leave this open.",
            "A rough idea is enough to start a useful conversation.",
            "Review your details, then prepare an email or download the brief.",
          ][step]
        }
      </p>
      {step < 3 ? (
        <form onSubmit={submit}>
          {step === 0 && (
            <>
              <fieldset className="enquiry-services">
                <legend>Which solution interests you?</legend>
                {serviceOptions.map((s) => (
                  <label
                    className={data.service === s ? "selected" : ""}
                    key={s}
                  >
                    <input
                      type="radio"
                      name="solution"
                      value={s}
                      checked={data.service === s}
                      onChange={() => update("service", s)}
                    />
                    {s}
                  </label>
                ))}
              </fieldset>
              <label>
                Business name (optional)
                <input
                  value={data.business}
                  onChange={(e) => update("business", e.target.value)}
                  autoComplete="organization"
                  maxLength={160}
                  placeholder="Your business"
                />
              </label>
              <label>
                Industry (optional)
                <input
                  value={data.industry}
                  onChange={(e) => update("industry", e.target.value)}
                  maxLength={100}
                  placeholder="For example, hospitality or construction"
                />
              </label>
              <label>
                Current website (optional)
                <input
                  type="url"
                  value={data.website}
                  onChange={(e) => update("website", e.target.value)}
                  maxLength={300}
                  placeholder="https://yourwebsite.com"
                />
              </label>
            </>
          )}
          {step === 1 && (
            <>
              <fieldset className="enquiry-features">
                <legend>Possible features</legend>
                {featureOptions.map((f) => (
                  <label key={f}>
                    <input
                      type="checkbox"
                      checked={data.features.includes(f)}
                      onChange={(e) =>
                        update(
                          "features",
                          e.target.checked
                            ? [...data.features, f]
                            : data.features.filter((v) => v !== f)
                        )
                      }
                    />
                    {f}
                  </label>
                ))}
              </fieldset>
              <p className="form-note">
                Responsive layouts are part of every website discussion. These
                options help us understand any additional functionality.
              </p>
            </>
          )}
          {step === 2 && (
            <>
              <div className="form-row">
                <label>
                  Your name
                  <input
                    value={data.name}
                    onChange={(e) => update("name", e.target.value)}
                    required
                    pattern=".*\S.*"
                    maxLength={120}
                    autoComplete="name"
                    placeholder="Alex Smith"
                  />
                </label>
                <label>
                  Email address
                  <input
                    type="email"
                    value={data.email}
                    onChange={(e) => update("email", e.target.value)}
                    required
                    maxLength={200}
                    autoComplete="email"
                    placeholder="alex@yourbusiness.com"
                  />
                </label>
              </div>
              <div className="form-row">
                <label>
                  Your timeframe
                  <select
                    value={data.timing}
                    onChange={(e) => update("timing", e.target.value)}
                  >
                    {[
                      "Flexible / let’s discuss",
                      "Within 1 month",
                      "Within 3 months",
                      "Within 6 months",
                    ].map((v) => (
                      <option key={v}>{v}</option>
                    ))}
                  </select>
                </label>
              </div>
              <label>
                Tell us about your project
                <textarea
                  rows={4}
                  value={data.message}
                  onChange={(e) => update("message", e.target.value)}
                  required
                  maxLength={2500}
                  placeholder="What would you like to build or improve?"
                />
              </label>
              <p className="form-note">
                Your timeframe is a preference, not a confirmed delivery date. Your details stay in this page until you choose
                to send an email.
              </p>
            </>
          )}
          {error && (
            <p className="enquiry-error" role="alert">
              {error}
            </p>
          )}
          <div className="enquiry-actions">
            {step > 0 && (
              <button
                type="button"
                className="enquiry-back"
                onClick={() => {
                  setStep(step - 1);
                  setError("");
                }}
              >
                Back
              </button>
            )}
            <button className="button dark" type="submit">
              {step === 2 ? "Review my brief" : "Continue"}
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="enquiry-review">
            <dl>
              <dt>Business</dt>
              <dd>
                {data.business || "To discuss"}
                {data.industry && ` · ${data.industry}`}
              </dd>
              <dt>Solution</dt>
              <dd>{data.service}</dd>
              <dt>Features</dt>
              <dd>
                {data.features.length ? data.features.join(", ") : "To discuss"}
              </dd>
              <dt>Timeframe</dt>
              <dd>{data.timing}</dd>
              <dt>Contact</dt>
              <dd>
                {data.name}
                <br />
                {data.email}
              </dd>
            </dl>
            {data.website && <p>Current website: {data.website}</p>}
            <h4>Project notes</h4>
            <p className="enquiry-project-notes">{data.message}</p>
          </div>
          <p className="form-note">
            Nothing has been submitted. Your email app opens when you choose the
            send link, and you send the message there.
          </p>
          <div className="enquiry-actions">
            <button
              className="enquiry-back"
              onClick={() => {
                setStep(2);
                setReady(false);
              }}
            >
              Edit details
            </button>
            <button className="button dark" onClick={() => setReady(true)}>
              Prepare my enquiry
            </button>
          </div>
          {ready && (
            <div className="enquiry-ready" role="status">
              <h4>Your email is ready.</h4>
              <p>We’ve organised your project details into a clear message. Review it below, then open your email app to send it.</p>
              <details className="enquiry-email-preview">
                <summary>Preview your email</summary>
                <p><strong>To:</strong> hello@toimu.ee</p>
                <pre style={{ whiteSpace: "pre-wrap", overflowWrap: "anywhere", font: "inherit", lineHeight: 1.7 }}>{brief}</pre>
              </details>
              <a className="button dark" href={email}>
                Open email app to send
              </a>
              <a
                download="TOIMU-project-brief.txt"
                href={`data:text/plain;charset=utf-8,${encodeURIComponent(
                  brief
                )}`}
              >
                Download project brief
              </a>
              <p className="form-note">
                If your email app cannot open the full message, download the
                brief and email it to hello@toimu.ee.
              </p>
            </div>
          )}
          <button
            className="enquiry-text-button"
            onClick={() => {
              setStep(0);
              setReady(false);
            }}
          >
            Edit business and features
          </button>
        </>
      )}
    </div>
  );
}
