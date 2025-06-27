import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Download, 
  Calendar, 
  Filter, 
  BarChart3, 
  Shield, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Database
} from 'lucide-react';

const ComplianceReportsPage: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30days');
  const [selectedReport, setSelectedReport] = useState('aml-summary');

  const reportTypes = [
    {
      id: 'aml-summary',
      name: 'AML/CFT Summary Report',
      description: 'Comprehensive anti-money laundering compliance overview',
      icon: Shield
    },
    {
      id: 'transaction-analysis',
      name: 'Transaction Analysis Report',
      description: 'Detailed analysis of flagged and suspicious transactions',
      icon: BarChart3
    },
    {
      id: 'risk-assessment',
      name: 'Risk Assessment Report',
      description: 'Risk scoring and pattern analysis documentation',
      icon: AlertTriangle
    },
    {
      id: 'audit-trail',
      name: 'Audit Trail Report',
      description: 'Complete audit trail for compliance verification',
      icon: FileText
    }
  ];

  const complianceMetrics = [
    { label: 'Total Transactions Analyzed', value: '2,847,691', change: '+2.3%' },
    { label: 'Flagged Transactions', value: '8,234', change: '+0.29%' },
    { label: 'OFAC Matches', value: '67', change: '+12' },
    { label: 'Compliance Score', value: '94.7%', change: '+0.3%' }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 lg:p-8 text-white"
      >
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 lg:mb-4">
          Compliance Reports
        </h1>
        <p className="text-blue-100 text-base sm:text-lg mb-4 lg:mb-6">
          Generate comprehensive AML/CFT compliance documentation and audit reports for regulatory requirements.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          <div className="bg-white/10 rounded-lg p-3 lg:p-4">
            <h3 className="font-semibold mb-2 text-sm sm:text-base">FATF Compliant</h3>
            <p className="text-xs sm:text-sm text-blue-100">Meets international AML/CFT standards</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3 lg:p-4">
            <h3 className="font-semibold mb-2 text-sm sm:text-base">Automated Reports</h3>
            <p className="text-xs sm:text-sm text-blue-100">Scheduled generation and distribution</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3 lg:p-4">
            <h3 className="font-semibold mb-2 text-sm sm:text-base">Audit Ready</h3>
            <p className="text-xs sm:text-sm text-blue-100">Complete documentation for regulators</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3 lg:p-4">
            <h3 className="font-semibold mb-2 text-sm sm:text-base">Multi-format</h3>
            <p className="text-xs sm:text-sm text-blue-100">PDF, Excel, and JSON export options</p>
          </div>
        </div>
      </motion.div>

      {/* Report Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Generate Compliance Report</h2>
            <p className="text-sm text-gray-600">Select report type and time period for generation</p>
          </div>
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 90 Days</option>
              <option value="1year">Last Year</option>
            </select>
            <motion.button
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Download className="w-4 h-4" />
              <span>Generate Report</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Compliance Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {complianceMetrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{metric.label}</p>
                <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                <p className="text-sm text-green-600 flex items-center mt-1">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  {metric.change}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Database className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Report Types */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-6">Available Report Types</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reportTypes.map((report) => (
            <motion.div
              key={report.id}
              onClick={() => setSelectedReport(report.id)}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                selectedReport === report.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${
                  selectedReport === report.id ? 'bg-blue-100' : 'bg-gray-100'
                }`}>
                  <report.icon className={`w-5 h-5 ${
                    selectedReport === report.id ? 'text-blue-600' : 'text-gray-600'
                  }`} />
                </div>
                <div>
                  <h3 className={`font-semibold ${
                    selectedReport === report.id ? 'text-blue-900' : 'text-gray-900'
                  }`}>
                    {report.name}
                  </h3>
                  <p className={`text-sm ${
                    selectedReport === report.id ? 'text-blue-700' : 'text-gray-600'
                  }`}>
                    {report.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recent Reports */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Reports</h2>
        <div className="space-y-4">
          {[
            {
              name: 'AML Summary Report - December 2024',
              type: 'AML/CFT Summary',
              date: '2024-12-15',
              status: 'Completed',
              size: '2.4 MB'
            },
            {
              name: 'Transaction Analysis - Q4 2024',
              type: 'Transaction Analysis',
              date: '2024-12-10',
              status: 'Completed',
              size: '5.7 MB'
            },
            {
              name: 'Risk Assessment Report - November 2024',
              type: 'Risk Assessment',
              date: '2024-11-30',
              status: 'Completed',
              size: '3.2 MB'
            }
          ].map((report, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <FileText className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{report.name}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>{report.type}</span>
                    <span className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{report.date}</span>
                    </span>
                    <span>{report.size}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                  {report.status}
                </span>
                <motion.button
                  className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Download className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Compliance Standards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-4">Compliance Standards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-gray-900">FATF Recommendations</span>
          </div>
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-gray-900">EU 5AMLD Directive</span>
          </div>
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-gray-900">FinCEN Requirements</span>
          </div>
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-gray-900">MiCA Regulation</span>
          </div>
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-gray-900">BSA/AML Program</span>
          </div>
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-gray-900">OFAC Sanctions</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ComplianceReportsPage;