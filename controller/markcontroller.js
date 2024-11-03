const mark = require("../Models/studentMarkSchema");
const CustomError = require("../utils/CustomError");
const mongoose = require("mongoose");

const markcontroller = async (req, res, next) => {
  const { TeacherId, student } = req.body;
  const existingRecord = await mark.findOne({ TeacherId });

  if (existingRecord) {
    const updatedMark = await mark.findOneAndUpdate(
      { TeacherId },
      { $push: { student } },
      { new: true }
    );

    return res.status(200).json({
      message: "Student added to existing mark record successfully",
      updatedMark,
    });
  }

  const newMark = new mark({
    TeacherId,
    student,
  });

  const savedMark = await newMark.save();
  res
    .status(200)
    .json({ message: "Mark record created successfully", savedMark });
};

// get all student mark 

const getallmark = async (req,res,next)=>{
    const { TeacherId } = req.body; 
    const details = await mark.find({ TeacherId: TeacherId });

    res.status(200).json({ message: "All student marks for this teacher", details });
  
}

module.exports = {
  markcontroller, 
  getallmark,
};

