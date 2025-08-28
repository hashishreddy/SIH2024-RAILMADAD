"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const Dashboard = ({ logoSrc }) => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch in-progress complaints
  const fetchComplaints = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/complaints");
      const data = await response.json();
      // Filter complaints to show only those with status "In Progress"
      const inProgressComplaints = data.filter(
        (complaint) => complaint.status === "In Progress"
      );
      setComplaints(inProgressComplaints);
    } catch (error) {
      console.error("Error fetching complaints:", error);
    } finally {
      setLoading(false);
    }
  };

  // Simulate status update by removing the complaint from the local state
  const updateStatus = (id) => {
    setComplaints((prevComplaints) =>
      prevComplaints.filter((complaint) => complaint._id !== id)
    );
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  return (
    <section className="relative w-full h-[820px] overflow-hidden">
      <br />
      <br />
      <br />
      <br />
      <Image
        src={logoSrc}
        alt="Background Image"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        className="-z-10 blur-sm"
        priority
      />
      <div className="p-4">
        <h1 className="text-2xl font-semibold mb-4">
          Dashboard - In Progress Complaints
        </h1>
        {loading ? (
          <p>Loading complaints...</p>
        ) : complaints.length === 0 ? (
          <p>No complaints are in progress.</p>
        ) : (
          <table className="min-w-full bg-white border border-gray-300 text-gray-800 shadow-md">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-300">
                <th className="py-2 px-4 border-r border-gray-300 text-left">
                  PNR Number
                </th>
                <th className="py-2 px-4 border-r border-gray-300 text-left">
                  Problem Description
                </th>
                <th className="py-2 px-4 border-r border-gray-300 text-left">
                  Status
                </th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((complaint) => (
                <tr
                  key={complaint._id}
                  className="border-b border-gray-300 hover:bg-gray-50"
                >
                  <td className="py-2 px-4 border-r border-gray-300">
                    {complaint.pnr_number}
                  </td>
                  <td className="py-2 px-4 border-r border-gray-300">
                    {complaint.problem_description}
                  </td>
                  <td className="py-2 px-4 border-r border-gray-300">
                    {complaint.status}
                  </td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => updateStatus(complaint._id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                      disabled={complaint.status === "Completed"}
                    >
                      Mark as Completed
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
