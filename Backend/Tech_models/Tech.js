const mongoose = require("mongoose");

// Define a reusable schema template
const baseSchema = new mongoose.Schema(
  {
    Name: { type: String, required: true },
    Email: { type: String, required: true, unique: true }, // Ensure unique email per event
    Phone_No: { type: String, required: true },
    College: { type: String, required: true },
    Accommodation: { type: String, enum: ["With", "Without"], required: true }, // Uses an enum for valid values
  },
  { timestamps: true } // Automatically adds createdAt & updatedAt fields
);

// Create models using the base schema
const PPTS = mongoose.model("PPT", baseSchema);
const WebS = mongoose.model("Web", baseSchema);
const CodingS = mongoose.model("Coding", baseSchema);
const QuizS = mongoose.model("Quiz", baseSchema);

// Export models
module.exports = {
  PPTS,
  WebS,
  CodingS,
  QuizS,
};
