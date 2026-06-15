import { 
  collection, 
  getDocs, 
  addDoc as firestoreAddDoc, 
  setDoc, 
  updateDoc as firestoreUpdateDoc, 
  deleteDoc as firestoreDeleteDoc, 
  doc, 
  query, 
  where,
  orderBy 
} from 'firebase/firestore';
import { db, isLiveFirebase, handleFirestoreError, OperationType } from './firebase';
import { PACKAGES, BLOG_POSTS, GALLERY_ITEMS } from '../data';
import { 
  Package, 
  Booking, 
  BlogPost, 
  GalleryItem, 
  Inquiry, 
  AdminUser, 
  Customer, 
  Order, 
  Review, 
  Testimonial, 
  AdminNotification, 
  AgencySettings 
} from '../types';

// ========================================================
// 1. SEED DEFAULT DATASETS (For high-fidelity local mode / fallback)
// ========================================================

const SEED_USERS: AdminUser[] = [
  {
    uid: 'dev-admin-1',
    name: 'Mufti Farhan Ahmed',
    email: '93151f5941@gmail.com',  // Bootstrapped Dev email
    role: 'super_admin',
    createdAt: '2026-05-01T08:00:00Z'
  },
  {
    uid: 'admin-staff-1',
    name: 'Suhail Qureshi',
    email: 'staff@alsafar.com',
    role: 'staff_admin',
    createdAt: '2026-05-15T09:30:00Z'
  },
  {
    uid: 'admin-super-2',
    name: 'Zameer Khan',
    email: 'zameer@alsafar.com',
    role: 'super_admin',
    createdAt: '2026-04-10T11:00:00Z'
  }
];

const SEED_BOOKINGS: Booking[] = [
  {
    id: 'bk-1001',
    packageId: 'hajj-premium',
    packageName: 'Hajj Al-Iman (Premium Shifting)',
    category: 'hajj',
    pricePerPerson: 5900,
    totalPrice: 11800,
    travelDate: '2026-11-20',
    travelerCount: 2,
    contactName: 'Mohamed Ansar Alam',
    contactEmail: 'ansar.alam@gmail.com',
    contactPhone: '+91 98110 55566',
    specialRequests: 'Requires wheelchair assistance for senior pilgrim at Mataf loop.',
    bookingDate: '2026-05-20T10:14:00Z',
    status: 'pending'
  },
  {
    id: 'bk-1002',
    packageId: 'umrah-vip',
    packageName: 'Umrah of Joy (VIP Special)',
    category: 'umrah',
    pricePerPerson: 2200,
    totalPrice: 6600,
    travelDate: '2026-07-15',
    travelerCount: 3,
    contactName: 'Aisha Siddiqui',
    contactEmail: 'aisha.sidd@gmail.com',
    contactPhone: '+91 88229 04958',
    specialRequests: 'Adjacent quad-sharing room if possible. Halal Full-board meals guaranteed.',
    bookingDate: '2026-05-24T14:45:00Z',
    status: 'confirmed'
  },
  {
    id: 'bk-1003',
    packageId: 'intl-tours-istanbul',
    packageName: 'Classic Turkey & Istanbul Explorer',
    category: 'international',
    pricePerPerson: 1650,
    totalPrice: 1650,
    travelDate: '2026-08-10',
    travelerCount: 1,
    contactName: 'Hamza Farooqi',
    contactEmail: 'hamza.f@yahoo.com',
    contactPhone: '+91 97184 02931',
    specialRequests: 'Window seat booking on flights; hot vegetarian meals in air-coach.',
    bookingDate: '2026-05-26T09:00:00Z',
    status: 'completed'
  },
  {
    id: 'bk-1004',
    packageId: 'hajj-economy',
    packageName: 'Hajj Al-Nur (Standard Economy)',
    category: 'hajj',
    pricePerPerson: 3800,
    totalPrice: 15200,
    travelDate: '2026-11-25',
    travelerCount: 4,
    contactName: 'Dr. Tariq Masood',
    contactEmail: 'tariq.masood@noida.org',
    contactPhone: '+91 99100 88220',
    specialRequests: 'Needs quad tent in Arafat close to water stations due to general asthma.',
    bookingDate: '2026-06-01T15:20:00Z',
    status: 'pending'
  }
];

