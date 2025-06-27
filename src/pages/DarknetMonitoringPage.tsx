import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Eye, 
  Search, 
  Shield, 
  AlertTriangle, 
  Database, 
  Activity, 
  Clock, 
  Download, 
  Upload, 
  Zap, 
  Lock, 
  Unlock, 
  Key, 
  Fingerprint, 
  Brain, 
  Microscope, 
  Satellite, 
  Radio, 
  Webhook, 
  Code, 
  Cloud, 
  HardDrive, 
  Network, 
  GitBranch, 
  Layers, 
  Workflow, 
  Calendar, 
  Bell, 
  User, 
  Mail, 
  Phone, 
  Home, 
  Building, 
  Car, 
  Plane, 
  Train, 
  Bus, 
  Bike, 
  ExternalLink,
  Copy,
  CheckCircle,
  XCircle,
  Info,
  FileText,
  Globe,
  Server,
  Cpu,
  Monitor,
  Smartphone,
  Tablet,
  Laptop,
  Link,
  Image,
  Video,
  Music,
  DollarSign,
  Bitcoin,
  ShoppingCart,
  Package,
  Truck,
  MapPin,
  Target,
  Crosshair
} from 'lucide-react';

interface DarknetMonitoring {
  marketplaces: Array<{
    name: string;
    url: string;
    status: 'Active' | 'Seized' | 'Exit Scam' | 'Offline' | 'Unknown';
    lastSeen: string;
    vendors: number;
    listings: number;
    cryptoSupport: string[];
    riskLevel: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
    categories: string[];
  }>;
  cryptoActivity: {
    totalVolume: number;
    transactionCount: number;
    uniqueAddresses: number;
    suspiciousPatterns: string[];
    mixerUsage: number;
    privacyCoinUsage: number;
  };
  threatIntelligence: {
    newThreats: Array<{
      type: string;
      description: string;
      severity: string;
      firstSeen: string;
      indicators: string[];
    }>;
    ransomwareGroups: Array<{
      name: string;
      status: string;
      victims: number;
      paymentAddress: string;
      lastActivity: string;
    }>;
    dataBreaches: Array<{
      organization: string;
      recordCount: number;
      dataTypes: string[];
      price: string;
      seller: string;
      posted: string;
    }>;
  };
  monitoring: {
    keywords: string[];
    alertsTriggered: number;
    newListings: number;
    priceChanges: number;
    vendorActivity: number;
  };
  geographicData: {
    topCountries: Array<{
      country: string;
      percentage: number;
      marketplaces: number;
    }>;
    jurisdictionalRisks: string[];
  };
}

