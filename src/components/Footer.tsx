import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, MailCheck } from 'lucide-react';

interface FooterProps {
  setActivePage: (page: string) => void;
}

export default function Footer({ setActivePage }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const handleLinkClick = (pageId: string) => {
    setActivePage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-slate-950 text-slate-300 border-t border-white/10 pt-16 pb-8 px-4 sm:px-6 relative overflow-hidden">
      {/* Decorative Crescent Moon and Geometric Star Outline */}
      <div className="absolute right-0 bottom-0 w-96 h-96 opacity-[0.03] pointer-events-none stroke-amber-500">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="0.5" />
          <polygon points="50,5 93,50 50,95 7,50" stroke="currentColor" strokeWidth="0.3" />
          <polygon points="50,5 7,50 50,95 93,50" stroke="currentColor" strokeWidth="0.3" transform="rotate(45 50 50)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
        {/* Brand Summary & Spiritual Quote */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-slate-950 font-serif font-bold">
              السفر
            </div>
            <span className="text-lg font-serif font-bold tracking-widest text-white">AL SAFAR</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed font-sans mt-2">
            Established with a deep commitment to excellence, Al Safar brings a blend of traditional spiritual devotion and modern comfort to pilgrims performing Hajj and Umrah. Providing unforgettable custom journeys globally.
          </p>
          {/* Islamic Quote Section */}
          <div className="bg-white/5 border-l-2 border-amber-500 p-3 rounded-r-lg mt-4">
            <p className="text-xs italic text-amber-300 font-serif">
              "And proclaim to the people the Hajj [pilgrimage]; they will come to you on foot and on every lean camel; they will come from every distant pass."
            </p>
            <span className="text-[10px] text-slate-500 block text-right mt-1">— Al-Hajj [22:27]</span>
          </div>
        </div>

        {/* Quick Travel Links */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-amber-400 mb-4 font-serif">
            Exquisite Journeys
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <button onClick={() => handleLinkClick('hajj-packages')} className="hover:text-amber-300 transition cursor-pointer">
                Hajj Programs (Economy, Premium, VIP)
              </button>
            </li>
            <li>
              <button onClick={() => handleLinkClick('umrah-packages')} className="hover:text-amber-300 transition cursor-pointer">
                Umrah Programs (Signature Packages)
              </button>
            </li>
            <li>
              <button onClick={() => handleLinkClick('intl-tours')} className="hover:text-amber-300 transition cursor-pointer">
                Luxury International Tours
              </button>
            </li>
            <li>
              <button onClick={() => handleLinkClick('visa-services')} className="hover:text-amber-300 transition cursor-pointer">
                Pilgrimage & eVisa Services
              </button>
            </li>
            <li>
              <button onClick={() => handleLinkClick('gallery')} className="hover:text-amber-300 transition cursor-pointer">
                Interactive Group Photo Gallery
              </button>
            </li>
            <li>
              <button onClick={() => handleLinkClick('delhi-office')} className="hover:text-amber-300 font-medium text-amber-500 transition cursor-pointer">
                Delhi Head Office Guide
              </button>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div id="footer-contact-info" className="space-y-4">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-amber-400 mb-4 font-serif">
            Delhi Head Office
          </h4>
          <div className="space-y-3 text-xs text-slate-400">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <span>
                Ansari Road, Daryaganj,
                <br />
                Near Fire Station, New Delhi, 110002
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-amber-500 shrink-0" />
              <span>+91 82877 62995 / +91 11 4321 5432</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-amber-500 shrink-0" />
              <span>info@alsafartravels.com</span>
            </div>
          </div>

          <div className="pt-2 flex items-center gap-3">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 hover:bg-amber-500 hover:text-slate-950 rounded-full transition text-slate-300 cursor-pointer">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 hover:bg-amber-500 hover:text-slate-950 rounded-full transition text-slate-300 cursor-pointer">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 hover:bg-amber-500 hover:text-slate-950 rounded-full transition text-slate-300 cursor-pointer">
              <Twitter className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Interactive Newsletter */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-amber-400 mb-4 font-serif">
            Peaceful Updates
          </h4>
          <p className="text-xs text-slate-400 leading-relaxed font-sans">
            Subscribe to our seasonal newsletters. Receive spiritual guides, preparation checklists, and early discount travel packages.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
            <div className="relative">
              <input
                type="email"
                placeholder="Enter your personal email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full text-xs px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-semibold rounded-lg uppercase tracking-wider transition cursor-pointer"
            >
              Subscribe
            </button>
          </form>

          {subscribed && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-1.5 text-xs text-emerald-400"
            >
              <MailCheck className="w-4 h-4" />
              <span>Assigned! Thank you for subscribing.</span>
            </motion.div>
          )}
        </div>
      </div>

      <div className="border-t border-white/5 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 max-w-7xl mx-auto">
        <p>© 2026 Al Safar Tour & Travel. Constructed with absolute devotion. All Rights Reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0 font-sans">
          <button onClick={() => handleLinkClick('about')} className="hover:text-slate-300 cursor-pointer">Privacy Policy</button>
          <button onClick={() => handleLinkClick('about')} className="hover:text-slate-300 cursor-pointer">Terms of Pilgrimage Grace</button>
          <button onClick={() => handleLinkClick('delhi-office')} className="hover:text-slate-300 cursor-pointer font-medium text-amber-600">Location Directory</button>
        </div>
      </div>
    </footer>
  );
}
