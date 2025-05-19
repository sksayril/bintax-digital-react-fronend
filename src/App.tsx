import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductsList from './components/ProductsList';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import CustomerForm from './components/CustomerForm';
import PaymentSuccess from './components/PaymentSuccess';
import { Customer, Product, CreateOrderRequest, VerifyPaymentRequest } from './types';
import { fetchProducts, createCustomer, createOrder, verifyPayment } from './services/api';

// Declare Razorpay type
declare global {
  interface Window {
    Razorpay: any;
  }
}

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showCustomerForm, setShowCustomerForm] = useState<boolean>(false);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState<boolean>(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [purchasedProduct, setPurchasedProduct] = useState<Product | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState<boolean>(false);
  const [processingProductId, setProcessingProductId] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error('Failed to load products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();

    // Load Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handlePurchase = (product: Product) => {
    setSelectedProduct(product);
    setShowCustomerForm(true);
    setProcessingProductId(product._id);
  };

  const handleCustomerSubmit = async (customer: Customer) => {
    if (!selectedProduct) return;

    setIsProcessingPayment(true);
    try {
      // Create customer
      const customerResponse = await createCustomer(customer);
      
      // Log the full response to see its structure
      console.log('Full customer response:', JSON.stringify(customerResponse));
      
      // Try to extract the customer ID from various possible response formats
      // The API might return the ID in different formats depending on the backend structure
      let customerId;
      
      if (typeof customerResponse === 'object' && customerResponse !== null) {
        // Direct _id at the root level
        if (customerResponse._id) {
          customerId = customerResponse._id;
        } 
        // ID might be in a data property
        else if (customerResponse.data && customerResponse.data._id) {
          customerId = customerResponse.data._id;
        }
        // ID might just be called 'id' instead of '_id'
        else if (customerResponse.id) {
          customerId = customerResponse.id;
        }
        // ID might be in a nested customer object
        else if (customerResponse.customer && customerResponse.customer._id) {
          customerId = customerResponse.customer._id;
        }
      }
      
      if (!customerId) {
        console.error('Customer ID not found in any expected location:', customerResponse);
        throw new Error('Failed to get customer ID from response');
      }
      
      console.log('Customer created with ID:', customerId);

      // Create order with explicit types to ensure correct data format
      const orderData: CreateOrderRequest = {
        amount: selectedProduct.purchasePrice,
        productId: selectedProduct._id,
        customerId: customerId
      };
      
      // Log the order data to verify all fields are present
      console.log('Creating order with data:', JSON.stringify(orderData));

      const orderResponse = await createOrder(orderData);

      // Initialize Razorpay
      const options = {
        key: 'rzp_test_Oy62IkchWuGtwR', // Replace with your Razorpay Key ID
        amount: selectedProduct.purchasePrice * 100, // Amount in smallest currency unit (paise)
        currency: 'INR',
        name: 'BintaxDigital',
        description: `Purchase of ${selectedProduct.name}`,
        order_id: orderResponse.id,
        handler: function (response: any) {
          handlePaymentSuccess(response);
        },
        prefill: {
          name: customer.name,
          email: customer.email,
          contact: customer.phone
        },
        theme: {
          color: '#4F46E5'
        },
        modal: {
          ondismiss: function() {
            setPaymentError('Payment cancelled');
            setIsProcessingPayment(false);
            setProcessingProductId(null);
            setTimeout(() => setPaymentError(null), 5000);
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
      
      // Close the customer form
      setShowCustomerForm(false);
    } catch (error: any) {
      console.error('Error during checkout process:', error);
      setPaymentError(error.message || 'An error occurred during checkout. Please try again.');
      setIsProcessingPayment(false);
      setProcessingProductId(null);
      setTimeout(() => setPaymentError(null), 5000);
    }
  };

  const handlePaymentSuccess = async (response: any) => {
    if (!selectedProduct) return;

    try {
      const paymentData: VerifyPaymentRequest = {
        razorpay_order_id: response.razorpay_order_id,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature
      };

      console.log('Verifying payment with data:', paymentData);
      const result = await verifyPayment(paymentData);
      console.log('Payment verification response:', result);

      // Handle the new response format
      if (result.status === 'success' || result.success) {
        console.log('Payment successfully verified');
        setPurchasedProduct(selectedProduct);
        setShowPaymentSuccess(true);
      } else {
        console.error('Payment verification failed:', result);
        setPaymentError('Payment verification failed. Please contact support.');
        setTimeout(() => setPaymentError(null), 5000);
      }
    } catch (error: any) {
      console.error('Error verifying payment:', error);
      setPaymentError(error.message || 'Payment verification failed. Please contact support.');
      setTimeout(() => setPaymentError(null), 5000);
    } finally {
      setIsProcessingPayment(false);
      setProcessingProductId(null);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <ProductsList 
        products={products} 
        onPurchase={handlePurchase} 
        isLoading={isLoading}
        processingProductId={processingProductId}
      />
      <Features />
      <Testimonials />
      <Footer />

      {/* Customer Form Modal */}
      {showCustomerForm && selectedProduct && (
        <CustomerForm 
          product={selectedProduct} 
          onSubmit={handleCustomerSubmit} 
          onCancel={() => {
            setShowCustomerForm(false);
            setProcessingProductId(null);
          }}
          isSubmitting={isProcessingPayment}
        />
      )}

      {/* Payment Success Modal */}
      {showPaymentSuccess && purchasedProduct && (
        <PaymentSuccess 
          product={purchasedProduct} 
          onClose={() => {
            setShowPaymentSuccess(false);
            setPurchasedProduct(null);
          }} 
        />
      )}

      {/* Payment Error Toast */}
      {paymentError && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-3 rounded-md shadow-lg animate-fade-in">
          {paymentError}
        </div>
      )}
    </div>
  );
}

export default App;