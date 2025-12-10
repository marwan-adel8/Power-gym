import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCoaches, updateCoach, deleteCoach } from "../../services/coachService";
import AdminLayout from "../../components/AdminLayout";
import { FaEdit, FaTrash, FaPlus, FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";

const ManageCoaches = () => {
  const navigate = useNavigate();
  const [coaches, setCoaches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [editingCoach, setEditingCoach] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    experience: "",
    specialty: "",
    facebook: "",
    instagram: "",
    twitter: "",
    whatsapp: "",
    linkedin: "",
    image: null,
  });

  useEffect(() => {
    fetchCoaches();
  }, []);

  const fetchCoaches = async () => {
    try {
      setLoading(true);
      const data = await getCoaches();
      setCoaches(data);
    } catch (err) {
      console.error("Error fetching coaches:", err);
      setError("Failed to load coaches");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (coach) => {
    setEditingCoach(coach);
    setFormData({
      name: coach.name,
      bio: coach.bio || "",
      experience: coach.experience || "",
      specialty: coach.specialty || "",
      facebook: coach.socialLinks?.facebook || "",
      instagram: coach.socialLinks?.instagram || "",
      twitter: coach.socialLinks?.twitter || "",
      whatsapp: coach.socialLinks?.whatsapp || "",
      linkedin: coach.socialLinks?.linkedin || "",
      image: null,
    });
    setImagePreview(coach.image ? `https://gym-backend-sepia.vercel.app${coach.image}` : null);
  };

  const handleCloseModal = () => {
    setEditingCoach(null);
    setFormData({
      name: "",
      bio: "",
      experience: "",
      specialty: "",
      facebook: "",
      instagram: "",
      twitter: "",
      whatsapp: "",
      linkedin: "",
      image: null,
    });
    setImagePreview(null);
  };

  const handleChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      setFormData({ ...formData, image: file });
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const submitData = new FormData();
      submitData.append("name", formData.name.trim());
      submitData.append("bio", formData.bio?.trim() || "");

      if (formData.experience && formData.experience !== "") {
        submitData.append("experience", formData.experience);
      }

      submitData.append("specialty", formData.specialty?.trim() || "");

      const socialLinks = {
        facebook: formData.facebook?.trim() || "",
        instagram: formData.instagram?.trim() || "",
        twitter: formData.twitter?.trim() || "",
        whatsapp: formData.whatsapp?.trim() || "",
        linkedin: formData.linkedin?.trim() || "",
      };

      const hasSocialLinks = Object.values(socialLinks).some(link => link);
      if (hasSocialLinks) {
        submitData.append("socialLinks", JSON.stringify(socialLinks));
      }

      if (formData.image) {
        submitData.append("image", formData.image);
      }

      await updateCoach(editingCoach._id, submitData);
      
      await Swal.fire({
        icon: "success",
        title: "Coach Updated!",
        text: "Coach has been updated successfully!",
        background: "#1d1d1d",
        color: "#fff",
        confirmButtonColor: "#d90a14",
        timer: 2000,
        timerProgressBar: true,
      });
      
      handleCloseModal();
      fetchCoaches();
    } catch (err) {
      console.error("Error updating coach:", err);
      await Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: err.response?.data?.message || "Error updating coach",
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
      text: "Are you sure you want to delete this coach? This action cannot be undone.",
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
        await deleteCoach(id);
        
        await Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Coach has been deleted successfully!",
          background: "#1d1d1d",
          color: "#fff",
          confirmButtonColor: "#d90a14",
          timer: 2000,
          timerProgressBar: true,
        });
        
        fetchCoaches();
      } catch (err) {
        console.error("Error deleting coach:", err);
        await Swal.fire({
          icon: "error",
          title: "Delete Failed",
          text: err.response?.data?.message || "Error deleting coach",
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
          <div className="text-white text-xl">Loading coaches...</div>
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
                Manage <span className="text-[#ff6b00]">Coaches</span>
              </h2>
              <p className="text-gray-300 mt-2 text-sm sm:text-base">
                View, edit, and delete coach profiles
              </p>
            </div>
            <button
              onClick={() => navigate("/admin/add-coach")}
              className="px-6 py-3 bg-[#d90a14] hover:bg-[#ff6b00] text-white font-semibold rounded-lg transition duration-300 flex items-center gap-2"
            >
              <FaPlus /> Add New Coach
            </button>
          </div>



          {coaches.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">No coaches found. Add your first coach!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coaches.map((coach) => (
                <div
                  key={coach._id}
                  className="bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 shadow-2xl hover:border-red-500/30 transition-all duration-300"
                >
                  <div className="h-64 overflow-hidden bg-gray-800">
                    {coach.image ? (
                      <img
                        src={coach.image.startsWith('http') ? coach.image : `https://gym-backend-sepia.vercel.app${coach.image}`}
                        alt={coach.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/400x300/1a1a1a/ff6b00?text=No+Image';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                        <div className="text-center">
                          <div className="text-6xl text-gray-600 mb-2">👤</div>
                          <p className="text-gray-500 text-sm">No Image</p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-white uppercase mb-2" style={{ fontFamily: "Gagalin, sans-serif" }}>
                      {coach.name}
                    </h3>

                    {coach.specialty && (
                      <p className="text-[#ff6b00] text-sm uppercase tracking-wider mb-3">
                        {coach.specialty}
                      </p>
                    )}

                    {coach.experience && (
                      <p className="text-gray-400 text-sm mb-2">
                        Experience: <span className="text-white font-semibold">{coach.experience} years</span>
                      </p>
                    )}

                    {coach.bio && (
                      <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                        {coach.bio}
                      </p>
                    )}

                    <div className="flex gap-2 pt-4 border-t border-white/10">
                      <button
                        onClick={() => handleEdit(coach)}
                        className="flex-1 py-2 px-4 bg-[#ff6b00] hover:bg-[#d90a14] text-white font-semibold rounded-lg transition duration-300 flex items-center justify-center gap-2"
                      >
                        <FaEdit /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(coach._id)}
                        className="flex-1 py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition duration-300 flex items-center justify-center gap-2"
                      >
                        <FaTrash /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Edit Modal */}
        {editingCoach && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-[#212121] rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#d90a14]/30 shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white uppercase" style={{ fontFamily: "Gagalin, sans-serif" }}>
                  Edit <span className="text-[#ff6b00]">Coach</span>
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
                    Coach Name *
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

                <div>
                  <label className="block text-sm font-medium text-[#ff6b00] uppercase tracking-wider mb-2">
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    rows="3"
                    value={formData.bio}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#1c1c1c] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#d90a14] focus:ring-2 focus:ring-[#d90a14]/50 transition duration-300 resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#ff6b00] uppercase tracking-wider mb-2">
                      Experience (Years)
                    </label>
                    <input
                      type="number"
                      name="experience"
                      min="0"
                      value={formData.experience}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#1c1c1c] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#d90a14] focus:ring-2 focus:ring-[#d90a14]/50 transition duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#ff6b00] uppercase tracking-wider mb-2">
                      Specialty
                    </label>
                    <input
                      type="text"
                      name="specialty"
                      value={formData.specialty}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#1c1c1c] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#d90a14] focus:ring-2 focus:ring-[#d90a14]/50 transition duration-300"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-[#ff6b00] uppercase tracking-wider">
                    Social Media Links
                  </h4>
                  <div className="grid grid-cols-1 gap-4">
                    <input
                      type="url"
                      name="facebook"
                      value={formData.facebook}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#1c1c1c] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#d90a14] focus:ring-2 focus:ring-[#d90a14]/50 transition duration-300"
                      placeholder="Facebook URL"
                    />
                    <input
                      type="url"
                      name="instagram"
                      value={formData.instagram}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#1c1c1c] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#d90a14] focus:ring-2 focus:ring-[#d90a14]/50 transition duration-300"
                      placeholder="Instagram URL"
                    />
                    <input
                      type="url"
                      name="twitter"
                      value={formData.twitter}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#1c1c1c] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#d90a14] focus:ring-2 focus:ring-[#d90a14]/50 transition duration-300"
                      placeholder="Twitter URL"
                    />
                    <input
                      type="url"
                      name="linkedin"
                      value={formData.linkedin}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#1c1c1c] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#d90a14] focus:ring-2 focus:ring-[#d90a14]/50 transition duration-300"
                      placeholder="LinkedIn URL"
                    />
                    <input
                      type="text"
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#1c1c1c] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#d90a14] focus:ring-2 focus:ring-[#d90a14]/50 transition duration-300"
                      placeholder="WhatsApp Number (e.g., 01234567890)"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#ff6b00] uppercase tracking-wider mb-2">
                    Coach Image
                  </label>
                  {imagePreview && (
                    <div className="mb-4">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded-lg border border-gray-700"
                      />
                    </div>
                  )}
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#1c1c1c] border border-gray-700 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#d90a14] file:text-white hover:file:bg-[#ff6b00] file:cursor-pointer focus:outline-none focus:border-[#d90a14] focus:ring-2 focus:ring-[#d90a14]/50 transition duration-300"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 py-3 px-6 bg-[#D90A14] hover:bg-[#ff6b00] text-white font-semibold uppercase rounded-lg transition duration-300"
                  >
                    Update Coach
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

export default ManageCoaches;