const DarknetMonitoringPage: React.FC = () => {
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [monitoring, setMonitoring] = useState<DarknetMonitoring | null>(null);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'marketplaces' | 'threats' | 'intelligence'>('overview');
  const [monitoringKeywords] = useState(['bitcoin', 'cryptocurrency', 'wallet', 'exchange', 'ransomware', 'stolen data']);

  // Generate comprehensive darknet monitoring data
  const generateDarknetMonitoring = useCallback((): DarknetMonitoring => {
    return {
      marketplaces: [
        {
          name: 'AlphaBay (Historical)',
          url: 'alphabay[.]onion',
          status: 'Seized',
          lastSeen: '2017-07-05',
          vendors: 0,
          listings: 0,
          cryptoSupport: ['Bitcoin', 'Monero'],
          riskLevel: 'CRITICAL',
          categories: ['Drugs', 'Fraud', 'Stolen Data', 'Malware']
        },
        {
          name: 'Silk Road (Historical)',
          url: 'silkroad[.]onion',
          status: 'Seized',
          lastSeen: '2013-10-02',
          vendors: 0,
          listings: 0,
          cryptoSupport: ['Bitcoin'],
          riskLevel: 'CRITICAL',
          categories: ['Drugs', 'Fake IDs', 'Digital Goods']
        },
        {
          name: 'Dream Market (Historical)',
          url: 'dreammarket[.]onion',
          status: 'Exit Scam',
          lastSeen: '2019-04-30',
          vendors: 0,
          listings: 0,
          cryptoSupport: ['Bitcoin', 'Bitcoin Cash', 'Monero'],
          riskLevel: 'HIGH',
          categories: ['Drugs', 'Digital Goods', 'Services']
        },
        {
          name: 'Empire Market (Historical)',
          url: 'empiremarket[.]onion',
          status: 'Exit Scam',
          lastSeen: '2020-08-23',
          vendors: 0,
          listings: 0,
          cryptoSupport: ['Bitcoin', 'Monero'],
          riskLevel: 'HIGH',
          categories: ['Drugs', 'Fraud', 'Counterfeit']
        },
        {
          name: 'Hydra Market (Historical)',
          url: 'hydramarket[.]onion',
          status: 'Seized',
          lastSeen: '2022-04-05',
          vendors: 0,
          listings: 0,
          cryptoSupport: ['Bitcoin'],
          riskLevel: 'CRITICAL',
          categories: ['Drugs', 'Money Laundering', 'Stolen Data']
        }
      ],
      cryptoActivity: {
        totalVolume: 2847691.23,
        transactionCount: 156789,
        uniqueAddresses: 45678,
        suspiciousPatterns: [
          'High-frequency small transactions',
          'Mixer service usage patterns',
          'Cross-chain swapping activity',
          'Privacy coin conversions',
          'Tumbling service interactions'
        ],
        mixerUsage: 23.7,
        privacyCoinUsage: 34.2
      },
      threatIntelligence: {
        newThreats: [
          {
            type: 'Ransomware-as-a-Service',
            description: 'New RaaS platform offering cryptocurrency payment processing',
            severity: 'CRITICAL',
            firstSeen: '2024-12-10',
            indicators: ['raas-platform.onion', 'crypto-payment-gateway']
          },
          {
            type: 'Cryptocurrency Stealer',
            description: 'Advanced malware targeting hardware wallet seed phrases',
            severity: 'HIGH',
            firstSeen: '2024-12-08',
            indicators: ['wallet-stealer.exe', 'seed-harvester']
          },
          {
            type: 'Exchange Credentials',
            description: 'Large database of compromised exchange accounts for sale',
            severity: 'HIGH',
            firstSeen: '2024-12-05',
            indicators: ['exchange-db-2024', 'crypto-accounts']
          }
        ],
        ransomwareGroups: [
          {
            name: 'LockBit (Historical)',
            status: 'Disrupted',
            victims: 2000,
            paymentAddress: 'bc1q...historical',
            lastActivity: '2024-02-20'
          },
          {
            name: 'BlackCat/ALPHV (Historical)',
            status: 'Disrupted',
            victims: 1000,
            paymentAddress: 'bc1q...historical',
            lastActivity: '2023-12-19'
          },
          {
            name: 'Cl0p (Historical)',
            status: 'Active (Historical)',
            victims: 500,
            paymentAddress: 'bc1q...historical',
            lastActivity: '2023-06-15'
          }
        ],
        dataBreaches: [
          {
            organization: 'Crypto Exchange XYZ (Simulated)',
            recordCount: 2500000,
            dataTypes: ['Email', 'Password Hash', 'KYC Data', 'Transaction History'],
            price: '15 BTC',
            seller: 'DataBroker123',
            posted: '2024-12-01'
          },
          {
            organization: 'DeFi Platform ABC (Simulated)',
            recordCount: 850000,
            dataTypes: ['Wallet Addresses', 'Transaction Data', 'Personal Info'],
            price: '8 BTC',
            seller: 'CryptoLeaks',
            posted: '2024-11-28'
          }
        ]
      },
      monitoring: {
        keywords: monitoringKeywords,
        alertsTriggered: 47,
        newListings: 156,
        priceChanges: 23,
        vendorActivity: 89
      },
      geographicData: {
        topCountries: [
          { country: 'United States', percentage: 28.5, marketplaces: 12 },
          { country: 'Russia', percentage: 18.3, marketplaces: 8 },
          { country: 'Germany', percentage: 12.7, marketplaces: 6 },
          { country: 'Netherlands', percentage: 9.8, marketplaces: 4 },
          { country: 'United Kingdom', percentage: 8.2, marketplaces: 3 },
          { country: 'China', percentage: 7.1, marketplaces: 3 },
          { country: 'France', percentage: 5.9, marketplaces: 2 },
          { country: 'Other', percentage: 9.5, marketplaces: 8 }
        ],
        jurisdictionalRisks: [
          'Five Eyes intelligence sharing',
          'EU cybercrime cooperation',
          'Mutual Legal Assistance Treaties',
          'Cross-border law enforcement operations'
        ]
      }
    };
  }, [monitoringKeywords]);

  const startMonitoring = useCallback(async () => {
    setIsMonitoring(true);

    try {
      // Simulate monitoring delay
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Generate comprehensive monitoring data
      const monitoringResult = generateDarknetMonitoring();
      setMonitoring(monitoringResult);

    } catch (err) {
      console.error('Monitoring failed:', err);
    } finally {
      setIsMonitoring(false);
    }
  }, [generateDarknetMonitoring]);

  // Auto-start monitoring on component mount
  React.useEffect(() => {
    startMonitoring();
  }, [startMonitoring]);

  const getStatusColor = useCallback((status: string) => {
    switch (status) {
      case 'Active': return 'text-red-700 bg-red-100 border-red-300';
      case 'Seized': return 'text-blue-700 bg-blue-100 border-blue-300';
      case 'Exit Scam': return 'text-orange-700 bg-orange-100 border-orange-300';
      case 'Offline': return 'text-gray-700 bg-gray-100 border-gray-300';
      default: return 'text-yellow-700 bg-yellow-100 border-yellow-300';
    }
  }, []);

  const getRiskLevelColor = useCallback((level: string) => {
    switch (level) {
      case 'CRITICAL': return 'text-red-800 bg-red-100 border-red-400';
      case 'HIGH': return 'text-red-700 bg-red-50 border-red-300';
      case 'MEDIUM': return 'text-yellow-700 bg-yellow-50 border-yellow-300';
      default: return 'text-blue-700 bg-blue-50 border-blue-300';
    }
  }, []);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-gray-800 to-black rounded-xl p-6 lg:p-8 text-white"
      >
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 lg:mb-4">
          Darknet Marketplace Monitoring
        </h1>
        <p className="text-gray-300 text-base sm:text-lg mb-4 lg:mb-6">
          Professional dark web surveillance and cryptocurrency tracking for law enforcement, compliance, and threat intelligence.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          <div className="bg-white/10 rounded-lg p-3 lg:p-4">
            <h3 className="font-semibold mb-2 text-sm sm:text-base">⚠️ Educational Purpose</h3>
            <p className="text-xs sm:text-sm text-gray-300">Historical data for research and training only</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3 lg:p-4">
            <h3 className="font-semibold mb-2 text-sm sm:text-base">Threat Intelligence</h3>
            <p className="text-xs sm:text-sm text-gray-300">Ransomware groups and emerging threats</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3 lg:p-4">
            <h3 className="font-semibold mb-2 text-sm sm:text-base">Crypto Tracking</h3>
            <p className="text-xs sm:text-sm text-gray-300">Blockchain analysis and money laundering detection</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3 lg:p-4">
            <h3 className="font-semibold mb-2 text-sm sm:text-base">Law Enforcement</h3>
            <p className="text-xs sm:text-sm text-gray-300">Professional investigation support tools</p>
          </div>
        </div>
      </motion.div>

      {/* Legal Disclaimer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-yellow-50 border border-yellow-200 rounded-xl p-6"
      >
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-6 h-6 text-yellow-600 mt-1 flex-shrink-0" />
          <div>
            <h3 className="text-lg font-semibold text-yellow-900 mb-2">⚖️ Legal Notice & Educational Purpose</h3>
            <p className="text-yellow-800 text-sm mb-3">
              This tool displays historical data about seized and defunct darknet marketplaces for educational, research, 
              and law enforcement training purposes only. All marketplace data represents historical information about 
              platforms that have been shut down by law enforcement.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-yellow-800">
              <div>
                <h4 className="font-semibold mb-2">✅ Authorized Uses:</h4>
                <ul className="space-y-1">
                  <li>• Law enforcement training</li>
                  <li>• Academic research</li>
                  <li>• Cybersecurity education</li>
                  <li>• Threat intelligence analysis</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">❌ Prohibited Uses:</h4>
                <ul className="space-y-1">
                  <li>• Accessing illegal marketplaces</li>
                  <li>• Facilitating illegal activities</li>
                  <li>• Purchasing illegal goods/services</li>
                  <li>• Money laundering activities</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Monitoring Results */}
      <AnimatePresence>
        {monitoring && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Monitoring Overview */}
            <div className="bg-gradient-to-r from-gray-700 to-gray-900 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Eye className="w-8 h-8" />
                  <h3 className="text-xl font-bold">Darknet Intelligence Overview</h3>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm">Historical Data Analysis</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-gray-300 text-sm mb-1">Historical Marketplaces</div>
                  <div className="text-2xl font-bold">{monitoring.marketplaces.length}</div>
                  <div className="text-xs text-gray-400">Documented platforms</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-gray-300 text-sm mb-1">Crypto Volume (Historical)</div>
                  <div className="text-2xl font-bold">{monitoring.cryptoActivity.totalVolume.toLocaleString()}</div>
                  <div className="text-xs text-gray-400">BTC equivalent</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-gray-300 text-sm mb-1">Threat Indicators</div>
                  <div className="text-2xl font-bold">{monitoring.threatIntelligence.newThreats.length}</div>
                  <div className="text-xs text-gray-400">Active threats</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-gray-300 text-sm mb-1">Ransomware Groups</div>
                  <div className="text-2xl font-bold">{monitoring.threatIntelligence.ransomwareGroups.length}</div>
                  <div className="text-xs text-gray-400">Historical groups</div>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="bg-white rounded-lg shadow-lg border border-gray-200">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {[
                    { id: 'overview', label: 'Overview', icon: Eye },
                    { id: 'marketplaces', label: 'Historical Marketplaces', icon: ShoppingCart },
                    { id: 'threats', label: 'Threat Intelligence', icon: AlertTriangle },
                    { id: 'intelligence', label: 'Crypto Intelligence', icon: Bitcoin }
                  ].map((tab) => (
                    <motion.button
                      key={tab.id}
                      onClick={() => setSelectedTab(tab.id as any)}
                      className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm ${
                        selectedTab === tab.id
                          ? 'border-gray-500 text-gray-700'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <tab.icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </motion.button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {selectedTab === 'overview' && (
                  <div className="space-y-6">
                    {/* Geographic Distribution */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Historical Geographic Distribution</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {monitoring.geographicData.topCountries.slice(0, 4).map((country, index) => (
                          <div key={index} className="p-4 border border-gray-200 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-gray-900">{country.country}</span>
                              <span className="text-sm text-gray-600">{country.percentage}%</span>
                            </div>
                            <div className="text-sm text-gray-700">
                              {country.marketplaces} historical platforms
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Monitoring Keywords */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Monitoring Keywords</h4>
                      <div className="flex flex-wrap gap-2">
                        {monitoring.monitoring.keywords.map((keyword, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Jurisdictional Risks */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="text-lg font-semibold text-blue-900 mb-4">Law Enforcement Cooperation</h4>
                      <div className="space-y-2">
                        {monitoring.geographicData.jurisdictionalRisks.map((risk, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-blue-600" />
                            <span className="text-blue-800">{risk}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {selectedTab === 'marketplaces' && (
                  <div className="space-y-6">
                    {/* Historical Marketplaces */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Historical Darknet Marketplaces</h4>
                      <div className="space-y-4">
                        {monitoring.marketplaces.map((marketplace, index) => (
                          <div key={index} className="p-4 border border-gray-200 rounded-lg">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center space-x-3">
                                <h5 className="font-semibold text-gray-900">{marketplace.name}</h5>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(marketplace.status)}`}>
                                  {marketplace.status}
                                </span>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getRiskLevelColor(marketplace.riskLevel)}`}>
                                  {marketplace.riskLevel}
                                </span>
                              </div>
                              <span className="text-sm text-gray-600">Last seen: {marketplace.lastSeen}</span>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                              <div className="text-sm">
                                <span className="text-gray-600">URL:</span>
                                <span className="ml-2 font-mono text-gray-900">{marketplace.url}</span>
                              </div>
                              <div className="text-sm">
                                <span className="text-gray-600">Crypto Support:</span>
                                <span className="ml-2 text-gray-900">{marketplace.cryptoSupport.join(', ')}</span>
                              </div>
                              <div className="text-sm">
                                <span className="text-gray-600">Categories:</span>
                                <span className="ml-2 text-gray-900">{marketplace.categories.join(', ')}</span>
                              </div>
                            </div>

                            {marketplace.status === 'Seized' && (
                              <div className="mt-3 p-2 bg-blue-100 border border-blue-300 rounded">
                                <div className="text-sm font-medium text-blue-900">🚔 Law Enforcement Action</div>
                                <div className="text-xs text-blue-700">This marketplace was shut down by law enforcement agencies</div>
                              </div>
                            )}

                            {marketplace.status === 'Exit Scam' && (
                              <div className="mt-3 p-2 bg-orange-100 border border-orange-300 rounded">
                                <div className="text-sm font-medium text-orange-900">💰 Exit Scam</div>
                                <div className="text-xs text-orange-700">Operators disappeared with user funds</div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {selectedTab === 'threats' && (
                  <div className="space-y-6">
                    {/* New Threats */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Emerging Threats</h4>
                      <div className="space-y-3">
                        {monitoring.threatIntelligence.newThreats.map((threat, index) => (
                          <div key={index} className="p-4 border border-gray-200 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-gray-900">{threat.type}</span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                threat.severity === 'CRITICAL' ? 'bg-red-100 text-red-800' :
                                threat.severity === 'HIGH' ? 'bg-orange-100 text-orange-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {threat.severity}
                              </span>
                            </div>
                            <p className="text-sm text-gray-700 mb-2">{threat.description}</p>
                            <div className="text-xs text-gray-500">
                              First seen: {threat.firstSeen} | Indicators: {threat.indicators.join(', ')}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Ransomware Groups */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Historical Ransomware Groups</h4>
                      <div className="space-y-3">
                        {monitoring.threatIntelligence.ransomwareGroups.map((group, index) => (
                          <div key={index} className="p-4 border border-gray-200 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-gray-900">{group.name}</span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                group.status.includes('Disrupted') ? 'bg-blue-100 text-blue-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {group.status}
                              </span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                              <div>
                                <span className="text-gray-600">Victims:</span>
                                <span className="ml-2 font-medium text-gray-900">{group.victims}</span>
                              </div>
                              <div>
                                <span className="text-gray-600">Last Activity:</span>
                                <span className="ml-2 font-medium text-gray-900">{group.lastActivity}</span>
                              </div>
                              <div>
                                <span className="text-gray-600">Payment Address:</span>
                                <span className="ml-2 font-mono text-xs text-gray-900">{group.paymentAddress}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Data Breaches */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Simulated Data Breach Listings</h4>
                      <div className="space-y-3">
                        {monitoring.threatIntelligence.dataBreaches.map((breach, index) => (
                          <div key={index} className="p-4 border border-red-200 rounded-lg bg-red-50">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-red-900">{breach.organization}</span>
                              <span className="text-sm text-red-700">Posted: {breach.posted}</span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-red-800">
                              <div>Records: {breach.recordCount.toLocaleString()}</div>
                              <div>Price: {breach.price}</div>
                              <div>Seller: {breach.seller}</div>
                              <div>Data Types: {breach.dataTypes.join(', ')}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {selectedTab === 'intelligence' && (
                  <div className="space-y-6">
                    {/* Cryptocurrency Activity */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Historical Cryptocurrency Activity</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                          <div className="text-sm font-medium text-orange-900 mb-2">Total Volume</div>
                          <div className="text-2xl font-bold text-orange-800">{monitoring.cryptoActivity.totalVolume.toLocaleString()}</div>
                          <div className="text-xs text-orange-700">BTC equivalent</div>
                        </div>
                        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                          <div className="text-sm font-medium text-blue-900 mb-2">Transactions</div>
                          <div className="text-2xl font-bold text-blue-800">{monitoring.cryptoActivity.transactionCount.toLocaleString()}</div>
                          <div className="text-xs text-blue-700">Historical count</div>
                        </div>
                        <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                          <div className="text-sm font-medium text-purple-900 mb-2">Mixer Usage</div>
                          <div className="text-2xl font-bold text-purple-800">{monitoring.cryptoActivity.mixerUsage}%</div>
                          <div className="text-xs text-purple-700">Of total volume</div>
                        </div>
                        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                          <div className="text-sm font-medium text-green-900 mb-2">Privacy Coins</div>
                          <div className="text-2xl font-bold text-green-800">{monitoring.cryptoActivity.privacyCoinUsage}%</div>
                          <div className="text-xs text-green-700">Monero, Zcash usage</div>
                        </div>
                      </div>
                    </div>

                    {/* Suspicious Patterns */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Suspicious Transaction Patterns</h4>
                      <div className="space-y-2">
                        {monitoring.cryptoActivity.suspiciousPatterns.map((pattern, index) => (
                          <div key={index} className="flex items-center space-x-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <Target className="w-4 h-4 text-yellow-600" />
                            <span className="text-yellow-800">{pattern}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Monitoring Statistics */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Monitoring Statistics</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-800">{monitoring.monitoring.alertsTriggered}</div>
                          <div className="text-sm text-gray-600">Alerts Triggered</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-800">{monitoring.monitoring.newListings}</div>
                          <div className="text-sm text-gray-600">New Listings</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-800">{monitoring.monitoring.priceChanges}</div>
                          <div className="text-sm text-gray-600">Price Changes</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-800">{monitoring.monitoring.vendorActivity}</div>
                          <div className="text-sm text-gray-600">Vendor Activity</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Law Enforcement Resources */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h4 className="text-md font-semibold text-blue-800 mb-3">Law Enforcement Resources</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <motion.a
                  href="https://www.ic3.gov"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 p-3 bg-white border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ExternalLink className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium">FBI IC3</span>
                </motion.a>
                <motion.a
                  href="https://www.europol.europa.eu/crime-areas-and-statistics/crime-areas/cybercrime"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 p-3 bg-white border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ExternalLink className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium">Europol EC3</span>
                </motion.a>
                <motion.a
                  href="https://www.interpol.int/Crimes/Cybercrime"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 p-3 bg-white border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ExternalLink className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium">INTERPOL</span>
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading State */}
      {isMonitoring && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 mx-auto mb-4"
          >
            <Eye className="w-12 h-12 text-gray-500" />
          </motion.div>
          <p className="text-gray-600">Analyzing historical darknet marketplace data...</p>
        </motion.div>
      )}
    </div>
  );
};

export default DarknetMonitoringPage;