const Optimization = require("../models/Optimization");

exports.getHistory = async (req, res, next) => {
  try {
    const { asin } = req.params;
    const rows = await Optimization.findAll({
      where: { asin },
      order: [["created_at", "DESC"]],
    });

    const history = rows.map((row) => ({
      ...row.toJSON(),
      original_bullets: JSON.parse(row.original_bullets || "[]"),
      optimized_bullets: JSON.parse(row.optimized_bullets || "[]"),
      optimized_keywords: JSON.parse(row.optimized_keywords || "[]"),
    }));

    res.json({ asin, history });
  } catch (err) {
    next(err);
  }
};