const SEED_CUSTOMERS: Customer[] = [
  {
    id: 'cust-1',
    name: 'Mohamed Ansar Alam',
    email: 'ansar.alam@gmail.com',
    phone: '+91 98110 55566',
    notes: 'Premium Delhi customer. Prefers luxury private transport and scholars with certified Hajj qualifications.',
    bookingHistory: ['bk-1001'],
    createdAt: '2026-05-20T10:14:00Z'
  },
  {
    id: 'cust-2',
    name: 'Aisha Siddiqui',
    email: 'aisha.sidd@gmail.com',
    phone: '+91 88229 04958',
    notes: 'Family of 3, requested Srinagar departure routes. Extremely religious, strict prayer schedule focus.',
    bookingHistory: ['bk-1002'],
    createdAt: '2026-05-24T14:45:00Z'
  },
  {
    id: 'cust-3',
    name: 'Hamza Farooqi',
    email: 'hamza.f@yahoo.com',
    phone: '+91 97184 02931',
    notes: 'Single traveler. Excellent budget history. Very polite, prompt invoice payment within 3 hours.',
    bookingHistory: ['bk-1003'],
    createdAt: '2026-05-26T09:00:00Z'
  }
];

const SEED_ORDERS: Order[] = [
  {
    id: 'ord-101',
    bookingId: 'bk-1001',
    customerName: 'Mohamed Ansar Alam',
    packageName: 'Hajj Al-Iman (Premium Shifting)',
    amount: 11800,
    currency: '$',
    status: 'pending',
    paymentMethod: 'Bank Wire Direct Transfer',
    transactionId: 'TXN-SAUDI-94821',
    createdAt: '2026-05-20T10:20:00Z'
  },
  {
    id: 'ord-102',
    bookingId: 'bk-1002',
    customerName: 'Aisha Siddiqui',
    packageName: 'Umrah of Joy (VIP Special)',
    amount: 6600,
    currency: '$',
    status: 'completed',
    paymentMethod: 'HDFC Corporate Card Payment',
    transactionId: 'TXN-HDFC-02941',
    createdAt: '2026-05-24T15:00:00Z'
  },
  {
    id: 'ord-103',
    bookingId: 'bk-1003',
    customerName: 'Hamza Farooqi',
    packageName: 'Classic Turkey & Istanbul Explorer',
    amount: 1650,
    currency: '$',
    status: 'completed',
    paymentMethod: 'Netbanking SBI Portal',
    transactionId: 'TXN-SBI-00921',
    createdAt: '2026-05-26T09:10:00Z'
  }
];

const SEED_INQUIRIES: Inquiry[] = [
  {
    id: 'inq-5001',
    name: 'Waseem Malik',
    email: 'waseem.m@gmail.com',
    phone: '+91 99100 83940',
    travelType: 'umrah',
    message: 'Looking for a private VIP 10-day Umrah package for a newlywed couple in October 2026. Requesting hotels strictly facing the Haram courtyard.',
    submittedAt: '2026-05-28T11:20:00Z',
    status: 'new',
    notes: 'Awaiting premium hotel quotes from Fairmont Clock Tower Sales desk.'
  },
  {
    id: 'inq-5002',
    name: 'Zoya Fatima',
    email: 'zoya.f@outlook.com',
    phone: '+91 78990 01100',
    travelType: 'visa',
    message: 'Need urgent Saudi tourist eVisa processing support for 4 family members holding Indian passports. We have flights pre-booked for next weekend.',
    submittedAt: '2026-05-29T16:40:00Z',
    status: 'replied',
    notes: 'Documents verified and uploaded on visa portal. ETA tomorrow.'
  },
  {
    id: 'inq-5003',
    name: 'Sajid Hussain',
    email: 'sajid.hussain@srinagar.edu',
    phone: '+91 90184 19412',
    travelType: 'hajj',
    message: 'Callback requested regarding Srinagar departure lists and luggage weight restrictions on custom chartered routes.',
    submittedAt: '2026-06-01T10:05:00Z',
    status: 'new',
    notes: 'Hotline queued for Srinagar office response desk.'
  }
];

