import React, { use, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useLocation, useNavigate, useParams } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { AuthContext } from '../../provider/AuthProvider';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = use(AuthContext);
  const navigate = useNavigate();
  const { email } = useParams(); // from /payment/:email
  const location = useLocation();

  const { amount, period } = location.state || {};
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    // Step 1: Create payment method
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      setError(error.message);
      return;
    }

    // Step 2: Create payment intent
    const res = await axiosSecure.post('/create-payment-intent', {
      amount: parseFloat(amount) * 100,
    });

    const clientSecret = res.data.clientSecret;

    // Step 3: Confirm payment
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          name: user.displayName || 'Anonymous',
          email: user.email || 'no-email',
        },
      },
    });

    if (result.error) {
      setError(result.error.message);
    } else if (result.paymentIntent.status === 'succeeded') {
      const transactionId = result.paymentIntent.id;

      // Step 4: Save payment record
      const paymentData = {
        email,
        amount,
        period,
        transactionId,
      };

      const saveRes = await axiosSecure.post('/payments', paymentData);
      if (saveRes.data.insertedId) {
        await Swal.fire({
          icon: 'success',
          title: 'Payment Successful!',
          html: `Transaction ID: <code>${transactionId}</code>`,
          confirmButtonText: 'OK',
        });

        navigate('/');
      }
    }
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 via-white to-gray-100 px-4">
    <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 border border-gray-200">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        💳 Complete Your Payment
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Card Details
          </label>
          <div className="p-3 border border-gray-300 rounded focus-within:ring-2 focus-within:ring-cyan-500 transition">
            <CardElement />
          </div>
        </div>

        <button
          type="submit"
          disabled={!stripe}
          className="w-full py-2 bg-cyan-700 text-white font-semibold rounded-md hover:bg-cyan-800 transition"
        >
          Pay ${amount}
        </button>

        {error && (
          <p className="text-red-600 text-sm text-center">{error}</p>
        )}
      </form>
    </div>
  </div>
);

};

export default PaymentForm;
