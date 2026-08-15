export function HowItWorks() {
  return (
    <section className="py-12 md:py-16 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-center">
      <div className="max-w-xl mx-auto mb-10">
        <span className="text-[11px] font-bold text-secondary uppercase tracking-[0.15em] mb-1 block">Simple 3-Step Process</span>
        <h2 className="font-display text-2xl md:text-3xl text-primary font-bold tracking-tight">Agricultural Commerce Made Seamless</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        {/* Connecting Line (Desktop) */}
        <div className="hidden md:block absolute top-10 left-[18%] right-[18%] h-[2px] bg-gradient-to-r from-transparent via-outline-variant/60 to-transparent -z-10"></div>
        
        <div className="flex flex-col items-center group text-center">
          <div className="w-18 h-18 rounded-2xl bg-white flex items-center justify-center mb-4 shadow-md border border-outline-variant/40 group-hover:-translate-y-1 transition-transform duration-300">
            <span className="material-symbols-outlined text-[32px] text-primary">person_add</span>
          </div>
          <h3 className="font-display text-lg text-primary font-bold mb-1.5">1. Register Profile</h3>
          <p className="text-xs text-on-surface-variant max-w-xs leading-relaxed font-medium">Create a verified account as a farmer, consultant, student, or enterprise.</p>
        </div>
        
        <div className="flex flex-col items-center group text-center">
          <div className="w-18 h-18 rounded-2xl bg-white flex items-center justify-center mb-4 shadow-md border border-outline-variant/40 group-hover:-translate-y-1 transition-transform duration-300">
            <span className="material-symbols-outlined text-[32px] text-secondary">handshake</span>
          </div>
          <h3 className="font-display text-lg text-primary font-bold mb-1.5">2. Connect & Trade</h3>
          <p className="text-xs text-on-surface-variant max-w-xs leading-relaxed font-medium">Browse listings, review consultant credentials, and negotiate terms securely.</p>
        </div>
        
        <div className="flex flex-col items-center group text-center">
          <div className="w-18 h-18 rounded-2xl bg-white flex items-center justify-center mb-4 shadow-md border border-outline-variant/40 group-hover:-translate-y-1 transition-transform duration-300">
            <span className="material-symbols-outlined text-[32px] text-primary">trending_up</span>
          </div>
          <h3 className="font-display text-lg text-primary font-bold mb-1.5">3. Scale & Prosper</h3>
          <p className="text-xs text-on-surface-variant max-w-xs leading-relaxed font-medium">Execute verified contracts, boost crop yield, and grow your agribusiness.</p>
        </div>
      </div>
    </section>
  );
}
