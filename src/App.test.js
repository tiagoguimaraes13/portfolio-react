import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

beforeEach(() => {
  window.scrollTo = jest.fn();
  Element.prototype.scrollIntoView = jest.fn();
  window.location.hash = "";
});
test("links the company portfolio to the booking demo and returns to company contact", () => {
  render(<App />);
  expect(screen.queryByText("Meet the founder")).not.toBeInTheDocument();
  expect(screen.getByRole("link", { name: "View demo" })).toHaveAttribute(
    "href",
    "#/demo/studio-cut"
  );
  window.location.hash = "#/demo/studio-cut";
  fireEvent(window, new Event("hashchange"));
  expect(
    screen.getByRole("heading", { name: "Choose your service" })
  ).toBeInTheDocument();
  window.location.hash = "#contact";
  fireEvent(window, new Event("hashchange"));
  expect(
    screen.getByRole("heading", { name: "Let’s start with your business." })
  ).toBeInTheDocument();
  expect(
    screen.queryByRole("heading", { name: "Choose your service" })
  ).not.toBeInTheDocument();
});

test("a visitor booking appears in the staff dashboard during the same session", () => {
  window.location.hash = "#/demo/studio-cut";
  render(<App />);
  fireEvent.click(screen.getByRole("radio", { name: /Signature cut/ }));
  fireEvent.click(screen.getByRole("button", { name: "Continue" }));
  fireEvent.click(screen.getByRole("radio", { name: /Alex/ }));
  fireEvent.click(screen.getByRole("button", { name: "Continue" }));
  fireEvent.change(screen.getByLabelText("Your preferred date"), {
    target: { value: "2099-10-10" },
  });
  fireEvent.click(screen.getByRole("radio", { name: "09:00" }));
  fireEvent.click(screen.getByRole("button", { name: "Continue" }));
  fireEvent.change(screen.getByLabelText("Your name"), {
    target: { value: "Portfolio Guest" },
  });
  fireEvent.change(screen.getByLabelText("Email address"), {
    target: { value: "guest@example.com" },
  });
  fireEvent.submit(document.getElementById("cut-details"));
  window.location.hash = "#/demo/studio-cut/dashboard";
  fireEvent(window, new Event("hashchange"));
  expect(screen.getByText("Portfolio Guest")).toBeInTheDocument();
  fireEvent.click(
    screen.getByRole("button", {
      name: "Cancel appointment for Portfolio Guest",
    })
  );
  expect(screen.getByRole("status")).toHaveTextContent(
    "Portfolio Guest: cancelled."
  );
});
