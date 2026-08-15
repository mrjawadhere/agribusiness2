import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase, type User } from "@/lib/supabase";
import { useTranslation } from "@/lib/i18n";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SkeletonAvatar, SkeletonText, SkeletonCard } from "@/components/shared/Skeleton";
import { EmptyState } from "@/components/shared/EmptyState";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    title: "My Workspace | AgriBusiness Pakistan",
    meta: [
      { name: "description", content: "Manage your AgriBusiness profile, listings, and messages." },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const navigate = useNavigate();
  const { t, isRTL } = useTranslation();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session?.user) {
        setUser(data.session.user);
        setLoading(false);
      } else {
        // Check local session
        const stored = typeof window !== "undefined" ? localStorage.getItem("agribiz_current_user") : null;
        if (stored) {
          try {
            const parsed = JSON.parse(stored);
            setUser({
              id: parsed.id,
              email: parsed.email,
              user_metadata: {
                full_name: parsed.full_name,
                user_type: parsed.user_type,
                city: parsed.city
              },
              app_metadata: {},
              aud: "authenticated",
              created_at: new Date().toISOString()
            } as any);
            setLoading(false);
            return;
          } catch(e) {}
        }
        navigate({ to: "/onboarding", replace: true });
      }
    });
  }, [navigate]);

  const handleSignOut = async () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("agribiz_current_user");
    }
    await supabase.auth.signOut();
    navigate({ to: "/" });
  };

  const userName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Grower Member";
  const userType = user?.user_metadata?.user_type || "Farmer / Grower";

  return (
    <div className={cn("min-h-screen bg-background flex flex-col", isRTL && "rtl")}>
      <Navbar />
      <main className="flex-1 pt-24 pb-14">
        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-left">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              {loading ? (
                <>
                  <SkeletonText lines={1} className="w-28 mb-1.5" />
                  <SkeletonText lines={1} className="w-56 h-7" />
                </>
              ) : (
                <>
                  <p className="text-[10px] font-bold text-on-surface-variant/70 uppercase tracking-wider mb-0.5">
                    {t("dash_greeting")}
                  </p>
                  <h1 className="font-display text-2xl md:text-3xl font-bold text-primary tracking-tight">
                    {userName}
                  </h1>
                </>
              )}
            </div>
            
            {!loading && (
              <div className="flex items-center gap-3">
                <Link
                  to="/apps/agri-biz"
                  className="px-5 py-2.5 bg-primary text-on-primary rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-primary-container transition-all shadow-md flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">add_business</span>
                  {t("dash_new_listing")}
                </Link>
                <button
                  onClick={handleSignOut}
                  className="w-9 h-9 rounded-xl border border-outline-variant/40 flex items-center justify-center text-on-surface-variant hover:bg-error/10 hover:text-error hover:border-error/30 transition-all cursor-pointer"
                  aria-label={t("btn_signout")}
                  title={t("btn_signout")}
                >
                  <span className="material-symbols-outlined text-[16px]">logout</span>
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-4">
              <div className="bg-white p-5 rounded-2xl border border-outline-variant/40 shadow-sm flex flex-col items-center text-center">
                {loading ? (
                  <SkeletonAvatar size="lg" />
                ) : (
                  <div className="w-16 h-16 rounded-2xl bg-primary text-white flex items-center justify-center font-display text-xl font-bold mb-3 shadow-md">
                    {userName.charAt(0).toUpperCase()}
                  </div>
                )}
                
                {loading ? (
                  <div className="mt-3 w-full flex flex-col items-center">
                    <SkeletonText lines={1} className="w-20 mb-1" />
                    <SkeletonText lines={1} className="w-14" />
                  </div>
                ) : (
                  <>
                    <h2 className="font-bold text-primary text-sm mb-1">{userName}</h2>
                    <span className="px-2.5 py-0.5 bg-primary/10 text-primary text-[9px] font-bold uppercase tracking-wider rounded-md border border-primary/20 mb-3">
                      {userType}
                    </span>
                    <Link
                      to="/profile/me"
                      className="w-full py-2 bg-surface-container-low hover:bg-primary hover:text-white border border-outline-variant/40 rounded-xl text-xs font-bold text-primary transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                    >
                      <span className="material-symbols-outlined text-[16px]">account_box</span>
                      View & Edit Profile
                    </Link>
                  </>
                )}
              </div>

              <nav className="bg-white p-3 rounded-2xl border border-outline-variant/40 shadow-sm flex flex-col gap-1">
                {[
                  { icon: "dashboard", label: "Overview", active: true, to: "/dashboard" },
                  { icon: "storefront", label: "Marketplace Lots", to: "/apps/agri-biz" },
                  { icon: "work", label: "Projects & RFPs", to: "/projects" },
                  { icon: "psychiatry", label: "Plant Clinic", to: "/apps/plant-clinic" },
                  { icon: "pets", label: "Animal Clinic", to: "/apps/animal-clinic" },
                ].map((item, i) => (
                  <Link
                    key={i}
                    to={item.to}
                    className={cn(
                      "flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-bold text-xs transition-all text-left",
                      item.active 
                        ? "bg-primary/10 text-primary font-black" 
                        : "text-on-surface-variant hover:bg-surface-container hover:text-primary"
                    )}
                  >
                    <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                    {item.label}
                  </Link>
                ))}
              </nav>
            </aside>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              
              {/* Stats Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { label: "Active Listings", value: "1", icon: "inventory_2" },
                  { label: "Unread Messages", value: "0", icon: "mark_email_unread" },
                  { label: "Profile Views", value: "18", icon: "visibility" },
                ].map((stat, i) => (
                  <div key={i} className="bg-white p-5 rounded-2xl border border-outline-variant/40 flex flex-col shadow-sm">
                    <div className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center mb-3">
                      <span className="material-symbols-outlined text-[18px] text-primary">{stat.icon}</span>
                    </div>
                    {loading ? (
                      <SkeletonText lines={1} className="w-8 h-6 mb-1" />
                    ) : (
                      <div className="font-display text-2xl font-bold text-primary mb-0.5">{stat.value}</div>
                    )}
                    <div className="text-[9px] font-bold text-on-surface-variant/70 uppercase tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link to="/apps/agri-biz" className="p-5 bg-white rounded-2xl border border-outline-variant/40 hover:border-primary/40 hover:shadow-md transition-all flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-primary text-white flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-2xl">add_business</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-primary text-sm">Post a Commodity</h4>
                    <p className="text-xs text-on-surface-variant font-medium">Sell grain, machinery, or inputs.</p>
                  </div>
                </Link>

                <Link to="/projects" className="p-5 bg-white rounded-2xl border border-outline-variant/40 hover:border-primary/40 hover:shadow-md transition-all flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-secondary text-primary flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-2xl">engineering</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-primary text-sm">Post a Project / RFP</h4>
                    <p className="text-xs text-on-surface-variant font-medium">Hire agronomists or rent equipment.</p>
                  </div>
                </Link>
              </div>

              {/* Activity Feed */}
              <div className="bg-white rounded-2xl border border-outline-variant/40 overflow-hidden shadow-sm">
                <div className="p-5 border-b border-outline-variant/30 flex justify-between items-center">
                  <h3 className="font-display text-base font-bold text-primary tracking-tight">Recent Workspace Activity</h3>
                  <button className="text-[10px] font-bold text-primary uppercase tracking-wider hover:underline">View All</button>
                </div>
                
                {loading ? (
                  <div className="p-6 space-y-4">
                    {[1, 2].map(i => (
                      <div key={i} className="flex gap-3">
                        <SkeletonAvatar size="sm" rounded="2xl" />
                        <div className="flex-1">
                          <SkeletonText lines={2} />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6">
                    <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-xl border border-emerald-200 mb-3 text-left">
                      <span className="material-symbols-outlined text-emerald-700">verified</span>
                      <div className="text-xs font-semibold text-emerald-900">
                        Profile created and registered in the AgriBusiness National Network.
                      </div>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}