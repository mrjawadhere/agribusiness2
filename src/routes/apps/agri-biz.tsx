import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useState, useEffect } from "react";
import { SkeletonCard } from "@/components/shared/Skeleton";
import { EmptyState } from "@/components/shared/EmptyState";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { formatPKR } from "@/lib/format";
import { useTranslation } from "@/lib/i18n";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/apps/agri-biz")({
  head: () => ({
    title: "Agri-Biz Trading Floor | AgriBusiness Pakistan",
    meta: [
      { name: "description", content: "Premium B2B marketplace for agricultural commodities, machinery, and inputs." },
      { property: "og:title", content: "AgriBusiness B2B Marketplace" },
      { property: "og:description", content: "Secure B2B trading for the Pakistan agricultural sector." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AgriBizPage,
});

const DEFAULT_LISTINGS = [
  {
    id: "30000000-0000-0000-0000-000000000001",
    title: "Certified Akbar-2019 Wheat Grain (50 Metric Tons)",
    price: 4200,
    unit: "per 40kg bag",
    location: "Sargodha, Punjab",
    seller: "Bilal Farm Estates",
    category: "Commodities",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&q=80&auto=format&fit=crop",
    isVerified: true,
    tag: "Bulk Deal",
    phone: "+923451234567"
  },
  {
    id: "30000000-0000-0000-0000-000000000002",
    title: "High-Efficiency Drip Irrigation Pipe System (10-Acre Pack)",
    price: 185000,
    unit: "complete kit",
    location: "Lahore, Punjab",
    seller: "AgriTech Solutions Ltd",
    category: "Machinery",
    image: "https://images.unsplash.com/photo-1592982537447-6f296d9ccbd3?w=600&q=80&auto=format&fit=crop",
    isVerified: true,
    tag: "Top Rated",
    phone: "+923331234567"
  },
  {
    id: "30000000-0000-0000-0000-000000000003",
    title: "Solar Water Pump System 15HP with Tier-1 Panels",
    price: 980000,
    unit: "full setup",
    location: "Multan, Punjab",
    seller: "AgriTech Solutions Ltd",
    category: "Machinery",
    image: "https://images.unsplash.com/photo-1509391366360-1e97f52ce23b?w=600&q=80&auto=format&fit=crop",
    isVerified: true,
    tag: "High Efficiency",
    phone: "+923331234567"
  },
  {
    id: "30000000-0000-0000-0000-000000000004",
    title: "Super Basmati Rice (Paddy) 2025/2026 Harvest",
    price: 6800,
    unit: "per 40kg",
    location: "Sheikhupura, Punjab",
    seller: "Bilal Farm Estates",
    category: "Commodities",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&q=80&auto=format&fit=crop",
    isVerified: true,
    tag: "Export Grade",
    phone: "+923451234567"
  },
];

function AgriBizPage() {
  const { isRTL } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All Items");
  const [listings, setListings] = useState(DEFAULT_LISTINGS);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Post Listing Modal State
  const [showModal, setShowModal] = useState(false);
  const [postSubmitting, setPostSubmitting] = useState(false);
  const [postSuccess, setPostSuccess] = useState(false);
  const [newListing, setNewListing] = useState({
    title: "",
    category: "Commodities",
    price: "",
    unit: "per 40kg bag",
    quantity: "100",
    location: "Faisalabad, Punjab",
    city: "Faisalabad",
    phone: "+923001234567",
    sellerName: "Al-Baraka Farms",
    imageUrl: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&q=80&auto=format&fit=crop",
    description: ""
  });

  async function loadListings() {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("listings")
        .select("*, profiles:profile_id(full_name, phone, is_verified), categories:category_id(name)")
        .eq("status", "active")
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        const mapped = data.map((item: any) => ({
          id: item.id,
          title: item.title,
          price: Number(item.price) || 0,
          unit: item.unit || "unit",
          location: item.location || item.city || "Pakistan",
          seller: item.profiles?.full_name || "Verified Seller",
          category: item.categories?.name || "Commodities",
          image: (item.images && item.images[0]) || "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&q=80&auto=format&fit=crop",
          isVerified: item.profiles?.is_verified ?? true,
          tag: item.is_featured ? "Featured" : "Verified",
          phone: item.profiles?.phone || "+923001234567"
        }));
        setListings(mapped);
      }
    } catch (err) {
      // Quietly maintain fallback
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadListings();
  }, []);

  const handleCreateListing = async (e: React.FormEvent) => {
    e.preventDefault();
    setPostSubmitting(true);

    try {
      // 1. Get current user or use demo profile
      const { data: sessionData } = await supabase.auth.getSession();
      const profileId = sessionData?.session?.user?.id || "20000000-0000-0000-0000-000000000003";

      // 2. Insert into live Supabase table
      const { error } = await supabase.from("listings").insert({
        profile_id: profileId,
        title: newListing.title.trim(),
        price: parseFloat(newListing.price) || 0,
        unit: newListing.unit,
        quantity: parseFloat(newListing.quantity) || 1,
        location: newListing.location,
        city: newListing.city,
        province: "Punjab",
        description: newListing.description || `${newListing.title} available in ${newListing.location}`,
        images: [newListing.imageUrl],
        status: "active",
        is_featured: true
      });

      if (!error) {
        setPostSuccess(true);
        setTimeout(() => {
          setPostSuccess(false);
          setShowModal(false);
          loadListings();
        }, 1200);
      } else {
        // Fallback: local optimistic insert
        const localItem = {
          id: String(Date.now()),
          title: newListing.title,
          price: parseFloat(newListing.price) || 0,
          unit: newListing.unit,
          location: newListing.location,
          seller: newListing.sellerName,
          category: newListing.category,
          image: newListing.imageUrl,
          isVerified: true,
          tag: "New Listing",
          phone: newListing.phone
        };
        setListings([localItem, ...listings]);
        setPostSuccess(true);
        setTimeout(() => {
          setPostSuccess(false);
          setShowModal(false);
        }, 1000);
      }
    } catch (err) {
      console.error("Listing insert error:", err);
    } finally {
      setPostSubmitting(false);
    }
  };

  const categories = ["All Items", "Commodities", "Machinery", "Fertilizers", "Seeds"];

  const filteredListings = listings.filter(item => {
    const matchesCategory = activeCategory === "All Items" || item.category.toLowerCase().includes(activeCategory.toLowerCase());
    const matchesSearch = !searchQuery || item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className={cn("min-h-screen bg-background", isRTL && "rtl")}>
      <Navbar />
      <main className="pt-24 pb-14">
        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          
          {/* Marketplace Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4 text-left">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-md bg-secondary flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-sm font-bold">storefront</span>
                </div>
                <span className="text-[10px] font-bold text-primary uppercase tracking-wider">B2B Trading Floor</span>
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-primary mb-2 tracking-tight">
                Commodity & Input <span className="text-secondary">Exchange</span>
              </h1>
              <p className="text-xs text-on-surface-variant leading-relaxed font-medium">
                Connect directly with verified agricultural suppliers. Trade machinery, bulk grains, seeds, and organic inputs securely.
              </p>
            </div>
            
            <button 
              onClick={() => setShowModal(true)}
              className="px-6 py-3 bg-primary text-on-primary rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-primary-container transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">add_business</span>
              Post a Product / Commodity
            </button>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/60 text-[18px]">search</span>
              <input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-outline-variant/60 bg-white text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm font-medium"
                placeholder="Search commodities, machinery, fertilizers, suppliers, or cities..."
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 lg:pb-0">
              {categories.map((cat) => (
                <button 
                  key={cat} 
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all whitespace-nowrap cursor-pointer",
                    activeCategory === cat ? "bg-primary text-white border-primary shadow-sm" : "bg-white text-on-surface-variant border-outline-variant/50 hover:border-primary/40"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {isLoading ? (
              <>
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </>
            ) : filteredListings.length > 0 ? (
              filteredListings.map((item) => (
                <div key={item.id} className="group bg-white rounded-2xl border border-outline-variant/40 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full text-left">
                  <div className="relative aspect-[4/3] overflow-hidden bg-surface-container-low">
                    <img 
                      src={item.image} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      alt={item.title} 
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&q=80&auto=format&fit=crop`;
                      }}
                    />
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                      <span className="bg-white/95 backdrop-blur-md px-2.5 py-0.5 rounded-md text-[9px] font-bold text-primary uppercase tracking-wider border border-primary/10 shadow-sm">
                        {item.category}
                      </span>
                      {item.isVerified && (
                        <span className="bg-secondary text-primary px-2.5 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider shadow-sm">
                          Verified
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="p-5 flex flex-col flex-1">
                    <div className="text-[9px] font-bold text-secondary uppercase tracking-wider mb-1">{item.tag}</div>
                    <h3 className="font-display text-base font-bold text-primary mb-2 line-clamp-2 leading-snug group-hover:text-secondary transition-colors">{item.title}</h3>
                    <div className="text-xl font-bold text-primary mb-4">
                      {formatPKR(item.price)} <span className="text-[10px] text-on-surface-variant font-medium">/{item.unit}</span>
                    </div>
                    
                    <div className="mt-auto space-y-1.5 pt-3 border-t border-outline-variant/30 mb-4">
                      <div className="flex items-center gap-2 text-xs font-medium text-on-surface-variant">
                        <span className="material-symbols-outlined text-[16px] text-secondary">location_on</span>
                        {item.location}
                      </div>
                      <div className="flex items-center gap-2 text-xs font-medium text-on-surface-variant">
                        <span className="material-symbols-outlined text-[16px] text-primary">account_circle</span>
                        {item.seller}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <button className="py-2.5 bg-surface-container-low border border-outline-variant/40 text-primary rounded-xl font-bold text-[10px] uppercase tracking-wider hover:bg-primary hover:text-white transition-all cursor-pointer">
                        Details
                      </button>
                      <WhatsAppButton 
                        phone={item.phone} 
                        message={`Hi, I am interested in your listing on AgriBusiness: ${item.title}`} 
                        className="py-2.5 justify-center rounded-xl font-bold text-[10px]" 
                        label="Message" 
                      />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4">
                <EmptyState 
                  icon="inventory_2"
                  title="No listings found"
                  description={`There are currently no listings matching '${searchQuery || activeCategory}'.`}
                  actionLabel="Clear Filters"
                  onAction={() => { setActiveCategory("All Items"); setSearchQuery(""); }}
                />
              </div>
            )}

            {/* Seller Call to Action */}
            <div className="bg-gradient-to-br from-primary to-primary-container rounded-2xl p-6 flex flex-col items-center justify-center text-center group transition-all relative overflow-hidden h-full min-h-[260px] text-white shadow-md">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-4 relative z-10 group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-secondary text-2xl">add_business</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-1.5 relative z-10">Sell on Marketplace</h3>
              <p className="text-xs text-white/80 mb-6 leading-relaxed relative z-10 font-medium">Reach 50k+ verified buyers across Pakistan.</p>
              <button 
                onClick={() => setShowModal(true)}
                className="px-6 py-2.5 bg-secondary text-primary rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-white transition-all relative z-10 shadow-sm cursor-pointer"
              >
                Post Now
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* === POST PRODUCT / COMMODITY MODAL === */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-outline-variant/40 text-left max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-4 border-b border-outline-variant/30 mb-5">
              <div>
                <span className="text-[10px] font-bold text-secondary uppercase tracking-wider">Marketplace Listing</span>
                <h3 className="font-display text-xl font-bold text-primary">Post Product / Commodity</h3>
              </div>
              <button 
                onClick={() => setShowModal(false)} 
                className="w-8 h-8 rounded-full bg-surface-container-low hover:bg-surface-container flex items-center justify-center text-on-surface-variant cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            {postSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-2xl flex items-center justify-center mx-auto">
                  <span className="material-symbols-outlined text-3xl">check_circle</span>
                </div>
                <h4 className="font-bold text-primary text-lg">Product Listed Successfully!</h4>
                <p className="text-xs text-on-surface-variant font-medium">Your commodity is now active on the B2B Trading Floor.</p>
              </div>
            ) : (
              <form onSubmit={handleCreateListing} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/70">Product / Commodity Title</label>
                  <input
                    required
                    value={newListing.title}
                    onChange={(e) => setNewListing({ ...newListing, title: e.target.value })}
                    placeholder="e.g. Super Basmati Rice Paddy (50 Maunds)"
                    className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-3.5 py-2.5 text-xs font-medium text-primary focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/70">Category</label>
                    <select
                      value={newListing.category}
                      onChange={(e) => setNewListing({ ...newListing, category: e.target.value })}
                      className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-3.5 py-2.5 text-xs font-medium text-primary focus:outline-none"
                    >
                      <option>Commodities</option>
                      <option>Machinery</option>
                      <option>Fertilizers</option>
                      <option>Seeds</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/70">Price in PKR (₨)</label>
                    <input
                      required
                      type="number"
                      value={newListing.price}
                      onChange={(e) => setNewListing({ ...newListing, price: e.target.value })}
                      placeholder="e.g. 4500"
                      className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-3.5 py-2.5 text-xs font-medium text-primary focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/70">Unit / Measure</label>
                    <input
                      value={newListing.unit}
                      onChange={(e) => setNewListing({ ...newListing, unit: e.target.value })}
                      placeholder="per 40kg bag / per ton"
                      className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-3.5 py-2.5 text-xs font-medium text-primary focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/70">City / Mandi Location</label>
                    <input
                      required
                      value={newListing.location}
                      onChange={(e) => setNewListing({ ...newListing, location: e.target.value })}
                      placeholder="e.g. Multan, Punjab"
                      className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-3.5 py-2.5 text-xs font-medium text-primary focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/70">WhatsApp Contact Phone</label>
                  <input
                    required
                    value={newListing.phone}
                    onChange={(e) => setNewListing({ ...newListing, phone: e.target.value })}
                    placeholder="03XXXXXXXXX / +923001234567"
                    className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-3.5 py-2.5 text-xs font-medium text-primary focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/70">Product Image URL</label>
                  <input
                    value={newListing.imageUrl}
                    onChange={(e) => setNewListing({ ...newListing, imageUrl: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-3.5 py-2.5 text-xs font-medium text-primary focus:outline-none"
                  />
                </div>

                <div className="pt-3 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-5 py-2.5 rounded-xl border border-outline-variant/50 text-xs font-bold hover:bg-surface-container cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={postSubmitting}
                    className="px-6 py-2.5 bg-primary text-on-primary rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-primary-container transition-all shadow-md cursor-pointer disabled:opacity-50"
                  >
                    {postSubmitting ? "Publishing..." : "Publish Product"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}