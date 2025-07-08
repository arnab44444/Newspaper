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
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4 text-center">Complete Your Payment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <CardElement className="p-3 border rounded" />
        <button
          type="submit"
          disabled={!stripe}
          className="w-full py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700"
        >
          Pay ${amount}
        </button>
        {error && <p className="text-red-600 text-sm">{error}</p>}
      </form>
    </div>
  );
};

export default PaymentForm;
