import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { FaClipboardList, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import SubscriptionModal from "./SubscriptionModal";
import { getMySubscriptions } from "../services/subscriptionService";
import logo from "../assets/imgs/logo-power.png";

const navItems = [
    { name: "Home", path: "/", isSection: false },
    { name: "Plans", path: "/#plans", section: "plans", isSection: true },
    { name: "Coaching", path: "/#trainers", section: "trainers", isSection: true },
    { name: "Testimonials", path: "/#testimonials", section: "testimonials", isSection: true },
    { name: "About Us", path: "/about", isSection: false },
];

const Navbar = () => {
    const { user, logout } = useContext(AuthContext); 
    const location = useLocation();
    const navigate = useNavigate();
    const currentPath = location.pathname;
    const isAdmin = user && user.role === 'admin';
    
    const [showModal, setShowModal] = useState(false);
    const [subscription, setSubscription] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close sidebar when route changes
    useEffect(() => {
        setIsSidebarOpen(false);
    }, [currentPath]);

    const handleNavClick = (e, item) => {
        if (item.isSection) {
            e.preventDefault();
            
            // Close sidebar on mobile
            setIsSidebarOpen(false);
            
            // If not on home page, navigate to home first
            if (currentPath !== '/') {
                navigate('/');
                // Wait for navigation then scroll
                setTimeout(() => {
                    const element = document.getElementById(item.section);
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }, 100);
            } else {
                // Already on home page, just scroll
                const element = document.getElementById(item.section);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        } else {
            // Close sidebar for non-section links
            setIsSidebarOpen(false);
        }
    };

    const fetchSubscription = async () => {
        try {
            setLoading(true);
            const data = await getMySubscriptions();
            setSubscription(data.active);
            setShowModal(true);
        } catch (err) {
            console.error("Error fetching subscription:", err);
            setSubscription(null);
            setShowModal(true);
        } finally {
            setLoading(false);
        }
    };

    const handleSubscriptionClick = () => {
        fetchSubscription();
        setIsSidebarOpen(false);
    };

    const handleLogout = () => {
        logout();
        setIsSidebarOpen(false);
    };

    const AuthButtons = (
        <>
            <Link 
                to="/login" 
                onClick={() => setIsSidebarOpen(false)}
                className="px-4 py-2 border border-red-900 text-gray-200 rounded-lg text-sm hover:border-red-600 transition duration-300"
            >
                Login
            </Link>
            <Link 
                to="/signup" 
                onClick={() => setIsSidebarOpen(false)}
                className="px-5 py-2 bg-red-600 text-white font-semibold rounded-lg text-sm hover:bg-red-700 transition duration-300 shadow-lg shadow-red-500/30"
            >
                Sign Up
            </Link>
        </>
    );

    const AdminButtons = (
        <>
            <span className="text-gray-200 text-sm font-medium mr-2 hidden md:block">
                Welcome, {user?.name || 'Admin'}
            </span>
            <Link 
                to="/admin/dashboard" 
                onClick={() => setIsSidebarOpen(false)}
                className="px-4 py-2 bg-gray-700 text-white font-semibold rounded-lg text-sm hover:bg-gray-600 transition duration-300 mr-2"
            >
                Dashboard
            </Link>
            <button 
                onClick={handleLogout} 
                className="px-5 py-2 bg-[#d90a14] text-white font-semibold rounded-lg text-sm hover:bg-[#ff6b00] transition duration-300 shadow-lg shadow-[#d90a14]/30 flex items-center gap-x-1"
            >
                <FaSignOutAlt />
                <span className="hidden md:inline">Logout</span>
            </button>
        </>
    );

    const UserButtons = (
        <>
            <span className="text-gray-200 text-sm font-medium mr-4 hidden md:block">
                Welcome, {user?.name || 'User'}
            </span>
            <button 
                onClick={handleSubscriptionClick}
                disabled={loading}
                className="px-4 py-2 bg-gray-700 text-white font-semibold rounded-lg text-sm hover:bg-gray-600 transition duration-300 flex items-center space-x-2 disabled:opacity-50"
                title="My Subscription"
            >
                <FaClipboardList />
                <span className="hidden md:inline">
                    {loading ? "Loading..." : "My Subscription"}
                </span>
            </button>
            <button 
                onClick={handleLogout} 
                className="px-5 py-2 bg-[#d90a14] text-white font-semibold rounded-lg text-sm hover:bg-[#ff6b00] transition duration-300 shadow-lg shadow-[#d90a14]/30 flex items-center gap-x-1"
            >
                <FaSignOutAlt />
                <span className="hidden md:inline">Logout</span>
            </button>
        </>
    );

    const isAuthPage = ["/login", "/signup", "/about", "/contact"].includes(currentPath);

    return (
        <>
            <nav 
                className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${
                    isAuthPage 
                        ? 'bg-[#1d1d1d] shadow-md' 
                        : isScrolled 
                            ? 'bg-[#1d1d1d]/95 backdrop-blur-sm shadow-lg' 
                            : 'bg-transparent'
                }`}
            >
                <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex justify-between items-center">
                    <Link to="/" className="flex items-center z-50">
                        <img 
                            src={logo} 
                            alt="Logo" 
                            className="h-12 w-auto"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex space-x-8 text-sm font-medium">
                        {navItems.map((item) => (
                            <Link 
                                key={item.name}
                                to={item.path}
                                onClick={(e) => handleNavClick(e, item)}
                                className={`hover:text-red-500 transition duration-150 relative pb-1
                                    ${
                                        item.path === currentPath
                                            ? "text-red-500 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-red-500"
                                            : "text-gray-200"
                                    }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop Auth Buttons */}
                    <div className="hidden lg:flex space-x-4 items-center">
                        {user 
                            ? (isAdmin ? AdminButtons : UserButtons)
                            : AuthButtons
                        }
                    </div>

                    {/* Mobile Hamburger Button */}
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="lg:hidden text-white text-2xl z-50 p-2 hover:text-red-500 transition"
                    >
                        {isSidebarOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
            </nav>

            {/* Mobile Sidebar */}
            <div
                className={`fixed top-0 right-0 h-full w-[280px] bg-[#1d1d1d] shadow-2xl transform transition-transform duration-300 ease-in-out z-40 lg:hidden ${
                    isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className="flex flex-col h-full pt-24 px-6">
                    {/* User Welcome Message */}
                    {user && (
                        <div className="mb-6 pb-4 border-b border-gray-700">
                            <p className="text-gray-200 text-sm font-medium">
                                Welcome, {user?.name || (isAdmin ? 'Admin' : 'User')}
                            </p>
                        </div>
                    )}

                    {/* Navigation Links */}
                    <div className="flex flex-col space-y-4 mb-8">
                        {navItems.map((item) => (
                            <Link 
                                key={item.name}
                                to={item.path}
                                onClick={(e) => handleNavClick(e, item)}
                                className={`text-lg font-medium transition duration-150 py-2 px-4 rounded-lg ${
                                    item.path === currentPath
                                        ? "text-red-500 bg-red-500/10"
                                        : "text-gray-200 hover:text-red-500 hover:bg-red-500/5"
                                }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* Auth Buttons */}
                    <div className="flex flex-col space-y-3 mt-auto mb-8">
                        {user ? (
                            <>
                                {isAdmin ? (
                                    <Link 
                                        to="/admin/dashboard" 
                                        onClick={() => setIsSidebarOpen(false)}
                                        className="w-full px-4 py-3 bg-gray-700 text-white font-semibold rounded-lg text-sm hover:bg-gray-600 transition duration-300 text-center"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <button 
                                        onClick={handleSubscriptionClick}
                                        disabled={loading}
                                        className="w-full px-4 py-3 bg-gray-700 text-white font-semibold rounded-lg text-sm hover:bg-gray-600 transition duration-300 flex items-center justify-center space-x-2 disabled:opacity-50"
                                    >
                                        <FaClipboardList />
                                        <span>{loading ? "Loading..." : "My Subscription"}</span>
                                    </button>
                                )}
                                <button 
                                    onClick={handleLogout} 
                                    className="w-full px-4 py-3 bg-[#d90a14] text-white font-semibold rounded-lg text-sm hover:bg-[#ff6b00] transition duration-300 shadow-lg shadow-[#d90a14]/30 flex items-center justify-center gap-x-2"
                                >
                                    <FaSignOutAlt />
                                    <span>Logout</span>
                                </button>
                            </>
                        ) : (
                            <>
                                <Link 
                                    to="/login" 
                                    onClick={() => setIsSidebarOpen(false)}
                                    className="w-full px-4 py-3 border border-red-900 text-gray-200 rounded-lg text-sm hover:border-red-600 transition duration-300 text-center"
                                >
                                    Login
                                </Link>
                                <Link 
                                    to="/signup" 
                                    onClick={() => setIsSidebarOpen(false)}
                                    className="w-full px-4 py-3 bg-red-600 text-white font-semibold rounded-lg text-sm hover:bg-red-700 transition duration-300 shadow-lg shadow-red-500/30 text-center"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Overlay */}
            {isSidebarOpen && (
                <div
                    onClick={() => setIsSidebarOpen(false)}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
                />
            )}

            {/* Subscription Modal */}
            {showModal && (
                <SubscriptionModal 
                    subscription={subscription}
                    onClose={() => setShowModal(false)}
                />
            )}
        </>
    );
};

export default Navbar;