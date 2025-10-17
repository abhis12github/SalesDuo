CREATE DATABASE IF NOT EXISTS amazon_optimizer;
USE amazon_optimizer;

CREATE TABLE IF NOT EXISTS optimizations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    asin VARCHAR(32) NOT NULL,
    original_title TEXT,
    original_bullets TEXT,
    original_description TEXT,
    optimized_title TEXT,
    optimized_bullets TEXT,
    optimized_description TEXT,
    optimized_keywords TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);