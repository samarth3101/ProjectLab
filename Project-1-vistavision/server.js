const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); // For parsing JSON

// MongoDB connection string
const dbURI =
  "mongodb+srv://samarthpatil3101:valuevista0007@cluster0.7mnsp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB
mongoose
  .connect(dbURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Define a schema for user submissions
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  password: String,
});

// Create a model
const User = mongoose.model("User", userSchema);

// Handle form submission
app.post("/submit", async (req, res) => {
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: hashedPassword,
    });

    await newUser.save();
    // Send back the data without the password
    res.json({
      message: "Form submission successful",
      data: {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error saving data", error });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));
