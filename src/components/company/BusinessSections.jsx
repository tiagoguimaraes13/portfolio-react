import React from "react";
import "./company-solutions.css";
export const packages = [
  {
    name: "Website Launch",
    tag: "For a new beginning",
    description:
      "Introduce your business with a website that makes the essentials easy to find.",
    items: [
      "Visual direction and page layouts",
      "Responsive business pages",
      "Clear enquiry and contact paths",
      "Launch preparation",
    ],
    service: "Website Launch",
  },
  {
    name: "Website Redesign",
    tag: "For your next chapter",
    description:
      "Give an existing website a clearer structure and a fresh visual identity.",
    items: [
      "Review of your current website",
      "Updated design and navigation",
      "Content migration agreed in scope",
      "Mobile layout improvements",
    ],
    service: "Website Redesign",
  },
  {
    name: "Online Store",
    tag: "For your next sale",
    description:
      "A shopping experience shaped around your products and customers.",
    items: [
      "Product and collection pages",
      "Shopping cart and checkout setup",
      "Payment and delivery integrations",
      "Product management setup",
    ],
    service: "Online Store",
  },
  {
    name: "Custom Solutions",
    tag: "For a different challenge",
    description:
      "Turn a specific business process into a digital experience that works for you.",
    items: [
      "Requirements and workflow planning",
      "Booking systems or customer portals",
      "Custom interfaces and integrations",
      "Testing of the agreed user journeys",
    ],
    service: "Custom Solutions",
  },
];
const faq = [
  [
    "How much will my website cost?",
    "Every project is quoted around its scope: pages, content, design and functionality. Tell us what you need and we can discuss an approach before preparing a proposal. Hosting, domain and third-party fees should be listed separately.",
  ],
  [
    "How long does a project take?",
    "The timeline depends on the scope, content readiness and feedback. We agree the stages and expected launch date before work begins, and discuss any changes that affect them.",
  ],
  [
    "Can you improve my existing website?",
    "Yes. We can start by reviewing what you have, what is working and what needs to change. The proposal can cover a focused improvement or a full redesign.",
  ],
  [
    "Do I need to provide the text and images?",
    "Existing branding, text and photographs are a useful starting point. We discuss any writing, image sourcing or content preparation you need and include that work in the agreed scope.",
  ],
  [
    "Can you help with my domain and hosting?",
    "We can help plan domain and hosting setup for the chosen website. Provider accounts, access, recurring fees and responsibilities are agreed before launch.",
  ],
  [
    "Who owns the finished website?",
    "Ownership, source-code handover and account access are set out in the project agreement. Third-party platforms, fonts, images and software may have their own licence terms.",
  ],
  [
    "Can you add bookings, payments or an online store?",
    "Yes. These features need the right platform, service accounts and integrations. Our interactive concepts show possible experiences; production systems require live services, configuration and testing.",
  ],
  [
    "What happens after launch?",
    "We can discuss optional maintenance, content updates and further development. The work, support hours, fees and response expectations are agreed separately.",
  ],
  [
    "Are the portfolio demos real businesses?",
    "STUDIO CUT, NORD BUILD, FORM & FIELD and OLIVE & TABLE are fictional concepts. Their bookings, enquiries and orders are simulated. TOIMU is our own city discovery product.",
  ],
];
export function ServicePackages({ onChoose }) {
  return (
    <section id="packages" className="section company-packages">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Find your starting point</p>
          <h2>
            A solution for
            <br />
            <em>your next step.</em>
          </h2>
        </div>
        <p>
          Four ways to start a conversation. We agree the details, deliverables
          and price around your business.
        </p>
      </div>
      <div className="company-package-grid">
        {packages.map((p, i) => (
          <article key={p.name}>
            <span className="company-package-index">
              0{i + 1} / {p.tag}
            </span>
            <h3>{p.name}</h3>
            <p>{p.description}</p>
            <ul>
              {p.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <span className="company-package-price">Tailored quote</span>
            <button onClick={() => onChoose(p.service)}>
              Discuss {p.name.toLowerCase()}
            </button>
          </article>
        ))}
      </div>
      <div className="company-maintenance">
        <div>
          <h3>Keep moving after launch.</h3>
          <p>
            Optional maintenance, content updates and improvements, with the
            scope and ongoing costs agreed in advance.
          </p>
        </div>
        <button onClick={() => onChoose("Maintenance & Support")}>
          Discuss ongoing support
        </button>
      </div>
    </section>
  );
}
export function CompanyFAQ() {
  return (
    <section id="faq" className="section company-faq">
      <div>
        <p className="eyebrow">A few useful answers</p>
        <h2>
          Before we
          <br />
          <em>get started.</em>
        </h2>
        <p>
          Have a different question? Include it in your project brief below.
        </p>
      </div>
      <div className="company-faq-list">
        {faq.map(([question, answer]) => (
          <details key={question}>
            <summary>{question}</summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
