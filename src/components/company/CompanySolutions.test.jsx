import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import EnquiryWizard from "./EnquiryWizard";
import { ServicePackages, CompanyFAQ } from "./BusinessSections";
import LegalPage, { LegalLinks } from "./LegalPages";
import { company, partners } from "./company";
beforeEach(() => {
  window.scrollTo = jest.fn();
});
test("wizard retains selections and prepares an enquiry for the company email", () => {
  render(<EnquiryWizard selectedService="Online Store" />);
  expect(screen.getByRole("radio", { name: "Online Store" })).toBeChecked();
  fireEvent.change(screen.getByLabelText("Business name (optional)"), {
    target: { value: "Example Shop" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Continue" }));
  fireEvent.click(screen.getByRole("checkbox", { name: "Online payments" }));
  fireEvent.click(screen.getByRole("button", { name: "Continue" }));
  fireEvent.change(screen.getByLabelText("Your name"), {
    target: { value: "Alex Demo" },
  });
  fireEvent.change(screen.getByLabelText("Email address"), {
    target: { value: "alex@example.com" },
  });
  fireEvent.change(screen.getByLabelText("Tell us about your project"), {
    target: { value: "A shop for local ceramics." },
  });
  fireEvent.click(screen.getByRole("button", { name: "Review my brief" }));
  expect(screen.getByText("Example Shop")).toBeInTheDocument();
  expect(screen.getByText("Online payments")).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Edit details" }));
  expect(screen.getByLabelText("Your name")).toHaveValue("Alex Demo");
  fireEvent.click(screen.getByRole("button", { name: "Review my brief" }));
  fireEvent.click(screen.getByRole("button", { name: "Prepare my enquiry" }));
  const email = screen
    .getByRole("link", { name: "Open email app to send" })
    .getAttribute("href");
  expect(email.startsWith("mailto:hello@toimu.ee?")).toBe(true);
  expect(decodeURIComponent(email)).toContain("Online payments");
  expect(decodeURIComponent(email)).toContain("A shop for local ceramics.");
  const download = screen.getByRole("link", { name: "Download project brief" });
  expect(download).toHaveAttribute("download", "TOIMU-project-brief.txt");
  expect(decodeURIComponent(download.getAttribute("href"))).toContain(
    "Example Shop"
  );
});
test("wizard refuses empty contact details and invalid email before review", () => {
  render(<EnquiryWizard />);
  fireEvent.click(screen.getByRole("button", { name: "Continue" }));
  fireEvent.click(screen.getByRole("button", { name: "Continue" }));
  fireEvent.submit(
    screen.getByRole("button", { name: "Review my brief" }).closest("form")
  );
  expect(screen.getByRole("alert")).toHaveTextContent("Enter your name");
  expect(
    screen.queryByRole("button", { name: "Prepare my enquiry" })
  ).not.toBeInTheDocument();
});
test("package actions choose the solution and FAQ uses expandable disclosures", () => {
  const choose = jest.fn();
  render(
    <>
      <ServicePackages onChoose={choose} />
      <CompanyFAQ />
    </>
  );
  fireEvent.click(
    screen.getByRole("button", { name: "Discuss website launch" })
  );
  expect(choose).toHaveBeenCalledWith("Website Launch");
  const summary = screen.getByText("How much will my website cost?");
  expect(summary.closest("details")).not.toHaveAttribute("open");
  fireEvent.click(summary);
  expect(summary.closest("details")).toHaveAttribute("open");
});
test("legal information is accessible and describes actual demo and cookie behaviour", () => {
  render(
    <>
      <LegalPage kind="cookies" />
      <LegalLinks />
    </>
  );
  expect(
    screen.getByRole("heading", { name: "Cookie policy", level: 1 })
  ).toBeInTheDocument();
  expect(screen.getByText(/does not set cookies/)).toBeInTheDocument();
  expect(
    screen.getByRole("navigation", { name: "Legal information" })
  ).toBeInTheDocument();
  expect(company.registry).toBe("17596572");
  expect(company.email).toBe("hello@toimu.ee");
  expect(partners).toHaveLength(0);
});
