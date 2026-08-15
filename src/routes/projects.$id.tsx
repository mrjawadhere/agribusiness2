import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { createFileRoute, useParams } from '@tanstack/react-router';
import { cn } from "@/lib/utils";

const MOCK_PROJECT = {
  id: "1",
  title: "Need Consultant for Drip Irrigation Setup",
  description: "We are looking for a professional consultant to design and oversee the installation of a drip irrigation system for a 50-acre citrus orchard. The project includes water source evaluation, system design, and contractor supervision.",
  budget: "₨ 50,000",
  location: "Multan, Punjab",
  postedAt: "2 hours ago",
  bidsCount: 12,
  category: "Irrigation",
  status: "Verified",
  client: {
    name: "Malik Agricultural Farms",
    joined: "Oct 2023",
    rating: 4.9,
    projectsPosted: 15,
    isVerified: true
  },
  requirements: [
    "Min 5 years experience in precision irrigation design",
    "Familiarity with local water table conditions in Multan",
    "Ability to provide technical CAD layouts and bills of quantity",
    "Availability for on-site verification visits"
  ],
  bids: [
    { id: "b1", user: "Engr. Salman", rating: 4.8, amount: "₨ 45,000", time: "1 hour ago" },
    { id: "b2", user: "Irrigation Pro Ltd", rating: 5.0, amount: "₨ 50,000", time: "30 mins ago" }
  ]
};

