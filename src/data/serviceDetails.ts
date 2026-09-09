/**
 * Long-form, search-ready content for the services that are rendered by the
 * generic ServicePage template. Keyed by `${pillarSlug}/${serviceSlug}`.
 */

export type ServicePlan = {
  name: string;
  price: string;
  billing: string;
  specs: string[];
};

export type ServiceFaq = { q: string; a: string };

export type ServiceDetail = {
  overview: string[];
  plans?: { heading: string; note?: string; items: ServicePlan[] };
  useCases?: { heading: string; body: string }[];
  faqs?: ServiceFaq[];
};

export const SERVICE_DETAILS: Record<string, ServiceDetail> = {
  "data-center-services/connectivity-and-cdn": {
    overview: [
      "WularData operates edge caching, anycast DNS and private interconnects alongside our Indian data centre footprint, so static assets, media and API responses are served close to your users instead of travelling back to a single origin on every request.",
      "Connectivity is sold either as a CDN service in front of an existing origin, or as a private link between your office, your colocation racks and our compute platform. DDoS mitigation is always on at the network edge and is not billed per attack.",
    ],
    plans: {
      heading: "Connectivity and CDN plans",
      note: "Bandwidth beyond the included allowance is billed per GB in rupees. Private link pricing depends on the circuit and the sites being joined — we quote it after a site survey.",
      items: [
        {
          name: "CDN Starter",
          price: "₹999",
          billing: "per month",
          specs: ["1 TB included traffic", "Edge caching + free SSL", "Anycast DNS for one zone", "Always-on DDoS protection"],
        },
        {
          name: "CDN Business",
          price: "₹4,499",
          billing: "per month",
          specs: ["5 TB included traffic", "Custom cache rules and purge API", "WAF rule set", "Real-time traffic analytics"],
        },
        {
          name: "Private Interconnect",
          price: "Quoted",
          billing: "per circuit, per month",
          specs: ["IPsec or MPLS between your sites and our racks", "Dedicated bandwidth, no shared contention", "BGP session on request", "Monitored 24×7 by our NOC"],
        },
      ],
    },
    useCases: [
      { heading: "Media and download-heavy sites", body: "Offload images, video and installers to the edge so your origin only handles dynamic requests. This usually cuts origin bandwidth sharply and improves page load times for users far from the hosting region." },
      { heading: "APIs with national traffic", body: "Terminate TLS at the edge and keep long-lived connections warm, so mobile clients across India see lower handshake latency without changing your application." },
      { heading: "Multi-site businesses", body: "Join branch offices, a head-office server room and your colocation racks over one private link instead of routing internal traffic across the public internet." },
    ],
    faqs: [
      { q: "Do you charge extra during a DDoS attack?", a: "No. Volumetric mitigation is part of the platform and attack traffic scrubbed at the edge is not billed to you as delivered bandwidth. If an attack requires ongoing application-layer rules, our NOC writes them with you." },
      { q: "Can I use the CDN with an origin hosted elsewhere?", a: "Yes. The origin can be any reachable HTTP endpoint, including a server with another provider or a cloud load balancer. You point a hostname at us and we fetch from your origin." },
      { q: "How long does a private link take to deliver?", a: "An IPsec tunnel over existing internet circuits can be live within a few business days. A dedicated MPLS circuit depends on the last-mile provider at your site and typically takes several weeks." },
    ],
  },

  "hosting-services/domain-registration": {
    overview: [
      "Register, transfer and renew domains across more than 500 TLDs — including .in, .co.in, .com, .org and the newer generic extensions — from one dashboard, with DNS management and WHOIS privacy included rather than sold as add-ons.",
      "Because we also run the hosting and the mail platform, a domain bought here can be pointed at your website and mailboxes without waiting on a third-party registrar's support queue.",
    ],
    plans: {
      heading: "Popular domain pricing",
      note: "Prices are first-year registration in rupees, inclusive of DNS management and WHOIS privacy where the registry permits it. Renewal rates are shown in the dashboard before you commit.",
      items: [
        { name: ".in", price: "₹499", billing: "per year", specs: ["Free DNS management", "WHOIS privacy", "Auto-renew protection", "Transfer lock"] },
        { name: ".com", price: "₹1,099", billing: "per year", specs: ["Free DNS management", "WHOIS privacy", "DNSSEC support", "Bulk discounts available"] },
        { name: ".co.in / .org.in", price: "₹649", billing: "per year", specs: ["Free DNS management", "Registry-compliant contact handling", "Auto-renew protection", "Free email forwarding"] },
      ],
    },
    useCases: [
      { heading: "Consolidating a scattered portfolio", body: "If your domains sit with three registrars and two former employees, we handle the bulk transfer, normalise the contact records and put renewals on one invoice with one expiry calendar." },
      { heading: "Protecting a brand", body: "Register the defensive variants and country extensions around your primary name, with registry locks and auto-renew so a lapsed payment does not put the brand on the open market." },
    ],
    faqs: [
      { q: "Can I transfer a domain I already own?", a: "Yes. You unlock the domain at your current registrar and give us the authorisation code; we handle the rest. The remaining validity carries over and the transfer adds a year to it, as the registry requires." },
      { q: "Is WHOIS privacy included?", a: "Yes, wherever the registry allows it. Your registrant details are replaced with proxy contact information in public WHOIS, which reduces spam and cold-calling from scraped records." },
      { q: "Who controls the DNS?", a: "You do. Every domain gets a DNS zone editor in the dashboard with A, AAAA, CNAME, MX, TXT, SRV and CAA records, and you can point the domain at any provider — you are not locked into hosting with us." },
    ],
  },

  "hosting-services/web-hosting": {
    overview: [
      "LiteSpeed-powered shared, business and reseller hosting on our own Indian infrastructure, with free Let's Encrypt SSL, daily backups and one-click WordPress. Support is handled by the same engineers who run the servers, not an outsourced first line.",
      "Every plan includes cPanel-style management, PHP version switching, MySQL databases, staging for WordPress sites and mailbox creation on your domain. Sites are hosted in India, so response times for Indian visitors do not depend on an overseas region.",
    ],
    plans: {
      heading: "Web hosting plans",
      note: "All plans include free SSL, daily backups and unmetered fair-use bandwidth. Annual billing is available; storage can be topped up per GB.",
      items: [
        { name: "Starter", price: "₹199", billing: "per month", specs: ["1 website", "10 GB NVMe storage", "5 mailboxes", "Free SSL + daily backups"] },
        { name: "Business", price: "₹549", billing: "per month", specs: ["10 websites", "50 GB NVMe storage", "Unlimited mailboxes", "WordPress staging + object cache"] },
        { name: "Reseller", price: "₹1,499", billing: "per month", specs: ["25 cPanel accounts", "150 GB NVMe storage", "White-label nameservers", "Per-account resource limits"] },
      ],
    },
    useCases: [
      { heading: "Business websites and brochure sites", body: "A WordPress or static site with contact forms, a handful of mailboxes and predictable traffic runs comfortably on the Starter or Business plan without the cost or the administration of a virtual server." },
      { heading: "Agencies and freelancers", body: "The reseller plan gives you isolated cPanel accounts per client, white-label nameservers and per-account limits, so one client's runaway plugin does not slow the rest of your portfolio." },
      { heading: "Outgrowing shared hosting", body: "When a site starts hitting CPU or memory limits, we migrate it to a VPS or dedicated server on the same network at no migration charge, keeping the same mail and DNS setup." },
    ],
    faqs: [
      { q: "Will you migrate my existing site?", a: "Yes, and there is no charge for it. We copy files, databases and mailboxes from your current host, stand the site up on a test URL for you to check, then switch DNS at a time you choose so visitors do not hit a half-migrated site." },
      { q: "What happens if my site exceeds its plan limits?", a: "We contact you rather than suspending silently. Short traffic spikes are absorbed; if the load is sustained we will recommend either a higher plan or a move to a VPS, with the pricing difference stated up front." },
      { q: "Do backups cost extra?", a: "No. Daily backups with a rolling retention window are included in every plan and you can restore files or a database yourself from the control panel. We keep an independent offsite copy as well." },
    ],
  },

  "hosting-services/app-development": {
    overview: [
      "Our engineering team builds and maintains web and mobile applications — internal tools, customer portals, booking and billing systems, and integrations with the accounting or ERP software you already run.",
      "Projects are delivered in fixed-scope phases with a named engineer accountable for delivery. Because we also operate the infrastructure, the same team handles deployment, monitoring and the on-call rota after launch instead of handing you a codebase and walking away.",
    ],
    plans: {
      heading: "How engagements are structured",
      note: "Every engagement starts with a paid discovery phase so the estimate is based on documented requirements rather than a guess. Rates are quoted in rupees and invoiced monthly.",
      items: [
        { name: "Discovery sprint", price: "Quoted", billing: "2–3 weeks", specs: ["Requirement workshops", "Technical architecture", "Wireframes and user flows", "Fixed-price build estimate"] },
        { name: "Fixed-scope build", price: "Quoted", billing: "per milestone", specs: ["Agreed scope and acceptance criteria", "Fortnightly demos", "QA and accessibility pass", "Deployment on our infrastructure"] },
        { name: "Retained team", price: "Quoted", billing: "per month", specs: ["Dedicated engineers", "Rolling backlog", "SLA-backed bug response", "Ongoing hosting and monitoring"] },
      ],
    },
    useCases: [
      { heading: "Replacing spreadsheets", body: "Operations run on shared spreadsheets until version conflicts and access control become a real risk. We turn that process into a web application with roles, audit trails and reporting, usually starting with the single most painful workflow." },
      { heading: "Customer portals", body: "Give customers self-service access to orders, invoices, documents or tickets, integrated with your existing back office so your team is not re-entering the same data twice." },
      { heading: "Mobile field applications", body: "Applications for field staff that work offline, sync when connectivity returns, and capture photographs, signatures and location against a job record." },
    ],
    faqs: [
      { q: "Who owns the code?", a: "You do. On final payment for each milestone, the source code, designs and documentation are yours, delivered in a repository you control. There is no licensing arrangement that ties the application to us." },
      { q: "How do you estimate a project?", a: "After the discovery phase. We workshop the requirements, agree the architecture and produce wireframes first, then issue a fixed-price estimate per milestone against written acceptance criteria so both sides know what finished means." },
      { q: "Can you maintain an application someone else built?", a: "Often, yes. We start with a code and infrastructure review to report honestly on what we find, then propose either a maintenance retainer or a staged rewrite of the parts that are the real source of trouble." },
    ],
  },

  "hosting-services/business-email": {
    overview: [
      "Ad-free mailboxes on your own domain with webmail, IMAP and SMTP, calendars, shared contacts and mobile sync — hosted on our Indian infrastructure so message content stays resident in India.",
      "Anti-spam and anti-virus filtering run in front of every mailbox, and SPF, DKIM and DMARC records are configured for your domain during setup so your mail is far less likely to land in a recipient's spam folder.",
    ],
    plans: {
      heading: "Mailbox plans",
      note: "Priced per mailbox, per month. Aliases, distribution lists and catch-all addresses do not consume a mailbox licence.",
      items: [
        { name: "Standard", price: "₹89", billing: "per mailbox / month", specs: ["10 GB storage", "Webmail + IMAP / SMTP", "Anti-spam and anti-virus", "Mobile sync"] },
        { name: "Professional", price: "₹179", billing: "per mailbox / month", specs: ["30 GB storage", "Calendars and shared contacts", "Distribution lists and aliases", "Two-factor authentication"] },
        { name: "Archive add-on", price: "₹49", billing: "per mailbox / month", specs: ["Tamper-evident message archive", "Retention policy per group", "Search across former staff mailboxes", "Export for audit or dispute"] },
      ],
    },
    useCases: [
      { heading: "Moving off free consumer email", body: "Businesses still running on personal Gmail or Yahoo addresses lose control of correspondence when staff leave. Mailboxes on your own domain stay with the company and can be reassigned or archived." },
      { heading: "Staff turnover and handover", body: "When someone leaves, we convert the mailbox to an alias or an archived account so their mail reaches a colleague instead of bouncing, and the history remains searchable." },
      { heading: "Deliverability problems", body: "If your invoices and quotes keep landing in spam, we audit and correct SPF, DKIM, DMARC and reverse DNS, then monitor the domain's reputation from our side." },
    ],
    faqs: [
      { q: "Can you migrate mail from our current provider?", a: "Yes. We copy existing messages, folder structure and contacts over IMAP from providers such as Google Workspace, Microsoft 365 or a cPanel server, run it in parallel while you test, and cut MX records over out of hours." },
      { q: "Does it work with Outlook and phones?", a: "Yes. Every mailbox supports standard IMAP and SMTP with TLS, so Outlook, Apple Mail, Thunderbird and the built-in iOS and Android mail apps all work. We provide the exact settings and can configure the first few devices with you." },
      { q: "Where is our email stored?", a: "In our Indian data centres. Message content and backups remain in India, which is the straightforward answer when a customer or auditor asks about data residency under the DPDP Act, 2023." },
    ],
  },

  "it-infrastructure/it-managed-services": {
    overview: [
      "We take responsibility for the day-to-day running of your servers, network and end-user IT: monitoring, patching, backup verification, incident response and change management, under a written SLA with a named technical account manager.",
      "This is aimed at businesses that need a working IT function without recruiting and retaining an internal team for it. We work on your existing infrastructure, whether that sits in our data centres, in your own server room or with another provider.",
    ],
    plans: {
      heading: "Managed service tiers",
      note: "Pricing depends on the number of servers, endpoints and network devices in scope. We size it after a discovery call and a documented asset inventory.",
      items: [
        { name: "Monitor", price: "Quoted", billing: "per month", specs: ["24×7 monitoring and alerting", "Monthly health reporting", "Business-hours incident response", "Backup success verification"] },
        { name: "Manage", price: "Quoted", billing: "per month", specs: ["Everything in Monitor", "OS and firmware patching", "24×7 incident response", "Change and configuration management"] },
        { name: "Manage Plus", price: "Quoted", billing: "per month", specs: ["Everything in Manage", "Named technical account manager", "Capacity planning and roadmap", "Quarterly business reviews and DR tests"] },
      ],
    },
    useCases: [
      { heading: "No internal IT team", body: "A single accountable partner for servers, network, backups and end-user support, so problems have one owner and one escalation path rather than three vendors pointing at each other." },
      { heading: "Supporting a small internal team", body: "We take the overnight and weekend rota, routine patching and monitoring, freeing your internal staff for project work instead of firefighting." },
      { heading: "Inherited, undocumented estates", body: "Where the person who built the environment has left, we start with discovery and documentation — asset inventory, dependencies, credentials and backup state — before changing anything." },
    ],
    faqs: [
      { q: "Do you only manage infrastructure hosted with you?", a: "No. We manage servers and networks wherever they run, including your own premises and other providers' platforms. Response commitments differ where physical access is involved, and we state that clearly in the contract." },
      { q: "What is covered by the SLA?", a: "Response time by incident severity, monitoring coverage, patch cadence, backup verification and reporting frequency. Severity definitions and escalation contacts are written into the agreement, not left to interpretation during an outage." },
      { q: "How does onboarding work?", a: "A discovery phase first: asset inventory, network documentation, backup and patch state, and a prioritised risk list. We agree what gets fixed before steady-state support begins, so we are not held to an SLA on an environment we have not stabilised." },
    ],
  },

  "it-infrastructure/consulting-and-migration": {
    overview: [
      "Migration and modernisation work: moving workloads out of an ageing server room, off an expensive hyperscaler bill, or from one platform to another — planned so the cutover is dull rather than dramatic.",
      "Engagements begin with discovery and total-cost modelling, so the decision to move is based on measured numbers from your own environment rather than a vendor's projection. If the honest answer is that a workload should stay where it is, we will say so.",
    ],
    plans: {
      heading: "Typical engagements",
      note: "Scoped and quoted per project after discovery. Larger migrations are delivered in waves so each wave can be validated before the next begins.",
      items: [
        { name: "Assessment and TCO", price: "Quoted", billing: "2–4 weeks", specs: ["Application and dependency mapping", "Current cost baseline", "Target architecture options", "Risk and effort estimate"] },
        { name: "Lift and shift", price: "Quoted", billing: "per wave", specs: ["Replication-based server moves", "Rehearsed cutover runbook", "Rollback plan per workload", "Post-move performance validation"] },
        { name: "Re-platform", price: "Quoted", billing: "per project", specs: ["OS, database or virtualisation upgrade", "Managed database or container targets", "Parallel run and data reconciliation", "Handover documentation and training"] },
      ],
    },
    useCases: [
      { heading: "Leaving a hyperscaler", body: "Where the bill is dominated by egress charges, per-hour compute and dollar exposure, we model the equivalent on dedicated servers or colocation in rupees and migrate the workloads that genuinely benefit." },
      { heading: "Closing an on-premise server room", body: "Ageing hardware, an unreliable UPS and no fire suppression is a risk that grows quietly. We move the workloads into our data centres, or move your own hardware into a colocation rack if it still has life in it." },
      { heading: "Data residency deadlines", body: "When a contract or regulator requires Indian residency by a fixed date, we sequence the migration around that deadline and document where each dataset ends up." },
    ],
    faqs: [
      { q: "How much downtime should we expect?", a: "For most workloads, minutes rather than hours. We replicate data continuously ahead of the cutover, rehearse the switch, and schedule the final sync in your quietest window. Databases and legacy applications that cannot replicate live are called out in the plan with a realistic window." },
      { q: "What if the migration goes wrong mid-cutover?", a: "Every wave has a written rollback plan and the source environment stays intact and runnable until you sign off on the target. We do not decommission anything on migration night." },
      { q: "Will you recommend against migrating?", a: "Yes, when the numbers say so. Some workloads are cheaper or safer where they are, and a licensing constraint occasionally makes a move uneconomic. You get that in writing at the end of the assessment phase." },
    ],
  },

  "it-infrastructure/hardware-support": {
    overview: [
      "Multi-vendor hardware support for servers, storage arrays, switches and firewalls across India — as an annual maintenance contract or on a per-incident basis, including equipment whose manufacturer warranty has expired.",
      "We hold spares for common platforms, so a failed disk, PSU or memory module is usually replaced from stock rather than waiting on an import. Coverage options range from next-business-day to four-hour response in the cities where we have engineers.",
    ],
    plans: {
      heading: "Support contract options",
      note: "Priced per device class and response tier after an asset audit. Out-of-warranty and end-of-life equipment can be covered where spares remain obtainable.",
      items: [
        { name: "Next business day", price: "Quoted", billing: "per device / year", specs: ["Remote diagnosis same day", "On-site engineer next business day", "Parts from our spares pool", "Asset and incident reporting"] },
        { name: "Four-hour response", price: "Quoted", billing: "per device / year", specs: ["24×7 logging", "Four-hour on-site target in covered cities", "Priority parts allocation", "Named escalation contact"] },
        { name: "Per-incident support", price: "Quoted", billing: "per call-out", specs: ["No annual commitment", "Diagnosis and parts quoted before work", "Best-effort scheduling", "Useful for one-off or legacy kit"] },
      ],
    },
    useCases: [
      { heading: "Equipment past its warranty", body: "Hardware that still does its job but is out of manufacturer support does not need replacing to be supportable. We cover it as long as spares are available, which typically costs far less than a refresh." },
      { heading: "Mixed-vendor estates", body: "Dell, HPE, Cisco, Juniper and white-box equipment under one contract and one phone number, instead of four support portals and four sets of entitlement checks during an outage." },
      { heading: "Branch and remote sites", body: "Pan-India coverage for offices without local IT staff, with response tiers matched to how critical each site is rather than a flat rate across all of them." },
    ],
    faqs: [
      { q: "Can you support hardware you did not sell us?", a: "Yes. Most of what we support was bought elsewhere. We audit the estate first, record model and serial numbers, confirm which platforms we can obtain spares for, and tell you plainly if a device cannot be covered." },
      { q: "Where is four-hour response available?", a: "In the metros and cities where we have resident engineers and a spares cache, including Delhi NCR and the Chandigarh tricity area. Elsewhere we offer next-business-day, and we confirm the tier per site in writing before the contract starts." },
      { q: "Are spare parts included in an AMC?", a: "Standard field-replaceable parts — disks, power supplies, memory, fans and common network modules — are included. Major assemblies such as system boards and controllers are quoted separately, and the exclusion list is part of the contract." },
    ],
  },
};
