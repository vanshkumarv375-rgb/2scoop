import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Product, CartItem, User, Order, Coupon, Address, OrderItem, OrderStatus 
} from '../types';
import { PRODUCTS, SAMPLE_COUPONS } from '../data/supplementData';

export type AppView = 
  | 'home'
  | 'shop'
  | 'product-detail'
  | 'wishlist'
  | 'profile'
  | 'admin-panel'
  | 'about'
  | 'checkout'
  | 'order-success';

interface AppContextType {
  // Routing
  view: AppView;
  setView: (view: AppView) => void;
  activeProductId: string | null;
  navigateToProduct: (id: string) => void;
  activeOrderId: string | null;
  navigateToOrder: (id: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;

  // Products
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;

  // Authentication
  currentUser: User | null;
  users: User[];
  login: (email: string, password?: string) => { success: boolean; message: string; role?: string };
  register: (name: string, email: string, phone: string) => { success: boolean; message: string };
  logout: () => void;
  saveAddress: (address: Address) => void;
  deleteAddress: (id: string) => void;
  verifyUserEmail: () => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity: number, flavour: string, size: string) => void;
  removeFromCart: (index: number) => void;
  updateCartQuantity: (index: number, quantity: number) => void;
  clearCart: () => void;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  cartTotals: {
    subtotal: number;
    tax: number;
    shipping: number;
    discount: number;
    total: number;
  };

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;

  // Orders
  orders: Order[];
  createOrder: (address: Address, paymentMethod: string) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  addTrackingLog: (orderId: string, status: string, description: string) => void;

  // Coupons Admin
  coupons: Coupon[];
  addCoupon: (coupon: Coupon) => void;
  toggleCouponStatus: (code: string) => void;
  deleteCoupon: (code: string) => void;

