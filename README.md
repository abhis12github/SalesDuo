# SalesDuo - Amazon Listing Optimizer

An AI-powered web application that optimizes Amazon product listings by analyzing existing product information and providing enhanced titles, bullet points, descriptions, and keyword suggestions.

## Features

- **Product Analysis**: Scrape Amazon product details using ASIN
- **AI Optimization**: Generate optimized listings using Google Gemini AI
- **History Tracking**: Save and view optimization history
- **Modern UI**: Clean, responsive interface built with React and Tailwind CSS

## Tech Stack

### Backend
- Node.js with Express.js
- MySQL database with Sequelize ORM
- Google Gemini AI API for optimization
- ScraperAPI for Amazon product scraping
- CORS enabled for cross-origin requests

### Frontend
- React 19 with Vite
- React Router for navigation
- Tailwind CSS for styling
- Axios for API communication

## Project Structure

```
SalesDuo/
├── backend/                 # Node.js backend
│   ├── controllers/         # Route controllers
│   ├── middleware/          # Express middleware
│   ├── models/             # Sequelize models
│   ├── routes/             # API routes
│   ├── services/           # Business logic services
│   └── index.js            # Server entry point
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── api.jsx         # API client
│   │   └── App.jsx         # Main app component
│   └── package.json
├── db/
│   └── schema.sql          # Database schema
└── README.md
```

## Installation

### Prerequisites
- Node.js (v16 or higher)
- MySQL database
- Google Gemini API key
- ScraperAPI key

### Setup

1. Clone the repository:
```bash
git clone https://github.com/abhis12github/SalesDuo.git
cd SalesDuo
```

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
PORT=5000
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=yourpassword
MYSQL_DATABASE=amazon_optimizer
SCRAPER_API_KEY=your_scraper_api_key
GEMINI_API_KEY=your_gemini_api_key
NODE_ENV=development
```

4. Set up the database:
```bash
mysql -u your_username -p < ../db/schema.sql 

```
or simply execute the sql syntax in schema using workbench or CLI. 

5. Start the backend server:
```bash
node index.js
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Usage

1. Open your browser and navigate to `http://localhost:5173`
2. Enter an Amazon ASIN in the optimizer form
3. Click "Optimize Listing" to analyze and optimize the product
4. View the optimized results with improved title, bullet points, description, and keywords
5. Access the History page to view previous optimizations

## API Endpoints

- `POST /api/product/optimize` - Optimize a product listing (body- asin - amazon product unique identification number)
- `GET /api/history/:asin` - Get specific optimization details

## Environment Variables

### Backend (.env)
- `PORT` - Server port (default: 5000)
- `MYSQL_HOST` - MySQL host
- `MYSQL_USER` - MySQL username
- `MYSQL_PASSWORD` - MySQL password
- `MYSQL_DATABASE` - Database name
- `SCRAPER_API_KEY` - ScraperAPI key
- `GEMINI_API_KEY` - Google Gemini API key
- `NODE_ENV` - Environment (development/production)

### Frontend (.env)
- `VITE_API_URL` - Backend API URL (default: http://localhost:5000/api)

## Database Schema

The application uses a single `optimizations` table to store:
- Original and optimized product information
- ASIN for product identification
- Timestamps for tracking

## Author

**Abhishek Anand**


