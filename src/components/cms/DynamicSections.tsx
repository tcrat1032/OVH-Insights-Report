import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { CmsSection } from "@/lib/cms";
import { getMediaUrl } from "@/lib/cms";

const CmsImage = ({ path, alt }: { path: string; alt: string }) => {
  const [url, setUrl] = useState("");
  useEffect(() => { getMediaUrl(path).then(setUrl); }, [path]);
  if (!url) return <div className="aspect-video animate-pulse rounded-md bg-muted" />;
  return <img src={url} alt={alt} className="max-h-[620px] w-full rounded-md object-cover" />;
};

const DynamicSections = ({ sections }: { sections: CmsSection[] }) => (
  <>
    {sections.map((section, index) => {
      if (section.type === "hero") return (
        <section key={section.id} className="bg-gradient-hero text-primary-foreground">
          <div className="container-wd py-16 md:py-24">
            {index === 0 ? <h1 className="max-w-4xl text-4xl font-extrabold md:text-5xl">{section.heading}</h1> : <h2 className="max-w-4xl text-4xl font-extrabold">{section.heading}</h2>}
            {section.body && <p className="mt-4 max-w-3xl whitespace-pre-line text-primary-foreground/85">{section.body}</p>}
          </div>
        </section>
      );
      if (section.type === "image" && section.imagePath) return (
        <section key={section.id} className="section"><div className="container-wd"><CmsImage path={section.imagePath} alt={section.imageAlt || section.heading || ""} /></div></section>
      );
      if (section.type === "cta") return (
        <section key={section.id} className="bg-gradient-hero text-primary-foreground">
          <div className="container-wd py-14 text-center">
            <h2 className="text-3xl font-extrabold">{section.heading}</h2>
            {section.body && <p className="mx-auto mt-3 max-w-2xl whitespace-pre-line text-primary-foreground/80">{section.body}</p>}
            {section.buttonLabel && section.buttonUrl && <Link to={section.buttonUrl} className="btn-cta mt-6">{section.buttonLabel}</Link>}
          </div>
        </section>
      );
      return (
        <section key={section.id} className="section">
          <div className="container-wd max-w-4xl">
            {index === 0 ? <h1 className="text-4xl font-extrabold">{section.heading}</h1> : <h2 className="text-3xl font-bold">{section.heading}</h2>}
            {section.body && <p className="mt-4 whitespace-pre-line leading-relaxed text-muted-foreground">{section.body}</p>}
          </div>
        </section>
      );
    })}
  </>
);

export default DynamicSections;