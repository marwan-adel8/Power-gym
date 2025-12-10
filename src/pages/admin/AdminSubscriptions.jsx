import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  getPendingSubscriptions,
  approveSubscription,
  rejectSubscription,
} from "../../services/adminService";
import AdminLayout from "../../components/AdminLayout";
import Swal from "sweetalert2";

const AdminSubscriptions = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/admin/dashboard");
      return;
    }

    fetchSubscriptions();
  }, [user, navigate]);

  const fetchSubscriptions = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getPendingSubscriptions();
      setSubscriptions(data);
    } catch (err) {
      console.error("Error fetching subscriptions:", err);
      setError("Failed to load subscriptions");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    const result = await Swal.fire({
      icon: "question",
      title: "Approve Subscription?",
      text: "Are you sure you want to approve this subscription?",
      background: "#1d1d1d",
      color: "#fff",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, approve it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        setProcessingId(id);
        await approveSubscription(id);
        
        await Swal.fire({
          icon: "success",
          title: "Approved!",
          text: "Subscription has been approved successfully!",
          background: "#1d1d1d",
          color: "#fff",
          confirmButtonColor: "#d90a14",
          timer: 2000,
          timerProgressBar: true,
        });
        
        await fetchSubscriptions();
      } catch (err) {
        console.error("Error approving subscription:", err);
        await Swal.fire({
          icon: "error",
          title: "Approval Failed",
          text: "Failed to approve subscription",
          background: "#1d1d1d",
          color: "#fff",
          confirmButtonColor: "#d90a14",
        });
      } finally {
        setProcessingId(null);
      }
    }
  };

  const handleReject = async (id) => {
    const result = await Swal.fire({
      icon: "warning",
      title: "Reject Subscription?",
      text: "Are you sure you want to reject and delete this subscription?",
      background: "#1d1d1d",
      color: "#fff",
      showCancelButton: true,
      confirmButtonColor: "#d90a14",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, reject it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        setProcessingId(id);
        await rejectSubscription(id);
        
        await Swal.fire({
          icon: "success",
          title: "Rejected!",
          text: "Subscription has been rejected and removed!",
          background: "#1d1d1d",
          color: "#fff",
          confirmButtonColor: "#d90a14",
          timer: 2000,
          timerProgressBar: true,
        });
        
        await fetchSubscriptions();
      } catch (err) {
        console.error("Error rejecting subscription:", err);
        await Swal.fire({
          icon: "error",
          title: "Rejection Failed",
          text: "Failed to reject subscription",
          background: "#1d1d1d",
          color: "#fff",
          confirmButtonColor: "#d90a14",
        });
      } finally {
        setProcessingId(null);
      }
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="text-white text-xl">Loading subscriptions...</div>
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
              Pending Subscriptions
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
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Plan
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Payment Image
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-[#1a1a1a] divide-y divide-gray-800">
                  {subscriptions.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="px-6 py-4 text-center text-gray-400">
                        No pending subscriptions
                      </td>
                    </tr>
                  ) : (
                    subscriptions.map((sub) => (
                      <tr key={sub._id} className="hover:bg-[#252525] transition">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-white">{sub.userName}</div>
                          <div className="text-sm text-gray-400">{sub.userPhone}</div>
                          <div className="text-xs text-gray-500">{sub.user?.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-white">{sub.plan?.name}</div>
                          <div className="text-xs text-gray-400">
                            {sub.plan?.duration} days - ${sub.plan?.price}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {sub.paymentImage ? (
                            <a
                              href={sub.paymentImage}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:text-blue-300 text-sm"
                            >
                              View Image
                            </a>
                          ) : (
                            <span className="text-gray-500 text-sm">No image</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleApprove(sub._id)}
                              disabled={processingId === sub._id}
                              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition disabled:opacity-50"
                            >
                              {processingId === sub._id ? "..." : "Approve"}
                            </button>
                            <button
                              onClick={() => handleReject(sub._id)}
                              disabled={processingId === sub._id}
                              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition disabled:opacity-50"
                            >
                              {processingId === sub._id ? "..." : "Reject"}
                            </button>
                          </div>
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
            {subscriptions.length === 0 ? (
              <div className="bg-[#1a1a1a] rounded-lg border border-gray-800 p-6 text-center text-gray-400">
                No pending subscriptions
              </div>
            ) : (
              subscriptions.map((sub) => (
                <div
                  key={sub._id}
                  className="bg-[#1a1a1a] rounded-lg border border-gray-800 p-4 space-y-4"
                >
                  {/* User Info */}
                  <div>
                    <h3 className="text-white font-semibold text-lg">{sub.userName}</h3>
                    <p className="text-gray-400 text-sm">{sub.userPhone}</p>
                    {sub.user?.email && (
                      <p className="text-gray-500 text-xs">{sub.user.email}</p>
                    )}
                  </div>

                  {/* Plan Info */}
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Plan:</span>
                      <span className="text-white">{sub.plan?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Duration:</span>
                      <span className="text-gray-300">{sub.plan?.duration} days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Price:</span>
                      <span className="text-gray-300">${sub.plan?.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Payment:</span>
                      {sub.paymentImage ? (
                        <a
                          href={sub.paymentImage}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300"
                        >
                          View Image
                        </a>
                      ) : (
                        <span className="text-gray-500">No image</span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => handleApprove(sub._id)}
                      disabled={processingId === sub._id}
                      className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition disabled:opacity-50"
                    >
                      {processingId === sub._id ? "..." : "Approve"}
                    </button>
                    <button
                      onClick={() => handleReject(sub._id)}
                      disabled={processingId === sub._id}
                      className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition disabled:opacity-50"
                    >
                      {processingId === sub._id ? "..." : "Reject"}
                    </button>
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

export default AdminSubscriptions;
