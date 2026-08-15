import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { createFileRoute, useParams } from '@tanstack/react-router';
import { cn } from "@/lib/utils";
import { SkeletonProfileCard, SkeletonText } from "@/components/shared/Skeleton";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { useState, useEffect } from "react";
import { useTranslation } from "@/lib/i18n";
import { supabase } from "@/lib/supabase";
import { OFFICIAL_DISCIPLINES } from "@/routes/onboarding";

export const Route = createFileRoute('/profile/$id')({
  head: () => ({
    title: "Member Profile | AgriBusiness Pakistan",
    meta: [
      { name: "description", content: "View technical credentials and verified agricultural profile." },
      { property: "og:title", content: "AgriBusiness Member Profile" },
      { property: "og:type", content: "profile" },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const { id } = useParams({ from: '/profile/$id' });
  const { isRTL } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [imgError, setImgError] = useState(false);

  const [profile, setProfile] = useState({
    id: id,
    fullName: "Dr. Arshad Khan",
    userType: "consultant",
    title: "Senior Agronomist & Soil Health Expert",
    city: "Faisalabad",
    province: "Punjab",
    location: "Faisalabad, Punjab",
    phone: "+923001234567",
    email: "arshad.khan@agribiz.pk",
    rating: 4.9,
    reviews: 124,
    bio: "Specializing in soil nutrition management, NPK optimization, and crop rotation strategies for high-yield wheat, cotton, and citrus farming. Over 15 years of field experience in Punjab and Sindh regions.",
    keywords: ["Soil Nutrition", "Wheat Farming", "Organic Fertilizers", "Pest Management", "Drip Irrigation"],
    isVerified: true,
    avatarUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80&auto=format&fit=crop",
    stats: [
      { label: "Projects Completed", value: "48" },
      { label: "Years Experience", value: "15+" },
      { label: "Avg. Response", value: "2 hrs" }
    ]
  });

  // Form edit state
  const [editForm, setEditForm] = useState({ ...profile });

  useEffect(() => {
    async function loadProfile() {
      setIsLoading(true);
      try {
        const { data: sessionData } = await supabase.auth.getSession();
        const currentUserId = sessionData?.session?.user?.id;
        const localUserStr = typeof window !== "undefined" ? localStorage.getItem("agribiz_current_user") : null;
        const localUser = localUserStr ? JSON.parse(localUserStr) : null;

        const effectiveId = (id === "me" || id === "self") ? (currentUserId || localUser?.id || "20000000-0000-0000-0000-000000000001") : id;

        if (currentUserId === effectiveId || id === "me" || localUser?.id === effectiveId) {
          setIsOwner(true);
        }

        // 1. Fetch from live Supabase
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", effectiveId)
          .single();

        if (!error && data) {
          const loaded = {
            id: data.id,
            fullName: data.full_name || data.display_name || "AgriBusiness Member",
            userType: data.user_type || "consultant",
            title: data.bio?.slice(0, 60) || `${data.user_type} in ${data.city || 'Pakistan'}`,
            city: data.city || "Faisalabad",
            province: data.province || "Punjab",
            location: data.location || (data.city ? `${data.city}, ${data.province || 'Pakistan'}` : "Pakistan"),
            phone: data.phone || "+923001234567",
            email: sessionData?.session?.user?.email || "member@agribusiness.pk",
            rating: Number(data.rating) || 4.9,
            reviews: 18,
            bio: data.bio || "Dedicated agricultural practitioner and verified network member.",
            keywords: data.user_type === 'consultant' ? ["Soil Nutrition", "Agronomy", "Crop Protection"] : ["Agriculture", "Farming", "Trading"],
            isVerified: data.is_verified ?? true,
            avatarUrl: data.avatar_url || "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80&auto=format&fit=crop",
            stats: [
              { label: "Active Listings", value: "3" },
              { label: "Verified Deals", value: "12" },
              { label: "Network Score", value: "98%" }
            ]
          };
          setProfile(loaded);
          setEditForm(loaded);
        } else if (localUser && (id === "me" || id === localUser.id)) {
          const localLoaded = {
            ...profile,
            id: localUser.id,
            fullName: localUser.full_name || "Registered Member",
            userType: localUser.user_type || "farmer",
            city: localUser.city || "Faisalabad",
            phone: localUser.phone || "+923001234567",
            email: localUser.email || "user@example.com",
            location: `${localUser.city || 'Faisalabad'}, Pakistan`,
            keywords: localUser.keywords || ["Agriculture", "Field Crops"]
          };
          setProfile(localLoaded);
          setEditForm(localLoaded);
        }
      } catch (err) {
        // Fallback default
      } finally {
        setIsLoading(false);
      }
    }

    loadProfile();
  }, [id]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveLoading(true);

    try {
      // 1. Update Supabase profile
      await supabase.from("profiles").update({
        full_name: editForm.fullName,
        phone: editForm.phone,
        city: editForm.city,
        bio: editForm.bio,
        avatar_url: editForm.avatarUrl
      }).eq("id", profile.id);

      // 2. Update local storage
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem("agribiz_current_user");
        if (stored) {
          const parsed = JSON.parse(stored);
          localStorage.setItem("agribiz_current_user", JSON.stringify({
            ...parsed,
            full_name: editForm.fullName,
            phone: editForm.phone,
            city: editForm.city
          }));
        }
      }

      setProfile({
        ...editForm,
        location: `${editForm.city}, ${editForm.province || 'Punjab'}`
      });
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
        setIsEditing(false);
      }, 1000);
    } catch (e) {
      console.error(e);
    } finally {
      setSaveLoading(false);
    }
  };

  const toggleKeyword = (kw: string) => {
    setEditForm(prev => ({
      ...prev,
      keywords: prev.keywords.includes(kw) 
        ? prev.keywords.filter(k => k !== kw) 
        : [...prev.keywords, kw]
    }));
  };

  return (
    <div className={cn("min-h-screen bg-background", isRTL && "rtl")}>
      <Navbar />
      <main className="pt-24 pb-14">
        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-left">
          
          <div className="grid lg:grid-cols-12 gap-8 max-w-6xl mx-auto items-start">
            
            {/* Main Content Column */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Profile Header Hero Card */}
              <motion.div 
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-6 sm:p-8 rounded-3xl border border-outline-variant/40 shadow-sm relative overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row items-start gap-6 relative z-10">
                  <div className="relative group shrink-0">
                    <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-surface-container-low overflow-hidden border-2 border-white shadow-lg shrink-0">
                      {imgError ? (
                        <div className="w-full h-full bg-primary text-white flex items-center justify-center font-bold text-2xl">
                          {profile.fullName.slice(0, 2).toUpperCase()}
                        </div>
                      ) : (
                        <img 
                          src={profile.avatarUrl} 
                          alt={profile.fullName} 
                          className="w-full h-full object-cover"
                          onError={() => setImgError(true)}
                        />
                      )}
                    </div>
                    {profile.isVerified && (
                      <div className="absolute -bottom-2 -right-2 bg-secondary text-primary p-1 rounded-xl border-2 border-white shadow flex items-center justify-center">
                        <span className="material-symbols-outlined text-base font-black">verified</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <div className="flex flex-wrap items-center gap-2">
                        {isLoading ? <SkeletonText lines={1} className="w-48 h-8" /> : (
                          <h1 className="text-2xl sm:text-3xl font-bold text-primary tracking-tight">{profile.fullName}</h1>
                        )}
                        {!isLoading && (
                          <span className="px-2.5 py-0.5 rounded-md bg-primary/10 text-primary text-[9px] font-bold uppercase tracking-wider border border-primary/20">
                            {profile.userType}
                          </span>
                        )}
                      </div>

                      {/* Edit toggle button for profile owner */}
                      {isOwner && !isLoading && (
                        <button
                          onClick={() => setIsEditing(!isEditing)}
                          className="px-3.5 py-1.5 rounded-xl border border-outline-variant/60 text-xs font-bold text-primary hover:bg-surface-container transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[16px]">
                            {isEditing ? "visibility" : "edit"}
                          </span>
                          <span>{isEditing ? "View Dossier" : "Edit Profile"}</span>
                        </button>
                      )}
                    </div>
                    
                    {isLoading ? <SkeletonText lines={1} className="w-40 h-5 mb-4" /> : (
                      <p className="text-sm font-semibold text-on-surface-variant mb-4">{profile.title}</p>
                    )}
                    
                    <div className="flex flex-wrap items-center gap-6 pt-3 border-t border-outline-variant/30">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-on-surface-variant">
                        <span className="material-symbols-outlined text-secondary text-[16px]">location_on</span>
                        {isLoading ? <SkeletonText lines={1} className="w-20 h-4" /> : profile.location}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-on-surface-variant">
                        <span className="material-symbols-outlined text-secondary text-[16px] fill-secondary">star</span>
                        <span className="text-primary font-bold">{profile.rating}</span>
                        <span className="text-on-surface-variant/60">({profile.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* === EDIT MODE FORM === */}
              {isEditing ? (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white p-6 sm:p-8 rounded-3xl border border-outline-variant/40 shadow-sm"
                >
                  <div className="flex justify-between items-center pb-4 border-b border-outline-variant/30 mb-6">
                    <div>
                      <span className="text-[10px] font-bold text-secondary uppercase tracking-wider">Account Settings</span>
                      <h2 className="font-display text-xl font-bold text-primary">Edit Your Profile</h2>
                    </div>
                    {saveSuccess && (
                      <div className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-lg flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">check_circle</span>
                        Saved!
                      </div>
                    )}
                  </div>

                  <form onSubmit={handleSaveProfile} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/70">Full Name</label>
                        <input
                          required
                          value={editForm.fullName}
                          onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                          className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-3.5 py-2.5 text-xs font-medium text-primary focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/70">Professional Title / Headline</label>
                        <input
                          value={editForm.title}
                          onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                          className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-3.5 py-2.5 text-xs font-medium text-primary focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/70">Phone (WhatsApp)</label>
                        <input
                          required
                          value={editForm.phone}
                          onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                          className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-3.5 py-2.5 text-xs font-medium text-primary focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/70">City / District</label>
                        <select
                          value={editForm.city}
                          onChange={(e) => setEditForm({ ...editForm, city: e.target.value })}
                          className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-3.5 py-2.5 text-xs font-medium text-primary focus:outline-none"
                        >
                          <option>Faisalabad</option>
                          <option>Multan</option>
                          <option>Lahore</option>
                          <option>Sargodha</option>
                          <option>Rahim Yar Khan</option>
                          <option>Sahiwal</option>
                          <option>Karachi</option>
                          <option>Peshawar</option>
                          <option>Quetta</option>
                          <option>Islamabad</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/70">Avatar Image URL</label>
                      <input
                        value={editForm.avatarUrl}
                        onChange={(e) => setEditForm({ ...editForm, avatarUrl: e.target.value })}
                        className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-3.5 py-2.5 text-xs font-medium text-primary focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/70">Professional Bio & Experience</label>
                      <textarea
                        rows={4}
                        value={editForm.bio}
                        onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                        className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-3.5 py-2.5 text-xs font-medium text-primary focus:outline-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/70">Specialized Disciplines ({editForm.keywords.length})</label>
                      <div className="max-h-48 overflow-y-auto pr-1 flex flex-wrap gap-1.5 p-2 border border-outline-variant/30 rounded-xl bg-surface-container-low">
                        {OFFICIAL_DISCIPLINES.map(kw => {
                          const isSel = editForm.keywords.includes(kw);
                          return (
                            <button
                              type="button"
                              key={kw}
                              onClick={() => toggleKeyword(kw)}
                              className={cn(
                                "px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer",
                                isSel ? "bg-primary text-white" : "bg-white text-on-surface-variant border border-outline-variant/40"
                              )}
                            >
                              {kw}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="pt-3 flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="px-5 py-2.5 rounded-xl border border-outline-variant/50 text-xs font-bold hover:bg-surface-container cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={saveLoading}
                        className="px-7 py-2.5 bg-primary text-on-primary rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-primary-container transition-all shadow-md cursor-pointer disabled:opacity-50"
                      >
                        {saveLoading ? "Saving..." : "Save Changes"}
                      </button>
                    </div>
                  </form>
                </motion.div>
              ) : (
                /* === VIEW MODE === */
                <>
                  {/* Bio & Expertise */}
                  <motion.div 
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white p-6 sm:p-8 rounded-3xl border border-outline-variant/40 shadow-sm"
                  >
                    <h2 className="font-display text-lg font-bold text-primary mb-3 tracking-tight">Professional Dossier</h2>
                    <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-6 font-medium">
                      {profile.bio}
                    </p>
                    
                    <h3 className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/70 mb-3">Specialized Disciplines & Keywords</h3>
                    <div className="flex flex-wrap gap-2">
                      {profile.keywords.map(tag => (
                        <span key={tag} className="px-3 py-1 rounded-xl bg-surface-container-low text-xs font-semibold text-primary border border-outline-variant/40">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>

                  {/* Credentials History */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-3xl border border-outline-variant/40 shadow-sm">
                      <h3 className="font-display text-base font-bold text-primary mb-4 tracking-tight flex items-center gap-2">
                        <span className="material-symbols-outlined text-secondary text-lg">school</span>
                        Academic Credentials
                      </h3>
                      <div className="space-y-4">
                        <div className="relative pl-5 border-l-2 border-primary/30">
                          <div className="absolute -left-[5px] top-0.5 w-2 h-2 rounded-full bg-primary" />
                          <h4 className="font-bold text-primary text-xs">Degree in Agricultural Sciences</h4>
                          <p className="text-[11px] text-on-surface-variant font-medium">University of Agriculture, Faisalabad</p>
                          <p className="text-[10px] text-secondary font-bold uppercase tracking-wider mt-0.5">Verified Alumni</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-3xl border border-outline-variant/40 shadow-sm">
                      <h3 className="font-display text-base font-bold text-primary mb-4 tracking-tight flex items-center gap-2">
                        <span className="material-symbols-outlined text-secondary text-lg">work</span>
                        Field & Industry Timeline
                      </h3>
                      <div className="space-y-4">
                        <div className="relative pl-5 border-l-2 border-secondary/40">
                          <div className="absolute -left-[5px] top-0.5 w-2 h-2 rounded-full bg-secondary" />
                          <h4 className="font-bold text-primary text-xs">Verified Member & Practitioner</h4>
                          <p className="text-[11px] text-on-surface-variant font-medium">AgriBusiness National Network</p>
                          <p className="text-[10px] text-secondary font-bold uppercase tracking-wider mt-0.5">Active 2026</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Sidebar Actions */}
            <aside className="lg:col-span-4 space-y-5 lg:sticky lg:top-20 self-start shrink-0 w-full">
              <div className="bg-white p-6 rounded-3xl border border-outline-variant/40 shadow-sm text-left">
                <div className="grid grid-cols-3 gap-2 mb-6 pb-4 border-b border-outline-variant/30 text-center">
                  {profile.stats.map(stat => (
                    <div key={stat.label}>
                      <div className="text-xl font-bold text-primary">{stat.value}</div>
                      <div className="text-[8px] font-bold text-on-surface-variant/60 uppercase tracking-wider mt-0.5 leading-tight">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <WhatsAppButton 
                    phone={profile.phone} 
                    message={`Salaam ${profile.fullName}, I saw your profile on AgriBusiness.`} 
                    className="w-full justify-center py-3 rounded-xl border border-emerald-300 font-bold text-xs" 
                  />
                  <button className="w-full py-3 bg-primary text-on-primary rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-primary-container transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer">
                    <span className="material-symbols-outlined text-[18px]">chat</span>
                    Direct Message
                  </button>
                </div>
                
                <div className="mt-6 pt-4 border-t border-outline-variant/30 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-on-surface-variant">
                    <span className="material-symbols-outlined text-secondary text-[18px]">mail</span>
                    <span>{profile.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-on-surface-variant">
                    <span className="material-symbols-outlined text-secondary text-[18px]">verified_user</span>
                    <span>Verified Profile & Credentials</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-primary to-primary-container rounded-2xl p-5 text-white relative overflow-hidden shadow-md text-left">
                <h4 className="font-bold text-xs uppercase tracking-wider mb-1 relative z-10 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-secondary">verified</span>
                  Verified Network Status
                </h4>
                <p className="text-[11px] text-white/80 leading-relaxed relative z-10 font-medium">
                  Identity, phone, and professional disciplines verified on the AgriBusiness platform.
                </p>
              </div>
            </aside>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
