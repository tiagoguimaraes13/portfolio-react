import React, { useEffect, useState } from "react";
import "./solutions.css";
export function futureDate(offset = 1) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(d.getDate()).padStart(2, "0")}`;
}
export function sampleAppointments() {
  return [
    {
      id: "demo-1",
      name: "Jamie (sample)",
      service: "Signature cut",
      stylist: "Alex",
      date: futureDate(),
      time: "09:00",
      duration: 45,
      price: 35,
      status: "Booked",
    },
    {
      id: "demo-2",
      name: "Taylor (sample)",
      service: "Cut & beard",
      stylist: "Robin",
      date: futureDate(),
      time: "10:15",
      duration: 60,
      price: 50,
      status: "Booked",
    },
    {
      id: "demo-3",
      name: "Casey (sample)",
      service: "Beard sculpt",
      stylist: "Sam",
      date: futureDate(2),
      time: "13:00",
      duration: 30,
      price: 25,
      status: "Completed",
    },
  ];
}
export default function StudioDashboard({ appointments, onUpdate, onReset }) {
  const [status, setStatus] = useState("All statuses");
  const [stylist, setStylist] = useState("All stylists");
  const [date, setDate] = useState("");
  const [notice, setNotice] = useState("");
  useEffect(() => {
    document.title = "STUDIO CUT — Sample appointment dashboard | TOIMU";
    window.scrollTo(0, 0);
  }, []);
  const visible = appointments
    .filter(
      (a) =>
        (status === "All statuses" || a.status === status) &&
        (stylist === "All stylists" || a.stylist === stylist) &&
        (!date || a.date === date)
    )
    .slice()
    .sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`));
  const active = appointments.filter((a) => a.status === "Booked");
  const completed = appointments.filter((a) => a.status === "Completed");
  function update(a, next) {
    onUpdate(a.id, next);
    setNotice(`${a.name}: ${next.toLowerCase()}.`);
  }
  return (
    <div className="dash-site">
      <div className="demo-strip">
        <a href="#work">Back to TOIMU Technologies</a>
        <span>Sample dashboard · No login required · Session-only data</span>
      </div>
      <header className="dash-header">
        <a className="cut-logo" href="#/demo/studio-cut">
          STUDIO<span>CUT.</span>
        </a>
        <a href="#/demo/studio-cut">Open booking website</a>
      </header>
      <main className="dash-main">
        <div className="dash-title">
          <div>
            <p className="demo-kicker">Behind the chair</p>
            <h1>Your studio, at a glance.</h1>
            <p>
              Manage fictional appointments and bookings you try in the demo.
              Everything resets when you reload the page.
            </p>
          </div>
          <button
            onClick={() => {
              onReset();
              setNotice("Sample appointments restored.");
            }}
          >
            Reset sample data
          </button>
        </div>
        <div className="dash-stats">
          <article>
            <span>Upcoming demo bookings</span>
            <strong>{active.length}</strong>
          </article>
          <article>
            <span>Completed demo visits</span>
            <strong>{completed.length}</strong>
          </article>
          <article>
            <span>Booked service value</span>
            <strong>€{active.reduce((a, v) => a + v.price, 0)}</strong>
            <small>Illustrative · No payments collected</small>
          </article>
        </div>
        <section className="dash-appointments">
          <h2>Appointments</h2>
          <div className="dash-filters">
            <label>
              Status
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                {["All statuses", "Booked", "Completed", "Cancelled"].map(
                  (v) => (
                    <option key={v}>{v}</option>
                  )
                )}
              </select>
            </label>
            <label>
              Stylist
              <select
                value={stylist}
                onChange={(e) => setStylist(e.target.value)}
              >
                {["All stylists", "Alex", "Robin", "Sam"].map((v) => (
                  <option key={v}>{v}</option>
                ))}
              </select>
            </label>
            <label>
              Date
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </label>
            <button
              onClick={() => {
                setStatus("All statuses");
                setStylist("All stylists");
                setDate("");
              }}
            >
              Clear filters
            </button>
          </div>
          <p className="dash-notice" role="status">
            {notice}
          </p>
          <div className="dash-table-wrap">
            <table>
              <caption className="cut-sr-only">Fictional appointments</caption>
              <thead>
                <tr>
                  <th scope="col">Guest</th>
                  <th scope="col">Service</th>
                  <th scope="col">Stylist</th>
                  <th scope="col">When</th>
                  <th scope="col">Status</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {visible.map((a) => (
                  <tr key={a.id}>
                    <td>{a.name}</td>
                    <td>
                      {a.service}
                      <small>
                        {a.duration} min · €{a.price}
                      </small>
                    </td>
                    <td>{a.stylist}</td>
                    <td>
                      {a.date}
                      <small>{a.time}</small>
                    </td>
                    <td>
                      <span className={`dash-badge ${a.status.toLowerCase()}`}>
                        {a.status}
                      </span>
                    </td>
                    <td>
                      <div className="dash-row-actions">
                        {a.status === "Booked" ? (
                          <>
                            <button
                              aria-label={`Complete appointment for ${a.name}`}
                              onClick={() => update(a, "Completed")}
                            >
                              Complete
                            </button>
                            <button
                              aria-label={`Cancel appointment for ${a.name}`}
                              onClick={() => update(a, "Cancelled")}
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <button
                            aria-label={`Restore booking for ${a.name}`}
                            onClick={() => update(a, "Booked")}
                          >
                            Restore booking
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {!visible.length && (
            <p className="dash-empty">No appointments match these filters.</p>
          )}
        </section>
        <div className="dash-bottom">
          <p>
            A real version could connect staff accounts, live availability and
            customer reminders.
          </p>
          <a href="#contact">Discuss a system for your business</a>
        </div>
      </main>
    </div>
  );
}
