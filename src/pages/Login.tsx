import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Lock, Mail, Eye, EyeOff, ArrowRight, ShieldAlert, CheckCircle, Compass, ArrowLeft } from 'lucide-react';
import { isLiveFirebase, auth } from '../lib/firebase';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, sendPasswordResetEmail } from 'firebase/auth';
import { adminDb } from '../lib/adminDb';

interface LoginProps {
  setActivePage: (page: string) => void;
  onLoginSuccess: (user: { uid: string; name: string; email: string; role: 'super_admin' | 'staff_admin' | 'client'; photoURL?: string | null }) => void;
}

export default function Login({ setActivePage, onLoginSuccess }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Forgot Password feature state
  const [isResetMode, setIsResetMode] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    const emailInput = email.trim().toLowerCase();
    const passwordInput = password;

    if (!emailInput || !passwordInput) {
      setError('Please enter your email and password.');
      setIsLoading(false);
      return;
    }

    // Role detection
    const isAdmin = 
      (emailInput === 'starltd49@gmail.com' && passwordInput === 'star3556@') ||
      (emailInput === '93151f5941@gmail.com' && passwordInput === 'admin123') ||
      (emailInput === 'admin@alsafar.com' && passwordInput === 'admin123');

    const role: 'super_admin' | 'staff_admin' | 'client' = 
      emailInput === 'admin@alsafar.com' ? 'staff_admin' : isAdmin ? 'super_admin' : 'client';

    let displayName = '';
    if (emailInput === 'starltd49@gmail.com') displayName = 'Star Administrator';
    else if (emailInput === '93151f5941@gmail.com') displayName = 'Mufti Farhan Ahmed';
    else if (emailInput === 'admin@alsafar.com') displayName = 'Senior Officer Suhaib';
    else {
      const prefix = emailInput.split('@')[0];
      displayName = prefix.charAt(0).toUpperCase() + prefix.slice(1);
    }

    if (isLiveFirebase && auth) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, emailInput, passwordInput);
        const fbUser = userCredential.user;

        // Upsert to user & customer collections on Firestore
        try {
          await adminDb.createDoc('users', {
            id: fbUser.uid,
            name: fbUser.displayName || displayName,
            email: fbUser.email || emailInput,
            photoURL: fbUser.photoURL || null,
            role: role,
            updatedAt: new Date().toISOString()
          });

          if (role === 'client') {
            await adminDb.createDoc('customers', {
              id: fbUser.uid,
              name: fbUser.displayName || displayName,
              email: fbUser.email || emailInput,
              phone: fbUser.phoneNumber || 'Not specified',
              updatedAt: new Date().toISOString()
            });
          }
        } catch (dbErr) {
          console.warn("Could not save profile to firestore:", dbErr);
        }

        setSuccess('Authentication success. Welcome back!');
        setTimeout(() => {
          onLoginSuccess({
            uid: fbUser.uid,
            name: fbUser.displayName || displayName,
            email: fbUser.email || emailInput,
            role: role,
            photoURL: fbUser.photoURL || null
          });
          setIsLoading(false);
          setActivePage('home');
        }, 1200);

      } catch (authErr: any) {
        console.error("Firebase Login Error:", authErr);
        let friendlyMessage = 'Login failed. Please check your qualifications.';
        if (authErr.code === 'auth/wrong-password' || authErr.code === 'auth/invalid-credential' || authErr.code === 'auth/user-not-found') {
          friendlyMessage = 'Invalid email or password. Please verify credentials.';
        } else if (authErr.code === 'auth/invalid-email') {
          friendlyMessage = 'Please enter a valid email address.';
        }
        setError(friendlyMessage);
        setIsLoading(false);
      }
    } else {
      // Offline fallback mode
      setTimeout(async () => {
        const mockUid = 'offline-user-' + Math.random().toString(36).substring(2, 9);
        
        try {
          await adminDb.createDoc('users', {
            id: mockUid,
            name: displayName,
            email: emailInput,
            role: role,
            updatedAt: new Date().toISOString()
          });
        } catch (dbErr) {
          console.warn(dbErr);
        }

        setSuccess('Local Sandbox login success! (Simulated Mode)');
        setTimeout(() => {
          onLoginSuccess({
            uid: mockUid,
            name: displayName,
            email: emailInput,
            role: role,
            photoURL: null
          });
          setIsLoading(false);
          setActivePage('home');
        }, 1200);
      }, 1000);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setSuccess('');
    setIsLoading(true);

    if (isLiveFirebase && auth) {
      try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const fbUser = result.user;

        const emailInput = fbUser.email?.toLowerCase().trim() || '';
        const isAdmin = 
          emailInput === 'starltd49@gmail.com' ||
          emailInput === '93151f5941@gmail.com' ||
          emailInput === 'admin@alsafar.com';

        const role: 'super_admin' | 'staff_admin' | 'client' = 
          emailInput === 'admin@alsafar.com' ? 'staff_admin' : isAdmin ? 'super_admin' : 'client';

        const displayName = fbUser.displayName || fbUser.email?.split('@')[0] || 'Pilgrim Companion';

        // Upsert to Firestore
        try {
          await adminDb.createDoc('users', {
            id: fbUser.uid,
            name: displayName,
            email: emailInput,
            photoURL: fbUser.photoURL || null,
            role: role,
            updatedAt: new Date().toISOString()
          });

          if (role === 'client') {
            await adminDb.createDoc('customers', {
              id: fbUser.uid,
              name: displayName,
              email: emailInput,
              phone: fbUser.phoneNumber || 'Not specified',
              updatedAt: new Date().toISOString()
            });
          }
        } catch (dbErr) {
          console.warn("Could not save profile to firestore:", dbErr);
        }

        setSuccess(`Welcome, ${displayName}!`);
        setTimeout(() => {
          onLoginSuccess({
            uid: fbUser.uid,
            name: displayName,
            email: emailInput,
            role: role,
            photoURL: fbUser.photoURL || null
          });
          setIsLoading(false);
          setActivePage('home');
        }, 1200);

      } catch (authErr: any) {
        console.error("Google Auth error:", authErr);
        setError(authErr.message || 'Google Sign-In was cancelled or rejected.');
        setIsLoading(false);
      }
    } else {
      // Local Sandbox simulation for Google sign in
      setTimeout(async () => {
        const mockUid = 'google-mock-' + Math.random().toString(36).substring(2, 9);
        const mockName = 'Al Safar Guest Pilgrim';
        const mockEmail = 'guest.pilgrim@gmail.com';
        const mockPhoto = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150';

        setSuccess('Simulated Google Authentication success!');
        setTimeout(() => {
          onLoginSuccess({
            uid: mockUid,
            name: mockName,
            email: mockEmail,
            role: 'client',
            photoURL: mockPhoto
          });
          setIsLoading(false);
          setActivePage('home');
        }, 1200);
      }, 1000);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResetSuccess(false);
    setIsLoading(true);

    const emailInput = resetEmail.trim().toLowerCase();
    if (!emailInput) {
      setError('Please provide an email address.');
      setIsLoading(false);
      return;
    }

    if (isLiveFirebase && auth) {
      try {
        await sendPasswordResetEmail(auth, emailInput);
        setResetSuccess(true);
        setIsLoading(false);
      } catch (err: any) {
        console.error("Password reset error:", err);
        setError(err.message || 'Unable to transmit reset email at this moment.');
        setIsLoading(false);
      }
    } else {
      // Simulated reset password
      setTimeout(() => {
        setResetSuccess(true);
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="pt-32 sm:pt-40 pb-16 min-h-[90vh] flex items-center justify-center bg-[#F5F2ED] px-4">
      <div className="absolute inset-0 bg-[radial-gradient(#1B365D_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white border border-[#1B365D]/20 shadow-xl p-8 relative overflow-hidden"
      >
        {/* Subtle decorative layout lines */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#1B365D]" />
        <div className="w-24 h-24 bg-amber-500/5 absolute -top-12 -left-12 rounded-full pointer-events-none" />

        {/* Brand Header */}
        <div className="text-center space-y-2 mb-8">
          <div className="w-12 h-12 bg-[#1B365D] text-[#F5F2ED] font-bold flex items-center justify-center font-serif text-lg mx-auto shadow-md">
            السفر
          </div>
          <h2 className="text-2xl font-serif font-black tracking-widest text-[#1B365D] uppercase mt-2">
            {isResetMode ? 'Recover Credentials' : 'Pilgrim Sign In'}
          </h2>
          <p className="text-xs text-[#1B365D]/70 max-w-sm mx-auto">
            {isResetMode 
              ? 'Enter your registered email address to receive secure reset credentials.'
              : 'Safely log in to track booked luxury Hajj/Umrah packages and access eVisa status dashboards.'}
          </p>
        </div>

        {/* Main form toggle wrapper */}
        {!isResetMode ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Email Input */}
            <div className="space-y-1.5">
              <label htmlFor="login-email" className="text-[10px] uppercase font-extrabold tracking-wider text-amber-700 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" /> Email Address
              </label>
              <input
                id="login-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. pilgrim@domain.com"
                className="w-full text-xs px-3.5 py-3 bg-[#F5F2ED]/40 border border-[#1B365D]/20 outline-none text-[#1B365D] placeholder:text-[#1B365D]/30 focus:border-amber-600 focus:bg-white transition-all font-sans"
              />
            </div>

            {/* Password Input (No Confirm Password here) */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label htmlFor="login-password" className="text-[10px] uppercase font-extrabold tracking-wider text-amber-700 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5" /> Password
                </label>
                <button
                  type="button"
                  onClick={() => setIsResetMode(true)}
                  className="text-[10px] text-amber-700 hover:text-[#1B365D] hover:underline font-bold transition cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full text-xs px-3.5 py-3 pr-10 bg-[#F5F2ED]/40 border border-[#1B365D]/20 outline-none text-[#1B365D] placeholder:text-[#1B365D]/30 focus:border-amber-600 focus:bg-white transition-all font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1B365D]/50 hover:text-[#1B365D] cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error alerts */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3.5 bg-rose-50 border border-rose-200 text-[#1B365D] text-[11px] leading-relaxed space-y-2.5"
              >
                <div className="flex items-start gap-1.5 text-rose-700 font-semibold">
                  <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>{error.includes('unauthorized-domain') ? 'Google Auth Domain Authorization Required' : error}</span>
                </div>

                {error.includes('unauthorized-domain') && (
                  <div className="bg-[#1B365D]/5 border border-[#1B365D]/10 p-3 text-[#1B365D] space-y-2 text-[11px]">
                    <p className="font-bold leading-snug">
                      Because this luxury portal runs in a dynamic sandbox container, you must register this preview domain to your Firebase Authorized Domains list.
                    </p>
                    <div className="space-y-1 bg-[#F5F2ED] p-2 border border-[#1B365D]/10 font-sans">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-bold text-amber-800 uppercase">Your Active Hostname:</span>
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText(window.location.hostname);
                          }}
                          className="px-1.5 py-0.5 bg-[#1B365D]/10 text-[#1B365D] hover:bg-[#1B365D]/20 text-[9px] font-bold uppercase transition cursor-pointer"
                        >
                          Copy Domain
                        </button>
                      </div>
                      <code className="text-xs font-mono font-bold block bg-white p-1 select-all border border-[#1B365D]/5 truncate">
                        {window.location.hostname}
                      </code>
                    </div>
                    <ol className="list-decimal pl-4.5 space-y-1.5 text-slate-700 leading-snug">
                      <li>Go to your <a href="https://console.firebase.google.com/u/0/project/al-safar-95b93/authentication/settings" target="_blank" rel="noopener noreferrer" className="text-amber-800 font-extrabold hover:underline inline-flex items-center gap-0.5">Firebase Console <ArrowRight className="w-2.5 h-2.5" /></a></li>
                      <li>Select the <strong>Settings</strong> tab at the top.</li>
                      <li>Click <strong>Authorized domains</strong> page inside.</li>
                      <li>Click <strong>Add domain</strong> and paste the hostname shown above.</li>
                      <li>Save and try connecting with Google again.</li>
                    </ol>
                  </div>
                )}
              </motion.div>
            )}

            {/* Success alerts */}
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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-[#1B365D] hover:bg-[#1B365D]/90 text-white hover:text-amber-300 font-bold text-xs uppercase tracking-widest cursor-pointer shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <span className="flex items-center gap-1.5">
                  <Compass className="w-4 h-4 animate-spin text-amber-500" />
                  Authenticating...
                </span>
              ) : (
                <>
                  <span>Sign In Account</span>
                  <ArrowRight className="w-4 h-4 text-amber-400" />
                </>
              )}
            </button>

            {/* Divider */}
            <div className="relative my-6 flex items-center justify-center">
              <div className="absolute inset-x-0 h-px bg-[#1B365D]/10" />
              <span className="relative px-3 bg-white text-[10px] font-bold uppercase tracking-widest text-[#1B365D]/40">
                Or connect via
              </span>
            </div>

            {/* Continue with Google Button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full py-3.5 bg-white hover:bg-slate-50 text-[#1B365D] border border-[#1B365D]/20 font-bold text-xs uppercase tracking-wider cursor-pointer shadow-sm transition-all duration-200 flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* Alternate navigation */}
            <p className="text-center text-[11px] text-[#1B365D]/70 pt-4">
              New to Al Safar?{' '}
              <button
                type="button"
                onClick={() => setActivePage('signup')}
                className="text-amber-700 font-extrabold hover:underline"
              >
                Sign Up Account
              </button>
            </p>

          </form>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-4">
            
            {/* Reset instructions / email */}
            <div className="space-y-1.5">
              <label htmlFor="reset-email" className="text-[10px] uppercase font-extrabold tracking-wider text-amber-700 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" /> Registered Email Address
              </label>
              <input
                id="reset-email"
                type="email"
                required
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                placeholder="e.g. pilgrim@domain.com"
                className="w-full text-xs px-3.5 py-3 bg-[#F5F2ED]/40 border border-[#1B365D]/20 outline-none text-[#1B365D] focus:border-amber-600 focus:bg-white transition-all"
              />
            </div>

            {/* Reset Error alerts */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-[11px] leading-relaxed flex items-start gap-1.5"
              >
                <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}

            {/* Reset Success alert */}
            {resetSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] leading-relaxed flex items-center gap-1.5 font-semibold"
              >
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Transmitted! Check your email inbox for password recovery directions.</span>
              </motion.div>
            )}

            {/* Submit Email button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-[#1B365D] hover:bg-[#1B365D]/90 text-white hover:text-amber-300 font-bold text-xs uppercase tracking-widest cursor-pointer shadow-lg transition-all flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <Compass className="w-4 h-4 animate-spin text-amber-500" />
              ) : (
                <span>Transmit Reset Instructions</span>
              )}
            </button>

            {/* Return Link */}
            <button
              type="button"
              onClick={() => {
                setIsResetMode(false);
                setError('');
                setResetSuccess(false);
              }}
              className="w-full text-center text-xs text-[#1B365D]/75 hover:text-[#1B365D] font-bold flex items-center justify-center gap-1 py-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Sign In</span>
            </button>

          </form>
        )}

      </motion.div>
    </div>
  );
}
