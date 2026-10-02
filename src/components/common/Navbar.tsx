import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { LanguageSelector } from './LanguageSelector';
import { useLanguage } from '../../context/LanguageContext';
import {
  Menu,
  X,
  Sparkles,
  Leaf,
  ScanLine,
  BarChart3,
  MessageSquare,
  BookOpen,
  Cpu,
  LayoutDashboard,
  ArrowRight,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { to: '/', label: t.navHome, icon: Leaf },
    { to: '/disease-detection', label: t.navDisease, icon: ScanLine },
    { to: '/farm-analytics', label: t.navAnalytics, icon: BarChart3 },
    { to: '/ai-assistant', label: t.navAssistant, icon: MessageSquare },
    { to: '/knowledge', label: t.navKnowledge, icon: BookOpen },
    { to: '/how-it-works', label: t.navHowItWorks, icon: Cpu },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-white/85 backdrop-blur-md shadow-sm border-b border-emerald-900/10'
          : 'bg-[#F7F5F0]/90 backdrop-blur-sm border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group focus:outline-none">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-800 to-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-900/20 group-hover:scale-105 transition-transform duration-200">
              <Leaf className="w-6 h-6 text-emerald-100" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-extrabold text-xl sm:text-2xl text-stone-900 tracking-tight">
                  AgriSense<span className="text-emerald-600">.AI</span>
                </span>
                <span className="text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300/60 uppercase">
                  v2.0
                </span>
              </div>
              <p className="text-[11px] text-stone-500 hidden sm:block -mt-1 font-medium">
                ML • RAG • GenAI Platform
              </p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-emerald-800 text-white shadow-sm shadow-emerald-900/10'
                        : 'text-stone-700 hover:text-emerald-900 hover:bg-emerald-50/60'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 opacity-80" />
                  <span>{link.label}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Right Action Items */}
          <div className="hidden lg:flex items-center gap-3">
            <LanguageSelector />
            
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold text-stone-700 hover:text-emerald-900 hover:bg-stone-100 transition-colors border border-stone-200"
            >
              <LayoutDashboard className="w-4 h-4 text-emerald-700" />
              <span>Dashboard</span>
            </Link>

            <Link
              to="/disease-detection"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-emerald-700 to-emerald-600 hover:from-emerald-800 hover:to-emerald-700 shadow-md shadow-emerald-900/15 hover:shadow-glow-sm transition-all duration-200 group"
            >
              <Sparkles className="w-4 h-4 text-emerald-200 group-hover:rotate-12 transition-transform" />
              <span>Analyze Crop</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <LanguageSelector compact />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-100 focus:outline-none"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-stone-200 bg-white/95 backdrop-blur-xl px-4 pt-3 pb-6 animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-1.5 mb-5">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                      isActive
                        ? 'bg-emerald-800 text-white shadow-sm'
                        : 'text-stone-800 hover:bg-emerald-50'
                    }`
                  }
                >
                  <Icon className="w-5 h-5 opacity-90" />
                  <span>{link.label}</span>
                </NavLink>
              );
            })}
          </div>

          <div className="pt-4 border-t border-stone-100 flex flex-col gap-3">
            <Link
              to="/dashboard"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-stone-800 bg-stone-100 hover:bg-stone-200 transition-colors"
            >
              <LayoutDashboard className="w-4 h-4 text-emerald-700" />
              <span>Open Farm Dashboard</span>
            </Link>
            <Link
              to="/disease-detection"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-800 shadow-md shadow-emerald-900/20"
            >
              <Sparkles className="w-4 h-4 text-emerald-200" />
              <span>Start Crop Disease Analysis</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
