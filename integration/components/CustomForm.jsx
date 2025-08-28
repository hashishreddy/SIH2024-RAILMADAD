"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

// Dropdown options mapping
const typeSubtypeMapping = {
  "Medical Assistance": ["Medical Assistance"],
  Security: [
    "Eve-teasing/Misbehaviour",
    "Eve-teasing/Misbehaviour with lady passengers/Rape",
    "Theft of Passengers Belongings/Snatching",
    "Unauthorized person in Ladies/Disabled Coach/SLR/Reserve Coach Harassment/Extortion by Security Personnel/Railway personnel",
    "Nuisance by Hawkers/Beggar/Eunuch",
    "Luggage Left Behind/Unclaimed/Suspected Articles",
    "Passenger Missing/Not responding call",
    "Smoking/Drinking Alcohol/Narcotics",
    "Dacoity/Robbery/Murder/Riots",
    "Quarrelling/Hooliganism Passenger fallen down",
    "Nuisance by passenger",
    "Misbehaviour",
    "Others",
  ],
  "Divyangjan Facilities": [
    "Divyangjan coach unavailability",
    "Divyangjan toilet/washbasin",
    "Braille signage in coach",
    "Others",
  ],
  "Facilities for Women with Special needs": ["Baby Food"],
  "Electrical Equipment": [
    "Lights",
    "Air Conditioner",
    "Fans",
    "Charging Points",
    "Others",
  ],
  "Coach - Cleanliness": [
    "Toilet",
    "Washbasin",
    "Cockroach / Rodents",
    "Coach Interior",
    "Coach Exterior",
    "Others",
  ],
  Punctuality: ["NTES APP", "Late Running", "Others"],
  "Water Availability": [
    "Packaged Drinking Water / Rail Neer",
    "Toilet",
    "Washbasin",
    "Others",
  ],
  "Staff Behaviour": ["Staff Behaviour"],
  "Corruption / Bribery": ["Corruption / Bribery"],
  "Coach - Maintenance": [
    "Window/Seat Broken",
    "Window/Door locking problem",
    "Tap leaking/Tap not working",
    "Broken/Missing Toilet Fittings",
    "Jerks/Abnormal Sound",
    "Others",
  ],
  "Catering & Vending Service": [
    "Overcharging",
    "Service Quality & Hygiene",
    "Food Quality & Quantity",
    "E-Catering",
    "Food & Water Not Available",
    "Others",
  ],
  "Bed Roll": ["Dirty / Torn", "Overcharging", "Non Availability", "Others"],
  Miscellaneous: ["Miscellaneous"],
};

const CustomForm = ({ logoSrc }) => {
  const [selectedType, setSelectedType] = useState("");
  const [selectedSubtype, setSelectedSubtype] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [trainNumber, setTrainNumber] = useState("");
  const [pnrNumber, setPnrNumber] = useState("");
  const [problemDescription, setProblemDescription] = useState("");
  const [incidentDate, setIncidentDate] = useState("");
  const [incidentTime, setIncidentTime] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Set initial values for selectedType and selectedSubtype
  useEffect(() => {
    if (!selectedType) {
      const initialType = Object.keys(typeSubtypeMapping)[0];
      setSelectedType(initialType);
      setSelectedSubtype(typeSubtypeMapping[initialType][0]);
    }
  }, [selectedType]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const inputData = {
      phone_number: phoneNumber,
      train_number: trainNumber,
      pnr_number: pnrNumber,
      problem_description: problemDescription,
      type: selectedType,
      subtype: selectedSubtype,
      incident_date: incidentDate,
      incident_time: incidentTime,
    };

    try {
      // Classify the complaint using the classification endpoint
      const response = await fetch(
        "http://127.0.0.1:8000/classify_complaint/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(inputData),
        }
      );

      const responseJson = await response.json();

      if (response.ok) {
        // Save the classified complaint to your backend
        const saveResponse = await fetch("/api/complaints", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...inputData,
            ...responseJson.full_response, // Include the response JSON fields for saving
          }),
        });

        if (saveResponse.ok) {
          setSuccessMessage(
            `
  Priority: ${responseJson.full_response.priority}\n, 
  Department Assigned: ${responseJson.full_response.department_assigned}`
          );
        } else {
          const saveError = await saveResponse.json();
          setSuccessMessage(`Failed to save complaint: ${saveError.message}`);
        }
      } else {
        setSuccessMessage(
          "Failed to submit complaint: " + responseJson.message
        );
      }
    } catch (error) {
      setSuccessMessage(
        `An error occurred while submitting the form: ${error.message}`
      );
    }
    setFormSubmitted(true);
  };

  const handleReset = () => {
    setFormSubmitted(false);
    setPhoneNumber("");
    setTrainNumber("");
    setPnrNumber("");
    setProblemDescription("");
    setIncidentDate("");
    setIncidentTime("");
    setSelectedType("");
    setSelectedSubtype("");
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);
    setSelectedSubtype(type ? typeSubtypeMapping[type][0] : "");
  };

  return (
    <section className="relative w-full h-[820px] overflow-hidden">
      <Image
        src={logoSrc}
        alt="Background Image"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        className="-z-10 blur-sm"
        priority
      />
      <div className="flex items-center justify-center h-full">
        <div className="max-w-2xl w-full bg-white shadow-md rounded-lg mt-10 p-8 overflow-y-auto max-h-[85vh]">
          {formSubmitted ? (
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Submission Successful
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                {" "}
                The complaint has been raised successfully <br></br>{successMessage}
              </p>
              <button
                onClick={handleReset}
                className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                Submit Another Complaint
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                RailMadad - Complaint Registration
              </h2>
              <div className="mb-4">
                <label
                  htmlFor="phoneNumber"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Phone Number
                </label>
                <input
                  id="phoneNumber"
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="trainNumber"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Train Number
                </label>
                <input
                  id="trainNumber"
                  type="text"
                  value={trainNumber}
                  onChange={(e) => setTrainNumber(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="pnrNumber"
                  className="block text-gray-700 font-medium mb-2"
                >
                  PNR Number
                </label>
                <input
                  id="pnrNumber"
                  type="text"
                  value={pnrNumber}
                  onChange={(e) => setPnrNumber(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="problemDescription"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Problem Description
                </label>
                <textarea
                  id="problemDescription"
                  value={problemDescription}
                  onChange={(e) => setProblemDescription(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  rows="4"
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="type"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Type
                </label>
                <select
                  id="type"
                  value={selectedType}
                  onChange={(e) => handleTypeChange(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                >
                  {Object.keys(typeSubtypeMapping).map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="subtype"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Subtype
                </label>
                <select
                  id="subtype"
                  value={selectedSubtype}
                  onChange={(e) => setSelectedSubtype(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                >
                  {selectedType &&
                    typeSubtypeMapping[selectedType].map((subtype) => (
                      <option key={subtype} value={subtype}>
                        {subtype}
                      </option>
                    ))}
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="incidentDate"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Incident Date
                </label>
                <input
                  id="incidentDate"
                  type="date"
                  value={incidentDate}
                  onChange={(e) => setIncidentDate(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="incidentTime"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Incident Time
                </label>
                <input
                  id="incidentTime"
                  type="time"
                  value={incidentTime}
                  onChange={(e) => setIncidentTime(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                Submit Complaint
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default CustomForm;
