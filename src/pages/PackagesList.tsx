import React, { useState, useEffect } from 'react';
import { Package } from '../types';
import { PACKAGES } from '../data';
import { Search, Star, Plane, ShieldCheck, Soup, Calendar, Navigation, Bus, SlidersHorizontal, Tag } from 'lucide-react';

interface PackagesListProps {
  initialCategory?: 'all' | 'hajj' | 'umrah' | 'international';
  onSelectPackage: (p: Package, mode: 'booking' | 'inquiry') => void;
  onOpenBooking: () => void;
  packages?: Package[];
}

export default function PackagesList({ initialCategory = 'all', onSelectPackage, onOpenBooking, packages = [] }: PackagesListProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'hajj' | 'umrah' | 'international'>(initialCategory);
  
  // Tiers filter state - requested "Economy, Premium, VIP" tabs
  const [activeTier, setActiveTier] = useState<'all' | 'economy' | 'premium' | 'vip'>('all');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'rating'>('rating');

  useEffect(() => {
    setActiveCategory(initialCategory);
  }, [initialCategory]);

  // Combined Filtering Logic
  const filteredPackages = packages.filter((p) => {
    // 1. Category search
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    
    // 2. Tier search (Economy, Premium, VIP)
    // Note: International packages don't necessarily have tiers, so we let them pass if 'all' is selected. Otherwise we filter appropriately.
    const matchesTier = activeTier === 'all' || p.tier === activeTier;

    // 3. Text query
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.hotelDetail.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesTier && matchesSearch;
  });

  // Sorting Logic
  const sortedPackages = [...filteredPackages].sort((a, b) => {
    if (sortBy === 'price-asc') {
      return a.price - b.price;
    }
    if (sortBy === 'price-desc') {
      return b.price - a.price;
    }
    return b.rating - a.rating;
  });

  const handleBookNow = (pack: Package) => {
    onSelectPackage(pack, 'booking');
    onOpenBooking();
  };

  return (
    <div id="packages-page-container" className="pt-32 sm:pt-40 pb-12 space-y-12">
      {/* Visual Header Page Banner */}
      <section className="bg-[#1B365D] text-white py-14 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#1B365D]/95 via-[#1B365D]/40 to-transparent" />
        <div className="max-w-7xl mx-auto space-y-3 relative z-10 text-center">
          <span className="text-amber-400 font-bold uppercase tracking-[0.4em] text-xs block">LUXURY TRAVEL CATALOGUES</span>
          <h1 className="text-3xl sm:text-4xl font-serif font-light text-[#F5F2ED]">Unveil Our Signature Programs</h1>
          <p className="text-xs text-slate-200 max-w-xl mx-auto">
            Review detailed comfort indicators, flight allocations, and hotel schedules tailored to your comfort limit.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* FILTERS & SEARCH MODULE - Designed to eliminate outdated "color panel" */}
        <div className="bg-white border border-slate-200 rounded-none p-6 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <span className="absolute left-3.5 top-3.5 text-slate-400">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder="Search hotels, destinations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-none text-slate-800 focus:outline-none focus:border-[#1B365D] transition-colors"
              />
            </div>

            {/* Sorter Selection */}
            <div className="flex items-center gap-2 w-full md:w-auto justify-end">
              <span className="text-xs text-slate-600 flex items-center gap-1 shrink-0">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#1B365D]" />
                Sort By:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-xs bg-slate-50 border border-slate-300 px-3 py-2.5 rounded-none text-slate-800 focus:outline-none focus:border-[#1B365D] transition-colors"
              >
                <option value="rating">Highest Rated & Trusted</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* TAB 1: Main Category Filters (Hajj, Umrah, International) */}
          <div className="border-b border-slate-250 pb-5">
            <p className="text-[10px] uppercase font-bold text-slate-500 tracking-[0.25em] mb-2.5">TRAVEL SANCTUARY COHORT</p>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'All Packages' },
                { id: 'hajj', label: 'Hajj Offerings' },
                { id: 'umrah', label: 'Umrah Offerings' },
                { id: 'international', label: 'International Luxury Tours' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  id={`cat-filter-${cat.id}`}
                  onClick={() => {
                    setActiveCategory(cat.id as any);
                    setActiveTier('all'); // Reset tier when switching category
                  }}
                  className={`px-5 py-2.5 text-[11px] font-bold uppercase tracking-widest rounded-none transition duration-300 cursor-pointer border ${
                    activeCategory === cat.id
                      ? 'bg-[#1B365D] text-white border-[#1B365D]'
                      : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-250/90'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* TAB 2: Comfort Tiers (Economy, Premium, VIP) Tab list */}
          {(activeCategory === 'all' || activeCategory === 'hajj' || activeCategory === 'umrah') && (
            <div className="pt-2">
              <p className="text-[10px] uppercase font-bold text-slate-500 tracking-[0.25em] mb-2.5 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-[#1B365D]" />
                Select Comfort Tier (Economy, Premium, VIP)
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'all', label: 'All Tiers combined' },
                  { id: 'economy', label: 'Economy Packages (Trust but Affordable)' },
                  { id: 'premium', label: 'Premium Packages (Optimal Proximity)' },
                  { id: 'vip', label: 'VIP Sovereign (Unyielding Luxury)' }
                ].map((tier) => (
                  <button
                    key={tier.id}
                    id={`tier-filter-${tier.id}`}
                    onClick={() => setActiveTier(tier.id as any)}
                    className={`px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest rounded-none transition duration-300 border cursor-pointer ${
                      activeTier === tier.id
                        ? 'bg-amber-500 border-[#1B365D] text-slate-950 font-bold shadow-xs'
                        : 'border-slate-250 hover:bg-slate-50 text-slate-600'
                    }`}
                  >
                    {tier.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* LISTINGS GRID */}
        {sortedPackages.length === 0 ? (
          <div className="bg-white border rounded-none p-16 text-center text-slate-500">
            <p className="text-sm font-medium">No travel packages align with your selected filters.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setActiveTier('all');
                setSearchQuery('');
              }}
              className="mt-4 px-6 py-2.5 bg-[#1B365D] text-white text-xs font-bold uppercase tracking-widest rounded-none hover:bg-[#1B365D]/90 transition"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedPackages.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-none border border-slate-200 shadow-sm overflow-hidden flex flex-col hover:border-[#1B365D]/35 duration-300 relative group"
              >
                {/* Image Section */}
                <div className="h-56 bg-slate-100 overflow-hidden relative">
                  <img
                    referrerPolicy="no-referrer"
                    src={p.imageUrl}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 duration-700"
                  />
                  
                  {/* Category Pill */}
                  <span className="absolute top-3 left-3 bg-[#1B365D] text-white font-mono text-[9px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-none shadow">
                    {p.category}
                  </span>

                  {p.tier && (
                    <span className="absolute top-3 right-3 bg-amber-500 text-slate-950 font-bold text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-none shadow">
                      {p.tier} Program
                    </span>
                  )}

                  <div className="absolute bottom-3 right-3 bg-[#1B365D]/90 backdrop-blur-xs text-white px-3 py-1.5 rounded-none text-xs font-mono font-bold shadow">
                    {p.currency}{p.price.toLocaleString()} <span className="text-[10px] text-amber-400 font-bold">USD</span>
                  </div>
                </div>

                {/* Info block */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span className="flex items-center gap-1 font-mono">
                        <Calendar className="w-3.5 h-3.5 text-[#1B365D]" />
                        {p.durationDays} Days Itinerary
                      </span>
                      <span className="flex items-center gap-0.5 font-bold text-[#1B365D]">
                        ★ {p.rating.toFixed(1)} Stars
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-[#1B365D] font-serif leading-snug">{p.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-sans line-clamp-3">{p.description}</p>
                  </div>

                  {/* Highlights Bullet pills */}
                  <div className="bg-[#EAE6DF]/10 p-3.5 rounded-none border border-slate-200/60 space-y-2">
                    <p className="text-[9px] uppercase tracking-wider font-bold text-slate-455">Services Included:</p>
                    <div className="grid grid-cols-2 gap-1.5 text-[11px] text-slate-600">
                      <p className="flex items-center gap-1 leading-none">
                        <Plane className="w-3.5 h-3.5 text-[#1B365D] shrink-0" />
                        <span className="truncate">{p.airlineInclusion ? 'Air Flights' : 'Self Fly'}</span>
                      </p>
                      <p className="flex items-center gap-1 leading-none">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#1B365D] shrink-0" />
                        <span className="truncate">{p.visaInclusion ? 'Visa Inc.' : 'Self Visa'}</span>
                      </p>
                      <p className="flex items-center gap-1 leading-none">
                        <Bus className="w-3.5 h-3.5 text-[#1B365D] shrink-0" />
                        <span className="truncate">Bus Transits</span>
                      </p>
                      <p className="flex items-center gap-1 leading-none">
                        <Soup className="w-3.5 h-3.5 text-[#1B365D] shrink-0" />
                        <span className="truncate">{p.mealsInclusion.split(' ')[0]} Board</span>
                      </p>
                    </div>
                  </div>

                  {/* Hotel Details display */}
                  <div className="text-xs space-y-1 text-slate-700 bg-[#EAE6DF]/30 p-3.5 rounded-none border border-slate-350/40">
                    <p className="line-clamp-1">🏨 <strong className="text-[#1B365D]">Hotel Setup:</strong> {p.hotelDetail}</p>
                    <p className="line-clamp-1">🛡️ <strong className="text-[#1B365D]">Highlights:</strong> {p.highlights[0]}</p>
                  </div>

                  {/* Operational CTAs */}
                  <div className="pt-2 grid grid-cols-2 gap-3">
                    <button
                      id={`booknow-${p.id}`}
                      onClick={() => handleBookNow(p)}
                      className="py-3 bg-[#1B365D] hover:bg-[#1B365D]/90 text-white rounded-none text-xs font-bold uppercase tracking-widest transition duration-300 cursor-pointer text-center shadow-xs"
                    >
                      Book Now
                    </button>
                    <button
                      id={`inquire-${p.id}`}
                      onClick={() => {
                        onSelectPackage(p, 'inquiry');
                        onOpenBooking();
                      }}
                      className="py-3 border border-[#1B365D] hover:bg-[#1B365D]/5 text-[#1B365D] rounded-none text-xs font-bold uppercase tracking-widest transition duration-300 cursor-pointer text-center"
                    >
                      Send Inquiry
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
