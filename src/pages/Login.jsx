// pages/Login.jsx
import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
      useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const result = await login(formData);

        if (result.success) {
            // التحقق من أن token تم حفظه
            const savedToken = localStorage.getItem("userToken");
            if (!savedToken) {
                console.error("❌ Token was not saved! Please check login response.");
                await Swal.fire({
                    icon: "error",
                    title: "Error!",
                    text: "Failed to save token. Please try again.",
                    background: "#1d1d1d",
                    color: "#fff",
                    confirmButtonColor: "#d90a14",
                });
                setLoading(false);
                return;
            }
            
            console.log("✅ Login successful! Token saved:", savedToken.substring(0, 20) + "...");
            
            // عرض رسالة نجاح
            await Swal.fire({
                icon: "success",
                title: "Login Successfuly",
                text: "Login successful. Redirecting...",
                background: "#1d1d1d",
                color: "#fff",
                confirmButtonColor: "#d90a14",
                timer: 1500,
                showConfirmButton: false,
            });
            
            // 🔥 التعديل هنا: التوجيه الشرطي بناءً على دور المستخدم (result.user.role)
            const userRole = result.user?.role; // نستخدم ? لتجنب الأخطاء إذا لم يكن هناك دور
            
            if (userRole === "admin") {
                navigate("/admin/dashboard"); // مسار لوحة تحكم المدير
            } else {
                navigate("/"); // مسار الصفحة الرئيسية للمستخدم العادي
            }

        } else {
            await Swal.fire({
                icon: "error",
                title: "Login Failed!",
                text: result.message || "Invalid email or password.",
                background: "#1d1d1d",
                color: "#fff",
                confirmButtonColor: "#d90a14",
            });
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden p-4"
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
            <div className="relative z-10 w-full max-w-md p-8 rounded-xl shadow-2xl border border-[#d90a14]/50">
                <span className="whitespace-nowrap text-3xl md:text-5xl font-normal bg-clip-text text-transparent bg-gradient-to-r from-[#d90a14] to-[#ff6b00] drop-shadow-lg text-center mx-auto block mb-6" style={{ fontFamily: "Gagalin, sans-serif" }}>
                    LOGIN
                </span>
                <p className="text-center text-gray-400 mb-8">Sign in to continue your fitness journey</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required
                            className="w-full px-4 py-3 bg-[#1d1d1d] text-white border border-gray-600 rounded-lg focus:ring-[#d90a14] focus:border-[#d90a14] transition duration-200 placeholder-gray-500" placeholder="Enter your email" />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required
                            className="w-full px-4 py-3 bg-[#1d1d1d] text-white border border-gray-600 rounded-lg focus:ring-[#d90a14] focus:border-[#d90a14] transition duration-200 placeholder-gray-500" placeholder="Enter your password" />
                    </div>

                    <button type="submit" disabled={loading} className={`w-full py-3 rounded-lg text-lg font-semibold transition duration-300 ${loading ? "bg-gray-600 cursor-not-allowed" : "bg-[#d90a14] hover:bg-[#ff6b00] shadow-xl shadow-[#d90a14]/50"}`}>
                        {loading ? "Logging In..." : "Login"}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-gray-400">
                    Don't have an account?
                    <a href="/signup" className="text-[#d90a14] hover:text-[#ff6b00] font-medium ml-1 transition duration-200">Sign Up</a>
                </p>
            </div>
        </div>
    );
};

export default Login;