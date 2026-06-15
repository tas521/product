import React, { useState } from 'react';
import { DELHI_OFFICE_DETAILS } from '../data';
import { MapPin, Phone, Mail, Clock, ShieldAlert, Bus, Navigation, Star, Landmark, Train } from 'lucide-react';

export default function DelhiOffice() {
  const [origin, setOrigin] = useState('cp');
  
  const transitCalculator = {
    'cp': {
      originName: 'Connaught Place (Central Delhi)',
      route: 'Take Blue line from Rajiv Chowk to Mandi House, switch to Violet Line, exit at Dilli Gate Metro Station Gate 3. Walk 5 mins opposite Fire Station.',
      timeEstimate: '12 Minutes Metro ride',
      autoFare: '₹70 - ₹90 standard auto direct.'
    },
    'noida': {
      originName: 'Noida (Sector 18 / Sector 62)',
      route: 'Take Blue Line direct to Mandi House, transfer to Violet Line, exit Dilli Gate Station Gate 3. Drive via Vikas Marg / Yamuna Bridge exit.',
      timeEstimate: '35 Minutes',
      autoFare: '₹220 by app cabs.'
    },
    'gurgaon': {
      originName: 'Gurugram (Cyber City / IFFCO Chowk)',
      route: 'Take Yellow line direct to Central Secretariat, switch to Violet Line, exit at Dilli Gate station Gate 3.',
      timeEstimate: '50 Minutes',
      autoFare: '₹480 app cab direct via NH-48.'
    },
    'srinagar-flyers': {
      originName: 'Indira Gandhi Int Airport (IGIA)',
      route: 'Take Airport Express line direct to New Delhi Railway Station, grab auto direct to Daryaganj Ansari Road (3km).',
      timeEstimate: '45 Minutes',
      autoFare: '₹150 prepay auto.'
    }
  };

  const activeDirections = transitCalculator[origin as keyof typeof transitCalculator] || transitCalculator['cp'];

  return (
    <div id="delhi-office-container" className="pt-32 sm:pt-40 pb-12 space-y-16 bg-white">
      {/* Visual top banner */}
      <section className="bg-slate-950 text-white py-12 px-4 sm:px-6 relative overflow-hidden islamic-pattern">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
        <div className="max-w-7xl mx-auto space-y-3 relative z-10 text-center">
          <span className="text-amber-400 uppercase tracking-widest text-xs font-semibold">Our National Headquarters</span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold">Delhi Presence — Ansari Road</h1>
          <p className="text-xs text-slate-400 max-w-xl mx-auto">
            Conveniently anchored near historic Daryaganj, our premium walk-in hub serves northern India pilgrims with comprehensive offline passport and biometric verifications.
          </p>
        </div>
      </section>

      {/* Main Grid: Details vs Custom Simulated Map */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Office details */}
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">Physical Desk Directory</span>
            <h2 className="text-2xl font-serif font-bold text-slate-950">Walk-in Lounge & Scholar Desks</h2>
            <p className="text-xs text-slate-500 leading-normal">
              Our Delhi branch houses dedicated private discussion suites, where our scholar advisors (Muftis) host tea assemblies and answer theological requirements with complete physical privacy.
            </p>
          </div>

          <div className="border border-slate-200 rounded-2xl p-6 bg-slate-50 space-y-4">
            <div className="flex gap-3 text-xs leading-normal">
              <MapPin className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-slate-950">Principal Address:</p>
                <p className="text-slate-600 mt-1">{DELHI_OFFICE_DETAILS.address}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-200">
              <div className="flex gap-2 items-center text-xs">
                <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Call Desk: <strong>{DELHI_OFFICE_DETAILS.phone}</strong></span>
              </div>
              <div className="flex gap-2 items-center text-xs">
                <Mail className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Direct Mail: <strong>{DELHI_OFFICE_DETAILS.email}</strong></span>
              </div>
            </div>
          </div>

          {/* Business Hours Grid */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">Delhi Office Hours:</h4>
            <div className="border border-slate-200 rounded-xl divide-y divide-slate-100 text-xs text-slate-700 overflow-hidden">
              {DELHI_OFFICE_DETAILS.hours.map((h, i) => (
                <div key={i} className="flex justify-between p-3.5 bg-white">
                  <span className="font-medium text-slate-900">{h.days}</span>
                  <span className="font-mono text-slate-500">{h.times}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Custom Simulated Map + Transit Calculator */}
        <div className="space-y-6">
          <div className="bg-slate-950 text-white rounded-2xl p-6 relative overflow-hidden shadow-xl">
            {/* Simulated Grid lines rendering using css */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:16px_16px] opacity-25" />
            
            <div className="relative z-10 space-y-4">
              <span className="text-[10px] uppercase font-mono text-amber-400 tracking-wider">Simulated Landmark Directory map</span>
              
              {/* Graphic map shape representation */}
              <div className="h-44 bg-slate-900 border border-white/10 rounded-xl p-4 flex flex-col justify-between relative overflow-hidden text-[10px]">
                {/* Landmarks mapped using border lanes */}
                <div className="absolute top-1/2 left-0 right-0 h-4 bg-slate-800 flex items-center justify-center border-y border-white/5 font-sans uppercase tracking-[6px] text-white/40">
                  Ansari Road
                </div>
                <div className="absolute left-1/3 top-0 bottom-0 w-4 bg-slate-800 border-x border-white/5" />
                
                {/* Simulated Metro node */}
                <div className="absolute top-4 left-6 bg-purple-900/90 border border-purple-500/50 px-2 py-1 rounded text-white font-bold flex items-center gap-1">
                  <Train className="w-3 h-3 text-purple-400" />
                  Dilli Gate Metro
                </div>

                {/* Simulated Fire station node */}
                <div className="absolute top-1/4 right-8 bg-rose-950/90 border border-rose-500/30 px-2 py-1 rounded text-white font-bold">
                  🚒 Delhi Fire Station
                </div>

                {/* Al Safar node */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-amber-500 border-2 border-amber-600 text-slate-950 px-3 py-1.5 rounded-lg font-bold font-serif shadow-lg animate-bounce flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 fill-slate-950 text-slate-950" />
                  AL SAFAR HQ
                </div>
              </div>

              {/* Transit Hub List */}
              <div className="space-y-2">
                <p className="text-[10px] uppercase font-semibold text-slate-400">Closest High-Transit Hubs:</p>
                <div className="grid grid-cols-3 gap-2 text-[11px] text-slate-300">
                  {DELHI_OFFICE_DETAILS.transitHubs.map((hub, i) => (
                    <div key={i} className="p-2 bg-white/5 border border-white/10 rounded-lg">
                      <p className="font-bold">{hub.name}</p>
                      <p className="text-[9px] text-amber-400 mt-0.5">{hub.distance}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Transit Calculator select */}
          <div className="border border-slate-200 rounded-2xl p-6 bg-slate-50 space-y-4">
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">Interactive Transit Calculator</h4>
              <p className="text-xs text-slate-500">Pick where you are traveling from within Delhi NCR to compute the route.</p>
            </div>

            <div className="flex gap-2 flex-wrap">
              {[
                { id: 'cp', label: 'Connaught Place' },
                { id: 'noida', label: 'Noida Hub' },
                { id: 'gurgaon', label: 'Gurgaon Tech Deck' },
                { id: 'srinagar-flyers', label: 'Delhi IGI Airport' }
              ].map((originOption) => (
                <button
                  key={originOption.id}
                  onClick={() => setOrigin(originOption.id)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition border cursor-pointer ${
                    origin === originOption.id
                      ? 'bg-slate-900 border-slate-950 text-amber-400'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {originOption.label}
                </button>
              ))}
            </div>

            <div className="bg-white border rounded-xl p-4 text-xs space-y-2 text-slate-700">
              <p className="text-slate-900 font-bold flex items-center gap-1">
                <Navigation className="w-4 h-4 text-amber-500 shrink-0" />
                Directions from {activeDirections.originName}:
              </p>
              <p className="leading-relaxed text-slate-600">{activeDirections.route}</p>
              <div className="pt-2 border-t border-slate-100 flex justify-between text-[11px] text-slate-500">
                <span>⏱️ Transit: <strong>{activeDirections.timeEstimate}</strong></span>
                <span>🛺 Auto rate: <strong>{activeDirections.autoFare}</strong></span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Local landmarks & Parking guide warning */}
      <section className="bg-slate-50 py-12 border-y border-slate-200/60 font-sans">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-8 text-xs text-slate-600">
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 flex items-center gap-1.5 text-sm font-serif">
               Delhi Parking Advice
            </h4>
            <p className="leading-relaxed font-sans">{DELHI_OFFICE_DETAILS.parkingTips}</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 flex items-center gap-1.5 text-sm font-serif">
              Landmarks Guide
            </h4>
            <ul className="space-y-1 font-sans">
              {DELHI_OFFICE_DETAILS.landmarks.map((l, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  <span>{l}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
