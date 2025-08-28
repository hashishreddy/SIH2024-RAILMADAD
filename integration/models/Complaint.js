import { Schema, model, models } from "mongoose";

const ComplaintSchema = new Schema(
  {
    phone_number: {
      type: String,
      required: [true, "Phone number is required"],
    },
    train_number: {
      type: String,
      required: [true, "Train number is required"],
    },
    pnr_number: {
      type: String,
      required: [true, "PNR number is required"],
    },
    problem_description: {
      type: String,
      required: [true, "Problem description is required"],
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High", "Emergency"],
    },
    type: {
      type: String,
      required: [true, "Complaint type is required"],
    },
    subtype: {
      type: String,
      required: [true, "Subtype is required"],
    },
    incident_date: {
      type: Date,
      required: [true, "Incident date is required"],
    },
    incident_time: {
      type: String,
      required: [true, "Incident time is required"],
    },
    department_assigned: {
      type: String,
    },
    status: {
      type: String,
      enum: ["In Progress", "Completed"],
      default: "In Progress", // Default value set to "In Progress"
    },
  },
  {
    timestamps: true,
  }
);

const Complaint = models.Complaint || model("Complaint", ComplaintSchema);

export default Complaint;
