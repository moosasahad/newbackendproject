const mark = require("../Models/studentMarkSchema");
const CustomError = require("../utils/CustomError");
const mongoose = require("mongoose");

// const markcontroller = async (req, res, next) => {
//   const { TeacherId, ...student } = req.body;
//   console.log("req.body",{ TeacherId, ...student });
  
//   const existingRecord = await mark.findOne({ TeacherId });

//   if (existingRecord) {
//     const updatedMark = await mark.findOneAndUpdate(
//       { TeacherId },
//       { $push: { ...student } },
//       { new: true }
//     );

//     return res.status(200).json({
//       message: "Student added to existing mark record successfully",
//       updatedMark,
//     });
//   }

//   const newMark = new mark({
//     TeacherId,
//     student,
//   });

//   const savedMark = await newMark.save();
//   res
//     .status(200)
//     .json({ message: "Mark record created successfully", savedMark });
// };

const markcontroller = async (req, res, next) => {
  const { TeacherId, ...student } = req.body;

  // Validate that required fields are provided
  if (!student.StudentName || !student.RollNumber || !student.Class || !student.SubjectMarks) {
    return res.status(400).json({ message: "All student fields must be provided." });
  }

  // Check for devision
  if (!student.devision) {
    student.devision = "Default Devision"; // Provide a default value or handle accordingly
  }

  console.log("req.body", { TeacherId, ...student });

  try {
    const existingRecord = await mark.findOne({ TeacherId });

    if (existingRecord) {
      const studentToAdd = { ...student };

      const updatedMark = await mark.findOneAndUpdate(
        { TeacherId },
        { $push: { student: studentToAdd } },
        { new: true }
      );

      return res.status(200).json({
        message: "Student added to existing mark record successfully",
        updatedMark,
      });
    }

    const newMark = new mark({
      TeacherId,
      student: [student],
    });

    const savedMark = await newMark.save();
    return res.status(200).json({ message: "Mark record created successfully", savedMark });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// get all student mark 

const getallmark = async (req,res,next)=>{
    const {teacherId}= req.params; 
    console.log("jsdkhfkjhds",{teacherId})
    const details = await mark.find({ TeacherId: teacherId });

    res.status(200).json({ message: "All student marks for this teacher", details });
  
}

module.exports = {
  markcontroller, 
  getallmark,
};

