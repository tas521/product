import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Lock, Mail, Eye, EyeOff, Sparkles, CheckCircle, ShieldAlert, ArrowRight, Compass, Shield, User, Phone } from 'lucide-react';
import { isLiveFirebase, auth } from '../lib/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { adminDb } from '../lib/adminDb';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: { uid: string; name: string; email: string; role: 'super_admin' | 'staff_admin' | 'client' }) => void;
}

export default function LoginModal({ isOpen, onClose, onLoginSuccess }: LoginModalProps) {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    const emailInput = email.trim().toLowerCase();
    const passwordInput = password;
    const nameInput = name.trim();
    const phoneInput = phone.trim();

    if (!emailInput || !passwordInput) {
      setError('Please provide email and password.');
      setIsLoading(false);
      return;
    }

    if (mode === 'signup') {
      if (!nameInput) {
        setError('Please provide your full name.');
        setIsLoading(false);
        return;
      }
      if (passwordInput.length < 6) {
        setError('Password must be at least 6 characters long.');
        setIsLoading(false);
        return;
      }
      if (passwordInput !== confirmPassword) {
        setError('Passwords do not match.');
        setIsLoading(false);
        return;
      }
    }

    // Identify roles based on pre-authorized staff accounts
    const isAdmin = 
      (emailInput === 'starltd49@gmail.com' && passwordInput === 'star3556@') ||
      (emailInput === '93151f5941@gmail.com' && passwordInput === 'admin123') ||
      (emailInput === 'admin@alsafar.com' && passwordInput === 'admin123');

    const role: 'super_admin' | 'staff_admin' | 'client' = 
      emailInput === 'admin@alsafar.com' ? 'staff_admin' : isAdmin ? 'super_admin' : 'client';

    // Derive display names
    let displayName = nameInput || 'Pilgrim Companion';
    if (mode === 'signin') {
      if (emailInput === 'starltd49@gmail.com') displayName = 'Star Administrator';
      else if (emailInput === '93151f5941@gmail.com') displayName = 'Mufti Farhan Ahmed';
      else if (emailInput === 'admin@alsafar.com') displayName = 'Senior Officer Suhaib';
      else {
        // Capitalize first part of email for pretty name
        const prefix = emailInput.split('@')[0];
        displayName = prefix.charAt(0).toUpperCase() + prefix.slice(1);
      }
    }

    if (isLiveFirebase && auth) {
      try {
        if (mode === 'signin') {
          // Attempt sign in
          const userCredential = await signInWithEmailAndPassword(auth, emailInput, passwordInput);
          const fbUser = userCredential.user;

          setSuccess('Authentication approved. Welcome!');
          setTimeout(() => {
            onLoginSuccess({
              uid: fbUser.uid,
              name: displayName,
              email: fbUser.email || emailInput,
              role: role
            });
            setIsLoading(false);
            // Clean fields
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setName('');
            setPhone('');
            onClose();
          }, 1200);
        } else {
          // Sign Up mode
          const userCredential = await createUserWithEmailAndPassword(auth, emailInput, passwordInput);
          const fbUser = userCredential.user;

          // Save the customer document to Firestore for permissions integrity
          const customerData = {
            id: fbUser.uid,
            name: displayName,
            email: emailInput,
            phone: phoneInput || 'Not specified'
          };
          
          await adminDb.createDoc('customers', customerData);

          setSuccess('Your Pilgrim Account has been created and registered!');
          setTimeout(() => {
            onLoginSuccess({
              uid: fbUser.uid,
              name: displayName,
              email: fbUser.email || emailInput,
              role: 'client'
            });
            setIsLoading(false);
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setName('');
            setPhone('');
            onClose();
          }, 1200);
        }

      } catch (authErr: any) {
        console.error("Firebase Auth operation error:", authErr);
        
        let friendlyMessage = authErr.message || 'Verification rejected.';
        if (authErr.code === 'auth/email-already-in-use') {
          friendlyMessage = 'This email is already registered. Please sign in instead.';
        } else if (authErr.code === 'auth/wrong-password' || authErr.code === 'auth/invalid-credential') {
          friendlyMessage = 'Incorrect password or credentials provided.';
        } else if (authErr.code === 'auth/weak-password') {
          friendlyMessage = 'The password is too weak. Please use at least 6 characters.';
        } else if (authErr.code === 'auth/invalid-email') {
          friendlyMessage = 'Please enter a valid email address.';
        }

        setError(friendlyMessage);
        setIsLoading(false);
      }
    } else {
      // Sandbox Fallback simulation (when live Firebase credentials are not compiled)
      setTimeout(async () => {
        const uid = mode === 'signin' 
          ? ('offline-user-' + Math.random().toString(36).substring(2, 9))
          : ('offline-user-' + Math.random().toString(36).substring(2, 9));

        if (mode === 'signup') {
          const customerData = {
            id: uid,
            name: displayName,
            email: emailInput,
            phone: phoneInput || 'Not specified'
          };
          await adminDb.createDoc('customers', customerData);
          setSuccess('Offline pilgrim account provisioned successfully!');
        } else {
          if (isAdmin) {
            setSuccess('Offline Staff decrypted successfully!');
          } else {
            setSuccess('Offline pilgrim session decrypted successfully!');
          }
        }
        
        onLoginSuccess({
          uid: uid,
          name: displayName,
          email: emailInput,
          role: role
        });
        setIsLoading(false);
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setName('');
        setPhone('');
        onClose();
      }, 1000);
    }
  };

  return (
    <div className="fixed inset-0 z-55 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative max-w-md w-full bg-[#F5F2ED] border border-[#1B365D]/30 shadow-2xl p-6 md:p-8 rounded-none overflow-hidden text-[#1B365D] my-8"
      >
        {/* Top-right exit button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#1B365D]/60 hover:text-[#1B365D] transition cursor-pointer z-10"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Decorative elements */}
        <div className="w-16 h-16 bg-amber-500/10 absolute -top-8 -left-8 rounded-full pointer-events-none" />
        <div className="w-24 h-24 bg-[#1B365D]/5 absolute -bottom-12 -right-12 rounded-full pointer-events-none" />

        {/* Modal Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="w-12 h-12 bg-[#1B365D] text-[#F5F2ED] font-bold flex items-center justify-center font-serif text-lg mx-auto shadow-md">
            السفر
          </div>
          <h2 className="text-xl font-serif font-bold tracking-widest text-[#1B365D] uppercase mt-2">
            {mode === 'signin' ? 'Pilgrim & Staff Portal' : 'Create Pilgrim Account'}
          </h2>
          <p className="text-xs text-[#1B365D]/70 font-sans tracking-wide">
            {mode === 'signin' 
              ? 'Track booked packages, view eVisa statuses, or manage administrative services.' 
              : 'Register your contact information to access journey timelines and document tracking.'}
          </p>
        </div>

        {/* Tabs for Sign In vs Sign Up */}
        <div className="flex border-b border-[#1B365D]/15 mb-6 text-xs">
          <button
            type="button"
            onClick={() => {
              setMode('signin');
              setError('');
              setSuccess('');
            }}
            className={`flex-1 py-2.5 text-center font-bold uppercase tracking-widest transition-all cursor-pointer ${
              mode === 'signin'
                ? 'text-[#1B365D] border-b-2 border-amber-600 font-extrabold'
                : 'text-[#1B365D]/50 hover:text-[#1B365D]'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('signup');
              setError('');
              setSuccess('');
            }}
            className={`flex-1 py-2.5 text-center font-bold uppercase tracking-widest transition-all cursor-pointer ${
              mode === 'signup'
                ? 'text-[#1B365D] border-b-2 border-amber-600 font-extrabold'
                : 'text-[#1B365D]/50 hover:text-[#1B365D]'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Authentication form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <AnimatePresence mode="wait">
            {mode === 'signup' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4 overflow-hidden"
              >
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-amber-600 flex items-center gap-1">
                    <User className="w-3 h-3" /> Full Name
                  </label>
                  <input
                    type="text"
                    required={mode === 'signup'}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Haji Rashid Ahmed"
                    className="w-full text-xs px-3.5 py-2.5 bg-white/60 border border-[#1B365D]/20 outline-none text-[#1B365D] placeholder:text-[#1B365D]/40 focus:border-amber-600 focus:bg-white font-sans transition-all"
                  />
                </div>

                {/* Direct Phone Line */}
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-bold tracking-wider text-amber-600 flex items-center gap-1">
                    <Phone className="w-3 h-3" /> Phone Number
                  </label>
                  <input
                    type="tel"
                    required={mode === 'signup'}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +91 99110 54321"
                    className="w-full text-xs px-3.5 py-2.5 bg-white/60 border border-[#1B365D]/20 outline-none text-[#1B365D] placeholder:text-[#1B365D]/40 focus:border-amber-600 focus:bg-white font-sans transition-all"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Email field */}
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold tracking-wider text-amber-600 flex items-center gap-1">
              <Mail className="w-3 h-3" /> Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. pilgrim@domain.com"
              className="w-full text-xs px-3.5 py-2.5 bg-white/60 border border-[#1B365D]/20 outline-none text-[#1B365D] placeholder:text-[#1B365D]/40 focus:border-amber-600 focus:bg-white font-sans transition-all"
            />
          </div>

          {/* Password field */}
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold tracking-wider text-amber-600 flex items-center gap-1">
              <Lock className="w-3 h-3" /> Password {mode === 'signup' && <span className="text-[9px] lowercase font-normal">(min 6 chars)</span>}
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full text-xs px-3.5 py-2.5 pr-10 bg-white/60 border border-[#1B365D]/20 outline-none text-[#1B365D] placeholder:text-[#1B365D]/40 focus:border-amber-600 focus:bg-white font-mono transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1B365D]/60 hover:text-[#1B365D] cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Confirm Password field (Sign Up Only) */}
          <AnimatePresence mode="wait">
            {mode === 'signup' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-1.5 overflow-hidden"
              >
                <label className="text-[10px] uppercase font-bold tracking-wider text-amber-600 flex items-center gap-1">
                  <Lock className="w-3 h-3" /> Confirm Password
                </label>
                <input
                  type="password"
                  required={mode === 'signup'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full text-xs px-3.5 py-2.5 bg-white/60 border border-[#1B365D]/20 outline-none text-[#1B365D] placeholder:text-[#1B365D]/40 focus:border-amber-600 focus:bg-white font-mono transition-all"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-[11px] leading-relaxed flex items-start gap-1.5"
            >
              <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </motion.div>
          )}

          {/* Success message */}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] leading-relaxed flex items-center gap-1.5 font-semibold"
            >
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{success}</span>
            </motion.div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-[#1B365D] hover:bg-[#1B365D]/90 text-white hover:text-amber-300 font-bold text-xs uppercase tracking-widest cursor-pointer shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <span className="flex items-center gap-1">
                <Compass className="w-4 h-4 animate-spin text-amber-500" />
                Processing Registry...
              </span>
            ) : (
              <>
                <span>{mode === 'signin' ? 'Authenticate Account' : 'Register Pilgrim Profile'}</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
              </>
            )}
          </button>
        </form>

        {/* Guidance / Info footer */}
        <div className="mt-6 pt-5 border-t border-[#1B365D]/10 text-center space-y-2">
          <p className="text-[10px] text-[#1B365D]/75 leading-relaxed font-sans">
            {mode === 'signin' ? (
              <span>
                🌟 <strong>Registered Pilgrims:</strong> Enter your credentials to view visa clearance updates and flight schedules.
              </span>
            ) : (
              <span>
                🕋 <strong>Sacred Pilgrimage:</strong> Creating an account enables live document status check. Your details will be protected securely.
              </span>
            )}
          </p>
          <div className="bg-amber-500/5 p-2 border border-amber-500/10 inline-block pointer-events-none">
            <span className="text-[10px] text-amber-700 font-mono font-semibold flex items-center justify-center gap-1">
              <Shield className="w-3 h-3" />
              Administrator Access Port: 3000 Verified
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
