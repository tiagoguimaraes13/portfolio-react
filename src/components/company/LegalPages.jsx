import React, { useEffect } from "react";
import { company } from "./company";
export function LegalLinks() {
  return (
    <nav className="company-legal-links" aria-label="Legal information">
      <a href="#/legal/company">Company information</a>
      <a href="#/legal/privacy">Privacy policy</a>
      <a href="#/legal/cookies">Cookie policy</a>
      <a href="#/legal/terms">Website terms</a>
      <a href={`mailto:${company.email}`}>{company.email}</a>
    </nav>
  );
}
const pages = {
  company: {
    title: "Company information",
    sections: [
      [
        "Website operator",
        `${company.name} is an Estonian private limited company entered in the Estonian Commercial Register. Registry code: ${company.registry}. Registered address: ${company.address}. Contact: ${company.email}.`,
      ],
      [
        "Our services",
        "This website introduces web design, website redesign, online-store development and custom digital solutions. Scope, pricing, taxes, payment arrangements, delivery dates, intellectual-property rights and support are agreed in an individual written proposal or contract. No paid service is ordered through this website.",
      ],
      [
        "Portfolio and partner information",
        "TOIMU is our own product. The barber, construction, store and restaurant websites are fictional demonstrations. Partner names and logos will be added only for confirmed collaborations with permission. A concept website is not evidence of a client relationship.",
      ],
      [
        "Contact and complaints",
        `For enquiries, concerns or complaints, email ${company.email}. Include enough information to identify the matter and the response you would like. We will review it and reply. Mandatory rights under applicable law remain unaffected.`,
      ],
    ],
  },
  privacy: {
    title: "Privacy policy",
    sections: [
      [
        "Who is responsible?",
        `${company.name}, registry code ${company.registry}, registered address ${company.address}, is responsible for personal information received in connection with this website and project enquiries. Contact ${company.email} for privacy questions or to exercise your rights.`,
      ],
      [
        "The enquiry wizard",
        "Your name, email, business details, preferences and project notes are processed in the current page to prepare a project brief. The wizard does not submit them to a server or save them in browser storage. Closing or reloading the page clears this state. A downloaded brief remains on your device until you delete it. Your browser may independently remember form entries according to its own settings.",
      ],
      [
        "When you send an email",
        "If you send the prepared enquiry, your email provider sends the message to our mailbox. We use the information you provide to respond, discuss the project and prepare a proposal. The legal basis is taking steps at your request before entering a contract (GDPR Article 6(1)(b)); for business representatives and general questions, our legitimate interest in handling business communications (Article 6(1)(f)). Necessary contract records may be kept to fulfil legal obligations (Article 6(1)(c)). No newsletter subscription is created by an enquiry.",
      ],
      [
        "Interactive demos",
        "Appointments, quote requests, orders and reservations are examples. Use fictional details. They are processed in page memory only and are not sent to real businesses, email services, booking providers or payment processors. Barber demo bookings can appear in the sample dashboard during the same page session. Reloading the page resets them. No card information is requested.",
      ],
      [
        "Technical data and recipients",
        "Delivering a website necessarily involves technical connection information such as an IP address, request time and browser information. The hosting or network provider may process connection and security logs. Hosting, email and professional service providers may act as processors or independent controllers according to their role; information is shared only where needed to deliver the site, respond to a request or fulfil legal obligations. This website code does not load analytics or advertising services.",
      ],
      [
        "Retention",
        "Page-memory information is cleared on reload or when the relevant demo is reset. Enquiry emails are retained for as long as necessary to answer and follow up on your request. If an enquiry becomes a project, relevant records are kept for the contract and applicable statutory periods. Records needed for a dispute are retained only for the period necessary to handle it. The hosting provider controls any technical-log retention; contact us for the deployment-specific information.",
      ],
      [
        "International processing",
        "Email or hosting suppliers may operate in different countries. Where processing outside the EEA is involved, GDPR transfer requirements must be met through an applicable adequacy decision or appropriate safeguards, such as standard contractual clauses. You can request information about the suppliers and safeguards relevant to your enquiry by contacting us.",
      ],
      [
        "Your rights",
        "Where applicable, you may request access, correction, deletion, restriction or portability of your data, and object to processing based on legitimate interests. If processing relies on consent, you may withdraw it without affecting earlier lawful processing. We may need to confirm your identity and consider legal retention duties. You can complain to the Estonian Data Protection Inspectorate (Andmekaitse Inspektsioon), www.aki.ee, or another competent supervisory authority.",
      ],
      [
        "Choices and updates",
        "The name, email and project notes requested by the wizard are needed to prepare a useful enquiry; you can instead email us directly. Do not include sensitive information in the demos or initial brief. There is no automated decision-making with legal or similarly significant effects. This notice may be updated when the website or its services change.",
      ],
    ],
  },
  cookies: {
    title: "Cookie policy",
    sections: [
      [
        "Current website behaviour",
        "The website application does not set cookies and does not use localStorage or sessionStorage. It does not include analytics, advertising pixels or embedded third-party widgets. Images and other website assets are served as part of the website. Therefore this version has no optional tracking to accept or reject.",
      ],
      [
        "What the demos remember",
        "The shopping bag, booking details, sample dashboard and enquiry wizard use temporary JavaScript state in the current page. This is not a cookie or persistent browser storage. Reloading the page resets that information. Your browser may still cache public assets or remember form values under its own settings.",
      ],
      [
        "Hosting and external links",
        "A hosting or security provider may have separate technical measures, including necessary security cookies. Those depend on the final deployment and must be reviewed before publication. Following a link to TOIMU, the company register, a partner or your email app takes you to a separate service with its own privacy and cookie rules. Those sites are not loaded as embedded content here.",
      ],
      [
        "If optional services are added",
        "Before adding consent-requiring analytics, advertising or third-party embeds, we will update this notice and implement controls that prevent them from loading until you opt in. Any such controls must provide a refusal choice and a way to withdraw or change consent.",
      ],
      [
        "Questions",
        `For questions about this website’s use of cookies and browser data, contact ${company.email}.`,
      ],
    ],
  },
  terms: {
    title: "Website terms",
    sections: [
      [
        "About this website",
        `This portfolio and services website is operated by ${company.name}, registry code ${company.registry}. It provides information about our work and ways to start a conversation. These terms concern use of this website; service contracts are agreed separately.`,
      ],
      [
        "Enquiries and service agreements",
        "Preparing a brief, sending an email or viewing a service package does not create a paid order or a confirmed project. Deliverables, price, taxes, schedule, payment, cancellation, support and ownership terms must be agreed before work starts. Package descriptions are starting points for discussion.",
      ],
      [
        "Demonstrations",
        "The fictional business demos do not create real bookings, orders, reservations or quote requests. Product prices, service prices and calculator rates are invented examples. No payment is collected and no goods are shipped. Do not use demo calculations as commercial quotations. Use fictional details when testing the demos.",
      ],
      [
        "Content and licences",
        "Website design, text and other material may be protected by intellectual-property rights. You may view the site and download your prepared project brief. Reuse of our designs or content requires permission unless otherwise permitted by law or an applicable licence. Third-party assets and partner marks retain their respective ownership and licence conditions.",
      ],
      [
        "Responsible use and links",
        "Do not interfere with the website, attempt unauthorised access or use the forms to send unlawful or abusive content. External links are provided for convenience; the linked services operate under their own terms and privacy policies.",
      ],
      [
        "Accuracy and mandatory rights",
        "We aim to keep information accurate and may update the website and demos. Availability and information can change. These terms do not exclude rights, remedies or liabilities that cannot lawfully be excluded. Any binding service commitments are stated in the applicable project agreement.",
      ],
      [
        "Questions and applicable law",
        `Contact ${company.email} with questions or concerns. Estonian law applies subject to any mandatory protections and jurisdiction rules that apply to you. Nothing here restricts statutory consumer rights where they apply.`,
      ],
    ],
  },
};
export default function LegalPage({ kind }) {
  const page = pages[kind] || pages.company;
  useEffect(() => {
    document.title = `${page.title} | TOIMU Technologies OÜ`;
    window.scrollTo(0, 0);
  }, [page]);
  return (
    <div className="company-legal-page">
      <header>
        <a className="wordmark" href="#home">
          {company.name}
        </a>
        <a href="#contact">Contact us</a>
      </header>
      <main>
        <p className="eyebrow">Website information · Updated 4 October 2026</p>
        <h1>{page.title}</h1>
        {page.sections.map(([title, text]) => (
          <section key={title}>
            <h2>{title}</h2>
            <p>{text}</p>
          </section>
        ))}
        {kind === "company" && (
          <a
            className="text-link"
            href={company.registerUrl}
            target="_blank"
            rel="noreferrer"
          >
            View official registry entry
          </a>
        )}
        <p className="legal-contact">
          <a href={`mailto:${company.email}`}>{company.email}</a>
        </p>
        <a href="#home">Return to the website</a>
      </main>
    </div>
  );
}
