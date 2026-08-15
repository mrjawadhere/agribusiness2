import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { createFileRoute } from '@tanstack/react-router';
import { cn } from "@/lib/utils";

const MOCK_PROBLEMS = [
  {
    id: "1",
    user: "Farmer Bilal",
    location: "Sargodha",
    title: "Cattle showing signs of foot rot",
    description: "Three of my cows are limping and have swelling around their hooves. Need immediate advice.",
    replies: 8,
    time: "45 mins ago",
    tags: ["Cattle", "Emergency"],
    expertReply: {
      name: "Dr. Vikash K.",
      role: "Veterinary Officer",
      content: "Ensure the shed floor is completely dry and disinfect with potassium permanganate. Systemic antibiotic regimen is required."
    }
  },
  {
    id: "2",
    user: "Organic Poultry Farms",
    location: "Rawalpindi",
    title: "Sudden drop in egg production in layer batch",
    description: "Layer flock production has dropped 35% in 4 days. Temperature has been fluctuating.",
    replies: 3,
    time: "2 hours ago",
    tags: ["Poultry", "Nutrition"]
  }
];

const AnimalClinicPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-14">
        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          
          {/* Header */}
          <div className="max-w-4xl mx-auto mb-8 text-left animate-in fade-in slide-in-from-left-6 duration-500">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-md">
                <span className="material-symbols-outlined text-secondary-container text-2xl">pets</span>
              </div>
              <div>
                <h1 className="font-display text-2xl md:text-3xl font-bold text-primary tracking-tight">Animal & Livestock Clinic</h1>
                <p className="text-on-surface-variant font-bold text-[9px] uppercase tracking-wider">24/7 Certified Veterinary Guidance</p>
              </div>
            </div>
            <p className="text-xs text-on-surface-variant max-w-2xl leading-relaxed font-medium">
              Real-time clinical support for cattle, buffalo, poultry, and dairy herds. Connect with certified livestock veterinarians instantly.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
            {/* Feed Section */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Post Case Form */}
              <div className="bg-white p-6 rounded-2xl border border-outline-variant/40 shadow-sm text-left">
                <h3 className="font-bold text-primary text-xs uppercase tracking-wider mb-4 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-secondary text-[18px]">add_circle</span>
                  Describe Animal Case
                </h3>
                <input 
                  placeholder="Case Title (e.g. Foot infection & fever in Buffalo herd)"
                  className="w-full mb-3 bg-surface-container-low border border-outline-variant/50 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-primary transition-all font-medium"
                />
                <textarea 
                  placeholder="Describe herd symptoms, feed intake, milk production drop, or behavioral changes..."
                  className="w-full h-24 bg-surface-container-low border border-outline-variant/50 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-primary transition-all resize-none mb-4 font-medium"
                />
                
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex gap-2">
                    <button className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center hover:bg-primary/10 transition-colors text-primary">
                      <span className="material-symbols-outlined text-[20px]">add_a_photo</span>
                    </button>
                    <button className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center hover:bg-primary/10 transition-colors text-primary">
                      <span className="material-symbols-outlined text-[20px]">mic</span>
                    </button>
                  </div>
                  <button className="w-full sm:w-auto px-6 py-2.5 bg-primary text-on-primary rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-primary-container transition-all shadow-md">
                    Post Case to Feed
                  </button>
                </div>
              </div>

              {/* Clinic Feed */}
              <div className="space-y-4">
                {MOCK_PROBLEMS.map((problem, i) => (
                  <motion.div
                    key={problem.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 * i + 0.1 }}
                    className="bg-white p-6 rounded-2xl border border-outline-variant/40 hover:border-primary/30 transition-all text-left shadow-sm"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-surface-container-low flex items-center justify-center font-bold text-primary text-xs">
                          {problem.user.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-primary text-xs">{problem.user}</div>
                          <div className="text-[9px] text-on-surface-variant/70 font-semibold uppercase tracking-wider">{problem.location} • {problem.time}</div>
                        </div>
                      </div>
                      <span className="material-symbols-outlined text-on-surface-variant/40 text-[18px]">more_horiz</span>
                    </div>
                    
                    <h3 className="font-display text-base font-bold text-primary mb-2 tracking-tight">{problem.title}</h3>
                    <p className="text-on-surface-variant text-xs mb-4 leading-relaxed font-medium">{problem.description}</p>
                    
                    <div className="flex flex-wrap items-center gap-1.5 mb-4">
                      {problem.tags.map(tag => (
                        <span key={tag} className="px-2.5 py-0.5 rounded-md bg-surface-container-low text-[9px] font-bold text-primary uppercase tracking-wider border border-outline-variant/40">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Thread Response */}
                    {problem.expertReply && (
                      <div className="pl-4 border-l-2 border-primary/30 space-y-2">
                        <div className="flex gap-3">
                          <div className="w-8 h-8 rounded-lg bg-primary text-on-primary flex items-center justify-center shrink-0 shadow-sm">
                            <span className="material-symbols-outlined text-xs">health_and_safety</span>
                          </div>
                          <div className="flex-1 bg-surface-container-low/60 p-4 rounded-xl rounded-tl-none border border-outline-variant/30">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-bold text-primary text-xs">{problem.expertReply.name}</span>
                              <span className="px-2 py-0.5 rounded bg-secondary text-primary text-[8px] font-bold uppercase tracking-wider">Certified Vet</span>
                            </div>
                            <p className="text-xs text-on-surface-variant leading-relaxed font-medium">{problem.expertReply.content}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Clinic Sidebar */}
            <aside className="lg:col-span-4 space-y-6">
              <div className="bg-gradient-to-br from-primary to-primary-container rounded-2xl p-6 text-white relative overflow-hidden shadow-lg text-left">
                <h4 className="font-display text-base font-bold mb-4 relative z-10 tracking-tight">Livestock Helplines</h4>
                <div className="space-y-3 relative z-10">
                  <div className="w-full bg-white/10 p-3 rounded-xl flex justify-between items-center">
                    <span className="text-[10px] font-bold uppercase tracking-wider">Emergency Vet Line</span>
                    <span className="font-mono text-xs font-bold text-secondary-container">0800-AGRI-1</span>
                  </div>
                  <div className="w-full bg-white/10 p-3 rounded-xl flex justify-between items-center">
                    <span className="text-[10px] font-bold uppercase tracking-wider">Vaccine Alert SMS</span>
                    <span className="font-mono text-xs font-bold text-secondary-container">*8811#</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-outline-variant/40 shadow-sm text-left">
                <h4 className="font-bold text-primary text-xs uppercase tracking-wider mb-4 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-secondary text-[16px]">verified</span>
                  Verified Veterinarians
                </h4>
                <div className="space-y-4">
                  {[
                    { name: "Dr. Ahmed Raza", role: "Large Animal Surgeon" },
                    { name: "Dr. Maria Younas", role: "Dairy Nutrition Consultant" },
                    { name: "Dr. Kamran Qureshi", role: "Poultry Pathologist" }
                  ].map((vet, i) => (
                    <div key={i} className="flex items-center gap-3 group cursor-pointer">
                      <div className="w-9 h-9 rounded-xl bg-surface-container-low flex items-center justify-center font-bold text-primary text-xs group-hover:bg-primary group-hover:text-white transition-all">
                        {vet.name.split(" ").map(n => n[0]).slice(-2).join("")}
                      </div>
                      <div>
                        <div className="font-bold text-primary text-xs group-hover:text-secondary transition-colors">{vet.name}</div>
                        <div className="text-[9px] text-on-surface-variant/70 font-semibold uppercase tracking-wider">{vet.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export const Route = createFileRoute('/apps/animal-clinic')({
  head: () => ({
    title: "Animal Clinic | Veterinary Support | AgriBusiness",
    meta: [
      { name: "description", content: "24/7 expert veterinary guidance and clinical support for livestock health." },
      { property: "og:title", content: "AgriBusiness Animal Clinic" },
      { property: "og:description", content: "Expert veterinary support for Pakistan's livestock sector." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AnimalClinicPage,
});