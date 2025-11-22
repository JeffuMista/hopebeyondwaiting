import React, { useEffect, useState } from "react";
import { useApi } from "./lib/api";
import { useUser } from "@clerk/clerk-react";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";

const BookingComponent = () => {
  const api = useApi();
  const { user } = useUser();

  const [centers, setCenters] = useState([]);
  const [selectedCenter, setSelectedCenter] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  // Load centers
  useEffect(() => {
    const fetchCenters = async () => {
      try {
        const { data } = await api.get("/centers");
        setCenters(data);
      } catch (err) {
        console.error("Error loading centers:", err);
      }
    };
    fetchCenters();
  }, [api]);

  const handleBooking = async () => {
    if (!selectedCenter) {
      setError("Please select a center.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const body = {
        userId: user?.id,
        centerId: selectedCenter,
      };

      const response = await api.post("/bookings", body);
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Booking failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh]">
      <div className="max-w-2xl mx-auto mt-10 bg-white shadow-xl border border-gray-200 rounded-2xl p-8">
        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Book a Treatment Slot
        </h2>
        <p className="text-gray-600 mb-8">
          Select your preferred cancer treatment center to request an automatic
          appointment slot.
        </p>

        {/* Center Selector */}
        <div className="mb-6">
          <label className="block font-semibold text-gray-700 mb-2">
            Select Treatment Center
          </label>

          <select
            className="w-full border border-gray-300 rounded-xl p-3 text-gray-700 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            value={selectedCenter}
            onChange={(e) => setSelectedCenter(e.target.value)}
          >
            <option value="">-- Choose a Center --</option>
            {centers.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name} — {c.county}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleBooking}
          disabled={loading}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md transition-all"
        >
          {loading ? "Submitting Request..." : "Request Booking"}
        </button>

        {/* Error Message */}
        {error && (
          <div className="mt-6 flex items-start gap-3 bg-red-50 border border-red-200 text-red-800 p-4 rounded-xl">
            <ExclamationTriangleIcon className="w-6 h-6" />
            <p className="font-medium">{error}</p>
          </div>
        )}

        {/* Success Message */}
        {result && (
          <div className="mt-6 bg-green-50 border border-green-200 p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircleIcon className="w-7 h-7 text-green-600" />
              <h3 className="text-xl font-semibold text-green-700">
                Booking Successfully Submitted
              </h3>
            </div>

            <p className="text-gray-700 mb-3">
              <span className="font-semibold">Status:</span>{" "}
              {result.booking.status}
            </p>

            <p className="text-gray-700 mb-3">
              <span className="font-semibold">Center:</span>{" "}
              {result.booking.center}
            </p>

            <p className="text-gray-700">
              <span className="font-semibold">Assigned Slot:</span>{" "}
              {new Date(result.assignedSlot.start).toLocaleString()} →{" "}
              {new Date(result.assignedSlot.end).toLocaleString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingComponent;
