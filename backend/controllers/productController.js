const Optimization = require("../models/Optimization");
const { fetchAmazonProduct } = require("../services/scraperService");
const { optimizeListing } = require("../services/aiService");

exports.optimizeProduct = async (req, res, next) => {
  try {
    const { asin } = req.body;
    if (!asin || !/^[A-Z0-9]{10}$/.test(asin.trim())) {
      return res.status(400).json({ error: "Invalid or missing ASIN." });
    }

    const product = await fetchAmazonProduct(asin.trim());
    const optimized = await optimizeListing(product);

    await Optimization.create({
      asin: asin.trim(),
      original_title: product.title,
      original_bullets: JSON.stringify(product.bullets),
      original_description: product.description,
      optimized_title: optimized.optimized_title,
      optimized_bullets: JSON.stringify(optimized.optimized_bullets),
      optimized_description: optimized.optimized_description,
      optimized_keywords: JSON.stringify(optimized.optimized_keywords),
      created_at: new Date(),
    });

    res.json({ asin, original: product, optimized });
  } catch (err) {
    next(err);
  }
};
