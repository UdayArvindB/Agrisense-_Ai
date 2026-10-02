import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  ScanLine,
  BarChart3,
  MessageSquare,
  BookOpen,
  FileCheck,
  Settings,
  Leaf,
  Home,
  Sparkles,
} from 'lucide-react';
import { DemoBadge } from '../common/DemoBadge';

export const Sidebar: React.FC = () => {
  const links = [
    { to: '/dashboard', label: 'Overview', icon: LayoutDashboard },
    { to: '/disease-detection', label: 'Disease Detection', icon: ScanLine },
    { to: '/farm-analytics', label: 'Farm Analytics', icon: BarChart3 },
    { to: '/ai-assistant', label: 'AI Assistant', icon: MessageSquare },
    { to: '/knowledge', label: 'Knowledge Hub', icon: BookOpen },
    { to: '/reports', label: 'Reports', icon: FileCheck },
    { to: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-stone-900 text-stone-300 min-h-screen flex flex-col justify-between border-r border-stone-800 shrink-0">
      <div className="p-6">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-emerald-400 text-stone-950 flex items-center justify-center font-bold shadow-md shadow-emerald-950/30">
            <Leaf className="w-5 h-5 text-emerald-950" />
          </div>
          <div>
            <h2 className="font-display font-extrabold text-xl text-white tracking-tight leading-none">
              AgriSense<span className="text-emerald-400">.AI</span>
            </h2>
            <span className="text-[10px] text-stone-400 font-mono">Farm Operations Hub</span>
          </div>
        </Link>

        {/* Navigation items */}
        <nav className="space-y-1.5">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-emerald-700 text-white shadow-md shadow-emerald-950/20'
                      : 'text-stone-400 hover:text-white hover:bg-stone-800/80'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{link.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom Area */}
      <div className="p-6 border-t border-stone-800 space-y-4">
        <Link
          to="/"
          className="flex items-center gap-2 text-xs font-semibold text-stone-400 hover:text-white transition-colors"
        >
          <Home className="w-4 h-4" />
          <span>Back to Landing Page</span>
        </Link>

        <div className="p-3.5 rounded-2xl bg-stone-800/70 border border-stone-700/60">
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Hackathon Demo Mode</span>
          </div>
          <p className="text-[11px] text-stone-400 leading-tight">
            All AI inferences and vector searches are locally simulated.
          </p>
        </div>
      </div>
    </aside>
  );
};
