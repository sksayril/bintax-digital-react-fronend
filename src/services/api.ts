import { Customer, CreateOrderRequest, VerifyPaymentRequest } from '../types';

const API_BASE_URL = 'https://api.bintax.co.in/api';

export const fetchProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const createCustomer = async (customerData: Customer) => {
  try {
    const response = await fetch(`${API_BASE_URL}/customers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: customerData.name,
        email: customerData.email,
        phone: customerData.phone
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create customer');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating customer:', error);
    throw error;
  }
};

export const createOrder = async (orderData: CreateOrderRequest) => {
  try {
    // Log the incoming order data to check its structure
    console.log('Raw order data received:', orderData);
    
    // Validate that all required fields are present
    if (!orderData.amount || orderData.amount <= 0) {
      console.error('Invalid amount value:', orderData.amount);
      throw new Error('Amount is required and must be greater than 0');
    }
    
    if (!orderData.productId) {
      console.error('Missing productId');
      throw new Error('ProductId is required');
    }
    
    if (!orderData.customerId) {
      console.error('Missing customerId');
      throw new Error('CustomerId is required');
    }

    // Ensure correct data types
    const validOrderData = {
      amount: Number(orderData.amount),
      productId: String(orderData.productId),
      customerId: String(orderData.customerId)
    };

    console.log('Sending order data to API:', validOrderData);

    const response = await fetch(`${API_BASE_URL}/payments/create-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(validOrderData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create order');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

export const verifyPayment = async (paymentData: VerifyPaymentRequest) => {
  try {
    const response = await fetch(`${API_BASE_URL}/payments/verify-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(paymentData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to verify payment');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error verifying payment:', error);
    throw error;
  }
};