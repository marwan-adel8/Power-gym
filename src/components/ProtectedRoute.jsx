// components/ProtectedRoute.jsx
import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../context/AuthContext'; 

const ProtectedRoute = () => {
    const { user } = useContext(AuthContext);
    
    // 1. إذا لم يكن هناك مستخدم مسجل، يذهب لصفحة الدخول
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // 2. التحقق من دور المستخدم
    const isAdmin = user.role === 'admin';

    if (isAdmin) {
        // إذا كان admin، اسمح بالوصول
        return <Outlet />;
    } else {
        // إذا كان مسجلاً ولكنه ليس admin، يتم توجيهه إلى الصفحة الرئيسية
        return <Navigate to="/" replace />; // 🔥 هذا هو الحل لمنع الصفحة البيضاء
    }
};

export default ProtectedRoute;