const mongoose = require("mongoose");
const validator = require("validator");

const complaintSchema = mongoose.Schema({
  details: { type: String, required: [true, "details is missing"] },
  created_by: {
    type: String,
    required: [true, "creator of complaint name is missing"],
  },
  email: {
    type: String,
    required: [true, "email is missing"],
    validate: [validator.isEmail, "Please enter valid email address"],
  },
  topic: { type: String, required: [true, "Topic is missing"] },
  category: { type: String, required: true },
  img: {
    type: String,
    default:
      "https://images.pexels.com/photos/923681/pexels-photo-923681.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
});

const Complaint = mongoose.model("complaint", complaintSchema);

module.exports = Complaint;
