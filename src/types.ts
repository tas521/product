export interface Package {
  id: string;
  title: string;
  category: 'hajj' | 'umrah' | 'international';
  tier?: 'economy' | 'premium' | 'vip';
  rating: number;
  durationDays: number;
  imageUrl: string;
  price: number;
  currency: string;
  hotelDetail: string; // Hotel specifications
  hotelStars: number;
  flightDetail: string; // Airline detail
  visaInclusion: boolean;
  airlineInclusion: boolean;
  shuttleInclusion: boolean;
  guideInclusion: boolean;
  mealsInclusion: string; // e.g. "Full Board", "Breakfast"
  highlights: string[];
  departureDates: string[];
  description: string;
  amenities: string[];
}

export interface Booking {
  id: string;
  packageId: string;
  packageName: string;
  category: 'hajj' | 'umrah' | 'international';
  pricePerPerson: number;
  totalPrice: number;
  travelDate: string;
  travelerCount: number;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress?: string;
  roomSharing?: 'quad' | 'triple' | 'double' | 'single';
  passportNumber?: string;
  departureCity?: string;
  bookingType?: 'booking' | 'inquiry';
  specialRequests?: string;
  bookingDate: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  referenceNumber?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: 'Spiritual Guide' | 'Preparation' | 'Visa Guide' | 'Travel Tips';
  author: string;
  publishedDate: string;
  imageUrl: string;
  readTime: string;
}

export interface GalleryItem {
  id: string;
  imageUrl: string;
  title: string;
  category: 'pilgrimage' | 'groups' | 'haram' | 'destinations';
  description: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  travelType: 'hajj' | 'umrah' | 'international' | 'visa' | 'general';
  message: string;
  submittedAt: string;
  status?: 'new' | 'replied' | 'archived';
  notes?: string;
}

export interface AdminUser {
  id?: string;
  uid?: string;
  name: string;
  email: string;
  role: 'super_admin' | 'staff_admin' | 'client';
  createdAt?: string;
  updatedAt?: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
  bookingHistory: string[]; // array of bookingIds
  createdAt: string;
}

export interface Order {
  id: string;
  bookingId: string;
  customerName: string;
  packageName: string;
  amount: number;
  currency: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  paymentMethod: string;
  transactionId: string;
  createdAt: string;
}

export interface Review {
  id: string;
  packageId?: string;
  packageName?: string;
  customerName: string;
  rating: number;
  comment: string;
  status: 'pending' | 'approved' | 'rejected';
  featured: boolean;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  text: string;
  image: string;
  rating: number;
  featured: boolean;
  createdAt: string;
}

export interface AdminNotification {
  id: string;
  type: 'booking' | 'inquiry' | 'payment';
  title: string;
  message: string;
  read: boolean;
  referenceId: string;
  createdAt: string;
}

export interface AgencySettings {
  id: string;
  companyName: string;
  address: string;
  email: string;
  phone: string;
  whatsapp: string;
  socialFacebook: string;
  socialInstagram: string;
  socialTwitter: string;
  smtpServer: string;
}

