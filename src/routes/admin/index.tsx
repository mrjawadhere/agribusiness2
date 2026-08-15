import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { getSession } from "@/lib/auth.functions";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/admin/")({
  loader: async () => {
    try {
      const session = await getSession();
      return { session };
    } catch (e) {
      return { session: null };
    }
  },
  head: () => ({
    title: "Admin Core | AgriBusiness Governance",
    meta: [
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminLayout,
});

function AdminLayout() {
  const [activeTab, setActiveTab] = useState("ads");

  const sidebarItems = [
    { id: "overview", icon: "dashboard", label: "Overview" },
    { id: "ads", icon: "layers", label: "Ad Approvals" },
    { id: "users", icon: "group", label: "User Moderation" },
    { id: "roles", icon: "shield_person", label: "Roles & Permissions" },
    { id: "categories", icon: "verified_user", label: "Categories" },
    { id: "revenue", icon: "payments", label: "Revenue" },
  ];

  return (
    <div className="min-h-screen bg-surface flex text-left">
      {/* Admin Sidebar */}
      <aside className="w-72 bg-primary text-white flex flex-col fixed inset-y-0 shadow-2xl z-50">
        <div className="p-8 flex items-center gap-4 border-b border-white/10">
          <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
            <span className="material-symbols-outlined text-primary font-bold">admin_panel_settings</span>
          </div>
          <span className="font-display font-bold text-xl tracking-tight uppercase">Admin Core</span>
        </div>

        <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-4 px-6 py-4 rounded-xl transition-all text-[11px] font-bold uppercase tracking-widest",
                activeTab === item.id 
                  ? "bg-secondary text-primary shadow-lg shadow-secondary/10" 
                  : "text-white/60 hover:bg-white/5 hover:text-white"
              )}
            >
              <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-white/10 space-y-2">
          <button className="w-full flex items-center gap-4 px-6 py-4 rounded-xl text-white/60 hover:bg-white/5 hover:text-white transition-all text-[11px] font-bold uppercase tracking-widest">
            <span className="material-symbols-outlined text-[20px]">settings</span>
            System
          </button>
          <button className="w-full flex items-center gap-4 px-6 py-4 rounded-xl text-secondary hover:bg-white/5 transition-all text-[11px] font-bold uppercase tracking-widest">
            <span className="material-symbols-outlined text-[20px]">logout</span>
            Exit Admin
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 ml-72 flex flex-col min-h-screen">
        <header className="h-20 bg-white border-b border-outline-variant/30 px-10 flex items-center justify-between sticky top-0 z-40 shadow-sm">
          <div className="flex items-center gap-4 bg-surface-container-low px-6 py-3 rounded-xl w-96 border border-outline-variant/30">
            <span className="material-symbols-outlined text-on-surface-variant/60 text-[20px]">search</span>
            <input 
              className="bg-transparent border-none outline-none text-xs font-medium w-full" 
              placeholder="Search global records..." 
            />
          </div>
          
          <div className="flex items-center gap-8">
            <button className="relative p-2 text-on-surface-variant hover:text-primary transition-colors">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-secondary rounded-full border-2 border-white" />
            </button>
            <div className="flex items-center gap-4 pl-8 border-l border-outline-variant/30">
              <div className="text-right">
                <div className="text-[11px] font-bold text-primary uppercase tracking-widest">Master Admin</div>
                <div className="text-[9px] text-on-surface-variant font-bold uppercase tracking-widest mt-0.5">Control Center</div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-sm shadow-lg shadow-primary/20">
                AD
              </div>
            </div>
          </div>
        </header>

        <main className="p-10 animate-in fade-in duration-700">
          <div className="max-w-7xl mx-auto">
            
            {/* Page Title */}
            <div className="mb-12 flex items-center justify-between">
              <div>
                <h1 className="font-display text-3xl font-bold text-primary tracking-tight capitalize">{activeTab} Console</h1>
                <p className="text-on-surface-variant text-xs font-bold uppercase tracking-widest mt-2 opacity-60">AgriBusiness Platform Governance</p>
              </div>
              <div className="flex gap-4">
                <button className="px-6 py-3 border border-outline-variant/50 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-surface-container-low transition-colors">
                  System Logs
                </button>
                <button className="px-6 py-3 bg-primary text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-primary-container transition-all shadow-lg shadow-primary/10">
                  Export Data
                </button>
              </div>
            </div>

            {/* Dashboard Stats (Overview only) */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                {[
                  { label: "Total Users", value: "52,492", change: "+12%", icon: "group" },
                  { label: "Active Ads", value: "1,204", change: "+5%", icon: "layers" },
                  { label: "Market Vol", value: "Rs. 4.8M", change: "+24%", icon: "payments" },
                  { label: "Health Index", value: "98.2%", change: "Stable", icon: "shield" },
                ].map((stat, i) => (
                  <div key={i} className="bg-white p-8 rounded-[2rem] border border-outline-variant/30 shadow-sm group hover:border-primary/20 transition-all">
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-xl bg-surface-container-low text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                        <span className="material-symbols-outlined">{stat.icon}</span>
                      </div>
                      <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">{stat.change}</span>
                    </div>
                    <div className="text-2xl font-bold text-primary tracking-tight mb-1">{stat.value}</div>
                    <div className="text-[9px] font-bold text-on-surface-variant/60 uppercase tracking-widest">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Approval Queue Table */}
            {activeTab === 'ads' && (
              <div className="bg-white rounded-[2.5rem] border border-outline-variant/30 overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container-low text-on-surface-variant/60 uppercase text-[9px] tracking-[0.2em] font-bold">
                      <th className="px-10 py-6">Listing / Advertiser</th>
                      <th className="px-10 py-6">Sector</th>
                      <th className="px-10 py-6">Financials</th>
                      <th className="px-10 py-6">Status</th>
                      <th className="px-10 py-6">Control</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/20">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <tr key={i} className="hover:bg-surface-container-low/30 transition-colors group">
                        <td className="px-10 py-6">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center border border-primary/10">
                              <span className="material-symbols-outlined text-primary text-[20px]">inventory_2</span>
                            </div>
                            <div>
                              <p className="text-sm font-bold text-primary">Winter Wheat Seeds 2026</p>
                              <p className="text-[9px] text-on-surface-variant font-bold uppercase tracking-widest mt-0.5">ID: #PUB-0{i}82</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-10 py-6">
                          <span className="px-3 py-1 rounded-lg bg-surface-container-low text-[9px] font-bold text-primary uppercase tracking-widest border border-outline-variant/30">
                            Commodities
                          </span>
                        </td>
                        <td className="px-10 py-6">
                          <p className="text-sm font-bold text-primary">PKR 45,000</p>
                          <p className="text-[9px] text-on-surface-variant font-bold uppercase tracking-widest mt-0.5">Budget Cap</p>
                        </td>
                        <td className="px-10 py-6">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                            <span className="text-[9px] font-bold text-primary uppercase tracking-widest">Pending Review</span>
                          </div>
                        </td>
                        <td className="px-10 py-6">
                          <div className="flex items-center gap-3">
                            <button className="w-10 h-10 rounded-lg bg-primary/5 text-primary hover:bg-primary hover:text-white transition-all flex items-center justify-center border border-primary/10">
                              <span className="material-symbols-outlined text-[18px]">done_all</span>
                            </button>
                            <button className="w-10 h-10 rounded-lg bg-error/5 text-error hover:bg-error hover:text-white transition-all flex items-center justify-center border border-error/10">
                              <span className="material-symbols-outlined text-[18px]">close</span>
                            </button>
                            <button className="w-10 h-10 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-colors flex items-center justify-center">
                              <span className="material-symbols-outlined text-[18px]">more_vert</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Roles & Permissions Management */}
            {activeTab === 'roles' && (
              <div className="space-y-8">
                <div className="bg-white rounded-[2.5rem] border border-outline-variant/30 overflow-hidden shadow-sm">
                  <div className="px-10 py-8 border-b border-outline-variant/20 flex justify-between items-center bg-surface-container-lowest">
                    <div>
                      <h3 className="text-lg font-bold text-primary tracking-tight">System Roles</h3>
                      <p className="text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-widest mt-1">Define platform-wide user capabilities</p>
                    </div>
                    <button className="px-6 py-3 bg-secondary text-primary rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-all shadow-lg shadow-secondary/10 flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px]">add</span> Create Role
                    </button>
                  </div>
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-surface-container-low text-on-surface-variant/60 uppercase text-[9px] tracking-[0.2em] font-bold">
                        <th className="px-10 py-6">Role Name</th>
                        <th className="px-10 py-6">User Count</th>
                        <th className="px-10 py-6">Permissions</th>
                        <th className="px-10 py-6">Status</th>
                        <th className="px-10 py-6 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant/20">
                      {[
                        { name: 'Admin', count: 42, color: 'bg-primary', icon: 'shield_person', perms: ['Full Access', 'System Config', 'User Mod'] },
                        { name: 'Consultant', count: 842, color: 'bg-tech-blue', icon: 'psychology', perms: ['Professional Profile', 'Market Insights', 'Direct Messaging'] },
                        { name: 'Farmer', count: 12402, color: 'bg-forest-green', icon: 'agriculture', perms: ['Create Listings', 'Trade Access', 'Basic Tools'] },
                        { name: 'Student', count: 32048, color: 'bg-secondary', icon: 'school', perms: ['Learning Hub', 'View Market', 'Community Access'] },
                      ].map((role) => (
                        <tr key={role.name} className="hover:bg-surface-container-low/30 transition-colors group">
                          <td className="px-10 py-6">
                            <div className="flex items-center gap-4">
                              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-sm", role.color)}>
                                <span className="material-symbols-outlined text-[20px]">{role.icon}</span>
                              </div>
                              <span className="text-sm font-bold text-primary">{role.name}</span>
                            </div>
                          </td>
                          <td className="px-10 py-6">
                            <span className="text-sm font-bold text-primary">{role.count.toLocaleString()}</span>
                            <span className="text-[9px] text-on-surface-variant font-bold uppercase tracking-widest block mt-0.5">Verified users</span>
                          </td>
                          <td className="px-10 py-6">
                            <div className="flex flex-wrap gap-2">
                              {role.perms.map(p => (
                                <span key={p} className="px-2.5 py-1 rounded-lg bg-surface-container-low text-[8px] font-bold text-primary uppercase tracking-widest border border-outline-variant/30">
                                  {p}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="px-10 py-6">
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-secondary" />
                              <span className="text-[9px] font-bold text-primary uppercase tracking-widest">Active</span>
                            </div>
                          </td>
                          <td className="px-10 py-6 text-right">
                            <button className="text-[10px] font-bold text-primary uppercase tracking-widest hover:text-secondary transition-colors underline decoration-2 underline-offset-4">
                              Edit Capabilities
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white rounded-[2.5rem] border border-outline-variant/30 p-10 shadow-sm">
                    <h3 className="text-lg font-bold text-primary tracking-tight mb-2">Permission Templates</h3>
                    <p className="text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-widest mb-8">Quick-apply capability bundles</p>
                    <div className="space-y-4">
                      {['Trading Access', 'Professional Verification', 'Content Management'].map(template => (
                        <div key={template} className="flex items-center justify-between p-6 bg-surface-container-lowest rounded-2xl border border-outline-variant/20 hover:border-primary/30 transition-all group cursor-pointer">
                          <div className="flex items-center gap-4">
                            <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">description</span>
                            <span className="text-xs font-bold text-primary">{template}</span>
                          </div>
                          <span className="material-symbols-outlined text-[18px] text-outline-variant">chevron_right</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-primary rounded-[2.5rem] p-10 text-white relative overflow-hidden">
                    <div className="relative z-10">
                      <h3 className="text-lg font-bold mb-2">Audit Logs</h3>
                      <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest mb-8">Security & role change tracking</p>
                      <div className="space-y-6">
                        {[
                          { action: 'Role Updated', user: 'Admin DS', target: 'Consultant', time: '2m ago' },
                          { action: 'New Permissions', user: 'System', target: 'Student', time: '1h ago' },
                        ].map((log, i) => (
                          <div key={i} className="flex gap-4">
                            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                              <span className="material-symbols-outlined text-[16px] text-secondary">history</span>
                            </div>
                            <div>
                              <p className="text-xs font-bold">{log.action}: {log.target}</p>
                              <p className="text-[9px] text-white/40 font-bold uppercase tracking-widest mt-0.5">by {log.user} • {log.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <span className="material-symbols-outlined absolute -bottom-8 -right-8 text-[120px] text-white/5 -rotate-12">policy</span>
                  </div>
                </div>
              </div>
            )}

            {/* Empty State for other tabs */}
            {(activeTab !== 'ads' && activeTab !== 'overview' && activeTab !== 'roles') && (
              <div className="bg-white rounded-[2.5rem] border-2 border-dashed border-outline-variant/40 p-32 text-center opacity-50">
                <span className="material-symbols-outlined text-outline-variant text-[64px] mb-6">engineering</span>
                <h3 className="text-xl font-bold text-primary tracking-tight">Governance Module Pending</h3>
                <p className="text-on-surface-variant text-[10px] font-bold uppercase tracking-widest mt-2 leading-relaxed">
                  The {activeTab} administrative interface is currently being optimized for platform-wide deployment.
                </p>
              </div>
            )}
            
          </div>
        </main>
      </div>
    </div>
  );
}