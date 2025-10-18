const express = require("express");
const router = express.Router();
const { getHistory } = require("../controllers/historyController");

router.get("/:asin", getHistory);

module.exports = router;
