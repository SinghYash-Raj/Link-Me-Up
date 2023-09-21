const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./data/data");
const connectDB = require("./Config/db");

dotenv.config();
//const path = require("path");
//require("dotenv").config({ path: path.resolve(__dirname + "./.env") });
connectDB();
const app = express();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("API is running");
});

app.get("/api/chat", (req, res) => {
  res.send(chats);
});

app.get("/api/chat/:id", (req, res) => {
  const singleChat = chats.find((compare) => compare._id === req.params.id);
  res.send(singleChat);
});

app.listen(PORT, console.log(`Server Started on PORT ${PORT}`));
