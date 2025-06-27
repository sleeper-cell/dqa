import React from 'react';
import { motion } from 'framer-motion';
import HashChecker from '../components/HashChecker';

const HashAnalyzerPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 lg:p-8 text-white"
      >
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 lg:mb-4">
          Transaction Hash Analyzer
        </h1>
        <p className="text-purple-100 text-base sm:text-lg mb-4 lg:mb-6">
          Advanced RBF detection and high-value transaction forensics with comprehensive risk analysis.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
          <div className="bg-white/10 rounded-lg p-3 lg:p-4">
            <h3 className="font-semibold mb-2 text-sm sm:text-base">Deep Analysis</h3>
            <p className="text-xs sm:text-sm text-purple-100">Comprehensive transaction forensics and pattern detection</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3 lg:p-4">
            <h3 className="font-semibold mb-2 text-sm sm:text-base">Risk Scoring</h3>
            <p className="text-xs sm:text-sm text-purple-100">Chainalysis and Elliptic integration for professional analysis</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3 lg:p-4">
            <h3 className="font-semibold mb-2 text-sm sm:text-base">Address Analysis</h3>
            <p className="text-xs sm:text-sm text-purple-100">Input/output address risk assessment and labeling</p>
          </div>
        </div>
      </motion.div>

      {/* Hash Analyzer Component */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <HashChecker />
      </motion.div>

      {/* Additional Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-4">How to Use the Hash Analyzer</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Step-by-Step Guide</h3>
            <ol className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start space-x-2">
                <span className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">1</span>
                <span>Enter a 64-character hexadecimal transaction hash</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">2</span>
                <span>Click "Analyze" or press Enter to start analysis</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">3</span>
                <span>Review comprehensive transaction details and risk assessment</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">4</span>
                <span>Use external links for additional verification</span>
              </li>
            </ol>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Analysis Features</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>RBF (Replace-By-Fee) detection and analysis</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>High-value transaction identification</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Risk scoring with Chainalysis and Elliptic data</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span>OFAC sanctions list screening</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span>Address labeling and exchange detection</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HashAnalyzerPage;