export type ProductStatus = 'In Stock' | 'Low Stock' | 'Out of Stock';

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface NutritionFact {
  name: string;
  amount: string;
  dailyValue?: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  ingredients: string;
  benefits: string[];
  usageInstructions: string;
  flavours: string[];
  sizes: string[];
  mrp: number;
  discountPrice: number;
  stockStatus: ProductStatus;
  stockCount: number;
  rating: number;
  reviews: Review[];
  images: string[]; // Gradient CSS key or icon-representation to render ultra-premium custom SVG containers
  servingSize?: string;
  servingsPerContainer?: number;
  nutritionFacts: NutritionFact[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedFlavour: string;
  selectedSize: string;
}

export interface Address {
  id: string;
  name: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

export type UserRole = 'Customer' | 'Admin';

export interface User {
  email: string;
  name: string;
  role: UserRole;
  verified: boolean;
  addresses: Address[];
  joinedDate: string;
}

export type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface OrderItem {
  id: string;
  productName: string;
  productCategory: string;
  quantity: number;
  price: number;
  selectedFlavour: string;
  selectedSize: string;
  imageRepresentation: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerEmail: string;
  customerName: string;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shippingCharge: number;
  discountAmount: number;
  total: number;
  couponApplied?: string;
  status: OrderStatus;
  date: string;
  shippingAddress: Address;
  paymentMethod: string;
  paymentStatus: 'Paid' | 'Pending' | 'Refunded';
  trackingId?: string;
  trackingLogs?: { status: string; description: string; time: string }[];
}

export interface Coupon {
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minSpend: number;
  isActive: boolean;
  description: string;
}

export interface FAQ {
  question: string;
  answer: string;
  category: string;
}
