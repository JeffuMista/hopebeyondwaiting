import React, { useEffect, useState } from "react";
import { useApi } from "../lib/api";
import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

import {
  MapPinIcon,
  BuildingOffice2Icon,
  ChevronDownIcon,
  ChevronUpIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

const CenterPage = () => {
  const api = useApi();
  const { user } = useUser();

  const [centers, setCenters] = useState([]);
  const [expanded, setExpanded] = useState({}); // track expanding center cards

  useEffect(() => {
    const loadCenters = async () => {
      try {
        const { data } = await api.get("/centers");
        setCenters(data);
      } catch (err) {
        console.error("Failed to load centers:", err);
      }
    };

    loadCenters();
  }, [api]);

  const toggleExpand = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="min-h-[75vh]">
      <div className="max-w-5xl mx-auto p-8 mt-10 bg-white rounded-2xl shadow-xl border border-gray-200">
        <h1 className="text-4xl font-bold mb-6">Cancer Treatment Centers</h1>

        <p className="text-gray-600 mb-10">
          Explore treatment centers across Kenya and check slot availability.
        </p>

        <div className="space-y-8">
          {centers.map((center) => (
            <div
              key={center._id}
              className="bg-gray-50 p-6 rounded-2xl shadow border border-gray-200"
            >
              {/* HEADER ROW */}
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-semibold flex items-center gap-2">
                    <BuildingOffice2Icon className="w-7 h-7 text-blue-700" />
                    {center.name}
                  </h2>

                  <p className="text-gray-700 flex items-center gap-2 mt-1">
                    <MapPinIcon className="w-5 h-5 text-gray-600" />
                    {center.county}, {center.address}
                  </p>

                  <p className="mt-2 text-sm text-gray-500">
                    Total Slots: {center.slots.length} • Capacity:{" "}
                    {center.capacity}
                  </p>
                </div>

                {/* BUTTON TO OPEN SLOT LIST */}
                <button
                  onClick={() => toggleExpand(center._id)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow flex items-center gap-2"
                >
                  {expanded[center._id] ? (
                    <>
                      Hide Slots <ChevronUpIcon className="w-5 h-5" />
                    </>
                  ) : (
                    <>
                      View Slots <ChevronDownIcon className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>

              {/* SLOT LIST */}
              {expanded[center._id] && (
                <div className="mt-6 space-y-4">
                  {center.slots.length === 0 && (
                    <p className="text-gray-600">No slots available.</p>
                  )}

                  {center.slots.map((slot, idx) => {
                    const available = slot.capacity - slot.booked;

                    return (
                      <div
                        key={idx}
                        className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex justify-between items-center"
                      >
                        <div>
                          <p className="text-gray-800 font-medium flex items-center gap-2">
                            <ClockIcon className="w-5 h-5 text-blue-600" />
                            {new Date(slot.start).toLocaleString()} →{" "}
                            {new Date(slot.end).toLocaleString()}
                          </p>

                          <p className="text-sm text-gray-600 mt-1">
                            Capacity: {slot.capacity} • Booked: {slot.booked} •{" "}
                            Available:{" "}
                            <span
                              className={
                                available > 0
                                  ? "text-green-700 font-semibold"
                                  : "text-red-700 font-semibold"
                              }
                            >
                              {available}
                            </span>
                          </p>
                        </div>

                        {/* CTA TO BOOK IF AVAILABLE */}
                        {available > 0 ? (
                          <Link
                            to="/book"
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl shadow"
                          >
                            Book Now
                          </Link>
                        ) : (
                          <span className="text-red-600 font-semibold">
                            Full
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div >
  );
};

export default CenterPage;
