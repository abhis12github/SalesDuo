import React, { useState } from 'react';

const OptimizerForm = ({ onResult }) => {
  const [asin, setAsin] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!asin) return;
    setLoading(true);
    try {
      const res = await window.api.optimizeProduct(asin);
      onResult(res);
    } catch (err) {
      onResult(null);
      alert('Error: ' + (err.response?.data?.error || err.message));
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Product Optimizer</h2>
        <p className="text-dark-300">Enter your Amazon ASIN to get AI-powered optimization recommendations</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-dark-200">
            Amazon ASIN
          </label>
          <div className="relative">
            <input
              type="text"
              value={asin}
              onChange={e => setAsin(e.target.value.toUpperCase())}
              maxLength={10}
              required
              placeholder="B08N5WRWNW"
              className="input-field w-full text-center text-lg font-mono tracking-wider"
              style={{ textTransform: "uppercase" }}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <svg className="w-5 h-5 text-dark-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
          <p className="text-xs text-dark-400">Enter a 10-character Amazon Standard Identification Number</p>
        </div>
        
        <button 
          type="submit" 
          disabled={loading || !asin.trim()} 
          className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 ${
            loading || !asin.trim()
              ? 'bg-dark-700 text-dark-400 cursor-not-allowed'
              : 'btn-primary'
          }`}
        >
          {loading ? (
            <div className="flex items-center justify-center space-x-2">
              <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Analyzing Product...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Optimize Listing</span>
            </div>
          )}
        </button>
      </form>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <div className="text-center p-4 bg-dark-800/50 rounded-lg">
          <div className="w-12 h-12 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="font-semibold text-white mb-1">SEO Optimization</h3>
          <p className="text-sm text-dark-400">Enhanced keywords and titles</p>
        </div>
        
        <div className="text-center p-4 bg-dark-800/50 rounded-lg">
          <div className="w-12 h-12 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="font-semibold text-white mb-1">AI Analysis</h3>
          <p className="text-sm text-dark-400">Smart content suggestions</p>
        </div>
        
        <div className="text-center p-4 bg-dark-800/50 rounded-lg">
          <div className="w-12 h-12 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
            </svg>
          </div>
          <h3 className="font-semibold text-white mb-1">Performance</h3>
          <p className="text-sm text-dark-400">Conversion rate improvements</p>
        </div>
      </div>
    </div>
  );
};

export default OptimizerForm;