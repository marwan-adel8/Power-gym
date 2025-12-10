import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { secureStorage } from '../utils/secureStorage';
import { FaHome, FaChartBar, FaDumbbell, FaLeaf, FaUser, FaSignOutAlt, FaEdit, FaUsers, FaBars, FaTimes } from 'react-icons/fa';

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [adminInfo, setAdminInfo] = useState({ name: 'Admin', email: '' });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const navItems = [
    { name: 'Home', icon: <FaHome />, path: '/admin/dashboard' },
    { name: 'Add Coach', icon: <FaChartBar />, path: '/admin/add-coach' },
    { name: 'Add Plans', icon: <FaDumbbell />, path: '/admin/add-plan' },
    { name: 'Manage Plans', icon: <FaEdit />, path: '/admin/manage-plans' },
    { name: 'Manage Coaches', icon: <FaUsers />, path: '/admin/manage-coaches' },
    { name: 'Subscriptions', icon: <FaLeaf />, path: '/admin/subscriptions' },
    { name: 'Subscribers', icon: <FaUser />, path: '/admin/subscribers' },
  ];

  const { logout } = useAuth();

  useEffect(() => {
    // Get admin info from secure storage
    const user = secureStorage.getItem('user_data');
    if (user) {
      setAdminInfo({
        name: user.name || 'Admin',
        email: user.email || '',
      });
    }
  }, []);

  const handleLogout = async () => {
    await logout();
    // إعادة تحميل الصفحة لمسح Network tab ثم التوجيه
    window.location.href = '/';
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleNavClick = (path) => {
    navigate(path);
    closeSidebar(); // Close sidebar after navigation on mobile
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white flex">
      {/* Hamburger Menu Button - Mobile Only */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 bg-zinc-800 p-3 rounded-lg hover:bg-zinc-700 transition-colors"
        aria-label="Toggle menu"
      >
        {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Overlay - Mobile Only */}
      {isSidebarOpen && (
        <div
          onClick={closeSidebar}
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
        />
      )}

      {/* الشريط الجانبي */}
      <aside
        className={`w-52 bg-zinc-800 p-4 flex flex-col justify-between fixed h-screen z-50 
                    transition-transform duration-300 ease-in-out
                    lg:translate-x-0 
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div>
          {/* ملف تعريف المستخدم */}
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-3 bg-zinc-700 rounded-full text-xl"><FaUser /></div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">{adminInfo.name}</p>
              <p className="text-xs text-gray-400 truncate">{adminInfo.email}</p>
            </div>
          </div>
          
          {/* قائمة التنقل */}
          <nav>
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.path)}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg text-sm transition-colors mb-2 ${
                  location.pathname === item.path ? 'bg-red-600 text-white' : 'text-zinc-400 hover:bg-zinc-700'
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </button>
            ))}
          </nav>
        </div>
        
        
        {/* زر العودة للصفحة الرئيسية */}
        <Link 
          to="/"
          className="flex items-center bg-red-600 space-x-3 p-3 hover:bg-zinc-700 rounded-lg transition-colors"
        >
          <FaSignOutAlt />
          <span>Back</span>
        </Link>
      </aside>

      {/* المحتوى الرئيسي */}
      <main className="flex-1 lg:ml-52">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
