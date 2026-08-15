import { Link } from "@tanstack/react-router";
import { useTranslation } from "@/lib/i18n";

export function Pricing() {
  const { t } = useTranslation();

  const plans = [
    {
      name: "Starter",
      nameUr: "اسٹارٹر",
      price: "مفت",
      priceEn: "Free",
      period: t("pricing_trial_note"),
      desc: "Perfect for exploring — access market rates, connect with experts, and try the platform with no commitment.",
      features: [
        "3 Matched Listings per month",
        "Live market rate ticker",
        "Basic profile listing",
        "Mobile app access",
      ],
      cta: t("pricing_cta_trial"),
      to: "/onboarding",
      highlight: false,
    },
    {
      name: "Professional",
      nameUr: "پروفیشنل",
      price: "₨ 4,999",
      priceEn: "₨ 4,999",
      period: "/ month",
      desc: "For active farmers, consultants, and companies who need unlimited reach and verified credibility.",
      features: [
        "Unlimited listings & RFPs",
        "Priority verification badge",
        "Advanced market analytics",
        "AI match suggestions",
        "Direct WhatsApp integration",
      ],
      cta: t("pricing_cta_pro"),
      to: "/onboarding",
      highlight: true,
      paymentNote: t("pricing_payment_note"),
    },
    {
      name: "Enterprise",
      nameUr: "انٹرپرائز",
      price: "Custom",
      priceEn: "Custom",
      period: "",
      desc: "Tailored for agri-corporations, NGOs, and government bodies needing bulk tools and dedicated support.",
      features: [
        "Custom API integration",
        "Dedicated account manager",
        "Batch procurement tools",
        "SLA-backed 24/7 support",
        "Unlimited team members",
      ],
      cta: t("pricing_cta_enterprise"),
      to: "/onboarding",
      highlight: false,
    },
  ];

  return (
    <section className="py-12 md:py-16 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
      {/* Header */}
      <div className="max-w-2xl mx-auto mb-10 text-center">
        <span className="text-[11px] font-bold text-secondary tracking-[0.15em] uppercase">
          {t("pricing_eyebrow")}
        </span>
        <h2 className="font-display text-2xl md:text-3xl text-primary font-bold tracking-tight mt-1">
          {t("pricing_headline")}
        </h2>
        <p className="text-sm text-on-surface-variant mt-2 font-medium">
          {t("pricing_sub")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 items-stretch">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={[
              "flex flex-col p-7 md:p-8 rounded-3xl border text-left transition-all duration-300",
              plan.highlight
                ? "bg-gradient-to-br from-primary to-primary-container text-white border-primary shadow-xl md:-translate-y-1"
                : "bg-white border-outline-variant/40 hover:border-primary/30 hover:shadow-lg",
            ].join(" ")}
          >
            <div className="flex items-center justify-between mb-2">
              <h3
                className={`font-display text-xl font-bold tracking-tight ${
                  plan.highlight ? "text-white" : "text-primary"
                }`}
              >
                {plan.name}
              </h3>
              {plan.highlight && (
                <span className="px-2.5 py-0.5 bg-secondary text-primary font-bold text-[9px] uppercase tracking-wider rounded-md">
                  Most Popular
                </span>
              )}
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2 mb-4">
              <span className="font-display text-3xl font-black tracking-tight">
                {plan.priceEn}
              </span>
              {plan.period && (
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider ${
                    plan.highlight ? "text-white/70" : "text-on-surface-variant/60"
                  }`}
                >
                  {plan.period}
                </span>
              )}
            </div>

            <p
              className={`text-xs mb-6 leading-relaxed font-medium ${
                plan.highlight ? "text-white/80" : "text-on-surface-variant/80"
              }`}
            >
              {plan.desc}
            </p>

            {/* Features */}
            <ul className="space-y-3 mb-6 flex-grow" aria-label={`${plan.name} plan features`}>
              {plan.features.map((feat) => (
                <li key={feat} className="flex items-start gap-2.5 text-xs font-medium">
                  <span
                    className={`material-symbols-outlined text-[18px] shrink-0 ${
                      plan.highlight ? "text-secondary" : "text-primary"
                    }`}
                    aria-hidden="true"
                  >
                    check_circle
                  </span>
                  <span className={plan.highlight ? "text-white/95" : "text-on-surface"}>
                    {feat}
                  </span>
                </li>
              ))}
            </ul>

            {/* Payment methods for paid plans */}
            {plan.paymentNote && (
              <div className="mb-5 p-3 rounded-xl bg-white/10 border border-white/15">
                <p className="text-[9px] font-bold text-white/70 uppercase tracking-widest mb-2">
                  Accepted Pakistani Payments
                </p>
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="px-2.5 py-1 rounded-lg bg-[#EE1C25] text-white text-[9px] font-black uppercase tracking-wider shadow-sm">
                    JazzCash
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-[#3CB451] text-white text-[9px] font-black uppercase tracking-wider shadow-sm">
                    Easypaisa
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-white/20 text-white text-[9px] font-black uppercase tracking-wider shadow-sm flex items-center gap-1">
                    <span className="material-symbols-outlined text-[10px]">credit_card</span>
                    Card
                  </span>
                </div>
              </div>
            )}

            <Link
              to={plan.to}
              className={[
                "w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-center transition-all shadow-md mt-auto",
                plan.highlight
                  ? "bg-secondary text-primary hover:bg-white hover:text-primary shadow-secondary/20"
                  : "bg-primary text-on-primary hover:bg-primary-container shadow-primary/20",
              ].join(" ")}
            >
              {plan.cta}
            </Link>
          </div>
        ))}
      </div>

      {/* Bottom note */}
      <p className="text-center text-xs text-on-surface-variant mt-8 font-medium">
        {`All plans include a `}
        <strong className="text-primary font-bold">7-day risk-free trial</strong>
        {`. No credit card required to start.`}
      </p>
    </section>
  );
}
