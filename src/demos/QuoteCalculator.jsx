import { useDemoLanguage } from "../i18n/DemoLanguage";
import React, { useState } from "react";
export function illustrativeRange(type, area, finish) {
  const rates = {
    Renovation: 900,
    Extension: 1500,
    "New home": 1800
  };
  if (!Number.isFinite(area) || area < 10 || area > 500 || !rates[type] || !["Standard", "Premium"].includes(finish)) return null;
  const base = rates[type] * area * (finish === "Premium" ? 1.25 : 1);
  return {
    low: Math.round(base * 0.85 / 100) * 100,
    high: Math.round(base * 1.15 / 100) * 100,
    rate: rates[type]
  };
}

const formatEuro = (v, language) => new Intl.NumberFormat(language, {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0
}).format(v);

export default function QuoteCalculator({
  onUse
}) {
  const {
    tr,
    language
  } = useDemoLanguage();

  const euro = value => formatEuro(value, language);

  const [type, setType] = useState("Renovation");
  const [area, setArea] = useState("50");
  const [finish, setFinish] = useState("Standard");
  const range = illustrativeRange(type, Number(area), finish);
  return <section className="build-section build-calculator" id="build-calculator">
      <div>
        <p className="demo-kicker">{tr("Try an interactive estimate")}</p>
        <h2>{tr("A starting point.")}<br />{tr("For the conversation.")}</h2>
        <p>{tr("This calculator uses invented demonstration rates. It is not a construction quote or a guide to market prices.")}</p>
      </div>
      <div className="build-calculator-panel">
        <label>{tr("Type of project")}<select value={type} onChange={e => setType(e.target.value)}>
            <option value={"Renovation"}>{tr("Renovation")}</option>
            <option value={"Extension"}>{tr("Extension")}</option>
            <option value={"New home"}>{tr("New home")}</option>
          </select>
        </label>
        <div className="demo-form-row">
          <label>{tr("Floor area (m\xB2)")}<input type="number" min="10" max="500" step="1" value={area} onChange={e => setArea(e.target.value)} />
          </label>
          <label>{tr("Finish level")}<select value={finish} onChange={e => setFinish(e.target.value)}>
              <option value={"Standard"}>{tr("Standard")}</option>
              <option value={"Premium"}>{tr("Premium")}</option>
            </select>
          </label>
        </div>
        <div className="build-estimate" aria-live="polite">
          {range ? <>
              <span>{tr("Illustrative range")}</span>
              <strong>
                {euro(range.low)} – {euro(range.high)}
              </strong>
              <p>{tr("Example calculation:")}{" "}{area}{" "}{tr("m\xB2 \xD7")}{" "}{euro(range.rate)}{" "}{tr("/m\xB2")}{" "}{tr(finish === "Premium" ? " × 1.25 for premium finishes" : "")}{" "}{tr(", with a \xB115% demonstration range.")}</p>
            </> : <p>{tr("Enter a floor area between 10 and 500 m\xB2.")}</p>}
        </div>
        <p className="demo-form-note">{tr("Example scope: construction work only. Design, permits, taxes, ground conditions and other costs are excluded. A real quote requires a site assessment.")}</p>
        <button className="build-button" disabled={!range} onClick={() => onUse({
        type,
        area,
        finish,
        text: tr("Demo calculator: {type}, {area} m², {finish} finishes. Illustrative range {low}–{high} using invented rates; not a quote.", {
          type: tr(type),
          area,
          finish: tr(finish),
          low: euro(range.low),
          high: euro(range.high)
        })
      })}>{tr("Use these details in my enquiry")}</button>
      </div>
    </section>;
}
