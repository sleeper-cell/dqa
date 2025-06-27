import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  BarChart3, 
  PieChart, 
  Activity, 
  AlertTriangle,
  Shield,
  Target,
  Zap
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, BarChart, Bar } from 'recharts';

const RiskAnalyticsPage: React.FC = () => {
  // Sample data for charts
  const riskTrendData = [
    { time: '00:00', riskScore: 25, volume: 1200 },
    { time: '04:00', riskScore: 32, volume: 1800 },
    { time: '08:00', riskScore: 45, volume: 2400 },
    { time: '12:00', riskScore: 38, volume: 2100 },
    { time: '16:00', riskScore: 52, volume: 2800 },
    { time: '20:00', riskScore: 41, volume: 2200 }
  ];

  const riskDistribution = [
    { name: 'Low Risk', value: 78.5, color: '#10b981' },
    { name: 'Medium Risk', value: 15.2, color: '#f59e0b' },
    { name: 'High Risk', value: 5.8, color: '#ef4444' },
    { name: 'Critical Risk', value: 0.5, color: '#7c2d12' }
  ];

  const threatCategories = [
    { name: 'Ransomware', value: 2847, percentage: 28.4 },
    { name: 'Darknet Markets', value: 2156, percentage: 21.5 },
    { name: 'Sanctions/OFAC', value: 1834, percentage: 18.3 },
    { name: 'Mixing Services', value: 1523, percentage: 15.2 },
    { name: 'Other Illicit', value: 1640, percentage: 16.6 }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 lg:p-8 text-white"
      >
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 lg:mb-4">
          Risk Analytics
        </h1>
        <p className="text-purple-100 text-base sm:text-lg mb-4 lg:mb-6">
          Advanced risk assessment, pattern analysis, and predictive modeling for blockchain forensics.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          <div className="bg-white/10 rounded-lg p-3 lg:p-4">
            <h3 className="font-semibold mb-2 text-sm sm:text-base">Predictive Models</h3>
            <p className="text-xs sm:text-sm text-purple-100">Machine learning risk prediction algorithms</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3 lg:p-4">
            <h3 className="font-semibold mb-2 text-sm sm:text-base">Pattern Recognition</h3>
            <p className="text-xs sm:text-sm text-purple-100">Advanced behavioral analysis and clustering</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3 lg:p-4">
            <h3 className="font-semibold mb-2 text-sm sm:text-base">Real-time Scoring</h3>
            <p className="text-xs sm:text-sm text-purple-100">Dynamic risk assessment and alerts</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3 lg:p-4">
            <h3 className="font-semibold mb-2 text-sm sm:text-base">Trend Analysis</h3>
            <p className="text-xs sm:text-sm text-purple-100">Historical patterns and future projections</p>
          </div>
        </div>
      </motion.div>

      {/* Risk Metrics Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Average Risk Score</p>
              <p className="text-3xl font-bold text-gray-900">42.3%</p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                -2.1% (24h)
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">High Risk Transactions</p>
              <p className="text-3xl font-bold text-gray-900">1,247</p>
              <p className="text-sm text-red-600 flex items-center mt-1">
                <AlertTriangle className="w-3 h-3 mr-1" />
                +5.2% (24h)
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
              <p className="text-sm text-gray-600 mb-1">Risk Model Accuracy</p>
              <p className="text-3xl font-bold text-gray-900">94.7%</p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <Shield className="w-3 h-3 mr-1" />
                +0.3% (7d)
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Target className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Alert Response Time</p>
              <p className="text-3xl font-bold text-gray-900">1.2s</p>
              <p className="text-sm text-blue-600 flex items-center mt-1">
                <Zap className="w-3 h-3 mr-1" />
                Real-time
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Activity className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Risk Trend Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Score Trends (24h)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={riskTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="riskScore" 
                stroke="#8b5cf6" 
                strokeWidth={3}
                dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPieChart>
              <Pie
                data={riskDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={2}
                dataKey="value"
              >
                {riskDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
            </RechartsPieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {riskDistribution.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs text-gray-600">{item.name}: {item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Threat Categories Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white rounded-lg p-6 shadow-lg border border-gray-200"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Threat Categories Analysis</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={threatCategories}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value) => [`${value} incidents`, 'Count']} />
            <Bar dataKey="value" fill="#ef4444" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Risk Factors */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-6">Key Risk Factors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Transaction Patterns</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span>Rapid succession transactions</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span>Round number amounts</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span>Unusual timing patterns</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>High-frequency RBF usage</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Address Behavior</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span>Mixer service interactions</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span>Darknet market connections</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span>OFAC sanctions list matches</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Privacy coin conversions</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Network Analysis</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span>Geographic risk indicators</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span>Tor network usage</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span>VPN/proxy detection</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Botnet activity patterns</span>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Predictive Models */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-4">Machine Learning Models</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
            <div className="text-2xl font-bold text-blue-600">Random Forest</div>
            <div className="text-sm text-gray-600">Transaction Classification</div>
            <div className="text-xs text-gray-500 mt-1">Accuracy: 94.7%</div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
            <div className="text-2xl font-bold text-purple-600">Neural Network</div>
            <div className="text-sm text-gray-600">Pattern Recognition</div>
            <div className="text-xs text-gray-500 mt-1">Accuracy: 92.3%</div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
            <div className="text-2xl font-bold text-green-600">SVM</div>
            <div className="text-sm text-gray-600">Anomaly Detection</div>
            <div className="text-xs text-gray-500 mt-1">Accuracy: 89.1%</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RiskAnalyticsPage;