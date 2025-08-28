"use client";
import Image from "next/image";
import { useState } from "react";

const CheckStatus = ({ logoSrc }) => {
  const [pnrNumber, setPnrNumber] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [showFeedbackButton, setShowFeedbackButton] = useState(false);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleInputChange = (e) => {
    setPnrNumber(e.target.value);
  };

  const fetchStatus = async () => {
    try {
      const response = await fetch(`/api/complaints`);
      if (!response.ok) throw new Error("Failed to fetch complaints.");

      const data = await response.json();

      // Find the complaint matching the input PNR number
      const complaint = data.find((comp) => comp.pnr_number === pnrNumber);

      if (!complaint) {
        throw new Error("Complaint not found.");
      }

      setStatus(complaint.status);
      setError("");

      // Show feedback button if the status is completed
      if (complaint.status === "Completed") {
        setShowFeedbackButton(true);
      } else {
        setShowFeedbackButton(false);
      }
    } catch (err) {
      setError(err.message);
      setStatus("");
      setShowFeedbackButton(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchStatus();
  };

  const handleFeedbackClick = () => {
    setShowFeedbackForm(true);
  };

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    // Logic to handle feedback submission
    alert("Feedback submitted: " + feedback);
    setFeedback("");
    setShowFeedbackForm(false);
  };

  return (
    <section className="relative w-full h-[820px] overflow-hidden">
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
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
      <div className="flex flex-col items-center p-4 bg-gray-100 rounded-md shadow-md max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-4 text-black">
          Check Complaint Status
        </h2>
        <form onSubmit={handleSubmit} className="w-full">
          <input
            type="text"
            value={pnrNumber}
            onChange={handleInputChange}
            placeholder="Enter PNR number"
            className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 text-black"
          />
          <button
            type="submit"
            className="w-full py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
          >
            Check Status
          </button>
        </form>
        {status && (
          <p className="mt-4 text-green-600 font-semibold">Status: {status}</p>
        )}
        {error && <p className="mt-4 text-red-600">{error}</p>}
        {showFeedbackButton && (
          <>
            <button
              onClick={handleFeedbackClick}
              className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
              Provide Feedback
            </button>
            {showFeedbackForm && (
              <form onSubmit={handleFeedbackSubmit} className="mt-4 w-full">
                <textarea
                  value={feedback}
                  onChange={handleFeedbackChange}
                  placeholder="Enter your feedback"
                  className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                >
                  Submit Feedback
                </button>
              </form>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default CheckStatus;
