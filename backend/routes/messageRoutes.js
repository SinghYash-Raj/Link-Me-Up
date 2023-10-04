const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  sendMessage,
  allMessages,
} = require("../controllers/messageController");

const router = express.Router(); //Multiple requests can be easily differentiated with the help of the Router() function in Express.

router.route("/").post(protect, sendMessage);
router.route("/:chatId").get(protect, allMessages);

module.exports = router;
