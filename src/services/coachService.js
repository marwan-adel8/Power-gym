// services/coachService.js
import axios from "./axios";

// جلب كل المدربين
export const getCoaches = async () => {
  const response = await axios.get("/coaches");
  return response.data;
};

// إضافة مدرب جديد (Admin)
export const createCoach = async (formData) => {
  const response = await axios.post("/coaches/add", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

// تعديل مدرب (Admin)
export const updateCoach = async (id, formData) => {
  const response = await axios.put(`/coaches/update/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

// حذف مدرب (Admin)
export const deleteCoach = async (id) => {
  const response = await axios.delete(`/coaches/delete/${id}`);
  return response.data;
};
