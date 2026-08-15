import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function AppHub() {
  const [activeTab, setActiveTab] = useState<"biz" | "animal" | "plant">("biz");

  const apps = {
    biz: {
      id: "biz",
      name: "Agri Biz",
      badge: "Free Classifieds & Trade",
      icon: "storefront",
      color: "emerald",
      tagline: "Free classified app that connects people to sell and buy second-hand goods & agricultural commodities.",
      stats: "50k+ Active Lots",
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&q=80&auto=format&fit=crop",
      features: [
        "Fill a simple form and post to sale goods across Pakistan.",
        "Attach images that represent your product and attract more verified buyers.",
        "Chat feature provides a fast way to communicate with parties and be updated.",
        "Location feature allows to locate positions accurately on the map."
      ],
      link: "/apps/agri-biz",
      cta: "Launch Agri Biz"
    },
    animal: {
      id: "animal",
      name: "Animal Clinic",
      badge: "Partner University Advisory",
      icon: "pets",
      color: "amber",
      tagline: "Facilitating livestock and dairy farmers to get certified clinical advice and peer support.",
      stats: "850+ Verified Vets",
      image: "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?w=800&q=80&auto=format&fit=crop",
      features: [
        "Post animal problems with diseases & symptoms in audio, video, and image formats.",
        "Get expert advice from Partner University's Animals Department.",
        "Connect with experienced farmers using text comments and voice messages.",
        "Publishing problems with images helps experts easily understand the condition."
      ],
      link: "/apps/animal-clinic",
      cta: "Open Animal Clinic"
    },
    plant: {
      id: "plant",
      name: "Plant Clinic",
      badge: "AI Plant & Crop Doctor",
      icon: "psychiatry",
      color: "emerald",
      tagline: "Dedicated help regarding plants, fruits, flowers, seeds, vegetables, and field crops.",
      stats: "1,420+ Cases Solved",
      image: "https://images.unsplash.com/photo-1592982537447-6f296d9ccbd3?w=800&q=80&auto=format&fit=crop",
      features: [
        "Provides specialized help regarding plants, fruits, flowers, and seeds.",
        "Farmers find it easy to describe their problem and get fast response from experts.",
        "Collaborate with other farmers via text comments and voice messages.",
        "Publishing problems with images helps experts accurately diagnose the condition."
      ],
      link: "/apps/plant-clinic",
      cta: "Open Plant Clinic"
    }
  };

  const current = apps[activeTab];

  return (
    <section className="bg-surface-container-low/30 py-12 md:py-16 border-y border-outline-variant/30 relative overflow-hidden">
      <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto mb-8 text-center">
          <span className="text-[11px] font-bold text-secondary uppercase tracking-[0.15em] mb-1 block">Our Apps</span>
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-primary tracking-tight">
            Specialized Digital Tools for Agriculture
          </h2>
          <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed mt-1 font-medium">
            From classified trading to expert clinical diagnoses with Partner University faculty.
          </p>
        </div>

        {/* Interactive App Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {(Object.keys(apps) as Array<keyof typeof apps>).map((key) => {
            const app = apps[key];
            const isActive = activeTab === key;
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-primary text-white shadow-md shadow-primary/20 scale-102"
                    : "bg-white text-on-surface-variant hover:bg-surface-container hover:text-primary border border-outline-variant/40"
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {app.icon}
                </span>
                <span>{app.name}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic App Showcase Card */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-outline-variant/40 shadow-sm max-w-5xl mx-auto text-left">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Left Column: Details & Feature points */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-secondary text-primary font-bold text-[9px] uppercase tracking-wider rounded-md">
                    {current.badge}
                  </span>
                  <span className="text-xs font-bold text-primary flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-secondary">verified</span>
                    {current.stats}
                  </span>
                </div>

                <h3 className="font-display text-2xl md:text-3xl font-bold text-primary tracking-tight">
                  {current.name}
                </h3>

                <p className="text-xs sm:text-sm text-on-surface-variant font-medium leading-relaxed">
                  {current.tagline}
                </p>

                {/* Key features */}
                <ul className="space-y-2 pt-2">
                  {current.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs font-medium text-primary">
                      <span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">
                        check_circle
                      </span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA buttons */}
                <div className="pt-4 flex flex-wrap items-center gap-3">
                  <Link
                    to={current.link}
                    className="px-6 py-3 bg-primary text-on-primary rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-primary-container transition-all flex items-center gap-2 shadow-md cursor-pointer"
                  >
                    <span>{current.cta}</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </Link>
                  <Link
                    to="/apps"
                    className="px-5 py-3 border border-outline-variant/60 bg-surface-container-low text-primary rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-white transition-all shadow-xs cursor-pointer"
                  >
                    View All Apps Suite
                  </Link>
                </div>
              </div>

              {/* Right Column: Sleek Media Card */}
              <div className="lg:col-span-5 relative w-full">
                <div className="relative rounded-2xl overflow-hidden shadow-lg border border-outline-variant/30 bg-surface-container-low group">
                  <div className="relative aspect-[16/11] overflow-hidden">
                    <img
                      src={current.image}
                      alt={current.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <div className="text-xs font-bold">{current.name}</div>
                      <div className="text-[10px] text-white/80">{current.stats}</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
