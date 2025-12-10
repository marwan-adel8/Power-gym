import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getPlans } from "../services/plansService";
import { createSubscription } from "../services/subscriptionService";
import vodafoneCashLogo from "../assets/imgs/vodafone cash.svg";
import Swal from "sweetalert2";

const SubscribePlan = () => {
    useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [paymentImage, setPaymentImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    userName: "",
    userPhone: "",
  });

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchPlan = async () => {
      try {
        setLoading(true);
        const plans = await getPlans();
        const selectedPlan = plans.find((p) => p._id === id);
        if (selectedPlan) {
          setPlan(selectedPlan);
        } else {
          setError("Plan not found");
        }
      } catch (err) {
        console.error("Error fetching plan:", err);
        setError("Failed to load plan details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPlan();
    }
  }, [id, user, navigate]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPaymentImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!paymentImage) {
      await Swal.fire({
        icon: "error",
        title: "Missing Payment Receipt",
        text: "Please upload payment image",
        background: "#1d1d1d",
        color: "#fff",
        confirmButtonColor: "#d90a14",
      });
      return;
    }

    if (!formData.userName || !formData.userPhone) {
      await Swal.fire({
        icon: "error",
        title: "Missing Information",
        text: "Please fill in all fields",
        background: "#1d1d1d",
        color: "#fff",
        confirmButtonColor: "#d90a14",
      });
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      const submitData = new FormData();
      submitData.append("plan", plan._id);
      submitData.append("userName", formData.userName);
      submitData.append("userPhone", formData.userPhone);
      submitData.append("paymentImage", paymentImage);

      await createSubscription(submitData);
      
      await Swal.fire({
        icon: "success",
        title: "Subscription Submitted!",
        text: "Your subscription request has been submitted successfully. You will be notified once approved.",
        background: "#1d1d1d",
        color: "#fff",
        confirmButtonColor: "#d90a14",
        timer: 2000,
        timerProgressBar: true,
      });
      
      navigate("/");
    } catch (err) {
      console.error("Error creating subscription:", err);
      await Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: err.response?.data?.message || err.message || "Failed to create subscription. Please try again.",
        background: "#1d1d1d",
        color: "#fff",
        confirmButtonColor: "#d90a14",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{
          backgroundColor: "#1d1d1d",
          backgroundImage: "radial-gradient(circle at center, rgba(119, 6, 11, 0.55) 0%, rgba(119, 6, 11, 0.25) 20%, rgba(29, 29, 29, 0.95) 60%, #1d1d1d 100%)",
        }}
      >
        <div className="text-white text-xl font-semibold tracking-wider">Loading plan details...</div>
      </div>
    );
  }

  if (!plan) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{
          backgroundColor: "#1d1d1d",
          backgroundImage: "radial-gradient(circle at center, rgba(119, 6, 11, 0.55) 0%, rgba(119, 6, 11, 0.25) 20%, rgba(29, 29, 29, 0.95) 60%, #1d1d1d 100%)",
        }}
      >
        <div className="text-white text-xl font-semibold tracking-wider">Plan not found</div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative"
      style={{
        backgroundColor: "#1d1d1d",
        backgroundImage: "radial-gradient(circle at center, rgba(119, 6, 11, 0.55) 0%, rgba(119, 6, 11, 0.25) 20%, rgba(29, 29, 29, 0.95) 60%, #1d1d1d 100%)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Plan Details - Right Side */}
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-2xl hover:border-red-500/30 transition-all duration-300">
            <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-6">
              <h2 className="text-3xl font-bold text-white uppercase tracking-wide" style={{ fontFamily: "Gagalin, sans-serif" }}>
                Plan Details
              </h2>
            </div>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-4xl font-bold text-white mb-3 uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400" style={{ fontFamily: "Gagalin, sans-serif" }}>
                  {plan.name}
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed font-light">{plan.description}</p>
              </div>

              <div className="bg-black/20 rounded-xl p-6 border border-white/5">
                <p className="text-xs uppercase tracking-widest text-gray-400 mb-2 font-semibold">Total Price</p>
                <div className="flex items-baseline">
                  <span className="text-5xl font-extrabold text-white tracking-tight">
                    {plan.discountedPrice || plan.price}
                  </span>
                  {plan.discountedPrice && (
                    <span className="text-2xl text-gray-500 line-through ml-3 font-medium">
                      {plan.price}
                    </span>
                  )}
                  <span className="text-xl text-[#d90a14] ml-2 font-bold">USDT</span>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="bg-black/20 rounded-xl p-4 border border-white/5 flex-1 text-center">
                  <p className="text-xs uppercase tracking-widest text-gray-400 mb-1 font-semibold">Duration</p>
                  <p className="text-white text-xl font-bold">{plan.duration} Days</p>
                </div>
                <div className="bg-black/20 rounded-xl p-4 border border-white/5 flex-1 text-center">
                   <p className="text-xs uppercase tracking-widest text-gray-400 mb-1 font-semibold">Access</p>
                   <p className="text-white text-xl font-bold">Full</p>
                </div>
              </div>

              {plan.features && plan.features.length > 0 ? (
                <div>
                  <p className="text-sm uppercase tracking-widest text-gray-400 mb-4 font-semibold border-b border-white/10 pb-2 inline-block">Included Features</p>
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start text-gray-300 group">
                        <span className="text-[#d90a14] mr-3 text-lg group-hover:scale-110 transition-transform duration-300">✔</span>
                        <span className="group-hover:text-white transition-colors duration-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div>
                  <p className="text-sm uppercase tracking-widest text-gray-400 mb-3 font-semibold">Features</p>
                  <p className="text-gray-300">All premium features included</p>
                </div>
              )}
            </div>
          </div>

          {/* Payment Form - Left Side */}
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-2xl hover:border-red-500/30 transition-all duration-300">
            <h2 className="text-3xl font-bold text-white mb-8 uppercase tracking-wide border-b border-white/10 pb-6" style={{ fontFamily: "Gagalin, sans-serif" }}>
              Payment Information
            </h2>

            {/* Vodafone Cash Payment Info */}
            <div className="mb-8 bg-gradient-to-br from-red-900/40 to-black/60 border border-red-500/30 rounded-xl p-6 shadow-lg relative overflow-hidden group">
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-red-600/20 rounded-full blur-2xl group-hover:bg-red-600/30 transition-all duration-500"></div>
              
              <div className="flex items-center mb-5 relative z-10">
                <div className="bg-white p-2 rounded-lg mr-4 shadow-lg shadow-red-600/20">
                  <img src={vodafoneCashLogo} alt="Vodafone Cash" className="w-8 h-8 object-contain" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-white  tracking-wide">Vodafone Cash</h3>
                    <p className="text-red-200 text-xs">Secure & Fast Transfer</p>
                </div>
              </div>
              
              <div className="space-y-4 relative z-10">
                <div className="bg-black/40 rounded-lg p-4 border border-white/5 flex justify-between items-center group-hover:border-red-500/20 transition-colors duration-300">
                  <span className="text-sm text-gray-400">Transfer Number</span>
                  <span className="text-2xl font-bold text-white tracking-wider font-mono">01064935277</span>
                </div>
                
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 flex items-start gap-3">
                    <div className="mt-0.5">
                        <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <p className="text-xs text-yellow-200/80 leading-relaxed">
                        Approval within <span className="font-bold text-yellow-200">2 hours</span> of payment verification.
                    </p>
                </div>
              </div>
            </div>



            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div className="group">
                <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider group-focus-within:text-[#d90a14] transition-colors duration-300">
                  Full Name
                </label>
                <input
                  type="text"
                  name="userName"
                  value={formData.userName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3.5 bg-black/40 border border-gray-700 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-[#d90a14] focus:ring-1 focus:ring-[#d90a14] transition-all duration-300 backdrop-blur-sm"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Phone Field */}
              <div className="group">
                <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider group-focus-within:text-[#d90a14] transition-colors duration-300">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="userPhone"
                  value={formData.userPhone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3.5 bg-black/40 border border-gray-700 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-[#d90a14] focus:ring-1 focus:ring-[#d90a14] transition-all duration-300 backdrop-blur-sm"
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="group">
                <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider group-focus-within:text-[#d90a14] transition-colors duration-300">
                  Payment Receipt
                </label>
                <div className="mt-1 flex justify-center px-6 pt-8 pb-8 border-2 border-gray-700 border-dashed rounded-xl hover:border-[#d90a14]/50 hover:bg-black/20 transition-all duration-300 bg-black/40 backdrop-blur-sm group-hover:shadow-lg group-hover:shadow-red-900/10">
                  <div className="space-y-2 text-center w-full">
                    {imagePreview ? (
                      <div className="relative inline-block">
                        <img
                          src={imagePreview}
                          alt="Payment receipt preview"
                          className="mx-auto h-48 w-auto rounded-lg shadow-xl border border-white/10"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setPaymentImage(null);
                            setImagePreview(null);
                          }}
                          className="absolute -top-3 -right-3 bg-red-600 text-white rounded-full p-1.5 shadow-lg hover:bg-red-700 transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="mx-auto h-16 w-16 text-gray-500 mb-3 group-hover:text-[#d90a14] transition-colors duration-300">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div className="flex text-sm text-gray-400 justify-center">
                          <label
                            htmlFor="payment-image"
                            className="relative cursor-pointer rounded-md font-medium text-[#d90a14] hover:text-[#ff6b00] focus-within:outline-none transition-colors"
                          >
                            <span>Upload a file</span>
                            <input
                              id="payment-image"
                              name="paymentImage"
                              type="file"
                              accept="image/*"
                              className="sr-only"
                              onChange={handleImageChange}
                              required
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="flex-1 py-4 px-4 bg-transparent border border-gray-600 hover:border-gray-400 text-gray-300 font-bold rounded-xl transition-all duration-300 uppercase tracking-wide text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting || !paymentImage}
                  className="flex-[2] py-4 px-4 bg-gradient-to-r from-[#d90a14] to-[#b90810] hover:from-[#ff6b00] hover:to-[#d90a14] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-red-900/30 hover:shadow-red-600/40 uppercase tracking-wide text-sm transform hover:-translate-y-0.5"
                >
                  {submitting ? "Submitting..." : "Confirm Subscription"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscribePlan;

