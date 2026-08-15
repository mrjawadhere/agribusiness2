import { Link } from "@tanstack/react-router";
import { useState } from "react";

const CARD_IMAGES = [
  "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=600&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&q=80&auto=format&fit=crop",
];

interface ProjectItem {
  id: string;
  title: string;
  desc: string;
  price: string;
  type: string;
  image: string;
}

function FeaturedCard({ proj }: { proj: ProjectItem }) {
  const [imgError, setImgError] = useState(false);

  return (
    <article className="bg-white rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group border border-outline-variant/40 flex flex-col text-left">
      <div className="w-full aspect-[16/10] relative overflow-hidden bg-surface-container-low">
        {imgError ? (
          <div className="w-full h-full bg-gradient-to-br from-primary/10 to-surface-container-high flex items-center justify-center">
            <span className="material-symbols-outlined text-[48px] text-primary/30" aria-hidden="true">
              agriculture
            </span>
          </div>
        ) : (
          <img
            src={proj.image}
            alt={proj.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setImgError(true)}
          />
        )}
        <div className="absolute top-4 left-4 px-3 py-1 bg-secondary text-primary font-bold text-[9px] rounded-lg shadow-md uppercase tracking-wider">
          Verified Asset
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <span className="text-[10px] font-bold text-secondary tracking-[0.15em] uppercase mb-2">
          {proj.type}
        </span>
        <h3 className="font-display text-lg font-bold text-primary mb-2 line-clamp-2 group-hover:text-secondary transition-colors tracking-tight leading-snug">
          {proj.title}
        </h3>
        <p className="text-xs text-on-surface-variant mb-6 line-clamp-2 leading-relaxed font-medium">
          {proj.desc}
        </p>

        <div className="mt-auto pt-4 border-t border-outline-variant/30 flex items-end justify-between">
          <div>
            <p className="text-[9px] font-bold text-on-surface-variant/50 mb-0.5 uppercase tracking-widest">
              Project Value
            </p>
            <p className="text-xl font-bold text-primary tracking-tight">{proj.price}</p>
          </div>
          <Link
            to={`/projects/${proj.id}`}
            aria-label={`View details for ${proj.title}`}
            className="w-11 h-11 rounded-xl bg-primary text-white flex items-center justify-center hover:bg-secondary hover:text-primary transition-all shadow-md"
          >
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              arrow_outward
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}

export function FeaturedProjects() {
  const projects: ProjectItem[] = [
    {
      id: "1",
      title: "John Deere 8R Series Heavy Tractor 2024 — Punjab Ready",
      desc: "High-horsepower precision-ag tractor for large-scale farming in Punjab. Includes GPS auto-steer and yield mapping.",
      price: "₨ 4.52 کروڑ",
      type: "Machinery",
      image: CARD_IMAGES[0],
    },
    {
      id: "2",
      title: "Premium Grade A Wheat Seed — Certified (50 Tons)",
      desc: "High-yield certified seed optimised for Faisalabad and Multan belt. Full lab reports and phytosanitary certificate included.",
      price: "₨ 1,20,000",
      type: "Commodity",
      image: CARD_IMAGES[1],
    },
  ];

  return (
    <section
      className="py-12 md:py-16 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto"
      aria-labelledby="featured-projects-heading"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4 text-left">
        <div>
          <span className="text-[11px] font-bold text-secondary tracking-[0.15em] uppercase">
            Marketplace
          </span>
          <h2
            id="featured-projects-heading"
            className="font-display text-2xl md:text-3xl text-primary font-bold tracking-tight mt-1"
          >
            Featured Agri-Opportunities
          </h2>
        </div>
        <Link
          to="/projects"
          className="flex items-center gap-1.5 text-primary font-bold text-xs uppercase tracking-wider hover:text-secondary transition-colors group shrink-0"
        >
          Browse All Projects{" "}
          <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform" aria-hidden="true">
            arrow_forward
          </span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-left">
        {projects.map((proj) => (
          <FeaturedCard key={proj.id} proj={proj} />
        ))}

        {/* CTA card */}
        <div className="bg-gradient-to-br from-primary to-primary-container text-white rounded-3xl shadow-xl p-8 flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -mr-12 -mt-12 group-hover:scale-110 transition-transform duration-700 pointer-events-none" />
          <div>
            <span className="material-symbols-outlined text-[40px] text-secondary mb-4 block relative z-10" aria-hidden="true">
              satellite_alt
            </span>
            <h3 className="font-display text-xl font-bold mb-2 tracking-tight relative z-10 leading-snug">
              Satellite Farm View —{" "}
              <span className="text-secondary-container italic">for Pro users</span>
            </h3>
            <p className="text-xs text-white/80 mb-6 relative z-10 font-medium leading-relaxed max-w-[220px]">
              Access real-time satellite imagery, moisture indices, and crop health mapping.
            </p>
          </div>
          <Link
            to="/onboarding"
            className="bg-secondary text-primary px-6 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-white transition-all relative z-10 shadow-md self-start"
          >
            Unlock Satellite View
          </Link>
          <span className="material-symbols-outlined absolute -bottom-8 -right-8 text-[140px] text-white/5 rotate-12 group-hover:rotate-0 transition-transform duration-700 pointer-events-none">
            hub
          </span>
        </div>
      </div>
    </section>
  );
}
