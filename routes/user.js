const express = require("express");
const router = express.Router();

const { HandleGetAllUser, handleGetAnalytics } = require("../controllers/user");

router.post("/", HandleGetAllUser);
router.get("/analytics/:shortId", handleGetAnalytics);
module.exports = router;
