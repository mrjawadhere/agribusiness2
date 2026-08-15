import { Link } from "@tanstack/react-router";
import { useTranslation } from "@/lib/i18n";

export function Footer() {
  const { t, lang } = useTranslation();
  const currentYear = new Date().getFullYear();

  const platformLinks = [
    { label: t("nav_marketplace"), to: "/apps/agri-biz" as const },
    { label: t("nav_projects"), to: "/projects" as const },
    { label: t("nav_network"), to: "/search" as const },
    { label: t("nav_education"), to: "/apps/education" as const },
  ];

  const supportLinks = [
    { label: lang === "ur" ? "ہمارے بارے میں" : "About Us", href: "#" },
    { label: lang === "ur" ? "رابطہ کریں" : "Contact", href: "#" },
    { label: "WhatsApp Support", href: "https://wa.me/923001234567" },
  ];

  const legalLinks = [
    { label: lang === "ur" ? "رازداری پالیسی" : "Privacy Policy", href: "#" },
    { label: lang === "ur" ? "شرائط استعمال" : "Terms of Use", href: "#" },
    { label: lang === "ur" ? "کوکی پالیسی" : "Cookie Policy", href: "#" },
  ];

  const socialLinks = [
    {
      label: "Facebook",
      href: "https://facebook.com/agribusinesspk",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/company/agribusinesspk",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      label: "WhatsApp",
      href: "https://wa.me/923001234567",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-gradient-to-b from-primary to-primary-container py-12 md:py-14 w-full relative overflow-hidden text-white" aria-label="Site footer">
      <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl -mr-40 -mt-40 pointer-events-none" />

      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-10">

          {/* Brand & Mission */}
          <div className="md:col-span-5 space-y-4 text-left">
            <Link
              to="/"
              className="font-display text-2xl font-bold text-white tracking-tight flex items-center gap-2 hover:text-secondary-container transition-colors"
            >
              <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-[16px] text-secondary-container">spa</span>
              </div>
              <span>AgriBusiness<span className="text-secondary-container">.</span></span>
            </Link>
            <p className="text-xs text-white/70 leading-relaxed max-w-sm font-medium">
              {lang === "ur"
                ? "جدید ٹیکنالوجی کے ذریعے پاکستان کے زرعی شعبے کو مضبوط بنانا — کسانوں، کمپنیوں اور ماہرین کو جوڑتے ہوئے۔"
                : "Empowering Pakistan's agricultural sector through verified digital networks, trade floors, and agronomy intelligence."}
            </p>

            {/* Social links */}
            <div className="flex items-center gap-2.5 pt-1">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-8 h-8 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center text-white/70 hover:text-secondary-container hover:border-secondary-container transition-all shadow-sm"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Groups */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-6">
            {/* Platform links */}
            <div className="space-y-3 text-left">
              <h4 className="text-[10px] font-bold text-secondary-container uppercase tracking-[0.2em]">
                {lang === "ur" ? "پلیٹ فارم" : "Platform"}
              </h4>
              <ul className="space-y-2.5" role="list">
                {platformLinks.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-xs font-medium text-white/70 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support links */}
            <div className="space-y-3 text-left">
              <h4 className="text-[10px] font-bold text-secondary-container uppercase tracking-[0.2em]">
                {lang === "ur" ? "مدد" : "Support"}
              </h4>
              <ul className="space-y-2.5" role="list">
                {supportLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.href.startsWith("http") ? "_blank" : undefined}
                      rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="text-xs font-medium text-white/70 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal links */}
            <div className="space-y-3 text-left">
              <h4 className="text-[10px] font-bold text-secondary-container uppercase tracking-[0.2em]">
                {lang === "ur" ? "قانونی" : "Legal"}
              </h4>
              <ul className="space-y-2.5" role="list">
                {legalLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-xs font-medium text-white/70 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
          <p className="text-[10px] font-medium text-white/40 uppercase tracking-widest">
            © {currentYear} AgriBusiness Pakistan.{" "}
            {lang === "ur" ? "تمام حقوق محفوظ ہیں۔" : "All rights reserved."}
          </p>
          <div className="flex items-center gap-1.5 text-[10px] font-medium text-white/40 uppercase tracking-wider">
            <span className="material-symbols-outlined text-[13px]" aria-hidden="true">lock</span>
            {lang === "ur" ? "محفوظ پلیٹ فارم" : "Secured SSL Verified Platform"}
          </div>
        </div>
      </div>
    </footer>
  );
}
