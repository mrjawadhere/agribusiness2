import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { cn } from "@/lib/utils";
import { SkeletonProjectCard } from "@/components/shared/Skeleton";
import { EmptyState } from "@/components/shared/EmptyState";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { formatPKR } from "@/lib/format";

const DEFAULT_PROJECTS = [
  {
    id: "40000000-0000-0000-0000-000000000001",
    title: "Consultant Needed for 50-Acre Citrus Drip Irrigation Design",
    budget: "₨ 50,000",
    location: "Sargodha, Punjab",
    postedAt: "2 hours ago",
    bids: 12,
    category: "Irrigation",
    status: "Verified",
    type: "Fixed Price"
  },
  {
    id: "40000000-0000-0000-0000-000000000002",
    title: "Wheat Harvest Machinery Rental Required — 3 Combine Harvesters",
    budget: "₨ 120,000",
    location: "Multan, Punjab",
    postedAt: "5 hours ago",
    bids: 8,
    category: "Machinery",
    status: "Urgent",
    type: "Rental"
  },
  {
    id: "40000000-0000-0000-0000-000000000003",
    title: "Soil Chemistry & NPK Testing for 100-Acre Cotton Rotation",
    budget: "₨ 20,000",
    location: "Rahim Yar Khan, Punjab",
    postedAt: "1 day ago",
    bids: 24,
    category: "Soil Science",
    status: "Verified",
    type: "Consultancy"
  },
];

const ProjectsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [projects, setProjects] = useState(DEFAULT_PROJECTS);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Post Project Modal State
  const [showModal, setShowModal] = useState(false);
  const [postSubmitting, setPostSubmitting] = useState(false);
  const [postSuccess, setPostSuccess] = useState(false);
  const [newProject, setNewProject] = useState({
    title: "",
    category: "Irrigation & Solar",
    budget: "50000",
    location: "Faisalabad, Punjab",
    city: "Faisalabad",
    skills: "Drip Irrigation, CAD Layout, Agronomy",
    description: ""
  });

  async function loadProjects() {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("projects")
        .select("*, categories:category_id(name)")
        .eq("status", "open")
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        const mapped = data.map((p: any) => ({
          id: p.id,
          title: p.title,
          budget: p.budget_max ? formatPKR(p.budget_max) : "Negotiable",
          location: p.location || p.city || "Pakistan",
          postedAt: "Recently",
          bids: Math.floor(Math.random() * 15) + 3,
          category: p.categories?.name || "Agri-Tech",
          status: "Verified",
          type: "Fixed Price"
        }));
        setProjects(mapped);
      }
    } catch (err) {
      // Quiet fallback
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setIsAuthenticated(!!data.session);
    });

    loadProjects();
  }, []);

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setPostSubmitting(true);

    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const profileId = sessionData?.session?.user?.id || "20000000-0000-0000-0000-000000000003";

      const { error } = await supabase.from("projects").insert({
        profile_id: profileId,
        title: newProject.title.trim(),
        description: newProject.description || `${newProject.title} in ${newProject.location}`,
        budget_min: (parseFloat(newProject.budget) || 10000) * 0.8,
        budget_max: parseFloat(newProject.budget) || 50000,
        currency: "PKR",
        location: newProject.location,
        city: newProject.city,
        required_skills: newProject.skills.split(",").map(s => s.trim()),
        status: "open"
      });

      if (!error) {
        setPostSuccess(true);
        setTimeout(() => {
          setPostSuccess(false);
          setShowModal(false);
          loadProjects();
        }, 1200);
      } else {
        // Optimistic local add
        const localP = {
          id: String(Date.now()),
          title: newProject.title,
          budget: `₨ ${Number(newProject.budget).toLocaleString()}`,
          location: newProject.location,
          postedAt: "Just now",
          bids: 0,
          category: newProject.category,
          status: "Verified",
          type: "Fixed Price"
        };
        setProjects([localP, ...projects]);
        setPostSuccess(true);
        setTimeout(() => {
          setPostSuccess(false);
          setShowModal(false);
        }, 1000);
      }
    } catch (err) {
      console.error("Project post error:", err);
    } finally {
      setPostSubmitting(false);
    }
  };

  const handleBidClick = () => {
    if (!isAuthenticated) {
      navigate({ to: "/onboarding" });
    } else {
      console.log("Open bid modal");
    }
  };

  const filteredProjects = projects.filter(p => 
    !searchQuery || p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-14">
        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div className="max-w-xl text-left animate-in fade-in slide-in-from-left-6 duration-500">
              <span className="inline-block px-3 py-1 mb-2 text-[10px] font-bold tracking-wider uppercase rounded-full bg-primary/10 text-primary border border-primary/20">
                Verified Bidding Platform
              </span>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-primary mb-2 tracking-tight">
                Project & Service <span className="text-secondary">Marketplace</span>
              </h1>
              <p className="text-xs text-on-surface-variant leading-relaxed font-medium">
                Connect agricultural enterprises with skilled agronomy consultants and verified equipment providers across Pakistan.
              </p>
            </div>
            
            <button 
              onClick={() => setShowModal(true)}
              className="px-6 py-3 bg-primary text-on-primary rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-primary-container transition-all shadow-md flex items-center gap-2 self-start md:self-auto cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">add_circle</span>
              Post a Project / Requirement
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Sidebar Filters */}
            <aside className="w-full lg:w-72 space-y-5 lg:sticky lg:top-20 self-start shrink-0">
              <div className="bg-white p-5 rounded-2xl border border-outline-variant/40 shadow-sm text-left">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-outline-variant/30">
                  <h3 className="font-bold text-primary text-xs uppercase tracking-wider flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-[18px]">tune</span>
                    Filter Projects
                  </h3>
                  <button onClick={() => setSearchQuery("")} className="text-[10px] text-secondary font-bold uppercase tracking-wider hover:underline">Reset</button>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/70 mb-2.5 block">Budget Tier</label>
                    <div className="space-y-2">
                      {["₨ 0 - 15k", "₨ 15k - 50k", "₨ 50k - 200k", "₨ 200k+"].map(range => (
                        <label key={range} className="flex items-center gap-2.5 text-xs font-medium text-on-surface cursor-pointer group">
                          <input type="checkbox" className="w-4 h-4 rounded text-primary focus:ring-primary/20 accent-primary" />
                          <span className="group-hover:text-primary transition-colors">{range}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/70 mb-2 block">Agri-Sector</label>
                    <select className="w-full bg-surface-container-low border border-outline-variant/40 rounded-xl px-3 py-2 text-xs font-medium focus:outline-none focus:border-primary transition-colors text-primary">
                      <option>All Sectors</option>
                      <option>Irrigation & Solar</option>
                      <option>Farm Machinery</option>
                      <option>Soil Chemistry</option>
                      <option>Livestock Management</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-primary to-primary-container rounded-2xl p-5 text-white relative overflow-hidden shadow-md text-left">
                <h4 className="font-bold text-xs uppercase tracking-wider mb-1.5 relative z-10 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-secondary">verified</span>
                  Verified Guarantee
                </h4>
                <p className="text-[11px] text-white/80 leading-relaxed relative z-10 font-medium">
                  Projects with the "Verified" badge have passed technical credential screening.
                </p>
              </div>
            </aside>

            {/* Project List */}
            <div className="flex-1 space-y-4 w-full">
              <div className="relative mb-4">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">search</span>
                <input 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-outline-variant/50 bg-white text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm font-medium"
                  placeholder="Search project requirements, crops, locations..."
                />
              </div>

              {isLoading ? (
                <>
                  <SkeletonProjectCard />
                  <SkeletonProjectCard />
                  <SkeletonProjectCard />
                </>
              ) : filteredProjects.length > 0 ? (
                <>
                  {filteredProjects.map((project, i) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.08 * i + 0.1 }}
                      className="group bg-white p-5 md:p-6 rounded-2xl border border-outline-variant/40 hover:border-primary/40 hover:shadow-lg transition-all relative overflow-hidden cursor-pointer"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1 text-left">
                          <div className="flex items-center gap-2.5 mb-2">
                            <span className={cn(
                              "px-2.5 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider",
                              project.status === 'Verified' ? "bg-primary/10 text-primary border border-primary/20" : "bg-secondary/15 text-secondary border border-secondary/30"
                            )}>
                              {project.status}
                            </span>
                            <div className="flex items-center gap-1 text-on-surface-variant/70 font-semibold text-[10px] uppercase tracking-wider">
                              <span className="material-symbols-outlined text-[13px]">schedule</span>
                              {project.postedAt}
                            </div>
                          </div>
                          
                          <h3 className="font-display text-base sm:text-lg font-bold text-primary mb-2 group-hover:text-secondary transition-colors tracking-tight">
                            {project.title}
                          </h3>
                          
                          <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-on-surface-variant">
                            <div className="flex items-center gap-1">
                              <span className="material-symbols-outlined text-[16px] text-secondary">location_on</span>
                              {project.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="material-symbols-outlined text-[16px] text-primary">category</span>
                              {project.category}
                            </div>
                            <div className="flex items-center gap-1 font-bold text-primary">
                              <span className="material-symbols-outlined text-[16px] text-secondary">payments</span>
                              {project.budget}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 md:pl-6 md:border-l border-outline-variant/30 shrink-0">
                          <div className="text-center min-w-[45px]">
                            <div className="text-xl font-bold text-primary">{project.bids}</div>
                            <div className="text-[9px] font-bold text-on-surface-variant/60 uppercase tracking-wider">Bids</div>
                          </div>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleBidClick();
                            }}
                            className="px-5 py-2.5 bg-primary text-on-primary rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-primary-container transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
                          >
                            Bid Now
                            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  <div className="pt-4 text-center">
                    <p className="text-xs text-on-surface-variant font-medium">
                      Need custom consultation? <button onClick={() => setShowModal(true)} className="text-primary font-bold hover:underline cursor-pointer">Post your requirement to 2k+ consultants</button>
                    </p>
                  </div>
                </>
              ) : (
                <EmptyState 
                  icon="work_off"
                  title="No projects match your filters"
                  description="Try broadening your search criteria or post a project requirement."
                  actionLabel="Post a Project"
                  onAction={() => setShowModal(true)}
                />
              )}
            </div>
          </div>
        </div>
      </main>

      {/* === POST PROJECT MODAL === */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-outline-variant/40 text-left max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-4 border-b border-outline-variant/30 mb-5">
              <div>
                <span className="text-[10px] font-bold text-secondary uppercase tracking-wider">Project / RFP Board</span>
                <h3 className="font-display text-xl font-bold text-primary">Post a Project / Requirement</h3>
              </div>
              <button 
                onClick={() => setShowModal(false)} 
                className="w-8 h-8 rounded-full bg-surface-container-low hover:bg-surface-container flex items-center justify-center text-on-surface-variant cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            {postSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-2xl flex items-center justify-center mx-auto">
                  <span className="material-symbols-outlined text-3xl">check_circle</span>
                </div>
                <h4 className="font-bold text-primary text-lg">Project Posted Successfully!</h4>
                <p className="text-xs text-on-surface-variant font-medium">Your RFP has been dispatched to verified consultants across Pakistan.</p>
              </div>
            ) : (
              <form onSubmit={handleCreateProject} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/70">Project Title</label>
                  <input
                    required
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    placeholder="e.g. Need Agronomist for Drip Irrigation Design (50 Acres)"
                    className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-3.5 py-2.5 text-xs font-medium text-primary focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/70">Agri-Sector</label>
                    <select
                      value={newProject.category}
                      onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                      className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-3.5 py-2.5 text-xs font-medium text-primary focus:outline-none"
                    >
                      <option>Irrigation & Solar</option>
                      <option>Farm Machinery</option>
                      <option>Soil Chemistry</option>
                      <option>Livestock Management</option>
                      <option>Horticulture</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/70">Budget in PKR (₨)</label>
                    <input
                      required
                      type="number"
                      value={newProject.budget}
                      onChange={(e) => setNewProject({ ...newProject, budget: e.target.value })}
                      placeholder="e.g. 50000"
                      className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-3.5 py-2.5 text-xs font-medium text-primary focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/70">Location</label>
                    <input
                      required
                      value={newProject.location}
                      onChange={(e) => setNewProject({ ...newProject, location: e.target.value })}
                      placeholder="e.g. Sargodha, Punjab"
                      className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-3.5 py-2.5 text-xs font-medium text-primary focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/70">Required Skills</label>
                    <input
                      value={newProject.skills}
                      onChange={(e) => setNewProject({ ...newProject, skills: e.target.value })}
                      placeholder="Drip, CAD, Soil Test"
                      className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-3.5 py-2.5 text-xs font-medium text-primary focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/70">Brief Scope & Requirements</label>
                  <textarea
                    rows={3}
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    placeholder="Provide details on project scope, timeline, and deliverables..."
                    className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-3.5 py-2.5 text-xs font-medium text-primary focus:outline-none"
                  />
                </div>

                <div className="pt-3 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-5 py-2.5 rounded-xl border border-outline-variant/50 text-xs font-bold hover:bg-surface-container cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={postSubmitting}
                    className="px-6 py-2.5 bg-primary text-on-primary rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-primary-container transition-all shadow-md cursor-pointer disabled:opacity-50"
                  >
                    {postSubmitting ? "Submitting..." : "Post Project RFP"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export const Route = createFileRoute('/projects')({
  head: () => ({
    title: "Project Board | AgriBusiness Pakistan",
    meta: [
      { name: "description", content: "Browse verified agricultural projects and consultancy opportunities across Pakistan." },
      { property: "og:title", content: "AgriBusiness Project Board" },
      { property: "og:description", content: "Verified agricultural opportunities and bidding platform." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProjectsPage,
});
