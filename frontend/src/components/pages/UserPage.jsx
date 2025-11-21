import React, { useEffect, useState } from "react";
import { useApi } from "../lib/api";
import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import {
  CalendarDaysIcon,
  UserCircleIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

const UserPage = () => {
  const api = useApi();
  const { user } = useUser();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // -------------------------------------------
  // 1. Load bookings for current user
  // -------------------------------------------
  useEffect(() => {
    const load = async () => {
      try {
        if (!user) return;

        const { data } = await api.get("/bookings");
        const userBookings = data.filter((b) => b.user === user.id);

        setBookings(userBookings);
      } catch (err) {
        console.error("Failed to load user bookings:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [api, user]);

  if (!user)
    return (
      <p className="text-center text-gray-600 mt-10">
        You must be logged in to view this page.
      </p>
    );

  if (loading)
    return (
      <p className="text-center text-gray-600 mt-10">
        Loading your dashboard...
      </p>
    );

  // Split bookings
  const upcoming = bookings.find((b) => b.status === "approved");
  const history = bookings.filter((b) => b.status !== "approved");

  return (
    <div className="max-w-5xl mx-auto p-8 mt-10 bg-white rounded-2xl shadow-xl border border-gray-200">
      {/* HEADER */}
      <h1 className="text-4xl font-bold mb-6">
        Welcome, {user.firstName || "Patient"} 👋
      </h1>

      <p className="text-gray-600 mb-10">
        Manage your cancer treatment bookings and profile.
      </p>

      {/* GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* UPCOMING APPOINTMENT */}
        <div className="bg-blue-50 p-6 rounded-2xl shadow border border-blue-200">
          <h2 className="text-2xl font-semibold text-blue-900 mb-4 flex items-center gap-2">
            <ClockIcon className="w-6 h-6" />
            Upcoming Appointment
          </h2>

          {!upcoming ? (
            <p className="text-blue-900">
              You have no upcoming approved bookings.
            </p>
          ) : (
            <div className="bg-white p-4 rounded-xl shadow border border-gray-200">
              <p className="text-gray-700">
                <strong>Center:</strong> {upcoming.center}
              </p>
              <p className="text-gray-700">
                <strong>Time:</strong>{" "}
                {new Date(upcoming.slot.start).toLocaleString()}
              </p>
              <p className="text-gray-700 mt-2">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    upcoming.status === "approved"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {upcoming.status}
                </span>
              </p>
            </div>
          )}

          <Link
            to="/book"
            className="mt-5 inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl shadow"
          >
            Book New Appointment
          </Link>
        </div>

        {/* USER PROFILE QUICK INFO */}
        <div className="bg-gray-50 p-6 rounded-2xl shadow border border-gray-200">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <UserCircleIcon className="w-7 h-7" />
            Your Profile
          </h2>

          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow">
            <p className="text-gray-700">
              <strong>Email:</strong> {user.primaryEmailAddress?.emailAddress}
            </p>
            <p className="text-gray-700 mt-1">
              <strong>User ID:</strong> {user.id}
            </p>
          </div>

          <Link
            to="/profile"
            className="mt-5 inline-block bg-gray-800 hover:bg-black text-white px-4 py-2 rounded-xl shadow"
          >
            Edit Profile
          </Link>
        </div>

      </div>

      {/* BOOKING HISTORY */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold flex items-center gap-2 mb-4">
          <CalendarDaysIcon className="w-7 h-7" />
          Booking History
        </h2>

        {history.length === 0 ? (
          <p className="text-gray-600">No booking history available.</p>
        ) : (
          <div className="space-y-4">
            {history.map((b) => (
              <div
                key={b._id}
                className="p-4 bg-white rounded-xl border border-gray-200 shadow"
              >
                <p className="text-gray-700">
                  <strong>Center:</strong> {b.center}
                </p>

                <p className="text-gray-700">
                  <strong>Time:</strong>{" "}
                  {new Date(b.slot.start).toLocaleString()}
                </p>

                <p className="text-gray-700">
                  <strong>Status:</strong>{" "}
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      b.status === "rejected"
                        ? "bg-red-100 text-red-700"
                        : b.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {b.status}
                  </span>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPage;
