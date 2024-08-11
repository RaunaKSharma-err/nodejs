const express = require("express");
const router = express.Router();

const { HandleGetAllUser } = require("../controllers/user");

router.post("/", HandleGetAllUser);

module.exports = router;
