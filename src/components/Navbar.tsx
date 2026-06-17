import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Compass, MapPin, BookOpen, Menu, X, Landmark, Lock, UserCheck, LogOut, ChevronDown, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  activePage: string;
  setActivePage: (page: string) => void;
  onOpenBooking: () => void;
  currentUser: { uid: string; name: string; email: string; role: 'super_admin' | 'staff_admin' | 'client'; photoURL?: string | null } | null;
  onOpenLogin: () => void;
  onOpenDashboard: () => void;
  onLogout: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export default function Navbar({
  activePage,
  setActivePage,
  onOpenBooking,
  currentUser,
  onOpenLogin,
  onOpenDashboard,
  onLogout,
  isDarkMode,
  onToggleTheme,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      const winScroll = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      setScrollProgress(scrolled);
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? isDarkMode
            ? 'bg-[#09121f]/95 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5),_0_1px_2px_rgba(251,191,36,0.15)] border-b border-amber-400/40 py-2.5 text-slate-100'
            : 'bg-[#FAF8F5]/96 backdrop-blur-xl shadow-[0_10px_30px_-10px_rgba(27,54,93,0.15),_0_1px_3px_rgba(163,121,32,0.22)] border-b border-[#A37920]/30 py-3 text-[#10223b]'
          : isDarkMode
            ? 'bg-[#09121f]/90 backdrop-blur-md border-b border-white/5 py-4.5 text-slate-100'
            : 'bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#A37920]/10 py-5.5 text-[#10223b]'
      }`}
    >
      {/* Decorative shimmering laser top line on sticky view */}
      {isScrolled && (
        <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-amber-500 via-amber-300 to-[#A37920] shadow-[0_1px_8px_rgba(245,158,11,0.4)] animate-pulse z-50" />
      )}

      {/* Top micro bar for high-end luxury vibe */}
      <div 
        className={`transition-all duration-500 ease-in-out border-b px-4 sm:px-8 lg:px-10 xl:px-12 w-full max-w-[1440px] xl:max-w-[1600px] mx-auto flex justify-between items-center text-[10px] font-sans tracking-widest uppercase overflow-hidden ${
          isDarkMode ? 'border-white/5 text-slate-300' : 'border-[#A37920]/15 text-[#10223b]/80'
        } ${
          isScrolled 
            ? 'max-h-0 opacity-0 pb-0 mb-0 pt-0 border-transparent select-none pointer-events-none' 
            : 'max-h-16 opacity-100 pb-3 mb-3'
        }`}
      >
        <div className="flex items-center gap-5">
          <span className="flex items-center gap-1.5 animate-fadeIn">
            <Phone className="w-3 h-3 text-amber-500 animate-bounce" />
            <span>Delhi Office: <strong className={`font-semibold ${isDarkMode ? 'text-amber-400' : 'text-[#10223b]'}`}>+91 82877 62995</strong></span>
          </span>
          <span className={`hidden sm:inline ${isDarkMode ? 'text-white/10' : 'text-amber-500/20'}`}>|</span>
          <span className="hidden sm:inline flex items-center gap-1.5">
            <MapPin className="w-3 h-3 text-amber-500" />
            <span>Ansari Road, Daryaganj, Delhi</span>
          </span>
        </div>
        <div className={`flex items-center gap-4 font-serif italic tracking-[0.12em] font-medium text-[9px] sm:text-[10px] ${isDarkMode ? 'text-amber-400' : 'text-amber-600'}`}>
          <span>“YOUR SACRED JOURNEY BEGINS WITH TRUST”</span>
        </div>
      </div>

      <nav className="w-full max-w-[1440px] xl:max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-10 xl:px-12 flex items-center justify-between">
        {/* Logo Section */}
        <div
          id="brand-logo"
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2.5 cursor-pointer group shrink-0"
        >
          <div className={`relative bg-gradient-to-br from-[#10223b] to-[#1B365D] flex items-center justify-center text-[#FAF8F5] font-serif border border-amber-500/20 shadow-md group-hover:scale-105 transition-all duration-500 ${
            isScrolled ? 'w-8 h-8' : 'w-10 h-10'
          }`}>
            <span className={`font-medium leading-none transition-all duration-500 ${isScrolled ? 'text-xs' : 'text-sm'}`}>السفر</span>
            <div className="absolute inset-[2px] border border-amber-500/15" />
          </div>
          <div>
            <h1 className={`font-serif tracking-[0.25em] font-semibold leading-none flex items-center gap-1 transition-all duration-500 ${
              isScrolled ? 'text-base' : 'text-lg'
            } ${isDarkMode ? 'text-amber-400' : 'text-[#10223b]'}`}>
              AL SAFAR
            </h1>
            <p className={`uppercase tracking-[0.3em] font-sans font-bold transition-all duration-500 ${
              isScrolled ? 'text-[7px] mt-1' : 'text-[8px] mt-1.5'
            } ${isDarkMode ? 'text-amber-400/90' : 'text-amber-600'}`}>
              HAJJ, UMRAH & LUXURY TRAVEL
            </p>
          </div>
        </div>

        {/* Desktop Navigation Items */}
        <div className="hidden xl:flex items-center gap-1 xl:gap-1.5 2xl:gap-3.5 justify-center flex-1 mx-2 xl:mx-4">
          {mainDesktopItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`px-1.5 xl:px-2 py-1.5 text-[9.5px] xl:text-[9.5px] 2xl:text-[11px] font-sans font-bold uppercase tracking-[0.16em] xl:tracking-[0.2em] transition-all duration-350 relative cursor-pointer shrink-0 ${
                  isActive
                    ? isDarkMode ? 'text-amber-400 font-extrabold' : 'text-[#A37920] font-extrabold'
                    : isDarkMode
                      ? 'text-slate-300/80 hover:text-amber-400'
                      : 'text-[#10223b]/75 hover:text-[#A37920]'
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className={`absolute bottom-0 left-1.5 right-1.5 h-[1.5px] ${isDarkMode ? 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]' : 'bg-[#A37920]'}`}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Right CTA Button & Burger toggle */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Theme Switcher Toggle */}
          <button
            onClick={onToggleTheme}
            id="site-theme-toggle-btn"
            title="Toggle theme mode"
            className={`w-9 h-9 sm:w-10 sm:h-10 border transition duration-300 cursor-pointer flex items-center justify-center shrink-0 ${
              isDarkMode
                ? 'border-white/10 bg-[#10223b]/90 hover:bg-[#10223b] text-amber-400'
                : 'border-[#1B365D]/10 bg-white hover:bg-slate-50 text-slate-700 shadow-sm'
            }`}
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4 text-[#1B365D]" />}
          </button>
          {currentUser ? (
            <div className="hidden sm:flex items-center gap-1.5">
              <button
                id="my-journey-dashboard-cta"
                onClick={onOpenDashboard}
                className={`inline-flex items-center gap-2 px-3 py-2 text-[9.5px] 2xl:text-[10px] font-sans font-bold uppercase tracking-[0.15em] border transition-all duration-300 cursor-pointer ${
                  isDarkMode
                    ? 'border-white/10 bg-white/5 hover:bg-white/10 text-slate-100'
                    : 'border-[#1B365D]/10 bg-white hover:bg-slate-50 text-[#1B365D] shadow-sm'
                }`}
              >
                {currentUser.photoURL ? (
                  <img
                    src={currentUser.photoURL}
                    alt={currentUser.name}
                    referrerPolicy="no-referrer"
                    className="w-4.5 h-4.5 rounded-full object-cover border border-[#1B365D]/20 shrink-0"
                  />
                ) : (
                  <div className="w-4.5 h-4.5 rounded-full bg-[#5C6BC0] text-white flex items-center justify-center text-[8px] font-sans font-extrabold shrink-0 uppercase">
                    {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : (currentUser.email ? currentUser.email.charAt(0).toUpperCase() : 'U')}
                  </div>
                )}
                <span className="font-serif tracking-wider font-semibold text-[9.5px] 2xl:text-[10px]">{currentUser.role === 'client' ? 'My Journey' : 'To Admin'}</span>
              </button>
              <button
                id="navbar-logout-btn"
                onClick={onLogout}
                className={`p-2 hover:scale-105 transition duration-300 cursor-pointer ${
                  isDarkMode ? 'text-amber-400 hover:text-amber-300' : 'text-[#10223b] hover:text-[#A37920]'
                }`}
                title="Log Out Session"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              id="navbar-signin-cta"
              onClick={onOpenLogin}
              className={`hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-[9.5px] 2xl:text-[10px] font-sans font-bold uppercase tracking-[0.15em] border transition-all duration-300 cursor-pointer shadow-xs ${
                isDarkMode
                  ? 'border-amber-400/30 bg-[#10223b] hover:bg-white/5 text-amber-400'
                  : 'border-[#1B365D]/10 bg-white hover:bg-amber-50 text-[#1B365D]'
              }`}
            >
              <Lock className="w-3 h-3 text-amber-500" />
              <span>Sign In</span>
            </button>
          )}

          {/* Mobile menu button */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`xl:hidden p-2 text-slate-700 transition duration-300 rounded-none cursor-pointer border ${
              isDarkMode
                ? 'text-slate-100 border-white/10 hover:bg-white/5'
                : 'text-[#1B365D] border-[#1B365D]/10 hover:bg-slate-50'
            }`}
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-4.5 h-4.5" /> : <Menu className="w-4.5 h-4.5" />}
          </button>
        </div>
      </nav>

      {/* Dynamic Golden Scroll-Laser Progress Indicator */}
      {isScrolled && (
        <div 
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-amber-500 via-amber-300 to-amber-600 transition-all duration-75 z-50 shadow-[0_1px_4px_rgba(245,158,11,0.5)]"
          style={{ width: `${scrollProgress}%` }}
        />
      )}

      {/* Mobile Animated menu overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`xl:hidden border-b w-full overflow-hidden absolute left-0 top-full mt-0 shadow-2xl px-6 py-5 flex flex-col gap-2 z-40 ${
              isDarkMode 
                ? 'bg-[#0a1424] border-white/10 text-slate-100' 
                : 'bg-[#FAF8F5] border-[#1B365D]/15 text-[#10223b]'
            }`}
          >
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`py-2 px-1 text-left text-sm font-semibold border-b transition-all w-full flex items-center justify-between cursor-pointer ${
                    isDarkMode 
                      ? 'border-white/5' 
                      : 'border-[#1B365D]/10'
                  } ${
                    isActive 
                      ? isDarkMode ? 'text-amber-400 pl-2 font-bold' : 'text-[#1B365D] pl-2 font-bold' 
                      : isDarkMode ? 'text-slate-300 hover:text-white' : 'text-[#1B365D]/75 hover:text-[#1B365D]'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <div className={`w-1.5 h-1.5 rounded-full ${isDarkMode ? 'bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.6)]' : 'bg-[#1B365D]'}`} />}
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
                    className={`w-full text-center py-2.5 text-xs font-bold tracking-widest uppercase border transition-all duration-300 ${
                      isDarkMode 
                        ? 'border-amber-400/30 bg-[#10223b] hover:bg-white/5 text-amber-400' 
                        : 'border-[#1B365D]/30 bg-white hover:bg-[#1B365D]/5 text-[#1B365D]'
                    }`}
                  >
                    {currentUser.role === 'client' ? 'My Journey Tracker' : 'Command Center'}
                  </button>
                  <button
                    id="mobile-nav-logout"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onLogout();
                    }}
                    className={`w-full text-center py-2.5 text-xs font-bold tracking-widest uppercase transition-all duration-300 ${
                      isDarkMode
                        ? 'bg-rose-950/40 hover:bg-rose-900/60 text-rose-400 border border-rose-500/20'
                        : 'bg-rose-50 hover:bg-rose-100 text-rose-700'
                    }`}
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
                  className={`w-full text-center py-2.5 text-xs font-bold tracking-widest uppercase border transition-all duration-300 ${
                    isDarkMode 
                      ? 'border-amber-400/30 bg-[#10223b] hover:bg-white/5 text-amber-400' 
                      : 'border-[#1B365D]/30 bg-white hover:bg-[#1B365D]/5 text-[#1B365D]'
                  }`}
                >
                  Sign In Account
                </button>
              )}

              <div className={`flex justify-center gap-1.5 items-center text-[10px] uppercase tracking-wider font-semibold font-sans mt-2 ${
                isDarkMode ? 'text-slate-400' : 'text-[#1B365D]/70'
              }`}>
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
