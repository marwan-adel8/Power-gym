import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getApprovedSubscriptions, deleteSubscription } from "../../services/adminService";
import { FaTimes } from "react-icons/fa";
import AdminLayout from "../../components/AdminLayout";
import Swal from "sweetalert2";

const ApprovedSubscribers = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/admin/dashboard");
      return;
    }

    fetchSubscribers();
  }, [user, navigate]);

  const fetchSubscribers = async () => {
    try {
      setLoading(true);
      const data = await getApprovedSubscriptions();
      setSubscribers(data);
    } catch (err) {
      console.error("Error fetching subscribers:", err);
      setError("Failed to load subscribers");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      icon: "warning",
      title: "Remove Subscriber?",
      text: "Are you sure you want to remove this subscriber?",
      background: "#1d1d1d",
      color: "#fff",
      showCancelButton: true,
      confirmButtonColor: "#d90a14",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, remove it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await deleteSubscription(id);
        setSubscribers(subscribers.filter((sub) => sub._id !== id));
        
        await Swal.fire({
          icon: "success",
          title: "Removed!",
          text: "Subscriber has been removed successfully!",
          background: "#1d1d1d",
          color: "#fff",
          confirmButtonColor: "#d90a14",
          timer: 2000,
          timerProgressBar: true,
        });
      } catch (err) {
        console.error("Error deleting subscriber:", err);
        await Swal.fire({
          icon: "error",
          title: "Delete Failed",
          text: "Failed to delete subscriber",
          background: "#1d1d1d",
          color: "#fff",
          confirmButtonColor: "#d90a14",
        });
      }
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-white text-xl">Loading subscribers...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="min-h-screen bg-black py-6 md:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 md:mb-8">
            <h1
              className="text-2xl md:text-4xl font-bold text-white uppercase"
              style={{ fontFamily: "Gagalin, sans-serif" }}
            >
              Approved Subscribers
            </h1>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-900/50 border border-red-600 rounded-lg text-red-200">
              {error}
            </div>
          )}

          {/* Desktop Table View */}
          <div className="hidden md:block bg-[#1a1a1a] rounded-lg border border-gray-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-800">
                <thead className="bg-[#2a2a2a]">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Phone
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Plan
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Start Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      End Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-[#1a1a1a] divide-y divide-gray-800">
                  {subscribers.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="px-6 py-4 text-center text-gray-400">
                        No approved subscribers found
                      </td>
                    </tr>
                  ) : (
                    subscribers.map((sub) => (
                      <tr key={sub._id} className="hover:bg-[#252525] transition">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                          {sub.userName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {sub.userPhone}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {sub.plan?.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {sub.startDate ? new Date(sub.startDate).toLocaleDateString() : "-"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          {sub.endDate ? new Date(sub.endDate).toLocaleDateString() : "-"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-900 text-green-200">
                            {sub.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                          <button
                            onClick={() => handleDelete(sub._id)}
                            className="text-red-500 hover:text-red-700 transition"
                            title="Remove Subscriber"
                          >
                            <FaTimes size={18} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-4">
            {subscribers.length === 0 ? (
              <div className="bg-[#1a1a1a] rounded-lg border border-gray-800 p-6 text-center text-gray-400">
                No approved subscribers found
              </div>
            ) : (
              subscribers.map((sub) => (
                <div
                  key={sub._id}
                  className="bg-[#1a1a1a] rounded-lg border border-gray-800 p-4 space-y-3"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-white font-semibold text-lg">{sub.userName}</h3>
                      <p className="text-gray-400 text-sm">{sub.userPhone}</p>
                    </div>
                    <button
                      onClick={() => handleDelete(sub._id)}
                      className="text-red-500 hover:text-red-700 transition p-2"
                      title="Remove Subscriber"
                    >
                      <FaTimes size={20} />
                    </button>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Plan:</span>
                      <span className="text-white">{sub.plan?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Start Date:</span>
                      <span className="text-gray-300">
                        {sub.startDate ? new Date(sub.startDate).toLocaleDateString() : "-"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">End Date:</span>
                      <span className="text-gray-300">
                        {sub.endDate ? new Date(sub.endDate).toLocaleDateString() : "-"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Status:</span>
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-900 text-green-200">
                        {sub.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ApprovedSubscribers;
