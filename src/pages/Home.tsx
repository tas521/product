import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Shield, BookOpen, Gem, MapPin, Phone, Award, Star, ArrowRight,
  Sparkles, Calendar, Mail, CheckCircle2, ChevronLeft, ChevronRight, MessageSquare
} from 'lucide-react';
import { Package } from '../types';
import { PACKAGES, TRUST_INDICATORS, TESTIMONIALS, BLOG_POSTS, GALLERY_ITEMS } from '../data';

interface HomeProps {
  onOpenBooking: () => void;
  onSelectPackage: (p: Package, mode: 'booking' | 'inquiry') => void;
  setActivePage: (p: string) => void;
  packages?: Package[];
  blogs?: any[];
  gallery?: any[];
}

export default function Home({ onOpenBooking, onSelectPackage, setActivePage, packages = [], blogs = [], gallery = [] }: HomeProps) {
  // Hero slider states
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroSlides = [
    {
      badge: "◆ SACRED HARAM CONGREGATION",
      title: "Your Sacred Journey",
      titleAccent: "Begins With Trust",
      subtitle: "Authentic, scholar-guided Hajj and premium Umrah programs designed with physical ease and absolute transparency for your entire family.",
      image: "https://images.unsplash.com/photo-1564767609342-620cb19b2357?q=80&w=1600&auto=format&fit=crop",
      cta: "Explore Hajj Programs",
      targetPage: "hajj-packages"
    },
    {
      badge: "◆ PROPHETIC SANCTUARY IN MADINAH",
      title: "Peace & Serenity",
      titleAccent: "At the Green Dome",
      subtitle: "Comfortable pre-arranged frontline suites and 5-star hospitality, staying just steps away from Al-Masjid an-Nabawi.",
      image: "https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=1600&auto=format&fit=crop",
      cta: "Explore Umrah Programs",
      targetPage: "umrah-packages"
    },
    {
      badge: "◆ SPLENDID MAKKAH RITUALS",
      title: "Scenic Comfort",
      titleAccent: "Facing the Holy Kaaba",
      subtitle: "Direct access rooms looking straight out onto the Holy courtyard, giving elders and young children complete peace and minimal physical strain.",
      image: "https://images.unsplash.com/photo-1604999333679-b86d54738315?q=80&w=1600&auto=format&fit=crop",
      cta: "Explore Frontline Packages",
      targetPage: "umrah-packages"
    },
    {
      badge: "◆ HOLY KAABA KISWAH",
      title: "Spiritual Integrity",
      titleAccent: "In Every Ceremony",
      subtitle: "Our tours are accompanied by verified academic scholars to ensure authentic execution of Hajj and Umrah liturgies.",
      image: "https://images.unsplash.com/photo-1580418827493-f2b22c0a76ae?q=80&w=1600&auto=format&fit=crop",
      cta: "Meet Our Scholars",
      targetPage: "about"
    },
    {
      badge: "◆ COZY MADINAH HOLY RETREAT",
      title: "Spiritual Heritage",
      titleAccent: "Bespoke Islamic Tours",
      subtitle: "Experience high-end global travel destinations with carefully tailored boutique heritage programs to Jordan, Al-Aqsa, and historic Islamic hubs.",
      image: "https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?q=80&w=1600&auto=format&fit=crop",
      cta: "Explore Heritage Tours",
      targetPage: "intl-tours"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  // Testimonial slider states
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Quick inquiry state
  const [iqName, setIqName] = useState('');
  const [iqPhone, setIqPhone] = useState('');
  const [iqCategory, setIqCategory] = useState('hajj');
  const [iqMessage, setIqMessage] = useState('');
  const [iqSubmitted, setIqSubmitted] = useState(false);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (iqName.trim() && iqPhone.trim()) {
      setIqSubmitted(true);
      setIqName('');
      setIqPhone('');
      setIqMessage('');
      setTimeout(() => setIqSubmitted(false), 6000);
    }
  };

  // Safe wrapper for rendering Lucide icons based on standard strings
  const renderTrustIcon = (iconName: string) => {
    switch (iconName) {
      case 'Award': return <Award className="w-6 h-6 text-[#1B365D]" />;
      case 'ShieldCheck': return <Shield className="w-6 h-6 text-[#1B365D]" />;
      case 'BookOpen': return <BookOpen className="w-6 h-6 text-[#1B365D]" />;
      case 'Gem': return <Gem className="w-6 h-6 text-[#1B365D]" />;
      case 'MapPin': return <MapPin className="w-6 h-6 text-[#1B365D]" />;
      case 'Phone': return <Phone className="w-6 h-6 text-[#1B365D]" />;
      default: return <Sparkles className="w-6 h-6 text-[#1B365D]" />;
    }
  };

  // Segregating sample Packages for Home
  const pilgrimagePackages = packages.filter(p => p.category === 'hajj' || p.category === 'umrah').slice(0, 3);
  const intlPackages = packages.filter(p => p.category === 'international').slice(0, 3);

  // Custom refined transition motion presets
  const sectionVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1] 
      } 
    }
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  const staggerItem = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <div id="home-page-container" className="space-y-24 pb-12 w-full overflow-x-hidden">
      
      {/* 1. CINEMATIC HERO SLIDER SECTION */}
      <section 
        id="hero-slider" 
        className="relative h-[85vh] sm:h-[90vh] w-full bg-cover bg-center flex items-center justify-center overflow-hidden"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1564767609342-620cb19b2357?q=80&w=1600&auto=format&fit=crop')" }}
      >
        {/* Heavy dimming filter on fallback background to keep absolute readability */}
        <div className="absolute inset-0 bg-slate-950/80 z-0 pointer-events-none" />

        <AnimatePresence>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 z-10"
          >
            {/* Background Image with elegant overlay filter */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-all duration-700"
              style={{ backgroundImage: `url(${heroSlides[currentSlide].image})` }}
            />
            {/* Cinematic Gradient Overlays */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            <div className="absolute inset-0 bg-slate-950/45" /> {/* Dimming */}
            <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-slate-950/75 to-transparent pointer-events-none" />
          </motion.div>
        </AnimatePresence>

        {/* Content overlaid on slider */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 w-full text-left pt-16 sm:pt-24 lg:pt-28">
          <div className="max-w-2xl space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="space-y-4"
              >
                <span className="block text-amber-400 font-bold uppercase tracking-[0.4em] text-xs">
                  {heroSlides[currentSlide].badge}
                </span>

                <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-light leading-[1.1] text-white tracking-tight">
                  {heroSlides[currentSlide].title} <br className="hidden md:block"/>
                  <span className="italic text-amber-400 font-normal">{heroSlides[currentSlide].titleAccent}</span>
                </h2>

                <p className="text-xs sm:text-sm md:text-base text-slate-200 opacity-90 leading-relaxed max-w-xl font-sans">
                  {heroSlides[currentSlide].subtitle}
                </p>

                <div className="pt-2 flex flex-wrap gap-4 items-center">
                  <button
                    id={`hero-explore-packages-cta-${currentSlide}`}
                    onClick={() => {
                      setActivePage(heroSlides[currentSlide].targetPage);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold uppercase tracking-widest rounded-none transition-all duration-300 shadow-lg cursor-pointer"
                  >
                    {heroSlides[currentSlide].cta}
                  </button>
                  <button
                    id="hero-open-booking-cta"
                    onClick={onOpenBooking}
                    className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-widest rounded-none transition-all duration-300 border border-white/20 backdrop-blur-sm cursor-pointer"
                  >
                    Book Your Itinerary
                  </button>
                  <a
                    href="tel:+918287762995"
                    className="text-white hover:text-amber-400 text-xs font-bold tracking-widest uppercase transition flex items-center gap-1.5 ml-1 pt-1 sm:pt-0"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    Call Now: +91 82877 62995
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Featured Package Glassmorphism overlay from Design Theme */}
        <div className="hidden lg:block absolute bottom-12 right-12 z-35 w-68 p-6 bg-white/10 backdrop-blur-xl border border-white/25 text-white rounded-none shadow-2xl animate-fadeIn">
          <p className="text-[9px] font-sans font-bold uppercase tracking-[0.25em] text-amber-400 mb-2">✦ SPECIAL FEATURE</p>
          <h3 className="text-base font-serif font-semibold mb-3 leading-snug">Elite Scholar Legacy Hajj 2026</h3>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-[9px] uppercase tracking-wider text-slate-300">Starting Rate</p>
              <p className="text-xl font-mono font-bold text-amber-400">₹4,95,000</p>
            </div>
            <button
              onClick={() => {
                setActivePage('hajj-packages');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-10 h-10 border border-white/30 rounded-full flex items-center justify-center hover:bg-white hover:text-slate-900 transition duration-300 cursor-pointer"
              aria-label="View Details"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Manual Slides Control Arrows */}
        <button
          onClick={handlePrevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/20 hover:bg-white/10 text-white z-30 transition cursor-pointer"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={handleNextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/20 hover:bg-white/10 text-white z-30 transition cursor-pointer"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Slides indicator nav dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5">
          {heroSlides.map((_, idx) => (
            <button
               key={idx}
               onClick={() => setCurrentSlide(idx)}
               className={`h-2.5 rounded-sm transition-all duration-300 cursor-pointer ${
                 currentSlide === idx ? 'w-10 bg-[#A37920]' : 'w-2.5 bg-white/40 hover:bg-white/70'
               }`}
               aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* 2. TRUST INDICATORS SECTION */}
      <motion.section 
        id="trust-indicators" 
        className="max-w-7xl mx-auto px-4 sm:px-6 pt-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-amber-600 font-sans font-bold uppercase tracking-[0.35em] text-[10px] block">UNCOMPROMISING INTEGRITY</span>
          <h2 className="text-2xl sm:text-3.5xl font-serif font-light text-[#10223b] tracking-wide leading-tight">
            Our Assurances to Your <span className="italic text-amber-600 font-normal">Sacred Sanctuary</span>
          </h2>
          <div className="flex items-center justify-center gap-3">
            <span className="h-[1px] w-8 bg-amber-500/30" />
            <span className="text-amber-500 text-xs">✦</span>
            <span className="h-[1px] w-8 bg-amber-500/30" />
          </div>
          <p className="text-xs text-[#10223b]/70 leading-relaxed font-sans max-w-lg mx-auto">
            Over fifteen years of dedicated service, Al Safar has refined a signature standard of real-time support, certified theological guides, and frontline suites facing the Masjid al-Haram.
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-14"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {TRUST_INDICATORS.map((t, index) => (
            <motion.div
              key={t.id}
              variants={staggerItem}
              className="bg-[#FAF8F5] p-8 rounded-none border border-amber-500/15 hover:border-amber-500/40 transition-all duration-500 relative group luxury-box"
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
            >
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-amber-500/15 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <div className="w-11 h-11 shrink-0 bg-amber-100/40 border border-amber-500/20 rounded-none flex items-center justify-center text-amber-600 mb-5">
                {renderTrustIcon(t.iconName)}
              </div>
              <div className="space-y-2">
                <h4 className="text-xs font-sans font-bold text-[#10223b] tracking-[0.15em] uppercase">{t.title}</h4>
                <p className="text-xs text-[#10223b]/75 leading-relaxed">{t.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* 3. PREMIUM HAJJ & UMRAH TABBED EXVIEW */}
      <motion.section 
        id="hajj-umrah-showcase" 
        className="bg-[#F3ECE0]/20 border-y border-amber-500/15 py-24 islamic-pattern"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="space-y-3">
              <span className="text-amber-600 font-sans font-bold uppercase tracking-[0.3em] text-[10px] block">THE HOLY SANCTUARIES</span>
              <h2 className="text-2xl sm:text-3.5xl font-serif font-light text-[#10223b] tracking-wide">
                Signature <span className="italic text-amber-600 font-normal">Hajj & Umrah</span> Programs
              </h2>
              <p className="text-xs text-[#10223b]/70 max-w-md font-sans">
                Curated itineraries emphasizing physical ease, direct courtyard hotel access, and scholar-supervised instructions.
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => { setActivePage('hajj-packages'); window.scrollTo(0,0); }}
                className="px-6 py-3 text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-[#10223b] bg-white hover:bg-amber-50 border border-amber-500/25 transition-all duration-300 cursor-pointer"
              >
                Hajj Escapes
              </button>
              <button
                onClick={() => { setActivePage('umrah-packages'); window.scrollTo(0,0); }}
                className="px-6 py-3 text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-white bg-[#10223b] hover:bg-[#10223b]/90 transition-all duration-300 cursor-pointer"
              >
                Umrah Escapes
              </button>
            </div>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {pilgrimagePackages.map((p) => (
              <motion.div
                key={p.id}
                variants={staggerItem}
                className="bg-[#FAF8F5] rounded-none border border-amber-500/15 overflow-hidden flex flex-col hover:border-amber-500/40 transition-all duration-500 relative group shadow-xs luxury-box"
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
              >
                {/* Image Holder */}
                <div className="relative h-52 overflow-hidden bg-slate-900">
                  <img
                    referrerPolicy="no-referrer"
                    src={p.imageUrl}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 duration-1000 transition-all filter brightness-[0.9]"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950/40 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-[#10223b]/90 border border-amber-500/30 text-[9px] uppercase font-bold text-amber-400 font-sans tracking-[0.2em]">
                    {p.tier} Program
                  </div>
                  <div className="absolute bottom-4 right-4 bg-amber-500 text-slate-900 px-3 py-1 text-[11px] font-sans font-bold tracking-widest uppercase">
                    {p.currency}{p.price} / Pax
                  </div>
                </div>

                {/* Info Deck */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4 bg-[#FAF8F5] relative">
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-[9px] text-amber-700 font-sans font-bold uppercase tracking-[0.18em]">
                      <span>{p.durationDays} Days</span>
                      <span>•</span>
                      <span>★ {p.hotelStars}-Star Luxury Hotel Array</span>
                    </div>
                    <h3 className="text-base font-serif font-semibold text-[#10223b] line-clamp-1 group-hover:text-amber-600 transition duration-300">{p.title}</h3>
                    <p className="text-xs text-[#10223b]/70 line-clamp-2 leading-relaxed">{p.description}</p>
                  </div>

                  <div className="border-t border-amber-500/10 pt-4 text-[11px] text-[#10223b]/75 space-y-2 font-sans">
                    <p className="line-clamp-1"><span className="text-amber-600">🏨</span> Hotel Stay: <strong className="text-[#10223b] font-medium">{p.hotelDetail}</strong></p>
                    <p className="line-clamp-1"><span className="text-amber-600">✈️</span> Transit: <strong className="text-[#10223b] font-medium">{p.flightDetail}</strong></p>
                  </div>

                  <div className="pt-3 grid grid-cols-2 gap-3.5">
                    <button
                      onClick={() => onSelectPackage(p, 'booking')}
                      className="py-3 bg-[#10223b] hover:bg-[#10223b]/90 text-white text-[10px] font-sans font-bold uppercase tracking-[0.2em] transition duration-300 cursor-pointer text-center"
                    >
                      Book Sanctuary
                    </button>
                    <button
                      onClick={() => {
                        onSelectPackage(p, 'inquiry');
                        onOpenBooking();
                      }}
                      className="py-3 border border-amber-500/35 hover:bg-amber-100/15 text-amber-700 text-[10px] font-sans font-bold uppercase tracking-[0.2em] transition duration-300 cursor-pointer text-center"
                    >
                      Send Inquiry
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-14 text-center">
            <button
              onClick={() => { setActivePage('all-packages'); window.scrollTo(0,0); }}
              className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-amber-700 hover:text-amber-800 inline-flex items-center gap-2 cursor-pointer transition-all duration-300 group"
            >
              <span>Examine All Combined Offerings</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition" />
            </button>
          </div>
        </div>
      </motion.section>

      {/* 4. INTERNATIONAL TOURS SECTION */}
      <motion.section 
        id="intl-tours-showcase" 
        className="max-w-7xl mx-auto px-4 sm:px-6 pt-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16">
          <div className="space-y-3">
            <span className="text-amber-600 font-sans font-bold uppercase tracking-[0.3em] text-[10px] block">LUXURY TOURISM</span>
            <h2 className="text-2xl sm:text-3.5xl font-serif font-light text-[#10223b] tracking-wide">
              Bespoke <span className="italic text-amber-600 font-normal">International departures</span>
            </h2>
            <p className="text-xs text-[#10223b]/70 max-w-sm font-sans">
              Handcrafted premium leisure journeys encompassing rich heritage structures and five-star resort experiences.
            </p>
          </div>
          <button
            onClick={() => { setActivePage('intl-tours'); window.scrollTo(0,0); }}
            className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-amber-700 hover:text-amber-800 inline-flex items-center gap-2 cursor-pointer transition-all duration-300 group"
          >
            All Destinations
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition" />
          </button>
        </div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {intlPackages.map((p) => (
            <motion.div
              key={p.id}
              variants={staggerItem}
              className="group bg-[#FAF8F5] rounded-none border border-amber-500/15 overflow-hidden flex flex-col hover:border-amber-500/40 transition-all duration-500 relative group shadow-xs luxury-box"
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
            >
              <div className="relative h-64 overflow-hidden bg-slate-900">
                <img
                  referrerPolicy="no-referrer"
                  src={p.imageUrl}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 duration-1000 transition-all filter brightness-[0.85]"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/70 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 text-white">
                  <div className="flex items-center gap-1.5 text-[9px] text-amber-400 font-sans font-bold uppercase tracking-[0.18em]">
                    <span>{p.durationDays} Days</span>
                    <span>•</span>
                    <span>★ {p.hotelStars} Star Retainer</span>
                  </div>
                  <h4 className="text-base font-serif font-semibold mt-1 text-[#FAF8F5]">{p.title}</h4>
                </div>
                <div className="absolute top-4 right-4 bg-amber-500 text-slate-900 font-sans font-bold text-[10px] px-3 py-1 tracking-wider">
                  {p.currency}{p.price}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4 bg-[#FAF8F5]">
                <p className="text-xs text-[#10223b]/70 line-clamp-2 leading-relaxed">{p.description}</p>
                <div className="text-[11px] text-[#10223b]/75 space-y-2 font-sans border-t border-amber-500/10 pt-4">
                  <p className="line-clamp-1"><span className="text-amber-600">🏨</span> Resort stay: <strong className="text-[#10223b] font-medium">{p.hotelDetail}</strong></p>
                  <p className="line-clamp-1"><span className="text-amber-600">✈️</span> Transit Line: <strong className="text-[#10223b] font-medium">{p.flightDetail}</strong></p>
                </div>
                <button
                  onClick={() => onSelectPackage(p, 'booking')}
                  className="w-full text-center py-3 bg-[#10223b] hover:bg-[#10223b]/90 text-white text-[10px] font-sans font-bold uppercase tracking-[0.2em] transition duration-300 cursor-pointer"
                >
                  Configure Holiday
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* 5. INTERACTIVE SELECT/GALLERY MASONRY VIEW */}
      <motion.section 
        id="gallery-masonry" 
        className="bg-[#10223b] text-white py-24 px-4 sm:px-6 relative overflow-hidden mt-6 border-y border-amber-500/25"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,#09121f,transparent_60%)]" />
        <div className="absolute inset-0 bg-image-pattern opacity-[0.03]" />
        
        <div className="max-w-7xl mx-auto relative z-10 space-y-16">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <span className="text-amber-400 font-sans font-bold uppercase tracking-[0.4em] text-[10px] block">VISUAL TESTAMENTS</span>
            <h2 className="text-2xl sm:text-3.5xl font-serif font-light leading-tight text-[#FAF8F5]">Sacred Congregated Moments</h2>
            <div className="flex items-center justify-center gap-2">
              <span className="h-[1px] w-6 bg-amber-500/40" />
              <span className="text-amber-500 text-xs">✧</span>
              <span className="h-[1px] w-6 bg-amber-500/40" />
            </div>
            <p className="text-xs text-slate-300 font-sans leading-relaxed max-w-md mx-auto">
              Real scenes shared by our valued pilgrims and premium travelers across the world.
            </p>
          </div>

          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {(gallery && gallery.length > 0 ? gallery : GALLERY_ITEMS).slice(0, 4).map((img) => (
              <motion.div
                key={img.id}
                variants={staggerItem}
                className="relative group h-72 rounded-none overflow-hidden bg-slate-900 cursor-pointer border border-amber-500/15"
                onClick={() => setActivePage('gallery')}
              >
                <img
                  referrerPolicy="no-referrer"
                  src={img.imageUrl}
                  alt={img.title}
                  className="w-full h-full object-cover group-hover:scale-105 duration-1000 transition-all filter brightness-[0.8]"
                />
                <div className="absolute inset-0 bg-slate-950/75 opacity-0 group-hover:opacity-100 transition-all duration-400 flex flex-col justify-end p-5" />
                <div className="absolute bottom-4 left-4 right-4 text-white transform translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-400">
                  <span className="text-[9px] text-amber-400 font-bold uppercase tracking-[0.1em]">{img.category}</span>
                  <h4 className="text-xs font-serif leading-snug mt-1 font-medium">{img.title}</h4>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center pb-2">
            <button
              onClick={() => { setActivePage('gallery'); window.scrollTo(0,0); }}
              className="px-8 py-3.5 border border-amber-500/40 hover:border-amber-500 text-amber-400 hover:bg-amber-500/10 rounded-none text-[10px] font-sans font-bold uppercase tracking-[0.25em] transition duration-300 cursor-pointer"
            >
              Explore Full Filterable Gallery
            </button>
          </div>
        </div>
      </motion.section>

      {/* 6. TESTIMONIALS SLIDER SECTION */}
      <motion.section 
        id="customer-reviews" 
        className="max-w-4xl mx-auto px-4 sm:px-6 relative pt-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <div className="text-center space-y-3 mb-16">
          <span className="text-amber-700 font-sans font-bold uppercase tracking-[0.35em] text-[10px] block text-center">SINCERE GRATITUDE</span>
          <h2 className="text-2xl sm:text-3.5xl font-serif font-light text-[#10223b] text-center">Whispers of Devotion</h2>
          <div className="flex items-center justify-center gap-2">
            <span className="h-[1px] w-8 bg-amber-500/20" />
            <span className="text-amber-500 text-xs">◆</span>
            <span className="h-[1px] w-8 bg-amber-500/20" />
          </div>
        </div>

        <div className="bg-[#FAF8F5] rounded-none border border-amber-500/15 p-10 relative luxury-box fine-double-border">
          <div className="absolute -top-7 -left-2 text-amber-500/10 font-serif text-9xl leading-none select-none">“</div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTestimonial}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-6"
            >
              <p className="text-sm sm:text-base text-[#10223b]/85 leading-relaxed italic font-serif">
                "{TESTIMONIALS[activeTestimonial].text}"
              </p>
 
               <div className="flex items-center gap-4 pt-6 border-t border-amber-500/15">
                 <img
                   referrerPolicy="no-referrer"
                   src={TESTIMONIALS[activeTestimonial].photo}
                   alt={TESTIMONIALS[activeTestimonial].name}
                   className="w-11 h-11 rounded-none border border-amber-500/25 object-cover shrink-0 filter brightness-100"
                 />
                 <div>
                   <h4 className="text-xs font-sans font-bold text-[#10223b] tracking-wider uppercase">{TESTIMONIALS[activeTestimonial].name}</h4>
                   <p className="text-[10px] text-[#10223b]/60 mt-0.5">{TESTIMONIALS[activeTestimonial].location} • <strong className="text-amber-700 font-medium">{TESTIMONIALS[activeTestimonial].role}</strong></p>
                 </div>
                 <div className="ml-auto flex gap-0.5">
                   {[...Array(TESTIMONIALS[activeTestimonial].rating)].map((_, i) => (
                     <Star key={i} className="w-3 h-3 fill-amber-500 text-amber-500" />
                   ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-end gap-2 mt-6">
            <button
              onClick={() => setActiveTestimonial((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
              className="p-2 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-600 transition cursor-pointer"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length)}
              className="p-2 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-600 transition cursor-pointer"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.section>

       {/* 7. PREPARATION BLOG/GUIDES SECTION */}
      <motion.section 
        id="blog-teasers" 
        className="bg-[#EAE6DF]/30 py-16 border-y border-slate-350/30"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          <div className="flex justify-between items-end">
            <div className="space-y-2">
              <span className="text-amber-700 font-bold uppercase tracking-[0.4em] text-xs block">EDUCATIONAL</span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1B365D]">
                Spiritual Preparation & Guides
              </h2>
            </div>
            <button
              onClick={() => { setActivePage('blog'); window.scrollTo(0,0); }}
              className="text-xs font-bold uppercase tracking-widest text-[#1B365D] hover:text-amber-600 transition cursor-pointer"
            >
              All Articles
            </button>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {(blogs && blogs.length > 0 ? blogs : BLOG_POSTS).map((blog) => (
              <motion.article
                key={blog.id}
                variants={staggerItem}
                className="bg-white rounded-none border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between hover:border-[#1B365D]/30 transition"
              >
                <div>
                  <div className="h-44 bg-slate-100 overflow-hidden relative">
                    <img
                      referrerPolicy="no-referrer"
                      src={blog.imageUrl}
                      alt={blog.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-3 left-3 bg-[#1B365D] text-amber-400 text-[10px] uppercase font-bold px-2 py-0.5 rounded-none font-mono tracking-wider">
                      {blog.category}
                    </span>
                  </div>
                  <div className="p-5 space-y-2 bg-white">
                    <h4 className="text-xs text-slate-400 font-sans">{blog.publishedDate} • {blog.readTime}</h4>
                    <h3 className="text-sm font-bold text-[#1B365D] font-serif leading-snug line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-3">{blog.summary}</p>
                  </div>
                </div>

                <div className="p-5 pt-0 bg-white">
                  <button
                    onClick={() => { setActivePage('blog'); window.scrollTo(0,0); }}
                    className="text-xs text-[#1B365D] hover:text-amber-600 font-bold uppercase tracking-widest inline-flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    Read Scholarly Article
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* 8. EMBEDDED DYNAMIC INQUIRY & DELHI LOCATION PREVIEW */}
      <motion.section 
        id="on-ground-presence" 
        className="max-w-7xl mx-auto px-4 sm:px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <motion.div 
          className="bg-transparent overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          
          {/* Form Side */}
          <motion.div 
            variants={staggerItem}
            className="p-8 sm:p-12 space-y-6 relative z-10 bg-white border border-slate-250/90 rounded-none shadow-xs text-slate-800"
          >
            <div className="space-y-2">
              <span className="text-amber-700 font-bold uppercase tracking-[0.4em] text-xs block">DIRECT ASSISTANCE DESK</span>
              <h2 className="text-3xl font-serif font-light text-[#1B365D] leading-tight">Ensure peace, secure clarity.</h2>
              <p className="text-xs text-slate-500 font-sans max-w-sm mt-1">
                Enter your details to receive customized itineraries for Hajj, Umrah, or luxury visa documentation within 3 hours.
              </p>
            </div>

            {iqSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-none text-emerald-600 text-xs space-y-2"
              >
                <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-500">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm">Al Safar Inquiry Logged Successfully!</h4>
                <p>Thank you for reaching out. A licensed travel counselor from our Ansari Road Office will initiate a call shortly.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold text-slate-600 block">Full Name</label>
                    <input
                      type="text"
                      placeholder="Mohammad Farhan"
                      required
                      value={iqName}
                      onChange={(e) => setIqName(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-none text-slate-800 focus:outline-none focus:border-[#1B365D] transition-colors"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-bold text-slate-600 block">Contact Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+91 82877 62123"
                      required
                      value={iqPhone}
                      onChange={(e) => setIqPhone(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-none text-slate-800 focus:outline-none focus:border-[#1B365D] transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold text-slate-600 block">Category of Sanctuary Interest</label>
                  <select
                    value={iqCategory}
                    onChange={(e) => setIqCategory(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-none text-slate-800 focus:outline-none focus:border-[#1B365D] transition-colors"
                  >
                    <option value="hajj">Hajj Program (Arafat, Mina)</option>
                    <option value="umrah">Umrah Signature (Makkah Front)</option>
                    <option value="international">Luxury International Tours</option>
                    <option value="visa">Schengen & Saudi Visas</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold text-slate-600 block">Spiritual Request Notes (Optional)</label>
                  <textarea
                    rows={2}
                    placeholder="E.g., elderly accommodation requests, wheelchair priority transit details..."
                    value={iqMessage}
                    onChange={(e) => setIqMessage(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-none text-slate-800 focus:outline-none focus:border-[#1B365D] transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#1B365D] hover:bg-[#1B365D]/90 text-white font-bold uppercase tracking-widest text-xs rounded-none transition cursor-pointer"
                >
                  Send Urgent Dispatch Request
                </button>
              </form>
            )}

            <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-between items-start text-xs border-t border-slate-200 text-slate-600">
              <span className="flex items-center gap-1.5 font-semibold text-[#1B365D]">
                <Phone className="w-4 h-4 text-amber-600" />
                Hotline Call: +91 82877 62995
              </span>
              <a
                href="https://wa.me/918287762995?text=Salam%20Al%20Safar%20Delhi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-600 font-bold hover:underline flex items-center gap-1"
              >
                ⚡ Chat Instant WhatsApp
              </a>
            </div>
          </motion.div>

          {/* Delhi Map / Office Detail Side */}
          <motion.div 
            variants={staggerItem}
            className="p-8 sm:p-12 space-y-6 flex flex-col justify-between border border-slate-250 bg-[#EAE6DF]/30 relative text-slate-800 rounded-none shadow-xs"
          >
            
            <div className="space-y-4">
              <span className="text-amber-700 font-bold uppercase tracking-[0.4em] text-xs block">DELHI PRESENCE</span>
              <h3 className="text-2xl font-serif font-bold text-[#1B365D]">Ansari Road Office, Daryaganj</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-sans mt-2">
                Located near Delhi's historic core lanes, our premium walk-in office greets you with a traditional hospitality coffee desk, VIP booking lounges, and offline visa verification officers.
              </p>

              <div className="bg-white border border-[#1B365D]/10 rounded-none p-4 space-y-3 text-xs text-slate-600">
                <p>📍 <strong className="text-[#1B365D]">Primary Directory:</strong> Opposite Daryaganj Fire Station, Walkable from metro door #3.</p>
                <p>🕒 <strong className="text-[#1B365D]">Walk-in Office Hours:</strong> Mon - Sat (09:30 AM - 07:00 PM)</p>
                <p>🚆 <strong className="text-[#1B365D]">Transit distance:</strong> 400m from Dilli Gate Metro (Violet Line)</p>
              </div>
            </div>

            {/* Embedded maps simulator card */}
            <div className="border border-slate-200 rounded-none overflow-hidden bg-white p-4 h-44 relative flex items-center justify-center shadow-xs">
              <div className="absolute inset-0 opacity-10 pointer-events-none islamic-pattern" />
              <div className="relative text-center space-y-3 z-10">
                <MapPin className="w-9 h-9 text-amber-500 mx-auto animate-bounce" />
                <div>
                  <h4 className="text-xs font-bold font-serif text-[#1B365D]">Al Safar Travel Hub (Delhi HQ)</h4>
                  <p className="text-[10px] text-slate-500 font-sans mt-0.5">Ansari Road Commercial Deck, Delhi 110002</p>
                </div>
                <button
                  onClick={() => { setActivePage('delhi-office'); window.scrollTo(0,0); }}
                  className="px-6 py-2 bg-[#1B365D] hover:bg-[#1B365D]/90 text-white text-[10px] font-bold tracking-widest uppercase rounded-none transition cursor-pointer"
                >
                  Verify Transit & Parking Routes
                </button>
              </div>
            </div>

          </motion.div>

        </motion.div>
      </motion.section>

    </div>
  );
}
