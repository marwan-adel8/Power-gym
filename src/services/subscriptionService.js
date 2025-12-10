// services/subscriptionService.js
import axios from "./axios";

// إنشاء اشتراك جديد (مع رفع صورة الدفع)
export const createSubscription = async (formData) => {
  const response = await axios.post("/subscriptions", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

// جلب اشتراكات المستخدم الحالية
export const getMySubscriptions = async () => {
  const response = await axios.get("/subscriptions/mysub");
  return response.data;
};

// جلب الاشتراكات المعتمدة (للأدمن)
export const getApprovedSubscriptions = async () => {
  const response = await axios.get("/subscriptions/approved");
  return response.data;
};
