import React from 'react';
import { motion } from 'framer-motion';
import HashChecker from '../components/HashChecker';
import RBFChecker from '../components/RBFChecker';
import TransactionSimulator from '../components/TransactionSimulator';
import FraudDashboard from '../components/FraudDashboard';
import LiveTransactionViewer from '../components/LiveTransactionViewer';

interface DashboardProps {
  riskLevel: number;
  onRiskUpdate: (riskLevel: number) => void;
  isMobile: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ riskLevel, onRiskUpdate, isMobile }) => {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 lg:p-8 text-white"
      >
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 lg:mb-4">
          Forensic Blockchain Analysis Platform
        </h1>
        <p className="text-blue-100 text-base sm:text-lg mb-4 lg:mb-6">
          Professional-grade transaction, hash analysis, and fraud detection for security research and forensic analysis.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          <div className="bg-white/10 rounded-lg p-3 lg:p-4">
            <h3 className="font-semibold mb-2 text-sm sm:text-base">Hash Analysis</h3>
            <p className="text-xs sm:text-sm text-blue-100">Advanced RBF detection and high-value transaction forensics</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3 lg:p-4">
            <h3 className="font-semibold mb-2 text-sm sm:text-base">RBF Checker</h3>
            <p className="text-xs sm:text-sm text-blue-100">Dedicated Replace-By-Fee status verification and analysis</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3 lg:p-4">
            <h3 className="font-semibold mb-2 text-sm sm:text-base">Transaction Analysis</h3>
            <p className="text-xs sm:text-sm text-blue-100">Generate forensic-valid transactions for Bitcoin and Ethereum</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3 lg:p-4">
            <h3 className="font-semibold mb-2 text-sm sm:text-base">Real-Time Fraud Detection</h3>
            <p className="text-xs sm:text-sm text-blue-100">Advanced pattern analysis and behavioral monitoring</p>
          </div>
        </div>
      </motion.div>

      <div className="flex flex-col xl:flex-row gap-6 lg:gap-8">
        {/* Left Column - Main Content */}
        <div className="flex-1 min-w-0 space-y-6 lg:space-y-8">
          {/* Hash Checker */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <HashChecker />
          </motion.div>

          {/* RBF Checker */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <RBFChecker />
          </motion.div>

          {/* Transaction Simulator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <TransactionSimulator onRiskUpdate={onRiskUpdate} />
          </motion.div>

          {/* Fraud Dashboard */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <FraudDashboard riskLevel={riskLevel} />
          </motion.div>
        </div>

        {/* Right Column - Live Transactions (Desktop Only) */}
        {!isMobile && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="w-full xl:w-80 flex-shrink-0"
          >
            <div className="sticky top-24">
              <LiveTransactionViewer />
            </div>
          </motion.div>
        )}
      </div>

      {/* Mobile Live Transaction Viewer */}
      {isMobile && <LiveTransactionViewer isMobile={true} />}
    </div>
  );
};

export default Dashboard;