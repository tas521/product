import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle2, Award, Calendar, ExternalLink } from 'lucide-react';

export default function Contact() {
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formMsg, setFormMsg] = useState('');
  const [sent, setSent] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formName.trim() && formPhone.trim()) {
      setSent(true);
      setFormName('');
      setFormEmail('');
      setFormPhone('');
      setFormMsg('');
      setTimeout(() => setSent(false), 6000);
    }
  };

  return (
    <div id="contact-page-container" className="pt-32 sm:pt-40 pb-12 space-y-16 bg-white">
      {/* Banner */}
      <section className="bg-slate-950 text-white py-12 px-4 sm:px-6 relative overflow-hidden islamic-pattern">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
        <div className="max-w-7xl mx-auto space-y-3 relative z-10 text-center">
          <span className="text-amber-400 uppercase tracking-widest text-xs font-semibold font-sans">Reach Our travel agents</span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold">Contact Our Offices</h1>
          <p className="text-xs text-slate-400 max-w-xl mx-auto leading-relaxed">
            Call or text us today. Receive direct scholar responses, custom group pricing ratios, and visa checklists.
          </p>
        </div>
      </section>

      {/* Grid: Form + Address card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Form Side */}
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">Digital Dispatch</span>
            <h2 className="text-2xl font-serif font-bold text-slate-950">Inquire Online Itineraries</h2>
            <p className="text-xs text-slate-500">Submit your preferences to initialize bespoke flight lists and room schedules.</p>
          </div>

          {sent ? (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl p-6 text-xs space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 block" />
              <h4 className="font-bold text-sm">Dispatched Successfully!</h4>
              <p>Your inquiry manifest is registered at our Delhi headquarters. We usually call back within 15 minutes.</p>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 block">Full Name</label>
                  <input
                    type="text"
                    placeholder="Mohammad Farhan"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 block">Email Address (Optional)</label>
                  <input
                    type="email"
                    placeholder="farhan@gmail.com"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 block">Call / WhatsApp Phone Number</label>
                <input
                  type="tel"
                  placeholder="+91 82877 62123"
                  required
                  value={formPhone}
                  onChange={(e) => setFormPhone(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 block">Your spiritual requirements or destinations details</label>
                <textarea
                  rows={4}
                  placeholder="Tell us about passenger sizes, elder priorities, special dietary constraints..."
                  value={formMsg}
                  onChange={(e) => setFormMsg(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3 bg-slate-950 hover:bg-slate-800 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-all shadow cursor-pointer text-center"
              >
                Dispatch Manifest
              </button>
            </form>
          )}
        </div>

        {/* Contact and address panels */}
        <div className="space-y-6">
          <div className="border border-slate-200 rounded-2xl p-6 bg-slate-50 space-y-4">
            <h3 className="text-base font-serif font-bold text-slate-950">Delhi Ansari Road HQ</h3>
            <div className="space-y-3 text-xs text-slate-600 font-sans">
              <p className="flex items-start gap-2 leading-relaxed">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>Commercial Block, Ansari Road, Daryaganj, New Delhi, India</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <span>+91 82877 62995 / +91 11 4321 5432</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <span>info@alsafartravels.com</span>
              </p>
            </div>

            <div className="pt-2 border-t border-slate-200 flex flex-col gap-2">
              <a
                href="tel:+918287762995"
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-lg text-center cursor-pointer"
              >
                Call Hotline Direct
              </a>
              <a
                href="https://wa.me/918287762995?text=Salam%20Al%20Safar,%20I%20have%20an%20urgent%20Hajj%20Umrah%20inquiry..."
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-lg text-center flex items-center justify-center gap-1.5"
              >
                WhatsApp Advisor Chat
              </a>
            </div>
          </div>

          <div className="border border-amber-200 rounded-2xl p-6 bg-amber-500/5 space-y-2 text-xs text-amber-900">
            <h4 className="font-bold flex items-center gap-1.5 text-sm font-serif">
              <Award className="w-4 h-4 text-amber-700" />
              Sovereign Hajj Certification
            </h4>
            <p className="leading-relaxed">
              We are an officially recognized Pilgrimage Service certified by the Ministry of Civil Aviation, Hajj Committee, and Joint Chambers of Commerce of India & Saudi Arabia.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
