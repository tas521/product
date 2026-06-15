import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Compass, MapPin, BookOpen, Menu, X, Landmark, Lock, UserCheck, LogOut, ChevronDown } from 'lucide-react';

interface NavbarProps {
  activePage: string;
  setActivePage: (page: string) => void;
  onOpenBooking: () => void;
  currentUser: { uid: string; name: string; email: string; role: 'super_admin' | 'staff_admin' | 'client'; photoURL?: string | null } | null;
  onOpenLogin: () => void;
  onOpenDashboard: () => void;
  onLogout: () => void;
}

export default function Navbar({
  activePage,
  setActivePage,
  onOpenBooking,
  currentUser,
  onOpenLogin,
  onOpenDashboard,
  onLogout,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'visa-services', label: 'Visa Services' },
    { id: 'all-packages', label: 'All Packages' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'blog', label: 'Blog' },
    { id: 'delhi-office', label: 'Delhi Office' },
    { id: 'contact', label: 'Contact' },
  ];

  const mainDesktopItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'all-packages', label: 'All Packages' },
    { id: 'visa-services', label: 'Visa Services' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'blog', label: 'Blog' },
    { id: 'delhi-office', label: 'Delhi Office' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (pageId: string) => {
    setActivePage(pageId);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF8F5]/95 backdrop-blur-md shadow-xs border-b border-[#A37920]/20 py-2.5 text-[#10223b]'
          : 'bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#A37920]/10 py-4.5 text-[#10223b]'
      }`}
    >
      {/* Top micro bar for high-end luxury vibe */}
      <div 
        className={`transition-all duration-300 ease-in-out border-b border-[#A37920]/15 px-6 max-w-7xl mx-auto flex justify-between items-center text-[10px] text-[#10223b]/80 font-sans tracking-widest uppercase overflow-hidden ${
          isScrolled 
            ? 'max-h-0 opacity-0 pb-0 mb-0 pt-0 border-transparent select-none pointer-events-none' 
            : 'max-h-16 opacity-100 pb-2.5 mb-2.5'
        }`}
      >
        <div className="flex items-center gap-5">
          <span className="flex items-center gap-1.5 animate-fadeIn">
            <Phone className="w-3 h-3 text-amber-500" />
            <span>Delhi Office: <strong className="font-semibold text-[#10223b]">+91 82877 62995</strong></span>
          </span>
          <span className="hidden sm:inline text-amber-500/20">|</span>
          <span className="hidden sm:inline flex items-center gap-1.5">
            <MapPin className="w-3 h-3 text-amber-500" />
            <span>Ansari Road, Daryaganj, Delhi</span>
          </span>
        </div>
        <div className="flex items-center gap-4 font-serif italic text-amber-600 tracking-wide font-medium">
          <span>“Your Sacred Journey Begins With Trust”</span>
        </div>
      </div>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo Section */}
        <div
          id="brand-logo"
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="relative w-10 h-10 bg-gradient-to-br from-[#10223b] to-[#1B365D] flex items-center justify-center text-[#FAF8F5] font-serif border border-amber-500/20 shadow-md">
            <span className="text-sm font-medium leading-none">السفر</span>
            <div className="absolute inset-[2px] border border-amber-500/10" />
          </div>
          <div>
            <h1 className="text-lg font-serif tracking-[0.25em] text-[#10223b] font-semibold leading-none flex items-center gap-1">
              AL SAFAR
            </h1>
            <p className="text-[8px] uppercase tracking-[0.3em] text-amber-600 font-sans font-bold mt-1">
              HAJJ, UMRAH & LUXURY TRAVEL
            </p>
          </div>
        </div>

        {/* Desktop Navigation Items */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-2 shrink-0">
          {mainDesktopItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-1.5 text-[10px] xl:text-[11px] font-sans font-bold uppercase tracking-[0.2em] transition-all duration-300 relative cursor-pointer ${
                  isActive
                    ? 'text-amber-600'
                    : 'text-[#10223b]/75 hover:text-amber-600'
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-3 right-3 h-[1px] bg-amber-500"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Right CTA Button & Burger toggle */}
        <div className="flex items-center gap-3">
          {currentUser ? (
            <div className="flex items-center gap-1">
              <button
                id="my-journey-dashboard-cta"
                onClick={onOpenDashboard}
                className="inline-flex items-center gap-2 px-4.5 py-2 text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-[#10223b] hover:bg-amber-100/40 hover:text-amber-600 border border-amber-500/25 cursor-pointer shadow-xs transition-all duration-305"
              >
                {currentUser.photoURL ? (
                  <img
                    src={currentUser.photoURL}
                    alt={currentUser.name}
                    referrerPolicy="no-referrer"
                    className="w-4 h-4 rounded-full object-cover border border-amber-500 shrink-0"
                  />
                ) : (
                  <UserCheck className="w-3.5 h-3.5 text-amber-605" />
                )}
                <span>{currentUser.role === 'client' ? 'My Journey' : 'To Admin'}</span>
              </button>
              <button
                id="navbar-logout-btn"
                onClick={onLogout}
                className="p-2.5 text-[#10223b] hover:bg-rose-50 hover:text-rose-600 transition cursor-pointer"
                title="Log Out Session"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              id="navbar-signin-cta"
              onClick={onOpenLogin}
              className="inline-flex items-center gap-1.5 px-4.5 py-2 text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-[#10223b] hover:bg-amber-50 hover:text-amber-600 border border-amber-500/30 cursor-pointer shadow-xs transition-all duration-300"
            >
              <Lock className="w-3 h-3 text-amber-500" />
              Sign In
            </button>
          )}

          {/* Mobile menu button */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-[#1B365D] hover:text-[#1B365D]/80 hover:bg-[#1B365D]/5 rounded-lg cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Animated menu overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#F5F2ED] border-b border-[#1B365D]/15 w-full overflow-hidden absolute left-0 top-full mt-0 shadow-2xl px-6 py-4 flex flex-col gap-2 z-40"
          >
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`py-2 text-left text-sm font-semibold border-b border-[#1B365D]/10 transition-all w-full flex items-center justify-between cursor-pointer ${
                    isActive ? 'text-[#1B365D] pl-2 font-bold' : 'text-[#1B365D]/75'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <div className="w-1.5 h-1.5 rounded-full bg-[#1B365D]" />}
                </button>
              );
            })}
            <div className="pt-4 pb-2 flex flex-col gap-3">
              {currentUser ? (
                <div className="flex flex-col gap-2">
                  <button
                    id="mobile-nav-dashboard"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onOpenDashboard();
                    }}
                    className="w-full text-center py-2.5 text-xs font-bold text-[#1B365D] border border-[#1B365D]/30 bg-white hover:bg-[#1B365D]/5 tracking-widest uppercase"
                  >
                    {currentUser.role === 'client' ? 'My Journey Tracker' : 'Command Center'}
                  </button>
                  <button
                    id="mobile-nav-logout"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onLogout();
                    }}
                    className="w-full text-center py-2.5 text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 tracking-widest uppercase"
                  >
                    Sign Out Session
                  </button>
                </div>
              ) : (
                <button
                  id="mobile-nav-signin"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenLogin();
                  }}
                  className="w-full text-center py-2.5 text-xs font-bold text-[#1B365D] border border-[#1B365D]/30 bg-white hover:bg-[#1B365D]/5 tracking-widest uppercase"
                >
                  Sign In Account
                </button>
              )}

              <div className="flex justify-center gap-1 items-center text-[11px] text-[#1B365D]/70 font-semibold font-mono">
                <Phone className="w-3.5 h-3.5 text-amber-600" />
                <span>Delhi Hotline: +91 82877 62995</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
