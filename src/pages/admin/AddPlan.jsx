import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { createPlan } from "../../services/plansService";
import AuthContext from "../../context/AuthContext";
import { FaTrash, FaPlus } from "react-icons/fa";
import AdminLayout from "../../components/AdminLayout";
import Swal from "sweetalert2";

const AddPlan = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    duration: "",
    price: "",
    discountedPrice: "",
    description: "",
    isOffer: false,
  });

  const [features, setFeatures] = useState([]);
  const [currentFeature, setCurrentFeature] = useState("");

  // التحقق من تسجيل الدخول والـ token
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    const userData = localStorage.getItem("user_data");

    if (!user && !userData) {
      console.warn("User not logged in, redirecting to login...");
      navigate("/login");
      return;
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleAddFeature = () => {
    if (currentFeature.trim()) {
      setFeatures([...features, currentFeature.trim()]);
      setCurrentFeature("");
    }
  };

  const handleRemoveFeature = (index) => {
    const newFeatures = features.filter((_, i) => i !== index);
    setFeatures(newFeatures);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddFeature();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("userToken");
    if (!token) {
      await Swal.fire({
        icon: "error",
        title: "Authentication Required",
        text: "يجب تسجيل الدخول مرة أخرى.",
        background: "#1d1d1d",
        color: "#fff",
        confirmButtonColor: "#d90a14",
      });
      setTimeout(() => navigate("/login"), 2000);
      return;
    }

    if (features.length === 0) {
      await Swal.fire({
        icon: "warning",
        title: "Missing Features",
        text: "Please add at least one feature.",
        background: "#1d1d1d",
        color: "#fff",
        confirmButtonColor: "#d90a14",
      });
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const originalPrice = Number(formData.price);
      const discountAmount = formData.discountedPrice ? Number(formData.discountedPrice) : 0;
      
      // Calculate final discounted price: Price - Discount Amount
      const finalDiscountedPrice = discountAmount > 0 ? originalPrice - discountAmount : undefined;

      const planData = {
        ...formData,
        features,
        duration: Number(formData.duration),
        price: originalPrice,
        discountedPrice: finalDiscountedPrice,
      };

      await createPlan(planData);
      
      await Swal.fire({
        icon: "success",
        title: "Plan Added!",
        text: "Plan has been added successfully!",
        background: "#1d1d1d",
        color: "#fff",
        confirmButtonColor: "#d90a14",
        timer: 2000,
        timerProgressBar: true,
      });

      // Reset form
      setFormData({
        name: "",
        duration: "",
        price: "",
        discountedPrice: "",
        description: "",
        isOffer: false,
      });
      setFeatures([]);
    } catch (err) {
      console.error("Error creating plan:", err);
      await Swal.fire({
        icon: "error",
        title: "Failed to Add Plan",
        text: err.response?.data?.message || "Error creating plan",
        background: "#1d1d1d",
        color: "#fff",
        confirmButtonColor: "#d90a14",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
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
              Add New <span className="text-[#ff6b00]">Plan</span>
            </h2>
            <p className="text-gray-300 mt-2 text-sm sm:text-base">
              Create a new subscription plan for your members
            </p>
          </div>



          <form
            onSubmit={handleSubmit}
            className="bg-[#212121] rounded-2xl p-8 shadow-2xl border border-[#d90a14]/30"
            style={{ boxShadow: "0 0 30px rgba(217, 10, 20, 0.2)" }}
          >
            <div className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-[#ff6b00] uppercase tracking-wider mb-2">
                  Plan Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#1c1c1c] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#d90a14] focus:ring-2 focus:ring-[#d90a14]/50 transition duration-300"
                  placeholder="e.g. Gold Plan"
                />
              </div>

              {/* Duration & Price */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#ff6b00] uppercase tracking-wider mb-2">
                    Duration (Days) *
                  </label>
                  <input
                    type="number"
                    name="duration"
                    required
                    min="1"
                    value={formData.duration}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#1c1c1c] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#d90a14] focus:ring-2 focus:ring-[#d90a14]/50 transition duration-300"
                    placeholder="30"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#ff6b00] uppercase tracking-wider mb-2">
                    Price (USDT) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    required
                    min="0"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#1c1c1c] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#d90a14] focus:ring-2 focus:ring-[#d90a14]/50 transition duration-300"
                    placeholder="100"
                  />
                </div>
              </div>

              {/* Discounted Price & Is Offer */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                <div>
                  <label className="block text-sm font-medium text-[#ff6b00] uppercase tracking-wider mb-2">
                    Discount Amount (Optional)
                  </label>
                  <input
                    type="number"
                    name="discountedPrice"
                    min="0"
                    value={formData.discountedPrice}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#1c1c1c] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#d90a14] focus:ring-2 focus:ring-[#d90a14]/50 transition duration-300"
                    placeholder="e.g. 20 (Final Price will be Price - 20)"
                  />
                </div>
                <div className="flex items-center space-x-3 pb-3">
                  <input
                    type="checkbox"
                    name="isOffer"
                    id="isOffer"
                    checked={formData.isOffer}
                    onChange={handleChange}
                    className="w-5 h-5 text-[#d90a14] bg-[#1c1c1c] border-gray-700 rounded focus:ring-[#d90a14]"
                  />
                  <label htmlFor="isOffer" className="text-white font-medium cursor-pointer">
                    Mark as Special Offer
                  </label>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-[#ff6b00] uppercase tracking-wider mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  rows="3"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#1c1c1c] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#d90a14] focus:ring-2 focus:ring-[#d90a14]/50 transition duration-300 resize-none"
                  placeholder="Brief description of the plan..."
                />
              </div>

              {/* Features */}
              <div>
                <label className="block text-sm font-medium text-[#ff6b00] uppercase tracking-wider mb-2">
                  Features *
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={currentFeature}
                    onChange={(e) => setCurrentFeature(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1 px-4 py-3 bg-[#1c1c1c] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#d90a14] focus:ring-2 focus:ring-[#d90a14]/50 transition duration-300"
                    placeholder="Add a feature (e.g. Gym Access)"
                  />
                  <button
                    type="button"
                    onClick={handleAddFeature}
                    className="px-6 py-3 bg-[#ff6b00] hover:bg-[#d90a14] text-white rounded-lg transition duration-300"
                  >
                    <FaPlus />
                  </button>
                </div>
                
                {features.length > 0 && (
                  <ul className="space-y-2 bg-[#1c1c1c] p-4 rounded-lg border border-gray-700">
                    {features.map((feature, index) => (
                      <li key={index} className="flex justify-between items-center text-gray-300 bg-[#2a2a2a] px-3 py-2 rounded">
                        <span>{feature}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveFeature(index)}
                          className="text-red-500 hover:text-red-400 transition"
                        >
                          <FaTrash size={14} />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 px-6 bg-[#D90A14] hover:bg-[#ff6b00] text-white font-semibold uppercase rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Adding..." : "Add Plan"}
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/admin/dashboard")}
                  className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold uppercase rounded-lg transition duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </AdminLayout>
  );
};

export default AddPlan;
