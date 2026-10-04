import { useLanguage } from "../../i18n/LanguageContext";
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
    "Can you design a logo for my business?",
    "Yes. We create original logos and visual identities, including a colour palette and a consistent direction for your website. Logo design can be a standalone project or part of a website package. The logos in our demonstration showcase are examples of our work.",
  ],
  [
    "How much will my website cost?",
    "We aim to make professional websites approachable for new and growing businesses. Tell us what you need, and we’ll prepare a clear, personalised quote based on the pages, content and functionality involved. Hosting, domain and third-party fees are listed separately.",
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
    "STUDIO CUT, NORD BUILD, FORM & FIELD and OLIVE & TABLE are fictional concepts. Miguel AM, Cardoso, B.Cocoon, OKOA and TG are independent website concepts for real businesses, not confirmed client partnerships. Their enquiries and shopping flows are demonstrations. TOIMU is our own city discovery product.",
  ],
];
export function ServicePackages({ onChoose }) {
  const { t, language } = useLanguage();
  return (
    <section id="packages" className="section company-packages">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{t("Find your starting point")}</p>
          <h2>
            {t("A solution for")}
            <br />
            <em>{t("your next step.")}</em>
          </h2>
        </div>
        <p>
          {t(
            "Professional websites at approachable prices. Tell us what you need, and we\u2019ll prepare a clear, personalised quote."
          )}
        </p>
      </div>
      <div className="company-package-grid">
        {packages.map((p, i) => (
          <article key={p.name}>
            <span className="company-package-index">
              0{i + 1} / {t(p.tag)}
            </span>
            <h3>{t(p.name)}</h3>
            <p>{t(p.description)}</p>
            <ul>
              {p.items.map((item) => (
                <li key={item}>{t(item)}</li>
              ))}
            </ul>
            <span className="company-package-price">{t("Tailored quote")}</span>
            <button onClick={() => onChoose(p.service)}>
              {t("Discuss")}{" "}
              {language === "en" ? p.name.toLowerCase() : t(p.name)}
            </button>
          </article>
        ))}
      </div>
      <div className="company-maintenance">
        <div>
          <h3>{t("Keep moving after launch.")}</h3>
          <p>
            {t(
              "Optional maintenance, content updates and improvements, with the scope and ongoing costs agreed in advance."
            )}
          </p>
        </div>
        <button onClick={() => onChoose("Maintenance & Support")}>
          {t("Discuss ongoing support")}
        </button>
      </div>
    </section>
  );
}
export function CompanyFAQ() {
  const { t } = useLanguage();
  return (
    <section id="faq" className="section company-faq">
      <div>
        <p className="eyebrow">{t("A few useful answers")}</p>
        <h2>
          {t("Before we")}
          <br />
          <em>{t("get started.")}</em>
        </h2>
        <p>
          {t(
            "Have a different question? Include it in your project brief below."
          )}
        </p>
      </div>
      <div className="company-faq-list">
        {faq.map(([question, answer]) => (
          <details key={question}>
            <summary>{t(question)}</summary>
            <p>{t(answer)}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
