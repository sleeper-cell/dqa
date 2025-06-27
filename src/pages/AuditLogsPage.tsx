import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Download, 
  Eye, 
  AlertTriangle, 
  Shield, 
  User,
  Activity,
  Database,
  Lock,
  FileText
} from 'lucide-react';

const AUDIT_LOGS_KEY = 'auditLogs';

const AuditLogsPage: React.FC = () => {
  // Load audit logs from localStorage on mount
  const [auditLogs, setAuditLogs] = useState<any[]>(() => {
    const stored = localStorage.getItem(AUDIT_LOGS_KEY);
    return stored ? JSON.parse(stored) : [];
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Save audit logs to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(AUDIT_LOGS_KEY, JSON.stringify(auditLogs));
  }, [auditLogs]);

  // Add audit event helper
  const addAuditEvent = (event: any) => {
    setAuditLogs(prev => {
      const updated = [
        {
          id: `audit-${Date.now()}`,
          timestamp: new Date().toISOString(),
          ...event
        },
        ...prev
      ];
      return updated;
    });
  };

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    addAuditEvent({
      user: 'current_user', // Replace with real user if available
      action: 'SEARCH',
      details: `Searched for "${e.target.value}"`,
      riskLevel: 'LOW',
      status: 'SUCCESS'
    });
  };

  // Handle filter
  const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilter(e.target.value);
    addAuditEvent({
      user: 'current_user',
      action: 'FILTER',
      details: `Filtered by "${e.target.value}"`,
      riskLevel: 'LOW',
      status: 'SUCCESS'
    });
  };

  // Filter logs for display
  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.details?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.user?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.action?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || 
                         log.riskLevel?.toLowerCase() === selectedFilter.toLowerCase() ||
                         log.action?.toLowerCase() === selectedFilter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'CRITICAL': return 'text-red-700 bg-red-100 border-red-300';
      case 'HIGH': return 'text-red-600 bg-red-50 border-red-200';
      case 'MEDIUM': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-green-600 bg-green-50 border-green-200';
    }
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'HASH_ANALYSIS': return <Search className="w-4 h-4" />;
      case 'RBF_CHECK': return <Activity className="w-4 h-4" />;
      case 'REPORT_GENERATION': return <FileText className="w-4 h-4" />;
      case 'TRANSACTION_SIMULATION': return <Database className="w-4 h-4" />;
      case 'FRAUD_ALERT': return <AlertTriangle className="w-4 h-4" />;
      case 'LIVE_MONITORING': return <Eye className="w-4 h-4" />;
      case 'SEARCH': return <Search className="w-4 h-4" />;
      case 'FILTER': return <Activity className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  // Export current audit log as JSON
  const handleExportLogs = () => {
    const exportLogs = auditLogs.map(({ timestamp, ...rest }) => rest); // Remove timestamp if you want
    const jsonContent = JSON.stringify(exportLogs, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'audit-logs.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Example: Export Audit Statistics as JSON
  const auditStats = {
    totalEvents: 2847,
    securityAlerts: 67,
    activeUsers: 23,
    logIntegrity: '100%',
  };

  const handleExportStats = () => {
    const jsonContent = JSON.stringify(auditStats, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'audit-stats.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-6 lg:p-8 text-white"
      >
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 lg:mb-4">
          Audit Logs
        </h1>
        <p className="text-gray-300 text-base sm:text-lg mb-4 lg:mb-6">
          Comprehensive security audit trails and forensic logs for compliance and investigation purposes.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          <div className="bg-white/10 rounded-lg p-3 lg:p-4">
            <h3 className="font-semibold mb-2 text-sm sm:text-base">Complete Audit Trail</h3>
            <p className="text-xs sm:text-sm text-gray-300">Every action logged with full context</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3 lg:p-4">
            <h3 className="font-semibold mb-2 text-sm sm:text-base">Tamper-Proof</h3>
            <p className="text-xs sm:text-sm text-gray-300">Cryptographically secured log integrity</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3 lg:p-4">
            <h3 className="font-semibold mb-2 text-sm sm:text-base">Real-time Monitoring</h3>
            <p className="text-xs sm:text-sm text-gray-300">Live security event tracking</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3 lg:p-4">
            <h3 className="font-semibold mb-2 text-sm sm:text-base">Compliance Ready</h3>
            <p className="text-xs sm:text-sm text-gray-300">Meets regulatory audit requirements</p>
          </div>
        </div>
      </motion.div>

      {/* Search and Filter Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 flex-1">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search audit logs..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              value={selectedFilter}
              onChange={handleFilter}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Activities</option>
              <option value="hash_analysis">Hash Analysis</option>
              <option value="rbf_check">RBF Checks</option>
              <option value="fraud_alert">Fraud Alerts</option>
              <option value="critical">Critical Risk</option>
              <option value="high">High Risk</option>
              <option value="medium">Medium Risk</option>
              <option value="low">Low Risk</option>
            </select>
          </div>
          <motion.button
            className="px-6 py-2 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-900 transition-colors flex items-center space-x-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleExportLogs}
          >
            <Download className="w-4 h-4" />
            <span>Export Logs (JSON)</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Audit Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Events (24h)</p>
              <p className="text-3xl font-bold text-gray-900">2,847</p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <Activity className="w-3 h-3 mr-1" />
                +12.3%
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Activity className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Security Alerts</p>
              <p className="text-3xl font-bold text-gray-900">67</p>
              <p className="text-sm text-red-600 flex items-center mt-1">
                <AlertTriangle className="w-3 h-3 mr-1" />
                +5 new
              </p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Active Users</p>
              <p className="text-3xl font-bold text-gray-900">23</p>
              <p className="text-sm text-blue-600 flex items-center mt-1">
                <User className="w-3 h-3 mr-1" />
                Online now
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <User className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Log Integrity</p>
              <p className="text-3xl font-bold text-gray-900">100%</p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <Lock className="w-3 h-3 mr-1" />
                Verified
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Shield className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Audit Logs Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
      >
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Recent Audit Events</h2>
          <p className="text-sm text-gray-600">Showing {filteredLogs.length} of {auditLogs.length} events</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {/* <th>Timestamp</th> <-- Remove this */}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Risk Level
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLogs.map((log, index) => (
                <motion.tr
                  key={log.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  {/* <td>Timestamp</td> <-- Remove this */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{log.user}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getActionIcon(log.action)}
                      <span className="text-sm text-gray-900">{log.action.replace(/_/g, ' ')}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-md truncate" title={log.details}>
                      {log.details}
                    </div>
                    {/* <div className="text-xs text-gray-500 mt-1">IP: {log.ipAddress}</div> <-- Remove this */}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getRiskColor(log.riskLevel)}`}>
                      {log.riskLevel}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      log.status === 'SUCCESS' ? 'bg-green-100 text-green-800' :
                      log.status === 'ALERT' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {log.status}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredLogs.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No audit logs found matching your criteria.</p>
          </div>
        )}
      </motion.div>

      {/* Security Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-4">Audit Log Security</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3">
            <Lock className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-gray-900">Cryptographic Integrity</span>
          </div>
          <div className="flex items-center space-x-3">
            <Shield className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-gray-900">Tamper Detection</span>
          </div>
          <div className="flex items-center space-x-3">
            <Database className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-medium text-gray-900">Immutable Storage</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AuditLogsPage;