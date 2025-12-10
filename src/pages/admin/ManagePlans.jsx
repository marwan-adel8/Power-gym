import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPlans, updatePlan, deletePlan } from "../../services/plansService";
import AdminLayout from "../../components/AdminLayout";
import { FaEdit, FaTrash, FaPlus, FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";

const ManagePlans = () => {
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [features, setFeatures] = useState([]);
  const [currentFeature, setCurrentFeature] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    duration: "",
    price: "",
    discountedPrice: "",
    description: "",
    isOffer: false,
  });

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const data = await getPlans();
      setPlans(data);
    } catch (err) {
      console.error("Error fetching plans:", err);
      setError("Failed to load plans");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (plan) => {
    setEditingPlan(plan);
    
    // Calculate discount amount: Original Price - Discounted Price
    const discountAmount = plan.discountedPrice ? plan.price - plan.discountedPrice : "";
    
    setFormData({
      name: plan.name,
      duration: plan.duration,
      price: plan.price,
      discountedPrice: discountAmount,
      description: plan.description || "",
      isOffer: plan.isOffer || false,
    });
    setFeatures(plan.features || []);
  };

  const handleCloseModal = () => {
    setEditingPlan(null);
    setFormData({
      name: "",
      duration: "",
      price: "",
      discountedPrice: "",
      description: "",
      isOffer: false,
    });
    setFeatures([]);
    setCurrentFeature("");
  };

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
    setFeatures(features.filter((_, i) => i !== index));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    
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

    try {
      const originalPrice = Number(formData.price);
      const discountAmount = formData.discountedPrice ? Number(formData.discountedPrice) : 0;
      const finalDiscountedPrice = discountAmount > 0 ? originalPrice - discountAmount : undefined;

      const planData = {
        ...formData,
        features,
        duration: Number(formData.duration),
        price: originalPrice,
        discountedPrice: finalDiscountedPrice,
      };

      await updatePlan(editingPlan._id, planData);
      
      await Swal.fire({
        icon: "success",
        title: "Plan Updated!",
        text: "Plan has been updated successfully!",
        background: "#1d1d1d",
        color: "#fff",
        confirmButtonColor: "#d90a14",
        timer: 2000,
        timerProgressBar: true,
      });
      
      handleCloseModal();
      fetchPlans();
    } catch (err) {
      console.error("Error updating plan:", err);
      await Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: err.response?.data?.message || "Error updating plan",
        background: "#1d1d1d",
        color: "#fff",
        confirmButtonColor: "#d90a14",
      });
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      icon: "warning",
      title: "Confirm Delete",
      text: "Are you sure you want to delete this plan? This action cannot be undone.",
      background: "#1d1d1d",
      color: "#fff",
      showCancelButton: true,
      confirmButtonColor: "#d90a14",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await deletePlan(id);
        
        await Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Plan has been deleted successfully!",
          background: "#1d1d1d",
          color: "#fff",
          confirmButtonColor: "#d90a14",
          timer: 2000,
          timerProgressBar: true,
        });
        
        fetchPlans();
      } catch (err) {
        console.error("Error deleting plan:", err);
        await Swal.fire({
          icon: "error",
          title: "Delete Failed",
          text: err.response?.data?.message || "Error deleting plan",
          background: "#1d1d1d",
          color: "#fff",
          confirmButtonColor: "#d90a14",
        });
      }
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-white text-xl">Loading plans...</div>
        </div>
      </AdminLayout>
    );
  }

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
        }}
      >
        <div className="container mx-auto max-w-7xl">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2
                className="text-4xl sm:text-5xl font-normal uppercase tracking-widest text-white drop-shadow-lg"
                style={{ fontFamily: "Gagalin, sans-serif" }}
              >
                Manage <span className="text-[#ff6b00]">Plans</span>
              </h2>
              <p className="text-gray-300 mt-2 text-sm sm:text-base">
                View, edit, and delete subscription plans
              </p>
            </div>
            <button
              onClick={() => navigate("/admin/add-plan")}
              className="px-6 py-3 bg-[#d90a14] hover:bg-[#ff6b00] text-white font-semibold rounded-lg transition duration-300 flex items-center gap-2"
            >
              <FaPlus /> Add New Plan
            </button>
          </div>



          {plans.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">No plans found. Add your first plan!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <div
                  key={plan._id}
                  className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-2xl hover:border-red-500/30 transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-white uppercase" style={{ fontFamily: "Gagalin, sans-serif" }}>
                      {plan.name}
                    </h3>
                    {plan.isOffer && (
                      <span className="bg-red-600/20 text-red-500 px-3 py-1 rounded-full text-xs font-bold uppercase">
                        Offer
                      </span>
                    )}
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-baseline">
                      <span className="text-gray-400 text-sm">Price:</span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-white">
                          {plan.discountedPrice || plan.price}
                        </span>
                        {plan.discountedPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            {plan.price}
                          </span>
                        )}
                        <span className="text-sm text-[#d90a14]">USDT</span>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-400 text-sm">Duration:</span>
                      <span className="text-white font-semibold">{plan.duration} days</span>
                    </div>

                    {plan.description && (
                      <p className="text-gray-300 text-sm mt-2">{plan.description}</p>
                    )}

                    {plan.features && plan.features.length > 0 && (
                      <div className="mt-4">
                        <p className="text-gray-400 text-xs uppercase mb-2">Features:</p>
                        <ul className="space-y-1">
                          {plan.features.slice(0, 3).map((feature, idx) => (
                            <li key={idx} className="text-gray-300 text-sm flex items-start">
                              <span className="text-[#d90a14] mr-2">✔</span>
                              <span className="line-clamp-1">{feature}</span>
                            </li>
                          ))}
                          {plan.features.length > 3 && (
                            <li className="text-gray-500 text-xs">+{plan.features.length - 3} more</li>
                          )}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 pt-4 border-t border-white/10">
                    <button
                      onClick={() => handleEdit(plan)}
                      className="flex-1 py-2 px-4 bg-[#ff6b00] hover:bg-[#d90a14] text-white font-semibold rounded-lg transition duration-300 flex items-center justify-center gap-2"
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(plan._id)}
                      className="flex-1 py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition duration-300 flex items-center justify-center gap-2"
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Edit Modal */}
        {editingPlan && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-[#212121] rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#d90a14]/30 shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white uppercase" style={{ fontFamily: "Gagalin, sans-serif" }}>
                  Edit <span className="text-[#ff6b00]">Plan</span>
                </h3>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-white transition"
                >
                  <FaTimes size={24} />
                </button>
              </div>

              <form onSubmit={handleUpdate} className="space-y-6">
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
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#ff6b00] uppercase tracking-wider mb-2">
                      Duration (Months) *
                    </label>
                    <input
                      type="number"
                      name="duration"
                      required
                      min="1"
                      value={formData.duration}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#1c1c1c] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#d90a14] focus:ring-2 focus:ring-[#d90a14]/50 transition duration-300"
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
                    />
                  </div>
                </div>

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
                      placeholder="e.g. 20"
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
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#ff6b00] uppercase tracking-wider mb-2">
                    Features *
                  </label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={currentFeature}
                      onChange={(e) => setCurrentFeature(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddFeature())}
                      className="flex-1 px-4 py-3 bg-[#1c1c1c] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#d90a14] focus:ring-2 focus:ring-[#d90a14]/50 transition duration-300"
                      placeholder="Add a feature"
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

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 py-3 px-6 bg-[#D90A14] hover:bg-[#ff6b00] text-white font-semibold uppercase rounded-lg transition duration-300"
                  >
                    Update Plan
                  </button>
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold uppercase rounded-lg transition duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}


      </section>
    </AdminLayout>
  );
};

export default ManagePlans;
