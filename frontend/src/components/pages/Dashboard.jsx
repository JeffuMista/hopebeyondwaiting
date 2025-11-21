import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useApi } from "../lib/api";

import AdminPage from "./AdminPage";
import UserPage from "./UserPage";
import MainPage from "./MainPage";

const Dashboard = () => {
  const { user, isLoaded } = useUser();
  const api = useApi();

  const [mongoUser, setMongoUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // --------------------------------------------------
  // 1. If user is logged in, load their MongoDB record
  // --------------------------------------------------
  useEffect(() => {
    const load = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await api.get("/users");
        const found = data.find((u) => u.userId === user.id);
        setMongoUser(found);
      } catch (err) {
        console.error("Error loading Mongo user:", err);
      }

      setLoading(false);
    };

    load();
  }, [api, user]);

  // Loading UI
  if (!isLoaded || loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-[3px] border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  // --------------------------------------------------
  // 2. User NOT logged in → Main Page
  // --------------------------------------------------
  if (!user) {
    return <MainPage />;
  }

  // --------------------------------------------------
  // 3. If user exists but MongoDB record missing
  // Show "complete profile" message
  // --------------------------------------------------
  if (!mongoUser) {
    return (
      <div className="flex items-center justify-center h-screen px-6">
        <div className="bg-white shadow-xl p-10 rounded-2xl max-w-md text-center">
          <h1 className="text-2xl font-bold mb-3">Profile Incomplete</h1>
          <p className="text-gray-600">
            Your account exists in Clerk but not in our system.
            Please complete your profile.
          </p>

          <a
            href="/profile"
            className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-xl shadow hover:bg-blue-700"
          >
            Complete Profile
          </a>
        </div>
      </div>
    );
  }

  // --------------------------------------------------
  // 4. ROLE ROUTING
  // --------------------------------------------------
  if (mongoUser.role === "admin") {
    return <AdminPage />;
  }

  return <UserPage />;
};

export default Dashboard;
