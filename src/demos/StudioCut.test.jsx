import { render, screen, fireEvent } from "@testing-library/react";
import StudioCut from "./StudioCut";

beforeEach(() => {
  window.scrollTo = jest.fn();
});
test("requires selections and completes a simulated booking with the selected details", () => {
  render(<StudioCut />);
  fireEvent.click(screen.getByRole("button", { name: "Continue" }));
  expect(screen.getByRole("alert")).toHaveTextContent("Choose a service");
  fireEvent.click(screen.getByRole("radio", { name: /Signature cut/ }));
  fireEvent.click(screen.getByRole("button", { name: "Continue" }));
  fireEvent.click(screen.getByRole("radio", { name: /Robin/ }));
  fireEvent.click(screen.getByRole("button", { name: "Continue" }));
  expect(screen.getByRole("radio", { name: "09:00" })).toBeDisabled();
  const d = new Date();
  d.setDate(d.getDate() + 3);
  const date = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(d.getDate()).padStart(2, "0")}`;
  fireEvent.change(screen.getByLabelText("Your preferred date"), {
    target: { value: date },
  });
  fireEvent.click(screen.getByRole("radio", { name: "10:15" }));
  fireEvent.click(screen.getByRole("button", { name: "Continue" }));
  fireEvent.click(screen.getByRole("button", { name: "Back" }));
  expect(screen.getByRole("radio", { name: "10:15" })).toBeChecked();
  fireEvent.click(screen.getByRole("button", { name: "Continue" }));
  fireEvent.change(screen.getByLabelText("Your name"), {
    target: { value: "Demo Guest" },
  });
  fireEvent.change(screen.getByLabelText("Email address"), {
    target: { value: "demo@example.com" },
  });
  fireEvent.submit(document.getElementById("cut-details"));
  expect(
    screen.getByRole("heading", { name: "Looking sharp, Demo Guest." })
  ).toBeInTheDocument();
  expect(screen.getByText("€35 · No payment taken")).toBeInTheDocument();
  expect(
    screen.getByText(
      "No real appointment was made. Your details were used only for this on-screen demo."
    )
  ).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Try another booking" }));
  expect(
    screen.getByRole("heading", { name: "Choose your service" })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("radio", { name: /Signature cut/ })
  ).not.toBeChecked();
});
test("changing the date clears the previously selected time", () => {
  render(<StudioCut />);
  fireEvent.click(screen.getByRole("radio", { name: /Beard sculpt/ }));
  fireEvent.click(screen.getByRole("button", { name: "Continue" }));
  fireEvent.click(screen.getByRole("radio", { name: /Alex/ }));
  fireEvent.click(screen.getByRole("button", { name: "Continue" }));
  fireEvent.change(screen.getByLabelText("Your preferred date"), {
    target: { value: "2099-10-10" },
  });
  fireEvent.click(screen.getByRole("radio", { name: "13:00" }));
  fireEvent.change(screen.getByLabelText("Your preferred date"), {
    target: { value: "2099-10-11" },
  });
  expect(screen.getByRole("radio", { name: "13:00" })).not.toBeChecked();
  fireEvent.click(screen.getByRole("button", { name: "Continue" }));
  expect(screen.getByRole("alert")).toHaveTextContent(
    "Choose a future date and a time"
  );
});
