import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FraudDashboard from '../components/FraudDashboard';

const FraudDashboardPage: React.FC = () => {
  const [riskLevel] = useState(45);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-red-600 to-orange-600 rounded-xl p-6 lg:p-8 text-white"
      >
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 lg:mb-4">
          Fraud Detection Dashboard
        </h1>
        <p className="text-red-100 text-base sm:text-lg mb-4 lg:mb-6">
          Real-time fraud detection, compliance monitoring, and blockchain forensics powered by industry-leading tools.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          <div className="bg-white/10 rounded-lg p-3 lg:p-4">
            <h3 className="font-semibold mb-2 text-sm sm:text-base">Chainalysis KYT</h3>
            <p className="text-xs sm:text-sm text-red-100">Professional blockchain analytics and compliance</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3 lg:p-4">
            <h3 className="font-semibold mb-2 text-sm sm:text-base">Elliptic Navigator</h3>
            <p className="text-xs sm:text-sm text-red-100">Advanced investigation and risk assessment</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3 lg:p-4">
            <h3 className="font-semibold mb-2 text-sm sm:text-base">OFAC Screening</h3>
            <p className="text-xs sm:text-sm text-red-100">Real-time sanctions list monitoring</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3 lg:p-4">
            <h3 className="font-semibold mb-2 text-sm sm:text-base">Live Alerts</h3>
            <p className="text-xs sm:text-sm text-red-100">Instant notifications for high-risk transactions</p>
          </div>
        </div>
      </motion.div>

      {/* Fraud Dashboard Component */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <FraudDashboard riskLevel={riskLevel} />
      </motion.div>
    </div>
  );
};

export default FraudDashboardPage;