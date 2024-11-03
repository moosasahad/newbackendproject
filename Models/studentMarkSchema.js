const mongoose = require("mongoose");

const markSchema = new mongoose.Schema({
    TeacherId: { type: mongoose.Schema.ObjectId, ref: "user", required: true },
  student: [
    {
      StudentName: { type: String, required: true },
      RollNumber: { type: Number, required: true, min: 1 },
      Class: { type: String, required: true, min: 1 },
      devision: { type: String, required: true },
      SubjectMarks: { type: Number, min: 0 },
    },
  ],
});

module.exports = mongoose.model("mark",markSchema)

