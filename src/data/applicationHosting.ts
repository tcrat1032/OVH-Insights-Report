import { Boxes, Container, Workflow, Database, Cpu, Globe2, Layers, Rocket, GitBranch, Code2, Server, Network } from "lucide-react";

export type AppHostingCategory = "Compute" | "Containers & Orchestration" | "Databases" | "Storage & Network" | "AI & Data";

export type AppHostingProduct = {
  id: string;
  name: string;
  category: AppHostingCategory;
  tagline: string;
  description: string;
  features: string[];
  startingPrice: string; // INR
  icon: any;
  popular?: boolean;
};

export const APP_HOSTING_CATEGORIES: AppHostingCategory[] = [
  "Compute",
  "Containers & Orchestration",
  "Databases",
  "Storage & Network",
  "AI & Data",
];

export const APP_HOSTING_PRODUCTS: AppHostingProduct[] = [
  {
    id: "managed-runtime", name: "Managed Runtime", category: "Compute", icon: Rocket,
    tagline: "Push code, we run it.",
    description: "Fully managed runtime for Node.js, Python, Java, .NET, PHP and Go, backed by a 99.9% uptime SLA with built-in autoscaling.",
    features: ["Git-based deploys", "Auto-scaling 1–50 instances", "Free SSL & custom domains", "Built-in logs & metrics"],
    startingPrice: "₹1,999/mo",
    popular: true,
  },
  {
    id: "app-instances", name: "Application Instances", category: "Compute", icon: Server,
    tagline: "Dedicated compute for your apps.",
    description: "Pre-configured virtual instances optimised for web, API and worker workloads with snapshot backups.",
    features: ["2–32 vCores", "4–128 GB RAM", "NVMe SSD", "Hourly billing"],
    startingPrice: "₹1,499/mo",
  },
  {
    id: "managed-kubernetes", name: "Managed Kubernetes", category: "Containers & Orchestration", icon: Boxes,
    tagline: "Production-ready K8s in minutes.",
    description: "CNCF-certified Kubernetes with managed control plane, auto-upgrades and integrated load balancers.",
    features: ["Free control plane", "Auto-scaling node pools", "Integrated LB & ingress", "Private container registry"],
    startingPrice: "₹2,999/mo",
    popular: true,
  },
  {
    id: "container-registry", name: "Container Registry", category: "Containers & Orchestration", icon: Container,
    tagline: "Private OCI registry.",
    description: "Secure, geo-replicated registry for Docker and OCI artefacts with vulnerability scanning.",
    features: ["Unlimited pulls", "Vulnerability scanning", "Fine-grained ACLs", "Geo-replication"],
    startingPrice: "₹499/mo",
  },
  {
    id: "serverless-functions", name: "Serverless Functions", category: "Containers & Orchestration", icon: Workflow,
    tagline: "Event-driven compute, pay per call.",
    description: "Run lightweight functions triggered by HTTP, queues or schedules — scales to zero when idle.",
    features: ["HTTP / cron / queue triggers", "Scale to zero", "1M free invocations", "Multi-runtime support"],
    startingPrice: "₹0.20/1k calls",
  },
  {
    id: "managed-postgres", name: "Managed PostgreSQL", category: "Databases", icon: Database,
    tagline: "Production Postgres, fully managed.",
    description: "High-availability PostgreSQL with automated backups, PITR and read replicas.",
    features: ["Automated backups", "Point-in-time recovery", "Read replicas", "TLS in transit"],
    startingPrice: "₹2,499/mo",
  },
  {
    id: "managed-mysql", name: "Managed MySQL", category: "Databases", icon: Database,
    tagline: "MySQL without the ops.",
    description: "Tuned MySQL clusters with HA, backups and online schema changes.",
    features: ["HA replication", "Daily backups", "Online schema changes", "Slow-query insights"],
    startingPrice: "₹2,299/mo",
  },
  {
    id: "managed-mongo", name: "Managed MongoDB", category: "Databases", icon: Database,
    tagline: "Document DB, scaled & secured.",
    description: "Replica-set MongoDB with sharding, encrypted storage and 24×7 monitoring.",
    features: ["Replica sets", "Sharding ready", "Encryption at rest", "Backup retention 30d"],
    startingPrice: "₹2,799/mo",
  },
  {
    id: "managed-redis", name: "Managed Redis", category: "Databases", icon: Cpu,
    tagline: "In-memory cache & queue.",
    description: "Sub-millisecond Redis with persistence options and HA failover.",
    features: ["AOF + RDB persistence", "Sentinel HA", "Eviction policies", "TLS support"],
    startingPrice: "₹999/mo",
  },
  {
    id: "object-storage", name: "Object Storage", category: "Storage & Network", icon: Layers,
    tagline: "S3-compatible storage at scale.",
    description: "Durable, geo-replicated object storage with S3 API for backups, media and static assets.",
    features: ["S3 API compatible", "11×9s durability", "Lifecycle policies", "Pre-signed URLs"],
    startingPrice: "₹2.5/GB",
  },
  {
    id: "block-storage", name: "Block Storage", category: "Storage & Network", icon: Server,
    tagline: "High-IOPS NVMe volumes.",
    description: "Detachable, snapshot-able block volumes for instances and Kubernetes workloads.",
    features: ["Up to 50k IOPS", "Online resize", "Snapshots", "Encrypted at rest"],
    startingPrice: "₹6/GB",
  },
  {
    id: "load-balancer", name: "Load Balancer", category: "Storage & Network", icon: Network,
    tagline: "L4/L7 traffic distribution.",
    description: "Managed L4 and L7 load balancers with health checks, SSL termination and WAF rules.",
    features: ["L4 + L7", "SSL termination", "WAF rules", "Anycast IPs"],
    startingPrice: "₹899/mo",
  },
  {
    id: "private-network", name: "Private Network", category: "Storage & Network", icon: Globe2,
    tagline: "Isolated VPCs across regions.",
    description: "Software-defined private networks to isolate workloads and connect on-prem via IPsec.",
    features: ["Multi-region VPC", "IPsec VPN", "Private DNS", "Free intra-region traffic"],
    startingPrice: "₹0/mo",
  },
  {
    id: "ai-endpoints", name: "AI Endpoints", category: "AI & Data", icon: Cpu,
    tagline: "Hosted inference for popular models.",
    description: "Pay-per-token access to LLMs, embeddings and vision models via a unified API.",
    features: ["LLM + embeddings", "OpenAI-compatible API", "Token-based billing", "Private deployment option"],
    startingPrice: "₹0.50/1k tokens",
  },
  {
    id: "data-pipelines", name: "Data Pipelines", category: "AI & Data", icon: GitBranch,
    tagline: "Move and transform data at scale.",
    description: "Managed ETL/ELT pipelines with connectors for SaaS, databases and object storage.",
    features: ["50+ connectors", "Visual pipeline builder", "Scheduled & CDC", "Audit logs"],
    startingPrice: "₹3,499/mo",
  },
  {
    id: "ci-cd", name: "CI / CD Pipelines", category: "Compute", icon: Code2,
    tagline: "Build, test and ship faster.",
    description: "Hosted CI/CD runners with parallel jobs, caching and one-click deploys to your apps.",
    features: ["Parallel runners", "Build caching", "Secrets vault", "One-click rollback"],
    startingPrice: "₹999/mo",
  },
];