const SEED_REVIEWS: Review[] = [
  {
    id: 'rev-301',
    packageId: 'hajj-premium',
    packageName: 'Hajj Al-Iman (Premium Shifting)',
    customerName: 'Haji Salman Shah',
    rating: 5,
    comment: 'The spiritual guide accompanying our Srinagar cadre was exceptionally knowledgeable. Standard shifting buffers were flawlessly coordinated with luxury air transport.',
    status: 'approved',
    featured: true,
    createdAt: '2026-04-20T12:00:00Z'
  },
  {
    id: 'rev-302',
    packageId: 'umrah-vip',
    packageName: 'Umrah of Joy (VIP Special)',
    customerName: 'Sania Mirza Bhat',
    rating: 5,
    comment: 'Gorgeous views of al-Nabawi right from our premium quad suite room! Truly unforgettable travel experience. May Allah bless the Al Safar staff.',
    status: 'approved',
    featured: true,
    createdAt: '2026-05-10T14:30:00Z'
  },
  {
    id: 'rev-303',
    packageId: 'hajj-economy',
    packageName: 'Hajj Al-Nur (Standard Economy)',
    customerName: 'Imran Ashraf',
    rating: 3,
    comment: 'Hotel in Makkah was slightly far (around 950m walk). Otherwise guide coordination and full board buffet meals were superb.',
    status: 'pending',
    featured: false,
    createdAt: '2026-06-01T09:12:00Z'
  }
];

const SEED_GALLERY: GalleryItem[] = [
  {
    id: 'gal-1',
    imageUrl: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=800&auto=format&fit=crop',
    title: 'The Prophetic Sanctuary Dome',
    category: 'haram',
    description: 'The iconic Green Dome of Al-Masjid an-Nabawi surrounded by modern luxury umbrellas.'
  },
  {
    id: 'gal-2',
    imageUrl: 'https://images.unsplash.com/photo-1542856391-010fb87dcfed?q=80&w=800&auto=format&fit=crop',
    title: 'Makkah Clock Overlook',
    category: 'haram',
    description: 'High-altitude panoramic shot highlighting the grandeur of Abraj Al Bait with Haram backdrop.'
  },
  {
    id: 'gal-3',
    imageUrl: 'https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?q=80&w=800&auto=format&fit=crop',
    title: 'Golden Doors of the Kaaba',
    category: 'pilgrimage',
    description: 'The magnificent gold-gilded entry portals to the Holy Kaaba in Makkah.'
  },
  {
    id: 'gal-4',
    imageUrl: 'https://images.unsplash.com/photo-1628131349755-e7a83d47d174?q=80&w=800&auto=format&fit=crop',
    title: 'Devoted Congregations in Makkah',
    category: 'pilgrimage',
    description: 'Unified pilgrims performing Tawaf prayers around the holy Kaaba.'
  },
  {
    id: 'gal-5',
    imageUrl: 'https://images.unsplash.com/photo-1601564921647-b444852c0c73?q=80&w=800&auto=format&fit=crop',
    title: 'Prophetic Sanctuary at Sunset, Madinah',
    category: 'haram',
    description: 'Masjid al-Nabawi illuminating the dusky sky with glowing golden light.'
  }
];

