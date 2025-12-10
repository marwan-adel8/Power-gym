// services/plansService.js
import axios from "./axios";

// جلب كل الخطط
export const getPlans = async () => {
  const response = await axios.get("/plans");
  return response.data;
};

// إضافة خطة جديدة (Admin)
export const createPlan = async (planData) => {
  const response = await axios.post("/plans/add", planData);
  return response.data;
};

// تعديل خطة (Admin)
export const updatePlan = async (id, planData) => {
  const response = await axios.put(`/plans/update/${id}`, planData);
  return response.data;
};

// حذف خطة (Admin)
export const deletePlan = async (id) => {
  const response = await axios.delete(`/plans/delete/${id}`);
  return response.data;
};
