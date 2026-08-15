import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CategoryTree } from "@/components/shared/CategoryTree";
import { ProfileCard, UserType } from "@/components/shared/ProfileCard";
import { createFileRoute, useParams } from '@tanstack/react-router';
import { cn } from "@/lib/utils";

const SUB_CATEGORIES = [
  {
    id: "grains",
    label: "Grains & Pulses",
    count: 1240,
    children: [
      { id: "wheat", label: "Wheat", count: 850 },
      { id: "rice", label: "Rice", count: 320 },
      { id: "maize", label: "Maize", count: 70 }
    ]
  },
  {
    id: "vegetables",
    label: "Vegetables",
    count: 850,
    children: [
      { id: "tomato", label: "Tomato", count: 210 },
      { id: "potato", label: "Potato", count: 430 }
    ]
  },
  {
    id: "fruits",
    label: "Fruits & Orchards",
    count: 2100,
    children: [
      { id: "citrus", label: "Citrus", count: 900 },
      { id: "mango", label: "Mango", count: 1200 }
    ]
  }
];

const MOCK_LISTINGS = [
  {
    id: "1",
    type: "farmer" as UserType,
    name: "Punjab Wheat Estates",
    title: "High-Quality Winter Wheat",
    location: "Multan, Punjab",
    rating: 4.8,
    keywords: ["Wheat", "Bulk Sale", "Organic"],
    isVerified: true
  },
  {
    id: "2",
    type: "company" as UserType,
    name: "AgriSeeds Corp",
    title: "Premium Wheat Seeds 2026",
    location: "Lahore, Punjab",
    rating: 4.9,
    keywords: ["Seeds", "Wheat", "High Yield"],
    isVerified: true
  }
];

const CategoryDetailPage = () => {
  const { slug } = useParams({ from: '/categories/$slug' });
  const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1).replace('-', ' ');

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-14 text-left">
        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          
          <div className="flex flex-col md:flex-row items-start justify-between gap-4 mb-8 animate-in fade-in slide-in-from-left-6 duration-500">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-primary text-white rounded-lg flex items-center justify-center shadow-sm">
                  <span className="material-symbols-outlined text-[20px]">agriculture</span>
                </div>
                <span className="text-[10px] font-bold text-primary uppercase tracking-wider px-2.5 py-0.5 bg-primary/10 rounded-md border border-primary/20">
                  Sector Directory
                </span>
              </div>
              <h1 className="font-display text-3xl font-bold text-primary tracking-tight mb-2">
                {categoryName} <span className="text-secondary">Hub</span>
              </h1>
              <p className="text-xs text-on-surface-variant max-w-xl leading-relaxed font-medium">
                Verified professional network, trade listings, and technical resources within Pakistan's {categoryName} sector.
              </p>
            </div>
            <button className="px-6 py-2.5 bg-primary text-on-primary rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-primary-container transition-all shadow-md flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px]">add_circle</span>
              Join Sector
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Sidebar Navigation - Fixed Sticky containment */}
            <aside className="w-full lg:w-72 space-y-5 lg:sticky lg:top-20 self-start shrink-0">
              <div className="bg-white p-5 rounded-2xl border border-outline-variant/40 shadow-sm">
                <h3 className="text-[10px] font-bold text-primary uppercase tracking-wider mb-4 pb-2.5 border-b border-outline-variant/30 flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-[16px]">account_tree</span>
                  Sub-Sectors
                </h3>
                <CategoryTree data={SUB_CATEGORIES} />
                
                <div className="mt-6 pt-4 border-t border-outline-variant/30">
                  <h4 className="text-[10px] font-bold text-on-surface-variant/70 uppercase tracking-wider mb-3">Quick Filters</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="text-[9px] font-bold uppercase tracking-wider text-on-surface-variant/60 mb-1.5 block">Region</label>
                      <select className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl px-3 py-2 text-xs font-medium text-primary focus:outline-none">
                        <option>All Punjab</option>
                        <option>Sindh Focus</option>
                        <option>KPK Region</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[9px] font-bold uppercase tracking-wider text-on-surface-variant/60 mb-2 block">Membership</label>
                      <div className="space-y-2">
                        {["Verified Farms", "Consultants", "Tech Companies"].map(t => (
                          <label key={t} className="flex items-center gap-2 text-xs font-medium text-on-surface cursor-pointer group hover:text-primary transition-colors">
                            <input type="checkbox" className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary/20 accent-primary" /> {t}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* List View */}
            <div className="flex-1 space-y-5 w-full">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="relative flex-1 w-full max-w-md">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50 text-[18px]">search</span>
                  <input 
                    placeholder={`Filter within ${categoryName}...`}
                    className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-outline-variant/40 bg-white text-xs font-medium focus:outline-none focus:border-primary transition-all shadow-sm"
                  />
                </div>
                
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <select className="bg-transparent border-none outline-none text-xs font-bold text-primary uppercase tracking-wider cursor-pointer">
                    <option>Most Recent</option>
                    <option>Top Rated</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                {MOCK_LISTINGS.map((res) => (
                  <ProfileCard key={res.id} {...res} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export const Route = createFileRoute('/categories/$slug')({
  head: () => ({
    title: "Sector Hub | Agri Intelligence | AgriBusiness",
    meta: [
      { name: "description", content: "Explore specialized agricultural sectors, commodities, and professional networks." },
      { property: "og:title", content: "AgriBusiness Sector Hub" },
      { property: "og:description", content: "Specialized directory and marketplace for agri-sectors." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CategoryDetailPage,
});