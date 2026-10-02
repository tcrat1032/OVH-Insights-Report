import type { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ChevronRight, Printer } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import PublicLayout from "@/components/site/PublicLayout";
import { Button } from "@/components/ui/button";
import NotFound from "@/pages/NotFound";
import { useSeo } from "@/lib/seo";
import legalCenter from "@/content/legal/index.md?raw";
import customerAgreement from "@/content/legal/customer-agreement.md?raw";
import serviceTerms from "@/content/legal/service-terms.md?raw";
import sla from "@/content/legal/sla.md?raw";
import acceptableUse from "@/content/legal/acceptable-use.md?raw";
import privacy from "@/content/legal/privacy.md?raw";
import cookies from "@/content/legal/cookies.md?raw";
import refundPolicy from "@/content/legal/refund-policy.md?raw";
import websiteTerms from "@/content/legal/website-terms.md?raw";

type LegalDocument = {
  label: string;
  title: string;
  markdown: string;
};

const LEGAL_DOCUMENTS: Record<string, LegalDocument> = {
  "": { label: "Legal Center", title: "Legal | WularData", markdown: legalCenter },
  "customer-agreement": { label: "Customer Agreement", title: "Customer Agreement | WularData", markdown: customerAgreement },
  "service-terms": { label: "Service Terms", title: "Service Terms | WularData", markdown: serviceTerms },
  sla: { label: "Service Level Agreement", title: "Service Level Agreement (SLA) | WularData", markdown: sla },
  "acceptable-use": { label: "Acceptable Use Policy", title: "Acceptable Use Policy | WularData", markdown: acceptableUse },
  privacy: { label: "Privacy Policy", title: "Privacy Policy | WularData", markdown: privacy },
  cookies: { label: "Cookie Policy", title: "Cookie Policy | WularData", markdown: cookies },
  "refund-policy": { label: "Refund & Cancellation Policy", title: "Refund & Cancellation Policy | WularData", markdown: refundPolicy },
  "website-terms": { label: "Website Terms of Use", title: "Website Terms of Use | WularData", markdown: websiteTerms },
};

const LEGAL_CENTER_DESCRIPTION =
  "Customer Agreement, Service Terms, SLA, Privacy Policy, Acceptable Use, Cookie and Refund policies for WularData cloud, colocation and server services.";

function documentPath(slug: string) {
  return slug ? `/legal/${slug}` : "/legal";
}

function getDescription(markdown: string) {
  const blocks = markdown.split(/\n\s*\n/).map((block) => block.trim());
  const updatedIndex = blocks.findIndex((block) => block.startsWith("Last updated:"));
  const paragraph = blocks.slice(updatedIndex + 1).find((block) => block && !block.startsWith("#")) ?? "";
  if (paragraph.length <= 155) return paragraph;
  const shortened = paragraph.slice(0, 155);
  const lastSpace = shortened.lastIndexOf(" ");
  return `${shortened.slice(0, lastSpace > 120 ? lastSpace : 155).trimEnd()}…`;
}

function nodeText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(nodeText).join("");
  if (node && typeof node === "object" && "props" in node) {
    const element = node as { props?: { children?: ReactNode } };
    return nodeText(element.props?.children);
  }
  return "";
}

function slugify(value: ReactNode) {
  return nodeText(value)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

const LegalDocumentView = ({ slug, document }: { slug: string; document: LegalDocument }) => {
  const navigate = useNavigate();
  const path = documentPath(slug);
  const description = slug === "" ? LEGAL_CENTER_DESCRIPTION : getDescription(document.markdown);

  useSeo({ title: document.title, description, path });

  return (
    <PublicLayout>
      <div className="legal-page bg-background">
        <div className="container-wd py-5 md:py-7">
          <nav aria-label="Breadcrumb" className="legal-breadcrumb flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary">Home</Link>
            <ChevronRight aria-hidden="true" className="h-4 w-4" />
            {slug ? (
              <>
                <Link to="/legal" className="hover:text-primary">Legal</Link>
                <ChevronRight aria-hidden="true" className="h-4 w-4" />
                <span aria-current="page" className="text-foreground">{document.label}</span>
              </>
            ) : (
              <span aria-current="page" className="text-foreground">Legal</span>
            )}
          </nav>
        </div>

        <div className="border-y bg-secondary/50">
          <div className="container-wd py-4 lg:hidden legal-mobile-nav">
            <label htmlFor="legal-document" className="mb-2 block text-sm font-semibold text-foreground">
              Legal document
            </label>
            <select
              id="legal-document"
              value={slug}
              onChange={(event) => navigate(documentPath(event.target.value))}
              className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {Object.entries(LEGAL_DOCUMENTS).map(([documentSlug, item]) => (
                <option key={documentSlug || "legal"} value={documentSlug}>{item.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="container-wd grid min-w-0 gap-10 py-10 lg:grid-cols-[240px_minmax(0,760px)] lg:justify-center lg:gap-16 lg:py-14">
          <aside className="legal-sidebar hidden lg:block" aria-label="Legal documents">
            <nav className="sticky top-32 border-l">
              {Object.entries(LEGAL_DOCUMENTS).map(([documentSlug, item]) => {
                const active = documentSlug === slug;
                return (
                  <Link
                    key={documentSlug || "legal"}
                    to={documentPath(documentSlug)}
                    aria-current={active ? "page" : undefined}
                    className={`block border-l-2 px-4 py-2.5 text-sm transition-colors ${
                      active
                        ? "-ml-px border-primary bg-secondary font-semibold text-primary"
                        : "border-transparent text-muted-foreground hover:bg-secondary hover:text-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </aside>

          <article className="legal-document min-w-0 max-w-[760px]">
            <div className="legal-print-control mb-5 flex justify-end">
              <Button type="button" variant="outline" size="sm" onClick={() => window.print()}>
                <Printer aria-hidden="true" />
                Print
              </Button>
            </div>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ children }) => <h1>{children}</h1>,
                h2: ({ children }) => <h2 id={slugify(children)}>{children}</h2>,
                h3: ({ children }) => <h3>{children}</h3>,
                p: ({ children }) => {
                  const text = nodeText(children);
                  return <p className={text.startsWith("Last updated:") ? "legal-last-updated" : undefined}>{children}</p>;
                },
                a: ({ href = "", children, ...props }) =>
                  href.startsWith("/") ? (
                    <Link to={href}>{children}</Link>
                  ) : (
                    <a href={href} {...props}>{children}</a>
                  ),
                table: ({ children }) => (
                  <div className="legal-table-wrap" role="region" aria-label="Scrollable table" tabIndex={0}>
                    <table>{children}</table>
                  </div>
                ),
              }}
            >
              {document.markdown}
            </ReactMarkdown>
          </article>
        </div>
      </div>
    </PublicLayout>
  );
};

const LegalPage = () => {
  const { slug = "" } = useParams<{ slug?: string }>();
  const document = LEGAL_DOCUMENTS[slug];

  if (!document) return <NotFound />;
  return <LegalDocumentView slug={slug} document={document} />;
};

export default LegalPage;
