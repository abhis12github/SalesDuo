import React, { useState } from 'react';

const OptimizationResult = ({ result }) => {
  const [activeTab, setActiveTab] = useState('title');
  
  if (!result) return null;
  const { original, optimized } = result;

  const tabs = [
    { id: 'title', label: 'Title', icon: '📝' },
    { id: 'bullets', label: 'Bullet Points', icon: '🔸' },
    { id: 'description', label: 'Description', icon: '📄' },
    { id: 'keywords', label: 'Keywords', icon: '🏷️' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'title':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <h3 className="text-lg font-semibold text-white">Original Title</h3>
              </div>
              <div className="bg-dark-800/50 p-4 rounded-lg border border-red-500/20">
                <p className="text-dark-200 leading-relaxed">{original.title}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <h3 className="text-lg font-semibold text-white">Optimized Title</h3>
              </div>
              <div className="bg-dark-800/50 p-4 rounded-lg border border-green-500/20">
                <p className="text-dark-200 leading-relaxed">{optimized.optimized_title}</p>
              </div>
            </div>
          </div>
        );
      
      case 'bullets':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <h3 className="text-lg font-semibold text-white">Original Bullets</h3>
              </div>
              <div className="bg-dark-800/50 p-4 rounded-lg border border-red-500/20">
                <ul className="space-y-3">
                  {original.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start space-x-3">
                      <span className="text-red-400 mt-1">•</span>
                      <span className="text-dark-200">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <h3 className="text-lg font-semibold text-white">Optimized Bullets</h3>
              </div>
              <div className="bg-dark-800/50 p-4 rounded-lg border border-green-500/20">
                <ul className="space-y-3">
                  {optimized.optimized_bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start space-x-3">
                      <span className="text-green-400 mt-1">•</span>
                      <span className="text-dark-200">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      
      case 'description':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <h3 className="text-lg font-semibold text-white">Original Description</h3>
              </div>
              <div className="bg-dark-800/50 p-4 rounded-lg border border-red-500/20">
                <p className="text-dark-200 leading-relaxed whitespace-pre-wrap">{original.description}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <h3 className="text-lg font-semibold text-white">Optimized Description</h3>
              </div>
              <div className="bg-dark-800/50 p-4 rounded-lg border border-green-500/20">
                <p className="text-dark-200 leading-relaxed whitespace-pre-wrap">{optimized.optimized_description}</p>
              </div>
            </div>
          </div>
        );
      
      case 'keywords':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-2">SEO Keywords</h3>
              <p className="text-dark-300">Optimized keywords for better search visibility</p>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {optimized.optimized_keywords.map((keyword, i) => (
                <span 
                  key={i} 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Optimization Results</h2>
        <p className="text-dark-300">Compare your original listing with AI-optimized content</p>
      </div>
      
      {/* Tab Navigation */}
      <div className="flex flex-wrap justify-center gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-dark-800 text-dark-300 hover:text-white hover:bg-dark-700'
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>
      
      {/* Tab Content */}
      <div className="min-h-[400px]">
        {renderContent()}
      </div>
      
    
    </div>
  );
};

export default OptimizationResult;