export interface Product {
  _id: string;
  name: string;
  imageUrl: string;
  description: string;
  originalPrice: number;
  purchasePrice: number;
  driveLink: string;
  createdAt: string;
}

export interface Customer {
  name: string;
  email: string;
  phone: string;
}

export interface CreateOrderRequest {
  amount: number;
  productId: string;
  customerId: string;
}

export interface CreateOrderResponse {
  id: string;
  amount: number;
  currency: string;
  receipt: string;
}

export interface VerifyPaymentRequest {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export interface VerifyPaymentResponse {
  success: boolean;
  message: string;
  product?: Product;
}