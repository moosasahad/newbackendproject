require("dotenv").config();
const express = require("express")
const app = express();
const mongoose = require("mongoose")
const userrout = require("./Routes/userRoutes")
const cors = require('cors');

app.use(express.json())
app.use(cors(
  {
    origin:"http://localhost:3000",
    credentials:true
  }
));

app.use(userrout)
mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 30000, // Optional: Increase timeout if needed
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });



const PORT = process.env.PORT || 4000
app.listen(PORT, ()=>console.log("server runned "+ PORT))
