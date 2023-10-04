const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./data/data");
const connectDB = require("./Config/db");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const cors = require("cors");
const messageRoutes = require("./routes/messageRoutes");

//const path = require("path");
//require("dotenv").config({ path: path.resolve(__dirname + "./.env") });
dotenv.config();
connectDB();
const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store");
  next();
});

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

app.use(notFound);
app.use(errorHandler);
app.listen(PORT, console.log(`Server Started on PORT ${PORT}`));
