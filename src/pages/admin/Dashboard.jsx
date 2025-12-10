import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';
import { getPlans } from '../../services/plansService';
import { getCoaches } from '../../services/coachService';
import { getApprovedSubscriptions } from '../../services/subscriptionService';
import { secureStorage } from '../../utils/secureStorage';
import { FaDumbbell, FaUsers, FaCheckCircle, FaChartLine } from 'react-icons/fa';

const StatCard = ({ title, value, icon, color, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-2xl hover:border-${color}-500/30 transition-all duration-300 cursor-pointer transform hover:scale-105`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-4 bg-${color}-600/20 rounded-xl`}>
          <div className={`text-${color}-500 text-3xl`}>
            {icon}
          </div>
        </div>
        <div className="text-right">
          <p className="text-gray-400 text-sm uppercase tracking-wider">{title}</p>
          <p className="text-4xl font-bold text-white mt-1">{value}</p>
        </div>
      </div>
      <div className={`h-1 bg-gradient-to-r from-${color}-600 to-${color}-400 rounded-full`}></div>
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    plansCount: 0,
    coachesCount: 0,
    subscribersCount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('Admin');

  useEffect(() => {
    // Get admin name from secureStorage
    const user = secureStorage.getItem('user_data');
    if (user) {
      setUserName(user.name || 'Admin');
    }

    // Fetch all statistics
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      
      // Fetch plans
      let plansData = [];
      try {
        plansData = await getPlans();
      } catch (err) {
        console.error('Error fetching plans:', err);
      }

      // Fetch coaches
      let coachesData = [];
      try {
        coachesData = await getCoaches();
      } catch (err) {
        console.error('Error fetching coaches:', err);
      }

      // Fetch approved subscribers
      let subscribersData = [];
      try {
        subscribersData = await getApprovedSubscriptions();
      } catch (err) {
        console.error('Error fetching subscribers:', err);
      }

      setStats({
        plansCount: plansData.length || 0,
        coachesCount: coachesData.length || 0,
        subscribersCount: subscribersData.length || 0,
      });

    } catch (err) {
      console.error('Error fetching stats:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-white text-xl">Loading dashboard...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <section
        className="min-h-screen p-8 relative"
        style={{
          backgroundColor: "#1d1d1d",
          backgroundImage:
            "radial-gradient(circle at center, rgba(119, 6, 11, 0.55) 0%, rgba(119, 6, 11, 0.25) 20%, rgba(29, 29, 29, 0.95) 60%, #1d1d1d 100%)",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 
            className="text-5xl font-bold text-white mb-2 uppercase tracking-wider"
            style={{ fontFamily: "Gagalin, sans-serif" }}
          >
            Welcome Back, <span className="text-[#ff6b00]">{userName}</span>
          </h1>
          <p className="text-gray-400 text-lg">Here's what's happening with your gym today</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard
            title="Total Plans"
            value={stats.plansCount}
            icon={<FaDumbbell />}
            color="red"
            onClick={() => navigate('/admin/manage-plans')}
          />
          
          <StatCard
            title="Total Coaches"
            value={stats.coachesCount}
            icon={<FaUsers />}
            color="orange"
            onClick={() => navigate('/admin/manage-coaches')}
          />
          
          <StatCard
            title="Active Subscribers"
            value={stats.subscribersCount}
            icon={<FaCheckCircle />}
            color="green"
            onClick={() => navigate('/admin/subscribers')}
          />
          
          <StatCard
            title="Total Revenue"
            value="--"
            icon={<FaChartLine />}
            color="blue"
            onClick={() => {}}
          />
        </div>

        {/* Quick Actions */}
        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-2xl">
          <h2 
            className="text-2xl font-bold text-white mb-6 uppercase tracking-wider"
            style={{ fontFamily: "Gagalin, sans-serif" }}
          >
            Quick <span className="text-[#ff6b00]">Actions</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={() => navigate('/admin/add-plan')}
              className="p-4 bg-gradient-to-r from-[#d90a14] to-[#b90810] hover:from-[#ff6b00] hover:to-[#d90a14] text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-red-600/40 transform hover:-translate-y-1"
            >
              + Add New Plan
            </button>
            
            <button
              onClick={() => navigate('/admin/add-coach')}
              className="p-4 bg-gradient-to-r from-[#ff6b00] to-[#d90a14] hover:from-[#d90a14] hover:to-[#b90810] text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-orange-600/40 transform hover:-translate-y-1"
            >
              + Add New Coach
            </button>
            
            <button
              onClick={() => navigate('/admin/subscriptions')}
              className="p-4 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-gray-600/40 transform hover:-translate-y-1"
            >
              View Subscriptions
            </button>
            
            <button
              onClick={() => navigate('/admin/subscribers')}
              className="p-4 bg-gradient-to-r from-green-700 to-green-800 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-green-600/40 transform hover:-translate-y-1"
            >
              View Subscribers
            </button>
          </div>
        </div>

        {/* Recent Activity Section (Optional - can be added later) */}
        <div className="mt-12 bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-2xl">
          <h2 
            className="text-2xl font-bold text-white mb-6 uppercase tracking-wider"
            style={{ fontFamily: "Gagalin, sans-serif" }}
          >
            System <span className="text-[#ff6b00]">Overview</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-black/20 rounded-xl border border-white/5">
              <p className="text-gray-400 text-sm uppercase mb-2">Plans Status</p>
              <p className="text-white text-2xl font-bold">{stats.plansCount} Active</p>
            </div>
            
            <div className="text-center p-6 bg-black/20 rounded-xl border border-white/5">
              <p className="text-gray-400 text-sm uppercase mb-2">Coaches Status</p>
              <p className="text-white text-2xl font-bold">{stats.coachesCount} Active</p>
            </div>
            
            <div className="text-center p-6 bg-black/20 rounded-xl border border-white/5">
              <p className="text-gray-400 text-sm uppercase mb-2">Subscribers Status</p>
              <p className="text-white text-2xl font-bold">{stats.subscribersCount} Active</p>
            </div>
          </div>
        </div>
      </section>
    </AdminLayout>
  );
};

export default Dashboard;