  // Recently Viewed
  recentlyViewed: string[];
  addToRecentlyViewed: (productId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Core Admin Email specification
export const ADMIN_EMAIL = 'admin@2scoopnutritoon.com';

// Mock Password-less/Simple-Pass register database
const DEFAULT_USERS: User[] = [
  {
    email: 'admin@2scoopnutritoon.com',
    name: 'Chief Brand Admin (2ScoopNutritoon)',
    role: 'Admin',
    verified: true,
    joinedDate: '2026-01-10',
    addresses: [
      {
        id: 'addr-admin-1',
        name: '2ScoopNutritoon Head Office',
        addressLine1: 'Building 14, High-Performance Tech Park',
        addressLine2: 'Phase II, Industrial Area',
        city: 'Mumbai',
        state: 'Maharashtra',
        postalCode: '400013',
        country: 'India',
        phone: '+91 99999 88888',
        isDefault: true
      }
    ]
  },
  {
    email: 'tomarvansh475@gmail.com', // Active User Email from context
    name: 'Vansh Tomar',
    role: 'Customer',
    verified: true,
    joinedDate: '2026-06-15',
    addresses: [
      {
        id: 'addr-client-1',
        name: 'Home Apartment',
        addressLine1: 'Section 4, Row Housing 22',
        addressLine2: 'Sector 50',
        city: 'Noida',
        state: 'Uttar Pradesh',
        postalCode: '201301',
        country: 'India',
        phone: '+91 88888 77777',
        isDefault: true
      }
    ]
  }
];

// Seed basic historical orders for analytics
const generateSeedOrders = (defaultProducts: Product[]): Order[] => {
  const p1 = defaultProducts[0];
  const p4 = defaultProducts[3];
  const p5 = defaultProducts[4];

  return [
    {
      id: 'ord-101',
      orderNumber: 'SCOOP-73892-ORD',
      customerEmail: 'tomarvansh475@gmail.com',
      customerName: 'Vansh Tomar',
      items: [
        {
          id: p1.id,
          productName: p1.name,
          productCategory: p1.category,
          quantity: 1,
          price: p1.discountPrice,
          selectedFlavour: p1.flavours[0],
          selectedSize: p1.sizes[0],
          imageRepresentation: p1.images[0]
        },
        {
          id: p4.id,
          productName: p4.name,
          productCategory: p4.category,
          quantity: 2,
          price: p4.discountPrice,
          selectedFlavour: p4.flavours[0],
          selectedSize: p4.sizes[0],
          imageRepresentation: p4.images[0]
        }
      ],
      subtotal: p1.discountPrice + (p4.discountPrice * 2),
      tax: Math.round((p1.discountPrice + p4.discountPrice * 2) * 0.18),
      shippingCharge: 0,
      discountAmount: 0,
      total: Math.round((p1.discountPrice + p4.discountPrice * 2) * 1.18),
      status: 'Delivered',
      date: '2026-06-10T11:22:00Z',
      shippingAddress: {
        id: 'addr-client-1',
        name: 'Vansh Tomar',
        addressLine1: 'Section 4, Row Housing 22',
        city: 'Noida',
        state: 'Uttar Pradesh',
        postalCode: '201301',
        country: 'India',
        phone: '+91 88888 77777',
        isDefault: true
      },
      paymentMethod: 'Credit Card (Paid via Gateway)',
      paymentStatus: 'Paid',
      trackingId: 'TX-92837482-IND',
      trackingLogs: [
        { time: '2026-06-10T11:30:00Z', status: 'Payment Received', description: 'Order was successfully verified' },
        { time: '2026-06-11T09:12:00Z', status: 'Shipped', description: 'Handed over to Delhivery logistics' },
        { time: '2026-06-13T14:45:00Z', status: 'Delivered', description: 'Package was signed by customer' }
      ]
    },
    {
      id: 'ord-102',
      orderNumber: 'SCOOP-49120-ORD',
      customerEmail: 'karan@gmail.com',
      customerName: 'Karan Malhotra',
      items: [
        {
          id: p5.id,
          productName: p5.name,
          productCategory: p5.category,
          quantity: 1,
          price: p5.discountPrice,
          selectedFlavour: p5.flavours[0],
          selectedSize: p5.sizes[0],
          imageRepresentation: p5.images[0]
        }
      ],
      subtotal: p5.discountPrice,
      tax: Math.round(p5.discountPrice * 0.18),
      shippingCharge: 150,
      discountAmount: 250,
      total: Math.round((p5.discountPrice * 1.18) + 150 - 250),
      status: 'Processing',
      date: '2026-06-15T09:15:00Z',
      shippingAddress: {
        id: 'addr-k-1',
        name: 'Karan Malhotra',
        addressLine1: 'Flat 503, Green Glen Heights',
        city: 'Bengaluru',
        state: 'Karnataka',
        postalCode: '560103',
        country: 'India',
        phone: '+91 97777 66666',
        isDefault: true
      },
      paymentMethod: 'UPI (GPay)',
      paymentStatus: 'Paid',
      trackingId: 'TX-10928374-IND',
      trackingLogs: [
        { time: '2026-06-15T09:15:00Z', status: 'Order Submitted', description: 'Awaiting shipping preparation' }
      ]
    }
  ];
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Routing State
  const [view, setView] = useState<AppView>('home');
  const [activeProductId, setActiveProductId] = useState<string | null>(null);
  const [activeOrderId, setActiveOrderId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Core Data Lists
  const [products, setProducts] = useState<Product[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  // Initialize data on load either from localStorage or seeds
  useEffect(() => {
    // 1. Products
    const storedProducts = localStorage.getItem('scoop_products');
    let loadedProducts = PRODUCTS;
    if (storedProducts) {
      try {
        loadedProducts = JSON.parse(storedProducts);
      } catch (e) {
        console.error("Failed to parse products, resetting to template", e);
      }
    }
    setProducts(loadedProducts);
    localStorage.setItem('scoop_products', JSON.stringify(loadedProducts));

    // 2. Users
    const storedUsers = localStorage.getItem('scoop_users');
    let loadedUsers = DEFAULT_USERS;
    if (storedUsers) {
      try {
        loadedUsers = JSON.parse(storedUsers);
      } catch (e) {
        console.error("Failed to parse users", e);
      }
    }
    setUsers(loadedUsers);
    localStorage.setItem('scoop_users', JSON.stringify(loadedUsers));

    // 3. Current User Session
    const storedSession = localStorage.getItem('scoop_current_user');
    if (storedSession) {
      try {
        setCurrentUser(JSON.parse(storedSession));
      } catch (e) {
        console.error("Failed to load user session", e);
      }
    }

    // 4. Wishlist
    const storedWishlist = localStorage.getItem('scoop_wishlist');
    if (storedWishlist) {
      try {
        setWishlist(JSON.parse(storedWishlist));
      } catch (e) {}
    }

    // 5. Cart
    const storedCart = localStorage.getItem('scoop_cart');
    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart));
      } catch (e) {}
    }

    // 6. Coupons
    const storedCoupons = localStorage.getItem('scoop_coupons');
    let loadedCoupons = SAMPLE_COUPONS as Coupon[];
    if (storedCoupons) {
      try {
        loadedCoupons = JSON.parse(storedCoupons);
      } catch (e) {}
    }
    setCoupons(loadedCoupons);
    localStorage.setItem('scoop_coupons', JSON.stringify(loadedCoupons));

    // 7. Orders
    const storedOrders = localStorage.getItem('scoop_orders');
    let loadedOrders = generateSeedOrders(loadedProducts);
    if (storedOrders) {
      try {
        loadedOrders = JSON.parse(storedOrders);
      } catch (e) {}
    }
    setOrders(loadedOrders);
    localStorage.setItem('scoop_orders', JSON.stringify(loadedOrders));

    // 8. Recently Viewed
    const storedRecently = localStorage.getItem('scoop_recently_viewed');
    if (storedRecently) {
      try {
        setRecentlyViewed(JSON.parse(storedRecently));
      } catch (e) {}
    }
  }, []);

