import React from "react";
import { FaTimes } from "react-icons/fa";

const SubscriptionModal = ({ subscription, onClose }) => {
  const calculateDaysRemaining = (endDate) => {
    const end = new Date(endDate);
    const today = new Date();
    const diffTime = end - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#212121] rounded-2xl p-8 max-w-2xl w-full shadow-2xl border border-[#d90a14]/30 relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
        >
          <FaTimes size={24} />
        </button>

        {/* Title */}
        <h2
          className="text-3xl font-bold text-white mb-6 uppercase tracking-wider"
          style={{ fontFamily: "Gagalin, sans-serif" }}
        >
          My <span className="text-[#ff6b00]">Subscription</span>
        </h2>

        {!subscription ? (
          <div className="text-center py-8">
            <p className="text-gray-400 text-lg mb-4">
              You don't have an active subscription yet.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-[#D90A14] hover:bg-[#ff6b00] text-white font-semibold uppercase rounded-lg transition duration-300"
            >
              Close
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Plan Name */}
            <div className="bg-[#1c1c1c] p-4 rounded-lg border border-gray-700">
              <h3 className="text-xs font-medium text-[#ff6b00] uppercase tracking-wider mb-1">
                Plan Name
              </h3>
              <p className="text-xl font-bold text-white">
                {subscription.plan?.name || "N/A"}
              </p>
            </div>

            {/* Duration */}
            <div className="bg-[#1c1c1c] p-4 rounded-lg border border-gray-700">
              <h3 className="text-xs font-medium text-[#ff6b00] uppercase tracking-wider mb-1">
                Duration
              </h3>
              <p className="text-xl font-bold text-white">
                {subscription.plan?.duration || "N/A"} Days
              </p>
            </div>

            {/* Start Date */}
            <div className="bg-[#1c1c1c] p-4 rounded-lg border border-gray-700">
              <h3 className="text-xs font-medium text-[#ff6b00] uppercase tracking-wider mb-1">
                Start Date
              </h3>
              <p className="text-sm text-white">
                {subscription.startDate
                  ? new Date(subscription.startDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "Not started yet"}
              </p>
            </div>

            {/* End Date */}
            <div className="bg-[#1c1c1c] p-4 rounded-lg border border-gray-700">
              <h3 className="text-xs font-medium text-[#ff6b00] uppercase tracking-wider mb-1">
                End Date
              </h3>
              <p className="text-sm text-white">
                {subscription.endDate
                  ? new Date(subscription.endDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "Not set"}
              </p>
            </div>

            {/* Days Remaining */}
            <div className="bg-[#1c1c1c] p-4 rounded-lg border border-gray-700 md:col-span-2">
              <h3 className="text-xs font-medium text-[#ff6b00] uppercase tracking-wider mb-2">
                Days Remaining
              </h3>
              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold text-white">
                  {subscription.endDate
                    ? calculateDaysRemaining(subscription.endDate)
                    : "N/A"}{" "}
                  Days
                </p>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    subscription.status === "approved"
                      ? "bg-green-900 text-green-200"
                      : subscription.status === "pending"
                      ? "bg-yellow-900 text-yellow-200"
                      : "bg-gray-900 text-gray-200"
                  }`}
                >
                  {subscription.status?.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="bg-[#1c1c1c] p-4 rounded-lg border border-gray-700 md:col-span-2">
              <h3 className="text-xs font-medium text-[#ff6b00] uppercase tracking-wider mb-1">
                Price Paid
              </h3>
              <p className="text-xl font-bold text-white">
                ${subscription.plan?.discountedPrice || subscription.plan?.price || "N/A"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionModal;
