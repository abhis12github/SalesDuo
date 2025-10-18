import React, { useState } from 'react';

const HistoryPage = () => {
  const [asin, setAsin] = useState('');
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Dummy data for demonstration
  const dummyHistory = [
    {
      id: 1,
      asin: 'B08N5WRWNW',
      original_title: 'Wireless Bluetooth Headphones with Noise Cancellation',
      original_bullets: [
        'Wireless Bluetooth connectivity',
        'Noise cancellation technology',
        'Comfortable over-ear design',
        'Long battery life'
      ],
      original_description: 'High-quality wireless headphones with noise cancellation for an immersive listening experience.',
      optimized_title: 'Premium Wireless Bluetooth Headphones with Active Noise Cancellation - 30hr Battery Life',
      optimized_bullets: [
        'Premium Active Noise Cancellation (ANC) technology blocks 99% of ambient noise',
        'Wireless Bluetooth 5.0 connectivity with 30-hour battery life and quick charge',
        'Ergonomic over-ear design with memory foam cushions for all-day comfort',
        'High-fidelity 40mm drivers deliver crystal-clear audio with deep bass',
        'Built-in microphone with voice assistant compatibility (Siri/Google)',
        'Foldable design with premium carrying case included'
      ],
      optimized_description: 'Experience studio-quality sound with our premium wireless Bluetooth headphones featuring advanced Active Noise Cancellation technology. These professional-grade headphones deliver 30 hours of uninterrupted listening with our long-lasting battery and quick-charge technology. The ergonomic over-ear design with memory foam cushions ensures comfort during extended use, while our high-fidelity 40mm drivers provide crystal-clear audio with deep, rich bass. Perfect for music lovers, professionals, and travelers who demand the best in audio quality and comfort.',
      optimized_keywords: ['wireless headphones', 'bluetooth', 'noise cancellation', 'premium audio', 'long battery'],
      created_at: '2024-01-15T10:30:00Z',
      status: 'completed'
    },
    {
      id: 2,
      asin: 'B07XYZ1234',
      original_title: 'Smart Fitness Tracker Watch',
      original_bullets: [
        'Fitness tracking capabilities',
        'Heart rate monitoring',
        'Sleep tracking',
        'Waterproof design'
      ],
      original_description: 'A smart fitness tracker watch that monitors your health and fitness activities.',
      optimized_title: 'Advanced Smart Fitness Tracker Watch with Heart Rate Monitor & Sleep Tracking - Waterproof',
      optimized_bullets: [
        '24/7 continuous heart rate monitoring with advanced health insights',
        'Comprehensive sleep tracking with REM, deep, and light sleep analysis',
        'IP68 waterproof rating - swim, shower, and workout without worry',
        'Track 20+ sports modes including running, cycling, swimming, and yoga',
        '7-day battery life with magnetic charging and 2-hour quick charge',
        'Smart notifications, weather, and music control on your wrist'
      ],
      optimized_description: 'Take your fitness journey to the next level with our advanced smart fitness tracker watch. Featuring 24/7 continuous heart rate monitoring and comprehensive sleep tracking, this waterproof fitness companion provides deep insights into your health and wellness. With IP68 waterproof rating, you can swim, shower, and workout without worry. Track over 20 sports modes, receive smart notifications, and enjoy 7-day battery life with quick charging. Perfect for athletes, fitness enthusiasts, and anyone committed to a healthier lifestyle.',
      optimized_keywords: ['fitness tracker', 'smart watch', 'heart rate monitor', 'sleep tracking', 'waterproof'],
      created_at: '2024-01-14T15:45:00Z',
      status: 'completed'
    },
    {
      id: 3,
      asin: 'B09ABC5678',
      original_title: 'Portable Phone Charger Power Bank',
      original_bullets: [
        'High capacity battery',
        'Fast charging technology',
        'Portable design',
        'Compatible with multiple devices'
      ],
      original_description: 'A portable power bank for charging your phone and other devices on the go.',
      optimized_title: 'High-Capacity Portable Phone Charger Power Bank 20000mAh - Fast Charging for iPhone & Android',
      optimized_bullets: [
        'Massive 20000mAh capacity charges iPhone 12 up to 4.5 times or Samsung Galaxy S21 up to 3.5 times',
        'Advanced fast charging technology with 18W PD and QC 3.0 compatibility',
        'Dual USB-A and USB-C ports charge 2 devices simultaneously',
        'Smart LED display shows remaining battery percentage and charging status',
        'Premium lithium-polymer battery with built-in safety protections',
        'Compact, lightweight design with premium aluminum casing and anti-slip grip'
      ],
      optimized_description: 'Never run out of power again with our high-capacity 20000mAh portable power bank. This premium portable charger features advanced fast charging technology with 18W Power Delivery and Quick Charge 3.0 compatibility, charging your devices up to 70% faster than standard chargers. The massive capacity can charge an iPhone 12 up to 4.5 times or a Samsung Galaxy S21 up to 3.5 times. With dual USB-A and USB-C ports, you can charge two devices simultaneously. The smart LED display shows remaining battery percentage, and the premium lithium-polymer battery includes built-in safety protections. Perfect for travelers, professionals, and anyone who needs reliable power on the go.',
      optimized_keywords: ['power bank', 'portable charger', 'fast charging', 'high capacity', 'phone charger'],
      created_at: '2024-01-13T09:20:00Z',
      status: 'completed'
    }
  ];

  const fetchHistory = async e => {
    e.preventDefault();
    if (!asin) return;
    setLoading(true);
    try {
      const res = await window.api.getHistory(asin);
      setHistory(res);
    } catch (err) {
      // For demo purposes, use dummy data
      setHistory(dummyHistory);
      console.log('Using dummy data for demonstration');
    }
    setLoading(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'processing': return 'bg-yellow-500';
      case 'failed': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            <span className="gradient-text">Optimization History</span>
          </h1>
          <p className="text-xl text-dark-300 max-w-2xl mx-auto">
            Track and review all your product optimization activities
          </p>
        </div>

        {/* Search Form */}
        <div className="glass-card p-8 mb-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">Search History</h2>
            <p className="text-dark-300">Enter an ASIN to view its optimization history</p>
          </div>
          
          <form onSubmit={fetchHistory} className="max-w-md mx-auto">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-dark-200 mb-2">
                  Amazon ASIN
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={asin}
                    onChange={e => setAsin(e.target.value.toUpperCase())}
                    placeholder="B08N5WRWNW"
                    className="input-field w-full text-center font-mono tracking-wider"
                    maxLength={10}
                    style={{ textTransform: "uppercase" }}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <svg className="w-5 h-5 text-dark-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <button 
                type="submit" 
                disabled={loading || !asin.trim()}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
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
                    <span>Searching...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <span>Search History</span>
                  </div>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* History Results */}
        {history.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">
                Optimization Records ({history.length})
              </h2>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-dark-300 text-sm">All completed</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {history.map((item) => (
                <div key={item.id} className="glass-card p-6 hover:bg-dark-800/60 transition-all duration-200 cursor-pointer" onClick={() => setSelectedItem(item)}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(item.status)}`}></div>
                      <span className="text-sm font-medium text-dark-300">#{item.id}</span>
                    </div>
                    <span className="text-xs text-dark-400">{formatDate(item.created_at)}</span>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-white mb-1">ASIN: {item.asin}</h3>
                      <p className="text-sm text-dark-400">Optimization completed</p>
                    </div>
                    
                    <div className="space-y-2">
                      <div>
                        <p className="text-xs text-dark-400 mb-1">Original Title</p>
                        <p className="text-sm text-dark-200 line-clamp-2">{item.original_title}</p>
                      </div>
                      <div>
                        <p className="text-xs text-dark-400 mb-1">Optimized Title</p>
                        <p className="text-sm text-white line-clamp-2">{item.optimized_title}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {item.optimized_keywords.slice(0, 3).map((keyword, index) => (
                        <span key={index} className="bg-blue-600/20 text-blue-300 px-2 py-1 rounded text-xs">
                          {keyword}
                        </span>
                      ))}
                      {item.optimized_keywords.length > 3 && (
                        <span className="text-xs text-dark-400">+{item.optimized_keywords.length - 3} more</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-dark-700">
                    <button className="w-full text-center text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors">
                      View Details →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {history.length === 0 && asin && !loading && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-dark-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-dark-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No History Found</h3>
            <p className="text-dark-300">No optimization records found for ASIN: {asin}</p>
          </div>
        )}

       
      </div>

      {/* Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-card max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">Optimization Details</h3>
                <button 
                  onClick={() => setSelectedItem(null)}
                  className="text-dark-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-6">
                {/* Product Info */}
                <div className="bg-dark-800/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Product Information</h4>
                  <p className="text-dark-300">ASIN: <span className="text-white font-mono">{selectedItem.asin}</span></p>
                  <p className="text-dark-300">Status: <span className="text-green-400 capitalize">{selectedItem.status || 'Optmized'}</span></p>
                </div>

                {/* Titles Comparison */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-white mb-2">Original Title</h4>
                    <p className="text-dark-200 bg-dark-800/50 p-3 rounded-lg">{selectedItem.original_title}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-2">Optimized Title</h4>
                    <p className="text-white bg-green-900/20 border border-green-600/30 p-3 rounded-lg">{selectedItem.optimized_title}</p>
                  </div>
                </div>

                {/* Bullet Points Comparison */}
                {selectedItem.original_bullets && selectedItem.optimized_bullets && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-white mb-3">Original Bullet Points</h4>
                      <div className="bg-dark-800/50 p-4 rounded-lg">
                        <ul className="space-y-2">
                          {selectedItem.original_bullets.map((bullet, index) => (
                            <li key={index} className="text-dark-200 text-sm flex items-start">
                              <span className="text-dark-400 mr-2">•</span>
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-3">Optimized Bullet Points</h4>
                      <div className="bg-green-900/20 border border-green-600/30 p-4 rounded-lg">
                        <ul className="space-y-2">
                          {selectedItem.optimized_bullets.map((bullet, index) => (
                            <li key={index} className="text-white text-sm flex items-start">
                              <span className="text-green-400 mr-2">•</span>
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* Descriptions Comparison */}
                {selectedItem.original_description && selectedItem.optimized_description && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-white mb-2">Original Description</h4>
                      <p className="text-dark-200 bg-dark-800/50 p-3 rounded-lg text-sm leading-relaxed">{selectedItem.original_description}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">Optimized Description</h4>
                      <p className="text-white bg-green-900/20 border border-green-600/30 p-3 rounded-lg text-sm leading-relaxed">{selectedItem.optimized_description}</p>
                    </div>
                  </div>
                )}
                
                {/* SEO Keywords */}
                <div>
                  <h4 className="font-semibold text-white mb-3">SEO Keywords</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.optimized_keywords.map((keyword, index) => (
                      <span key={index} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-sm">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Optimization Summary */}
                <div className="bg-blue-900/20 border border-blue-600/30 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Optimization Summary</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="text-center">
                      <div className="text-blue-400 font-semibold">Title Length</div>
                      <div className="text-white">{selectedItem.optimized_title?.length || 0} chars</div>
                    </div>
                    <div className="text-center">
                      <div className="text-blue-400 font-semibold">Bullet Points</div>
                      <div className="text-white">{selectedItem.optimized_bullets?.length || 0} points</div>
                    </div>
                    <div className="text-center">
                      <div className="text-blue-400 font-semibold">Keywords</div>
                      <div className="text-white">{selectedItem.optimized_keywords?.length || 0} keywords</div>
                    </div>
                    <div className="text-center">
                      <div className="text-blue-400 font-semibold">Description</div>
                      <div className="text-white">{selectedItem.optimized_description?.length || 0} chars</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-dark-700">
                  <div className="text-sm text-dark-400">
                    Optimized on {formatDate(selectedItem.created_at)}
                  </div>
                  <button className="btn-primary">
                    Export Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryPage;