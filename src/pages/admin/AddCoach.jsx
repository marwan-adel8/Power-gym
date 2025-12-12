import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { createCoach } from "../../services/coachService";
import AuthContext from "../../context/AuthContext";
import AdminLayout from "../../components/AdminLayout";
import Swal from "sweetalert2";

const AddCoach = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    experience: "",
    specialty: "",
    facebook: "",
    instagram: "",
    twitter: "",
    image: null,
  });

  // التحقق من تسجيل الدخول والـ token
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    const userData = localStorage.getItem("user_data");

    if (!user && !userData) {
      console.warn("User not logged in, redirecting to login...");
      navigate("/login");
      return;
    }

    if (!token) {
      console.warn(
        "No token found in localStorage. User needs to login again to get token."
      );
      // لا نعرض error مباشرة، سنعرضه فقط عند محاولة الإرسال
    } else {
      console.log("Token found:", token.substring(0, 20) + "...");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // التحقق من وجود token قبل الإرسال
    const token = localStorage.getItem("userToken");
    if (!token) {
      await Swal.fire({
        icon: "error",
        title: "Authentication Required",
        text: "يجب تسجيل الدخول مرة أخرى للحصول على token. الرجاء تسجيل الخروج ثم تسجيل الدخول.",
        background: "#1d1d1d",
        color: "#fff",
        confirmButtonColor: "#d90a14",
      });
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // إنشاء FormData لإرسال البيانات مع الصورة
      const submitData = new FormData();
      submitData.append("name", formData.name.trim());
      submitData.append("bio", formData.bio?.trim() || "");

      // إضافة experience فقط إذا كان موجوداً
      if (formData.experience && formData.experience !== "") {
        submitData.append("experience", formData.experience);
      }

      submitData.append("specialty", formData.specialty?.trim() || "");

      // إضافة روابط السوشيال ميديا كـ JSON
      const socialLinks = {
        facebook: formData.facebook?.trim() || "",
        instagram: formData.instagram?.trim() || "",
        twitter: formData.twitter?.trim() || "",
      };

      // إرسال socialLinks فقط إذا كان هناك رابط واحد على الأقل
      const hasSocialLinks =
        socialLinks.facebook || socialLinks.instagram || socialLinks.twitter ;
      if (hasSocialLinks) {
        submitData.append("socialLinks", JSON.stringify(socialLinks));
      }

      // إضافة الصورة
      if (formData.image) {
        submitData.append("image", formData.image);
      }

      await createCoach(submitData);
      
      await Swal.fire({
        icon: "success",
        title: "Coach Added!",
        text: "Coach has been added successfully!",
        background: "#1d1d1d",
        color: "#fff",
        confirmButtonColor: "#d90a14",
        timer: 2000,
        timerProgressBar: true,
      });

      // إعادة تعيين النموذج
      setFormData({
        name: "",
        bio: "",
        experience: "",
        specialty: "",
        facebook: "",
        instagram: "",
        twitter: "",
        image: null,
      });
    } catch (err) {
      console.error("Error creating coach:", err);
      await Swal.fire({
        icon: "error",
        title: "Failed to Add Coach",
        text: err.response?.data?.message || "Error creating coach",
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
              Add New <span className="text-[#ff6b00]">Coach</span>
            </h2>
            <p className="text-gray-300 mt-2 text-sm sm:text-base">
              Create a new coach profile for your gym
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
                  Coach Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#1c1c1c] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#d90a14] focus:ring-2 focus:ring-[#d90a14]/50 transition duration-300"
                  placeholder="e.g. John Doe"
                />
              </div>

              {/* Bio */}
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
                  placeholder="Brief bio about the coach..."
                />
              </div>

              {/* Experience & Specialty */}
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
                    placeholder="5"
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
                    placeholder="e.g. Strength Training"
                  />
                </div>
              </div>

              {/* Social Links */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-[#ff6b00] uppercase tracking-wider">
                  Social Media Links (Optional)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                </div>
              </div>

              {/* Image */}
              <div>
                <label className="block text-sm font-medium text-[#ff6b00] uppercase tracking-wider mb-2">
                  Coach Image
                </label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#1c1c1c] border border-gray-700 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#d90a14] file:text-white hover:file:bg-[#ff6b00] file:cursor-pointer focus:outline-none focus:border-[#d90a14] focus:ring-2 focus:ring-[#d90a14]/50 transition duration-300"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 px-6 bg-[#D90A14] hover:bg-[#ff6b00] text-white font-semibold uppercase rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Adding..." : "Add Coach"}
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

export default AddCoach;