  // Helper utility to update state and localStorage together
  const updateProductsState = (newProducts: Product[]) => {
    setProducts(newProducts);
    localStorage.setItem('scoop_products', JSON.stringify(newProducts));
  };

  const updateUsersState = (newUsers: User[]) => {
    setUsers(newUsers);
    localStorage.setItem('scoop_users', JSON.stringify(newUsers));
    // Support visual sync for current user updates
    if (currentUser) {
      const match = newUsers.find(u => u.email === currentUser.email);
      if (match) {
        setCurrentUser(match);
        localStorage.setItem('scoop_current_user', JSON.stringify(match));
      }
    }
  };

  const updateOrdersState = (newOrders: Order[]) => {
    setOrders(newOrders);
    localStorage.setItem('scoop_orders', JSON.stringify(newOrders));
  };

  const updateCouponsState = (newCoupons: Coupon[]) => {
    setCoupons(newCoupons);
    localStorage.setItem('scoop_coupons', JSON.stringify(newCoupons));
  };

  // --- Router Navigation ---
  const navigateToProduct = (id: string) => {
    setActiveProductId(id);
    addToRecentlyViewed(id);
    setView('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToOrder = (id: string) => {
    setActiveOrderId(id);
    setView('order-success');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- Product Catalog Handlers (Admin) ---
  const addProduct = (product: Product) => {
    const updated = [product, ...products];
    updateProductsState(updated);
  };

  const updateProduct = (product: Product) => {
    const updated = products.map(p => p.id === product.id ? product : p);
    updateProductsState(updated);
  };

  const deleteProduct = (id: string) => {
    const updated = products.filter(p => p.id !== id);
    updateProductsState(updated);
  };

  // --- Authentication ---
  const login = (email: string, password?: string) => {
    const trimmedEmail = email.toLowerCase().trim();
    
    // Check if user exists
    let matchedUser = users.find(u => u.email.toLowerCase() === trimmedEmail);
    
    if (!matchedUser) {
      // If logging in as pre-defined admin, create account if not seed loaded
      if (trimmedEmail === ADMIN_EMAIL.toLowerCase()) {
        const admin: User = {
          email: ADMIN_EMAIL,
          name: 'Chief Brand Admin (2ScoopNutritoon)',
          role: 'Admin',
          verified: true,
          joinedDate: new Date().toISOString().split('T')[0],
          addresses: [
            {
              id: 'addr-admin-custom',
              name: '2ScoopNutritoon Hub Office',
              addressLine1: 'Level 14, Premium Fitness Arcade',
              city: 'Mumbai',
              state: 'Maharashtra',
              postalCode: '400013',
              country: 'India',
              phone: '+91 91999 88888',
              isDefault: true
            }
          ]
        };
        const updatedUsers = [...users, admin];
        updateUsersState(updatedUsers);
        matchedUser = admin;
      } else {
        // Automatically create account as a fast user-friendly checkout helper if registering first isn't preferred
        return { success: false, message: 'User profile does not exist. Please use the Register form below.' };
      }
    }

    setCurrentUser(matchedUser);
    localStorage.setItem('scoop_current_user', JSON.stringify(matchedUser));

    // Strict role detection
    if (matchedUser.role === 'Admin') {
      setView('admin-panel');
      return { success: true, message: 'Welcome Admin! Dynamic redirection to standard admin console.', role: 'Admin' };
    } else {
      setView('profile');
      return { success: true, message: 'Logged in successfully.', role: 'Customer' };
    }
  };

  const register = (name: string, email: string, phone: string) => {
    const trimmedEmail = email.toLowerCase().trim();
    if (users.some(u => u.email.toLowerCase() === trimmedEmail)) {
      return { success: false, message: 'This email is already registered.' };
    }

    const isAdm = trimmedEmail === ADMIN_EMAIL.toLowerCase();

    const newUser: User = {
      email: trimmedEmail,
      name,
      role: isAdm ? 'Admin' : 'Customer',
      verified: isAdm, // Admin is auto verified, user is pre-verified on clicking verify
      joinedDate: new Date().toISOString().split('T')[0],
      addresses: []
    };

    const updatedUsers = [...users, newUser];
    updateUsersState(updatedUsers);
    
    // Login newly registered user
    setCurrentUser(newUser);
    localStorage.setItem('scoop_current_user', JSON.stringify(newUser));

    if (newUser.role === 'Admin') {
      setView('admin-panel');
    } else {
      setView('profile');
    }

    return { success: true, message: 'Welcome to the 2ScoopNutritoon Athletes Club!' };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('scoop_current_user');
    setView('home');
    setAppliedCoupon(null);
  };

  const saveAddress = (address: Address) => {
    if (!currentUser) return;
    let oldAddresses = [...currentUser.addresses];
    
    if (address.id.startsWith('new-')) {
      const generated: Address = {
        ...address,
        id: 'addr-' + Date.now()
      };
      if (generated.isDefault) {
        oldAddresses = oldAddresses.map(a => ({ ...a, isDefault: false }));
      }
      oldAddresses.push(generated);
    } else {
      if (address.isDefault) {
        oldAddresses = oldAddresses.map(a => ({ ...a, isDefault: false }));
      }
      oldAddresses = oldAddresses.map(a => a.id === address.id ? address : a);
    }

    // Guarantee default exists
    if (oldAddresses.length > 0 && !oldAddresses.some(a => a.isDefault)) {
      oldAddresses[0].isDefault = true;
    }

    const updatedUsers = users.map(u => 
      u.email === currentUser.email ? { ...u, addresses: oldAddresses } : u
    );
    updateUsersState(updatedUsers);
  };

  const deleteAddress = (id: string) => {
    if (!currentUser) return;
    const remaining = currentUser.addresses.filter(a => a.id !== id);
    if (remaining.length > 0 && !remaining.some(a => a.isDefault)) {
      remaining[0].isDefault = true;
    }
    const updatedUsers = users.map(u => 
      u.email === currentUser.email ? { ...u, addresses: remaining } : u
    );
    updateUsersState(updatedUsers);
  };

  const verifyUserEmail = () => {
    if (!currentUser) return;
    const updatedUsers = users.map(u => 
      u.email === currentUser.email ? { ...u, verified: true } : u
    );
    updateUsersState(updatedUsers);
  };

  // --- Cart System ---
  const addToCart = (product: Product, quantity: number, flavour: string, size: string) => {
    const existingIndex = cart.findIndex(item => 
      item.product.id === product.id && 
      item.selectedFlavour === flavour && 
      item.selectedSize === size
    );

    let newCart = [...cart];
    if (existingIndex > -1) {
      newCart[existingIndex].quantity += quantity;
    } else {
      newCart.push({
        product,
        quantity,
        selectedFlavour: flavour,
        selectedSize: size
      });
    }
    setCart(newCart);
    localStorage.setItem('scoop_cart', JSON.stringify(newCart));
  };

  const removeFromCart = (index: number) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
    localStorage.setItem('scoop_cart', JSON.stringify(newCart));
    if (newCart.length === 0) {
      setAppliedCoupon(null);
    }
  };

  const updateCartQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(index);
      return;
    }
    const newCart = [...cart];
    newCart[index].quantity = quantity;
    setCart(newCart);
    localStorage.setItem('scoop_cart', JSON.stringify(newCart));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('scoop_cart');
    setAppliedCoupon(null);
  };

  const applyCoupon = (code: string) => {
    const match = coupons.find(c => c.code.toUpperCase() === code.toUpperCase() && c.isActive);
    if (!match) {
      return { success: false, message: 'Invalid or deactivated coupon.' };
    }
    
    // Calculate subtotal
    const subtotal = cart.reduce((acc, item) => acc + (item.product.discountPrice * item.quantity), 0);
    if (subtotal < match.minSpend) {
      return { success: false, message: `Minimum spend of ₹${match.minSpend} required for this coupon.` };
    }

    setAppliedCoupon(match);
    return { success: true, message: `Coupon Applied Successfully: ${match.description}` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  // Re-calculate cart totals dynamically
  const getCalculatedTotals = () => {
    const subtotal = cart.reduce((acc, item) => acc + (item.product.discountPrice * item.quantity), 0);
    let discount = 0;
    if (appliedCoupon) {
      if (appliedCoupon.type === 'percentage') {
        discount = Math.round(subtotal * (appliedCoupon.value / 100));
      } else {
        discount = appliedCoupon.value;
      }
    }
    
    // 18% GST calculation
    const taxableBase = Math.max(0, subtotal - discount);
    const tax = Math.round(taxableBase * 0.18);
    
    // Free shipping above ₹999
    const shipping = (taxableBase > 999 || taxableBase === 0) ? 0 : 150;
    const total = taxableBase + tax + shipping;

    return { subtotal, tax, shipping, discount, total };
  };

  const cartTotals = getCalculatedTotals();

  // --- Wishlist ---
  const toggleWishlist = (productId: string) => {
    let updated: string[];
    if (wishlist.includes(productId)) {
      updated = wishlist.filter(id => id !== productId);
    } else {
      updated = [...wishlist, productId];
    }
    setWishlist(updated);
    localStorage.setItem('scoop_wishlist', JSON.stringify(updated));
  };

  // --- Recently Viewed ---
  const addToRecentlyViewed = (productId: string) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(id => id !== productId);
      const updated = [productId, ...filtered].slice(0, 5); // Keep last 5
      localStorage.setItem('scoop_recently_viewed', JSON.stringify(updated));
      return updated;
    });
  };

  // --- Create Orders ---
  const createOrder = (address: Address, paymentMethod: string) => {
    const timestamp = new Date().toISOString();
    const cleanNumbers = Math.floor(10000 + Math.random() * 90000);
    const nbr = `SCOOP-${cleanNumbers}-ORD`;
    
    const totals = getCalculatedTotals();
    
    const itemsList: OrderItem[] = cart.map(item => ({
      id: item.product.id,
      productName: item.product.name,
      productCategory: item.product.category,
      quantity: item.quantity,
      price: item.product.discountPrice,
      selectedFlavour: item.selectedFlavour,
      selectedSize: item.selectedSize,
      imageRepresentation: item.product.images[0]
    }));

    // Deduct stock levels dynamically representing high production value
    const updatedProducts = products.map(prod => {
      const isOrdered = cart.find(i => i.product.id === prod.id);
      if (isOrdered) {
        const newCount = Math.max(0, prod.stockCount - isOrdered.quantity);
        return {
          ...prod,
          stockCount: newCount,
          stockStatus: newCount === 0 ? 'Out of Stock' : newCount < 10 ? 'Low Stock' : 'In Stock' as any
        };
      }
      return prod;
    });
    updateProductsState(updatedProducts);

    const newOrder: Order = {
      id: 'ord-' + Date.now(),
      orderNumber: nbr,
      customerEmail: currentUser?.email || 'guest@2scoopnutritoon.com',
      customerName: currentUser?.name || 'Guest Athlete',
      items: itemsList,
      subtotal: totals.subtotal,
      tax: totals.tax,
      shippingCharge: totals.shipping,
      discountAmount: totals.discount,
      total: totals.total,
      couponApplied: appliedCoupon?.code,
      status: 'Pending',
      date: timestamp,
      shippingAddress: address,
      paymentMethod,
      paymentStatus: paymentMethod === 'Cash On Delivery' ? 'Pending' : 'Paid',
      trackingId: 'TX-' + Math.floor(10000000 + Math.random() * 90000000) + '-IND',
      trackingLogs: [
        { time: timestamp, status: 'Order Submitted', description: 'Your order is recorded in the 2ScoopNutritoon system.' }
      ]
    };

    updateOrdersState([newOrder, ...orders]);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    const updated = orders.map(o => {
      if (o.id === orderId) {
        const timeLog = new Date().toISOString();
        const logs = [...(o.trackingLogs || [])];
        logs.push({
          time: timeLog,
          status: status,
          description: `Order milestone: Transferred to ${status}.`
        });
        return { 
          ...o, 
          status, 
          trackingLogs: logs,
          paymentStatus: status === 'Delivered' ? 'Paid' as const : o.paymentStatus
        };
      }
      return o;
    });
    updateOrdersState(updated);
  };

  const addTrackingLog = (orderId: string, status: string, description: string) => {
    const updated = orders.map(o => {
      if (o.id === orderId) {
        const logs = [...(o.trackingLogs || [])];
        logs.push({
          time: new Date().toISOString(),
          status,
          description
        });
        return { ...o, trackingLogs: logs };
      }
      return o;
    });
    updateOrdersState(updated);
  };

  // --- Admin Coupon Tools ---
  const addCoupon = (coupon: Coupon) => {
    // lowercase code for duplicate guards
    const exists = coupons.some(c => c.code.toLowerCase() === coupon.code.toLowerCase());
    if (exists) return;
    const updated = [coupon, ...coupons];
    updateCouponsState(updated);
  };

  const toggleCouponStatus = (code: string) => {
    const updated = coupons.map(c => 
      c.code === code ? { ...c, isActive: !c.isActive } : c
    );
    updateCouponsState(updated);
  };

  const deleteCoupon = (code: string) => {
    const updated = coupons.filter(c => c.code !== code);
    updateCouponsState(updated);
  };

  return (
    <AppContext.Provider value={{
      view, setView,
      activeProductId, navigateToProduct,
      activeOrderId, navigateToOrder,
      searchQuery, setSearchQuery,
      selectedCategory, setSelectedCategory,

      products, addProduct, updateProduct, deleteProduct,
      currentUser, users, login, register, logout, saveAddress, deleteAddress, verifyUserEmail,

      cart, addToCart, removeFromCart, updateCartQuantity, clearCart,
      appliedCoupon, applyCoupon, removeCoupon, cartTotals,

      wishlist, toggleWishlist,

      orders, createOrder, updateOrderStatus, addTrackingLog,

      coupons, addCoupon, toggleCouponStatus, deleteCoupon,

      recentlyViewed, addToRecentlyViewed
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppState must be used inside an AppProvider');
  }
  return context;
};
