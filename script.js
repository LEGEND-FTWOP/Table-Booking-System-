/**
 * ==============================================================================
 * VelvetTable — Restaurant Table Reservation & Floor Management System
 * Author: Web Development Intern
 * Project: Capstone Restaurant Table Reservation & Floor Management System
 * File: script.js (Vanilla ES6+ JavaScript, No Framework Dependencies)
 * 
 * Tailored for:
 * - Currency: Indian Rupees (₹)
 * - Customer Names: Indian names (Rohan Gupta, Ananya Sharma, etc.)
 * - Floor Plan & Table Data: Matches exact reference design layout
 * ==============================================================================
 */

// Utility function to format dates as YYYY-MM-DD
function getFormattedDate(offsetDays = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Utility function to format currency in Indian Rupees (₹)
function formatINR(amount) {
  return '₹' + Number(amount || 0).toLocaleString('en-IN');
}

/* ==============================================================================
   1. INITIAL SEED DATA (Tables & Sections matching reference layout + Indian Names)
   ============================================================================== */
const DEFAULT_TABLES = [
  // Row 1 in Reference Image
  { id: 'T-01', plateNumber: '01', name: 'Table 1', section: 'Main Dining', displaySection: 'Main Dining', type: '2-Seater', capacity: 2, status: 'Occupied' },
  { id: 'T-02', plateNumber: '02', name: 'Table 2', section: 'Main Dining', displaySection: 'Main Dining', type: '2-Seater', capacity: 2, status: 'Available' },
  { id: 'T-03', plateNumber: '03', name: 'Table 3', section: 'Main Dining', displaySection: 'Main Dining', type: '4-Seater', capacity: 4, status: 'Occupied' },
  { id: 'T-04', plateNumber: '04', name: 'Table 4', section: 'Main Dining', displaySection: 'Main Dining', type: '4-Seater', capacity: 4, status: 'Reserved' },
  { id: 'T-05', plateNumber: '05', name: 'Table 5', section: 'Main Dining', displaySection: 'Main Dining', type: '6-Seater', capacity: 6, status: 'Available' },
  { id: 'T-06', plateNumber: '06', name: 'Table 6', section: 'Main Dining', displaySection: 'Main Dining', type: '6-Seater', capacity: 6, status: 'Occupied' },
  { id: 'T-07', plateNumber: '07', name: 'Table 7', section: 'Main Dining', displaySection: 'Main Dining', type: '8-Seater', capacity: 8, status: 'Reserved' },
  { id: 'T-08', plateNumber: '08', name: 'Patio 1', section: 'Outdoor Patio', displaySection: 'Outdoor Patio', type: 'Outdoor Table', capacity: 2, status: 'Available' },
  { id: 'T-09', plateNumber: '09', name: 'Patio 2', section: 'Outdoor Patio', displaySection: 'Outdoor Table', type: 'Outdoor Table', capacity: 4, status: 'Occupied' },
  { id: 'T-10', plateNumber: '10', name: 'Patio 3', section: 'Outdoor Patio', displaySection: 'Outdoor Table', type: 'Outdoor Table', capacity: 4, status: 'Available' },

  // Row 2 in Reference Image
  { id: 'T-11', plateNumber: '11', name: 'Patio 4', section: 'Outdoor Patio', displaySection: 'Outdoor Table', type: 'Outdoor Table', capacity: 6, status: 'Out of Service' },
  { id: 'T-12', plateNumber: '12', name: 'VIP Royal', section: 'VIP Lounge', displaySection: 'VIP Lounge', type: 'VIP Table', capacity: 6, status: 'Reserved' },
  { id: 'T-13', plateNumber: '13', name: 'VIP Grand', section: 'VIP Lounge', displaySection: 'VIP Lounge', type: 'VIP Table', capacity: 8, status: 'Occupied' },
  { id: 'T-14', plateNumber: '14', name: 'VIP Intimate', section: 'VIP Lounge', displaySection: 'VIP Lounge', type: 'VIP Table', capacity: 2, status: 'Available' },
  { id: 'T-15', plateNumber: '15', name: 'Terrace A', section: 'Rooftop Terrace', displaySection: 'Rooftop Terrace', type: 'Outdoor Table', capacity: 2, status: 'Reserved' },
  { id: 'T-16', plateNumber: '16', name: 'Terrace B', section: 'Rooftop Terrace', displaySection: 'Rooftop Terrace', type: 'Outdoor Table', capacity: 4, status: 'Available' }
];

const DEFAULT_CUSTOMERS = [
  {
    id: 'CUST-101',
    name: 'Rohan Gupta',
    email: 'rohan.gupta@techventures.in',
    phone: '+91 98201 44521',
    totalVisits: 14,
    totalSpent: 48600,
    isVip: true,
    dietary: 'Pure Veg',
    preferences: 'Quiet corner, Sparkling water with lime, prefers booth seating'
  },
  {
    id: 'CUST-102',
    name: 'Vikram Malhotra',
    email: 'vikram.malhotra@zenith.in',
    phone: '+91 98210 33445',
    totalVisits: 8,
    totalSpent: 34200,
    isVip: true,
    dietary: 'None',
    preferences: 'Business dinner specialist, fast wine service, window views'
  },
  {
    id: 'CUST-103',
    name: 'Dr. Sarah Sen',
    email: 'dr.sarah.sen@medcenter.in',
    phone: '+91 98301 45678',
    totalVisits: 6,
    totalSpent: 22400,
    isVip: false,
    dietary: 'Vegetarian',
    preferences: 'Romantic outdoor setting, ambient music'
  },
  {
    id: 'CUST-104',
    name: 'Rajesh & Meera Verma',
    email: 'verma.family@delhiconsult.in',
    phone: '+91 98104 56789',
    totalVisits: 11,
    totalSpent: 56400,
    isVip: true,
    dietary: 'Nut Allergy',
    preferences: 'Celebrates wedding anniversaries here, champagne on arrival'
  },
  {
    id: 'CUST-105',
    name: 'Aiden Patel',
    email: 'aiden.patel@designstudio.in',
    phone: '+91 98250 67890',
    totalVisits: 4,
    totalSpent: 16800,
    isVip: false,
    dietary: 'Halal',
    preferences: 'Prefers Terrace for city skyline views'
  },
  {
    id: 'CUST-106',
    name: 'Kavita Deshmukh',
    email: 'kavita.d@lawassociates.in',
    phone: '+91 98220 78901',
    totalVisits: 5,
    totalSpent: 24500,
    isVip: false,
    dietary: 'None',
    preferences: 'Low lighting, sommelier consultation requested'
  },
  {
    id: 'CUST-107',
    name: 'Arjun Kapoor',
    email: 'arjun.kapoor@automotive.in',
    phone: '+91 98900 89012',
    totalVisits: 9,
    totalSpent: 42200,
    isVip: true,
    dietary: 'None',
    preferences: 'Espresso after dining, likes outdoor patio heaters'
  },
  {
    id: 'CUST-108',
    name: 'Suniti Sharma',
    email: 'suniti.sharma@royalheritage.in',
    phone: '+91 98711 22334',
    totalVisits: 7,
    totalSpent: 38900,
    isVip: true,
    dietary: 'Pure Veg',
    preferences: 'VIP Lounge preferred, strictly royal silver service'
  },
  {
    id: 'CUST-109',
    name: 'Maharaj Digvijay Singhania',
    email: 'v.singhania@indocorp.com',
    phone: '+91 99203 11889',
    totalVisits: 16,
    totalSpent: 112500,
    isVip: true,
    dietary: 'None',
    preferences: 'VIP dining host, requires private butler service'
  }
];

const DEFAULT_BOOKINGS = [
  // Today's Bookings matching exact visual states in reference image
  {
    id: 'BK-2001',
    customerName: 'Rohan Gupta',
    customerPhone: '+91 98201 44521',
    customerEmail: 'rohan.gupta@techventures.in',
    guestCount: 2,
    tableId: 'T-01', // Table 1
    date: getFormattedDate(0),
    time: '18:30',
    status: 'Seated',
    occasion: 'Romantic Date',
    specialRequests: 'Sparkling water ready on table, celebratory wine',
    estimatedRevenue: 4800
  },
  {
    id: 'BK-2002',
    customerName: 'Vikram Malhotra',
    customerPhone: '+91 98210 33445',
    customerEmail: 'vikram.malhotra@zenith.in',
    guestCount: 4,
    tableId: 'T-03', // Table 3
    date: getFormattedDate(0),
    time: '19:00',
    status: 'Seated',
    occasion: 'Business Dinner',
    specialRequests: 'Quiet zone for contract review, tasting menu pre-ordered',
    estimatedRevenue: 8600
  },
  {
    id: 'BK-2003',
    customerName: 'Dr. Sarah Sen',
    customerPhone: '+91 98301 45678',
    customerEmail: 'dr.sarah.sen@medcenter.in',
    guestCount: 4,
    tableId: 'T-04', // Table 4
    date: getFormattedDate(0),
    time: '20:15',
    status: 'Reserved',
    occasion: 'Birthday',
    specialRequests: 'Birthday candle with chocolate souffle',
    estimatedRevenue: 7400
  },
  {
    id: 'BK-2004',
    customerName: 'Rajesh & Meera Verma',
    customerPhone: '+91 98104 56789',
    customerEmail: 'verma.family@delhiconsult.in',
    guestCount: 6,
    tableId: 'T-06', // Table 6
    date: getFormattedDate(0),
    time: '18:00',
    status: 'Seated',
    occasion: 'Anniversary',
    specialRequests: '20th Wedding Anniversary - Champagne on arrival',
    estimatedRevenue: 14200
  },
  {
    id: 'BK-2005',
    customerName: 'Kavita Deshmukh',
    customerPhone: '+91 98220 78901',
    customerEmail: 'kavita.d@lawassociates.in',
    guestCount: 8,
    tableId: 'T-07', // Table 7
    date: getFormattedDate(0),
    time: '20:30',
    status: 'Reserved',
    occasion: 'Business Dinner',
    specialRequests: 'Corporate client dinner, prompt check billing',
    estimatedRevenue: 18500
  },
  {
    id: 'BK-2006',
    customerName: 'Arjun Kapoor',
    customerPhone: '+91 98900 89012',
    customerEmail: 'arjun.kapoor@automotive.in',
    guestCount: 4,
    tableId: 'T-09', // Patio 2
    date: getFormattedDate(0),
    time: '19:15',
    status: 'Seated',
    occasion: 'Casual Dining',
    specialRequests: 'Patio heater on, cocktail pairings',
    estimatedRevenue: 6800
  },
  {
    id: 'BK-2007',
    customerName: 'Suniti Sharma',
    customerPhone: '+91 98711 22334',
    customerEmail: 'suniti.sharma@royalheritage.in',
    guestCount: 6,
    tableId: 'T-12', // VIP Royal
    date: getFormattedDate(0),
    time: '20:00',
    status: 'Reserved',
    occasion: 'Celebration',
    specialRequests: 'VIP lounge exclusive menu, champagne bucket',
    estimatedRevenue: 22500
  },
  {
    id: 'BK-2008',
    customerName: 'Maharaj Digvijay Singhania',
    customerPhone: '+91 99203 11889',
    customerEmail: 'v.singhania@indocorp.com',
    guestCount: 8,
    tableId: 'T-13', // VIP Grand
    date: getFormattedDate(0),
    time: '19:30',
    status: 'Seated',
    occasion: 'VIP Banquet',
    specialRequests: 'Private sommelier service, security accompaniment',
    estimatedRevenue: 34000
  },
  {
    id: 'BK-2009',
    customerName: 'Aiden Patel',
    customerPhone: '+91 98250 67890',
    customerEmail: 'aiden.patel@designstudio.in',
    guestCount: 2,
    tableId: 'T-15', // Terrace A
    date: getFormattedDate(0),
    time: '21:00',
    status: 'Reserved',
    occasion: 'Romantic Date',
    specialRequests: 'Rooftop table with skyline view, Halal options',
    estimatedRevenue: 4500
  },

  // Tomorrow's Bookings
  {
    id: 'BK-2010',
    customerName: 'Priya Iyer',
    customerPhone: '+91 94441 55678',
    customerEmail: 'priya.iyer@chennaicapital.com',
    guestCount: 4,
    tableId: 'T-05',
    date: getFormattedDate(1),
    time: '19:30',
    status: 'Confirmed',
    occasion: 'Diwali Celebration',
    specialRequests: 'Strict Pure Veg prep, saffron welcome drink',
    estimatedRevenue: 7200
  }
];

const DEFAULT_WAITLIST = [
  {
    id: 'WL-101',
    customerName: 'Siddharth Roy',
    phone: '+91 98200 66778',
    guestCount: 2,
    joinedAt: '18:40',
    estimatedWait: '15 mins',
    preferredSection: 'Outdoor Patio',
    notes: 'Drinks at bar'
  },
  {
    id: 'WL-102',
    customerName: 'Divya & Manish Joshi',
    phone: '+91 98114 88990',
    guestCount: 4,
    joinedAt: '18:55',
    estimatedWait: '25 mins',
    preferredSection: 'Main Dining',
    notes: 'Anniversary couple, willing to take next available'
  }
];

const DEFAULT_NOTIFICATIONS = [
  {
    id: 'NT-1',
    title: 'VIP Arrival Alert',
    message: 'Vikramaditya Singhania (VIP Banquet) is seated at VIP Grand (T-13).',
    time: '15m ago',
    type: 'vip',
    read: false
  },
  {
    id: 'NT-2',
    title: 'Upcoming Reservation',
    message: 'Table 4 (Dr. Sarah Sen, Party of 4) is due at 20:15.',
    time: '25m ago',
    type: 'reservation',
    read: false
  },
  {
    id: 'NT-3',
    title: 'Waitlist Notification',
    message: 'Table 2 is now available. Siddharth Roy (Waitlist #1) can be seated.',
    time: '40m ago',
    type: 'waitlist',
    read: true
  }
];

const DEFAULT_USERS = [
  {
    id: 'USR-1',
    username: 'admin',
    name: 'Aarav Choudhury',
    email: 'admin@courtyard.in',
    role: 'Admin',
    password: 'admin',
    avatar: 'assets/avatar-aarav.jpg'
  },
  {
    id: 'USR-2',
    username: 'manager',
    name: 'Sunil Rao',
    email: 'manager@courtyard.in',
    role: 'Manager',
    password: 'manager',
    avatar: 'assets/avatar-sunil.jpg'
  },
  {
    id: 'USR-3',
    username: 'staff',
    name: 'Deepika Nair',
    email: 'staff@courtyard.in',
    role: 'Staff',
    password: 'staff',
    avatar: 'assets/avatar-deepika.jpg'
  }
];

/* ==============================================================================
   2. CENTRAL STATE & LOCALSTORAGE MANAGER
   ============================================================================== */
const Store = {
  KEYS: {
    TABLES: 'vt_tables_v4',
    BOOKINGS: 'vt_bookings_v4',
    CUSTOMERS: 'vt_customers_v4',
    WAITLIST: 'vt_waitlist_v4',
    NOTIFS: 'vt_notifications_v4',
    USERS: 'vt_users_v7',
    USER: 'vt_current_user_v7',
    THEME: 'vt_theme'
  },

  _state: {
    tables: [],
    bookings: [],
    customers: [],
    waitlist: [],
    notifications: [],
    users: [],
    currentUser: null,
    theme: 'light'
  },

  _subscribers: [],

  subscribe(callback) {
    this._subscribers.push(callback);
    return () => {
      this._subscribers = this._subscribers.filter(fn => fn !== callback);
    };
  },

  notify(event, data) {
    this._subscribers.forEach(fn => {
      try { fn(event, data); } catch (e) { console.error('Store error:', e); }
    });
  },

  init() {
    this._state.tables = this.load(this.KEYS.TABLES, DEFAULT_TABLES);
    this._state.bookings = this.load(this.KEYS.BOOKINGS, DEFAULT_BOOKINGS);
    this._state.customers = this.load(this.KEYS.CUSTOMERS, DEFAULT_CUSTOMERS);
    this._state.waitlist = this.load(this.KEYS.WAITLIST, DEFAULT_WAITLIST);
    this._state.notifications = this.load(this.KEYS.NOTIFS, DEFAULT_NOTIFICATIONS);
    this._state.users = this.load(this.KEYS.USERS, DEFAULT_USERS);
    // Ensure default Indian avatars, usernames, and passwords are synced
    DEFAULT_USERS.forEach(def => {
      const idx = this._state.users.findIndex(u => u.role.toLowerCase() === def.role.toLowerCase());
      if (idx !== -1) {
        this._state.users[idx].avatar = def.avatar;
        this._state.users[idx].username = def.username;
        this._state.users[idx].password = def.password;
      } else {
        this._state.users.push(def);
      }
    });

    // Load active session user if any
    this._state.currentUser = this.load(this.KEYS.USER, null);
    if (this._state.currentUser) {
      const updated = this._state.users.find(u => u.role.toLowerCase() === this._state.currentUser.role.toLowerCase());
      if (updated) {
        this._state.currentUser.avatar = updated.avatar;
      }
    }
    this._state.theme = this.load(this.KEYS.THEME, 'light');

    document.documentElement.setAttribute('data-theme', this._state.theme);
  },

  load(key, fallback) {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : JSON.parse(JSON.stringify(fallback));
    } catch (e) {
      return JSON.parse(JSON.stringify(fallback));
    }
  },

  save(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.warn('Storage save failed:', key);
    }
  },

  resetAllData() {
    this.save(this.KEYS.TABLES, DEFAULT_TABLES);
    this.save(this.KEYS.BOOKINGS, DEFAULT_BOOKINGS);
    this.save(this.KEYS.CUSTOMERS, DEFAULT_CUSTOMERS);
    this.save(this.KEYS.WAITLIST, DEFAULT_WAITLIST);
    this.save(this.KEYS.NOTIFS, DEFAULT_NOTIFICATIONS);
    this.save(this.KEYS.USERS, DEFAULT_USERS);
    this.save(this.KEYS.USER, null);

    this._state.tables = JSON.parse(JSON.stringify(DEFAULT_TABLES));
    this._state.bookings = JSON.parse(JSON.stringify(DEFAULT_BOOKINGS));
    this._state.customers = JSON.parse(JSON.stringify(DEFAULT_CUSTOMERS));
    this._state.waitlist = JSON.parse(JSON.stringify(DEFAULT_WAITLIST));
    this._state.notifications = JSON.parse(JSON.stringify(DEFAULT_NOTIFICATIONS));
    this._state.users = JSON.parse(JSON.stringify(DEFAULT_USERS));
    this._state.currentUser = null;

    this.notify('all', null);
  },

  // Tables CRUD
  getTables() { return this._state.tables; },
  getTableById(id) { return this._state.tables.find(t => t.id === id); },
  saveTable(table) {
    const idx = this._state.tables.findIndex(t => t.id === table.id);
    if (idx >= 0) {
      this._state.tables[idx] = { ...this._state.tables[idx], ...table };
    } else {
      if (!table.id) {
        table.id = `T-${String(this._state.tables.length + 1).padStart(2, '0')}`;
      }
      if (!table.plateNumber) {
        table.plateNumber = String(this._state.tables.length + 1).padStart(2, '0');
      }
      this._state.tables.push(table);
    }
    this.save(this.KEYS.TABLES, this._state.tables);
    this.notify('tables', this._state.tables);
    return table;
  },
  deleteTable(id) {
    this._state.tables = this._state.tables.filter(t => t.id !== id);
    this.save(this.KEYS.TABLES, this._state.tables);
    this.notify('tables', this._state.tables);
  },
  setTableStatus(id, status) {
    const table = this.getTableById(id);
    if (table) {
      table.status = status;
      this.save(this.KEYS.TABLES, this._state.tables);
      this.notify('tables', this._state.tables);
    }
  },

  // Bookings CRUD
  getBookings() { return this._state.bookings; },
  getBookingById(id) { return this._state.bookings.find(b => b.id === id); },
  saveBooking(booking) {
    const idx = this._state.bookings.findIndex(b => b.id === booking.id);
    if (idx >= 0) {
      this._state.bookings[idx] = { ...this._state.bookings[idx], ...booking };
    } else {
      if (!booking.id) {
        booking.id = `BK-${Math.floor(2000 + Math.random() * 8000)}`;
      }
      this._state.bookings.unshift(booking);

      // Auto update table status if for today
      if (booking.date === getFormattedDate(0)) {
        if (booking.status === 'Seated') this.setTableStatus(booking.tableId, 'Occupied');
        else if (booking.status === 'Confirmed') this.setTableStatus(booking.tableId, 'Reserved');
      }

      this.syncCustomer(booking);
      this.addNotification({
        title: 'New Dining Reservation',
        message: `${booking.customerName} reserved for ${booking.guestCount} guests at ${booking.tableId}.`,
        type: 'reservation'
      });
    }
    this.save(this.KEYS.BOOKINGS, this._state.bookings);
    this.notify('bookings', this._state.bookings);
    return booking;
  },
  updateBookingStatus(id, newStatus) {
    const booking = this.getBookingById(id);
    if (booking) {
      booking.status = newStatus;
      if (booking.date === getFormattedDate(0)) {
        if (newStatus === 'Seated') this.setTableStatus(booking.tableId, 'Occupied');
        else if (newStatus === 'Confirmed') this.setTableStatus(booking.tableId, 'Reserved');
        else if (newStatus === 'Cancelled' || newStatus === 'No-Show') this.setTableStatus(booking.tableId, 'Available');
      }
      this.save(this.KEYS.BOOKINGS, this._state.bookings);
      this.notify('bookings', this._state.bookings);
    }
  },
  deleteBooking(id) {
    this._state.bookings = this._state.bookings.filter(b => b.id !== id);
    this.save(this.KEYS.BOOKINGS, this._state.bookings);
    this.notify('bookings', this._state.bookings);
  },

  // Customers CRUD
  getCustomers() { return this._state.customers; },
  getCustomerById(id) { return this._state.customers.find(c => c.id === id); },
  saveCustomer(customer) {
    const idx = this._state.customers.findIndex(c => c.id === customer.id);
    if (idx >= 0) {
      this._state.customers[idx] = { ...this._state.customers[idx], ...customer };
    } else {
      if (!customer.id) customer.id = `CUST-${Math.floor(100 + Math.random() * 900)}`;
      this._state.customers.push(customer);
    }
    this.save(this.KEYS.CUSTOMERS, this._state.customers);
    this.notify('customers', this._state.customers);
    return customer;
  },
  deleteCustomer(id) {
    this._state.customers = this._state.customers.filter(c => c.id !== id);
    this.save(this.KEYS.CUSTOMERS, this._state.customers);
    this.notify('customers', this._state.customers);
  },
  syncCustomer(booking) {
    let customer = this._state.customers.find(c => 
      c.phone === booking.customerPhone || 
      (booking.customerEmail && c.email.toLowerCase() === booking.customerEmail.toLowerCase())
    );
    if (customer) {
      customer.totalVisits = (customer.totalVisits || 0) + 1;
      customer.totalSpent = (customer.totalSpent || 0) + (Number(booking.estimatedRevenue) || 3500);
      if (customer.totalVisits >= 5) customer.isVip = true;
    } else {
      customer = {
        id: `CUST-${Math.floor(100 + Math.random() * 900)}`,
        name: booking.customerName,
        phone: booking.customerPhone,
        email: booking.customerEmail || `${booking.customerName.toLowerCase().replace(/[^a-z]/g, '')}@guest.in`,
        totalVisits: 1,
        totalSpent: Number(booking.estimatedRevenue) || 3500,
        isVip: false,
        dietary: 'None',
        preferences: booking.specialRequests || 'Standard dining'
      };
      this._state.customers.push(customer);
    }
    this.save(this.KEYS.CUSTOMERS, this._state.customers);
    this.notify('customers', this._state.customers);
  },

  // Waitlist CRUD
  getWaitlist() { return this._state.waitlist; },
  saveWaitlistEntry(entry) {
    if (!entry.id) {
      entry.id = `WL-${Math.floor(100 + Math.random() * 900)}`;
      const now = new Date();
      entry.joinedAt = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      this._state.waitlist.push(entry);
    } else {
      const idx = this._state.waitlist.findIndex(w => w.id === entry.id);
      if (idx >= 0) this._state.waitlist[idx] = { ...this._state.waitlist[idx], ...entry };
    }
    this.save(this.KEYS.WAITLIST, this._state.waitlist);
    this.notify('waitlist', this._state.waitlist);
    return entry;
  },
  deleteWaitlistEntry(id) {
    this._state.waitlist = this._state.waitlist.filter(w => w.id !== id);
    this.save(this.KEYS.WAITLIST, this._state.waitlist);
    this.notify('waitlist', this._state.waitlist);
  },
  seatWaitlistParty(waitlistId, tableId) {
    const party = this._state.waitlist.find(w => w.id === waitlistId);
    if (!party) return;
    this.saveBooking({
      customerName: party.customerName,
      customerPhone: party.phone,
      customerEmail: `${party.customerName.toLowerCase().replace(/[^a-z]/g, '')}@guest.in`,
      guestCount: party.guestCount,
      tableId: tableId,
      date: getFormattedDate(0),
      time: `${String(new Date().getHours()).padStart(2, '0')}:${String(new Date().getMinutes()).padStart(2, '0')}`,
      status: 'Seated',
      occasion: 'Walk-In Dining',
      specialRequests: party.notes || 'Seated from walk-in queue',
      estimatedRevenue: party.guestCount * 1800
    });
    this.deleteWaitlistEntry(waitlistId);
    this.setTableStatus(tableId, 'Occupied');
  },

  // Notifications
  getNotifications() { return this._state.notifications; },
  addNotification(notif) {
    notif.id = `NT-${Date.now()}`;
    notif.time = 'Just now';
    notif.read = false;
    this._state.notifications.unshift(notif);
    this.save(this.KEYS.NOTIFS, this._state.notifications);
    this.notify('notifications', this._state.notifications);
  },
  markNotificationsRead() {
    this._state.notifications.forEach(n => n.read = true);
    this.save(this.KEYS.NOTIFS, this._state.notifications);
    this.notify('notifications', this._state.notifications);
  },

  // Users & Role Management
  getUsers() { return this._state.users || DEFAULT_USERS; },
  getCurrentUser() { return this._state.currentUser; },
  setCurrentUser(userOrRole) {
    let found = null;
    if (typeof userOrRole === 'string') {
      found = (this._state.users || []).find(u => u.role.toLowerCase() === userOrRole.toLowerCase() || u.email.toLowerCase() === userOrRole.toLowerCase());
      if (!found) {
        found = DEFAULT_USERS.find(u => u.role.toLowerCase() === userOrRole.toLowerCase());
      }
    } else if (userOrRole && typeof userOrRole === 'object') {
      found = userOrRole;
    }

    this._state.currentUser = found;
    if (found) {
      this.save(this.KEYS.USER, found);
    } else {
      try { localStorage.removeItem(this.KEYS.USER); } catch(e) {}
    }
    this.notify('user', found);
    return found;
  },
  addUser(user) {
    if (!user.id) user.id = `USR-${Date.now().toString().slice(-4)}`;
    this._state.users.push(user);
    this.save(this.KEYS.USERS, this._state.users);
    this.notify('users', this._state.users);
    return user;
  },
  logout() {
    this._state.currentUser = null;
    try { localStorage.removeItem(this.KEYS.USER); } catch(e) {}
    this.notify('user', null);
  },
  toggleTheme() {
    const next = this._state.theme === 'dark' ? 'light' : 'dark';
    this._state.theme = next;
    document.documentElement.setAttribute('data-theme', next);
    this.save(this.KEYS.THEME, next);
    this.notify('theme', next);
    return next;
  }
};

