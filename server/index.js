import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import FriendModel from "./models/Firends.js";
import bodyParser from "body-parser";
import dotenv from 'dotenv';

//dotenv
dotenv.config();

//hello world
const port = process.env.PORT 
const MongoURL = process.env.MONGODB_URL
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

mongoose
  .connect(
    MongoURL,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Db connected!...");
  });

//Add Fiend
app.post("/addfriend", async (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const description = req.body.description;
  const image = req.body.image;
  const friend = new FriendModel({ name, age, description, image });
  await friend.save();
  res.send("Sucess");
});

//Read Friend
app.get("/read", async (req, res) => {
  try {
    const friends = await FriendModel.find({});
    res.json(friends);
  } catch (error) {
    console.error("Error fetching friends:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update friend route
app.put("/editfriend/:id", async (req, res) => {
  try {
    const friendId = req.params.id;
    const updatedData = req.body;
    const updatedFriend = await FriendModel.findByIdAndUpdate(
      friendId,
      updatedData,
      { new: true } // Return the modified document rather than the original
    );
    res.status(200).json(updatedFriend);
  } catch (error) {
    console.error("Error updating friend:", error);
    res.json({ error: "Internal Server Error" });
  }
});

//Delete Friend
app.delete("/deletefriend/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await FriendModel.findByIdAndDelete(id);
    res.send("Friend deleted successfully");
  } catch (error) {
    console.error("Error deleting friend:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Server Port
app.listen(process.env.port, () => {
  try {
    console.log(`Server is running on port: ${port}`);
  } catch (error) {
    console.log("Error while connecting with a server", error);
  }
});
