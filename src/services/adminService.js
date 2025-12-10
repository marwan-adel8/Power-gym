// services/adminService.js
import axios from "./axios";

// تسجيل دخول الادمن
export const loginAdmin = async (credentials) => {
  const response = await axios.post("/admin/login", credentials);
  return response.data;
};

// جلب كل الاشتراكات المعلقة
export const getPendingSubscriptions = async () => {
  const response = await axios.get("/admin/subscriptions/pending");
  return response.data;
};

// جلب كل الاشتراكات المقبولة
export const getApprovedSubscriptions = async () => {
  const response = await axios.get("/admin/subscriptions/approved");
  return response.data;
};

// الموافقة على اشتراك
export const approveSubscription = async (id) => {
  const response = await axios.put(`/admin/subscriptions/${id}/approve`);
  return response.data;
};

// رفض اشتراك
export const rejectSubscription = async (id) => {
  const response = await axios.put(`/admin/subscriptions/${id}/reject`);
  return response.data;
};

// حذف اشتراك
export const deleteSubscription = async (id) => {
  const response = await axios.delete(`/admin/subscriptions/${id}`);
  return response.data;
};
