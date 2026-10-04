# Company website launch notes

This repository contains a static agency portfolio and simulated business demos. No paid contracts, product purchases or real appointments are concluded through it.

Company register reference: https://ariregister.rik.ee/eng/company/17596572/TOIMU-Technologies-O%C3%9C
Registry code: 17596572. Email: hello@toimu.ee.

## Implemented

- Company identity, registered address, contact email and registry link.
- Privacy, cookies and website-use terms linked from all pages and demos.
- No analytics, advertising scripts, embedded third-party services, application cookies, localStorage or sessionStorage.
- Enquiries prepare a mailto message and downloadable brief; they are not submitted automatically.
- Demonstration data is held in React state and resets on reload.
- Promotional banners do not claim discounts, scarcity or client endorsements.
- Future partners are configured in src/components/company/company.js; add only confirmed partners and approved local logo assets.
- Security-header configuration in public/_headers for hosts that support that format. Apply equivalent headers on other hosts.

## Before publishing

- Verify the current registered address and any applicable VAT registration against the company register.
- Verify that hello@toimu.ee receives mail and that replying, access control and retention practices match the privacy notice.
- Identify the actual hosting and email suppliers, their processing locations, log-retention periods and any applicable data-processing/transfer arrangements. Replace general provider wording in the privacy notice with deployment-specific information.
- Audit production requests and cookies; hosting/security features can add cookies or logs beyond the application code. If optional trackers are introduced, implement real prior-consent controls and update the cookie inventory before enabling them.
- Enable HTTPS and verify that the production host applies the configured headers. This local build cannot certify a future hosting configuration.
- Review service-contract terms separately before taking paid orders. The website terms are not a development contract or checkout terms.
- Obtain partner permission before adding logos or representing a business as a client/partner.

Legal content reflects the current code and is not a certification of all operational compliance. Relevant sources: GDPR Articles 6 and 13 (EUR-Lex Regulation 2016/679), EU Your Europe online privacy guidance, Estonian AKI guidance on website cookies.
