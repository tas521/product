import { Package, BlogPost, GalleryItem } from './types';

export const PACKAGES: Package[] = [];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-hajj-step-by-step',
    title: 'A Spiritual & Physical Step-by-Step Guide to Hajj 1447H',
    summary: 'Master the fundamental components of Hajj. Learn step-by-step guidance on Ihram, Mina tent setups, Arafat prayers, and Muzdalifah.',
    content: `Perform Hajj with absolute peace of mind. Under our comprehensive guide, we unpack each element of the journey:
      
      1. Entering Ihram: Defining the boundaries of Miqat, essential hygiene rituals, prayer structure, and declaring the Talbiyah.
      2. The Days of Mina: Staying in the valleys of Mina. Hydrate appropriately, avoid extreme direct midday heat, and spend time in spiritual contemplation.
      3. The day of Arafat: The core pillar of Hajj. Maximise your Duas between Dhuhr and Sunset.
      4. Muzdalifah night of gathering pebbles and meditating beneath stars.
      5. Jamarat and Eid rituals: Stoning, sacrifice (Qurbani), Halq/Taqsir structure, and the Farewell Tawaf.
      
      Al Safar provides experienced doctors, reputable scholars in multiple languages, and direct air-conditioned modern buses for swift movement between physical zones.`,
    category: 'Spiritual Guide',
    author: 'Mufti Mohammad Ismail (Al Safar Chief Scholar)',
    publishedDate: 'May 10, 2026',
    imageUrl: 'https://images.unsplash.com/photo-1564767609342-620cb19b2357?q=80&w=1200&auto=format&fit=crop',
    readTime: '7 min read'
  },
  {
    id: 'blog-umrah-checklist',
    title: 'The Ultimate Checklist for Your Umrah Journey: What to Pack',
    summary: 'A detailed inventory checklist of spiritual, medical, and documentation essentials you must pack before flying to Jeddah or Madinah.',
    content: `First time performing Umrah? Having the correct luggage contents makes a vast difference in physical and mental stamina:

      • Clothing: Lightweight white Ihrams (at least 2 sets), soft cotton clothes for hotel rest, comfortable non-stitch slippers with cushion support for thousands of steps.
      • Health: Unscented soaps/shampoo, Vaseline (to prevent friction rashes), hydration powders/ORS packs, standard pain relievers, and prescription medication.
      • Spiritual: Pocket Mushaf or trusted Dua application, spiritual notebooks, counting ring, lightweight foldable prayer mat with backrest support.
      • Documentation: Copy of visa papers, flight tickets, medical vaccines certificate, emergency local Saudi SIM numbers (Al Safar representative).
      
      Our VIP and premium groups receive a complimentary, complete Al Safar Travel Kit containing premium travel bags, water decanters, pocket Dua booklets, and slippers.`,
    category: 'Preparation',
    author: 'Al Safar Editorial Team',
    publishedDate: 'April 22, 2026',
    imageUrl: 'https://images.unsplash.com/photo-1542856391-010fb87dcfed?q=80&w=1200&auto=format&fit=crop',
    readTime: '5 min read'
  },
  {
    id: 'blog-saudi-visa-rules',
    title: 'Navigating Saudi Arabia New Visa Rules of 2026',
    summary: 'Learn about Saudi Tourist eVisas, dedicated Umrah Visas, multi-entry rules, and transit visa structures for easy pilgrimage and tourism.',
    content: `Saudi Arabia's Vision 2030 has revolutionized travel entry pipelines. In 2026, traveling to Makkah and Riyadh is simpler than ever:

      1. Saudi Tourist eVisa: Eligible for over 60 countries. Allows a 90-day stay and multi-entry. Excellent for performing Umrah without a dedicated Umrah agent, though certain rules apply to Zamzam water transport.
      2. Official Umrah Visa: Offers complete access to special services, automated group transportation, and allows official transport of 5L Zamzam bottles back with airlines.
      3. Transit Visa: Valid for up to 96 hours. Ideal for stopover travelers with Saudia airline wanting to execute a quick 24-hour Umrah.
      
      At Al Safar, our dedicated visa services group handles complex application procedures, biometric approvals, and health insurance mapping within 48 hours.`,
    category: 'Visa Guide',
    author: 'Hasan Siddiqui (Visa Services Director)',
    publishedDate: 'March 15, 2026',
    imageUrl: 'https://images.unsplash.com/photo-1586724237569-f38559db836c?q=80&w=1200&auto=format&fit=crop',
    readTime: '4 min read'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    imageUrl: 'https://images.unsplash.com/photo-1564767609342-620cb19b2357?q=80&w=800&auto=format&fit=crop',
    title: 'Majestic Holy Kaaba',
    category: 'pilgrimage',
    description: 'Breathtaking evening view during the Tawaf rituals.'
  },
  {
    id: 'gal-9',
    imageUrl: 'https://images.unsplash.com/photo-1601564921647-b444852c0c73?q=80&w=800&auto=format&fit=crop',
    title: 'Prophetic Sanctuary at Sunset, Madinah',
    category: 'haram',
    description: 'Masjid al-Nabawi illuminating the dusky sky with glowing golden light.'
  },
  {
    id: 'gal-2',
    imageUrl: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=800&auto=format&fit=crop',
    title: 'The Prophetic Sanctuary Dome',
    category: 'haram',
    description: 'The iconic Green Dome of Al-Masjid an-Nabawi surrounded by modern luxury umbrellas.'
  },
  {
    id: 'gal-10',
    imageUrl: 'https://images.unsplash.com/photo-1628131349755-e7a83d47d174?q=80&w=800&auto=format&fit=crop',
    title: 'Devoted Congregations in Makkah',
    category: 'pilgrimage',
    description: 'Unified pilgrims performing Tawaf prayers around the holy Kaaba.'
  },
  {
    id: 'gal-3',
    imageUrl: 'https://images.unsplash.com/photo-1542856391-010fb87dcfed?q=80&w=800&auto=format&fit=crop',
    title: 'Makkah Clock Overlook',
    category: 'haram',
    description: 'High-altitude panoramic shot highlighting the grandeur of Abraj Al Bait with Haram backdrop.'
  },
  {
    id: 'gal-11',
    imageUrl: 'https://images.unsplash.com/photo-1613143431690-34989d970339?q=80&w=800&auto=format&fit=crop',
    title: 'Minarets of Madinah illuminating the Night',
    category: 'haram',
    description: 'Breathtaking high-contrast view of the Prophetic Mosque\'s white-glowing minarets in the starry evening.'
  },
  {
    id: 'gal-4',
    imageUrl: 'https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?q=80&w=800&auto=format&fit=crop',
    title: 'Golden Doors of the Kaaba',
    category: 'haram',
    description: 'The magnificent gold-gilded entry portals to the Holy Kaaba in Makkah.'
  },
  {
    id: 'gal-12',
    imageUrl: 'https://images.unsplash.com/photo-1580418827493-f2b22c0a76ae?q=80&w=800&auto=format&fit=crop',
    title: 'Kiswah Hand-Embroidered Gold Calligraphy',
    category: 'pilgrimage',
    description: 'Exquisite custom gold calligraphy on the rich black silk fabric draping the Kaaba.'
  },
  {
    id: 'gal-13',
    imageUrl: 'https://images.unsplash.com/photo-1590076211175-ef6791b8d2b7?q=80&w=800&auto=format&fit=crop',
    title: 'The Courtyard of Peace, Madinah, with Umbrellas',
    category: 'haram',
    description: 'Scenic sunlight peeking under the giant expanding umbrellas in the holy courtyard.'
  },
  {
    id: 'gal-14',
    imageUrl: 'https://images.unsplash.com/photo-1618083707368-b3823daa2726?q=80&w=800&auto=format&fit=crop',
    title: 'Spiritual Contemplation in Makkah',
    category: 'pilgrimage',
    description: 'A pilgrim reading the Holy Quran with a direct window view overlooking Masjid al-Haram.'
  },
  {
    id: 'gal-15',
    imageUrl: 'https://images.unsplash.com/photo-1542856391-010fb87dcfed?q=80&w=800&auto=format&fit=crop',
    title: 'Group Departure Departure Ceremony',
    category: 'groups',
    description: 'Members of our premium Delhi travel cadre gather before departure for group orientation.'
  },
  {
    id: 'gal-5',
    imageUrl: 'https://images.unsplash.com/photo-1527838832700-50592524df73?q=80&w=800&auto=format&fit=crop',
    title: 'Sunrise Cappadocia',
    category: 'destinations',
    description: 'Golden morning balloon views in the heart of Turkish Anatolian landscape.'
  },
  {
    id: 'gal-6',
    imageUrl: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=800&auto=format&fit=crop',
    title: 'Relaxing Maldives waters',
    category: 'destinations',
    description: 'Crystal-clear oceans and infinite overwater platforms.'
  },
  {
    id: 'gal-7',
    imageUrl: 'https://images.unsplash.com/photo-1595815729819-abdec127c72a?q=80&w=800&auto=format&fit=crop',
    title: 'Shikara boats in Kashmir',
    category: 'destinations',
    description: 'Traditional wooden shikara boating in Srinagar under majestic mountain views.'
  },
  {
    id: 'gal-8',
    imageUrl: 'https://images.unsplash.com/photo-1586724237569-f38559db836c?q=80&w=800&auto=format&fit=crop',
    title: 'Elegance of Ancient Al-Ula',
    category: 'destinations',
    description: 'Marvelous tombs of Saudi Hegra standing amidst gorgeous desert orange structures.'
  }
];

