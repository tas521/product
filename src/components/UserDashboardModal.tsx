import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { X, Calendar, Users, MapPin, CheckCircle, Bell, ArrowRight, Phone, RefreshCw, AlertCircle, Bookmark, ScrollText, Signpost } from 'lucide-react';
import { adminDb } from '../lib/adminDb';
import { Booking, Inquiry } from '../types';

interface UserDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: { uid: string; name: string; email: string; role: 'super_admin' | 'staff_admin' | 'client'; photoURL?: string | null } | null;
  onLogout: () => void;
}

export default function UserDashboardModal({ isOpen, onClose, currentUser, onLogout }: UserDashboardModalProps) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && currentUser) {
      fetchUserData();
    }
  }, [isOpen, currentUser]);

  const fetchUserData = async () => {
    if (!currentUser) return;
    setLoading(true);
    try {
      const userEmail = currentUser.email.toLowerCase().trim();
      
      // Fetch specifically filtered results to comply with Firestore match security rules
      const userBookings = await adminDb.getClientBookings(userEmail);
      const userInquiries = await adminDb.getClientInquiries(userEmail);

      setBookings(userBookings);
      setInquiries(userInquiries);
    } catch (err) {
      console.warn("Failed to retrieve client data:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !currentUser) return null;

  return (
    <div className="fixed inset-0 z-55 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 15 }}
        className="relative max-w-2xl w-full bg-[#F5F2ED] border border-[#1B365D]/30 shadow-2xl p-6 md:p-8 rounded-none text-[#1B365D] overflow-hidden"
      >
        {/* Absolute branding backgrounds */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-amber-500/5 rotate-45 transform translate-x-12 -translate-y-12 pointer-events-none" />

        {/* Header Exit */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#1B365D]/60 hover:text-[#1B365D] transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Greeting Card */}
        <div className="border-b border-[#1B365D]/15 pb-6 mb-6 flex items-center gap-4">
          {currentUser.photoURL ? (
            <img
              src={currentUser.photoURL}
              alt={currentUser.name}
              referrerPolicy="no-referrer"
              className="w-14 h-14 rounded-full object-cover border-2 border-amber-500 shadow-sm shrink-0"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-[#1B365D]/10 text-[#1B365D] border border-amber-600/30 flex items-center justify-center font-bold text-xl font-serif shrink-0">
              {currentUser.name.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-[9px] uppercase tracking-widest font-bold">
                Pilgrim Member Account
              </span>
              <button 
                onClick={fetchUserData}
                title="Refresh tracking data"
                className="text-[#1B365D]/50 hover:text-[#1B365D] transition cursor-pointer"
              >
                <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>
            <h2 className="text-2xl font-serif font-bold text-[#1B365D] mt-1">
              As-salamu Alaykum, Haji {currentUser.name}
            </h2>
            <p className="text-xs text-[#1B365D]/75 mt-0.5">
              Logged in as <strong className="text-amber-700 font-mono select-all shrink-0">{currentUser.email}</strong>
            </p>
          </div>
        </div>

        {/* Dashboard Panels */}
        <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2 font-sans">
          
          {/* Active Bookings Trackers */}
          <div>
            <h3 className="text-xs uppercase font-extrabold tracking-widest text-amber-600 mb-3 flex items-center gap-1.5">
              <Bookmark className="w-3.5 h-3.5 text-amber-500" /> Active Pilgrimage Reservations ({bookings.length})
            </h3>

            {loading ? (
              <div className="py-6 text-center text-xs text-[#1B365D]/65">
                <RefreshCw className="w-5 h-5 animate-spin mx-auto text-amber-500 mb-2" />
                Querying Saudi booking nodes...
              </div>
            ) : bookings.length === 0 ? (
              <div className="p-6 bg-amber-500/5 border border-amber-500/10 text-center text-xs text-[#1B365D]/70 space-y-2">
                <AlertCircle className="w-6 h-6 text-amber-600 mx-auto" />
                <p>No active package reservations linked to <strong>{currentUser.email}</strong> yet.</p>
                <p className="text-[10px] text-slate-400">If you completed a booking via guest checkout or physically, contact Delhi Office to link your mail.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map((booking) => {
                  const statusColors = {
                    pending: 'bg-amber-100 text-amber-800 border-amber-200',
                    confirmed: 'bg-emerald-100 text-emerald-800 border-emerald-200',
                    completed: 'bg-indigo-100 text-indigo-800 border-indigo-200',
                    cancelled: 'bg-rose-100 text-rose-800 border-rose-200'
                  };
                  const statusLabel = {
                    pending: 'Verification Pending',
                    confirmed: 'Clearance Granted',
                    completed: 'Service Completed',
                    cancelled: 'Expunged / Void'
                  };

                  return (
                    <div 
                      key={booking.id} 
                      className="bg-white border border-[#1B365D]/15 p-4 relative shadow-sm hover:border-[#1B365D]/35 transition-all"
                    >
                      {/* Booking Category Header */}
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-amber-600 font-mono tracking-wide">
                            {booking.category} journey
                          </span>
                          <h4 className="text-sm font-bold font-serif text-[#1B365D] mt-0.5">
                            {booking.packageName}
                          </h4>
                        </div>
                        <span className={`px-2 py-0.5 text-[10px] font-bold border rounded-full ${statusColors[booking.status || 'pending']}`}>
                          {statusLabel[booking.status || 'pending']}
                        </span>
                      </div>

                      {/* Details specs */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-[11px] text-[#1B365D]/80 border-t border-b border-slate-100 py-3 mt-3">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          <span>Depart: <strong>{booking.travelDate}</strong></span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          <span>Pilgrims: <strong>{booking.travelerCount} pax</strong></span>
                        </div>
                        <div className="flex items-center gap-1.5 col-span-2 sm:col-span-1">
                          <ScrollText className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          <span className="font-mono">Ref: <strong className="text-amber-700 bg-amber-500/5 px-1 py-0.2">{booking.referenceNumber || booking.id.toUpperCase()}</strong></span>
                        </div>
                      </div>

                      {/* Payment or special guidance details */}
                      <div className="mt-3 text-[11px] text-slate-500 leading-relaxed">
                        <p>Total Cost: <strong className="text-[#1B365D]">${booking.totalPrice} USD</strong></p>
                        {booking.specialRequests ? (
                          <p className="mt-1 bg-amber-500/5 border-l-2 border-amber-500 p-1.5 text-[10px] italic">
                            💡 Custom request queued: "{booking.specialRequests}"
                          </p>
                        ) : null}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Submitted inquiries & eVisa queues */}
          <div className="border-t border-[#1B365D]/10 pt-6">
            <h3 className="text-xs uppercase font-extrabold tracking-widest text-[#1B365D]/80 mb-3 flex items-center gap-1.5">
              <Signpost className="w-3.5 h-3.5 text-amber-600" /> Administrative Requests & eVisa Inquiries ({inquiries.length})
            </h3>

            {loading ? (
              null
            ) : inquiries.length === 0 ? (
              <p className="text-[11px] text-slate-400 italic">No previous visa processing or administrative tickets recorded.</p>
            ) : (
              <div className="space-y-3">
                {inquiries.map((inquiry) => (
                  <div key={inquiry.id} className="bg-slate-50 border border-slate-200/60 p-3 text-xs">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold text-amber-700 capitalize font-mono text-[10px]">
                        {inquiry.travelType} Advisory Ticket
                      </span>
                      <span className={`px-1.5 py-0.2 text-[9px] font-bold ${inquiry.status === 'replied' ? 'text-emerald-700 bg-emerald-50' : 'text-amber-700 bg-amber-50'}`}>
                        {inquiry.status === 'replied' ? 'Resolved / Replied' : 'Queued'}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 italic">" {inquiry.message} "</p>
                    {inquiry.notes && (
                      <div className="mt-2 pl-3 border-l-2 border-emerald-500 text-[10px] text-emerald-800 font-sans">
                        <strong>Hajj Officer Response:</strong> {inquiry.notes}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Footer actions inside Dashboard */}
        <div className="mt-8 pt-4 border-t border-[#1B365D]/15 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5 text-amber-600 font-semibold font-mono">
            <Phone className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
            <span>Delhi Head Office Helpline: +91 82877 62995</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onLogout}
              className="flex-1 sm:flex-initial px-4 py-2 bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 text-center font-bold uppercase tracking-widest text-[10px] transition rounded-none cursor-pointer"
            >
              Log Out Session
            </button>
            <button
              onClick={onClose}
              className="flex-1 sm:flex-initial px-5 py-2 bg-[#1B365D] hover:bg-[#1B365D]/95 text-[#F5F2ED] font-bold uppercase tracking-widest text-[10px] transition rounded-none cursor-pointer"
            >
              Close Track Window
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
