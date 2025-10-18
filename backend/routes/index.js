const express = require("express");
const router = express.Router();

const productRoutes = require("./product");
const historyRoutes = require("./history");

router.use("/product", productRoutes);
router.use("/history", historyRoutes);

module.exports = router;