const SEED_NOTIFICATIONS: AdminNotification[] = [
  {
    id: 'notif-1',
    type: 'booking',
    title: 'New Booking Reservation',
    message: 'Dr. Tariq Masood reserved Hajj Al-Nur (Standard Economy) for 4 pax.',
    read: false,
    referenceId: 'bk-1004',
    createdAt: '2026-06-01T15:20:00Z'
  },
  {
    id: 'notif-2',
    type: 'inquiry',
    title: 'Urgent Evida Question',
    message: 'Zoya Fatima requested speedy tourist visa verification support.',
    read: false,
    referenceId: 'inq-5002',
    createdAt: '2026-05-29T16:40:00Z'
  },
  {
    id: 'notif-3',
    type: 'payment',
    title: 'Premium Payment Confirmed',
    message: 'Aisha Siddiqui order for Umrah series completed via card ($6,600).',
    read: true,
    referenceId: 'ord-102',
    createdAt: '2026-05-24T15:00:00Z'
  }
];

const SEED_SETTINGS: AgencySettings = {
  id: 'global-settings',
  companyName: 'Al Safar Hajj, Umrah & Luxury Travel Hub',
  address: 'Ansari Road Commercial Deck, Daryaganj, Delhi 110002',
  email: 'bookings@alsafartravel.com',
  phone: '+91 82877 62995',
  whatsapp: '+91 82877 62995',
  socialFacebook: 'https://facebook.com/alsafartours',
  socialInstagram: 'https://instagram.com/alsafartours',
  socialTwitter: 'https://twitter.com/alsafartours',
  smtpServer: 'smtp.alsafartravel.smtp.com:587'
};

const SEED_BLOGS: BlogPost[] = [
  {
    id: '1',
    title: 'Spiritual Readiness for Hajj 2026',
    summary: 'A scholarly blueprint for psychological and liturgical preparation before launching.',
    content: 'Performing Hajj is a lifetime physical and theological transformation. The core of this sacred journey is pure intention (Niyyah). Ensure complete clearance of local debts and secure mutual forgiveness. Review Miqat guidelines and practice wear patterns of Ihram towels. May Allah accept your service.',
    category: 'Spiritual Guide',
    author: 'Mufti Farhan Ahmed',
    publishedDate: '2026-05-15',
    imageUrl: 'https://images.unsplash.com/photo-1542856391-010fb87dcfed?q=80&w=800&auto=format&fit=crop',
    readTime: '6 mins read'
  },
  {
    id: '2',
    title: 'The Golden Umrah Packing Checklist',
    summary: 'Avoid baggage fatigue. Learn what to pack and what to secure locally in Makkah.',
    content: 'Travel comfortably by restricting flight baggage. Ensure comfortable flat dual-strapped sandals since Tawaf routes equal over several kilometers. Keep travel-size unscented soaps, high-capacity portable phone chargers, basic cough syrups, pocket-sized Qurans, and pre-purchased local Saudi SIM card guides.',
    category: 'Preparation',
    author: 'Scholar Suhail Ara',
    publishedDate: '2026-05-28',
    imageUrl: 'https://images.unsplash.com/photo-1564767609342-620cb19b2357?q=80&w=800&auto=format&fit=crop',
    readTime: '4 mins read'
  }
];

const SEED_TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    author: 'Haji Iqbal Butt',
    role: 'Srinagar Pilgrim',
    text: 'Al Safar coordinate VIP transfers with maximum punctuality. Escorting my elderly wheelchair father with strict guide devotion was extraordinary.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150',
    rating: 5,
    featured: true,
    createdAt: '2026-04-12T10:00:00Z'
  },
  {
    id: 't-2',
    author: 'Sultana Hashmi',
    role: 'Delhi Resident',
    text: 'Elite and beautiful accommodations just 2 minutes from standard Haram circles. Very clean board meals and highly learned Islamic guides.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150',
    rating: 5,
    featured: true,
    createdAt: '2026-05-18T16:22:00Z'
  }
];


// ========================================================
// 2. UNIFIED LOCAL STORAGE STATE ACCESS CORES
// ========================================================

