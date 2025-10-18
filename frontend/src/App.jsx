import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import OptimizerForm from './components/OptimizerForm';
import OptimizationResult from './components/Optimizationresult';
import HistoryPage from './components/HistoryPage';
import * as api from './api';

window.api = api;

function Navigation() {
  const location = useLocation();
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-900/95 backdrop-blur-xl border-b border-dark-600/30 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold gradient-text">
            SalesDuo
          </Link>
          <div className="flex space-x-8">
            <Link 
              to="/" 
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                location.pathname === '/' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-dark-300 hover:text-white hover:bg-dark-800'
              }`}
            >
              Optimizer
            </Link>
            <Link 
              to="/history" 
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                location.pathname === '/history' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-dark-300 hover:text-white hover:bg-dark-800'
              }`}
            >
              History
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

function HomePage() {
  const [result, setResult] = useState(null);

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            <span className="gradient-text">Amazon Listing Optimizer</span>
          </h1>
          <p className="text-xl text-dark-300 max-w-2xl mx-auto">
            Optimize your Amazon product listings with AI-powered analysis and recommendations
          </p>
        </div>
        
        <div className="glass-card p-8 mb-8">
          <OptimizerForm onResult={setResult} />
        </div>
        
        {result && (
          <div className="glass-card p-8">
            <OptimizationResult result={result} />
          </div>
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen dark-grid">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;