/* ==============================================================================
   3. DASHBOARD MODULE
   ============================================================================== */
const Dashboard = {
  init() {
    this.render();
    Store.subscribe((event) => {
      if (['tables', 'bookings', 'all'].includes(event)) this.render();
    });
  },

  render() {
    const today = getFormattedDate(0);
    const tables = Store.getTables();
    const bookings = Store.getBookings();

    const todayBookings = bookings.filter(b => b.date === today);
    const occupied = tables.filter(t => t.status === 'Occupied');
    const reserved = tables.filter(t => t.status === 'Reserved');
    const available = tables.filter(t => t.status === 'Available');

    // KPI Counters
    const bookingsCountEl = document.getElementById('dash-metric-bookings');
    if (bookingsCountEl) bookingsCountEl.textContent = todayBookings.length;

    const occupancyRate = tables.length > 0 ? Math.round(((occupied.length + reserved.length) / tables.length) * 100) : 0;
    const occupancyEl = document.getElementById('dash-metric-occupancy');
    if (occupancyEl) occupancyEl.textContent = `${occupancyRate}%`;

    const currentUser = Store.getCurrentUser();
    const isStaff = currentUser && currentUser.role === 'Staff';

    const revenue = todayBookings
      .filter(b => b.status !== 'Cancelled')
      .reduce((sum, b) => sum + (Number(b.estimatedRevenue) || 0), 0);
    const revenueEl = document.getElementById('dash-metric-revenue');
    if (revenueEl) {
      if (isStaff) {
        revenueEl.textContent = '🔒 Restricted';
        revenueEl.title = 'Financial analytics restricted for Staff';
      } else {
        revenueEl.textContent = formatINR(revenue);
        revenueEl.title = '';
      }
    }

    const availableEl = document.getElementById('dash-metric-available');
    if (availableEl) availableEl.textContent = `${available.length} / ${tables.length}`;

    // Update Role-Specific Dashboard Welcome Banner & Header Title
    const welcomeHeading = document.getElementById('dash-welcome-heading');
    const welcomeSub = document.getElementById('dash-welcome-sub');
    const welcomeBadge = document.getElementById('dash-welcome-badge');
    const welcomeAvatar = document.getElementById('dash-welcome-avatar');
    const headerTitle = document.getElementById('header-active-title');

    const role = currentUser ? currentUser.role : 'Admin';
    const name = currentUser ? currentUser.name : 'Aarav Choudhury';
    const avatar = (currentUser && currentUser.avatar) ? currentUser.avatar : (role === 'Admin' ? 'assets/avatar-aarav.jpg' : role === 'Manager' ? 'assets/avatar-sunil.jpg' : 'assets/avatar-deepika.jpg');

    if (welcomeHeading) {
      welcomeHeading.textContent = `Welcome to ${role} Dashboard`;
    }
    if (App.currentView === 'dashboard' && headerTitle) {
      headerTitle.textContent = `Welcome to ${role} Dashboard`;
    }
    if (welcomeBadge) {
      const icon = role === 'Admin' ? '👑' : role === 'Manager' ? '👔' : '🧑‍🍳';
      welcomeBadge.textContent = `${icon} ${role === 'Admin' ? 'Administrator' : role === 'Manager' ? 'Floor Manager' : 'Host / Staff'}`;
    }
    if (welcomeSub) {
      if (role === 'Admin') {
        welcomeSub.innerHTML = `Logged in as <strong>${name}</strong> (Administrator) • Full system privileges & revenue analytics active`;
      } else if (role === 'Manager') {
        welcomeSub.innerHTML = `Logged in as <strong>${name}</strong> (Manager) • Floor operations, reservations & shift performance active`;
      } else {
        welcomeSub.innerHTML = `Logged in as <strong>${name}</strong> (Staff) • Live table seating, guest reception & waitlist operational`;
      }
    }
    if (welcomeAvatar) {
      welcomeAvatar.src = avatar;
    }

    // Occupancy Progress Breakdown Bar
    this.renderOccupancyBar(tables);

    // Today's Timetable
    this.renderTodaySchedule(todayBookings);
  },

  renderOccupancyBar(tables) {
    const container = document.getElementById('dash-occupancy-breakdown');
    if (!container) return;

    const total = tables.length || 1;
    const counts = {
      Occupied: tables.filter(t => t.status === 'Occupied').length,
      Reserved: tables.filter(t => t.status === 'Reserved').length,
      Available: tables.filter(t => t.status === 'Available').length,
      Service: tables.filter(t => t.status === 'Out of Service').length
    };

    const occPct = Math.round((counts.Occupied / total) * 100);
    const resPct = Math.round((counts.Reserved / total) * 100);
    const avlPct = Math.round((counts.Available / total) * 100);
    const srvPct = Math.round((counts.Service / total) * 100);

    container.innerHTML = `
      <div style="margin-bottom: 1.25rem;">
        <div style="display: flex; height: 16px; border-radius: 8px; overflow: hidden; background-color: var(--border-color); gap: 2px;">
          <div style="width: ${occPct}%; background-color: var(--status-occupied);" title="Occupied: ${counts.Occupied}"></div>
          <div style="width: ${resPct}%; background-color: var(--status-reserved);" title="Reserved: ${counts.Reserved}"></div>
          <div style="width: ${avlPct}%; background-color: var(--status-available);" title="Available: ${counts.Available}"></div>
          <div style="width: ${srvPct}%; background-color: var(--status-service);" title="Out of Service: ${counts.Service}"></div>
        </div>
      </div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 0.75rem;">
        <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.6rem 0.85rem; background-color: var(--bg-app); border-radius: 8px;">
          <span style="font-size:0.8rem; font-weight:600; display:flex; align-items:center; gap:0.4rem;">
            <span style="width:8px; height:8px; border-radius:50%; background:var(--status-occupied);"></span> Occupied
          </span>
          <strong>${counts.Occupied} (${occPct}%)</strong>
        </div>
        <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.6rem 0.85rem; background-color: var(--bg-app); border-radius: 8px;">
          <span style="font-size:0.8rem; font-weight:600; display:flex; align-items:center; gap:0.4rem;">
            <span style="width:8px; height:8px; border-radius:50%; background:var(--status-reserved);"></span> Reserved
          </span>
          <strong>${counts.Reserved} (${resPct}%)</strong>
        </div>
        <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.6rem 0.85rem; background-color: var(--bg-app); border-radius: 8px;">
          <span style="font-size:0.8rem; font-weight:600; display:flex; align-items:center; gap:0.4rem;">
            <span style="width:8px; height:8px; border-radius:50%; background:var(--status-available);"></span> Available
          </span>
          <strong>${counts.Available} (${avlPct}%)</strong>
        </div>
        <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.6rem 0.85rem; background-color: var(--bg-app); border-radius: 8px;">
          <span style="font-size:0.8rem; font-weight:600; display:flex; align-items:center; gap:0.4rem;">
            <span style="width:8px; height:8px; border-radius:50%; background:var(--status-service);"></span> Service
          </span>
          <strong>${counts.Service} (${srvPct}%)</strong>
        </div>
      </div>
    `;
  },

  renderTodaySchedule(todayBookings) {
    const tbody = document.getElementById('dash-today-bookings-tbody');
    if (!tbody) return;

    if (todayBookings.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:2rem; color:var(--text-muted);">No reservations scheduled for today yet.</td></tr>`;
      return;
    }

    todayBookings.sort((a, b) => a.time.localeCompare(b.time));

    tbody.innerHTML = todayBookings.map(b => {
      const table = Store.getTableById(b.tableId);
      const tableName = table ? table.name : b.tableId;
      const statusBadge = App.getBookingBadge(b.status);
      const occasionBadge = b.occasion && b.occasion !== 'Casual Dining' ? 
        `<span class="badge badge-occasion">${b.occasion}</span>` : '<span style="color:var(--text-light); font-size:0.75rem;">Regular</span>';

      return `
        <tr>
          <td><strong style="color:var(--primary); font-size:0.92rem;">${b.time}</strong></td>
          <td>
            <div style="font-weight:700; color:var(--text-main);">${b.customerName}</div>
            <div style="font-size:0.75rem; color:var(--text-muted);">${b.customerPhone}</div>
          </td>
          <td>👥 <strong>${b.guestCount}</strong> guests</td>
          <td>
            <strong>${tableName}</strong>
            <div style="font-size:0.74rem; color:var(--text-muted);">${table ? table.section : ''}</div>
          </td>
          <td>${occasionBadge}</td>
          <td>${statusBadge}</td>
          <td>
            <div class="action-btn-group">
              ${b.status !== 'Seated' ? `
                <button class="btn btn-sm btn-secondary" onclick="Dashboard.seatParty('${b.id}')">Seat</button>
              ` : `
                <button class="btn btn-sm btn-outline" onclick="Dashboard.completeDining('${b.id}')">Done</button>
              `}
              <button class="action-btn" onclick="Bookings.openEditModal('${b.id}')" title="Edit Booking">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
              </button>
              <button class="action-btn" onclick="Confirmations.previewSlip('${b.id}')" title="View Confirmation Slip">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  },

  seatParty(bookingId) {
    Store.updateBookingStatus(bookingId, 'Seated');
    App.showToast('Party Seated', 'Table status marked as Occupied.', 'success');
  },

  completeDining(bookingId) {
    const booking = Store.getBookingById(bookingId);
    if (booking) {
      Store.updateBookingStatus(bookingId, 'Confirmed');
      Store.setTableStatus(booking.tableId, 'Available');
      App.showToast('Dining Completed', `Table ${booking.tableId} is now cleaned and Available.`, 'success');
    }
  }
};

/* ==============================================================================
   4. TABLE MANAGEMENT MODULE (CRUD)
   ============================================================================== */
const Tables = {
  filter: { section: 'All', status: 'All', type: 'All', search: '' },

  init() {
    this.bindEvents();
    this.render();
    Store.subscribe((event) => {
      if (['tables', 'all'].includes(event)) this.render();
    });
  },

  bindEvents() {
    const search = document.getElementById('table-search-input');
    if (search) search.addEventListener('input', (e) => { this.filter.search = e.target.value.toLowerCase(); this.render(); });

    const sec = document.getElementById('table-filter-section');
    if (sec) sec.addEventListener('change', (e) => { this.filter.section = e.target.value; this.render(); });

    const sts = document.getElementById('table-filter-status');
    if (sts) sts.addEventListener('change', (e) => { this.filter.status = e.target.value; this.render(); });

    const typ = document.getElementById('table-filter-type');
    if (typ) typ.addEventListener('change', (e) => { this.filter.type = e.target.value; this.render(); });

    const form = document.getElementById('table-form');
    if (form) form.addEventListener('submit', (e) => { e.preventDefault(); this.handleSubmit(); });
  },

  render() {
    const tbody = document.getElementById('tables-tbody');
    if (!tbody) return;

    const user = Store.getCurrentUser();
    const isStaff = user && user.role === 'Staff';
    const isAdmin = user && user.role === 'Admin';

    // Toggle restriction banner & add button for Staff
    const restrictedNotice = document.getElementById('tables-restricted-notice');
    const btnAddTable = document.getElementById('btn-add-table-mgmt');
    if (restrictedNotice) restrictedNotice.style.display = isStaff ? 'block' : 'none';
    if (btnAddTable) btnAddTable.style.display = isStaff ? 'none' : 'inline-flex';

    let list = Store.getTables();
    if (this.filter.section !== 'All') list = list.filter(t => t.section === this.filter.section);
    if (this.filter.status !== 'All') list = list.filter(t => t.status === this.filter.status);
    if (this.filter.type !== 'All') list = list.filter(t => t.type === this.filter.type);
    if (this.filter.search) {
      list = list.filter(t => t.name.toLowerCase().includes(this.filter.search) || t.id.toLowerCase().includes(this.filter.search));
    }

    const badge = document.getElementById('tables-count-badge');
    if (badge) badge.textContent = `${list.length} tables`;

    if (list.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:2rem; color:var(--text-muted);">No tables match filter.</td></tr>`;
      return;
    }

    tbody.innerHTML = list.map(t => {
      return `
        <tr>
          <td>
            <div style="display:flex; align-items:center; gap:0.6rem;">
              <span style="font-weight:700; color:var(--primary); font-size:0.85rem; padding:0.2rem 0.5rem; background:var(--primary-light); border-radius:6px;">${t.id}</span>
              <strong style="color:var(--text-main); font-size:0.92rem;">${t.name}</strong>
            </div>
          </td>
          <td>👥 <strong>${t.capacity}</strong> Guests</td>
          <td><span style="padding:0.2rem 0.55rem; background-color:var(--bg-hover); border-radius:6px; font-size:0.8rem;">${t.type}</span></td>
          <td><strong>${t.section}</strong></td>
          <td>
            <select class="select-custom" style="padding:0.25rem 1.6rem 0.25rem 0.5rem; font-size:0.78rem;" 
              onchange="Tables.changeStatus('${t.id}', this.value)">
              <option value="Available" ${t.status === 'Available' ? 'selected' : ''}>🟢 Available</option>
              <option value="Reserved" ${t.status === 'Reserved' ? 'selected' : ''}>🟡 Reserved</option>
              <option value="Occupied" ${t.status === 'Occupied' ? 'selected' : ''}>🔴 Occupied</option>
              <option value="Out of Service" ${t.status === 'Out of Service' ? 'selected' : ''}>⚪ Out of Service</option>
            </select>
          </td>
          <td>
            <div class="action-btn-group">
              ${!isStaff ? `
                <button class="action-btn" onclick="Tables.openEditModal('${t.id}')" title="Edit Table Details">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                </button>
              ` : ''}
              ${isAdmin ? `
                <button class="action-btn btn-delete" onclick="Tables.deleteTable('${t.id}')" title="Delete Table (Admin Only)">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                </button>
              ` : ''}
              ${isStaff ? `<span style="font-size:0.75rem; color:var(--text-muted); font-style:italic;">Read-Only</span>` : ''}
            </div>
          </td>
        </tr>
      `;
    }).join('');
  },

  changeStatus(id, status) {
    Store.setTableStatus(id, status);
    App.showToast('Table Updated', `Table ${id} is now ${status}.`, 'success');
  },

  openAddModal() {
    const user = Store.getCurrentUser();
    if (user && user.role === 'Staff') {
      App.showToast('Permission Denied', 'Staff accounts cannot configure restaurant tables. Administrator role required.', 'warning');
      return;
    }
    const form = document.getElementById('table-form');
    if (!form) return;
    form.reset();
    document.getElementById('table-form-id').value = '';
    document.getElementById('table-modal-title').textContent = 'Add New Restaurant Table';
    App.openModal('table-modal');
  },

  openEditModal(id) {
    const user = Store.getCurrentUser();
    if (user && user.role === 'Staff') {
      App.showToast('Permission Denied', 'Staff accounts cannot edit table configuration.', 'warning');
      return;
    }
    const table = Store.getTableById(id);
    if (!table) return;
    document.getElementById('table-modal-title').textContent = `Edit Table: ${table.name}`;
    document.getElementById('table-form-id').value = table.id;
    document.getElementById('table-form-name').value = table.name;
    document.getElementById('table-form-capacity').value = table.capacity;
    document.getElementById('table-form-type').value = table.type;
    document.getElementById('table-form-section').value = table.section;
    document.getElementById('table-form-status').value = table.status;
    App.openModal('table-modal');
  },

  handleSubmit() {
    const user = Store.getCurrentUser();
    if (user && user.role === 'Staff') {
      App.showToast('Permission Denied', 'Staff accounts cannot save table configuration.', 'danger');
      return;
    }
    const id = document.getElementById('table-form-id').value;
    const name = document.getElementById('table-form-name').value.trim();
    const capacity = parseInt(document.getElementById('table-form-capacity').value, 10);
    const type = document.getElementById('table-form-type').value;
    const section = document.getElementById('table-form-section').value;
    const status = document.getElementById('table-form-status').value;

    if (!name || isNaN(capacity)) {
      App.showToast('Validation Failed', 'Please provide a valid table name and capacity.', 'warning');
      return;
    }

    Store.saveTable({ id: id || undefined, name, capacity, type, section, status });
    App.closeModal('table-modal');
    App.showToast('Saved', `Table ${name} saved successfully.`, 'success');
  },

  deleteTable(id) {
    const user = Store.getCurrentUser();
    if (user && user.role !== 'Admin') {
      App.showToast('Admin Required', 'Only Administrator can permanently delete restaurant tables.', 'danger');
      return;
    }
    if (confirm(`Are you sure you want to remove table ${id}?`)) {
      Store.deleteTable(id);
      App.showToast('Deleted', `Table ${id} removed.`, 'danger');
    }
  }
};

/* ==============================================================================
   5. BOOKING MANAGEMENT MODULE (CRUD)
   ============================================================================== */
const Bookings = {
  filter: { status: 'All', dateScope: 'All', search: '' },

  init() {
    this.bindEvents();
    this.populateTableSelect();
    this.render();

    Store.subscribe((event) => {
      if (['bookings', 'tables', 'all'].includes(event)) {
        this.populateTableSelect();
        this.render();
      }
    });
  },

  bindEvents() {
    const search = document.getElementById('booking-search-input');
    if (search) search.addEventListener('input', (e) => { this.filter.search = e.target.value.toLowerCase(); this.render(); });

    const sts = document.getElementById('booking-filter-status');
    if (sts) sts.addEventListener('change', (e) => { this.filter.status = e.target.value; this.render(); });

    const dt = document.getElementById('booking-filter-datescope');
    if (dt) dt.addEventListener('change', (e) => { this.filter.dateScope = e.target.value; this.render(); });

    const form = document.getElementById('booking-form');
    if (form) form.addEventListener('submit', (e) => { e.preventDefault(); this.handleSubmit(); });

    const guests = document.getElementById('booking-form-guests');
    if (guests) guests.addEventListener('input', (e) => this.populateTableSelect(parseInt(e.target.value, 10) || 1));
  },

  populateTableSelect(minCapacity = 1) {
    const select = document.getElementById('booking-form-table');
    if (!select) return;
    const tables = Store.getTables();
    const current = select.value;

    select.innerHTML = '<option value="">-- Choose Dining Table --</option>' + tables.map(t => {
      return `<option value="${t.id}" ${t.id === current ? 'selected' : ''}>${t.name} (${t.capacity} seats, ${t.section}) - ${t.status}</option>`;
    }).join('');
  },

  render() {
    const tbody = document.getElementById('bookings-tbody');
    if (!tbody) return;

    let list = Store.getBookings();
    const today = getFormattedDate(0);
    const tomorrow = getFormattedDate(1);

    if (this.filter.status !== 'All') list = list.filter(b => b.status === this.filter.status);
    if (this.filter.dateScope === 'Today') list = list.filter(b => b.date === today);
    else if (this.filter.dateScope === 'Tomorrow') list = list.filter(b => b.date === tomorrow);
    else if (this.filter.dateScope === 'Upcoming') list = list.filter(b => b.date >= today);
    else if (this.filter.dateScope === 'Past') list = list.filter(b => b.date < today);

    if (this.filter.search) {
      list = list.filter(b => b.customerName.toLowerCase().includes(this.filter.search) || b.customerPhone.includes(this.filter.search) || b.id.toLowerCase().includes(this.filter.search));
    }

    const badge = document.getElementById('bookings-count-badge');
    if (badge) badge.textContent = `${list.length} reservations`;

    if (list.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:2rem; color:var(--text-muted);">No reservations found matching filters.</td></tr>`;
      return;
    }

    list.sort((a, b) => `${b.date} ${b.time}`.localeCompare(`${a.date} ${a.time}`));

    tbody.innerHTML = list.map(b => {
      const table = Store.getTableById(b.tableId);
      const tableName = table ? table.name : b.tableId;
      const statusBadge = App.getBookingBadge(b.status);
      const occasionBadge = b.occasion && b.occasion !== 'Casual Dining' ? `<span class="badge badge-occasion">${b.occasion}</span>` : '<span style="color:var(--text-light); font-size:0.75rem;">Casual</span>';

      return `
        <tr>
          <td>
            <div style="font-weight:700; color:var(--primary); font-size:0.85rem;">${b.id}</div>
            <div style="font-size:0.75rem; color:var(--text-muted);">${b.date} • ${b.time}</div>
          </td>
          <td>
            <div style="font-weight:700; color:var(--text-main);">${b.customerName}</div>
            <div style="font-size:0.75rem; color:var(--text-muted);">${b.customerPhone}</div>
          </td>
          <td>👥 <strong>${b.guestCount}</strong> guests</td>
          <td>
            <strong>${tableName}</strong>
            <div style="font-size:0.74rem; color:var(--text-muted);">${table ? table.section : ''}</div>
          </td>
          <td>
            ${occasionBadge}
            ${b.specialRequests ? `<div style="font-size:0.72rem; color:var(--text-muted); margin-top:2px; max-width:140px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;" title="${b.specialRequests}">📝 ${b.specialRequests}</div>` : ''}
          </td>
          <td>
            <select class="select-custom" style="padding:0.25rem 1.6rem 0.25rem 0.5rem; font-size:0.78rem;" 
              onchange="Bookings.changeStatus('${b.id}', this.value)">
              <option value="Pending" ${b.status === 'Pending' ? 'selected' : ''}>📝 Pending</option>
              <option value="Confirmed" ${b.status === 'Confirmed' ? 'selected' : ''}>✅ Confirmed</option>
              <option value="Seated" ${b.status === 'Seated' ? 'selected' : ''}>🔄 Seated</option>
              <option value="Cancelled" ${b.status === 'Cancelled' ? 'selected' : ''}>❌ Cancelled</option>
              <option value="No-Show" ${b.status === 'No-Show' ? 'selected' : ''}>📌 No-Show</option>
            </select>
          </td>
          <td>
            <div class="action-btn-group">
              <button class="action-btn" onclick="Bookings.openEditModal('${b.id}')" title="Edit Booking">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
              </button>
              <button class="action-btn" onclick="Confirmations.previewSlip('${b.id}')" title="Automated Confirmation Slip">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              </button>
              <button class="action-btn btn-delete" onclick="Bookings.deleteBooking('${b.id}')" title="Cancel & Delete">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  },

  changeStatus(id, status) {
    Store.updateBookingStatus(id, status);
    App.showToast('Status Updated', `Booking ${id} set to ${status}.`, 'info');
  },

  openAddModal(prefills = {}) {
    const form = document.getElementById('booking-form');
    if (!form) return;
    form.reset();

    document.getElementById('booking-form-id').value = '';
    document.getElementById('booking-modal-title').textContent = 'Create New Table Reservation';

    document.getElementById('booking-form-date').value = prefills.date || getFormattedDate(0);
    document.getElementById('booking-form-time').value = prefills.time || '19:30';
    document.getElementById('booking-form-guests').value = prefills.guests || 2;
    document.getElementById('booking-form-status').value = prefills.status || 'Confirmed';
    document.getElementById('booking-form-occasion').value = prefills.occasion || 'Casual Dining';

    this.populateTableSelect(prefills.guests || 2);
    if (prefills.tableId) document.getElementById('booking-form-table').value = prefills.tableId;

    App.openModal('booking-modal');
  },

  openEditModal(id) {
    const b = Store.getBookingById(id);
    if (!b) return;

    document.getElementById('booking-modal-title').textContent = `Edit Reservation: ${b.id}`;
    document.getElementById('booking-form-id').value = b.id;
    document.getElementById('booking-form-name').value = b.customerName;
    document.getElementById('booking-form-phone').value = b.customerPhone;
    document.getElementById('booking-form-email').value = b.customerEmail || '';
    document.getElementById('booking-form-guests').value = b.guestCount;
    document.getElementById('booking-form-date').value = b.date;
    document.getElementById('booking-form-time').value = b.time;
    document.getElementById('booking-form-status').value = b.status;
    document.getElementById('booking-form-occasion').value = b.occasion || 'Casual Dining';
    document.getElementById('booking-form-requests').value = b.specialRequests || '';

    this.populateTableSelect(b.guestCount);
    document.getElementById('booking-form-table').value = b.tableId;

    App.openModal('booking-modal');
  },

  handleSubmit() {
    const id = document.getElementById('booking-form-id').value;
    const customerName = document.getElementById('booking-form-name').value.trim();
    const customerPhone = document.getElementById('booking-form-phone').value.trim();
    const customerEmail = document.getElementById('booking-form-email').value.trim();
    const guestCount = parseInt(document.getElementById('booking-form-guests').value, 10);
    const date = document.getElementById('booking-form-date').value;
    const time = document.getElementById('booking-form-time').value;
    const tableId = document.getElementById('booking-form-table').value;
    const status = document.getElementById('booking-form-status').value;
    const occasion = document.getElementById('booking-form-occasion').value;
    const specialRequests = document.getElementById('booking-form-requests').value.trim();

    if (!customerName || !customerPhone || !date || !time || !tableId) {
      App.showToast('Validation Error', 'Please complete all required fields.', 'warning');
      return;
    }

    const saved = Store.saveBooking({
      id: id || undefined,
      customerName,
      customerPhone,
      customerEmail: customerEmail || `${customerName.toLowerCase().replace(/[^a-z]/g, '')}@guest.in`,
      guestCount,
      date,
      time,
      tableId,
      status,
      occasion,
      specialRequests,
      estimatedRevenue: guestCount * 1850
    });

    App.closeModal('booking-modal');
    App.showToast('Reservation Saved', `Confirmed for ${customerName} at ${tableId}.`, 'success');

    setTimeout(() => Confirmations.previewSlip(saved.id), 400);
  },

  deleteBooking(id) {
    if (confirm(`Cancel and remove reservation ${id}?`)) {
      Store.deleteBooking(id);
      App.showToast('Cancelled', `Reservation ${id} deleted.`, 'danger');
    }
  }
};

/* ==============================================================================
   6. TABLE LAYOUT (FLOOR PLAN) VISUALIZATION (Matching Reference Screenshot)
   ============================================================================== */
const Floorplan = {
  currentZone: 'All',

  init() {
    this.bindEvents();
    this.render();
    Store.subscribe((event) => {
      if (['tables', 'bookings', 'all'].includes(event)) this.render();
    });
  },

  bindEvents() {
    const buttons = document.querySelectorAll('.zone-tab-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentZone = btn.dataset.zone;
        this.render();
      });
    });
  },

  render() {
    const grid = document.getElementById('floorplan-grid');
    if (!grid) return;

    let tables = Store.getTables();
    if (this.currentZone !== 'All') tables = tables.filter(t => t.section === this.currentZone);

    const today = getFormattedDate(0);
    const bookings = Store.getBookings();

    grid.innerHTML = tables.map(t => {
      const active = bookings.find(b => b.tableId === t.id && b.date === today && ['Seated', 'Confirmed', 'Reserved'].includes(b.status));
      const statusClass = `status-${t.status.toLowerCase().replace(/\s+/g, '')}`;
      const isVIP = t.type.includes('VIP') || t.section === 'VIP Lounge';
      const shapeClass = isVIP ? 'shape-vip' : (t.type.includes('2-Seater') ? 'shape-round' : 'shape-rect');

      let occupant = 'Available for seating';
      if (t.status === 'Occupied') {
        occupant = active ? `Seated: ${active.customerName}` : 'Seated Party';
      } else if (t.status === 'Reserved') {
        occupant = active ? `Resv: ${active.time} - ${active.customerName}` : 'Reserved Today';
      } else if (t.status === 'Out of Service') {
        occupant = 'Maintenance';
      }

      // 2-digit plate number as in the image: "01", "02", "03", ..., "16"
      const plateDisplay = t.plateNumber || String(t.id.replace('T-', '')).padStart(2, '0');
      const sectionLabel = t.displaySection || t.section;

      // Chair tabs according to capacity
      let seatsHtml = '';
      if (t.capacity === 2) {
        seatsHtml = `<span class="seat-tab seat-left"></span><span class="seat-tab seat-right"></span>`;
      } else if (t.capacity === 4) {
        seatsHtml = `
          <span class="seat-tab seat-top"></span>
          <span class="seat-tab seat-bottom"></span>
          <span class="seat-tab seat-left"></span>
          <span class="seat-tab seat-right"></span>
        `;
      } else if (t.capacity === 6) {
        seatsHtml = `
          <span class="seat-tab seat-top-1"></span>
          <span class="seat-tab seat-top-2"></span>
          <span class="seat-tab seat-bottom-1"></span>
          <span class="seat-tab seat-bottom-2"></span>
          <span class="seat-tab seat-left"></span>
          <span class="seat-tab seat-right"></span>
        `;
      } else { // 8 seats
        seatsHtml = `
          <span class="seat-tab seat-top-8-1"></span>
          <span class="seat-tab seat-top-8-2"></span>
          <span class="seat-tab seat-top-8-3"></span>
          <span class="seat-tab seat-bottom-8-1"></span>
          <span class="seat-tab seat-bottom-8-2"></span>
          <span class="seat-tab seat-bottom-8-3"></span>
          <span class="seat-tab seat-left"></span>
          <span class="seat-tab seat-right"></span>
        `;
      }

      return `
        <div class="table-node ${statusClass}" onclick="Floorplan.inspectTable('${t.id}')">
          <div class="table-node-name">${t.name}</div>
          <div class="table-node-capacity">👥 ${t.capacity} Seats • ${sectionLabel}</div>

          <div class="table-shape-wrapper ${shapeClass}">
            ${seatsHtml}
            <div class="table-visual-plate">${plateDisplay}</div>
          </div>

          <div class="table-occupant-pill" title="${occupant}">${occupant}</div>
        </div>
      `;
    }).join('');
  },

  inspectTable(tableId) {
    const table = Store.getTableById(tableId);
    if (!table) return;

    const today = getFormattedDate(0);
    const active = Store.getBookings().find(b => b.tableId === table.id && b.date === today && ['Seated', 'Confirmed', 'Reserved'].includes(b.status));

    document.getElementById('inspector-table-title').textContent = `${table.name} (${table.section}) — Status Inspector`;
    const body = document.getElementById('inspector-table-body');
    const footer = document.getElementById('inspector-table-footer');

    body.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-light); padding-bottom:1rem; margin-bottom:1.25rem;">
        <div>
          <span style="font-size:0.75rem; color:var(--text-muted); font-weight:700;">CURRENT TABLE STATUS</span>
          <div style="margin-top:0.3rem;">${App.getTableBadge(table.status)}</div>
        </div>
        <div style="text-align:right;">
          <span style="font-size:0.75rem; color:var(--text-muted); font-weight:700;">CONFIGURATION</span>
          <div style="font-weight:700; color:var(--text-main); margin-top:0.3rem;">${table.type} (${table.capacity} Max Guests)</div>
        </div>
      </div>

      ${active ? `
        <div style="background-color:var(--primary-subtle); border:1px solid var(--primary-border); border-radius:8px; padding:1.25rem; margin-bottom:1.25rem;">
          <div style="display:flex; justify-content:space-between; margin-bottom:0.4rem;">
            <span style="font-size:0.75rem; font-weight:700; color:var(--primary-dark);">CURRENT DINING DETAILS</span>
            <span class="badge ${active.status === 'Seated' ? 'badge-status-seated' : 'badge-status-confirmed'}">${active.status}</span>
          </div>
          <h4 style="font-size:1.15rem; font-weight:700; color:var(--text-main);">${active.customerName}</h4>
          <div style="font-size:0.82rem; color:var(--text-muted); margin:0.3rem 0;">📞 ${active.customerPhone} • 🕒 ${active.time} • 👥 ${active.guestCount} guests</div>
          ${active.occasion ? `<div style="font-size:0.8rem; margin-top:0.4rem;"><strong>Occasion:</strong> <span class="badge badge-occasion">${active.occasion}</span></div>` : ''}
          ${active.specialRequests ? `<div style="font-size:0.78rem; background:var(--bg-card); padding:0.5rem; border-radius:6px; margin-top:0.5rem;"><strong>Notes:</strong> ${active.specialRequests}</div>` : ''}
        </div>
      ` : `
        <div style="text-align:center; padding:1.5rem; background:var(--bg-app); border-radius:8px; margin-bottom:1.25rem; color:var(--text-muted);">
          No active diners currently assigned to this table.
        </div>
      `}

      <div class="form-group">
        <label>Quick Set Operational Status:</label>
        <select id="inspector-status-select" class="select-custom">
          <option value="Available" ${table.status === 'Available' ? 'selected' : ''}>🟢 Available</option>
          <option value="Reserved" ${table.status === 'Reserved' ? 'selected' : ''}>🟡 Reserved</option>
          <option value="Occupied" ${table.status === 'Occupied' ? 'selected' : ''}>🔴 Occupied</option>
          <option value="Out of Service" ${table.status === 'Out of Service' ? 'selected' : ''}>⚪ Out of Service</option>
        </select>
      </div>
    `;

    footer.innerHTML = `
      <button class="btn btn-outline modal-close-btn" onclick="App.closeModal('inspector-modal')">Close</button>
      ${table.status === 'Occupied' ? `
        <button class="btn btn-success" onclick="Floorplan.clearTable('${table.id}')">✓ Clear & Free Table</button>
      ` : table.status === 'Available' ? `
        <button class="btn btn-primary" onclick="Floorplan.seatWalkIn('${table.id}')">+ Seat Walk-In Guest</button>
      ` : ''}
      <button class="btn btn-secondary" onclick="Floorplan.saveStatus('${table.id}')">Save Status</button>
    `;

    App.openModal('inspector-modal');
  },

  saveStatus(tableId) {
    const sel = document.getElementById('inspector-status-select');
    if (sel) {
      Store.setTableStatus(tableId, sel.value);
      App.closeModal('inspector-modal');
      App.showToast('Updated', `Table ${tableId} set to ${sel.value}.`, 'success');
    }
  },

  clearTable(tableId) {
    const today = getFormattedDate(0);
    const active = Store.getBookings().find(b => b.tableId === tableId && b.date === today && b.status === 'Seated');
    if (active) Store.updateBookingStatus(active.id, 'Confirmed');
    Store.setTableStatus(tableId, 'Available');
    App.closeModal('inspector-modal');
    App.showToast('Table Cleared', `Table ${tableId} is sanitized and marked Available.`, 'success');
  },

  seatWalkIn(tableId) {
    App.closeModal('inspector-modal');
    const table = Store.getTableById(tableId);
    Bookings.openAddModal({
      tableId,
      guests: table ? table.capacity : 2,
      status: 'Seated',
      occasion: 'Walk-In Dining'
    });
  }
};

/* ==============================================================================
   7. REAL-TIME AVAILABILITY ENGINE
   ============================================================================== */
const Availability = {
  init() {
    this.bindEvents();
    const dateInput = document.getElementById('avail-date');
    if (dateInput) dateInput.value = getFormattedDate(0);
    this.runSearch();
  },

  bindEvents() {
    const form = document.getElementById('availability-search-form');
    if (form) form.addEventListener('submit', (e) => { e.preventDefault(); this.runSearch(); });

    document.querySelectorAll('.quick-slot-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.quick-slot-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById('avail-time').value = btn.dataset.time;
        this.runSearch();
      });
    });
  },

  runSearch() {
    const date = document.getElementById('avail-date').value || getFormattedDate(0);
    const time = document.getElementById('avail-time').value || '19:30';
    const guests = parseInt(document.getElementById('avail-guests').value, 10) || 2;
    const section = document.getElementById('avail-section').value || 'All';

    const container = document.getElementById('availability-results-grid');
    if (!container) return;

    let tables = Store.getTables();
    if (section !== 'All') tables = tables.filter(t => t.section === section);

    const candidates = tables.filter(t => t.capacity >= guests && t.status !== 'Out of Service');

    const reqMins = this.toMinutes(time);
    const bookings = Store.getBookings().filter(b => b.date === date && b.status !== 'Cancelled');

    const available = [];
    const busy = [];

    candidates.forEach(table => {
      const conflict = bookings.find(b => b.tableId === table.id && Math.abs(this.toMinutes(b.time) - reqMins) < 105);
      if (conflict) busy.push({ table, conflict });
      else available.push(table);
    });

    const badge = document.getElementById('avail-summary-badge');
    if (badge) badge.textContent = `${available.length} tables available on ${date} at ${time} for ${guests} guests`;

    if (available.length === 0 && busy.length === 0) {
      container.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding:3rem; background:var(--bg-card); border-radius:12px;">No tables match your capacity requirements in this section.</div>`;
      return;
    }

    container.innerHTML = `
      ${available.map(t => `
        <div class="content-card" style="border: 2px solid var(--status-available-border); background: linear-gradient(180deg, var(--bg-card) 60%, var(--status-available-bg) 100%);">
          <div style="display:flex; justify-content:space-between; align-items:flex-start;">
            <div>
              <span class="badge badge-available">🟢 Available</span>
              <h3 style="margin-top:0.4rem; font-size:1.2rem;">${t.name}</h3>
              <p style="font-size:0.8rem; color:var(--text-muted);">${t.section} • ${t.type}</p>
            </div>
            <div style="text-align:right;">
              <span style="font-size:1.15rem; font-weight:800; color:var(--primary);">👥 ${t.capacity}</span>
              <div style="font-size:0.7rem; color:var(--text-muted);">Max Guests</div>
            </div>
          </div>
          <div style="margin-top:1rem; padding-top:0.75rem; border-top:1px solid var(--border-light); display:flex; justify-content:space-between; align-items:center;">
            <span style="font-size:0.8rem; font-weight:600; color:var(--text-muted);">Slot: ${time}</span>
            <button class="btn btn-sm btn-primary" onclick="Availability.book('${t.id}', '${date}', '${time}', ${guests})">
              Instant Reserve →
            </button>
          </div>
        </div>
      `).join('')}

      ${busy.map(({ table, conflict }) => `
        <div class="content-card" style="border: 1px solid var(--border-light); opacity: 0.75;">
          <div style="display:flex; justify-content:space-between;">
            <div>
              <span class="badge badge-reserved">🟡 Busy at ${conflict.time}</span>
              <h3 style="margin-top:0.4rem; font-size:1.2rem;">${table.name}</h3>
              <p style="font-size:0.8rem; color:var(--text-muted);">${table.section}</p>
            </div>
            <span style="font-weight:700; color:var(--text-muted);">👥 ${table.capacity}</span>
          </div>
          <div style="margin-top:0.85rem; font-size:0.78rem; color:var(--text-muted);">
            Booked by ${conflict.customerName} (${conflict.guestCount} guests)
          </div>
        </div>
      `).join('')}
    `;
  },

  toMinutes(timeStr) {
    const [h, m] = timeStr.split(':').map(Number);
    return (h * 60) + (m || 0);
  },

  book(tableId, date, time, guests) {
    Bookings.openAddModal({ tableId, date, time, guests, status: 'Confirmed' });
  }
};

