// App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./layouts/Layout"; 
import Home from "./pages/Home";
import Login from "./pages/Login";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Dashboard from "./pages/admin/Dashboard"; 
import AddCoach from "./pages/admin/AddCoach";
import AddPlan from "./pages/admin/AddPlan";
import ApprovedSubscribers from "./pages/admin/ApprovedSubscribers";
import AdminSubscriptions from "./pages/admin/AdminSubscriptions";
import ManagePlans from "./pages/admin/ManagePlans";
import ManageCoaches from "./pages/admin/ManageCoaches";
import SubscribePlan from "./pages/SubscribePlan";
import UserDashboard from "./pages/UserDashboard";
import ProtectedRoute from "./components/ProtectedRoute"; 
import Signup from "./pages/Signup";
import { BeatLoader } from 'react-spinners';

function App() {
    const [appIsLoading, setAppIsLoading] = useState(true); 

    useEffect(() => {
        const loadApp = async () => {
            await new Promise(resolve => setTimeout(resolve, 2000)); 
            setAppIsLoading(false);
        };
        loadApp();
    }, []);

    const loaderColor = "#d90a14";

    if (appIsLoading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <BeatLoader 
                    color={loaderColor}
                    size={15}
                    speedMultiplier={1}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
        );
    }

    return (
        <AuthProvider>
            <Router>
                <Routes>
                    
                    {/* المسارات العامة ذات الـ Layout (الناف بار/الفوتر) */}
                    <Route element={<Layout />}> 
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<AboutUs />} />
                        <Route path="/contact" element={<ContactUs />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                    </Route>

                    {/* 🔥🔥 المسارات المحمية للمدير (بدون Layout افتراضي) 🔥🔥 */}
                    {/* هنا نستخدم ProtectedRoute كمكون أب يتحقق من الدور */}
                    <Route element={<ProtectedRoute />}>
                        <Route path="/admin/dashboard" element={<Dashboard />} />
                        <Route path="/admin/add-coach" element={<AddCoach />} />
                        <Route path="/admin/add-plan" element={<AddPlan />} />
                        <Route path="/admin/manage-plans" element={<ManagePlans />} />
                        <Route path="/admin/manage-coaches" element={<ManageCoaches />} />
                        <Route path="/admin/subscriptions" element={<AdminSubscriptions />} />
                        <Route path="/admin/subscribers" element={<ApprovedSubscribers />} />
                    </Route>

                    {/* Public route for subscription */}
                    <Route element={<Layout />}>
                        <Route path="/subscribe/:id" element={<SubscribePlan />} />
                    </Route>

                    {/* User Dashboard - Protected Route */}
                    <Route element={<Layout />}>
                        <Route path="/my-subscription" element={<UserDashboard />} />
                    </Route>
                    
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;