const ProjectDetailPage = () => {
  const { id } = useParams({ from: '/projects/$id' });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-14 text-left">
        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <div className="max-w-6xl mx-auto">
            
            {/* Project Header */}
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-8 space-y-6">
                <motion.div 
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white p-6 sm:p-8 rounded-3xl border border-outline-variant/40 shadow-sm relative overflow-hidden"
                >
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="px-2.5 py-0.5 rounded-md bg-primary/10 text-primary text-[9px] font-bold uppercase tracking-wider border border-primary/20">
                      {MOCK_PROJECT.status} Project
                    </span>
                    <div className="flex items-center gap-1 text-on-surface-variant/60 font-semibold text-[10px] uppercase tracking-wider">
                      <span className="material-symbols-outlined text-[14px]">schedule</span>
                      Posted {MOCK_PROJECT.postedAt}
                    </div>
                  </div>

                  <h1 className="font-display text-2xl sm:text-3xl font-bold text-primary mb-6 tracking-tight">
                    {MOCK_PROJECT.title}
                  </h1>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4 border-y border-outline-variant/30 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center text-secondary">
                        <span className="material-symbols-outlined text-[20px]">payments</span>
                      </div>
                      <div>
                        <div className="text-[9px] font-bold text-on-surface-variant/60 uppercase tracking-wider">Budget</div>
                        <div className="font-bold text-primary text-sm">{MOCK_PROJECT.budget}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center text-secondary">
                        <span className="material-symbols-outlined text-[20px]">location_on</span>
                      </div>
                      <div>
                        <div className="text-[9px] font-bold text-on-surface-variant/60 uppercase tracking-wider">Location</div>
                        <div className="font-bold text-primary text-sm">{MOCK_PROJECT.location}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center text-secondary">
                        <span className="material-symbols-outlined text-[20px]">category</span>
                      </div>
                      <div>
                        <div className="text-[9px] font-bold text-on-surface-variant/60 uppercase tracking-wider">Sector</div>
                        <div className="font-bold text-primary text-sm">{MOCK_PROJECT.category}</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-base font-bold text-primary mb-2 tracking-tight">Project Summary</h3>
                      <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed font-medium">
                        {MOCK_PROJECT.description}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-primary mb-3 tracking-tight">Technical Requirements</h3>
                      <ul className="space-y-2.5">
                        {MOCK_PROJECT.requirements.map((req, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-on-surface text-xs font-medium">
                            <span className="material-symbols-outlined text-secondary text-[18px] shrink-0">check_circle</span>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>

                {/* Proposal Management */}
                <motion.div 
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white p-6 sm:p-8 rounded-3xl border border-outline-variant/40 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-6 pb-3 border-b border-outline-variant/30">
                    <h2 className="text-base font-bold text-primary flex items-center gap-2 tracking-tight">
                      <span className="material-symbols-outlined text-secondary text-[20px]">mail</span>
                      Active Bids ({MOCK_PROJECT.bidsCount})
                    </h2>
                    <button className="text-[10px] font-bold text-primary uppercase tracking-wider flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">tune</span>
                      Sort
                    </button>
                  </div>

                  <div className="space-y-4">
                    {MOCK_PROJECT.bids.map((bid) => (
                      <div key={bid.id} className="p-4 sm:p-5 rounded-2xl bg-surface-container-low/50 border border-outline-variant/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:border-primary/30 transition-all">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-sm shadow-sm group-hover:bg-secondary group-hover:text-primary transition-colors">
                            {bid.user.charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-primary text-sm flex items-center gap-1.5">
                              {bid.user} 
                              <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-secondary/10 text-secondary text-[9px] font-bold">
                                <span className="material-symbols-outlined text-[10px] fill-secondary">star</span>
                                {bid.rating}
                              </div>
                            </div>
                            <div className="text-[10px] font-bold text-on-surface-variant/50 uppercase tracking-wider mt-0.5">{bid.time}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 sm:pl-6 sm:border-l border-outline-variant/30">
                          <div className="text-right">
                            <div className="text-sm font-bold text-primary">{bid.amount}</div>
                            <div className="text-[9px] font-bold text-on-surface-variant/50 uppercase tracking-wider">Proposed Bid</div>
                          </div>
                          <button className="px-4 py-2 bg-primary text-on-primary rounded-xl font-bold text-[10px] uppercase tracking-wider hover:bg-primary-container transition-all shadow-xs">
                            View Brief
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Action Sidebar - Fixed Sticky containment */}
              <aside className="lg:col-span-4 space-y-5 lg:sticky lg:top-20 self-start shrink-0 w-full">
                <div className="bg-white p-6 rounded-3xl border border-outline-variant/40 shadow-sm text-left">
                  <button className="w-full py-3.5 bg-primary text-on-primary rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-primary-container transition-all shadow-md flex items-center justify-center gap-2 mb-3">
                    <span className="material-symbols-outlined text-[18px]">send</span>
                    Submit Proposal
                  </button>
                  <p className="text-[9px] text-center font-bold text-on-surface-variant/50 uppercase tracking-wider mb-6">
                    Remaining Bid Quota: 5 Units
                  </p>

                  <div className="pt-4 border-t border-outline-variant/30">
                    <h4 className="text-[10px] font-bold text-on-surface-variant/70 uppercase tracking-wider mb-4">Client Insight</h4>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center border border-outline-variant/30">
                        <span className="material-symbols-outlined text-primary text-[20px]">corporate_fare</span>
                      </div>
                      <div>
                        <div className="font-bold text-primary text-xs flex items-center gap-1">
                          {MOCK_PROJECT.client.name}
                          {MOCK_PROJECT.client.isVerified && <span className="material-symbols-outlined text-secondary text-[14px]">verified</span>}
                        </div>
                        <div className="text-[10px] font-semibold text-on-surface-variant/60 uppercase tracking-wider mt-0.5">Active since {MOCK_PROJECT.client.joined}</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-xl font-bold text-primary">{MOCK_PROJECT.client.rating}</div>
                        <div className="text-[9px] font-bold text-on-surface-variant/50 uppercase tracking-wider">Client Rating</div>
                      </div>
                      <div>
                        <div className="text-xl font-bold text-primary">{MOCK_PROJECT.client.projectsPosted}</div>
                        <div className="text-[9px] font-bold text-on-surface-variant/50 uppercase tracking-wider">Hires Made</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-primary to-primary-container rounded-2xl p-5 text-white relative overflow-hidden shadow-md text-left">
                  <h4 className="font-bold text-xs uppercase tracking-wider mb-1.5 relative z-10 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-secondary">lock</span>
                    Secure Bidding
                  </h4>
                  <p className="text-[11px] text-white/80 leading-relaxed relative z-10 font-medium">
                    Verified projects have funds committed to AgriBusiness Escrow. Never share off-platform payment details.
                  </p>
                </div>
              </aside>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export const Route = createFileRoute('/projects/$id')({
  head: () => ({
    title: "Project Details | AgriBusiness Pakistan",
    meta: [
      { name: "description", content: "View detailed requirements and submit proposals for verified agricultural projects." },
      { property: "og:title", content: "AgriBusiness Project Details" },
      { property: "og:description", content: "Detailed project brief and bidding platform." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProjectDetailPage,
});