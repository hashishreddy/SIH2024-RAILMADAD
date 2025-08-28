import connectDB from "@/config/Database";
import Complaint from "@/models/Complaint";
import { getsessionUser } from "@/utils/getSessionUser"; // Uncomment when session management is implemented

// GET /api/complaints - Fetch all complaints
export const GET = async (request) => {
  try {
    await connectDB();
    const complaints = await Complaint.find({});
    return new Response(JSON.stringify(complaints), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};

// POST /api/complaints - Create a new complaint
export const POST = async (request) => {
  try {
    await connectDB();

    const formData = await request.json(); // Parse incoming JSON data

    // Map incoming data directly to the Complaint model fields
    const complaintData = {
      // owner: formData.owner || "defaultUserId", // Adjust this when session setup is ready
      phone_number: formData.phone_number,
      train_number: formData.train_number,
      pnr_number: formData.pnr_number,
      problem_description: formData.problem_description,
      priority: formData.priority || "Medium",
      type: formData.type,
      subtype: formData.subtype,
      incident_date: formData.incident_date,
      incident_time: formData.incident_time,
      department_assigned: formData.department_assigned || "General Department",
      status: formData.status || "In Progress", // Make sure status is handled correctly
    };

    console.log(complaintData); // Debugging log to verify data before saving

    const newComplaint = new Complaint(complaintData);
    await newComplaint.save();

    return new Response(
      JSON.stringify({ message: "Complaint added successfully!" }),
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return new Response("Complaint not added", { status: 500 });
  }
};
