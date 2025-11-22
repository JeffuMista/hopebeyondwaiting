import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRightIcon,
  HeartIcon,
  ClockIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/outline";
import Footer from "../Footer";

const MainPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* HERO SECTION */}
      <div className="bg-gradient-to-br from-blue-900 to-blue-700 text-white p-12 md:p-20 rounded-b-3xl shadow-lg">
        <div className="max-w-5xl mx-auto text-center">

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Hope Beyond Waiting
          </h1>

          <p className="mt-6 text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
            Accelerating cancer care across Kenya.  
            Empowering patients with streamlined booking, faster access to treatment,
            and a modern digital care experience.
          </p>

          {/* CTA BUTTONS */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/sign-in"
              className="bg-white text-blue-900 px-6 py-3 rounded-xl font-semibold shadow hover:bg-blue-100"
            >
              Sign In
            </Link>

            <Link
              to="/sign-up"
              className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-xl font-semibold shadow text-white flex items-center gap-2"
            >
              Create Account
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* FEATURES SECTION */}
      <div className="max-w-6xl mx-auto mt-16 px-6 pb-20">

        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Why Patients Choose Hope Beyond Waiting
        </h2>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Feature 1 */}
          <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition">
            <ClockIcon className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900">
              Faster Treatment Access
            </h3>
            <p className="mt-2 text-gray-600">
              Automated booking helps patients get treatment sooner by eliminating long queues and manual delays.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition">
            <BuildingLibraryIcon className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900">
              Verified Cancer Centers
            </h3>
            <p className="mt-2 text-gray-600">
              Easily find available radiation, chemotherapy, and oncology centers near you.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition">
            <HeartIcon className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900">
              Patient-Centered Care
            </h3>
            <p className="mt-2 text-gray-600">
              Designed for dignity, speed, and compassion — ensuring no patient faces unnecessary delays.
            </p>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      {/* <footer className="bg-blue-900 text-blue-100 py-6 mt-10">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} Hope Beyond Waiting • Accelerating Cancer Care in Kenya
          </p>
        </div>
      </footer> */}
    </div>
  );
};

export default MainPage;
