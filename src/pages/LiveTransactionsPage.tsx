import React from 'react';
import { motion } from 'framer-motion';
import LiveTransactionViewer from '../components/LiveTransactionViewer';

const LiveTransactionsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-orange-600 to-red-600 rounded-xl p-6 lg:p-8 text-white"
      >
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 lg:mb-4">
          Live Transaction Feed
        </h1>
        <p className="text-orange-100 text-base sm:text-lg mb-4 lg:mb-6">
          Real-time monitoring of high-value Bitcoin transactions with RBF detection and forensic analysis.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
          <div className="bg-white/10 rounded-lg p-3 lg:p-4">
            <h3 className="font-semibold mb-2 text-sm sm:text-base">10-500 BTC Range</h3>
            <p className="text-xs sm:text-sm text-orange-100">Focus on high-value transactions for forensic analysis</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3 lg:p-4">
            <h3 className="font-semibold mb-2 text-sm sm:text-base">RBF Detection</h3>
            <p className="text-xs sm:text-sm text-orange-100">Instant alerts for Replace-By-Fee transactions</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3 lg:p-4">
            <h3 className="font-semibold mb-2 text-sm sm:text-base">Real-time Stream</h3>
            <p className="text-xs sm:text-sm text-orange-100">Live blockchain data with optimized performance</p>
          </div>
        </div>
      </motion.div>

      {/* Live Transaction Viewer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        <div className="lg:col-span-2 xl:col-span-3">
          <LiveTransactionViewer />
        </div>
      </motion.div>

      {/* Transaction Monitoring Guide */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-4">Live Transaction Monitoring</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Monitoring Features</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span>Real-time Bitcoin mainnet transaction stream</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span>RBF transaction detection with 5-second alerts</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>High-value transaction filtering (10-500 BTC)</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Optimized performance for continuous monitoring</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Transaction counter and statistics tracking</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Alert Types</h3>
            <div className="space-y-3">
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="font-semibold text-red-800">🚨 RBF Alert</div>
                <div className="text-xs text-red-600">Replace-By-Fee transaction detected - 5 second display with red background</div>
              </div>
              <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="font-semibold text-orange-800">💰 High-Value</div>
                <div className="text-xs text-orange-600">Standard high-value transaction - 3 second display</div>
              </div>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="font-semibold text-blue-800">⚡ Real-time</div>
                <div className="text-xs text-blue-600">Live blockchain data with API fallback for reliability</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Performance Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Performance Optimizations</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">3s</div>
            <div className="text-sm text-gray-600">Regular Transaction Display</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">5s</div>
            <div className="text-sm text-gray-600">RBF Alert Duration</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">10-500</div>
            <div className="text-sm text-gray-600">BTC Value Range</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LiveTransactionsPage;