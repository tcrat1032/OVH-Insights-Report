import { Fragment } from "react";
import { Link } from "react-router-dom";

const SLA_REFERENCE = /(99\.9% uptime SLA|uptime SLA|uptime guarantee)/gi;
const isSlaReference = (value: string) => /^(99\.9% uptime SLA|uptime SLA|uptime guarantee)$/i.test(value);

const SlaLinkedText = ({ children }: { children: string }) => (
  <>
    {children.split(SLA_REFERENCE).map((part, index) =>
      isSlaReference(part) ? (
        <Link key={`${part}-${index}`} to="/legal/sla" className="underline underline-offset-2 hover:text-[hsl(var(--cyan))]">
          {part}
        </Link>
      ) : (
        <Fragment key={`${part}-${index}`}>{part}</Fragment>
      ),
    )}
  </>
);

export default SlaLinkedText;