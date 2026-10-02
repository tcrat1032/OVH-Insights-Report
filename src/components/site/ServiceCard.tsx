import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/data/services";
import SlaLinkedText from "./SlaLinkedText";

const ServiceCard = ({ service, pillarSlug }: { service: Service; pillarSlug: string }) => {
  const Icon = service.icon;
  return (
    <article id={service.slug} className="group rounded-lg border bg-card p-6 shadow-card hover:shadow-elevated hover:border-[hsl(var(--cyan))] transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="h-11 w-11 rounded-md bg-[hsl(var(--deep-blue))]/5 flex items-center justify-center">
          <Icon className="h-6 w-6 text-[hsl(var(--deep-blue))]" />
        </div>
        {service.startingPrice && (
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Starting at</p>
            <p className="text-lg font-bold text-[hsl(var(--deep-blue))]">{service.startingPrice}<span className="text-xs font-normal text-muted-foreground">/mo</span></p>
          </div>
        )}
      </div>
      <h3 className="text-lg font-bold text-foreground mb-2">
        <Link to={`/${pillarSlug}/${service.slug}`} className="hover:text-[hsl(var(--deep-blue))]">{service.name}</Link>
      </h3>
      <p className="text-sm text-muted-foreground mb-4"><SlaLinkedText>{service.longDesc}</SlaLinkedText></p>
      <ul className="space-y-1.5 mb-5">
        {service.features.slice(0, 4).map(f => (
          <li key={f} className="flex items-start gap-2 text-xs text-foreground">
            <span className="mt-1.5 h-1 w-1 rounded-full bg-[hsl(var(--cyan))] shrink-0" />
            <SlaLinkedText>{f}</SlaLinkedText>
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap items-center gap-4">
        <Link
          to={`/${pillarSlug}/${service.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[hsl(var(--deep-blue))] hover:gap-2.5 transition-all"
        >
          Learn more <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          to={`/contact?service=${encodeURIComponent(service.name)}&category=${encodeURIComponent(pillarSlug)}`}
          className="text-sm font-semibold text-muted-foreground hover:text-[hsl(var(--deep-blue))]"
        >
          Request a quote
        </Link>
      </div>
    </article>
  );
};

export default ServiceCard;
