// /pages/listing.js

import React from "react";
import connectDB from "@/config/Database"; // Import the database connection
import Complaint from "@/models/Complaint"; // Import the Complaint model

// Fetch data server-side with getServerSideProps

  

    

const Listing = async () => {
  await connectDB(); // Connect to the database
  const complaint = await Complaint.find({}); // Fetch complaints and convert to plain JS objects
  // Add a fallback value for complaints to ensure it is always an array
    // console.log(complaint)
  return (
    <div>
      
    </div>
  );
};

export default Listing;
