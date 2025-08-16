import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const SubscriptionSection = () => {
  const [showModal, setShowModal] = useState(false);
  const [period, setPeriod] = useState("1 Month");
  const [price, setPrice] = useState(10);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const navigate = useNavigate();
  const { user } = use(AuthContext);
  const axiosSecure = useAxiosSecure();

  const periodOptions = [
    { label: "1 Minute (Test)", value: 0.5 },
    { label: "1 Month", value: 10 },
    { label: "3 Months", value: 25 },
    { label: "6 Months", value: 45 },
    { label: "12 Months", value: 80 },
  ];

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showModal]);

  useEffect(() => {
    const checkPremium = async () => {
      if (user?.email) {
        try {
          await axiosSecure.patch(`/users/premium-reset/${user.email}`);
        } catch (err) {
          console.error("Premium check failed", err);
        }
      }
    };
    checkPremium();
  }, [user?.email]);

  const handlePeriodChange = (e) => {
    const selected = periodOptions.find((p) => p.label === e.target.value);
    setPeriod(selected.label);
    setPrice(selected.value);
  };

  const handlePay = (email) => {
    if (!email) return alert("User not logged in");

    if (price < 0.5) {
      alert("⚠️ Minimum payment amount is $0.50");
      return;
    }

    navigate(`/payment/${email}`, {
      state: {
        amount: price,
        period: period,
      },
    });
  };

  return (
    <div className="py-20 px-4 bg-gradient-to-br from-white via-cyan-50 to-white">
      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10">
        {/* Left Content */}
        <div className="md:w-1/2 space-y-5">
          <h2 className="text-4xl font-extrabold text-gray-900 leading-snug">
            Unlock <span className="text-cyan-600">Premium News</span> Today
          </h2>
          <p className="text-gray-600 text-lg">
            Dive deeper into exclusive articles, expert opinions, and ad-free
            browsing. Stay informed like never before.
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="bg-cyan-700 hover:bg-cyan-800 text-white font-semibold py-3 px-6 rounded-lg shadow hover:brightness-110 transition"
          >
            🛒 Subscribe Now
          </button>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2">
          <img
            src="https://i.ibb.co/wNY08FpL/10946092-4611873.jpg"
            alt="Subscription"
            className="w-full max-w-md mx-auto rounded-xl shadow"
          />
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-transparent bg-opacity-60 flex items-center justify-center px-4">
          <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 w-full max-w-md shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold mb-5 text-center text-gray-800">
              Select Your Subscription
            </h3>

            <label className="block mb-2 text-gray-700 font-medium">
              Subscription Period
            </label>
            <select
              onChange={handlePeriodChange}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              value={period}
            >
              {periodOptions.map((option, idx) => (
                <option key={idx} value={option.label}>
                  {option.label} — ${option.value}
                </option>
              ))}
            </select>

            <p className="text-lg text-gray-700 font-semibold mb-4">
              Total: <span className="text-cyan-600">${price}</span>
            </p>

            <button
              onClick={() => handlePay(user?.email)}
              className="w-full bg-cyan-700 hover:bg-cyan-800 text-white py-2 rounded font-semibold transition"
            >
              Pay & Activate
            </button>

            <button
              onClick={() => {
                setShowModal(false);
                setShowPaymentForm(false);
              }}
              className="mt-4 text-sm text-center text-gray-500 hover:underline w-full"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionSection;
