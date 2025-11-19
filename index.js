import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8000;
const MONGOURL = process.env.MONGO_URL;

// Schema
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

// Use exact collection name
const UserModel = mongoose.model("UserModel", userSchema, "users");

// Routes
app.get("/", (req, res) => {
  res.send("Welcome! API is working.");
});

app.get("/getUsers", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Connect DB and start server
mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log("Database connected successfully.");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.log("DB Connection Error:", err));
