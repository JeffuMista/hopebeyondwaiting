import React, { useEffect, useState } from "react";
import { useApi } from "./lib/api";
import { useUser } from "@clerk/clerk-react";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";

const UserComponent = () => {
  const api = useApi();
  const { user } = useUser();

  const [mongoUser, setMongoUser] = useState(null);
  const [form, setForm] = useState({ name: "", phone: "", nationalId: "" });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ----------------------------------
  // 1. Load MongoDB user on mount
  // ----------------------------------
  useEffect(() => {
    const loadUser = async () => {
      try {
        const { data } = await api.get("/users");
        const matched = data.find((u) => u.userId === user?.id);

        if (matched) {
          setMongoUser(matched);
          setForm({
            name: matched.name || "",
            phone: matched.phone || "",
            nationalId: matched.nationalId || "",
          });
        }
      } catch (err) {
        console.error("Error loading user:", err);
      }
    };

    if (user) loadUser();
  }, [api, user]);

  // ----------------------------------
  // 2. Handle form change
  // ----------------------------------
  const updateField = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ----------------------------------
  // 3. Save updates to backend
  // ----------------------------------
  const handleSave = async () => {
    if (!mongoUser) {
      setError("User record not found in database.");
      return;
    }

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const { data } = await api.put(`/users/${mongoUser._id}`, {
        ...form,
        userId: user.id,
      });

      setSuccess("Profile updated successfully!");
      setMongoUser(data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  if (!user)
    return (
      <p className="text-center text-gray-600 mt-10">
        You must be logged in to view your profile.
      </p>
    );

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        Your Profile Details
      </h2>

      <p className="text-gray-600 mb-6">
        Update your personal information used for booking cancer treatment.
      </p>

      {/* Clerk Basic Info */}
      <div className="bg-gray-50 p-4 rounded-xl mb-8 border border-gray-200">
        <h3 className="text-lg font-semibold mb-2">Clerk Account Info</h3>
        <p className="text-gray-700">
          <strong>Email:</strong> {user.primaryEmailAddress?.emailAddress}
        </p>
        <p className="text-gray-700">
          <strong>User ID:</strong> {user.id}
        </p>
      </div>

      {/* Form */}
      <div className="space-y-5">
        {/* Name */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            name="name"
            value={form.name}
            onChange={updateField}
            className="w-full border border-gray-300 rounded-xl p-3 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
            placeholder="Enter full name"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            name="phone"
            value={form.phone}
            onChange={updateField}
            className="w-full border border-gray-300 rounded-xl p-3 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
            placeholder="0700 000 000"
          />
        </div>

        {/* National ID */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            National ID
          </label>
          <input
            name="nationalId"
            value={form.nationalId}
            onChange={updateField}
            className="w-full border border-gray-300 rounded-xl p-3 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
            placeholder="ID Number"
          />
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        disabled={saving}
        className="mt-6 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md transition-all"
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>

      {/* Error Alert */}
      {error && (
        <div className="mt-6 flex items-start gap-3 bg-red-50 border border-red-200 text-red-800 p-4 rounded-xl">
          <ExclamationTriangleIcon className="w-6 h-6" />
          <p>{error}</p>
        </div>
      )}

      {/* Success Alert */}
      {success && (
        <div className="mt-6 flex items-start gap-3 bg-green-50 border border-green-200 text-green-800 p-4 rounded-xl">
          <CheckCircleIcon className="w-6 h-6" />
          <p>{success}</p>
        </div>
      )}
    </div>
  );
};

export default UserComponent;
