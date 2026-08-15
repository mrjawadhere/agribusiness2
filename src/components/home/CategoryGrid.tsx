import { Link } from "@tanstack/react-router";
import { useTranslation } from "@/lib/i18n";

export function CategoryGrid() {
  const { lang } = useTranslation();

  const categories = [
    {
      name: lang === "ur" ? "گندم و اناج" : "Wheat & Grains",
      icon: "grass",
      color: "bg-emerald-50 text-emerald-700 border-emerald-100",
      slug: "wheat-grains",
    },
    {
      name: lang === "ur" ? "باسمتی چاول" : "Basmati Rice",
      icon: "rice_bowl",
      color: "bg-amber-50 text-amber-700 border-amber-100",
      slug: "rice",
    },
    {
      name: lang === "ur" ? "کپاس" : "Cotton",
      icon: "eco",
      color: "bg-teal-50 text-teal-700 border-teal-100",
      slug: "cotton",
    },
    {
      name: lang === "ur" ? "مشینری" : "Machinery",
      icon: "agriculture",
      color: "bg-blue-50 text-blue-700 border-blue-100",
      slug: "machinery",
    },
    {
      name: lang === "ur" ? "مویشی" : "Livestock",
      icon: "pets",
      color: "bg-orange-50 text-orange-700 border-orange-100",
      slug: "livestock",
    },
    {
      name: lang === "ur" ? "شمسی توانائی" : "Solar Energy",
      icon: "solar_power",
      color: "bg-yellow-50 text-yellow-700 border-yellow-100",
      slug: "solar",
    },
  ];

  return (
    <section
      className="bg-white py-12 md:py-14 border-y border-outline-variant/30 relative overflow-hidden"
      aria-labelledby="categories-heading"
    >
      <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div className="text-left max-w-2xl">
            <span className="text-[11px] font-bold text-secondary uppercase tracking-[0.15em] mb-1 block">
              {lang === "ur" ? "زرعی شعبہ جات" : "Agriculture Sectors"}
            </span>
            <h2
              id="categories-heading"
              className="font-display text-2xl md:text-3xl text-primary font-bold tracking-tight"
            >
              {lang === "ur" ? "بازار کے زمرے" : "Marketplace Categories"}
            </h2>
            <p className="text-sm text-on-surface-variant leading-relaxed mt-1">
              {lang === "ur"
                ? "پاکستان کی زرعی سپلائی چین میں ہر شعبے کو دریافت کریں۔"
                : "Explore commodities, certified inputs, livestock, and machinery across Pakistan."}
            </p>
          </div>
          <Link
            to="/categories"
            className="flex items-center gap-1.5 text-secondary font-bold text-xs uppercase tracking-wider hover:text-secondary/80 transition-colors group shrink-0"
          >
            {lang === "ur" ? "سب دیکھیں" : "View All"}
            <span
              className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform"
              aria-hidden="true"
            >
              arrow_forward
            </span>
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Main Feature Card */}
          <div className="md:col-span-5 bg-gradient-to-br from-primary to-primary-container rounded-3xl p-8 text-left flex flex-col justify-between group overflow-hidden relative shadow-lg">
            <div className="relative z-10">
              <span className="inline-block px-3 py-1 rounded-full bg-secondary text-primary font-bold text-[10px] uppercase tracking-wider mb-4">
                Featured Trading Floor
              </span>
              <h3 className="font-display text-3xl font-bold text-white mb-2 leading-tight tracking-tight">
                Agri-Biz{" "}
                <span className="text-secondary-container italic">Trading Floor</span>
              </h3>
              <p className="text-white/80 text-xs leading-relaxed max-w-xs mb-6 font-medium">
                {lang === "ur"
                  ? "پاکستان کے تصدیق شدہ فروخت کنندگان اور خریداروں کے لیے جدید ترین ٹریڈنگ ہب۔"
                  : "The digital exchange for verified commodity sellers, millers, and corporate buyers."}
              </p>
              <Link
                to="/apps/agri-biz"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary rounded-xl font-bold text-[11px] uppercase tracking-wider hover:bg-secondary hover:text-white transition-all shadow-md"
              >
                {lang === "ur" ? "ابھی شروع کریں" : "Start Trading"}
                <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                  arrow_forward
                </span>
              </Link>
            </div>
            <div className="absolute -bottom-8 -right-8 w-60 h-60 bg-white/10 rounded-full blur-2xl group-hover:scale-110 transition-transform pointer-events-none" />
            <div className="mt-4 relative z-10 flex justify-end opacity-10 pointer-events-none">
              <span className="material-symbols-outlined text-[120px] text-white -rotate-12 group-hover:rotate-0 transition-transform duration-700">
                storefront
              </span>
            </div>
          </div>

          {/* Category Grid */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3.5">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                to={`/categories/${cat.slug}`}
                className="flex flex-col items-center justify-center p-5 bg-background border border-outline-variant/50 rounded-2xl hover:bg-white hover:shadow-md hover:border-primary/30 transition-all group"
              >
                <div
                  className={`w-12 h-12 ${cat.color} border rounded-xl flex items-center justify-center mb-3 group-hover:scale-105 transition-transform`}
                >
                  <span
                    className="material-symbols-outlined text-[24px]"
                    aria-hidden="true"
                  >
                    {cat.icon}
                  </span>
                </div>
                <span className="font-bold text-primary text-xs text-center leading-snug">
                  {cat.name}
                </span>
                <span className="text-[10px] text-secondary font-bold uppercase tracking-tighter mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {lang === "ur" ? "دیکھیں" : "Browse"}
                </span>
              </Link>
            ))}

            {/* See More */}
            <Link
              to="/categories"
              aria-label="Browse all categories"
              className="flex flex-col items-center justify-center p-5 bg-surface-container-low border border-dashed border-outline-variant rounded-2xl hover:bg-surface-container transition-all group"
            >
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mb-2 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                <span className="material-symbols-outlined text-on-surface-variant group-hover:text-white text-[20px]" aria-hidden="true">
                  add
                </span>
              </div>
              <span className="font-bold text-on-surface-variant text-xs text-center">
                {lang === "ur" ? "مزید 12+" : "12+ More"}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}