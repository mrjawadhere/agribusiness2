import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProfileCard, UserType } from "@/components/shared/ProfileCard";
import { KeywordPicker } from "@/components/shared/KeywordPicker";
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { SkeletonProfileCard } from "@/components/shared/Skeleton";
import { EmptyState } from "@/components/shared/EmptyState";
import { useTranslation } from "@/lib/i18n";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute('/search')({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      q: (search.q as string) || "",
    }
  },
  head: () => ({
    title: "Network Search | AgriBusiness Pakistan",
    meta: [
      { name: "description", content: "Search and connect with verified agricultural professionals, students, and companies." },
      { property: "og:title", content: "AgriBusiness Expert Network" },
    ],
  }),
  component: SearchPage,
})

const DEFAULT_RESULTS = [
  {
    id: "20000000-0000-0000-0000-000000000001",
    type: "consultant" as UserType,
    name: "Dr. Arshad Khan",
    title: "Senior Agronomist & Soil Expert",
    location: "Faisalabad, Punjab",
    rating: 4.9,
    keywords: ["Soil Health", "Fertilizers", "Wheat", "Crop Rotation"],
    isVerified: true,
    phone: "+923001234567",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80&auto=format&fit=crop"
  },
  {
    id: "20000000-0000-0000-0000-000000000002",
    type: "company" as UserType,
    name: "AgriTech Solutions Ltd",
    title: "Agri-Input & Tech Provider",
    location: "Karachi, Sindh",
    rating: 4.8,
    keywords: ["Seeds", "Pesticides", "Digital Farming"],
    isVerified: true,
    phone: "+923331234567"
  },
  {
    id: "20000000-0000-0000-0000-000000000003",
    type: "farmer" as UserType,
    name: "Malik Bilal Hayat",
    title: "Progressive Citrus & Wheat Farmer",
    location: "Sargodha, Punjab",
    rating: 4.7,
    keywords: ["Citrus", "Export Quality", "Organic", "Wheat"],
    isVerified: true,
    phone: "+923451234567"
  },
  {
    id: "20000000-0000-0000-0000-000000000004",
    type: "consultant" as UserType,
    name: "Dr. Faizan Tariq (DVM)",
    title: "Veterinary Specialist for Dairy Cattle",
    location: "Sahiwal, Punjab",
    rating: 5.0,
    keywords: ["Livestock", "Dairy Cattle", "Vaccination", "Buffalo Care"],
    isVerified: true,
    phone: "+923121234567"
  },
  {
    id: "20000000-0000-0000-0000-000000000005",
    type: "student" as UserType,
    name: "Engr. Zainab Ali",
    title: "Graduate Agri Engineer (CAD & Irrigation)",
    location: "Lahore, Punjab",
    rating: 4.8,
    keywords: ["Irrigation Systems", "Solar Tubewells", "CAD"],
    isVerified: false,
    phone: "+923211234567"
  }
];

