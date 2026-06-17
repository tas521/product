import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronsUp } from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BookingForm from './components/BookingForm';
import LoginModal from './components/LoginModal';
import UserDashboardModal from './components/UserDashboardModal';
import Home from './pages/Home';
import About from './pages/About';
import PackagesList from './pages/PackagesList';
import VisaServices from './pages/VisaServices';
import Gallery from './pages/Gallery';
import Blog from './pages/Blog';
import DelhiOffice from './pages/DelhiOffice';
import Contact from './pages/Contact';
import AdminPortal from './pages/AdminPortal';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { Package } from './types';
import { isLiveFirebase, auth } from './lib/firebase';
import { adminDb } from './lib/adminDb';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('siteTheme') === 'dark';
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('siteTheme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('siteTheme', 'light');
    }
  }, [isDarkMode]);

  const [activePage, setActivePage] = useState<string>('home');
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingFormType, setBookingFormType] = useState<'booking' | 'inquiry'>('booking');

  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Dynamic systems synchronization
  const [packages, setPackages] = useState<Package[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadDynamicData = async () => {
    try {
      const [pkgs, blgs, gal] = await Promise.all([
        adminDb.getCollection('packages'),
        adminDb.getCollection('blog_posts'),
        adminDb.getCollection('gallery')
      ]);
      setPackages(pkgs);
      setBlogs(blgs);
      setGallery(gal);
    } catch (e) {
      console.error("Error loading dynamic elements:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDynamicData();
  }, [activePage]);

  // Global authentication states and wizard controllers
  const [currentUser, setCurrentUser] = useState<{
    uid: string;
    name: string;
    email: string;
    role: 'super_admin' | 'staff_admin' | 'client';
    photoURL?: string | null;
  } | null>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isUserDashboardOpen, setIsUserDashboardOpen] = useState(false);

  // Maintain login sessions via Firebase onAuthStateChanged
  useEffect(() => {
    if (isLiveFirebase && auth) {
      const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
        if (firebaseUser) {
          const emailInput = firebaseUser.email?.toLowerCase().trim() || '';
          
          // Verify administrative roles
          const isAdmin = 
            emailInput === 'starltd49@gmail.com' ||
            emailInput === '93151f5941@gmail.com' ||
            emailInput === 'admin@alsafar.com';

          const role: 'super_admin' | 'staff_admin' | 'client' = 
            emailInput === 'admin@alsafar.com' ? 'staff_admin' : isAdmin ? 'super_admin' : 'client';

          let displayName = firebaseUser.displayName || '';
          if (!displayName) {
            if (emailInput === 'starltd49@gmail.com') displayName = 'Star Administrator';
            else if (emailInput === '93151f5941@gmail.com') displayName = 'Mufti Farhan Ahmed';
            else if (emailInput === 'admin@alsafar.com') displayName = 'Senior Officer Suhaib';
            else {
              const prefix = emailInput.split('@')[0];
              displayName = prefix.charAt(0).toUpperCase() + prefix.slice(1);
            }
          }

          const userObj = {
            uid: firebaseUser.uid,
            name: displayName,
            email: firebaseUser.email || '',
            photoURL: firebaseUser.photoURL || null,
            role: role
          };

          setCurrentUser(userObj);

          // Store/update user information in Firestore on session loading
          try {
            await adminDb.createDoc('users', {
              id: firebaseUser.uid,
              name: displayName,
              email: firebaseUser.email || '',
              photoURL: firebaseUser.photoURL || null,
              role: role,
              updatedAt: new Date().toISOString()
            });

            if (role === 'client') {
              await adminDb.createDoc('customers', {
                id: firebaseUser.uid,
                name: displayName,
                email: firebaseUser.email || '',
                phone: firebaseUser.phoneNumber || 'Not specified',
                updatedAt: new Date().toISOString()
              });
            }
          } catch (dbErr) {
            console.warn("Could not synchronize user record with Firestore on boot:", dbErr);
          }
        } else {
          setCurrentUser(null);
        }
      });
      return () => unsubscribe();
    }
  }, []);

  const handleLoginSuccess = (user: {
    uid: string;
    name: string;
    email: string;
    role: 'super_admin' | 'staff_admin' | 'client';
    photoURL?: string | null;
  }) => {
    setCurrentUser(user);
    if (user.role === 'super_admin' || user.role === 'staff_admin') {
      setActivePage('admin');
    } else {
      setIsUserDashboardOpen(true);
    }
  };

  const handleOpenActiveDashboard = () => {
    if (currentUser) {
      if (currentUser.role === 'super_admin' || currentUser.role === 'staff_admin') {
        setActivePage('admin');
      } else {
        setIsUserDashboardOpen(true);
      }
    }
  };

  const handleLogout = async () => {
    if (isLiveFirebase && auth) {
      try {
        await auth.signOut();
      } catch (err) {
        console.warn("Error signing out from Live Firebase:", err);
      }
    }
    setCurrentUser(null);
    setIsUserDashboardOpen(false);
    if (activePage === 'admin' || activePage === 'login' || activePage === 'signup') {
      setActivePage('home');
    }
  };

  // Auto scroll to top when navigation triggers
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as any });
  }, [activePage]);

  const handleSelectPackage = (p: Package, mode: 'booking' | 'inquiry' = 'booking') => {
    setSelectedPackage(p);
    setBookingFormType(mode);
    setIsBookingOpen(true);
  };

  const handleOpenBookingOnly = () => {
    setSelectedPackage(null); // Let's let them select their package in wizard
    setIsBookingOpen(true);
  };

  const renderActivePageContent = () => {
    switch (activePage) {
      case 'home':
        return (
          <Home
            onOpenBooking={handleOpenBookingOnly}
            onSelectPackage={handleSelectPackage}
            setActivePage={setActivePage}
            packages={packages}
            blogs={blogs}
            gallery={gallery}
          />
        );
      case 'about':
        return <About onOpenBooking={handleOpenBookingOnly} />;
      
      // Hajj Programs filtering
      case 'hajj-packages':
        return (
          <PackagesList
            initialCategory="hajj"
            onSelectPackage={handleSelectPackage}
            onOpenBooking={() => setIsBookingOpen(true)}
            packages={packages}
          />
        );
      
      // Umrah Programs filtering
      case 'umrah-packages':
        return (
          <PackagesList
            initialCategory="umrah"
            onSelectPackage={handleSelectPackage}
            onOpenBooking={() => setIsBookingOpen(true)}
            packages={packages}
          />
        );
      
      // International luxury tours filtering
      case 'intl-tours':
        return (
          <PackagesList
            initialCategory="international"
            onSelectPackage={handleSelectPackage}
            onOpenBooking={() => setIsBookingOpen(true)}
            packages={packages}
          />
        );
      
      // Combined Universal catalog
      case 'all-packages':
        return (
          <PackagesList
            initialCategory="all"
            onSelectPackage={handleSelectPackage}
            onOpenBooking={() => setIsBookingOpen(true)}
            packages={packages}
          />
        );
      
      case 'visa-services':
        return <VisaServices />;
      case 'gallery':
        return <Gallery gallery={gallery} />;
      case 'blog':
        return <Blog blogs={blogs} />;
      case 'delhi-office':
        return <DelhiOffice />;
      case 'contact':
        return <Contact />;
      case 'login':
        return <Login setActivePage={setActivePage} onLoginSuccess={handleLoginSuccess} />;
      case 'signup':
        return <SignUp setActivePage={setActivePage} onLoginSuccess={handleLoginSuccess} />;
      case 'admin':
        return (
          <AdminPortal 
            setActivePage={setActivePage} 
            currentUser={currentUser}
            onLoginSuccess={handleLoginSuccess}
            onLogout={handleLogout}
          />
        );
      default:
        return (
          <Home
            onOpenBooking={handleOpenBookingOnly}
            onSelectPackage={handleSelectPackage}
            setActivePage={setActivePage}
          />
        );
    }
  };

  return (
    <div className={`min-h-screen flex flex-col justify-between font-sans selection:bg-slate-900 selection:text-slate-400 transition-colors duration-300 ${isDarkMode ? 'bg-[#09121f] text-slate-100' : 'bg-[#F5F2ED] text-[#1B365D]'}`}>
      
      {/* Premium Sticky Transparent Navbar */}
      {activePage !== 'admin' && (
        <Navbar
          activePage={activePage}
          setActivePage={setActivePage}
          onOpenBooking={handleOpenBookingOnly}
          currentUser={currentUser}
          onOpenLogin={() => setActivePage('login')}
          onOpenDashboard={handleOpenActiveDashboard}
          onLogout={handleLogout}
          isDarkMode={isDarkMode}
          onToggleTheme={() => setIsDarkMode(!isDarkMode)}
        />
      )}

      {/* Main Render Page Content */}
      <main className="flex-grow w-full relative z-10">
        {renderActivePageContent()}
      </main>

      {/* Interactive Global Booking wizard */}
      <BookingForm
        isOpen={isBookingOpen}
        initialPackage={selectedPackage}
        onClose={() => setIsBookingOpen(false)}
        currentUser={currentUser}
        initialBookingType={bookingFormType}
        packages={packages}
      />

      {/* Dynamic Pilgrim Status Tracker Dashboard Panel */}
      <UserDashboardModal
        isOpen={isUserDashboardOpen}
        onClose={() => setIsUserDashboardOpen(false)}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* Premium Islamic Editorial Footer */}
      {activePage !== 'admin' && <Footer setActivePage={setActivePage} />}

      {/* Luxurious Golden Scroll To Top Floating Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            key="scroll-to-top"
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.8 }}
            onClick={scrollToTop}
            className={`fixed bottom-6 right-6 z-50 w-11 h-11 flex items-center justify-center rounded-sm transition-all duration-300 border shadow-[0_10px_30px_-5px_rgba(163,121,32,0.3)] cursor-pointer ${
              isDarkMode
                ? 'border-amber-400 bg-[#09121f]/95 hover:bg-amber-500 hover:text-[#09121f] text-amber-400'
                : 'border-amber-500 bg-white hover:bg-[#A37920] hover:text-white text-[#A37920]'
            }`}
            title="Scroll to top"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronsUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}
