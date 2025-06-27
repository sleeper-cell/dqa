import React, { useState } from 'react';
import { motion } from 'framer-motion';
import TransactionSimulator from '../components/TransactionSimulator';

const TransactionSimulatorPage: React.FC = () => {
  const [riskLevel, setRiskLevel] = useState(25);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 lg:p-8 text-white"
      >
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 lg:mb-4">
          Transaction Generator
        </h1>
        <p className="text-blue-100 text-base sm:text-lg mb-4 lg:mb-6">
          Generate and analyze fake blockchain transactions for forensic testing and security research.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          <div className="bg-white/10 rounded-lg p-3 lg:p-4">
            <h3 className="font-semibold mb-2 text-sm sm:text-base">Bitcoin & Ethereum</h3>
            <p className="text-xs sm:text-sm text-blue-100">Support for major cryptocurrency networks</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3 lg:p-4">
            <h3 className="font-semibold mb-2 text-sm sm:text-base">RBF Simulation</h3>
            <p className="text-xs sm:text-sm text-blue-100">Test Replace-By-Fee scenarios and fee bumping</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3 lg:p-4">
            <h3 className="font-semibold mb-2 text-sm sm:text-base">Risk Detection</h3>
            <p className="text-xs sm:text-sm text-blue-100">Real-time fraud pattern analysis</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3 lg:p-4">
            <h3 className="font-semibold mb-2 text-sm sm:text-base">Forensic Valid</h3>
            <p className="text-xs sm:text-sm text-blue-100">Realistic transaction structures for testing</p>
          </div>
        </div>
      </motion.div>

      {/* Transaction Simulator Component */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <TransactionSimulator onRiskUpdate={setRiskLevel} />
      </motion.div>

      {/* Simulation Guide */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-4">Transaction Simulation Guide</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Simulation Features</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Realistic transaction IDs and addresses</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Dynamic fee calculation based on network conditions</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>RBF-enabled transactions for fee bumping tests</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span>Fraud detection pattern analysis</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span>Transaction status progression simulation</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Risk Analysis</h3>
            <div className="space-y-3">
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="font-semibold text-green-800">ALLOW (Low Risk)</div>
                <div className="text-xs text-green-600">Normal transaction patterns, no red flags detected</div>
              </div>
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="font-semibold text-yellow-800">WARN (Medium Risk)</div>
                <div className="text-xs text-yellow-600">Some suspicious patterns, requires monitoring</div>
              </div>
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="font-semibold text-red-800">BAN (High Risk)</div>
                <div className="text-xs text-red-600">Multiple fraud indicators, transaction blocked</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Current Risk Level Display */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Current Risk Level</h3>
            <p className="text-sm text-gray-600">Based on recent transaction simulations</p>
          </div>
          <div className="text-right">
            <div className={`text-3xl font-bold ${
              riskLevel < 30 ? 'text-green-600' : 
              riskLevel < 70 ? 'text-yellow-600' : 'text-red-600'
            }`}>
              {riskLevel}%
            </div>
            <div className={`text-sm font-medium ${
              riskLevel < 30 ? 'text-green-600' : 
              riskLevel < 70 ? 'text-yellow-600' : 'text-red-600'
            }`}>
              {riskLevel < 30 ? 'LOW RISK' : riskLevel < 70 ? 'MEDIUM RISK' : 'HIGH RISK'}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TransactionSimulatorPage;