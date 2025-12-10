import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getMySubscriptions } from "../services/subscriptionService";
import { useAuth } from "../context/AuthContext";

const UserDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    fetchSubscription();
  }, [user, navigate]);

  const fetchSubscription = async () => {
    try {
      setLoading(true);
      const data = await getMySubscriptions();
      setSubscription(data.active);
    } catch (err) {
      console.error("Error fetching subscription:", err);
      setError(err.response?.data?.message || "Failed to load subscription");
    } finally {
      setLoading(false);
    }
  };

  const calculateDaysRemaining = (endDate) => {
    const end = new Date(endDate);
    const today = new Date();
    const diffTime = end - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading your subscription...</div>
      </div>
    );
  }

  return (
    <section
      className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 relative min-h-screen"
      style={{
        backgroundColor: "#1d1d1d",
        backgroundImage:
          "radial-gradient(circle at center, rgba(119, 6, 11, 0.55) 0%, rgba(119, 6, 11, 0.25) 20%, rgba(29, 29, 29, 0.95) 60%, #1d1d1d 100%)",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
        boxShadow: "inset 0 200px 150px -100px #212121",
      }}
    >
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-10">
          <h2
            className="text-4xl sm:text-5xl font-normal uppercase tracking-widest text-white drop-shadow-lg"
            style={{ fontFamily: "Gagalin, sans-serif" }}
          >
            My <span className="text-[#ff6b00]">Subscription</span>
          </h2>
          <p className="text-gray-300 mt-2 text-sm sm:text-base">
            View your active subscription details
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-900/50 border border-red-600 rounded-lg text-red-200">
            {error}
          </div>
        )}

        {!subscription ? (
          <div className="bg-[#212121] rounded-2xl p-8 shadow-2xl border border-[#d90a14]/30 text-center">
            <div className="text-gray-400 text-lg mb-4">
              You don't have an active subscription yet.
            </div>
            <button
              onClick={() => navigate("/plans")}
              className="px-6 py-3 bg-[#D90A14] hover:bg-[#ff6b00] text-white font-semibold uppercase rounded-lg transition duration-300"
            >
              Browse Plans
            </button>
          </div>
        ) : (
          <div className="bg-[#212121] rounded-2xl p-8 shadow-2xl border border-[#d90a14]/30">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Plan Name */}
              <div className="bg-[#1c1c1c] p-6 rounded-lg border border-gray-700">
                <h3 className="text-sm font-medium text-[#ff6b00] uppercase tracking-wider mb-2">
                  Plan Name
                </h3>
                <p className="text-2xl font-bold text-white">
                  {subscription.plan?.name || "N/A"}
                </p>
              </div>

              {/* Duration */}
              <div className="bg-[#1c1c1c] p-6 rounded-lg border border-gray-700">
                <h3 className="text-sm font-medium text-[#ff6b00] uppercase tracking-wider mb-2">
                  Duration
                </h3>
                <p className="text-2xl font-bold text-white">
                  {subscription.plan?.duration || "N/A"} Days
                </p>
              </div>

              {/* Start Date */}
              <div className="bg-[#1c1c1c] p-6 rounded-lg border border-gray-700">
                <h3 className="text-sm font-medium text-[#ff6b00] uppercase tracking-wider mb-2">
                  Start Date
                </h3>
                <p className="text-xl text-white">
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
              <div className="bg-[#1c1c1c] p-6 rounded-lg border border-gray-700">
                <h3 className="text-sm font-medium text-[#ff6b00] uppercase tracking-wider mb-2">
                  End Date
                </h3>
                <p className="text-xl text-white">
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
              <div className="bg-[#1c1c1c] p-6 rounded-lg border border-gray-700 md:col-span-2">
                <h3 className="text-sm font-medium text-[#ff6b00] uppercase tracking-wider mb-2">
                  Days Remaining
                </h3>
                <div className="flex items-center justify-between">
                  <p className="text-3xl font-bold text-white">
                    {subscription.endDate
                      ? calculateDaysRemaining(subscription.endDate)
                      : "N/A"}{" "}
                    Days
                  </p>
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${
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
              <div className="bg-[#1c1c1c] p-6 rounded-lg border border-gray-700 md:col-span-2">
                <h3 className="text-sm font-medium text-[#ff6b00] uppercase tracking-wider mb-2">
                  Price Paid
                </h3>
                <p className="text-2xl font-bold text-white">
                  ${subscription.plan?.discountedPrice || subscription.plan?.price || "N/A"}
                </p>
              </div>
            </div>

            {/* Back Button */}
            <div className="mt-8 text-center">
              <button
                onClick={() => navigate("/")}
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold uppercase rounded-lg transition duration-300"
              >
                Back to Home
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default UserDashboard;
