import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const SubscriptionModal = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // Disable scroll when modal is open
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
      document.body.style.overflow = "hidden";
    }, 10000); // Show modal after 10 seconds

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "auto";
    };
  }, []);

  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = "auto";
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/10">
      <div className="bg-white/70 backdrop-blur-xl p-6 rounded-2xl shadow-xl w-full max-w-md mx-4 border border-gray-200 relative">
        <h2 className="text-2xl font-bold text-center text-cyan-700 mb-3">
          🎉 Unlock Premium Experience!
        </h2>
        <p className="text-gray-700 text-center mb-5">
          Get access to exclusive articles, premium content, and an ad-free reading experience.
        </p>
        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate("/subscription")}
            className="bg-cyan-600 hover:bg-cyan-700 text-white py-2 rounded-md font-semibold"
          >
            Go to Subscription
          </button>
          <button
            onClick={closeModal}
            className="text-gray-500 text-sm underline hover:text-gray-700"
          >
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionModal;