function SearchPage() {
  const { q } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const [searchQuery, setSearchQuery] = useState(q);
  const [profiles, setProfiles] = useState(DEFAULT_RESULTS);
  const [isLoading, setIsLoading] = useState(true);
  const { t, isRTL } = useTranslation();

  // Load profiles from live Supabase DB
  useEffect(() => {
    async function fetchProfiles() {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .order("rating", { ascending: false });

        if (!error && data && data.length > 0) {
          const mapped = data.map((p: any) => ({
            id: p.id,
            type: (p.user_type || "consultant") as UserType,
            name: p.full_name || p.display_name || "Agri Member",
            title: p.bio?.slice(0, 50) + "..." || `${p.user_type} in ${p.city || 'Pakistan'}`,
            location: p.location || (p.city ? `${p.city}, ${p.province || 'Pakistan'}` : "Pakistan"),
            rating: Number(p.rating) || 4.8,
            keywords: p.user_type === 'consultant' ? ["Agronomy", "Soil", "Advisory"] : p.user_type === 'company' ? ["Seeds", "Inputs", "Machinery"] : ["Agriculture", "Farming"],
            isVerified: p.is_verified ?? true,
            phone: p.phone || "+923001234567",
            image: p.avatar_url || (p.user_type === 'consultant' ? "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80&auto=format&fit=crop" : undefined)
          }));
          setProfiles(mapped);
        }
      } catch (e) {
        // Quiet fallback
      } finally {
        setIsLoading(false);
      }
    }

    fetchProfiles();
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ search: { q: searchQuery } });
  };

  const results = profiles.filter(res => 
    !q || res.name.toLowerCase().includes(q.toLowerCase()) || 
    res.location.toLowerCase().includes(q.toLowerCase()) ||
    res.keywords.some(k => k.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <div className={cn("min-h-screen bg-background", isRTL && "rtl")}>
      <Navbar />
      <main className="pt-24 pb-14 text-left">
        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          
          <div className="max-w-3xl mb-8 animate-in fade-in slide-in-from-left-6 duration-500">
            <span className="text-[11px] font-bold text-secondary uppercase tracking-[0.15em] mb-1 block">Verified Agri-Directory</span>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-primary mb-4 tracking-tight">
              Connect with <span className="text-secondary">Agricultural Leaders</span>
            </h1>
            
            <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-2.5">
              <div className="flex-1 relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/60 text-[20px]">search</span>
                <input 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-outline-variant/60 bg-white text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm font-medium"
                  placeholder="Search by name, expertise, crop, or city..."
                />
              </div>
              <button 
                type="submit"
                className="px-6 py-3 bg-primary text-on-primary rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-primary-container transition-all shadow-md cursor-pointer"
              >
                Search
              </button>
            </form>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Sidebar Filters */}
            <aside className="w-full lg:w-72 space-y-5 lg:sticky lg:top-20 self-start shrink-0">
              <div className="bg-white p-5 rounded-2xl border border-outline-variant/40 shadow-sm">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-outline-variant/30">
                  <h3 className="font-bold text-primary text-xs uppercase tracking-wider flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-[18px]">tune</span>
                    Filter Network
                  </h3>
                  <button 
                    onClick={() => { setSearchQuery(""); navigate({ search: { q: "" } }); }}
                    className="text-[10px] text-secondary font-bold uppercase tracking-wider hover:underline"
                  >
                    Reset
                  </button>
                </div>
                
                <div className="space-y-5">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/70 mb-2.5 block">Member Type</label>
                    <div className="space-y-2">
                      {["Students", "Companies", "Consultants", "Farmers"].map(type => (
                        <label key={type} className="flex items-center gap-2.5 text-xs font-medium text-on-surface cursor-pointer group">
                          <input type="checkbox" className="w-4 h-4 rounded text-primary focus:ring-primary/20 accent-primary" />
                          <span className="group-hover:text-primary transition-colors">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/70 mb-2 block">Region</label>
                    <select className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-3 py-2 text-xs font-medium focus:outline-none focus:border-primary transition-all text-primary">
                      <option>All Pakistan</option>
                      <option>Punjab</option>
                      <option>Sindh</option>
                      <option>KPK</option>
                      <option>Balochistan</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/70 mb-2 block">Specialized Tags</label>
                    <KeywordPicker placeholder="Filter by tags..." />
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-primary to-primary-container p-5 rounded-2xl text-white relative overflow-hidden shadow-md">
                <h4 className="font-display text-xs font-bold uppercase tracking-wider mb-1.5 relative z-10">Concierge Match</h4>
                <p className="text-[11px] text-white/80 mb-3 leading-relaxed relative z-10 font-medium">
                  Let our agronomy team connect you directly with vetted domain experts.
                </p>
                <button className="w-full py-2 bg-secondary text-primary rounded-xl font-bold text-[10px] uppercase tracking-wider hover:bg-white transition-all relative z-10 shadow-xs">
                  Request Match
                </button>
              </div>
            </aside>

            {/* Results Grid */}
            <div className="flex-1 space-y-5 w-full">
              <div className="flex flex-col sm:flex-row justify-between items-center px-1 gap-2">
                <p className="text-xs font-bold text-on-surface-variant/70">
                  Showing <span className="text-primary font-bold">{isLoading ? "..." : results.length}</span> Verified Results
                </p>
                <div className="flex items-center gap-2 text-xs font-medium text-on-surface-variant/70">
                  <span>Sort by:</span>
                  <select className="bg-transparent border-none outline-none font-bold text-primary cursor-pointer text-xs">
                    <option>Relevance</option>
                    <option>Top Rated</option>
                    <option>Newest</option>
                  </select>
                </div>
              </div>

              {isLoading ? (
                <div className="grid md:grid-cols-2 gap-5">
                  <SkeletonProfileCard />
                  <SkeletonProfileCard />
                  <SkeletonProfileCard />
                  <SkeletonProfileCard />
                </div>
              ) : results.length > 0 ? (
                <>
                  <div className="grid md:grid-cols-2 gap-5">
                    {results.map((res) => (
                      <ProfileCard key={res.id} {...res} />
                    ))}
                  </div>
                  <div className="pt-6 pb-2 flex justify-center">
                    <button className="px-7 py-2.5 border border-primary text-primary rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-primary hover:text-white transition-all flex items-center gap-2 group shadow-sm">
                      Load More Profiles
                      <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </button>
                  </div>
                </>
              ) : (
                <EmptyState 
                  icon="search_off"
                  title={`No members match '${q}'`}
                  description="Try searching with a broader keyword, or explore our Plant Clinic to post a specific agronomy case."
                  actionLabel="Go to Plant Clinic"
                  actionHref="/apps/plant-clinic"
                />
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}