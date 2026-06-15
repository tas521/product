import React, { useState } from 'react';
import { ShieldCheck, ClipboardCheck, FileText, CheckCircle2, Send, HelpCircle, Mail, Phone, Calendar } from 'lucide-react';

export default function VisaServices() {
  const [nationality, setNationality] = useState('Indian');
  const [destination, setDestination] = useState('saudi-umrah');
  const [visaInquirySubmitted, setVisaInquirySubmitted] = useState(false);

  // Form Fields
  const [visaName, setVisaName] = useState('');
  const [visaPhone, setVisaPhone] = useState('');

  const visaCategories = {
    'saudi-umrah': {
      title: 'Saudi Official Umrah Visa',
      stay: 'Up to 90 Days (Single/Multi-Entry options)',
      fees: '$120 USD (Includes standard Medical Insurance)',
      duration: '24 to 48 Hours Processing Limit',
      papers: [
        'Scanned Color Bio-page of Passport (Valid for at least 6 months)',
        'Passport size photograph with clean white background',
        'Confirmed Return Flight Tickets',
        'Meningococcal Meningitis Vaccination Certificate'
      ],
      description: 'The premium visa category mapping your Zamzam luggage quotas and complete group insurance rules under the Ministry of Hajj.'
    },
    'saudi-tourist': {
      title: 'Saudi eVisa (Multi-Entry Tourist)',
      stay: 'Up to 90 Days stay per entry (Valid for 1 Full Year)',
      fees: '$150 USD (Includes comprehensive medical coverage)',
      duration: 'Instant / Same-day Delivery',
      papers: [
        'Passport Bio-page scan',
        'Valid Credit Card for internal immigration portals',
        'Registered Address of stay'
      ],
      description: 'Ideal option for solo pilgrims or quick premium travel stopovers with complete regional freedom to tour Saudi treasures.'
    },
    'schengen': {
      title: 'Schengen European Visitor Visa',
      stay: 'Up to 90 Days (Within 180-day cycle)',
      fees: '€80 EUR Embassy Fee',
      duration: '15 to 20 Business Days',
      papers: [
        'Original Passport with 3 blank pages',
        'Detailed 6-Month Personal Bank statements (Signed & Sealed)',
        'Income Tax Returns (ITR-V) for past 2 assessment years',
        'Confirmed Travel Itinerary & Hotel Reservable vouchers'
      ],
      description: 'Essential documentation support coordinated by Al Safar team to ensure Schengen compliance for our European tours.'
    },
    'dubai': {
      title: 'Dubai Express Tourist Visa',
      stay: '30 Days / 60 Days Single Entry options',
      fees: '$95 USD',
      duration: '36 Hours Processing Limits',
      papers: [
        'Passport Bio-page clear scan',
        'High-resolution White background passport Photo',
        'Relative co-guarantor document (if requested)'
      ],
      description: 'Express electronic visas generated directly via our direct UAE immigration liaison.'
    }
  };

  const handleVisaInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (visaName.trim() && visaPhone.trim()) {
      setVisaInquirySubmitted(true);
      setVisaName('');
      setVisaPhone('');
      setTimeout(() => setVisaInquirySubmitted(false), 5000);
    }
  };

  const activeDetails = visaCategories[destination as keyof typeof visaCategories] || visaCategories['saudi-umrah'];

  return (
    <div id="visa-services-container" className="pt-32 sm:pt-40 pb-12 space-y-16">
      {/* Editorial Header banner */}
      <section className="bg-slate-950 text-white py-16 px-4 sm:px-6 relative overflow-hidden islamic-pattern">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
        <div className="max-w-7xl mx-auto space-y-4 relative z-10 text-center">
          <span className="text-amber-400 uppercase tracking-widest text-xs font-semibold">Fast Legal Clearances</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold">Embassy & eVisa Documentation Desk</h1>
          <p className="text-xs text-slate-400 max-w-xl mx-auto leading-relaxed">
            Eliminate complexity. Our specialized visa desk handles everything from biometric mappings to legal translations, guaranteeing pristine application structure.
          </p>
        </div>
      </section>

      {/* Main Visa Selector and Description Deck */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Helper Selector Control */}
        <div className="space-y-6 bg-slate-50 border border-slate-200 rounded-2xl p-6 h-fit">
          <div className="space-y-2">
            <h3 className="text-base font-serif font-bold text-slate-900">Configure Eligibility</h3>
            <p className="text-xs text-slate-500">Pick your traveler passport nationality and destination choice to fetch core documents.</p>
          </div>

          <div className="space-y-4">
            {/* Nationality Selection */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 block text-left">Your Passport Nationality</label>
              <select
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
                className="w-full text-xs px-3 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-950 text-left focus:ring-1 focus:ring-amber-500"
              >
                <option value="Indian">Republic of India (Standard Passport)</option>
                <option value="Bangladeshi">Bangladesh Passport</option>
                <option value="Pakistani">Pakistan Passport</option>
                <option value="Nepali">Nepal Passport</option>
                <option value="SriLankan">Sri Lanka Passport</option>
              </select>
            </div>

            {/* Destination Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 block text-left">Destination Destination Visa</label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full text-xs px-3 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-950 focus:ring-1 focus:ring-amber-500"
              >
                <option value="saudi-umrah">Saudi Official Umrah Visa (Haram Approved)</option>
                <option value="saudi-tourist">Saudi eVisa (Multi-Entry Tourist)</option>
                <option value="schengen">Schengen Europe Visas (France/Swiss Tour)</option>
                <option value="dubai">UAE Dubai Express Entry</option>
              </select>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-800 space-y-1">
            <p className="font-bold flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-amber-700" />
              Verified Saudi Agency License
            </p>
            <p className="leading-relaxed">Al Safar is officially authorized by Saudi Ministry of Foreign Affairs (MoFA) with registered offline portal credentials.</p>
          </div>
        </div>

        {/* Requirements Display deck */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm lg:col-span-2 space-y-6">
          <div className="border-b border-slate-200 pb-4 space-y-2">
            <span className="text-[10px] uppercase font-bold text-amber-600 tracking-wider">Dynamic Guidelines - {nationality} Passport</span>
            <h2 className="text-xl font-serif font-bold text-slate-900">{activeDetails.title}</h2>
            <p className="text-xs text-slate-500">{activeDetails.description}</p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
              <p className="text-[10px] uppercase font-bold text-slate-400">Permitted Limit</p>
              <p className="text-xs font-bold font-serif text-slate-800 mt-1">{activeDetails.stay}</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
              <p className="text-[10px] uppercase font-bold text-slate-400">Embassy Fees approx</p>
              <p className="text-xs font-bold font-serif text-slate-800 mt-1">{activeDetails.fees}</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
              <p className="text-[10px] uppercase font-bold text-slate-400">Assured Duration</p>
              <p className="text-xs font-bold font-serif text-slate-800 mt-1">{activeDetails.duration}</p>
            </div>
          </div>

          {/* Paper Checklists */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Required Documentation Checklist:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
              {activeDetails.papers.map((p, index) => (
                <div key={index} className="flex gap-2.5 items-start p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{p}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Visa application inquiry */}
          <div className="border-t border-slate-200 pt-6 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Initiate Instant Visa Eligibility Call</h4>
            
            {visaInquirySubmitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-xs text-emerald-800">
                ✓ <strong>Request Dispatched:</strong> Your visa assessment profile was logged successfully. A Delhi office Visa Liaison officer will coordinate within 15 minutes.
              </div>
            ) : (
              <form onSubmit={handleVisaInquiry} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder="Your Full Name"
                  required
                  value={visaName}
                  onChange={(e) => setVisaName(e.target.value)}
                  className="flex-1 text-xs px-3.5 py-2.5 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
                <input
                  type="tel"
                  placeholder="Primary Call / WhatsApp"
                  required
                  value={visaPhone}
                  onChange={(e) => setVisaPhone(e.target.value)}
                  className="flex-1 text-xs px-3.5 py-2.5 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold uppercase tracking-wider text-[11px] rounded-lg transition-all duration-300 shadow cursor-pointer text-center"
                >
                  Schedule Appraisal
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* Helpful Warnings F.A.Q Section */}
      <section className="bg-slate-50 py-12 border-y border-slate-200/60 font-sans">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h3 className="text-xl font-serif font-bold text-slate-950">Biometric & Travel Requirements Support FAQ</h3>
            <p className="text-xs text-slate-500">Essential reminders set by Saudi authorities and international border controls.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs text-slate-600">
            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 flex items-center gap-1 text-sm font-serif">❔ What is the Tasheer Biometric requirement for Indians?</h4>
              <p className="leading-relaxed">All pilgrims applying for a dedicated official Umrah Visa must record their ten-print fingerprints at designated Tasheer regional locations. Al Safar manages slot bookings and priority fast-tracks for elders.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 flex items-center gap-1 text-sm font-serif">❔ Can women perform Umrah without a Mahram (Male Guardian)?</h4>
              <p className="leading-relaxed">Yes. In 2026, Saudi Ministry of Hajj allows ladies of all nationalities above age 18 to apply and travel independently or in dedicated women-only travel groups managed by respectful supervisors (Murshidat).</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
