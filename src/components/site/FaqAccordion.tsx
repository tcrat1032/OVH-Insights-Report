import { useId, useState } from "react";

export type FaqItem = { q: string; a: string };

/**
 * Accessible FAQ accordion. Every answer is always mounted in the DOM
 * (search-engine friendly); collapsed state is controlled purely by CSS
 * grid-rows/opacity, never by conditional rendering.
 */
export default function FaqAccordion({ faqs }: { faqs: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const baseId = useId();

  return (
    <div className="space-y-3">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        const btnId = `${baseId}-trigger-${i}`;
        const panelId = `${baseId}-panel-${i}`;
        return (
          <div key={f.q} className="rounded-lg border bg-card p-5 shadow-card">
            <button
              type="button"
              id={btnId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full cursor-pointer items-center justify-between text-left font-semibold text-[hsl(var(--deep-blue))]"
            >
              {f.q}
              <span className={`ml-4 text-[hsl(var(--cyan))] transition-transform text-xl leading-none ${isOpen ? "rotate-45" : ""}`}>+</span>
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
            >
              <div className="overflow-hidden">
                <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