/* ==============================================================================
   8. BOOKING CALENDAR MODULE
   ============================================================================== */
const Calendar = {
  date: new Date(),

  init() {
    this.bindEvents();
    this.render();
    Store.subscribe((event) => {
      if (['bookings', 'all'].includes(event)) this.render();
    });
  },

  bindEvents() {
    const prev = document.getElementById('cal-prev-btn');
    if (prev) prev.addEventListener('click', () => { this.date.setMonth(this.date.getMonth() - 1); this.render(); });

    const next = document.getElementById('cal-next-btn');
    if (next) next.addEventListener('click', () => { this.date.setMonth(this.date.getMonth() + 1); this.render(); });

    const today = document.getElementById('cal-today-btn');
    if (today) today.addEventListener('click', () => { this.date = new Date(); this.render(); });
  },

  render() {
    const title = document.getElementById('calendar-month-title');
    const grid = document.getElementById('calendar-days-grid');
    if (!grid) return;

    const y = this.date.getFullYear();
    const m = this.date.getMonth();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    if (title) title.textContent = `${months[m]} ${y}`;

    const firstDay = new Date(y, m, 1).getDay();
    const daysInMonth = new Date(y, m + 1, 0).getDate();
    const prevDays = new Date(y, m, 0).getDate();

    const todayStr = getFormattedDate(0);
    const bookings = Store.getBookings();

    let html = '';

    for (let i = firstDay - 1; i >= 0; i--) {
      html += `<div class="calendar-day-cell other-month"><div class="day-header"><span class="day-number">${prevDays - i}</span></div></div>`;
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${y}-${String(m + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const isToday = dateStr === todayStr;
      const dayBookings = bookings.filter(b => b.date === dateStr);

      html += `
        <div class="calendar-day-cell ${isToday ? 'today' : ''}" onclick="Calendar.handleDay('${dateStr}')">
          <div class="day-header">
            <span class="day-number">${day}</span>
            ${dayBookings.length > 0 ? `<span class="day-bookings-count">${dayBookings.length} resv</span>` : ''}
          </div>
          <div class="day-events-list">
            ${dayBookings.slice(0, 3).map(b => `
              <div class="calendar-booking-pill pill-${b.status.toLowerCase()}" onclick="event.stopPropagation(); Bookings.openEditModal('${b.id}')">
                <span>${b.time}</span>
                <span>${b.customerName}</span>
              </div>
            `).join('')}
            ${dayBookings.length > 3 ? `<div style="font-size:0.68rem; color:var(--primary); font-weight:700;">+${dayBookings.length - 3} more</div>` : ''}
          </div>
        </div>
      `;
    }

    const total = firstDay + daysInMonth;
    const remaining = (7 - (total % 7)) % 7;
    for (let j = 1; j <= remaining; j++) {
      html += `<div class="calendar-day-cell other-month"><div class="day-header"><span class="day-number">${j}</span></div></div>`;
    }

    grid.innerHTML = html;
  },

  handleDay(dateStr) {
    Bookings.openAddModal({ date: dateStr, time: '19:30', guests: 2 });
  }
};

/* ==============================================================================
   9. CUSTOMER MANAGEMENT MODULE
   ============================================================================== */
const Customers = {
  search: '',

  init() {
    this.bindEvents();
    this.render();
    Store.subscribe((event) => {
      if (['customers', 'all'].includes(event)) this.render();
    });
  },

  bindEvents() {
    const searchInput = document.getElementById('customer-search-input');
    if (searchInput) searchInput.addEventListener('input', (e) => { this.search = e.target.value.toLowerCase(); this.render(); });

    const form = document.getElementById('customer-form');
    if (form) form.addEventListener('submit', (e) => { e.preventDefault(); this.handleSubmit(); });
  },

  render() {
    const tbody = document.getElementById('customers-tbody');
    if (!tbody) return;

    let list = Store.getCustomers();
    if (this.search) {
      list = list.filter(c => c.name.toLowerCase().includes(this.search) || c.phone.includes(this.search) || c.email.toLowerCase().includes(this.search));
    }

    const badge = document.getElementById('customers-count-badge');
    if (badge) badge.textContent = `${list.length} patrons`;

    if (list.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:2rem; color:var(--text-muted);">No customer records found.</td></tr>`;
      return;
    }

    tbody.innerHTML = list.map(c => {
      return `
        <tr>
          <td>
            <div style="display:flex; align-items:center; gap:0.75rem;">
              <div style="width:36px; height:36px; border-radius:50%; background:var(--primary-light); color:var(--primary-dark); display:flex; align-items:center; justify-content:center; font-weight:700;">
                ${c.name.charAt(0)}
              </div>
              <div>
                <div style="font-weight:700; color:var(--text-main); display:flex; align-items:center; gap:0.4rem;">
                  ${c.name}
                  ${c.isVip ? '<span class="badge badge-vip">VIP</span>' : ''}
                </div>
                <div style="font-size:0.74rem; color:var(--text-muted);">${c.id}</div>
              </div>
            </div>
          </td>
          <td>
            <div>${c.phone}</div>
            <div style="font-size:0.74rem; color:var(--text-muted);">${c.email}</div>
          </td>
          <td><strong style="color:var(--primary);">${c.totalVisits || 1}</strong> visits</td>
          <td><strong>${formatINR(c.totalSpent)}</strong></td>
          <td><span class="badge badge-dietary">${c.dietary || 'None'}</span></td>
          <td><span style="font-size:0.8rem; color:var(--text-muted); max-width:180px; display:inline-block; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" title="${c.preferences}">${c.preferences || 'Standard'}</span></td>
          <td>
            <div class="action-btn-group">
              <button class="action-btn" onclick="Customers.viewHistory('${c.id}')" title="View Booking History">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              </button>
              <button class="action-btn" onclick="Customers.openEditModal('${c.id}')" title="Edit Profile">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
              </button>
              <button class="action-btn btn-delete" onclick="Customers.deleteCustomer('${c.id}')" title="Delete Profile">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  },

  viewHistory(id) {
    const c = Store.getCustomerById(id);
    if (!c) return;

    const history = Store.getBookings().filter(b => b.customerPhone === c.phone || (b.customerEmail && b.customerEmail.toLowerCase() === c.email.toLowerCase()));

    document.getElementById('history-modal-title').textContent = `${c.name} — Profile & Reservations`;
    document.getElementById('history-modal-body').innerHTML = `
      <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:1rem; background:var(--bg-app); padding:1rem; border-radius:8px; margin-bottom:1.5rem;">
        <div>
          <span style="font-size:0.75rem; color:var(--text-muted);">TOTAL VISITS</span>
          <div style="font-size:1.35rem; font-weight:800; color:var(--primary);">${c.totalVisits || 1}</div>
        </div>
        <div>
          <span style="font-size:0.75rem; color:var(--text-muted);">LIFETIME SPEND</span>
          <div style="font-size:1.35rem; font-weight:800; color:var(--text-main);">${formatINR(c.totalSpent)}</div>
        </div>
        <div>
          <span style="font-size:0.75rem; color:var(--text-muted);">TIER STATUS</span>
          <div style="margin-top:0.25rem;">${c.isVip ? '<span class="badge badge-vip">VIP MEMBER</span>' : '<span style="color:var(--text-muted); font-size:0.85rem;">Standard</span>'}</div>
        </div>
      </div>
      <div style="margin-bottom:1.25rem;">
        <h4 style="margin-bottom:0.4rem;">Dietary & Preferences:</h4>
        <div style="padding:0.75rem; background:var(--bg-hover); border-radius:6px; font-size:0.85rem;">
          Dietary: <strong>${c.dietary || 'None'}</strong> • Notes: ${c.preferences || 'Standard dining requests'}
        </div>
      </div>
      <h4>Reservation History (${history.length}):</h4>
      <div class="data-table-wrapper" style="max-height:220px; overflow-y:auto; margin-top:0.5rem;">
        <table class="data-table">
          <thead><tr><th>Ref</th><th>Date & Time</th><th>Guests</th><th>Table</th><th>Status</th></tr></thead>
          <tbody>
            ${history.length > 0 ? history.map(h => `
              <tr>
                <td><strong>${h.id}</strong></td>
                <td>${h.date} • ${h.time}</td>
                <td>${h.guestCount} guests</td>
                <td>${h.tableId}</td>
                <td>${App.getBookingBadge(h.status)}</td>
              </tr>
            `).join('') : `<tr><td colspan="5" style="text-align:center; padding:1.5rem; color:var(--text-muted);">No previous dining records.</td></tr>`}
          </tbody>
        </table>
      </div>
    `;
    App.openModal('history-modal');
  },

  openAddModal() {
    const form = document.getElementById('customer-form');
    if (!form) return;
    form.reset();
    document.getElementById('customer-form-id').value = '';
    document.getElementById('customer-modal-title').textContent = 'Add New Customer Record';
    App.openModal('customer-modal');
  },

  openEditModal(id) {
    const c = Store.getCustomerById(id);
    if (!c) return;
    document.getElementById('customer-modal-title').textContent = `Edit Profile: ${c.name}`;
    document.getElementById('customer-form-id').value = c.id;
    document.getElementById('customer-form-name').value = c.name;
    document.getElementById('customer-form-phone').value = c.phone;
    document.getElementById('customer-form-email').value = c.email || '';
    document.getElementById('customer-form-dietary').value = c.dietary || 'None';
    document.getElementById('customer-form-preferences').value = c.preferences || '';
    document.getElementById('customer-form-vip').checked = !!c.isVip;
    App.openModal('customer-modal');
  },

  handleSubmit() {
    const id = document.getElementById('customer-form-id').value;
    const name = document.getElementById('customer-form-name').value.trim();
    const phone = document.getElementById('customer-form-phone').value.trim();
    const email = document.getElementById('customer-form-email').value.trim();
    const dietary = document.getElementById('customer-form-dietary').value;
    const preferences = document.getElementById('customer-form-preferences').value.trim();
    const isVip = document.getElementById('customer-form-vip').checked;

    if (!name || !phone) {
      App.showToast('Validation Error', 'Customer Name and Phone number are required.', 'warning');
      return;
    }

    Store.saveCustomer({
      id: id || undefined,
      name,
      phone,
      email: email || `${name.toLowerCase().replace(/[^a-z]/g, '')}@guest.in`,
      dietary,
      preferences,
      isVip
    });

    App.closeModal('customer-modal');
    App.showToast('Profile Saved', `Customer record for ${name} saved.`, 'success');
  },

  deleteCustomer(id) {
    if (confirm('Delete this customer profile?')) {
      Store.deleteCustomer(id);
      App.showToast('Deleted', 'Customer profile removed.', 'danger');
    }
  }
};

/* ==============================================================================
   10. WALK-IN WAITLIST MODULE (Bonus)
   ============================================================================== */
const Waitlist = {
  init() {
    this.bindEvents();
    this.render();
    Store.subscribe((event) => {
      if (['waitlist', 'tables', 'all'].includes(event)) this.render();
    });
  },

  bindEvents() {
    const form = document.getElementById('waitlist-form');
    if (form) form.addEventListener('submit', (e) => { e.preventDefault(); this.handleSubmit(); });
  },

  render() {
    const tbody = document.getElementById('waitlist-tbody');
    if (!tbody) return;

    const list = Store.getWaitlist();
    const badge = document.getElementById('waitlist-count-badge');
    if (badge) badge.textContent = `${list.length} parties waiting`;

    if (list.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:2rem; color:var(--text-muted);">Waitlist queue is empty.</td></tr>`;
      return;
    }

    tbody.innerHTML = list.map((w, idx) => `
      <tr>
        <td>
          <span style="width:24px; height:24px; border-radius:50%; background:var(--primary); color:#FFF; display:inline-flex; align-items:center; justify-content:center; font-weight:700; font-size:0.75rem;">
            #${idx + 1}
          </span>
        </td>
        <td>
          <div style="font-weight:700; color:var(--text-main);">${w.customerName}</div>
          <div style="font-size:0.75rem; color:var(--text-muted);">${w.phone}</div>
        </td>
        <td>👥 <strong>${w.guestCount}</strong> guests</td>
        <td>
          <span style="color:var(--primary); font-weight:700;">🕒 ${w.joinedAt}</span>
          <div style="font-size:0.72rem; color:var(--text-muted);">Est: ${w.estimatedWait}</div>
        </td>
        <td>
          <div>${w.preferredSection || 'Any Section'}</div>
          ${w.notes ? `<div style="font-size:0.74rem; color:var(--text-muted);">${w.notes}</div>` : ''}
        </td>
        <td>
          <div class="action-btn-group">
            <button class="btn btn-sm btn-primary" onclick="Waitlist.openSeatModal('${w.id}')">Seat Party →</button>
            <button class="action-btn btn-delete" onclick="Waitlist.deleteEntry('${w.id}')" title="Remove">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            </button>
          </div>
        </td>
      </tr>
    `).join('');
  },

  openAddModal() {
    const form = document.getElementById('waitlist-form');
    if (form) form.reset();
    App.openModal('waitlist-modal');
  },

  handleSubmit() {
    const name = document.getElementById('waitlist-form-name').value.trim();
    const phone = document.getElementById('waitlist-form-phone').value.trim();
    const guests = parseInt(document.getElementById('waitlist-form-guests').value, 10);
    const wait = document.getElementById('waitlist-form-wait').value.trim() || '20 mins';
    const section = document.getElementById('waitlist-form-section').value;
    const notes = document.getElementById('waitlist-form-notes').value.trim();

    if (!name || !phone || isNaN(guests)) {
      App.showToast('Validation Error', 'Please complete the waitlist details.', 'warning');
      return;
    }

    Store.saveWaitlistEntry({ customerName: name, phone, guestCount: guests, estimatedWait: wait, preferredSection: section, notes });
    App.closeModal('waitlist-modal');
    App.showToast('Queued', `${name} added to waitlist.`, 'success');
  },

  openSeatModal(id) {
    const party = Store.getWaitlist().find(w => w.id === id);
    if (!party) return;

    const available = Store.getTables().filter(t => t.status === 'Available' && t.capacity >= party.guestCount);
    if (available.length === 0) {
      App.showToast('No Table Available', `No available tables matching ${party.guestCount} guests.`, 'warning');
      return;
    }

    document.getElementById('quickseat-modal-body').innerHTML = `
      <p style="margin-bottom:1rem;">Seating <strong>${party.customerName}</strong> (Party of <strong>${party.guestCount}</strong>).</p>
      <div class="form-group">
        <label>Assign Table:</label>
        <select id="quickseat-table-select" class="select-custom">
          ${available.map(t => `<option value="${t.id}">${t.name} (${t.capacity} seats, ${t.section})</option>`).join('')}
        </select>
      </div>
    `;

    document.getElementById('quickseat-confirm-btn').onclick = () => {
      const tableId = document.getElementById('quickseat-table-select').value;
      Store.seatWaitlistParty(id, tableId);
      App.closeModal('quickseat-modal');
      App.showToast('Seated', `${party.customerName} seated at ${tableId}.`, 'success');
    };

    App.openModal('quickseat-modal');
  },

  deleteEntry(id) {
    Store.deleteWaitlistEntry(id);
    App.showToast('Removed', 'Party removed from waitlist.', 'info');
  }
};

/* ==============================================================================
   11. REPORTS & CSV EXPORT MODULE
   ============================================================================== */
const Reports = {
  scope: 'Today',

  init() {
    this.bindEvents();
    this.render();
    Store.subscribe((event) => {
      if (['bookings', 'tables', 'all'].includes(event)) this.render();
    });
  },

  bindEvents() {
    const scopeSelect = document.getElementById('report-scope-select');
    if (scopeSelect) scopeSelect.addEventListener('change', (e) => { this.scope = e.target.value; this.render(); });

    const exportBtn = document.getElementById('btn-export-csv');
    if (exportBtn) exportBtn.addEventListener('click', () => this.exportCSV());

    const printBtn = document.getElementById('btn-print-report');
    if (printBtn) printBtn.addEventListener('click', () => window.print());
  },

  getScopedBookings() {
    const bookings = Store.getBookings();
    const today = getFormattedDate(0);
    if (this.scope === 'Today') return bookings.filter(b => b.date === today);
    if (this.scope === 'Week') return bookings.filter(b => b.date >= getFormattedDate(-6) && b.date <= getFormattedDate(1));
    if (this.scope === 'Month') return bookings.filter(b => b.date.startsWith(today.slice(0, 7)));
    return bookings;
  },

  render() {
    const user = Store.getCurrentUser();
    const isStaff = user && user.role === 'Staff';

    const repNotice = document.getElementById('reports-restricted-notice');
    if (repNotice) repNotice.style.display = isStaff ? 'block' : 'none';

    const bookings = this.getScopedBookings();
    const completed = bookings.filter(b => b.status === 'Confirmed' || b.status === 'Seated');
    const cancelled = bookings.filter(b => b.status === 'Cancelled');
    const noShow = bookings.filter(b => b.status === 'No-Show');

    const totalRev = completed.reduce((sum, b) => sum + (Number(b.estimatedRevenue) || 0), 0);
    const totalGuests = completed.reduce((sum, b) => sum + (Number(b.guestCount) || 0), 0);
    const avgParty = completed.length > 0 ? (totalGuests / completed.length).toFixed(1) : '0';

    const bEl = document.getElementById('rep-total-bookings');
    if (bEl) bEl.textContent = bookings.length;

    const rEl = document.getElementById('rep-total-revenue');
    if (rEl) rEl.textContent = isStaff ? '🔒 Restricted' : formatINR(totalRev);

    const gEl = document.getElementById('rep-total-guests');
    if (gEl) gEl.textContent = totalGuests;

    const aEl = document.getElementById('rep-avg-party');
    if (aEl) aEl.textContent = avgParty;

    // Section Breakdown
    const secTbody = document.getElementById('rep-section-breakdown-tbody');
    if (secTbody) {
      const tables = Store.getTables();
      const sections = ['Main Dining', 'Outdoor Patio', 'VIP Lounge', 'Rooftop Terrace'];

      secTbody.innerHTML = sections.map(sec => {
        const secTables = tables.filter(t => t.section === sec);
        const secIds = secTables.map(t => t.id);
        const secBookings = bookings.filter(b => secIds.includes(b.tableId));
        const secRev = secBookings.filter(b => b.status !== 'Cancelled').reduce((sum, b) => sum + (Number(b.estimatedRevenue) || 0), 0);
        const occ = secTables.filter(t => t.status === 'Occupied' || t.status === 'Reserved').length;
        const rate = secTables.length > 0 ? Math.round((occ / secTables.length) * 100) : 0;

        return `
          <tr>
            <td><strong>${sec}</strong></td>
            <td>${secTables.length} tables</td>
            <td>${secBookings.length} bookings</td>
            <td><strong>${formatINR(secRev)}</strong></td>
            <td>
              <div style="display:flex; align-items:center; gap:0.5rem;">
                <div style="flex:1; height:8px; background:var(--border-color); border-radius:4px; overflow:hidden;">
                  <div style="width:${rate}%; height:100%; background:var(--primary);"></div>
                </div>
                <span style="font-weight:700; font-size:0.75rem;">${rate}%</span>
              </div>
            </td>
          </tr>
        `;
      }).join('');
    }

    // Status Chart
    const chart = document.getElementById('rep-status-chart');
    if (chart) {
      chart.innerHTML = `
        <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:0.75rem;">
          <div style="background:var(--primary-light); padding:0.85rem; border-radius:8px; text-align:center;">
            <div style="font-size:0.75rem; color:var(--primary-dark); font-weight:700;">CONFIRMED / SEATED</div>
            <div style="font-size:1.4rem; font-weight:800; color:var(--primary-dark); margin-top:0.2rem;">${completed.length}</div>
          </div>
          <div style="background:#FEF2F2; padding:0.85rem; border-radius:8px; text-align:center;">
            <div style="font-size:0.75rem; color:#991B1B; font-weight:700;">CANCELLED</div>
            <div style="font-size:1.4rem; font-weight:800; color:#991B1B; margin-top:0.2rem;">${cancelled.length}</div>
          </div>
          <div style="background:#F1F5F9; padding:0.85rem; border-radius:8px; text-align:center;">
            <div style="font-size:0.75rem; color:#475569; font-weight:700;">NO-SHOWS</div>
            <div style="font-size:1.4rem; font-weight:800; color:#475569; margin-top:0.2rem;">${noShow.length}</div>
          </div>
        </div>
      `;
    }
  },

  exportCSV() {
    const user = Store.getCurrentUser();
    if (user && user.role === 'Staff') {
      App.showToast('Access Denied', 'Financial CSV exports are restricted for Staff. Switch to Manager or Admin account.', 'warning');
      return;
    }

    const list = this.getScopedBookings();
    if (list.length === 0) {
      App.showToast('No Data', 'No reservations to export.', 'warning');
      return;
    }

    const headers = ['Booking ID', 'Customer Name', 'Phone', 'Email', 'Date', 'Time', 'Guests', 'Table ID', 'Status', 'Occasion', 'Est Revenue INR', 'Special Requests'];
    const rows = list.map(b => [
      `"${b.id}"`, `"${b.customerName}"`, `"${b.customerPhone}"`, `"${b.customerEmail || ''}"`,
      `"${b.date}"`, `"${b.time}"`, b.guestCount, `"${b.tableId}"`, `"${b.status}"`,
      `"${b.occasion || ''}"`, b.estimatedRevenue || 0, `"${(b.specialRequests || '').replace(/"/g, '""')}"`
    ]);

    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `velvettable_report_${this.scope.toLowerCase()}_${getFormattedDate(0)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    App.showToast('CSV Exported', `Downloaded report with ${list.length} records.`, 'success');
  }
};

/* ==============================================================================
   12. AUTOMATED CONFIRMATIONS MODULE
   ============================================================================== */
const Confirmations = {
  init() {
    this.render();
    Store.subscribe((event) => {
      if (['bookings', 'all'].includes(event)) this.render();
    });
  },

  render() {
    const container = document.getElementById('confirmations-history-list');
    if (!container) return;

    const list = Store.getBookings().filter(b => b.status === 'Confirmed' || b.status === 'Seated').slice(0, 10);
    if (list.length === 0) {
      container.innerHTML = `<div style="text-align:center; padding:2rem; color:var(--text-muted);">No confirmed bookings to dispatch.</div>`;
      return;
    }

    container.innerHTML = list.map(b => {
      const table = Store.getTableById(b.tableId);
      const tableName = table ? table.name : b.tableId;

      return `
        <div class="content-card" style="margin-bottom:0.85rem; padding:1rem 1.25rem; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:0.75rem;">
          <div style="display:flex; align-items:center; gap:1rem;">
            <div style="width:40px; height:40px; border-radius:10px; background:var(--primary-light); color:var(--primary-dark); display:flex; align-items:center; justify-content:center; font-size:1.2rem;">
              ✉️
            </div>
            <div>
              <div style="font-weight:700; color:var(--text-main); font-size:0.95rem;">
                ${b.customerName} <span style="font-size:0.75rem; color:var(--text-muted);">(${b.id})</span>
              </div>
              <div style="font-size:0.78rem; color:var(--text-muted);">${b.customerPhone} • ${b.customerEmail}</div>
              <div style="font-size:0.76rem; color:var(--primary); font-weight:700; margin-top:2px;">
                📅 ${b.date} at ${b.time} • 🍽️ ${tableName} (${b.guestCount} guests)
              </div>
            </div>
          </div>
          <div style="display:flex; align-items:center; gap:0.5rem;">
            <button class="btn btn-sm btn-outline" onclick="Confirmations.previewSlip('${b.id}')">Preview Slip</button>
            <button class="btn btn-sm btn-primary" onclick="Confirmations.resend('${b.id}')">Resend SMS</button>
          </div>
        </div>
      `;
    }).join('');
  },

  previewSlip(bookingId) {
    const b = Store.getBookingById(bookingId);
    if (!b) return;

    const table = Store.getTableById(b.tableId);
    const tableName = table ? table.name : b.tableId;
    const body = document.getElementById('confirmation-preview-body');

    body.innerHTML = `
      <div style="display:flex; gap:1.5rem; flex-wrap:wrap; justify-content:center;">
        <div class="confirmation-slip-card" style="flex:1; min-width:320px;">
          <div class="slip-header">
            <span class="slip-badge">Reservation Approved</span>
            <div class="slip-brand">VelvetTable</div>
            <div style="font-size:0.76rem; color:var(--text-muted); margin-top:0.2rem;">Fine Dining & Lounge • 108 Boulevard St</div>
          </div>

          <div class="slip-details-grid">
            <div>
              <div class="slip-field-label">Guest Name</div>
              <div class="slip-field-value">${b.customerName}</div>
            </div>
            <div>
              <div class="slip-field-label">Booking Reference</div>
              <div class="slip-field-value" style="color:var(--primary);">${b.id}</div>
            </div>
            <div>
              <div class="slip-field-label">Date & Time</div>
              <div class="slip-field-value">${b.date} at ${b.time}</div>
            </div>
            <div>
              <div class="slip-field-label">Party Size</div>
              <div class="slip-field-value">${b.guestCount} Guests</div>
            </div>
            <div>
              <div class="slip-field-label">Assigned Table</div>
              <div class="slip-field-value">${tableName}</div>
            </div>
            <div>
              <div class="slip-field-label">Dining Section</div>
              <div class="slip-field-value">${table ? table.section : 'Main Dining'}</div>
            </div>
          </div>

          ${b.occasion && b.occasion !== 'Casual Dining' ? `
            <div style="background:var(--primary-light); padding:0.6rem; border-radius:6px; margin-bottom:1.25rem; font-size:0.82rem; font-weight:700; color:var(--primary-dark); text-align:center;">
              🎉 Celebrating: ${b.occasion}
            </div>
          ` : ''}

          <div class="slip-qr-box">
            <svg width="100" height="100" viewBox="0 0 100 100">
              <rect x="0" y="0" width="100" height="100" fill="#FFFFFF"/>
              <rect x="10" y="10" width="25" height="25" fill="#18153A"/>
              <rect x="15" y="15" width="15" height="15" fill="#FFFFFF"/>
              <rect x="18" y="18" width="9" height="9" fill="#18153A"/>
              <rect x="65" y="10" width="25" height="25" fill="#18153A"/>
              <rect x="70" y="15" width="15" height="15" fill="#FFFFFF"/>
              <rect x="73" y="18" width="9" height="9" fill="#18153A"/>
              <rect x="10" y="65" width="25" height="25" fill="#18153A"/>
              <rect x="15" y="70" width="15" height="15" fill="#FFFFFF"/>
              <rect x="18" y="73" width="9" height="9" fill="#18153A"/>
              <rect x="42" y="15" width="8" height="8" fill="#18153A"/>
              <rect x="42" y="35" width="16" height="8" fill="#18153A"/>
              <rect x="42" y="55" width="8" height="16" fill="#18153A"/>
              <rect x="65" y="50" width="20" height="8" fill="#18153A"/>
              <rect x="45" y="75" width="25" height="10" fill="#18153A"/>
            </svg>
          </div>

          <div class="slip-footer-note">
            Please present this digital pass or booking ref upon arrival at the Host Stand. Tables held for 15 minutes past scheduled time.
          </div>
        </div>

        <div style="width:280px; background:#0F0E17; border-radius:28px; padding:1.25rem 0.85rem; color:#FFFFFF; display:flex; flex-direction:column; box-shadow:var(--shadow-xl); border:4px solid #312E46;">
          <div style="text-align:center; font-size:0.72rem; color:#888888; margin-bottom:1rem;">
            Messages • VelvetTable Bot
          </div>
          <div style="background-color:#201D33; border-radius:14px; padding:0.85rem; font-size:0.78rem; line-height:1.4; color:#EAE8F2;">
            <p><strong>Hi ${b.customerName.split(' ')[0]}!</strong></p>
            <p style="margin-top:0.35rem;">Your reservation for <strong>${b.guestCount} guests</strong> on <strong>${b.date} at ${b.time}</strong> is confirmed (Ref: ${b.id}).</p>
            <p style="margin-top:0.35rem; color:#A78BFA;">Table: ${tableName}</p>
            <p style="margin-top:0.35rem; font-size:0.7rem; color:#888888;">Reply 1 to confirm, 9 to cancel.</p>
          </div>
          <div style="margin-top:auto; padding-top:1rem; text-align:center; font-size:0.65rem; color:#777777;">
            Simulated Mobile SMS Notification
          </div>
        </div>
      </div>
    `;

    App.openModal('confirmation-modal');
  },

  resend(id) {
    const b = Store.getBookingById(id);
    if (b) {
      App.showToast('SMS Dispatched', `Simulated confirmation SMS dispatched to ${b.customerPhone}.`, 'success');
    }
  }
};

/* ==============================================================================
   13. AUTH & ROLE-BASED ACCESS MODULE
   ============================================================================== */
const Auth = {
  init() {
    this.bindEvents();
    const user = Store.getCurrentUser();
    if (user) {
      this.completeLogin(user, false);
    } else {
      this.showAuthScreen();
    }

    Store.subscribe((event, data) => {
      if (event === 'user') {
        if (data) {
          this.updateUserUI(data);
          this.applyRolePermissions(data.role);
        } else {
          this.showAuthScreen();
        }
      }
    });
  },

  bindEvents() {
    // Role switcher and profile cycling removed as authentication is strictly credential-based
  },

  showAuthScreen() {
    document.body.classList.add('auth-mode');
    window.scrollTo({ top: 0, behavior: 'instant' });
  },

  hideAuthScreen() {
    document.body.classList.remove('auth-mode');
  },

  switchTab(tab) {
    const loginForm = document.getElementById('auth-login-form');
    const regForm = document.getElementById('auth-register-form');
    const loginTabBtn = document.getElementById('tab-btn-login');
    const regTabBtn = document.getElementById('tab-btn-register');
    const errLogin = document.getElementById('login-error-alert');
    const errReg = document.getElementById('register-error-alert');

    if (errLogin) errLogin.style.display = 'none';
    if (errReg) errReg.style.display = 'none';

    if (tab === 'login') {
      if (loginForm) loginForm.style.display = 'block';
      if (regForm) regForm.style.display = 'none';
      if (loginTabBtn) loginTabBtn.classList.add('active');
      if (regTabBtn) regTabBtn.classList.remove('active');
    } else {
      if (loginForm) loginForm.style.display = 'none';
      if (regForm) regForm.style.display = 'block';
      if (loginTabBtn) loginTabBtn.classList.remove('active');
      if (regTabBtn) regTabBtn.classList.add('active');
    }
  },

  quickLogin(role) {
    const user = Store.getUsers().find(u => u.role.toLowerCase() === role.toLowerCase()) || {
      id: `USR-${Date.now().toString().slice(-4)}`,
      name: role === 'Admin' ? 'Aarav Choudhury' : role === 'Manager' ? 'Sunil Rao' : 'Deepika Nair',
      email: `${role.toLowerCase()}@courtyard.in`,
      role: role,
      avatar: role === 'Admin' 
        ? 'assets/avatar-aarav.jpg'
        : role === 'Manager'
        ? 'assets/avatar-sunil.jpg'
        : 'assets/avatar-deepika.jpg'
    };
    this.completeLogin(user, true);
  },

  handleLogin(e) {
    if (e) e.preventDefault();
    const identityInput = document.getElementById('login-identity') || document.getElementById('login-email');
    const passwordInput = document.getElementById('login-password');
    const identity = (identityInput?.value || '').trim().toLowerCase();
    const password = (passwordInput?.value || '').trim();
    const err = document.getElementById('login-error-alert');

    if (!identity || !password) {
      if (err) {
        err.textContent = 'Please enter both your email address / username and password.';
        err.style.display = 'block';
      }
      return;
    }

    const users = Store.getUsers();

    // 1. Role-based credential check
    let found = null;
    if (identity === 'admin' || identity === 'admin@courtyard.in') {
      if (password !== 'admin') {
        if (err) {
          err.textContent = 'Incorrect password for Admin account. Use password: admin';
          err.style.display = 'block';
        }
        return;
      }
      found = users.find(u => u.role === 'Admin') || DEFAULT_USERS.find(u => u.role === 'Admin');
    } else if (identity === 'manager' || identity === 'manager@courtyard.in') {
      if (password !== 'manager') {
        if (err) {
          err.textContent = 'Incorrect password for Manager account. Use password: manager';
          err.style.display = 'block';
        }
        return;
      }
      found = users.find(u => u.role === 'Manager') || DEFAULT_USERS.find(u => u.role === 'Manager');
    } else if (identity === 'staff' || identity === 'staff@courtyard.in') {
      if (password !== 'staff') {
        if (err) {
          err.textContent = 'Incorrect password for Staff account. Use password: staff';
          err.style.display = 'block';
        }
        return;
      }
      found = users.find(u => u.role === 'Staff') || DEFAULT_USERS.find(u => u.role === 'Staff');
    } else {
      // 2. Custom registered user check
      found = users.find(u => {
        const matchU = u.username && u.username.toLowerCase() === identity;
        const matchE = u.email && u.email.toLowerCase() === identity;
        const matchPrefix = u.email && u.email.toLowerCase().split('@')[0] === identity;
        return matchU || matchE || matchPrefix;
      });

      if (!found) {
        if (err) {
          err.textContent = 'Invalid credentials. Sign in with username admin / manager / staff and the matching password.';
          err.style.display = 'block';
        }
        return;
      }

      const expected = found.password || found.role.toLowerCase();
      if (password !== expected) {
        if (err) {
          err.textContent = 'Incorrect password for this account.';
          err.style.display = 'block';
        }
        return;
      }
    }

    if (err) err.style.display = 'none';
    this.completeLogin(found, true);
  },

  handleRegister(e) {
    if (e) e.preventDefault();
    const name = (document.getElementById('reg-name')?.value || '').trim();
    const email = (document.getElementById('reg-email')?.value || '').trim().toLowerCase();
    const role = document.getElementById('reg-role')?.value || 'Staff';
    const password = (document.getElementById('reg-password')?.value || '').trim();
    const err = document.getElementById('register-error-alert');

    if (!name || !email || !role || !password) {
      if (err) { err.textContent = 'Please fill out all required registration fields.'; err.style.display = 'block'; }
      return;
    }

    const newUser = {
      id: `USR-${Math.floor(100 + Math.random() * 900)}`,
      username: email.split('@')[0],
      name: name,
      email: email,
      role: role,
      password: password,
      avatar: role === 'Admin'
        ? 'assets/avatar-aarav.jpg'
        : role === 'Manager'
        ? 'assets/avatar-sunil.jpg'
        : 'assets/avatar-deepika.jpg'
    };

    Store.addUser(newUser);
    if (err) err.style.display = 'none';
    App.showToast('Account Created', `Welcome ${name}! Registered as ${role}.`, 'success');
    this.completeLogin(newUser, true);
  },

  completeLogin(user, shouldNavigate = true) {
    Store.setCurrentUser(user);
    this.updateUserUI(user);
    this.hideAuthScreen();
    this.applyRolePermissions(user.role);

    // Clear inputs
    const identityInput = document.getElementById('login-identity') || document.getElementById('login-email');
    const passwordInput = document.getElementById('login-password');
    if (identityInput) identityInput.value = '';
    if (passwordInput) passwordInput.value = '';

    // Route and welcome by role
    if (shouldNavigate) {
      App.navigate('dashboard');
      if (user.role === 'Manager') {
        App.showToast(`Welcome to Manager Dashboard`, `Welcome ${user.name}! Floor operations & management reports active.`, 'success');
      } else if (user.role === 'Admin') {
        App.showToast(`Welcome to Admin Dashboard`, `Welcome ${user.name}! Full system privileges & revenue analytics active.`, 'success');
      } else {
        // Staff
        App.showToast(`Welcome to Staff Dashboard`, `Welcome ${user.name}! Live table seating & guest queue management active.`, 'info');
      }
    }
  },

  switchRole(roleName) {
    const user = Store.getUsers().find(u => u.role.toLowerCase() === roleName.toLowerCase()) || {
      id: `USR-${Date.now().toString().slice(-4)}`,
      name: roleName === 'Admin' ? 'Aarav Choudhury' : roleName === 'Manager' ? 'Sunil Rao' : 'Deepika Nair',
      email: `${roleName.toLowerCase()}@courtyard.in`,
      role: roleName,
      avatar: roleName === 'Admin' 
        ? 'assets/avatar-aarav.jpg'
        : roleName === 'Manager'
        ? 'assets/avatar-sunil.jpg'
        : 'assets/avatar-deepika.jpg'
    };

    Store.setCurrentUser(user);
    this.updateUserUI(user);
    this.applyRolePermissions(user.role);
    App.showToast('Role Switched', `Active session changed to ${user.role} (${user.name}).`, 'info');
  },

  logout() {
    Store.logout();
    this.showAuthScreen();
    const identityInput = document.getElementById('login-identity') || document.getElementById('login-email');
    const passwordInput = document.getElementById('login-password');
    if (identityInput) identityInput.value = '';
    if (passwordInput) passwordInput.value = '';
    const err = document.getElementById('login-error-alert');
    if (err) err.style.display = 'none';
    App.showToast('Signed Out', 'You have been signed out. Please enter credentials to log in.', 'info');
  },

  updateUserUI(user) {
    if (!user) return;
    const nameEl = document.getElementById('sidebar-user-name');
    const roleEl = document.getElementById('sidebar-user-role');
    const avatarEl = document.getElementById('sidebar-user-avatar');
    const headerBadge = document.getElementById('header-user-badge');

    const fallbackAvatar = user.role === 'Admin' ? 'assets/avatar-aarav.jpg' : user.role === 'Manager' ? 'assets/avatar-sunil.jpg' : 'assets/avatar-deepika.jpg';

    if (nameEl) nameEl.textContent = user.name;
    if (avatarEl) avatarEl.src = user.avatar || fallbackAvatar;
    if (roleEl) {
      roleEl.textContent = user.role;
      roleEl.className = `user-role-badge role-${user.role.toLowerCase()}`;
    }

    if (headerBadge) {
      const icon = user.role === 'Admin' ? '👑' : user.role === 'Manager' ? '👔' : '🧑‍🍳';
      headerBadge.textContent = `${icon} ${user.role}`;
    }

    // Refresh dashboard welcome banner if present
    const welcomeHeading = document.getElementById('dash-welcome-heading');
    const welcomeSub = document.getElementById('dash-welcome-sub');
    const welcomeBadge = document.getElementById('dash-welcome-badge');
    const welcomeAvatar = document.getElementById('dash-welcome-avatar');

    if (welcomeHeading) {
      welcomeHeading.textContent = `Welcome to ${user.role} Dashboard`;
    }
    if (welcomeBadge) {
      const icon = user.role === 'Admin' ? '👑' : user.role === 'Manager' ? '👔' : '🧑‍🍳';
      welcomeBadge.textContent = `${icon} ${user.role === 'Admin' ? 'Administrator' : user.role === 'Manager' ? 'Floor Manager' : 'Host / Staff'}`;
    }
    if (welcomeSub) {
      if (user.role === 'Admin') {
        welcomeSub.innerHTML = `Logged in as <strong>${user.name}</strong> (Administrator) • Full system privileges & revenue analytics active`;
      } else if (user.role === 'Manager') {
        welcomeSub.innerHTML = `Logged in as <strong>${user.name}</strong> (Manager) • Floor operations, reservations & shift performance active`;
      } else {
        welcomeSub.innerHTML = `Logged in as <strong>${user.name}</strong> (Staff) • Live table seating, guest reception & waitlist operational`;
      }
    }
    if (welcomeAvatar) {
      welcomeAvatar.src = user.avatar || fallbackAvatar;
    }
  },

  applyRolePermissions(role) {
    const isStaff = role === 'Staff';

    // 1. Sidebar Nav Lock Badges
    const lockTables = document.getElementById('lock-tables-badge');
    const lockReports = document.getElementById('lock-reports-badge');
    const navTables = document.querySelector('.nav-item[data-view="tables"]');
    const navReports = document.querySelector('.nav-item[data-view="reports"]');

    if (lockTables) lockTables.style.display = isStaff ? 'inline-block' : 'none';
    if (lockReports) lockReports.style.display = isStaff ? 'inline-block' : 'none';

    if (navTables) navTables.classList.toggle('nav-restricted', isStaff);
    if (navReports) navReports.classList.toggle('nav-restricted', isStaff);

    // 2. Refresh views
    if (typeof Tables !== 'undefined' && typeof Tables.render === 'function') Tables.render();
    if (typeof Reports !== 'undefined' && typeof Reports.render === 'function') Reports.render();
    if (typeof Dashboard !== 'undefined' && typeof Dashboard.render === 'function') Dashboard.render();
  }
};

/* ==============================================================================
   14. MAIN APP ROUTER & GLOBAL UI CONTROLLERS
   ============================================================================== */
const App = {
  currentView: 'dashboard',

  init() {
    Store.init();
    this.startLiveClock();
    this.bindNavigation();
    this.bindTheme();
    this.bindNotifications();
    this.bindModals();
    this.bindSearch();

    Auth.init();
    Dashboard.init();
    Tables.init();
    Bookings.init();
    Floorplan.init();
    Availability.init();
    Calendar.init();
    Customers.init();
    Waitlist.init();
    Reports.init();
    Confirmations.init();

    // Check authentication and route accordingly
    const currentUser = Store.getCurrentUser();
    if (!currentUser) {
      Auth.showAuthScreen();
    } else {
      Auth.applyRolePermissions(currentUser.role);
      const hash = window.location.hash.replace('#', '');
      if (hash && document.getElementById(`view-${hash}`)) {
        this.navigate(hash);
      } else {
        if (currentUser.role === 'Staff') {
          this.navigate('floorplan');
        } else {
          this.navigate('dashboard');
        }
      }
    }

    this.updateNotificationBadge();
    Store.subscribe((event) => {
      if (['notifications', 'all'].includes(event)) this.updateNotificationBadge();
    });
  },

  startLiveClock() {
    const el = document.getElementById('header-live-clock');
    const tick = () => {
      const now = new Date();
      if (el) el.textContent = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
    };
    tick();
    setInterval(tick, 1000);
  },

  bindNavigation() {
    document.querySelectorAll('.nav-item[data-view]').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        this.navigate(item.dataset.view);
        document.querySelector('.app-sidebar')?.classList.remove('mobile-open');
      });
    });

    window.addEventListener('hashchange', () => {
      const h = window.location.hash.replace('#', '');
      if (h && document.getElementById(`view-${h}`)) this.navigate(h);
    });

    document.getElementById('btn-sidebar-toggle')?.addEventListener('click', () => {
      document.querySelector('.app-sidebar')?.classList.toggle('mobile-open');
    });
  },

  navigate(viewId) {
    const user = Store.getCurrentUser();
    if (!user) {
      Auth.showAuthScreen();
      return;
    }

    // Role-based advisory for Staff
    if (user.role === 'Staff' && (viewId === 'reports' || viewId === 'tables')) {
      this.showToast('Restricted View', `${viewId === 'reports' ? 'Reports & Revenue' : 'Table Inventory'} is restricted for Staff. View-only notice is active.`, 'warning');
    }

    const target = document.getElementById(`view-${viewId}`);
    if (!target) return;
    this.currentView = viewId;
    window.location.hash = viewId;

    document.querySelectorAll('.view-section').forEach(s => s.classList.remove('active'));
    target.classList.add('active');

    document.querySelectorAll('.nav-item').forEach(i => {
      if (i.dataset.view === viewId) i.classList.add('active');
      else i.classList.remove('active');
    });

    const titles = {
      dashboard: { title: 'Restaurant Overview', crumb: 'Dashboard / Overview' },
      floorplan: { title: 'Table Layout & Floor Plan', crumb: 'Operations / Floor Plan' },
      bookings: { title: 'Reservation Management', crumb: 'Bookings / All Reservations' },
      tables: { title: 'Table Inventory', crumb: 'Management / Tables' },
      availability: { title: 'Real-Time Availability', crumb: 'Reservations / Availability Engine' },
      calendar: { title: 'Booking Calendar', crumb: 'Schedule / Calendar' },
      customers: { title: 'Customer Profiles', crumb: 'Guests / Profiles' },
      waitlist: { title: 'Walk-In Waitlist', crumb: 'Operations / Waitlist' },
      reports: { title: 'Reports & Analytics', crumb: 'Business Intelligence / Reports' },
      confirmations: { title: 'Automated Confirmations', crumb: 'Communication / Confirmations' }
    };

    if (viewId === 'dashboard') {
      const role = user ? user.role : 'Admin';
      document.getElementById('header-active-title').textContent = `Welcome to ${role} Dashboard`;
      document.getElementById('header-active-breadcrumb').textContent = `${role} Workspace / Overview`;
      if (typeof Dashboard !== 'undefined' && typeof Dashboard.render === 'function') {
        Dashboard.render();
      }
    } else if (titles[viewId]) {
      document.getElementById('header-active-title').textContent = titles[viewId].title;
      document.getElementById('header-active-breadcrumb').textContent = titles[viewId].crumb;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  bindTheme() {
    document.getElementById('btn-theme-toggle')?.addEventListener('click', () => {
      const next = Store.toggleTheme();
      this.showToast('Theme Changed', `Switched to ${next === 'dark' ? 'Dark' : 'Light'} Purple theme.`, 'info');
    });
  },

  bindNotifications() {
    const btn = document.getElementById('btn-notification-toggle');
    const drawer = document.getElementById('notification-drawer');
    btn?.addEventListener('click', (e) => { e.stopPropagation(); drawer.classList.toggle('show'); });

    document.addEventListener('click', (e) => {
      if (drawer && !drawer.contains(e.target) && e.target !== btn) drawer.classList.remove('show');
    });

    document.getElementById('btn-clear-notifications')?.addEventListener('click', () => {
      Store.markNotificationsRead();
      this.updateNotificationBadge();
      this.showToast('Cleared', 'Notifications marked as read.', 'info');
    });
  },

  updateNotificationBadge() {
    const notifs = Store.getNotifications();
    const unread = notifs.filter(n => !n.read).length;
    const dot = document.getElementById('header-notif-dot');
    if (dot) dot.style.display = unread > 0 ? 'block' : 'none';

    const list = document.getElementById('drawer-notifications-list');
    if (list) {
      if (notifs.length === 0) {
        list.innerHTML = `<div style="text-align:center; padding:1.5rem; color:var(--text-muted);">No notifications.</div>`;
        return;
      }
      list.innerHTML = notifs.map(n => `
        <div class="drawer-item ${!n.read ? 'unread' : ''}">
          <div class="drawer-item-icon" style="background:var(--primary-light);">
            ${n.type === 'vip' ? '👑' : n.type === 'reservation' ? '📅' : '⏳'}
          </div>
          <div class="drawer-item-content">
            <div class="drawer-item-title">${n.title}</div>
            <div class="drawer-item-desc">${n.message}</div>
            <div class="drawer-item-time">${n.time}</div>
          </div>
        </div>
      `).join('');
    }
  },

  bindSearch() {
    const input = document.getElementById('global-search-input');
    input?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = input.value.trim().toLowerCase();
        if (!val) return;
        const b = Store.getBookings().find(x => x.customerName.toLowerCase().includes(val) || x.id.toLowerCase().includes(val));
        if (b) {
          this.navigate('bookings');
          const bs = document.getElementById('booking-search-input');
          if (bs) { bs.value = val; Bookings.filter.search = val; Bookings.render(); }
          this.showToast('Match Found', `Reservation for ${b.customerName}.`, 'success');
          return;
        }
        const c = Store.getCustomers().find(x => x.name.toLowerCase().includes(val));
        if (c) {
          this.navigate('customers');
          const cs = document.getElementById('customer-search-input');
          if (cs) { cs.value = val; Customers.search = val; Customers.render(); }
          this.showToast('Match Found', `Customer profile for ${c.name}.`, 'success');
          return;
        }
        this.showToast('No Matches', `No records found for "${val}".`, 'info');
      }
    });
  },

  bindModals() {
    document.querySelectorAll('.modal-overlay').forEach(modal => {
      modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('open'); });
    });
    document.querySelectorAll('.modal-close-btn, .modal-cancel-btn').forEach(btn => {
      btn.addEventListener('click', () => btn.closest('.modal-overlay')?.classList.remove('open'));
    });
  },

  openModal(id) { document.getElementById(id)?.classList.add('open'); },
  closeModal(id) { document.getElementById(id)?.classList.remove('open'); },

  showToast(title, message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    const icon = type === 'success' ? '✓' : type === 'danger' ? '✕' : type === 'warning' ? '⚠' : 'ℹ';

    toast.innerHTML = `
      <div class="toast-icon" style="color: ${type === 'success' ? 'var(--status-available)' : type === 'danger' ? 'var(--status-occupied)' : 'var(--primary)'};">
        ${icon}
      </div>
      <div class="toast-content">
        <div class="toast-title">${title}</div>
        <div class="toast-msg">${message}</div>
      </div>
    `;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => toast.remove(), 300);
    }, 3800);
  },

  getTableBadge(status) {
    if (status === 'Available') return '<span class="badge badge-available">🟢 Available</span>';
    if (status === 'Reserved') return '<span class="badge badge-reserved">🟡 Reserved</span>';
    if (status === 'Occupied') return '<span class="badge badge-occupied">🔴 Occupied</span>';
    return '<span class="badge badge-service">⚪ Out of Service</span>';
  },

  getBookingBadge(status) {
    if (status === 'Pending') return '<span class="badge badge-status-pending">📝 Pending</span>';
    if (status === 'Confirmed') return '<span class="badge badge-status-confirmed">✅ Confirmed</span>';
    if (status === 'Seated') return '<span class="badge badge-status-seated">🔄 Seated</span>';
    if (status === 'Cancelled') return '<span class="badge badge-status-cancelled">❌ Cancelled</span>';
    return '<span class="badge badge-status-noshow">📌 No-Show</span>';
  },

  resetDemo() {
    if (confirm('Reset all restaurant data back to default demo state?')) {
      Store.resetAllData();
      this.showToast('Reset Complete', 'Default tables, bookings, and customer data restored.', 'success');
    }
  }
};

// Auto-run when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => App.init());
