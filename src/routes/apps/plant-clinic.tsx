import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { createFileRoute } from '@tanstack/react-router';
import { cn } from "@/lib/utils";

const MOCK_PROBLEMS = [
  {
    id: "1",
    user: "Ahmad J.",
    location: "Sahiwal",
    title: "Unknown pest on tomato leaves",
    description: "Seeing small white spots and holes on my tomato crops. Started 3 days ago.",
    media: ["https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?auto=format&fit=crop&q=80&w=400"],
    replies: 5,
    time: "1 hour ago",
    tags: ["Tomato", "Pest"],
    expertReply: {
      name: "Dr. Sarah K.",
      role: "Entomologist",
      content: "This looks like a spider mite infestation. Try increasing humidity and using a mild neem oil spray."
    }
  },
  {
    id: "2",
    user: "Farmer Ali",
    location: "Rahim Yar Khan",
    title: "Sudden wilting in wheat patch",
    description: "A small section of my wheat field is turning yellow and wilting. Watering is normal.",
    media: [],
    replies: 2,
    time: "3 hours ago",
    tags: ["Wheat", "Disease"]
  }
];

const PlantClinicPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-14">
        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          
          {/* Clinic Header */}
          <div className="max-w-4xl mx-auto mb-8 text-left animate-in fade-in slide-in-from-left-6 duration-500">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-md">
                <span className="material-symbols-outlined text-secondary-container text-2xl">psychiatry</span>
              </div>
              <div>
                <h1 className="font-display text-2xl md:text-3xl font-bold text-primary tracking-tight">Plant Health Clinic</h1>
                <p className="text-on-surface-variant font-bold text-[9px] uppercase tracking-wider">AI & Expert Agronomy Diagnosis</p>
              </div>
            </div>
            <p className="text-xs text-on-surface-variant max-w-2xl leading-relaxed font-medium">
              Diagnostic platform for crop health. Share symptoms, upload photos of pests, and get instant recommendations from verified agronomists.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
            {/* Clinical Feed */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Report Issue Card */}
              <div className="bg-white p-6 rounded-2xl border border-outline-variant/40 shadow-sm text-left">
                <h3 className="font-bold text-primary text-xs uppercase tracking-wider mb-4 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-secondary text-[18px]">add_circle</span>
                  Report Plant Symptoms
                </h3>
                <input 
                  placeholder="Problem Headline (e.g. Yellowing leaves on Mango in Multan)"
                  className="w-full mb-3 bg-surface-container-low border border-outline-variant/50 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-primary transition-all font-medium"
                />
                <textarea 
                  placeholder="Describe symptoms, affected crop acreage, and soil moisture conditions..."
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
                    Submit for Analysis
                  </button>
                </div>
              </div>

              {/* Cases List */}
              <div className="space-y-4">
                <div className="flex items-center justify-between px-1">
                  <h2 className="text-[10px] font-bold text-primary uppercase tracking-wider">Recent Case Reports</h2>
                  <button className="text-[10px] font-bold text-secondary uppercase tracking-wider flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">tune</span>
                    Filter
                  </button>
                </div>

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
                        <div className="w-9 h-9 rounded-xl bg-surface-container-low flex items-center justify-center font-bold text-primary border border-outline-variant/30 text-xs">
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
                    
                    {problem.media.length > 0 && (
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        {problem.media.map((m, idx) => (
                          <div key={idx} className="aspect-video rounded-xl overflow-hidden border border-outline-variant/40">
                            <img src={m} alt="Clinical evidence" className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex flex-wrap items-center gap-1.5 mb-4">
                      {problem.tags.map(tag => (
                        <span key={tag} className="px-2.5 py-0.5 rounded-md bg-surface-container-low text-[9px] font-bold text-primary uppercase tracking-wider border border-outline-variant/40">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Expert Intervention */}
                    {problem.expertReply && (
                      <div className="pl-4 border-l-2 border-primary/30 space-y-2">
                        <div className="flex gap-3">
                          <div className="w-8 h-8 rounded-lg bg-primary text-on-primary flex items-center justify-center shrink-0 shadow-sm">
                            <span className="material-symbols-outlined text-xs">psychiatry</span>
                          </div>
                          <div className="flex-1 bg-surface-container-low/60 p-4 rounded-xl rounded-tl-none border border-outline-variant/30">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-bold text-primary text-xs">{problem.expertReply.name}</span>
                              <span className="px-2 py-0.5 rounded bg-secondary text-primary text-[8px] font-bold uppercase tracking-wider">Verified Agronomist</span>
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

            {/* Sidebar Stats & Experts */}
            <aside className="lg:col-span-4 space-y-6">
              <div className="bg-gradient-to-br from-primary to-primary-container rounded-2xl p-6 text-white relative overflow-hidden shadow-lg text-left">
                <h4 className="font-display text-base font-bold mb-4 relative z-10 tracking-tight">Clinic Intelligence</h4>
                <div className="space-y-3 relative z-10">
                  <div className="flex justify-between items-center border-b border-white/10 pb-2.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/70">Resolved Cases</span>
                    <span className="font-mono text-base font-bold">1,420</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/10 pb-2.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/70">Active Agronomists</span>
                    <span className="font-mono text-base font-bold">42</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/70">Avg Turnaround</span>
                    <span className="font-mono text-base font-bold text-secondary-container">15 mins</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-outline-variant/40 shadow-sm text-left">
                <h4 className="font-bold text-primary text-xs uppercase tracking-wider mb-4 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-secondary text-[16px]">verified</span>
                  Available Agronomists
                </h4>
                <div className="space-y-4">
                  {[
                    { name: "Dr. Sarah Khan", role: "Plant Pathologist" },
                    { name: "Prof. Tariq Mahmood", role: "Soil Fertility Specialist" },
                    { name: "Engr. Bilal Shah", role: "Irrigation Expert" }
                  ].map((doc, i) => (
                    <div key={i} className="flex items-center gap-3 group cursor-pointer">
                      <div className="w-9 h-9 rounded-xl bg-surface-container-low flex items-center justify-center font-bold text-primary text-xs group-hover:bg-primary group-hover:text-white transition-all">
                        {doc.name.split(" ").map(n => n[0]).slice(-2).join("")}
                      </div>
                      <div>
                        <div className="font-bold text-primary text-xs group-hover:text-secondary transition-colors">{doc.name}</div>
                        <div className="text-[9px] text-on-surface-variant/70 font-semibold uppercase tracking-wider">{doc.role}</div>
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

export const Route = createFileRoute('/apps/plant-clinic')({
  head: () => ({
    title: "Plant Clinic | AI-Powered Agronomy | AgriBusiness",
    meta: [
      { name: "description", content: "Diagnostic platform for crop health and expert agronomy recommendations." },
      { property: "og:title", content: "AgriBusiness Plant Clinic" },
      { property: "og:description", content: "Get expert advice and AI-powered diagnosis for your crops." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PlantClinicPage,
});