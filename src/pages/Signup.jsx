// pages/Signup.jsx
import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Signup = () => {
      useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // محاولة التسجيل عبر الـ API
        const result = await register({
            name: formData.fullName,
            email: formData.email,
            password: formData.password,
        });

        if (result.success) {
            // عرض رسالة نجاح
            await Swal.fire({
                icon: "success",
                title: "Registration Successful!",
                text: "Your account has been created. Please login to continue.",
                background: "#1d1d1d",
                color: "#fff",
                confirmButtonColor: "#d90a14",
                confirmButtonText: "Go to Login",
            });
            // التوجيه إلى صفحة تسجيل الدخول بعد التسجيل الناجح مع إعادة تحميل الصفحة
            window.location.href = "/login"; 
        } else {
            // عرض رسالة الخطأ من الـ API
            await Swal.fire({
                icon: "error",
                title: "Registration Failed!",
                text: result.message || "Something went wrong. Please try again.",
                background: "#1d1d1d",
                color: "#fff",
                confirmButtonColor: "#d90a14",
            });
        }

        setLoading(false);
    };

    return (
        // 1. الحاوية الرئيسية: تطبيق الخلفية الديناميكية
        <div
            className="pt-16 min-h-screen flex items-center justify-center relative overflow-hidden p-4"
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
            
            {/* 2. حاوية النموذج (الفورم): شفافة مع الحدود والظل */}
            <div className=" relative z-10 w-full max-w-md p-8 rounded-xl shadow-2xl border border-[#d90a14]/50">
                
                {/* العنوان */}
                <span className="whitespace-nowrap text-3xl md:text-5xl font-normal bg-clip-text text-transparent bg-gradient-to-r from-[#d90a14] to-[#ff6b00] drop-shadow-lg text-center mx-auto block mb-6" style={{ fontFamily: "Gagalin, sans-serif" }}>
                    SIGN UP
                </span>
                
                <p className="text-center text-gray-400 mb-8">Join us and start your fitness journey today!</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* حقل الاسم الكامل */}
                    <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                        <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required
                            className="w-full px-4 py-3 bg-[#1d1d1d] text-white border border-gray-600 rounded-lg focus:ring-[#d90a14] focus:border-[#d90a14] transition duration-200 placeholder-gray-500" placeholder="Enter your full name" />
                    </div>

                    {/* حقل البريد الإلكتروني */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required
                            className="w-full px-4 py-3 bg-[#1d1d1d] text-white border border-gray-600 rounded-lg focus:ring-[#d90a14] focus:border-[#d90a14] transition duration-200 placeholder-gray-500" placeholder="Enter your email" />
                    </div>

                    {/* حقل كلمة المرور */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required
                            className="w-full px-4 py-3 bg-[#1d1d1d] text-white border border-gray-600 rounded-lg focus:ring-[#d90a14] focus:border-[#d90a14] transition duration-200 placeholder-gray-500" placeholder="Choose a strong password" />
                    </div>

                    {/* زر التسجيل */}
                    <button type="submit" disabled={loading} className={`w-full py-3 rounded-lg text-lg font-semibold transition duration-300 ${loading ? "bg-gray-600 cursor-not-allowed" : "bg-[#d90a14] hover:bg-[#ff6b00] shadow-xl shadow-[#d90a14]/50"}`}>
                        {loading ? "Signing Up..." : "Sign Up"}
                    </button>
                </form>

                {/* رابط تسجيل الدخول */}
                <p className="mt-6 text-center text-sm text-gray-400">
                    Already have an account?
                    <a href="/login" className="text-[#d90a14] hover:text-[#ff6b00] font-medium ml-1 transition duration-200">Login</a>
                </p>
            </div>
        </div>
    );
};

export default Signup;