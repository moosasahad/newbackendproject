const mark = require("../Models/studentMarkSchema");

const user = require("../Models/userSchema")

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

// const markcontroller = async (req, res, next) => {
//   const { TeacherId, ...student } = req.body;
//   console.log("...student",{ TeacherId, ...student });
  
//   const teacher = await user.find({_id:TeacherId}) 

//   if(!teacher){
//     return res.status(400).json({ message: "user not found." });
//   }

//   console.log("teacher",teacher);

  

//   if (!student.StudentName || !student.RollNumber || !student.Class || !student.SubjectMarks) {
//     console.log("student",student.StudentName);
    
//     return res.status(400).json({ message: "All student fields must be provided." });
//   }


//   if (!student.devision) {
//     student.devision = "Default Devision"; 
//   }

//   console.log("req.body", { TeacherId, ...student });

//   try {
//     const existingRecord = await mark.findOne({ TeacherId });

//     if (existingRecord) {
//       const studentToAdd = { ...student };

//       const updatedMark = await mark.findOneAndUpdate(
//         { TeacherId },
//         { $push: { student: studentToAdd } },
//         { new: true }
//       );

//       return res.status(200).json({
//         message: "Student added to existing mark record successfully",
//         updatedMark,
//       });
//     }

//     const newMark = new mark({
//       TeacherId,
//       student: [student],
//     });

//     const savedMark = await newMark.save();
//     return res.status(200).json({ message: "Mark record created successfully", savedMark });

//   } catch (error) {    
//     console.error("Error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

const markcontroller = async (req, res, next) => {
  const { TeacherId, student } = req.body;

  console.log("Received TeacherId and students:", { TeacherId, student });

 
  const teacher = await user.find({ _id: TeacherId });

  if (!teacher || teacher.length === 0) {
    return res.status(400).json({ message: "User not found." });
  }

  console.log("teacher found:", teacher);

 
  if (!student || student.length === 0) {
    return res.status(400).json({ message: "No student data provided." });
  }


  for (let stu of student) {
    if (!stu.StudentName || !stu.RollNumber || !stu.Class || !stu.SubjectMarks) {
      return res.status(400).json({ message: "All student fields must be provided." });
    }

    if (!stu.devision) {
      stu.devision = "Default Division"; 
    }
  }

  try {

    const existingRecord = await mark.findOne({ TeacherId });

    if (existingRecord) {
      
      const updatedMark = await mark.findOneAndUpdate(
        { TeacherId },
        { $push: { student: { $each: student } } }, 
        { new: true }
      );

      return res.status(200).json({
        message: "Students added to existing mark record successfully",
        updatedMark,
      });
    }

    
    const newMark = new mark({
      TeacherId,
      student,  
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

