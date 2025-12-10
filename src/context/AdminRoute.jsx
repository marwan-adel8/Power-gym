// components/AdminRoute.jsx (أو قد تسميه ProtectedRoute.jsx)
import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../context/AuthContext'; // تأكد من المسار الصحيح للـ context

const AdminRoute = () => {
    // قراءة بيانات المستخدم من الـ Context
    const { user } = useContext(AuthContext);

    // 1. التحقق من وجود مستخدم مسجل
    if (!user) {
        // إذا لم يكن هناك مستخدم مسجل، قم بتوجيهه لصفحة تسجيل الدخول
        return <Navigate to="/login" replace />;
    }

    // 2. التحقق من دور المستخدم
    const isAdmin = user.role === 'admin';

    if (isAdmin) {
        // إذا كان الدور "admin"، اسمح له بالوصول للصفحة المطلوبة
        return <Outlet />;
    } else {
        // إذا كان مسجلاً ولكنه ليس admin، قم بتوجيهه للصفحة الرئيسية (Home)
        return <Navigate to="/" replace />;
    }
};

export default AdminRoute;