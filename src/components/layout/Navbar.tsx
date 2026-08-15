import { Link, useRouterState } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/lib/i18n";
import { supabase } from "@/lib/supabase";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<{
    name: string;
    initials: string;
    userType: string;
    email: string;
  } | null>(null);

  const menuRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { t, lang, setLang } = useTranslation();
  const { location } = useRouterState();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 15);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileOpen(false);
    setUserDropdownOpen(false);
  }, [location.pathname]);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Load session from Supabase & LocalStorage
  const checkAuthState = () => {
    // 1. Check local storage
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("agribiz_current_user");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          const fullName = parsed.full_name || parsed.name || parsed.email?.split("@")[0] || "User";
          const initials = fullName
            .split(" ")
            .map((w: string) => w[0])
            .slice(0, 2)
            .join("")
            .toUpperCase() || "ME";

          setCurrentUser({
            name: fullName,
            initials: initials,
            userType: parsed.user_type || "Member",
            email: parsed.email || ""
          });
        } catch (e) {
          // ignore
        }
      }
    }

    // 2. Check Supabase session
    supabase.auth.getSession().then(({ data }) => {
      if (data.session?.user) {
        const user = data.session.user;
        const name = (user.user_metadata?.full_name as string) || user.email?.split("@")[0] || "Member";
        const initials = name
          .split(" ")
          .map((w: string) => w[0])
          .slice(0, 2)
          .join("")
          .toUpperCase() || "ME";

        setCurrentUser({
          name: name,
          initials: initials,
          userType: (user.user_metadata?.user_type as string) || "Member",
          email: user.email || ""
        });
      }
    });
  };

  useEffect(() => {
    checkAuthState();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const user = session.user;
        const name = (user.user_metadata?.full_name as string) || user.email?.split("@")[0] || "Member";
        const initials = name
          .split(" ")
          .map((w: string) => w[0])
          .slice(0, 2)
          .join("")
          .toUpperCase() || "ME";

        setCurrentUser({
          name: name,
          initials: initials,
          userType: (user.user_metadata?.user_type as string) || "Member",
          email: user.email || ""
        });
      } else if (typeof window !== "undefined" && !localStorage.getItem("agribiz_current_user")) {
        setCurrentUser(null);
      }
    });

    return () => listener.subscription.unsubscribe();
  }, [location.pathname]);

  const handleSignOut = async () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("agribiz_current_user");
    }
    await supabase.auth.signOut();
    setCurrentUser(null);
    setUserDropdownOpen(false);
    window.location.href = "/";
  };

  const navLinks = [
    { label: "Our Apps", to: "/apps" as const },
    { label: t("nav_marketplace"), to: "/apps/agri-biz" as const },
    { label: t("nav_projects"), to: "/projects" as const },
    { label: t("nav_network"), to: "/search" as const },
    { label: t("nav_education"), to: "/apps/education" as const },
  ];

  const linkBase =
    "font-bold text-xs uppercase tracking-wider hover:text-secondary transition-colors duration-200 cursor-pointer";
  const activeCls = "text-secondary font-black";
  const inactiveCls = "text-on-surface-variant";

  return (
    <nav
      ref={menuRef}
      className={cn(
        "bg-white/95 backdrop-blur-md fixed top-0 w-full z-50 border-b border-outline-variant/40 shadow-sm transition-all duration-300",
        isScrolled ? "h-16 shadow-md" : "h-18"
      )}
      aria-label="Main navigation"
    >
      <div className="flex items-center justify-between px-margin-mobile md:px-margin-desktop h-full max-w-container-max mx-auto gap-4">

        {/* Brand */}
        <Link
          to="/"
          className="flex items-center gap-2 font-display text-xl font-bold text-primary tracking-tight shrink-0 group"
          aria-label="AgriBusiness — go to homepage"
        >
          <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[20px] text-secondary-container">spa</span>
          </div>
          <span>AgriBusiness<span className="text-secondary">.</span></span>
        </Link>

        {/* Desktop Search */}
        <div className="hidden md:flex flex-1 max-w-xs mx-4 relative">
          <label htmlFor="global-search" className="sr-only">
            Search marketplace
          </label>
          <span
            className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/60 pointer-events-none text-[18px]"
            aria-hidden="true"
          >
            search
          </span>
          <input
            id="global-search"
            type="search"
            className="w-full bg-surface-container-low/80 border border-outline-variant/60 rounded-full py-1.5 pl-9 pr-3 text-xs focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors font-medium"
            placeholder={lang === "ur" ? "تلاش کریں..." : "Search network..."}
            aria-label="Search marketplace"
          />
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                linkBase,
                location.pathname === link.to ? activeCls : inactiveCls
              )}
              aria-current={location.pathname === link.to ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2.5 ml-2">
          {/* Language toggle */}
          <button
            onClick={() => setLang(lang === "en" ? "ur" : "en")}
            className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-outline-variant/60 text-[10px] font-bold text-on-surface-variant hover:border-primary hover:text-primary transition-colors uppercase tracking-wider cursor-pointer"
            aria-label={`Switch to ${lang === "en" ? "Urdu" : "English"}`}
          >
            <span className="material-symbols-outlined text-[14px]">language</span>
            {t("nav_lang_toggle")}
          </button>

          {/* === LOGGED IN STATE === */}
          {currentUser ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 px-2 py-1.5 rounded-xl border border-outline-variant/50 hover:border-primary/40 bg-surface-container-low hover:bg-white transition-all cursor-pointer shadow-2xs"
              >
                <div className="w-7 h-7 rounded-lg bg-primary text-white flex items-center justify-center font-bold text-[11px] shadow-xs">
                  {currentUser.initials}
                </div>
                <div className="hidden sm:flex flex-col text-left pr-1">
                  <span className="text-xs font-bold text-primary leading-tight line-clamp-1">{currentUser.name}</span>
                  <span className="text-[9px] font-semibold text-secondary uppercase tracking-wider">{currentUser.userType}</span>
                </div>
                <span className="material-symbols-outlined text-[16px] text-on-surface-variant">
                  {userDropdownOpen ? "expand_less" : "expand_more"}
                </span>
              </button>

              {/* Profile Dropdown Menu */}
              {userDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl border border-outline-variant/40 shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150 text-left">
                  <div className="px-3 py-2 border-b border-outline-variant/30 mb-1">
                    <p className="text-xs font-bold text-primary truncate">{currentUser.name}</p>
                    <p className="text-[10px] text-on-surface-variant/70 truncate">{currentUser.email || currentUser.userType}</p>
                  </div>

                  <div className="space-y-0.5">
                    <Link
                      to="/profile/me"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-primary hover:bg-primary/10 transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px] text-secondary">account_box</span>
                      View & Edit Profile
                    </Link>

                    <Link
                      to="/dashboard"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-primary hover:bg-primary/10 transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px] text-primary">dashboard</span>
                      Workspace Dashboard
                    </Link>

                    <Link
                      to="/apps/agri-biz"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-primary hover:bg-primary/10 transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px] text-primary">add_business</span>
                      Post a Listing
                    </Link>

                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-error hover:bg-error/10 transition-colors text-left cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px]">logout</span>
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/onboarding"
                className="hidden md:block text-on-surface-variant font-bold text-xs uppercase tracking-wider hover:text-primary transition-colors px-2 py-1 cursor-pointer"
              >
                Sign In
              </Link>
              <Link
                to="/onboarding"
                className="bg-primary text-on-primary px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-primary-container transition-colors shadow-sm cursor-pointer flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">person_add</span>
                <span>Sign Up</span>
              </Link>
            </div>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors cursor-pointer"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
          >
            <span className="material-symbols-outlined text-[22px]">
              {mobileOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div
          id="mobile-nav"
          role="dialog"
          aria-label="Mobile navigation menu"
          className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-outline-variant/40 shadow-xl animate-in fade-in slide-in-from-top-3 duration-200"
        >
          {/* If Logged In: Show user card */}
          {currentUser && (
            <div className="px-4 pt-4 pb-2 border-b border-outline-variant/30 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-sm shadow-xs">
                {currentUser.initials}
              </div>
              <div className="flex-1 text-left">
                <div className="font-bold text-primary text-sm">{currentUser.name}</div>
                <div className="text-[10px] text-secondary font-bold uppercase">{currentUser.userType}</div>
              </div>
              <Link
                to="/profile/me"
                className="px-3 py-1 bg-surface-container-low rounded-lg text-xs font-bold text-primary border border-outline-variant/40"
              >
                Profile
              </Link>
            </div>
          )}

          {/* Search on mobile */}
          <div className="px-4 pt-3">
            <label htmlFor="mobile-search" className="sr-only">
              Search marketplace
            </label>
            <div className="relative">
              <span
                className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/60 pointer-events-none text-[18px]"
                aria-hidden="true"
              >
                search
              </span>
              <input
                id="mobile-search"
                type="search"
                className="w-full bg-surface-container-low border border-outline-variant/60 rounded-xl py-2 pl-9 pr-3 text-xs focus:outline-none focus:border-primary transition-colors font-medium"
                placeholder={lang === "ur" ? "تلاش کریں..." : "Search marketplace..."}
              />
            </div>
          </div>

          <nav className="px-4 py-3 space-y-1 text-left" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors",
                  location.pathname === link.to
                    ? "bg-primary/10 text-primary"
                    : "text-on-surface-variant hover:bg-surface-container-high hover:text-primary"
                )}
                aria-current={location.pathname === link.to ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="px-4 pb-4 pt-2 border-t border-outline-variant/30 flex flex-col gap-2">
            {currentUser ? (
              <>
                <Link
                  to="/profile/me"
                  className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-xs uppercase tracking-wider"
                >
                  <span className="material-symbols-outlined text-[16px]">account_box</span>
                  My Profile
                </Link>
                <Link
                  to="/dashboard"
                  className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl border border-outline-variant/50 text-xs font-bold text-primary"
                >
                  <span className="material-symbols-outlined text-[16px]">dashboard</span>
                  Workspace Dashboard
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl border border-error/30 text-xs font-bold text-error cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">logout</span>
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/onboarding"
                  className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-xs uppercase tracking-wider shadow-sm"
                >
                  Sign Up Free
                </Link>
                <Link
                  to="/onboarding"
                  className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl border border-primary text-primary font-bold text-xs uppercase tracking-wider"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
