const express = require("express");
const router = express.Router();
const { saveUserInfoAndOrder } = require("../controllers/userInfoController");

router.post("/save-user-info", saveUserInfoAndOrder);

module.exports = router;
