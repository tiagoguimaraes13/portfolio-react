import React, { useState } from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import QuoteCalculator, { illustrativeRange } from "./QuoteCalculator";
import StudioDashboard, {
  sampleAppointments,
  futureDate,
} from "./StudioDashboard";
import OliveTable from "./OliveTable";
import NordBuild from "./NordBuild";
beforeEach(() => {
  window.scrollTo = jest.fn();
  Element.prototype.scrollIntoView = jest.fn();
  window.matchMedia = jest.fn(() => ({ matches: true }));
});
test("calculator checks boundaries and applies project and finish factors", () => {
  expect(illustrativeRange("Renovation", 100, "Standard")).toMatchObject({
    low: 76500,
    high: 103500,
  });
  expect(illustrativeRange("Extension", 100, "Premium")).toMatchObject({
    low: 159400,
    high: 215600,
  });
  expect(illustrativeRange("New home", 0, "Standard")).toBeNull();
  expect(illustrativeRange("New home", 501, "Standard")).toBeNull();
  expect(illustrativeRange("New home", NaN, "Standard")).toBeNull();
});
test("calculator transfers selected details into the construction enquiry", () => {
  render(<NordBuild />);
  fireEvent.change(screen.getByLabelText("Type of project"), {
    target: { value: "Extension" },
  });
  fireEvent.change(screen.getByLabelText("Floor area (m²)"), {
    target: { value: "100" },
  });
  fireEvent.click(
    screen.getByRole("button", { name: "Use these details in my enquiry" })
  );
  expect(screen.getByLabelText("Project type")).toHaveValue("Extension");
  expect(screen.getByLabelText("Your project").value).toContain(
    "Extension, 100 m²"
  );
  fireEvent.change(screen.getByLabelText("Floor area (m²)"), {
    target: { value: "0" },
  });
  expect(
    screen.getByRole("button", { name: "Use these details in my enquiry" })
  ).toBeDisabled();
});
function DashboardHarness() {
  const [a, setA] = useState(sampleAppointments);
  return (
    <StudioDashboard
      appointments={a}
      onUpdate={(id, status) =>
        setA(a.map((x) => (x.id === id ? { ...x, status } : x)))
      }
      onReset={() => setA(sampleAppointments())}
    />
  );
}
test("dashboard changes appointment status, filters and restores sample data", () => {
  render(<DashboardHarness />);
  fireEvent.click(
    screen.getByRole("button", {
      name: "Cancel appointment for Jamie (sample)",
    })
  );
  expect(screen.getByRole("status")).toHaveTextContent("cancelled");
  fireEvent.change(screen.getByLabelText("Status"), {
    target: { value: "Cancelled" },
  });
  expect(
    screen.getByRole("button", { name: "Restore booking for Jamie (sample)" })
  ).toBeInTheDocument();
  expect(screen.queryByText("Taylor (sample)")).not.toBeInTheDocument();
  fireEvent.click(
    screen.getByRole("button", { name: "Restore booking for Jamie (sample)" })
  );
  expect(
    screen.getByText("No appointments match these filters.")
  ).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Clear filters" }));
  fireEvent.click(
    screen.getByRole("button", {
      name: "Complete appointment for Jamie (sample)",
    })
  );
  fireEvent.click(screen.getByRole("button", { name: "Reset sample data" }));
  expect(
    screen.getByRole("button", {
      name: "Complete appointment for Jamie (sample)",
    })
  ).toBeInTheDocument();
});
test("restaurant filters menu and completes a simulated reservation", () => {
  render(<OliveTable />);
  fireEvent.click(screen.getByRole("button", { name: "Something sweet" }));
  expect(
    screen.getByRole("heading", { name: "Olive oil cake" })
  ).toBeInTheDocument();
  expect(
    screen.queryByRole("heading", { name: "Roast chicken" })
  ).not.toBeInTheDocument();
  fireEvent.change(screen.getByLabelText("Number of guests"), {
    target: { value: "4" },
  });
  fireEvent.change(screen.getByLabelText("Date"), {
    target: { value: futureDate(3) },
  });
  fireEvent.change(screen.getByLabelText("Preferred time"), {
    target: { value: "19:30" },
  });
  fireEvent.change(screen.getByLabelText("Your name"), {
    target: { value: "Demo Diner" },
  });
  fireEvent.change(screen.getByLabelText("Email address"), {
    target: { value: "diner@example.com" },
  });
  fireEvent.submit(
    screen
      .getByRole("button", { name: "Confirm demo reservation" })
      .closest("form")
  );
  expect(screen.getByRole("status")).toHaveTextContent(
    "A seat for you, Demo Diner."
  );
  expect(screen.getByRole("status")).toHaveTextContent("No table was reserved");
  expect(
    within(screen.getByRole("status")).getByText("19:30")
  ).toBeInTheDocument();
  fireEvent.click(
    screen.getByRole("button", { name: "Try another reservation" })
  );
  expect(screen.getByLabelText("Your name")).toHaveValue("");
});
