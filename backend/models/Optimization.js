const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const Optimization = sequelize.define("Optimization", {
  asin: { type: DataTypes.STRING(32), allowNull: false },
  original_title: DataTypes.TEXT,
  original_bullets: DataTypes.TEXT,
  original_description: DataTypes.TEXT,
  optimized_title: DataTypes.TEXT,
  optimized_bullets: DataTypes.TEXT,
  optimized_description: DataTypes.TEXT,
  optimized_keywords: DataTypes.TEXT,
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, {
  tableName: "optimizations",
  timestamps: false,
});

module.exports = Optimization;