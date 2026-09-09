import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "create_quote_request",
  title: "Create a quote request",
  description: "Create a new WularData quote request for the signed-in user.",
  inputSchema: {
    service_category: z
      .enum(["Data Center & Co Location", "Domain & Web Management", "IT Support & Consulting"])
      .describe("Top-level service category."),
    service_name: z.string().trim().min(2).max(150).describe("Service the quote is for, e.g. 'VPS'."),
    contact_name: z.string().trim().min(2).max(100).describe("Contact person's name."),
    email: z.string().trim().email().max(255).describe("Contact email address."),
    company: z.string().trim().max(150).optional().describe("Company name."),
    phone: z.string().trim().max(30).optional().describe("Contact phone number."),
    message: z.string().trim().max(2000).optional().describe("Requirements and details."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, openWorldHint: false },
  handler: async (input, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const supabase = supabaseForUser(ctx);
    const { data, error } = await supabase
      .from("quote_requests")
      .insert({ ...input, user_id: ctx.getUserId() })
      .select("id, service_category, service_name, status, created_at");
    return error
      ? { content: [{ type: "text", text: error.message }], isError: true }
      : {
          content: [{ type: "text", text: JSON.stringify(data?.[0] ?? {}, null, 2) }],
          structuredContent: { quote: data?.[0] },
        };
  },
});
