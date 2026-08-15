import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "@/lib/i18n";
import { motion } from "framer-motion";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=900&q=80&auto=format&fit=crop";

export function Hero() {
  const [imgError, setImgError] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { t, isRTL } = useTranslation();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate({ to: "/search", search: { q: searchQuery } });
    } else {
      navigate({ to: "/search" });
    }
  };

  const quickTags = ["Wheat", "Basmati Rice", "Cotton", "Solar Tubewells", "Fertilizers", "Soil Expert"];

  return (
    <section className="relative pt-20 md:pt-24 pb-10 md:pb-14 overflow-hidden bg-background">
      {/* Ambient background glows */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-primary/8 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-20 right-10 w-80 h-80 bg-secondary/8 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">

          {/* Left Text Column (7 cols on lg) - 10% Zoom / Richer Detail */}
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="lg:col-span-7 text-left space-y-4"
          >
            {/* Live badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-primary/20 shadow-xs">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-light opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
              </span>
              <span className="text-xs font-bold text-primary uppercase tracking-wider">
                {t("hero_badge")}
              </span>
              <span className="text-on-surface-variant/40 text-xs">|</span>
              <span className="text-xs font-semibold text-secondary">50,000+ Active Members</span>
            </div>

            {/* Main Headline (Enlarged / 10% Zoom feel) */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-5xl lg:text-[58px] font-bold text-primary tracking-tight leading-[1.08]">
              {t("hero_headline_1")}{" "}
              <span className="text-secondary bg-clip-text">
                {t("hero_headline_2")}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base md:text-lg text-on-surface-variant leading-relaxed max-w-xl font-medium">
              {t("hero_sub")}
            </p>

            {/* Interactive Hero Search Form */}
            <form onSubmit={handleSearch} className="max-w-xl pt-1.5">
              <div className="relative flex items-center bg-white p-2 rounded-2xl border border-outline-variant/60 shadow-md focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10 transition-all">
                <span className="material-symbols-outlined text-primary/70 pl-3 pr-2 text-[24px]" aria-hidden="true">
                  search
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search commodities, tractors, soil consultants, fertilizers..."
                  className="w-full bg-transparent text-sm sm:text-base text-primary font-medium placeholder:text-on-surface-variant/50 focus:outline-none py-2"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-primary text-on-primary rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-primary-container transition-all shrink-0 shadow-sm"
                >
                  Search
                </button>
              </div>

              {/* Quick trend tags */}
              <div className="flex flex-wrap items-center gap-2 pt-3">
                <span className="text-[11px] font-bold text-on-surface-variant/60 uppercase tracking-wider mr-1">Popular:</span>
                {quickTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => navigate({ to: "/search", search: { q: tag } })}
                    className="px-3 py-1 rounded-lg bg-surface-container-low text-xs font-semibold text-primary hover:bg-primary hover:text-white transition-colors border border-outline-variant/40"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </form>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-3.5 pt-4 border-t border-outline-variant/40 max-w-xl">
              <div className="bg-white p-3 rounded-2xl border border-outline-variant/30 text-left shadow-xs">
                <div className="font-display text-xl sm:text-2xl font-bold text-primary">50k+</div>
                <div className="text-[11px] font-bold text-on-surface-variant/70 uppercase tracking-wider mt-0.5">{t("hero_stat_farmers")}</div>
              </div>
              <div className="bg-white p-3 rounded-2xl border border-outline-variant/30 text-left shadow-xs">
                <div className="font-display text-xl sm:text-2xl font-bold text-primary">2,400+</div>
                <div className="text-[11px] font-bold text-on-surface-variant/70 uppercase tracking-wider mt-0.5">{t("hero_stat_consultants")}</div>
              </div>
              <div className="bg-white p-3 rounded-2xl border border-outline-variant/30 text-left shadow-xs">
                <div className="font-display text-xl sm:text-2xl font-bold text-secondary">₨ 5.2B</div>
                <div className="text-[11px] font-bold text-on-surface-variant/70 uppercase tracking-wider mt-0.5">{t("hero_stat_volume")}</div>
              </div>
            </div>
          </motion.div>

          {/* Right Media Column (5 cols on lg) - Proportional & Clean Without Popups */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-5 relative max-w-lg mx-auto lg:max-w-none w-full"
          >
            {/* Visual Frame */}
            <div className="relative rounded-3xl overflow-hidden shadow-xl border-2 border-white bg-white group">
              <div className="relative aspect-[16/11] overflow-hidden bg-surface-container-low">
                {imgError ? (
                  <div className="w-full h-full bg-gradient-to-br from-primary to-primary-container flex items-center justify-center">
                    <span className="material-symbols-outlined text-[72px] text-white/20">agriculture</span>
                  </div>
                ) : (
                  <img
                    src={HERO_IMAGE}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    alt="Farmer in agricultural field in Punjab, Pakistan"
                    loading="eager"
                    onError={() => setImgError(true)}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-black/10" />

                {/* Tag on Image */}
                <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between text-white">
                  <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20">
                    <span className="material-symbols-outlined text-secondary text-[18px]">location_on</span>
                    <span className="text-xs font-bold">Punjab Agri Corridor</span>
                  </div>
                  <span className="text-[11px] font-bold bg-secondary text-primary px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-sm">
                    Verified Trade
                  </span>
                </div>
              </div>

              {/* Bottom Quick Card Strip */}
              <div className="p-3.5 bg-white grid grid-cols-2 gap-2.5 text-left border-t border-outline-variant/30">
                <Link to="/apps/agri-biz" className="flex items-center gap-2.5 p-2.5 rounded-xl bg-surface-container-low hover:bg-primary/5 transition-colors border border-outline-variant/30">
                  <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[18px]">storefront</span>
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-xs font-bold text-primary truncate">B2B Exchange</div>
                    <div className="text-[10px] text-on-surface-variant/70">1,240+ Lots</div>
                  </div>
                </Link>

                <Link to="/apps/plant-clinic" className="flex items-center gap-2.5 p-2.5 rounded-xl bg-surface-container-low hover:bg-secondary/10 transition-colors border border-outline-variant/30">
                  <div className="w-8 h-8 rounded-lg bg-secondary text-primary flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[18px]">eco</span>
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-xs font-bold text-primary truncate">Plant Clinic</div>
                    <div className="text-[10px] text-on-surface-variant/70">AI Diagnostic</div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Floating Live Badge Top Right */}
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-3 -right-3 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl border border-outline-variant/50 shadow-lg flex items-center gap-2.5 text-left"
            >
              <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <span className="material-symbols-outlined text-[16px]">trending_up</span>
              </div>
              <div>
                <div className="text-[9px] font-bold text-on-surface-variant/60 uppercase tracking-wider">Wheat / Multan</div>
                <div className="text-xs font-black text-primary">₨ 4,200 <span className="text-emerald-600 text-[10px] font-bold">+2.4%</span></div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}