// components/Layout.jsx (الكود المُعدَّل)

import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Navbar'; 
import Footer from '../components/Footer'; 

const Layout = () => {
    return (
        // 🔥 التعديل هنا: إضافة min-h-screen للحاوية الخارجية
        <div className="flex flex-col min-h-screen text-white font-sans relative overflow-hidden">
            
            {/* الخلفية الثابتة: يجب أن تكون fixed inset-0 */}
            <div className="fixed inset-0 z-0 bg-[#1d1d1d] 
                bg-[radial-gradient(circle_at_80%_50%,_rgba(119,6,11,0.3)_0%,_rgba(29,29,29,0)_60%)] 
                bg-[linear-gradient(to_bottom,_#1d1d1d_0%,_transparent_50%,_#1d1d1d_100%)] 
                bg-[linear-gradient(to_right,_#712b0d_0%,_transparent_10%,_transparent_90%,_#77060b_100%)] 
                bg-cover bg-center bg-no-repeat"
            ></div>

            {/* محتوى الصفحة فوق الخلفية (يجب أن يكون relative z-10) */}
            <div className="relative z-10 flex flex-col flex-grow">
                <Header /> 
                <main className="flex-grow">
                    <Outlet /> 
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default Layout;