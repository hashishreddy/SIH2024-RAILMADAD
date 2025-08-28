import connectDB from "@/config/Database"; // Import the database connection
import Complaint from "@/models/Complaint"; // Import the Complaint model
// import { getsessionUser } from "@/utils/getSessionUser"; // Import session handling utility

// GET /api/complaints/:id - Fetch a specific complaint by ID
export const GET = async (request, { params }) => {
  try {
    await connectDB(); // Connect to the database
    const complaint = await Complaint.findById(params.id); // Find complaint by ID
    if (!complaint) return new Response("Complaint not found", { status: 404 });
    return new Response(JSON.stringify(complaint), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};

// // DELETE /api/complaints/:id - Delete a specific complaint by ID
// export const DELETE = async (request, { params }) => {
//   try {
//     await connectDB(); // Connect to the database
//     const complaintId = params.id;
//     const sessionUser = await getsessionUser(); // Get the session user
//     if (!sessionUser || !sessionUser.user) {
//       return new Response("User ID is required", { status: 401 });
//     }

//     const { userId } = sessionUser;

//     // Find the complaint by ID
//     const complaint = await Complaint.findById(complaintId);
//     if (!complaint) return new Response("Complaint not found", { status: 404 });

//     // Check if the session user is the owner of the complaint
//     if (complaint.owner.toString() !== userId) {
//       return new Response("Unauthorized", { status: 401 });
//     }

//     // Delete the complaint
//     await complaint.deleteOne();

//     return new Response("Complaint deleted", { status: 200 });
//   } catch (error) {
//     console.log(error);
//     return new Response("Something went wrong", { status: 500 });
//   }
// };
