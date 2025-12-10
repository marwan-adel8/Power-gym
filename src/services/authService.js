// services/authService.js
import axios from "./axios";

// تسجيل مستخدم جديد
export const registerUser = async (userData) => {
 const response = await axios.post("/auth/register", userData);
 return response.data;
};

// تسجيل الدخول
export const loginUser = async (credentials) => {
 const response = await axios.post("/auth/login", credentials);
 console.log("Raw axios response:", response);
 console.log("Response data:", response.data);
 console.log("Response headers:", response.headers);
 return response.data;
};

// تسجيل الخروج
// ترسل طلباً إلى الخادم لمسح الـ HttpOnly Cookie
export const logoutUser = async () => {
 // لا تحتاج إلى إرسال بيانات، يكفي إرسال الطلب لتمكين الخادم من مسح الكوكي
 const response = await axios.post("/auth/logout");
 return response.data; // سيعيد الخادم رسالة نجاح
};