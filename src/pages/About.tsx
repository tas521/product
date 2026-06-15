import React from 'react';
import { Award, Users2, Landmark, CheckCircle2 } from 'lucide-react';

interface AboutProps {
  onOpenBooking: () => void;
}

export default function About({ onOpenBooking }: AboutProps) {
  const values = [
    {
      title: "Spiritual Integrity Above All",
      description: "Our ritual guidance is fully authenticated by global Islamic institutions. We do not compromise on the Sunnah methods of Hajj and Umrah performance.",
      icon: <Award className="w-5 h-5 text-amber-600" />
    },
    {
      title: "Guests of the Merciful (Duyoof ar-Rahman)",
      description: "We view our pilgrims not as clients, but as noble guests. Our entire staff is trained to serve with humble humility, care, and absolute respect.",
      icon: <Users2 className="w-5 h-5 text-amber-600" />
    },
    {
      title: "Meticulous High-End Comfort",
      description: "We secure direct 5-star room allocations with leading hotels in close walking distance to the holy sanctuaries, protecting the health of your loved ones.",
      icon: <Landmark className="w-5 h-5 text-amber-600" />
    }
  ];

  const scholars = [
    {
      name: "Mufti Mohmmad Ismail",
      role: "Chief Spiritual Director & Hajj Guide",
      credentials: "Graduate of Darul Uloom Deoband & Al-Azhar University. 18+ years leading pilgrim cohorts.",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
    },
    {
      name: "Dr. Sheikh Abdul Malik",
      role: "Senior Scholar & Arabic Liaison",
      credentials: "PhD in Islamic Jurisprudence, Umm Al-Qura University, Makkah. Oversees local Saudi clearances.",
      photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop"
    }
  ];

  return (
    <div id="about-page-container" className="pt-32 sm:pt-40 pb-20 space-y-24 bg-[#FAF8F5]">
      {/* Editorial Header Section */}
      <section className="bg-[#10223b] text-white py-20 sm:py-28 relative overflow-hidden border-b border-amber-500/20">
        <div className="absolute inset-0 bg-linear-to-t from-[#10223b]/95 via-[#10223b]/60 to-transparent z-10" />
        <div className="absolute inset-0 bg-image-pattern opacity-[0.035]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-20 text-center space-y-6">
          <span className="text-amber-400 uppercase tracking-[0.35em] text-[10px] font-bold border border-amber-500/35 px-4 py-2 bg-amber-500/10 backdrop-blur-xs">
            OUR SPIRITUAL MANDATE
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5.5xl font-serif text-[#FAF8F5] font-light max-w-4xl mx-auto leading-tight mt-3">
            Elevating the Pilgrimage with <span className="italic text-amber-400 font-normal">Uncompromising Devotion</span>
          </h1>
          <p className="text-xs sm:text-xs text-slate-300 max-w-2xl mx-auto font-sans leading-relaxed tracking-wide">
            Al Safar is built on the foundation of spiritual authenticity, physical ease, and absolute transparency. We handle the physical details so your heart can dwell in remembrance.
          </p>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
        <div className="text-center max-w-xl mx-auto space-y-3">
          <span className="text-amber-700 font-sans font-bold uppercase tracking-[0.3em] text-[10px] block">THE PILLARS OF AL SAFAR</span>
          <h2 className="text-2xl sm:text-3.5xl font-serif font-light text-[#10223b]">Why Hundreds of Families Trust Us</h2>
          <div className="flex items-center justify-center gap-2 mt-1">
            <span className="h-[1px] w-6 bg-amber-500/20" />
            <span className="text-amber-500 text-xs">✦</span>
            <span className="h-[1px] w-6 bg-amber-500/20" />
          </div>
          <p className="text-xs text-[#10223b]/70 font-sans">Every decision we take is designed to optimize spiritual focus and minimize stressful transits.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((v, i) => (
            <div key={i} className="p-8 bg-[#FAF8F5] border border-amber-500/15 rounded-none space-y-5 luxury-box">
              <div className="w-11 h-11 bg-amber-100/40 border border-amber-500/20 rounded-none flex items-center justify-center">
                {v.icon}
              </div>
              <h3 className="text-sm font-bold font-sans tracking-wide uppercase text-[#10223b]">{v.title}</h3>
              <p className="text-xs text-[#10223b]/75 leading-relaxed">{v.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Female-Friendly & Scholar-Driven Focus banner */}
      <section className="bg-[#FAF8F5] py-20 border-y border-amber-500/15 islamic-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <span className="text-amber-700 uppercase tracking-[0.3em] text-[10px] font-bold block">SAFE & RESPECTFUL COHORTS</span>
            <h2 className="text-2xl sm:text-3.5xl font-serif font-light text-[#10223b]">Dedicated Female Group Leadership & Elder Priority Care</h2>
            <p className="text-xs text-[#10223b]/75 leading-relaxed font-sans">
              To keep our mothers, daughters, and elderly relatives protected, Al Safar implements rigorous physical assistance. Our specialized female-friendly groups are accompanied by experienced female travel supervisors (Murshidat) capable of guiding sisters through theological and functional stages in privacy.
            </p>
            <div className="space-y-3 text-xs text-[#10223b]/85">
              <p className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-505" />
                <span>Dedicated ladies-only transport coaches for ziyarah.</span>
              </p>
              <p className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-505" />
                <span>Fully certified wheelchair services with dedicated helpers at the Mataf level.</span>
              </p>
              <p className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-550" />
                <span>Scholar sessions with customizable micro q&a desks inside Makkah.</span>
              </p>
            </div>
          </div>
          <div className="relative rounded-none overflow-hidden h-[400px] shadow-sm bg-slate-100 border border-amber-500/15 p-1 fine-double-border">
            <div className="w-full h-full relative overflow-hidden">
              <img
                referrerPolicy="no-referrer"
                src="https://images.unsplash.com/photo-1542856391-010fb87dcfed?q=80&w=800&auto=format&fit=crop"
                alt="Makkah Sanctuary"
                className="w-full h-full object-cover brightness-[0.8]"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white text-xs">
                <p className="italic font-serif leading-relaxed text-slate-200">"My aged mother performed her Umrah with zero physical fatigue. The Al Safar guides escorted her right to the wheelchair loop and stayed until Tashahhud completed."</p>
                <span className="block mt-3.5 font-sans font-bold text-amber-400 uppercase tracking-widest text-[9px]">— Farooq Ahmed, Srinagar Office Pilgrim</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Academic scholars segment */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
        <div className="text-center max-w-xl mx-auto space-y-3">
          <span className="text-amber-700 uppercase tracking-[0.3em] text-[10px] font-bold block">THEOLOGICAL AUTHENTICATION</span>
          <h2 className="text-2xl sm:text-3.5xl font-serif font-light text-[#10223b]">Respected Accompanied Scholars</h2>
          <div className="flex items-center justify-center gap-2">
            <span className="h-[1px] w-6 bg-amber-500/20" />
            <span className="text-amber-500 text-xs">✧</span>
            <span className="h-[1px] w-6 bg-amber-500/20" />
          </div>
          <p className="text-xs text-[#10223b]/70 font-sans">Every Hajj and Umrah departure is personally supervised by credentialed Islamic instructors.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto pt-2">
          {scholars.map((sc, idx) => (
            <div key={idx} className="border border-amber-500/15 rounded-none p-8 bg-[#FAF8F5] hover:border-amber-500/40 transition duration-500 flex flex-col sm:flex-row gap-6 items-center luxury-box">
              <img
                src={sc.photo}
                alt={sc.name}
                className="w-20 h-20 rounded-none object-cover shrink-0 bg-slate-100 border border-amber-500/20"
              />
              <div className="space-y-1.5 text-center sm:text-left">
                <h4 className="text-sm font-sans font-bold uppercase tracking-wider text-[#10223b]">{sc.name}</h4>
                <p className="text-[9px] font-sans font-bold text-amber-600 uppercase tracking-wider">{sc.role}</p>
                <p className="text-xs text-[#10223b]/75 leading-relaxed font-sans">{sc.credentials}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Executive Partnership list */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 border-t border-amber-500/10 pt-20 text-center space-y-8">
        <h4 className="text-[9px] font-sans font-bold uppercase tracking-[0.3em] text-amber-700/80">GUARANTEED STAYS WITH LEADING 5-STAR ENTITIES</h4>
        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-14 opacity-90">
          <span className="text-xs sm:text-[11px] font-sans font-bold text-[#10223b] uppercase tracking-[0.25em]">Swissôtel Makkah</span>
          <span className="text-xs sm:text-[11px] font-sans font-bold text-[#10223b] uppercase tracking-[0.25em]">Oberoi Madinah</span>
          <span className="text-xs sm:text-[11px] font-sans font-bold text-[#10223b] uppercase tracking-[0.25em]">Conrad Hotels</span>
          <span className="text-xs sm:text-[11px] font-sans font-bold text-[#10223b] uppercase tracking-[0.25em]">Raffles Palace Makkah</span>
          <span className="text-xs sm:text-[11px] font-sans font-bold text-[#10223b] uppercase tracking-[0.25em]">Fairmont Clock Towers</span>
        </div>
      </section>
    </div>
  );
}
