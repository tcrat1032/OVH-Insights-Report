import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const CATALOG = [
  {
    category: "Data Center & Co Location",
    services: [
      "Dedicated Servers",
      "VPS",
      "Application Hosting",
      "Database Hosting",
      "Storage Provisioning",
      "Backup and DR",
      "Connectivity & CDN",
    ],
  },
  {
    category: "Hosting Services",
    services: ["Domain Registration", "Web Hosting", "App Development", "Business Email Accounts"],
  },
  {
    category: "IT Infrastructure",
    services: ["IT Managed Services", "Consulting and Migration", "Hardware Support"],
  },
];

export default defineTool({
  name: "list_services",
  title: "List WularData services",
  description: "List the WularData service catalogue, optionally filtered to one category.",
  inputSchema: {
    category: z
      .enum(["Data Center & Co Location", "Hosting Services", "IT Infrastructure"])
      .optional()
      .describe("Optional category filter."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ category }) => {
    const items = category ? CATALOG.filter((c) => c.category === category) : CATALOG;
    return {
      content: [{ type: "text", text: JSON.stringify(items, null, 2) }],
      structuredContent: { categories: items },
    };
  },
});