function initializeLocalStorageIfMissing() {
  if (typeof window === 'undefined') return;
  
  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify(SEED_USERS));
  }
  
  // Clean potential demo packages from local storage
  let currentPacks: any[] = [];
  const storedPacks = localStorage.getItem('packages');
  if (storedPacks) {
    try {
      currentPacks = JSON.parse(storedPacks);
    } catch (e) {
      currentPacks = [];
    }
  } else {
    currentPacks = PACKAGES;
  }
  
  const demoIds = [
    'hajj-economy', 'hajj-premium', 'hajj-vip',
    'umrah-economy', 'umrah-premium', 'umrah-vip',
    'intl-dubai', 'intl-turkey', 'intl-maldives', 'intl-saudi', 'intl-thailand', 'intl-kashmir', 'intl-europe'
  ];
  const cleanedPacks = currentPacks.filter(p => !demoIds.includes(p.id) && !p.id.startsWith('hajj-') && !p.id.startsWith('umrah-') && !p.id.startsWith('intl-'));
  localStorage.setItem('packages', JSON.stringify(cleanedPacks));

  if (!localStorage.getItem('bookings')) {
    localStorage.setItem('bookings', JSON.stringify(SEED_BOOKINGS));
  }
  if (!localStorage.getItem('customers')) {
    localStorage.setItem('customers', JSON.stringify(SEED_CUSTOMERS));
  }
  if (!localStorage.getItem('orders')) {
    localStorage.setItem('orders', JSON.stringify(SEED_ORDERS));
  }
  if (!localStorage.getItem('inquiries')) {
    localStorage.setItem('inquiries', JSON.stringify(SEED_INQUIRIES));
  }
  if (!localStorage.getItem('reviews')) {
    localStorage.setItem('reviews', JSON.stringify(SEED_REVIEWS));
  }
  if (!localStorage.getItem('gallery')) {
    localStorage.setItem('gallery', JSON.stringify(GALLERY_ITEMS));
  }
  if (!localStorage.getItem('blog_posts')) {
    localStorage.setItem('blog_posts', JSON.stringify(BLOG_POSTS));
  }
  if (!localStorage.getItem('testimonials')) {
    localStorage.setItem('testimonials', JSON.stringify(SEED_TESTIMONIALS));
  }
  if (!localStorage.getItem('notifications')) {
    localStorage.setItem('notifications', JSON.stringify(SEED_NOTIFICATIONS));
  }
  if (!localStorage.getItem('settings')) {
    localStorage.setItem('settings', JSON.stringify(SEED_SETTINGS));
  }
}

// Ensure local persistence is primed
initializeLocalStorageIfMissing();


// ========================================================
// 3. SECURE MODULAR HIGH-LEVEL DATABASE OPERATIONS
// ========================================================

