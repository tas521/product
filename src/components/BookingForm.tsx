import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, 
  User, 
  Mail, 
  Phone, 
  Calculator, 
  Check, 
  ArrowRight, 
  ShieldCheck, 
  HelpCircle, 
  X, 
  HelpCircle as HelpIcon, 
  FileSpreadsheet,
  MapPin,
  Hotel,
  CheckCircle2,
  AlertCircle,
  HelpCircle as InquiryIcon,
  Sparkles,
  Info
} from 'lucide-react';
import { Package, Booking, Inquiry } from '../types';
import { PACKAGES } from '../data';
import { adminDb } from '../lib/adminDb';

interface BookingFormProps {
  initialPackage?: Package | null;
  isOpen: boolean;
  onClose: () => void;
  currentUser?: {
    uid: string;
    name: string;
    email: string;
    role: 'super_admin' | 'staff_admin' | 'client';
    photoURL?: string | null;
  } | null;
  initialBookingType?: 'booking' | 'inquiry';
  packages?: Package[];
}

export default function BookingForm({ initialPackage = null, isOpen, onClose, currentUser = null, initialBookingType = 'booking', packages = [] }: BookingFormProps) {
  const [step, setStep] = useState(1);
  const [bookingType, setBookingType] = useState<'booking' | 'inquiry'>(initialBookingType); // 'booking' vs 'inquiry'
  const [selectedPack, setSelectedPack] = useState<Package | null>(initialPackage);
  const [travelDate, setTravelDate] = useState('');
  const [travelerCount, setTravelerCount] = useState(1);
  
  // Passenger Info
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  
  // Advanced fields that are important
  const [roomSharing, setRoomSharing] = useState<'quad' | 'triple' | 'double' | 'single'>('quad');
  const [departureCity, setDepartureCity] = useState('Delhi (Srinagar flight connections available)');
  const [passportNumber, setPassportNumber] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [generalMessage, setGeneralMessage] = useState(''); // specific for inquiry custom question

  // Local storage state of active bookings
  const [myBookings, setMyBookings] = useState<Booking[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successBookingId, setSuccessBookingId] = useState('');

  // Initialize selected package and dates
  useEffect(() => {
    if (initialPackage) {
      setSelectedPack(initialPackage);
      if (initialPackage.departureDates.length > 0) {
        setTravelDate(initialPackage.departureDates[0]);
      }
    } else if (packages.length > 0) {
      setSelectedPack(packages[0]);
      if (packages[0].departureDates.length > 0) {
        setTravelDate(packages[0].departureDates[0]);
      }
    }
  }, [initialPackage, isOpen]);

  // Synchronize dynamic initial tab mode when opened
  useEffect(() => {
    if (isOpen) {
      setBookingType(initialBookingType);
      setStep(1); // Reset back to first section
    }
  }, [initialBookingType, isOpen]);

  // Handle user automatic authentication prefill
  useEffect(() => {
    if (currentUser) {
      setEmail(currentUser.email || '');
      if (currentUser.name && !name) {
        setName(currentUser.name);
      }
    } else {
      setEmail('');
    }
  }, [currentUser, isOpen]);

  // Load bookings list log
  useEffect(() => {
    const saved = localStorage.getItem('alsafar_bookings');
    if (saved) {
      try {
        setMyBookings(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handlePackageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const pack = packages.find(p => p.id === e.target.value) || null;
    setSelectedPack(pack);
    if (pack && pack.departureDates.length > 0) {
      setTravelDate(pack.departureDates[0]);
    }
  };

  // Pricing calculation including room surcharges
  const roomSurcharges = {
    quad: 0,
    triple: 150,
    double: 300,
    single: 600
  };

  const currentSurcharge = roomSurcharges[roomSharing] || 0;
  const basePricePerPerson = selectedPack ? selectedPack.price : 0;
  const perPersonTotal = basePricePerPerson + currentSurcharge;
  const computedGrandTotal = perPersonTotal * travelerCount;

  const handleMainSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPack) return;
    setIsSubmitting(true);

    const generatedId = 'AL-SF-' + Math.floor(100000 + Math.random() * 900000);

    try {
      if (bookingType === 'booking') {
        // Formulate complete Booking Data
        const finalBookingData: Booking = {
          id: generatedId,
          packageId: selectedPack.id,
          packageName: selectedPack.title,
          category: selectedPack.category,
          pricePerPerson: perPersonTotal,
          totalPrice: computedGrandTotal,
          travelDate: travelDate || selectedPack.departureDates[0] || 'Flexible',
          travelerCount: travelerCount,
          contactName: name,
          contactEmail: email,
          contactPhone: phone,
          contactAddress: address,
          roomSharing: roomSharing,
          passportNumber: passportNumber || 'NOT-PROVIDED',
          departureCity: departureCity,
          bookingType: 'booking',
          specialRequests: specialRequests || 'None extra requested',
          bookingDate: new Date().toISOString().split('T')[0],
          status: 'pending'
        };

        // Save directly to our centralized Firestore system database
        await adminDb.createDoc('bookings', finalBookingData);

        // Track changes locally on this specific browser
        const updatedLocal = [finalBookingData, ...myBookings];
        setMyBookings(updatedLocal);
        localStorage.setItem('alsafar_bookings', JSON.stringify(updatedLocal));
        setSuccessBookingId(generatedId);
      } else {
        // Formulate an Inquiry Document
        const finalInquiryData: Inquiry = {
          id: generatedId,
          name: name,
          email: email,
          phone: phone,
          travelType: selectedPack.category,
          message: `Package of Interest: ${selectedPack.title}.
Departure hub of interest: ${departureCity}. 
Requested count of pilgrims: ${travelerCount} Pax. 
Target travel period/Date: ${travelDate}. 
Preferred accommodation standard: ${roomSharing.toUpperCase()} Sharing.
Physical address provided: ${address}. 
Passport details: ${passportNumber || 'Not provided'}. 
Specific query message: ${generalMessage || 'Requested pricing brochure details.'}`,
          submittedAt: new Date().toISOString(),
          status: 'new'
        };

        // Save Inquiry directly to firestore
        await adminDb.createDoc('inquiries', finalInquiryData);
        setSuccessBookingId(generatedId);
      }

      setStep(3); // Transition to success checkout page
    } catch (err) {
      console.error("Failed to commit reservation:", err);
      alert("Submission encountered an issue. Let's try again!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelBooking = async (bookingId: string) => {
    try {
      const updated = myBookings.map(b => b.id === bookingId ? { ...b, status: 'cancelled' as const } : b);
      setMyBookings(updated);
      localStorage.setItem('alsafar_bookings', JSON.stringify(updated));
      await adminDb.updateDoc('bookings', bookingId, { status: 'cancelled' });
    } catch (err) {
      console.warn("Could not cancel live booking state:", err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[92vh] overflow-y-auto overflow-x-hidden flex flex-col md:flex-row">
        
        {/* Left Visual Summary Panel (Navy styled) */}
        <div className="bg-[#1B365D] text-white p-6 md:p-8 md:w-1/3 flex flex-col justify-between relative overflow-hidden shrink-0">
          {/* Decorative geometric star inside summary panel */}
          <div className="absolute top-0 right-0 w-32 h-32 opacity-10 pointer-events-none">
            <svg viewBox="0 0 100 100" className="w-full h-full fill-white stroke-white">
              <polygon points="50,5 93,50 50,95 7,50" strokeWidth="2" fill="none" />
              <polygon points="50,5 7,50 50,95 93,50" strokeWidth="2" fill="none" transform="rotate(45 50 50)" />
            </svg>
          </div>

          <div className="relative z-10 space-y-6">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-amber-400 font-bold px-2.5 py-1 bg-white/10 rounded-md">
                {bookingType === 'booking' ? '⚡ Secure Checkout Reservation' : '✉ Free Inquiry Details'}
              </span>
              <h3 className="text-xl font-serif font-bold text-[#F5F2ED] mt-3">Al-Safar Direct Desk</h3>
              <p className="text-xs text-slate-300 mt-1">Configure your physical & spiritual accommodations instantly.</p>
            </div>

            {selectedPack && (
              <div className="bg-white/5 border border-white/10 p-4 rounded-xl space-y-3">
                <p className="text-[10px] uppercase font-sans text-amber-400 font-bold tracking-wider">Active Package Selected</p>
                <h4 className="text-sm font-semibold font-serif text-[#F5F2ED]">{selectedPack.title}</h4>
                <div className="space-y-1.5 text-xs text-slate-200">
                  <p>📂 Pilgrimage Cohort: <strong className="capitalize text-white">{selectedPack.category}</strong></p>
                  <p>⏳ Staying Limit: <strong className="text-white">{selectedPack.durationDays} Days</strong></p>
                  <p>🏨 Quad Starting Rate: <strong className="text-white">${selectedPack.price} USD</strong></p>
                  <p>🛋 Room Type: <strong className="text-amber-300 uppercase">{roomSharing} share</strong></p>
                </div>
              </div>
            )}

            {/* Live Pricing / Surcharge Estimator Widget */}
            {selectedPack && (
              <div className="border-t border-white/10 pt-4 space-y-3">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Base Fare Rate ({travelerCount} pax)</span>
                  <span>${(basePricePerPerson * travelerCount).toLocaleString()}</span>
                </div>
                {roomSharing !== 'quad' && (
                  <div className="flex justify-between text-xs text-amber-300">
                    <span>Room Surcharge ({roomSharing})</span>
                    <span>+${(currentSurcharge * travelerCount).toLocaleString()}</span>
                  </div>
                )}
                
                <div className="border-t border-white/10 pt-2 flex items-baseline justify-between">
                  <span className="text-xs text-slate-300">Total Price Estimate ({travelerCount} Pax)</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xs text-amber-400 font-mono font-medium">USD</span>
                    <span className="text-2xl font-bold font-serif text-amber-400">{(computedGrandTotal).toLocaleString()}</span>
                  </div>
                </div>

                <div className="text-[10px] text-slate-300 space-y-1 bg-black/20 p-2.5 border border-white/15">
                  <p className="flex items-center gap-1 text-emerald-300">✓ Visa & Passport paperwork included</p>
                  <p className="flex items-center gap-1 text-emerald-300">✓ VIP Airport transport and guides</p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 pt-4 border-t border-white/10 relative z-10 space-y-3">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="text-xs text-amber-400 hover:text-amber-300 underline font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              {showHistory ? "Back to Form Screen" : `View My Past Bookings (${myBookings.length})`}
            </button>
            <p className="text-[9px] text-slate-400">Verified Secure SSL Cryptography Encrypted Desk</p>
          </div>
        </div>

        {/* Right Dynamic Form Panel */}
        <div className="p-6 md:p-8 md:w-2/3 flex flex-col justify-between relative bg-[#FDFBF7]">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-900 duration-200 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {showHistory ? (
            /* BOOKING HISTORY LOG VIEW */
            <div className="space-y-6 flex-1 min-h-[380px]">
              <div>
                <h3 className="text-xl font-serif font-bold text-[#1B365D]">Your Local Booking Logs</h3>
                <p className="text-xs text-slate-500 mt-0.5">Manage your active applications and spiritual requests saved privately.</p>
              </div>

              {myBookings.length === 0 ? (
                <div className="bg-stone-50 border border-stone-200 rounded-xl p-8 text-center text-slate-500">
                  <InquiryIcon className="w-10 h-10 text-amber-500/40 mx-auto mb-2" />
                  <p className="text-sm font-medium">No bookings logged yet on this computer.</p>
                  <p className="text-xs text-slate-400 mt-1">Select any available Hajj or Umrah catalog page to begin customized application.</p>
                  <button
                    onClick={() => setShowHistory(false)}
                    className="mt-4 px-4 py-2 bg-[#1B365D] hover:bg-[#1B365D]/95 text-white text-xs font-semibold rounded-lg"
                  >
                    Select Package
                  </button>
                </div>
              ) : (
                <div className="space-y-4 max-h-[420px] overflow-y-auto pr-1">
                  {myBookings.map((b) => (
                    <div key={b.id} className="border border-slate-200 rounded-xl p-4 bg-white shadow-sm space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[10px] font-mono font-semibold text-amber-800 px-2 py-0.5 bg-amber-50 border border-amber-200 rounded">
                            {b.id}
                          </span>
                          <h4 className="text-sm font-bold font-serif text-[#1B365D] mt-1.5">{b.packageName}</h4>
                        </div>
                        <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${
                          b.status === 'confirmed' ? 'bg-emerald-100 text-emerald-800' :
                          b.status === 'cancelled' ? 'bg-rose-100 text-rose-800' :
                          'bg-amber-100 text-amber-850'
                        }`}>
                          {b.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                        <p>👤 Contact: <strong className="text-slate-800">{b.contactName}</strong></p>
                        <p>✈ Depart: <strong className="text-slate-800">{b.travelDate}</strong></p>
                        <p>👥 Pilgrims: <strong className="text-slate-800">{b.travelerCount} People</strong></p>
                        <p>🛋 Room: <strong className="text-slate-800 uppercase">{b.roomSharing || 'quad'}</strong></p>
                        <p className="col-span-2">📍 Address: <span className="text-slate-800 italic">{b.contactAddress || 'Not entered'}</span></p>
                      </div>

                      <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-xs">
                        <span className="text-slate-400 text-[10px]">Submitted: {b.bookingDate}</span>
                        {b.status === 'pending' && (
                          <button
                            onClick={() => handleCancelBooking(b.id)}
                            className="text-rose-600 hover:text-rose-800 font-semibold cursor-pointer text-xs"
                          >
                            Cancel Application
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* STEPPED WIZARD BOOKING FORM */
            <div className="flex-1 min-h-[380px] flex flex-col justify-between">
              <div>
                
                {/* Progress Stepper indicator */}
                <div className="flex items-center gap-6 mb-6 text-xs font-semibold text-slate-400 border-b border-slate-200 pb-2">
                  <span className={`flex items-center gap-1.5 pb-2 border-b-2 ${step >= 1 ? 'border-amber-500 text-[#1B365D]' : 'border-transparent'}`}>
                    <span className="w-5 h-5 rounded-full bg-slate-100 font-mono flex items-center justify-center text-[10px]">1</span>
                    Selection Parameters
                  </span>
                  <span className={`flex items-center gap-1.5 pb-2 border-b-2 ${step >= 2 ? 'border-amber-500 text-[#1B365D]' : 'border-transparent'}`}>
                    <span className="w-5 h-5 rounded-full bg-slate-100 font-mono flex items-center justify-center text-[10px]">2</span>
                    Pilgrim Credentials
                  </span>
                  <span className={`flex items-center gap-1.5 pb-2 border-b-2 ${step === 3 ? 'border-amber-500 text-[#1B365D]' : 'border-transparent'}`}>
                    <span className="w-5 h-5 rounded-full bg-slate-100 font-mono flex items-center justify-center text-[10px]">3</span>
                    Spiritual Complete
                  </span>
                </div>

                {/* TAB SELECTOR: Booking vs Inquiry - Requested by the user */}
                {step < 3 && (
                  <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-lg mb-6">
                    <button
                      type="button"
                      onClick={() => setBookingType('booking')}
                      className={`py-2 text-xs font-bold uppercase tracking-wider transition rounded-md flex items-center justify-center gap-1.5 cursor-pointer ${
                        bookingType === 'booking'
                          ? 'bg-[#1B365D] text-white shadow-sm'
                          : 'text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      Book Now (Firm Spot)
                    </button>
                    <button
                      type="button"
                      onClick={() => setBookingType('inquiry')}
                      className={`py-2 text-xs font-bold uppercase tracking-wider transition rounded-md flex items-center justify-center gap-1.5 cursor-pointer ${
                        bookingType === 'inquiry'
                          ? 'bg-[#1B365D] text-white shadow-sm'
                          : 'text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      <Mail className="w-3.5 h-3.5" />
                      Send Package Inquiry
                    </button>
                  </div>
                )}

                {/* FORM STEP 1 */}
                {step === 1 && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-600 flex items-start gap-2.5">
                      <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <p>
                        {bookingType === 'booking' 
                          ? 'You are initiating a direct package slot reservation. We calculate prices transparently and block airline tickets for you instantly.' 
                          : 'Need custom customization, quote breakdowns, or have questions? Use inquiry mode for free assistance on specific packages.'}
                      </p>
                    </div>

                    <div className="space-y-4">
                      {/* Select Package Dropdown */}
                      <div className="grid grid-cols-1 gap-1">
                        <label className="text-xs font-bold text-slate-700 block uppercase tracking-wider">Choose Sanctuary Package / Program</label>
                        <select
                          value={selectedPack?.id || ''}
                          onChange={handlePackageChange}
                          className="w-full text-xs px-4 py-3 bg-white border border-slate-300 rounded-lg text-slate-950 focus:ring-1 focus:ring-amber-500 focus:outline-none"
                        >
                          {packages.map((p) => (
                            <option key={p.id} value={p.id}>
                              [{p.category.toUpperCase()}] {p.title} — ${p.price} USD
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Room standard Selection - Core custom feature to make it easy */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700 block uppercase tracking-wider flex items-center gap-1">
                          <Hotel className="w-3.5 h-3.5 text-amber-600" />
                          Accommodation Preference (Per Person Rate impact)
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {(['quad', 'triple', 'double', 'single'] as const).map((r) => (
                            <button
                              key={r}
                              type="button"
                              onClick={() => setRoomSharing(r)}
                              className={`p-2.5 border text-center transition flex flex-col justify-between items-center rounded-lg ${
                                roomSharing === r
                                  ? 'border-amber-500 bg-amber-500/5 text-[#1B365D] ring-1 ring-amber-500'
                                  : 'border-slate-200 bg-white text-slate-750 hover:bg-slate-50'
                              }`}
                            >
                              <span className="text-[10px] font-bold uppercase tracking-wider">{r} sharing</span>
                              <span className="text-[10px] font-mono mt-1 text-slate-500">
                                {r === 'quad' ? 'Standard 0' : r === 'triple' ? '+$150 USD' : r === 'double' ? '+$300 USD' : '+$600 USD'}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Departure Date Selection */}
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-700 block uppercase tracking-wider flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-amber-600" />
                            Target Departure Schedule
                          </label>
                          {selectedPack && selectedPack.departureDates.length > 0 ? (
                            <select
                              value={travelDate}
                              onChange={(e) => setTravelDate(e.target.value)}
                              className="w-full text-xs px-4 py-3 bg-white border border-slate-300 rounded-lg focus:ring-1 focus:ring-amber-500 focus:outline-none"
                            >
                              {selectedPack.departureDates.map((date) => (
                                <option key={date} value={date}>{date} (Official Flyout)</option>
                              ))}
                            </select>
                          ) : (
                            <input
                              type="date"
                              value={travelDate}
                              onChange={(e) => setTravelDate(e.target.value)}
                              required
                              className="w-full text-xs px-4 py-3 bg-white border border-slate-300 rounded-lg focus:ring-1 focus:ring-amber-500"
                            />
                          )}
                        </div>

                        {/* Departure City */}
                        <div className="space-y-1.5">
                          <label className="text-xs font-bold text-slate-700 block uppercase tracking-wider flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-amber-600" />
                            Pre-arranged Flight Hub
                          </label>
                          <select
                            value={departureCity}
                            onChange={(e) => setDepartureCity(e.target.value)}
                            className="w-full text-xs px-4 py-3 bg-white border border-slate-300 rounded-lg focus:ring-1 focus:ring-amber-500 focus:outline-none"
                          >
                            <option value="Delhi (Srinagar flight connections available)">Delhi (Srinagar Flight Connection)</option>
                            <option value="Mumbai Internatioal Airport">Mumbai Airport</option>
                            <option value="Srinagar Airport Direct Group">Srinagar Direct Group</option>
                            <option value="Lucknow Amausi Airport">Lucknow Airport</option>
                            <option value="Self-Arranged Visa/Flight Hub">Self-Arranged (Discounted Tour only)</option>
                          </select>
                        </div>
                      </div>

                      {/* Traveler Count / How many people */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700 block uppercase tracking-wider flex items-center gap-1">
                          <User className="w-3.5 h-3.5 text-amber-600" />
                          How many people (Total Pilgrims)
                        </label>
                        <div className="flex items-center border border-slate-300 rounded-lg bg-white overflow-hidden max-w-xs">
                          <button
                            type="button"
                            onClick={() => setTravelerCount(Math.max(1, travelerCount - 1))}
                            className="px-4 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold border-r border-slate-300 transition cursor-pointer"
                          >
                            -
                          </button>
                          <span className="flex-1 text-center font-mono font-bold text-xs text-slate-900">
                            {travelerCount} Person{travelerCount > 1 ? 's' : ''}
                          </span>
                          <button
                            type="button"
                            onClick={() => setTravelerCount(Math.min(10, travelerCount + 1))}
                            className="px-4 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold border-l border-slate-300 transition cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>

                    </div>

                    <div className="pt-4 flex justify-end">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#1B365D] hover:bg-[#1B365D]/90 text-white rounded-lg text-xs font-bold tracking-wider uppercase shadow cursor-pointer transition"
                      >
                        Next: Pilgrim Details
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* FORM STEP 2 */}
                {step === 2 && (
                  <form onSubmit={handleMainSubmit} className="space-y-4 animate-fadeIn">
                    <div>
                      <h3 className="text-base font-serif font-bold text-[#1B365D]">Step 2: Main Contact & Document Credentials</h3>
                      <p className="text-xs text-slate-500 mt-0.5">Please provide authentic details for visa processing and physical documentation courier.</p>
                    </div>

                    {/* Email pre-filling locked warning box if logged in */}
                    {currentUser ? (
                      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-800 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <div>
                          <strong>Verified Email Connected:</strong> <span className="font-mono">{email}</span>. This booking will be securely linked to your profile dashboard.
                        </div>
                      </div>
                    ) : (
                      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-xs text-amber-800 flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <strong>Guest Booking Notice:</strong> You are not signed-in. Consider signing-in or signing-up so your Hajj/Umrah permits track on your live client panel.
                        </div>
                      </div>
                    )}

                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Name */}
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-700 block uppercase tracking-wider">Representative Name (as in passport)</label>
                          <div className="relative">
                            <span className="absolute left-3 top-3 text-slate-400">
                              <User className="w-4 h-4" />
                            </span>
                            <input
                              type="text"
                              placeholder="e.g. Haji Mohammad Ali"
                              required
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className="w-full text-xs pl-9 pr-4 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                            />
                          </div>
                        </div>

                        {/* Email - Handled as requested "use their signed-in email account as email" */}
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-700 block uppercase tracking-wider">Email Address</label>
                          <div className="relative">
                            <span className="absolute left-3 top-3 text-slate-400">
                              <Mail className="w-4 h-4" />
                            </span>
                            <input
                              type="email"
                              placeholder="yourname@gmail.com"
                              required
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              disabled={!!currentUser}
                              className={`w-full text-xs pl-9 pr-4 py-2.5 border rounded-lg focus:outline-none ${
                                currentUser 
                                  ? 'bg-slate-100 border-slate-200 text-slate-500 font-mono cursor-not-allowed'
                                  : 'bg-white border-slate-300 text-slate-900 focus:ring-1 focus:ring-amber-500'
                              }`}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Phone Number */}
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-700 block uppercase tracking-wider">WhatsApp / Phone Number</label>
                          <div className="relative">
                            <span className="absolute left-3 top-3 text-slate-300">
                              <Phone className="w-4 h-4" />
                            </span>
                            <input
                              type="tel"
                              placeholder="e.g. +91 82877 62995"
                              required
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              className="w-full text-xs pl-9 pr-4 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                            />
                          </div>
                        </div>

                        {/* Passport Number */}
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-700 block uppercase tracking-wider flex items-center gap-1">
                            Passport Identification (Required for vising)
                            <span className="text-[10px] text-slate-400 font-normal normal-case">(Optional but advised)</span>
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Z9951234"
                            value={passportNumber}
                            onChange={(e) => setPassportNumber(e.target.value)}
                            className="w-full text-xs px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                          />
                        </div>
                      </div>

                      {/* PHYSICAL ADDRESS - Highly requested by user */}
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700 block uppercase tracking-wider">Courier/Physical Address (Required for kit & visas)</label>
                        <textarea
                          placeholder="Provide complete shipping/home address with PIN code so Al Safar physical manuals, boarding passes, bags, and holy water (Zamzam) tags reach you safely."
                          required
                          rows={2}
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          className="w-full text-xs p-3 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                        />
                      </div>

                      {bookingType === 'inquiry' ? (
                        /* Additional Query message for inquiries */
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-700 block uppercase tracking-wider">Your Inquiry Question / Customization Requests</label>
                          <textarea
                            placeholder="State your custom demands, date adjustments, or physical guides questions here."
                            rows={2}
                            value={generalMessage}
                            onChange={(e) => setGeneralMessage(e.target.value)}
                            className="w-full text-xs p-3 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                          />
                        </div>
                      ) : (
                        /* Special requests for bookings */
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-700 block uppercase tracking-wider">Special Requests (Medical/Diet/Wheelchair)</label>
                          <input
                            type="text"
                            placeholder="e.g. Wheelchair passenger support, low salt, etc."
                            value={specialRequests}
                            onChange={(e) => setSpecialRequests(e.target.value)}
                            className="w-full text-xs px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
                          />
                        </div>
                      )}

                      <div className="bg-[#1B365D]/5 border border-[#1B365D]/10 p-3 rounded-lg flex items-start gap-2.5 text-[11px] text-[#1B365D] leading-relaxed">
                        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <p>
                          <strong>Secure Guarantee:</strong> Your information is saved securely on the centralized Al Safar database. An officer will dials and verify flight availability before sharing boarding slips.
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 flex justify-between gap-4 border-t border-slate-200">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="px-5 py-2.5 border border-slate-300 hover:bg-slate-150 rounded-lg text-xs font-bold uppercase transition cursor-pointer"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs tracking-wider uppercase shadow cursor-pointer transition flex items-center gap-1.5"
                      >
                        {isSubmitting ? 'Processing Submission...' : bookingType === 'booking' ? 'Confirm Sanctuary Reservation ✓' : 'Submit Inbound Inquiry ✓'}
                      </button>
                    </div>
                  </form>
                )}

                {/* FORM STEP 3 - SUCCESS RECEIPT SCREEN */}
                {step === 3 && (
                  <div className="text-center py-6 space-y-6 animate-fadeIn">
                    <div className="w-16 h-16 bg-emerald-150 text-emerald-700 rounded-full flex items-center justify-center mx-auto ring-4 ring-emerald-50">
                      <Check className="w-8 h-8" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-xl font-serif font-bold text-slate-900">
                        {bookingType === 'booking' ? 'Your Spiritual Itinerary is Registered!' : 'Your Package Inquiry is Submitted!'}
                      </h3>
                      <p className="text-xs text-slate-500 max-w-lg mx-auto">
                        Al-Safar tour officers have been notified instantly. A digital copy of your reservation has been saved securely to ID: <span className="font-mono font-bold text-slate-800">{successBookingId}</span>.
                      </p>
                    </div>

                    <div className="bg-stone-50 rounded-xl p-5 border border-stone-200 text-left max-w-md mx-auto space-y-3 shadow-inner">
                      <h4 className="text-[10px] font-mono text-slate-400 text-center uppercase tracking-widest border-b border-stone-200 pb-1.5 font-bold">Registration Slips Receipt</h4>
                      <p className="text-xs text-slate-600 flex justify-between">
                        <span>Representative Pilgrim:</span>
                        <strong className="text-slate-900">{name}</strong>
                      </p>
                      <p className="text-xs text-slate-600 flex justify-between">
                        <span>Sanctuary Package:</span>
                        <strong className="text-slate-900">{selectedPack?.title}</strong>
                      </p>
                      <p className="text-xs text-slate-600 flex justify-between">
                        <span>Accommodation share:</span>
                        <strong className="text-slate-900 uppercase">{roomSharing} Accommodation</strong>
                      </p>
                      <p className="text-xs text-slate-600 flex justify-between">
                        <span>Physical Address:</span>
                        <strong className="text-slate-900 text-right truncate max-w-[200px]">{address}</strong>
                      </p>
                      <p className="text-xs text-slate-600 flex justify-between">
                        <span>Departure Hub:</span>
                        <strong className="text-slate-900">{departureCity.split('(')[0]}</strong>
                      </p>
                      
                      {bookingType === 'booking' && (
                        <p className="text-xs text-slate-600 flex justify-between border-t border-dashed border-stone-200 pt-2">
                          <span>Total Amount:</span>
                          <strong className="text-amber-700 text-sm font-mono font-bold">
                            ${computedGrandTotal.toLocaleString()} USD
                          </strong>
                        </p>
                      )}
                    </div>

                    <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
                      <a
                        href={`https://wa.me/918287762995?text=Assalamu%20Alaikum%20Al%20Safar%20Desk,%20I%20have%20submitted%20a%20${bookingType}%2520request%2520for%2520${selectedPack?.title}%2520(ID:%2520${successBookingId}).%2520Representative:%2520${name}.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold uppercase tracking-wider shadow flex items-center justify-center gap-1.5 transition text-center cursor-pointer"
                      >
                        Connect Direct WhatsApp Desk
                      </a>
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          setStep(1);
                          setName('');
                          setEmail('');
                          setPhone('');
                          setAddress('');
                          setPassportNumber('');
                          setSpecialRequests('');
                          setGeneralMessage('');
                        }}
                        className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition cursor-pointer"
                      >
                        Done & Continue Browsing
                      </button>
                    </div>
                  </div>
                )}

              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
