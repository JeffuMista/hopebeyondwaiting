import React, { useEffect, useState } from "react";
import { useApi } from "../lib/api";
import { useUser } from "@clerk/clerk-react";
import {
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";

const AdminPage = () => {
  const api = useApi();
  const { user } = useUser();

  const [pendingBookings, setPendingBookings] = useState([]);
  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ------------------------------------------
  // 1. Load pending bookings + centers
  // ------------------------------------------
  useEffect(() => {
    const loadAdminData = async () => {
      try {
        const bookingsRes = await api.get("/bookings/pending");
        setPendingBookings(bookingsRes.data);

        const centersRes = await api.get("/centers");
        setCenters(centersRes.data);

      } catch (err) {
        setError("Failed to load admin data");
      } finally {
        setLoading(false);
      }
    };

    loadAdminData();
  }, [api]);

  // ------------------------------------------
  // 2. Approve Booking
  // ------------------------------------------
  const approveBooking = async (id) => {
    try {
      const res = await api.post(`/bookings/${id}/approve`);
      setSuccess("Booking approved successfully!");

      // Remove from pending
      setPendingBookings((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Approval failed");
    }
  };

  // ------------------------------------------
  // 3. Reject Booking
  // ------------------------------------------
  const rejectBooking = async (id) => {
    try {
      const res = await api.post(`/bookings/${id}/reject`);
      setSuccess("Booking rejected and slot restored.");

      // Remove from pending list
      setPendingBookings((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Rejection failed");
    }
  };

  if (!user)
    return (
      <p className="text-center text-gray-600 mt-10">Login required.</p>
    );

  if (loading)
    return (
      <div className="text-center mt-10 text-gray-600">Loading dashboard...</div>
    );

  return (
    <div className="max-w-6xl mx-auto p-8 mt-10 bg-white shadow-xl rounded-2xl border border-gray-200">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">
        Admin Dashboard
      </h1>

      {/* Success Alert */}
      {success && (
        <div className="mb-6 flex items-center gap-3 bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl">
          <CheckCircleIcon className="w-6 h-6" />
          <p>{success}</p>
        </div>
      )}

      {/* Error Alert */}
      {error && (
        <div className="mb-6 flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl">
          <ExclamationTriangleIcon className="w-6 h-6" />
          <p>{error}</p>
        </div>
      )}

      {/* GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* PENDING BOOKINGS */}
        <div className="bg-gray-50 p-6 rounded-2xl shadow border border-gray-200">
          <h2 className="text-2xl font-semibold mb-4">Pending Bookings</h2>

          {pendingBookings.length === 0 ? (
            <p className="text-gray-600">No pending bookings.</p>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="py-2 font-medium text-gray-700">Patient</th>
                  <th className="py-2 font-medium text-gray-700">Center</th>
                  <th className="py-2 font-medium text-gray-700">Slot</th>
                  <th className="py-2 font-medium text-gray-700"></th>
                </tr>
              </thead>

              <tbody>
                {pendingBookings.map((booking) => (
                  <tr key={booking._id} className="border-b">
                    <td className="py-3">
                      {booking.user?.name || "User"}
                    </td>

                    <td className="py-3">
                      {booking.center?.name}
                    </td>

                    <td className="py-3 text-sm text-gray-600">
                      {new Date(booking.slot.start).toLocaleString()}
                    </td>

                    <td className="py-3 flex gap-2">

                      {/* Approve */}
                      <button
                        onClick={() => approveBooking(booking._id)}
                        className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow"
                      >
                        Approve
                      </button>

                      {/* Reject */}
                      <button
                        onClick={() => rejectBooking(booking._id)}
                        className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* CENTERS LIST */}
        <div className="bg-gray-50 p-6 rounded-2xl shadow border border-gray-200">
          <h2 className="text-2xl font-semibold mb-4">Treatment Centers</h2>

          {centers.map((center) => (
            <div
              key={center._id}
              className="p-4 mb-3 bg-white rounded-xl border border-gray-200 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-gray-900">
                {center.name}
              </h3>
              <p className="text-gray-700">{center.county}</p>

              <p className="text-sm text-gray-500 mt-2">
                Slots: {center.slots.length}
              </p>

              <button className="mt-3 px-3 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">
                Manage Slots
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default AdminPage;
