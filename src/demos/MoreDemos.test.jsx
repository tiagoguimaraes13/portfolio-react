import { render, screen, fireEvent, within } from "@testing-library/react";
import NordBuild from "./NordBuild";
import FormStore from "./FormStore";
beforeEach(() => {
  window.scrollTo = jest.fn();
});
test("construction filters projects and shows a simulated enquiry confirmation", () => {
  render(<NordBuild />);
  fireEvent.click(screen.getByRole("button", { name: "Renovations" }));
  expect(
    screen.getByRole("heading", { name: "A kitchen, reimagined" })
  ).toBeInTheDocument();
  expect(
    screen.queryByRole("heading", { name: "The woodland home" })
  ).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "View project details" }));
  expect(screen.getByText("Concept scope")).toBeInTheDocument();
  fireEvent.change(screen.getByLabelText("Your name"), {
    target: { value: "Example Owner" },
  });
  fireEvent.change(screen.getByLabelText("Email"), {
    target: { value: "owner@example.com" },
  });
  fireEvent.change(screen.getByLabelText("Project location"), {
    target: { value: "Tallinn" },
  });
  fireEvent.change(screen.getByLabelText("Your project"), {
    target: { value: "A demo renovation" },
  });
  fireEvent.change(screen.getByLabelText("Project type"), {
    target: { value: "Renovation" },
  });
  fireEvent.submit(
    screen
      .getByRole("button", { name: "Preview enquiry confirmation" })
      .closest("form")
  );
  expect(screen.getByRole("status")).toHaveTextContent(
    "Thanks, Example Owner."
  );
  expect(screen.getByRole("status")).toHaveTextContent("No request was sent");
  fireEvent.click(screen.getByRole("button", { name: "Try another request" }));
  expect(screen.getByLabelText("Your name")).toHaveValue("");
});
test("store supports variants, quantity changes, delivery totals and simulated checkout", () => {
  render(<FormStore />);
  fireEvent.change(
    screen.getByLabelText("Finish", { selector: "#variant-mug" }),
    { target: { value: "Cream" } }
  );
  fireEvent.click(
    screen.getByRole("button", { name: "Add morning mug to bag" })
  );
  fireEvent.click(screen.getByRole("button", { name: "Bag (1)" }));
  expect(screen.getByText("€23.00")).toBeInTheDocument();
  fireEvent.change(screen.getByLabelText("Quantity for Morning mug, Cream"), {
    target: { value: "2" },
  });
  expect(screen.getByText("€41.00")).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Try demo checkout" }));
  fireEvent.change(screen.getByLabelText("Your name"), {
    target: { value: "Demo Shopper" },
  });
  fireEvent.change(screen.getByLabelText("Email address"), {
    target: { value: "shopper@example.com" },
  });
  fireEvent.change(screen.getByLabelText("Street address"), {
    target: { value: "12 Example Street" },
  });
  fireEvent.change(screen.getByLabelText("City"), {
    target: { value: "Tallinn" },
  });
  fireEvent.change(screen.getByLabelText("Postal code"), {
    target: { value: "10111" },
  });
  fireEvent.submit(
    screen.getByRole("button", { name: "Place demo order" }).closest("form")
  );
  expect(
    screen.getByRole("heading", { name: "Lovely choice, Demo Shopper." })
  ).toBeInTheDocument();
  expect(screen.getByText(/No payment was taken/)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Bag (0)" })).toBeInTheDocument();
  expect(screen.getByText("€41.00")).toBeInTheDocument();
});
test("store applies free delivery and removing the last item shows the empty bag", () => {
  render(<FormStore />);
  fireEvent.click(
    screen.getByRole("button", { name: "Add soft light lamp to bag" })
  );
  fireEvent.click(screen.getByRole("button", { name: "Bag (1)" }));
  fireEvent.change(
    screen.getByLabelText("Quantity for Soft light lamp, Natural linen"),
    { target: { value: "2" } }
  );
  expect(screen.getByText("Free")).toBeInTheDocument();
  expect(
    within(document.querySelector(".store-totals")).getAllByText("€178.00")
  ).toHaveLength(2);
  fireEvent.click(
    screen.getByRole("button", {
      name: "Remove soft light lamp, Natural linen",
    })
  );
  expect(
    screen.getByText("Your bag is waiting for something lovely.")
  ).toBeInTheDocument();
});
