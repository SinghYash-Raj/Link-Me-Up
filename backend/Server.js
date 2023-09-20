const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./data/data");

const app = express();
dotenv.config();

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

app.listen(5000, console.log(`Server Started on PORT ${PORT}`));