export const TESTIMONIALS = [
  {
    id: 't-1',
    name: 'Mohamed Farhan',
    location: 'New Delhi, India',
    role: 'Umrah Premium Pilgrim',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop', // Custom modern avatar
    text: 'Al Safar made our dreams come true. From the fast-track airport clearances to the beautiful executive Kaaba-facing room at Swissôtel, everything was impeccably organized. My elderly parents did not feel any fatigue.',
    rating: 5
  },
  {
    id: 't-2',
    name: 'Aisha Siddiqui',
    location: 'Noida, UP',
    role: 'Hajj VIP Pilgrim',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
    text: 'Choosing their Hajj VIP Sovereign package was the best decision. Having a private scholar accompany us for rituals provided so much clarity. The private Mina tents with comfortable sofa-beds were exceptionally clean.',
    rating: 5
  },
  {
    id: 't-3',
    name: 'Zameer Alam',
    location: 'Gurugram, Haryana',
    role: 'International Turkey Tour Tourist',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    text: 'We booked the Cappadocia & Ottoman Empire tour with family. The hotels were 5-star Old Town wonders and the cave hotel in Cappadocia was magical. I highly recommend Al Safar for premium global travels too!',
    rating: 5
  }
];

export const TRUST_INDICATORS = [
  {
    id: 'tr-1',
    title: '15+ Years Trust',
    description: 'Serving over 25,000 satisfied pilgrims with pristine credentials.',
    iconName: 'Award'
  },
  {
    id: 'tr-2',
    title: 'Female-Friendly Groups',
    description: 'Safe, dedicated, respectful female travel options and female-only tour groups.',
    iconName: 'ShieldCheck'
  },
  {
    id: 'tr-3',
    title: 'Trusted Scholar Guidance',
    description: 'Certified Muftis and scholars guide you step-by-step through ritual correctness.',
    iconName: 'BookOpen'
  },
  {
    id: 'tr-4',
    title: 'Affordable Luxury',
    description: 'Exceptional 5-Star luxury hotel services aligned with unbeatable pricing.',
    iconName: 'Gem'
  },
  {
    id: 'tr-5',
    title: 'Makkah/Madinah Front Hotels',
    description: 'Guaranteed 5-star stays directly facing the Haram or within short walking distance.',
    iconName: 'MapPin'
  },
  {
    id: 'tr-6',
    title: '24/7 Global Assistance',
    description: 'Around-the-clock emergency helpline and on-ground hospitality managers in Saudi.',
    iconName: 'Phone'
  }
];

export const DELHI_OFFICE_DETAILS = {
  address: 'Commercial Block, Near Ansari Road, Daryaganj, New Delhi, Delhi 110002, India',
  phone: '+91 82877 62995',
  email: 'delhi@alsafartravels.com',
  whatsapp: '+918287762995',
  hours: [
    { days: 'Monday - Friday', times: '09:30 AM - 07:00 PM' },
    { days: 'Saturday', times: '10:00 AM - 05:00 PM' },
    { days: 'Sunday', times: 'Closed (Spiritual Enquiries via WhatsApp Call)' }
  ],
  landmarks: [
    'Opposite Daryaganj Fire Station',
    'Walking distance from Dilli Gate Metro Station (Gate 3)',
    'Near historic Golcha Cinema Lane'
  ],
  transitHubs: [
    { name: 'Dilli Gate Metro (Violet Line)', distance: '400m / 5 min walk' },
    { name: 'New Delhi Railway Station (NDLS)', distance: '3.2 km / 12 mins' },
    { name: 'Srinagar Express/Delhi Bus Terminal', distance: '1.2 km' }
  ],
  parkingTips: 'Convenient paid underground parking is available at the Dilli Gate Metro Station. Valet parking can be coordinated upon request for elderly guests booking premium suites.'
};
