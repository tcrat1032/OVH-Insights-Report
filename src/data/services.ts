import { Server, HardDrive, AppWindow, Database, Archive, ShieldCheck, Globe, Mail, Code2, Wrench, GitBranch, Cpu, Cloud } from "lucide-react";

export type Service = {
  slug: string;
  name: string;
  shortDesc: string;
  longDesc: string;
  features: string[];
  startingPrice?: string; // INR /mo
  icon: any;
};

export type Pillar = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  services: Service[];
  icon: any;
};

export const PILLARS: Pillar[] = [
  {
    slug: "data-center-services",
    name: "Data Center & Colocation",
    tagline: "Enterprise-grade compute, storage and connectivity",
    description: "Rack and cage colocation, single-tenant dedicated servers, VPS, managed databases, object storage and backup — all inside Indian data centres. Bring your own hardware into our racks, or take ours fully managed. Every workload stays on Indian soil with documented data residency, so your compliance team has a straight answer when the auditor asks where the data lives.",
    icon: Cloud,
    services: [
      {
        slug: "dedicated-servers", name: "Dedicated Servers", icon: Server,
        shortDesc: "Single-tenant bare-metal with full hardware control.",
        longDesc: "High-performance Intel Xeon and AMD EPYC dedicated servers with NVMe storage, 1 Gbps unmetered bandwidth, IPMI access and 24×7 NOC support.",
        features: ["Latest-gen Xeon / EPYC CPUs", "NVMe SSD storage", "1 Gbps unmetered bandwidth", "DDoS protection included", "IPMI / KVM access", "99.99% SLA"],
        startingPrice: "₹6,499",
      },
      {
        slug: "vps", name: "VPS", icon: Cpu,
        shortDesc: "Scalable virtual servers, deploy in minutes.",
        longDesc: "Linux and Windows virtual private servers with guaranteed resources, snapshot backups and easy vertical scaling.",
        features: ["KVM virtualization", "Snapshot backups", "Choice of Linux / Windows", "Free SSL", "Hourly resize", "Indian IP addresses"],
        startingPrice: "₹499",
      },
      {
        slug: "application-hosting", name: "Application Hosting", icon: AppWindow,
        shortDesc: "Managed runtime for Node, Java, .NET and Python apps.",
        longDesc: "Fully managed application platform with auto-scaling, zero-downtime deploys, SSL and integrated monitoring.",
        features: ["Auto-scaling", "Zero-downtime deploys", "Built-in CI/CD hooks", "Container support", "App firewall", "Real-time logs"],
        startingPrice: "₹1,999",
      },
      {
        slug: "database-hosting", name: "Database Hosting", icon: Database,
        shortDesc: "Managed PostgreSQL, MySQL, MongoDB and Redis.",
        longDesc: "Production-ready databases with automated backups, point-in-time recovery, read replicas and 24×7 expert support.",
        features: ["PostgreSQL / MySQL / MongoDB / Redis", "Automated daily backups", "Point-in-time recovery", "Read replicas", "TLS in transit", "Performance tuning"],
        startingPrice: "₹2,499",
      },
      {
        slug: "storage-provisioning", name: "Storage Provisioning", icon: HardDrive,
        shortDesc: "Block, object and file storage on demand.",
        longDesc: "Scalable storage tiers — high-IOPS NVMe, S3-compatible object storage and shared NFS file storage — billed by the GB.",
        features: ["S3-compatible object storage", "High-IOPS NVMe blocks", "NFS file shares", "Per-GB pricing", "Encrypted at rest", "Multi-region replication"],
        startingPrice: "₹2.5/GB",
      },
      {
        slug: "backup-and-dr", name: "Backup & DR", icon: Archive,
        shortDesc: "Automated backups and disaster recovery as a service.",
        longDesc: "Policy-driven backup with offsite replication and orchestrated DR failover, tested quarterly with our team.",
        features: ["Veeam / Acronis powered", "Offsite replication", "RPO from 15 minutes", "Tested DR runbooks", "Immutable backups", "Compliance reporting"],
        startingPrice: "₹4,999",
      },
      {
        slug: "connectivity-and-cdn", name: "Connectivity & CDN", icon: Globe,
        shortDesc: "Global CDN, private links and DDoS protection.",
        longDesc: "Accelerate content delivery and secure your network with our edge CDN, private interconnects and always-on DDoS shield.",
        features: ["200+ edge locations", "Anycast DNS", "Private MPLS / IPsec", "Always-on DDoS protection", "WAF rules", "Real-time analytics"],
        startingPrice: "₹999",
      },
    ],
  },
  {
    slug: "hosting-services",
    name: "Domain & Web Management",
    tagline: "Everything you need to launch online",
    description: "Domain registration and DNS, business web hosting, professional email and custom web application development — running on our own infrastructure rather than resold from someone else's. One provider from the domain record through to the application, so there is no finger-pointing when something breaks at 2am.",
    icon: Globe,
    services: [
      {
        slug: "domain-registration", name: "Domain Registration", icon: Globe,
        shortDesc: "Register and manage 500+ TLDs with free WHOIS privacy.",
        longDesc: "Search, register and renew domain names from a single dashboard with bulk discounts, free DNS management and WHOIS privacy.",
        features: ["500+ TLDs supported", "Free WHOIS privacy", "Free DNS management", "Bulk transfers", "Auto-renew protection", "DNSSEC support"],
        startingPrice: "₹499/yr",
      },
      {
        slug: "web-hosting", name: "Web Hosting", icon: AppWindow,
        shortDesc: "Fast cPanel-style hosting with free SSL and email.",
        longDesc: "LiteSpeed-powered shared and reseller hosting with one-click WordPress, free SSL, daily backups and 24×7 support.",
        features: ["LiteSpeed web server", "One-click WordPress", "Free SSL (Let's Encrypt)", "Daily backups", "99.9% uptime SLA", "cPanel access"],
        startingPrice: "₹199",
      },
      {
        slug: "app-development", name: "App Development", icon: Code2,
        shortDesc: "Custom web and mobile apps built by our engineering team.",
        longDesc: "End-to-end product engineering — from discovery and UX through to delivery on web, iOS and Android — with ongoing maintenance options.",
        features: ["Discovery & UX workshops", "Web, iOS and Android", "API & backend engineering", "QA & accessibility", "DevOps & deployment", "Post-launch support"],
      },
      {
        slug: "business-email", name: "Business Email Accounts", icon: Mail,
        shortDesc: "Secure, ad-free professional email on your domain.",
        longDesc: "Branded mailboxes on your domain with anti-spam, generous storage, calendar, contacts and mobile sync.",
        features: ["Webmail + IMAP / SMTP", "Anti-spam & anti-virus", "30 GB per mailbox", "Calendar & contacts", "Mobile sync", "Migration assistance"],
        startingPrice: "₹89",
      },
    ],
  },
  {
    slug: "it-infrastructure",
    name: "IT Support & Consulting",
    tagline: "We run, modernise and support your IT",
    description: "Day-to-day managed IT, annual maintenance contracts, network and virtualisation management, migration consulting and on-site hardware support. For businesses that need an IT function but do not need to hire and retain an internal team to get one.",
    icon: Wrench,
    services: [
      {
        slug: "it-managed-services", name: "IT Managed Services", icon: ShieldCheck,
        shortDesc: "24×7 monitoring, patching and incident response.",
        longDesc: "Outcome-based managed services covering infrastructure, OS, middleware and applications — backed by SLAs and a dedicated TAM.",
        features: ["24×7 NOC monitoring", "Patch management", "Incident & change management", "Capacity planning", "Dedicated TAM", "Quarterly business reviews"],
      },
      {
        slug: "consulting-and-migration", name: "Consulting & Migration", icon: GitBranch,
        shortDesc: "Cloud, datacenter and platform migrations done right.",
        longDesc: "Plan and execute lift-and-shift, re-platform and re-architect migrations — to private cloud, public cloud or our colocation.",
        features: ["Discovery & TCO modelling", "Cutover planning", "Zero-data-loss migrations", "Application re-platforming", "Post-migration optimisation", "Knowledge transfer"],
      },
      {
        slug: "hardware-support", name: "Hardware Support", icon: Wrench,
        shortDesc: "On-site break-fix across India for servers and network gear.",
        longDesc: "Multi-vendor hardware support with 4-hour and next-business-day response options across major Indian cities.",
        features: ["Multi-vendor (Dell, HPE, Cisco, Juniper)", "4-hour response option", "Spare parts inventory", "Pan-India coverage", "AMC contracts", "Asset lifecycle reporting"],
      },
    ],
  },
];

export const ALL_SERVICES = PILLARS.flatMap(p => p.services.map(s => ({ ...s, pillarSlug: p.slug, pillarName: p.name })));
