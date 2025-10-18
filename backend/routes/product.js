const express = require("express");
const router = express.Router();
const { optimizeProduct } = require("../controllers/productController");

router.post("/optimize", optimizeProduct);

module.exports = router;