export const adminDb = {
  // --- FETCH ALL DOCUMENTS ---
  async getCollection(collectionName: string): Promise<any[]> {
    if (isLiveFirebase) {
      try {
        const querySnapshot = await getDocs(collection(db, collectionName));
        const list = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Auto-seed packages if empty in live mode
        if (list.length === 0 && collectionName === 'packages') {
          console.log("Seeding packages collection because it was empty in Live Firestore...");
          const timestamp = new Date().toISOString();
          const seeded = [];
          for (const pkg of PACKAGES) {
            const docObj = {
              ...pkg,
              createdAt: timestamp,
              updatedAt: timestamp
            };
            await setDoc(doc(db, 'packages', pkg.id), docObj);
            seeded.push(docObj);
          }
          return seeded;
        }

        // Active clear demo packages in live mode if they exist in the collection list
        if (collectionName === 'packages') {
          const demoIds = [
            'hajj-economy', 'hajj-premium', 'hajj-vip',
            'umrah-economy', 'umrah-premium', 'umrah-vip',
            'intl-dubai', 'intl-turkey', 'intl-maldives', 'intl-saudi', 'intl-thailand', 'intl-kashmir', 'intl-europe'
          ];
          const demoFound = list.filter(p => demoIds.includes(p.id) || p.id.startsWith('hajj-') || p.id.startsWith('umrah-') || p.id.startsWith('intl-'));
          if (demoFound.length > 0) {
            console.log(`Wiping ${demoFound.length} demo packages from Live Firestore...`);
            for (const dp of demoFound) {
              try {
                await firestoreDeleteDoc(doc(db, 'packages', dp.id));
              } catch (e) {
                console.error(`Error deleting demo pack ${dp.id}:`, e);
              }
            }
            // Filter list to only contain user custom-added packages
            return list.filter(p => !demoIds.includes(p.id) && !p.id.startsWith('hajj-') && !p.id.startsWith('umrah-') && !p.id.startsWith('intl-'));
          }
        }

        // Auto-seed bookings if empty in live mode
        if (list.length === 0 && collectionName === 'bookings') {
          console.log("Seeding bookings collection because it was empty in Live Firestore...");
          for (const bk of SEED_BOOKINGS) {
            await setDoc(doc(db, 'bookings', bk.id), bk);
          }
          return SEED_BOOKINGS;
        }

        // Auto-seed inquiries if empty in live mode
        if (list.length === 0 && collectionName === 'inquiries') {
          console.log("Seeding inquiries collection because it was empty in Live Firestore...");
          for (const inq of SEED_INQUIRIES) {
            await setDoc(doc(db, 'inquiries', inq.id), inq);
          }
          return SEED_INQUIRIES;
        }

        // Auto-seed blog posts if empty in live mode
        if (list.length === 0 && collectionName === 'blog_posts') {
          console.log("Seeding blog posts collection because it was empty in Live Firestore...");
          for (const blog of BLOG_POSTS) {
            await setDoc(doc(db, 'blog_posts', blog.id), blog);
          }
          return BLOG_POSTS;
        }

        // Auto-seed gallery if empty in live mode
        if (list.length === 0 && collectionName === 'gallery') {
          console.log("Seeding gallery collection because it was empty in Live Firestore...");
          for (const item of GALLERY_ITEMS) {
            await setDoc(doc(db, 'gallery', item.id), item);
          }
          return GALLERY_ITEMS;
        }

        return list;
      } catch (error) {
        handleFirestoreError(error, OperationType.GET, collectionName);
      }
    }
    
    // Fallback mode
    initializeLocalStorageIfMissing();
    const dataStr = localStorage.getItem(collectionName);
    return dataStr ? JSON.parse(dataStr) : [];
  },

  // --- FETCH CLIENT BOOKINGS ONLY ---
  async getClientBookings(email: string): Promise<Booking[]> {
    if (isLiveFirebase) {
      try {
        const q = query(
          collection(db, 'bookings'),
          where('contactEmail', '==', email)
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Booking[];
      } catch (error) {
        handleFirestoreError(error, OperationType.GET, 'bookings');
      }
    }

    // Fallback mode
    const all = await this.getCollection('bookings');
    return all.filter((b: any) => b.contactEmail?.toLowerCase().trim() === email.toLowerCase().trim());
  },

  // --- FETCH CLIENT INQUIRIES ONLY ---
  async getClientInquiries(email: string): Promise<Inquiry[]> {
    if (isLiveFirebase) {
      try {
        const q = query(
          collection(db, 'inquiries'),
          where('email', '==', email)
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Inquiry[];
      } catch (error) {
        handleFirestoreError(error, OperationType.GET, 'inquiries');
      }
    }

    // Fallback mode
    const all = await this.getCollection('inquiries');
    return all.filter((i: any) => i.email?.toLowerCase().trim() === email.toLowerCase().trim());
  },

  // --- ADD NEW DOCUMENT ---
  async createDoc(collectionName: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const newDoc = {
      ...data,
      id: data.id || Math.random().toString(36).substring(2, 11),
      createdAt: data.createdAt || timestamp,
      updatedAt: timestamp
    };

    if (isLiveFirebase) {
      try {
        await setDoc(doc(db, collectionName, newDoc.id), newDoc);
        return newDoc;
      } catch (error) {
        handleFirestoreError(error, OperationType.WRITE, `${collectionName}/${newDoc.id}`);
      }
    }

    // Fallback mode
    initializeLocalStorageIfMissing();
    const existingList = await this.getCollection(collectionName);
    existingList.unshift(newDoc);
    localStorage.setItem(collectionName, JSON.stringify(existingList));

    // Side-Effect: Dispatch a physical notification alert for critical actions
    if (collectionName === 'bookings' || collectionName === 'inquiries') {
      const alertType = collectionName === 'bookings' ? 'booking' : 'inquiry';
      const alertTitle = collectionName === 'bookings' ? 'New Package Reservation' : 'Inbound Inquiry Submitted';
      const alertMsg = collectionName === 'bookings'
        ? `${newDoc.contactName} booked package for ${newDoc.travelerCount} travelers.`
        : `${newDoc.name} submitted an inquiry for ${newDoc.travelType} travel services.`;
      
      await this.createDoc('notifications', {
        type: alertType,
        title: alertTitle,
        message: alertMsg,
        read: false,
        referenceId: newDoc.id
      });
    }

    return newDoc;
  },

  // --- UPDATE DOCUMENT ---
  async updateDoc(collectionName: string, docId: string, data: any): Promise<any> {
    const timestamp = new Date().toISOString();
    const cleanData = { ...data, updatedAt: timestamp };

    if (isLiveFirebase) {
      try {
        const docRef = doc(db, collectionName, docId);
        await firestoreUpdateDoc(docRef, cleanData);
        return { id: docId, ...cleanData };
      } catch (error) {
        handleFirestoreError(error, OperationType.UPDATE, `${collectionName}/${docId}`);
      }
    }

    // Fallback mode
    initializeLocalStorageIfMissing();
    const existingList = await this.getCollection(collectionName);
    const updatedList = existingList.map((item: any) => 
      item.id === docId ? { ...item, ...cleanData } : item
    );
    localStorage.setItem(collectionName, JSON.stringify(updatedList));
    return updatedList.find((item: any) => item.id === docId);
  },

  // --- DELETE DOCUMENT ---
  async deleteDoc(collectionName: string, docId: string): Promise<boolean> {
    if (isLiveFirebase) {
      try {
        await firestoreDeleteDoc(doc(db, collectionName, docId));
        return true;
      } catch (error) {
        handleFirestoreError(error, OperationType.DELETE, `${collectionName}/${docId}`);
      }
    }

    // Fallback mode
    initializeLocalStorageIfMissing();
    const existingList = await this.getCollection(collectionName);
    const filteredList = existingList.filter((item: any) => item.id !== docId);
    localStorage.setItem(collectionName, JSON.stringify(filteredList));
    return true;
  },

  // --- DUPLICATE DOCUMENT (Specifically for travel packages fast templates) ---
  async duplicateDoc(collectionName: string, docId: string): Promise<any> {
    const existingList = await this.getCollection(collectionName);
    const sourceDoc = existingList.find((item: any) => item.id === docId);
    if (!sourceDoc) {
      throw new Error(`Duplicate error: source document not found under ID ${docId}`);
    }

    const copyDoc = {
      ...sourceDoc,
      id: Math.random().toString(36).substring(2, 11),
      title: sourceDoc.title ? `${sourceDoc.title} (Copy Template)` : sourceDoc.name ? `${sourceDoc.name} (Copy)` : 'Copy Item',
      createdAt: new Date().toISOString(),
      featured: false
    };

    return await this.createDoc(collectionName, copyDoc);
  },

  // --- LOAD SYSTEM SETTINGS SINGLETON ---
  async getSettings(): Promise<AgencySettings> {
    const settingsList = await this.getCollection('settings');
    if (settingsList.length === 0) {
      return await this.createDoc('settings', SEED_SETTINGS);
    }
    return settingsList[0];
  }
};
