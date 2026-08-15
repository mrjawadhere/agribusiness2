import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";

export function EcosystemApps() {
  const ecosystemApps = [
    {
      id: "plant-clinic",
      title: "Plant Clinic",
      badge: "AI Diagnostic",
      icon: "psychiatry",
      color: "from-emerald-700 to-emerald-900",
      accent: "bg-emerald-500",
      description: "Upload leaf or pest photos for instant AI disease diagnosis and verified agronomist treatment prescriptions.",
      stats: "1,420+ Cases Solved",
      link: "/apps/plant-clinic",
      action: "Launch Clinic"
    },
    {
      id: "animal-clinic",
      title: "Animal & Vet Clinic",
      badge: "24/7 Care",
      icon: "pets",
      color: "from-amber-600 to-amber-800",
      accent: "bg-amber-500",
      description: "Direct telehealth consultations for dairy cattle, buffaloes, and poultry with certified Pakistani veterinarians.",
      stats: "850+ Verified Vets",
      link: "/apps/animal-clinic",
      action: "Consult Vet"
    },
    {
      id: "agri-biz",
      title: "Agri-Biz Trading Floor",
      badge: "B2B Exchange",
      icon: "storefront",
      color: "from-blue-700 to-blue-900",
      accent: "bg-blue-500",
      description: "Trade bulk grains, combine harvesters, solar tubewells, and certified fertilizers with verified sellers.",
      stats: "₨ 5.2B Volume Traded",
      link: "/apps/agri-biz",
      action: "Enter Market"
    },
    {
      id: "academy",
      title: "Agri-Tech Academy",
      badge: "Certification",
      icon: "school",
      color: "from-purple-700 to-purple-900",
      accent: "bg-purple-500",
      description: "High-yield farm management, precision irrigation, and greenhouse masterclasses taught by Agri University faculty.",
      stats: "4,200+ Learners",
      link: "/apps/education",
      action: "Explore Courses"
    },
    {
      id: "projects",
      title: "Projects & RFP Board",
      badge: "Verified Bidding",
      icon: "engineering",
      color: "from-teal-700 to-teal-900",
      accent: "bg-teal-500",
      description: "Post agricultural engineering requirements, hire drip irrigation consultants, or rent heavy harvesting machinery.",
      stats: "₨ 150k Max Escrow",
      link: "/projects",
      action: "Browse RFPs"
    },
    {
      id: "directory",
      title: "Expert Network Search",
      badge: "24 Disciplines",
      icon: "groups",
      color: "from-emerald-800 to-teal-950",
      accent: "bg-secondary",
      description: "Find and contact verified agricultural engineers, consultants, and companies across 24 official industry sectors.",
      stats: "50k+ Members",
      link: "/search",
      action: "Search Network"
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-white border-y border-outline-variant/30 relative overflow-hidden text-left">
      <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div className="max-w-xl">
            <span className="text-[11px] font-bold text-secondary uppercase tracking-[0.15em] mb-1 block">
              Integrated Agri-Tech Suite
            </span>
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-primary tracking-tight">
              Our Ecosystem <span className="text-secondary">Apps & Services</span>
            </h2>
            <p className="text-xs sm:text-sm text-on-surface-variant font-medium mt-1 leading-relaxed">
              Tailored digital tools engineered specifically for Pakistani growers, agronomists, millers, and agribusiness enterprises.
            </p>
          </div>
          
          <Link
            to="/onboarding"
            className="px-5 py-2.5 bg-surface-container-low border border-outline-variant/50 text-primary rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-primary hover:text-white transition-all shadow-xs self-start md:self-auto flex items-center gap-1.5"
          >
            <span>Get Free Access</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
        </div>

        {/* 6 Apps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {ecosystemApps.map((app, i) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.06 * i, duration: 0.4 }}
              className="group bg-surface-container-low/40 rounded-3xl p-6 border border-outline-variant/40 hover:border-primary/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Top Row */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="w-11 h-11 rounded-2xl bg-primary text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-[24px] text-secondary">
                      {app.icon}
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-md bg-secondary/15 text-primary text-[9px] font-bold uppercase tracking-wider border border-secondary/30">
                    {app.badge}
                  </span>
                </div>

                <h3 className="font-display text-lg font-bold text-primary mb-1.5 group-hover:text-secondary transition-colors tracking-tight">
                  {app.title}
                </h3>

                <p className="text-xs text-on-surface-variant leading-relaxed font-medium mb-4">
                  {app.description}
                </p>
              </div>

              {/* Bottom Footer */}
              <div className="pt-3 border-t border-outline-variant/30 flex items-center justify-between">
                <span className="text-[10px] font-bold text-primary/80 flex items-center gap-1">
                  <span className="material-symbols-outlined text-secondary text-[14px]">verified</span>
                  {app.stats}
                </span>

                <Link
                  to={app.link}
                  className="inline-flex items-center gap-1 text-xs font-bold text-primary group-hover:text-secondary transition-colors"
                >
                  <span>{app.action}</span>
                  <span className="material-symbols-outlined text-[15px] group-hover:translate-x-0.5 transition-transform">
                    arrow_forward
                  </span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
