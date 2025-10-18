const axios = require("axios");
const cheerio = require("cheerio");

const SCRAPER_API_KEY = process.env.SCRAPER_API_KEY;
const SCRAPER_URL = `http://api.scraperapi.com?api_key=${SCRAPER_API_KEY}&autoparse=true`;

// Fallback mock for development
const devMock = {
  title: "Sample Amazon Product",
  bullets: ["Feature 1", "Feature 2", "Feature 3"],
  description: "This is a sample description for a mock product.",
};

async function fetchAmazonProduct(asin) {
  const url = `https://www.amazon.in/dp/${asin}`;
  try {
    const { data } = await axios.get(`${SCRAPER_URL}&url=${encodeURIComponent(url)}`);
    console.log("Data after scraping is", data);
    
    // Use ScraperAPI's autoparse
    if (data) {
        const { name, feature_bullets, full_description } = data;

        // Return in standard format for backend
        const title = name;
        const bullets = feature_bullets || [];
        const description = full_description || "";

        console.log(title,bullets,description);
        
        if (title) return { title, bullets, description };
    }
    // If autoparse fails, fallback to Cheerio scraping
    return await scrapeWithCheerio(url);
  } catch (err) {
    // Use mock data in development
    if (process.env.NODE_ENV !== "production") {
      return devMock;
    }
    throw new Error("Failed to fetch product details from Amazon.");
  }
}

async function scrapeWithCheerio(url) {
  const { data: html } = await axios.get(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/58.0.3029.110 Safari/537.3",
    },
  });
  const $ = cheerio.load(html);
  const title = $("#productTitle").text().trim();
  const bullets = [];
  $("#feature-bullets ul li span.a-list-item").each((i, el) => {
    bullets.push($(el).text().trim());
  });
  const description = $("#productDescription").text().trim() || $("#bookDescription_feature_div").text().trim();
  if (!title) throw new Error("Could not scrape product title from Amazon.");
  return { title, bullets, description };
}

module.exports = { fetchAmazonProduct };