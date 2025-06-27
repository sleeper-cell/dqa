import React from 'react';
import { motion } from 'framer-motion';
import RBFChecker from '../components/RBFChecker';

const RBFCheckerPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-6 lg:p-8 text-white"
      >
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 lg:mb-4">
          RBF Checker
        </h1>
        <p className="text-green-100 text-base sm:text-lg mb-4 lg:mb-6">
          Dedicated Replace-By-Fee status verification with clear visual indicators for transaction replaceability.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
          <div className="bg-white/10 rounded-lg p-3 lg:p-4">
            <h3 className="font-semibold mb-2 text-sm sm:text-base">🟢 RBF Eligible</h3>
            <p className="text-xs sm:text-sm text-green-100">Unconfirmed transactions that can be replaced</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3 lg:p-4">
            <h3 className="font-semibold mb-2 text-sm sm:text-base">🔴 Already Confirmed</h3>
            <p className="text-xs sm:text-sm text-green-100">Confirmed transactions cannot use RBF</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3 lg:p-4">
            <h3 className="font-semibold mb-2 text-sm sm:text-base">🟡 RBF Not Enabled</h3>
            <p className="text-xs sm:text-sm text-green-100">Unconfirmed but RBF flag not set</p>
          </div>
        </div>
      </motion.div>

      {/* RBF Checker Component */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <RBFChecker />
      </motion.div>

      {/* RBF Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-4">Understanding Replace-By-Fee (RBF)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">What is RBF?</h3>
            <p className="text-sm text-gray-600 mb-4">
              Replace-By-Fee (RBF) is a Bitcoin protocol feature that allows users to replace an unconfirmed transaction 
              with a new version that pays a higher fee, potentially getting confirmed faster.
            </p>
            <h4 className="font-semibold text-gray-800 mb-2">RBF Requirements:</h4>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• Transaction must be unconfirmed</li>
              <li>• Original transaction must signal RBF (sequence number &lt; 0xfffffffe)</li>
              <li>• New transaction must pay higher total fees</li>
              <li>• Must not conflict with confirmed transactions</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">RBF Status Indicators</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <div>
                  <div className="font-semibold text-green-800">RBF ELIGIBLE</div>
                  <div className="text-xs text-green-600">Transaction can be replaced with higher fee</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                <div>
                  <div className="font-semibold text-red-800">ALREADY CONFIRMED</div>
                  <div className="text-xs text-red-600">Transaction is confirmed, RBF not possible</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                <div>
                  <div className="font-semibold text-yellow-800">RBF NOT ENABLED</div>
                  <div className="text-xs text-yellow-600">Unconfirmed but RBF flag not set</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RBFCheckerPage;