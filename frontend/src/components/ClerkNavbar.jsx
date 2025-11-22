import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react";
import { useApi } from "./lib/api";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
  const { user, isSignedIn } = useUser();
  const api = useApi();

  const [mongoUser, setMongoUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // -----------------------------------------------------
  // 1️⃣ AUTO-REGISTER CLERK USER INTO MONGODB
  // -----------------------------------------------------
  useEffect(() => {
    const registerClerkUser = async () => {
      if (!user) return;

      try {
        await api.post("/auth/register", {
          userId: user.id,
          name: user.fullName || "",
          email: user.primaryEmailAddress?.emailAddress || "",
        });

        // After registering, re-fetch Mongo user
        const { data } = await api.get("/users");
        const found = data.find((u) => u.userId === user.id);
        setMongoUser(found);
      } catch (err) {
        console.error("Auto-register error:", err);
      }
    };

    registerClerkUser();
  }, [user, api]);

  // -----------------------------------------------------
  // 2️⃣ FETCH MONGO USER (Ensures role detection works)
  // -----------------------------------------------------
  useEffect(() => {
    const loadUser = async () => {
      try {
        if (!user) return;

        const { data } = await api.get("/users");
        const found = data.find((u) => u.userId === user.id);
        setMongoUser(found);
      } catch (err) {
        console.error("Navbar user load error:", err);
      }
    };

    loadUser();
  }, [api, user]);

  const isAdmin = mongoUser?.role === "admin";

  return (
    <nav className="bg-white shadow-md border-b border-gray-200 p-5">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* BRAND */}
        <Link to="/" className="text-2xl font-bold text-blue-800 flex felx-column">
          <div className="flex flex-column justify-center items-center">
            <img src="./public/cancerribbon.jpg" alt="Cancer Ribbon" className="w-10" />
            Hope Beyond Waiting
          </div> 
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-white hover:text-gray-700 p-2 border rounded-sm bg-blue-500 font-bold cursor-pointer">
            Home
          </Link>

          <Link to="/centers" className="text-white hover:text-gray-700 p-2 border rounded-sm bg-blue-500 font-bold cursor-pointer">
            Centers
          </Link>

          {isSignedIn && (
            <>
              <Link
                to="/dashboard"
                className="text-white hover:text-gray-700 p-2 border rounded-sm bg-blue-500 font-bold cursor-pointer"
              >
                Dashboard
              </Link>

              <Link to="/book" className="text-white hover:text-gray-700 p-2 border rounded-sm bg-blue-500 font-bold cursor-pointer">
                Book Appointment
              </Link>

              {isAdmin && (
                <Link
                  to="/admin"
                  className="text-white hover:text-gray-700 p-2 border rounded-sm bg-blue-500 font-bold cursor-pointer"
                >
                  Admin Panel
                </Link>
              )}

              <div className="ml-4">
                <UserButton />
              </div>
            </>
          )}

          {!isSignedIn && (
            <>
              <Link
                to="/sign-in"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl shadow"
              >
                Login
              </Link>

              <Link
                to="/sign-up"
                className="bg-gray-800 hover:bg-black text-white px-4 py-2 rounded-xl shadow"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? (
            <XMarkIcon className="w-7 h-7 text-gray-800" />
          ) : (
            <Bars3Icon className="w-7 h-7 text-gray-800" />
          )}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-6 pb-6 space-y-4">
          <Link to="/" className="block text-gray-700 hover:text-blue-700">
            Home
          </Link>

          <Link
            to="/centers"
            className="block text-gray-700 hover:text-blue-700"
          >
            Centers
          </Link>

          {isSignedIn && (
            <>
              <Link
                to="/dashboard"
                className="block text-gray-700 hover:text-blue-700"
              >
                Dashboard
              </Link>

              <Link
                to="/book"
                className="block text-gray-700 hover:text-blue-700"
              >
                Book Appointment
              </Link>

              {isAdmin && (
                <Link to="/admin" className="block text-red-700 font-semibold">
                  Admin Panel
                </Link>
              )}

              <div className="pt-3">
                <UserButton />
              </div>
            </>
          )}

          {!isSignedIn && (
            <>
              <Link
                to="/sign-in"
                className="block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl shadow text-center"
              >
                Login
              </Link>

              <Link
                to="/sign-up"
                className="block bg-gray-800 hover:bg-black text-white px-4 py-2 rounded-xl shadow text-center"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
