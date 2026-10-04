import React, { useState } from "react";
export function illustrativeRange(type, area, finish) {
  const rates = { Renovation: 900, Extension: 1500, "New home": 1800 };
  if (
    !Number.isFinite(area) ||
    area < 10 ||
    area > 500 ||
    !rates[type] ||
    !["Standard", "Premium"].includes(finish)
  )
    return null;
  const base = rates[type] * area * (finish === "Premium" ? 1.25 : 1);
  return {
    low: Math.round((base * 0.85) / 100) * 100,
    high: Math.round((base * 1.15) / 100) * 100,
    rate: rates[type],
  };
}
const euro = (v) =>
  new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(v);
export default function QuoteCalculator({ onUse }) {
  const [type, setType] = useState("Renovation");
  const [area, setArea] = useState("50");
  const [finish, setFinish] = useState("Standard");
  const range = illustrativeRange(type, Number(area), finish);
  return (
    <section className="build-section build-calculator" id="build-calculator">
      <div>
        <p className="demo-kicker">Try an interactive estimate</p>
        <h2>
          A starting point.
          <br />
          For the conversation.
        </h2>
        <p>
          This calculator uses invented demonstration rates. It is not a
          construction quote or a guide to market prices.
        </p>
      </div>
      <div className="build-calculator-panel">
        <label>
          Type of project
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option>Renovation</option>
            <option>Extension</option>
            <option>New home</option>
          </select>
        </label>
        <div className="demo-form-row">
          <label>
            Floor area (m²)
            <input
              type="number"
              min="10"
              max="500"
              step="1"
              value={area}
              onChange={(e) => setArea(e.target.value)}
            />
          </label>
          <label>
            Finish level
            <select value={finish} onChange={(e) => setFinish(e.target.value)}>
              <option>Standard</option>
              <option>Premium</option>
            </select>
          </label>
        </div>
        <div className="build-estimate" aria-live="polite">
          {range ? (
            <>
              <span>Illustrative range</span>
              <strong>
                {euro(range.low)} – {euro(range.high)}
              </strong>
              <p>
                Example calculation: {area} m² × {euro(range.rate)}/m²
                {finish === "Premium" ? " × 1.25 for premium finishes" : ""},
                with a ±15% demonstration range.
              </p>
            </>
          ) : (
            <p>Enter a floor area between 10 and 500 m².</p>
          )}
        </div>
        <p className="demo-form-note">
          Example scope: construction work only. Design, permits, taxes, ground
          conditions and other costs are excluded. A real quote requires a site
          assessment.
        </p>
        <button
          className="build-button"
          disabled={!range}
          onClick={() =>
            onUse({
              type,
              area,
              finish,
              text: `Demo calculator: ${type}, ${area} m², ${finish.toLowerCase()} finishes. Illustrative range ${euro(
                range.low
              )}–${euro(range.high)} using invented rates; not a quote.`,
            })
          }
        >
          Use these details in my enquiry
        </button>
      </div>
    </section>
  );
}
