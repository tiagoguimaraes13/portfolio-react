import { useDemoLanguage, DemoLanguageSwitcher } from "../i18n/DemoLanguage";
import React, { useEffect, useState } from "react";
export function futureDate(offset = 1) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
export function sampleAppointments() {
  return [{
    id: "demo-1",
    name: "Jamie (sample)",
    service: "Signature cut",
    stylist: "Alex",
    date: futureDate(),
    time: "09:00",
    duration: 45,
    price: 35,
    status: "Booked"
  }, {
    id: "demo-2",
    name: "Taylor (sample)",
    service: "Cut & beard",
    stylist: "Robin",
    date: futureDate(),
    time: "10:15",
    duration: 60,
    price: 50,
    status: "Booked"
  }, {
    id: "demo-3",
    name: "Casey (sample)",
    service: "Beard sculpt",
    stylist: "Sam",
    date: futureDate(2),
    time: "13:00",
    duration: 30,
    price: 25,
    status: "Completed"
  }];
}
export default function StudioDashboard({
  appointments,
  onUpdate,
  onReset
}) {
  const {
    tr,
    language
  } = useDemoLanguage();
  const [status, setStatus] = useState("All statuses");
  const [stylist, setStylist] = useState("All stylists");
  const [date, setDate] = useState("");
  const [notice, setNotice] = useState("");
  useEffect(() => {
    document.title = tr('STUDIO CUT — Sample appointment dashboard | TOIMU');
  }, [language, tr]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const visible = appointments.filter(a => (status === "All statuses" || a.status === status) && (stylist === "All stylists" || a.stylist === stylist) && (!date || a.date === date)).slice().sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`));
  const active = appointments.filter(a => a.status === "Booked");
  const completed = appointments.filter(a => a.status === "Completed");

  function update(a, next) {
    onUpdate(a.id, next);
    setNotice({
      name: a.name,
      status: next
    });
  }

  return <div className="dash-site">
      <div className="demo-strip">
        <a href="#work">{tr("Back to TOIMU Technologies")}</a>
        <span>{tr("Sample dashboard \xB7 No login required \xB7 Session-only data")}</span>
      </div>
      <header className="dash-header">
      <DemoLanguageSwitcher />
        <a className="cut-logo" href="#/demo/studio-cut">
          STUDIO<span>CUT.</span>
        </a>
        <a href="#/demo/studio-cut">{tr("Open booking website")}</a>
      </header>
      <main className="dash-main">
        <div className="dash-title">
          <div>
            <p className="demo-kicker">{tr("Behind the chair")}</p>
            <h1>{tr("Your studio, at a glance.")}</h1>
            <p>{tr("Manage fictional appointments and bookings you try in the demo. Everything resets when you reload the page.")}</p>
          </div>
          <button onClick={() => {
          onReset();
          setNotice("Sample appointments restored.");
        }}>{tr("Reset sample data")}</button>
        </div>
        <div className="dash-stats">
          <article>
            <span>{tr("Upcoming demo bookings")}</span>
            <strong>{active.length}</strong>
          </article>
          <article>
            <span>{tr("Completed demo visits")}</span>
            <strong>{completed.length}</strong>
          </article>
          <article>
            <span>{tr("Booked service value")}</span>
            <strong>€{active.reduce((a, v) => a + v.price, 0)}</strong>
            <small>{tr("Illustrative \xB7 No payments collected")}</small>
          </article>
        </div>
        <section className="dash-appointments">
          <h2>{tr("Appointments")}</h2>
          <div className="dash-filters">
            <label>{tr("Status")}<select value={status} onChange={e => setStatus(e.target.value)}>
                {["All statuses", "Booked", "Completed", "Cancelled"].map(v => {
                return <option key={v} value={v}>{tr(v)}</option>;
              })}
              </select>
            </label>
            <label>{tr("Stylist")}<select value={stylist} onChange={e => setStylist(e.target.value)}>
                {["All stylists", "Alex", "Robin", "Sam"].map(v => {
                return <option key={v} value={v}>{tr(v)}</option>;
              })}
              </select>
            </label>
            <label>{tr("Date")}<input type="date" value={date} onChange={e => setDate(e.target.value)} />
            </label>
            <button onClick={() => {
            setStatus("All statuses");
            setStylist("All stylists");
            setDate("");
          }}>{tr("Clear filters")}</button>
          </div>
          <p className="dash-notice" role="status">
            {typeof notice === "string" ? tr(notice) : `${notice.name}: ${language === "en" ? notice.status.toLowerCase() : tr(notice.status)}.`}
          </p>
          <div className="dash-table-wrap">
            <table>
              <caption className="cut-sr-only">{tr("Fictional appointments")}</caption>
              <thead>
                <tr>
                  <th scope="col">{tr("Guest")}</th>
                  <th scope="col">{tr("Service")}</th>
                  <th scope="col">{tr("Stylist")}</th>
                  <th scope="col">{tr("When")}</th>
                  <th scope="col">{tr("Status")}</th>
                  <th scope="col">{tr("Actions")}</th>
                </tr>
              </thead>
              <tbody>
                {visible.map(a => {
                return <tr key={a.id}>
                    <td>{a.name}</td>
                    <td>
                      {tr(a.service)}
                      <small>
                        {a.duration}{" "}{tr("min \xB7 \u20AC")}{" "}{a.price}
                      </small>
                    </td>
                    <td>{a.stylist}</td>
                    <td>
                      {a.date}
                      <small>{a.time}</small>
                    </td>
                    <td>
                      <span className={`dash-badge ${a.status.toLowerCase()}`}>
                        {tr(a.status)}
                      </span>
                    </td>
                    <td>
                      <div className="dash-row-actions">
                        {a.status === "Booked" ? <>
                            <button aria-label={tr("Complete appointment for {name}", {
                          name: a.name
                        })} onClick={() => update(a, "Completed")}>{tr("Complete")}</button>
                            <button aria-label={tr("Cancel appointment for {name}", {
                          name: a.name
                        })} onClick={() => update(a, "Cancelled")}>{tr("Cancel")}</button>
                          </> : <button aria-label={tr("Restore booking for {name}", {
                        name: a.name
                      })} onClick={() => update(a, "Booked")}>{tr("Restore booking")}</button>}
                      </div>
                    </td>
                  </tr>;
              })}
              </tbody>
            </table>
          </div>
          {!visible.length && <p className="dash-empty">{tr("No appointments match these filters.")}</p>}
        </section>
        <div className="dash-bottom">
          <p>{tr("A real version could connect staff accounts, live availability and customer reminders.")}</p>
          <a href="#contact">{tr("Discuss a system for your business")}</a>
        </div>
      </main>
    </div>;
}
