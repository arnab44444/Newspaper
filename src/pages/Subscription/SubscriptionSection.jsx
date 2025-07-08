import React, { use, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { useNavigate } from "react-router";

const SubscriptionSection = () => {
  const [showModal, setShowModal] = useState(false);
  const [period, setPeriod] = useState("1 Month");
  const [price, setPrice] = useState(10);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const navigate = useNavigate(); // Assuming you have react-router set up

  const {user} = use(AuthContext); // Assuming you have AuthContext set up

  console.log("User:", user.email);

  const periodOptions = [
  { label: "1 Minute (Test)", value: 0.5 },
  { label: "1 Month", value: 10 },
  { label: "3 Months", value: 25 },
  { label: "6 Months", value: 45 },
  { label: "12 Months", value: 80 },
];


// const handlePay = (email) => {
//   if (!email) return alert("User not logged in");
//   console.log("Proceed to payment for", email);
//   navigate(`/payment/${email}`);
// };

const handlePay = (email) => {
  if (!email) return alert("User not logged in");

  if (price < 0.5) {
    alert("⚠️ Minimum payment amount is $0.50");
    return;
  }

  console.log("Proceed to payment for", email);
  navigate(`/payment/${email}`, {
    state: {
      amount: price,
      period: period,
    },
  });
};


  const handlePeriodChange = (e) => {
    const selected = periodOptions.find(p => p.label === e.target.value);
    setPeriod(selected.label);
    setPrice(selected.value);
  };

  return (
    <div className="bg-white py-10 px-4 flex flex-col md:flex-row items-center justify-center max-w-6xl mx-auto">
      {/* Left Content */}
      <div className="md:w-1/2 space-y-4">
        <h2 className="text-3xl font-bold text-gray-800">
          Unlock Exclusive Insights with <br /> <span className="text-cyan-600">Pixel News Premium</span>
        </h2>
        <p className="text-gray-600">
          Elevate your news experience with our Premium Subscription. Access exclusive
          articles, in-depth analysis, and ad-free browsing to stay informed and ahead of the curve.
        </p>
        <button
          onClick={() => setShowModal(true)}
          className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold py-2 px-6 rounded shadow hover:scale-105 transition"
        >
          🛒 GET SUBSCRIPTION
        </button>
      </div>

      {/* Right Image */}
      <div className="md:w-1/2 mt-6 md:mt-0">
        <img
          src="https://i.ibb.co/wNY08FpL/10946092-4611873.jpg"
          alt="Subscription"
          className="w-full"
        />
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-200 rounded-lg p-6 w-full max-w-md shadow-lg">
            <h3 className="text-xl font-semibold mb-4 text-center">Choose Subscription Period</h3>

            <div className="mb-4">
              <label className="block mb-1 font-medium text-gray-700">Subscription Period</label>
              <select
                onChange={handlePeriodChange}
                className="w-full p-2 border rounded"
              >
                {periodOptions.map((option, idx) => (
                  <option key={idx} value={option.label}>{option.label} - ${option.value}</option>
                ))}
              </select>
            </div>

            <p className="text-gray-800 font-semibold mb-4">
              Total: <span className="text-cyan-600">${price}</span>
            </p>

            {!showPaymentForm ? (
              <button
                onClick={() => handlePay(user?.email)}
                className="w-full bg-cyan-600 text-white py-2 rounded hover:bg-cyan-700"
              >
                Pay
              </button>
            ) : (
              <div className="border-t pt-4 mt-4">
                <h4 className="text-lg font-semibold mb-2">Payment Form</h4>
                <p className="text-sm text-gray-500 mb-2">
                  This is where your script-based payment integration will appear.
                </p>
                <div className="p-4 border border-dashed rounded text-center text-sm text-gray-400">
                  💳 Payment form placeholder (you will add your script here)
                </div>
              </div>
            )}

            <button
              onClick={() => {
                setShowModal(false);
                setShowPaymentForm(false);
              }}
              className="mt-4 text-sm text-gray-500 hover:underline block text-center"
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
