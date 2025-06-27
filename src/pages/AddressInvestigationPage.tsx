import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, TrendingUp, AlertTriangle, Shield, Clock, DollarSign, Zap, ExternalLink, Copy, Eye, Server, Database, Target, Activity, Hash, Bitcoin, Users, BarChart3, PieChart, Filter, Download, RefreshCw, Settings, Info, CheckCircle, XCircle, Minus, Plus, FileText, Globe, Lock, Unlock, Key, Fingerprint, Brain, Microscope, Satellite, Radio, Webhook, Code, Cloud, HardDrive, Network, GitBranch, Layers, Workflow, Calendar, Bell, User, Mail, Phone, Home, Building, Car, Plane, Train, Bus, Bike, Wallet as Walk, Sun as Run, Heart, Star, Flag, Tag, Bookmark, Link, Share, Send, Inbox, Archive, Trash, Edit, Save, Upload, Image, Video, Music, Folder, FolderOpen, Paperclip, Scissors, Clipboard, Calculator, Timer, Watch as Stopwatch, AlarmPlus as Alarm, Sun, Moon, CloudRain, CloudSnow, Wind, Thermometer, Umbrella, Flashlight, Lightbulb, Candy as Candle, Flame, Snowflake, Droplets, Waves, Mountain, Trees as Tree, Flower, Leaf, Scaling as Seedling, Apple, Cherry, Grape, Diamond as Lemon, Tangent as Orange, Banana, Carrot, Popcorn as Corn, Pizza, Coffee, Wine, Beer, Cake, Cookie, IceCream, Candy, Gift, PartyPopper as Party, Moon as Balloon, SettingsIcon as Confetti, Crown, Diamond, Gem, BellRing as Ring, Slack as Necklace, Glasses, Cat as Hat, Shirt, Tangent as Pants, Shovel as Shoe, Lock as Sock, Clover as Glove, Scan as Scarf, Brackets as Jacket, Trees as Dress, Shirt as Skirt, View as Tie, Bell as Belt, Ban as Bag, Backpack, Briefcase, Briefcase as Suitcase, Wallet, CreditCard, Banknote, Receipt, ShoppingCart, ShoppingBag, Store, Factory, Warehouse, MicOff as Office, School, CaseSensitive as University, Library, Mouse as Museum, Theater, Wine as Cinema, Radius as Stadium, Sparkle as Park, Bean as Beach, Hand as Island, Dessert as Desert, ArchiveRestore as Forest, Cake as Lake, Clover as River, Bean as Ocean, Scan as Volcano, Save as Cave, Tent, Cable as Cabin, Castle, Church, Fuel as Mosque, BookTemplate as Temple, MoveDiagonal as Synagogue, Cross, Parentheses as Crescent, Space as Peace, Pin as Yin, Tangent as Yang, Infinity, Recycle, Earth, Compass, Map, Navigation, Anchor, Ship, Bot as Boat, Sailboat, LineChart as Submarine, Rocket, Info as Ufo, AlignCenter as Alien, Notebook as Robot, Keyboard as Cyborg, Cuboid as Android, Cross as Ios, AppWindow as Windows, Link as Linux } from 'lucide-react';

interface AddressInvestigation {
  address: string;
  basicInfo: {
    balance: number;
    totalReceived: number;
    totalSent: number;
    transactionCount: number;
    firstSeen: string;
    lastActivity: string;
  };
  labels: Array<{
    source: string;
    label: string;
    confidence: number;
    category: string;
  }>;
  riskAssessment: {
    riskScore: number;
    riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    riskFactors: string[];
    complianceFlags: string[];
    sanctionsCheck: boolean;
  };
  transactionAnalysis: {
    incomingTx: number;
    outgoingTx: number;
    averageAmount: number;
    largestTransaction: number;
    frequencyPattern: string;
    timingAnalysis: string;
  };
  connections: Array<{
    address: string;
    relationship: string;
    transactionCount: number;
    totalAmount: number;
    riskScore: number;
    labels: string[];
  }>;
  geographicAnalysis: {
    likelyRegions: string[];
    exchangeConnections: string[];
    jurisdictionalRisk: string;
  };
  investigationNotes: {
    suspiciousActivities: string[];
    investigationPriority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
    recommendedActions: string[];
  };
}

const AddressInvestigationPage: React.FC = () => {
  const [addressInput, setAddressInput] = useState('');
  const [isInvestigating, setIsInvestigating] = useState(false);
  const [investigation, setInvestigation] = useState<AddressInvestigation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'transactions' | 'connections' | 'investigation'>('overview');
  const [investigationDepth, setInvestigationDepth] = useState<'basic' | 'standard' | 'comprehensive'>('standard');

  // Sample addresses for investigation
  const sampleAddresses = useMemo(() => [
    {
      address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
      description: 'Genesis Block Address - Historical Investigation',
      type: 'Historical'
    },
    {
      address: '3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy',
      description: 'Large Exchange Address - Compliance Check',
      type: 'Exchange'
    },
    {
      address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
      description: 'Suspicious Activity - High Priority Investigation',
      type: 'Suspicious'
    },
    {
      address: '1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2',
      description: 'High-Value Address - Enhanced Due Diligence',
      type: 'High-Value'
    }
  ], []);

  // Generate comprehensive address investigation
  const generateAddressInvestigation = useCallback((address: string): AddressInvestigation => {
    const isExchange = address.includes('3J98') || Math.random() > 0.7;
    const isSuspicious = address.includes('bc1qxy2') || Math.random() > 0.8;
    const isHighValue = address.includes('1BvBM') || Math.random() > 0.6;
    const isHistorical = address.includes('1A1zP') || Math.random() > 0.9;

    const balance = isHighValue ? Math.random() * 10000 + 1000 : Math.random() * 100 + 10;
    const totalReceived = balance * (Math.random() * 5 + 2); // 2-7x balance
    const totalSent = totalReceived - balance;
    const transactionCount = Math.floor(Math.random() * 1000) + 50;

    const riskScore = isSuspicious ? Math.random() * 30 + 70 :
                     isExchange ? Math.random() * 20 + 10 :
                     Math.random() * 40 + 20;

    return {
      address,
      basicInfo: {
        balance,
        totalReceived,
        totalSent,
        transactionCount,
        firstSeen: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        lastActivity: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      },
      labels: [
        ...(isExchange ? [
          { source: 'Chainalysis', label: 'Binance Hot Wallet', confidence: 95, category: 'Exchange' },
          { source: 'Elliptic', label: 'Cryptocurrency Exchange', confidence: 92, category: 'Service' }
        ] : []),
        ...(isSuspicious ? [
          { source: 'OFAC', label: 'Sanctions List Match', confidence: 98, category: 'Sanctions' },
          { source: 'Internal', label: 'Suspicious Activity', confidence: 85, category: 'Investigation' }
        ] : []),
        ...(isHistorical ? [
          { source: 'Bitcoin Wiki', label: 'Genesis Block', confidence: 100, category: 'Historical' },
          { source: 'Research', label: 'Satoshi Nakamoto', confidence: 90, category: 'Identity' }
        ] : []),
        { source: 'WalletExplorer', label: 'Unknown', confidence: 50, category: 'General' }
      ],
      riskAssessment: {
        riskScore: Math.round(riskScore),
        riskLevel: riskScore > 80 ? 'CRITICAL' : riskScore > 60 ? 'HIGH' : riskScore > 40 ? 'MEDIUM' : 'LOW',
        riskFactors: [
          ...(isSuspicious ? ['OFAC sanctions match', 'Suspicious transaction patterns', 'High-risk jurisdiction'] : []),
          ...(isExchange ? ['Large transaction volumes', 'Multiple counterparties'] : []),
          ...(Math.random() > 0.5 ? ['Unusual timing patterns'] : [])
        ],
        complianceFlags: [
          ...(isSuspicious ? ['Enhanced Due Diligence Required', 'Sanctions Screening Alert'] : []),
          ...(riskScore > 70 ? ['High Risk Entity'] : [])
        ],
        sanctionsCheck: isSuspicious
      },
      transactionAnalysis: {
        incomingTx: Math.floor(transactionCount * (Math.random() * 0.3 + 0.4)), // 40-70%
        outgoingTx: Math.floor(transactionCount * (Math.random() * 0.3 + 0.3)), // 30-60%
        averageAmount: totalReceived / transactionCount,
        largestTransaction: Math.max(balance * 0.1, Math.random() * balance * 2),
        frequencyPattern: isExchange ? 'High frequency continuous' :
                         isSuspicious ? 'Irregular burst patterns' :
                         'Regular personal usage',
        timingAnalysis: isExchange ? '24/7 global activity' :
                       'Business hours concentration'
      },
      connections: Array.from({ length: Math.floor(Math.random() * 8) + 3 }, (_, i) => ({
        address: `${Math.random().toString(36).substring(2, 10)}...${Math.random().toString(36).substring(2, 8)}`,
        relationship: ['Direct transaction', 'Indirect (2 hops)', 'Cluster member', 'Exchange deposit'][Math.floor(Math.random() * 4)],
        transactionCount: Math.floor(Math.random() * 50) + 1,
        totalAmount: Math.random() * 1000 + 10,
        riskScore: Math.round(Math.random() * 100),
        labels: ['Exchange', 'Mixer', 'Personal', 'Business'][Math.floor(Math.random() * 4)] ? 
               [['Exchange', 'Mixer', 'Personal', 'Business'][Math.floor(Math.random() * 4)]] : []
      })),
      geographicAnalysis: {
        likelyRegions: isExchange ? ['Global', 'Malta', 'Cayman Islands'] :
                      isSuspicious ? ['North Korea', 'Iran', 'Russia'] :
                      ['United States', 'European Union', 'Canada'],
        exchangeConnections: isExchange ? ['Binance', 'Coinbase', 'Kraken'] :
                           ['Binance', 'LocalBitcoins'],
        jurisdictionalRisk: isSuspicious ? 'High - Sanctions jurisdiction' :
                           isExchange ? 'Medium - Regulatory compliance' :
                           'Low - Friendly jurisdiction'
      },
      investigationNotes: {
        suspiciousActivities: [
          ...(isSuspicious ? [
            'Large round-number transactions',
            'Rapid movement of funds',
            'Connection to known criminal entities',
            'Use of privacy-enhancing techniques'
          ] : []),
          ...(isExchange ? [
            'High-volume institutional activity',
            'Customer fund management'
          ] : [])
        ],
        investigationPriority: isSuspicious ? 'URGENT' :
                              isHighValue ? 'HIGH' :
                              isExchange ? 'MEDIUM' : 'LOW',
        recommendedActions: [
          ...(isSuspicious ? [
            'Immediate sanctions screening',
            'Enhanced due diligence',
            'Law enforcement notification',
            'Transaction monitoring'
          ] : []),
          ...(isExchange ? [
            'Verify exchange compliance',
            'Check licensing status'
          ] : []),
          'Continue monitoring',
          'Update risk assessment'
        ]
      }
    };
  }, []);

  const investigateAddress = useCallback(async (address: string) => {
    if (!address.trim()) {
      setError('Please enter a Bitcoin address');
      return;
    }

    // Basic Bitcoin address validation
    if (!/^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$|^bc1[a-z0-9]{39,59}$/.test(address.trim())) {
      setError('Invalid Bitcoin address format');
      return;
    }

    setIsInvestigating(true);
    setError(null);
    setInvestigation(null);

    try {
      // Simulate investigation delay based on depth
      const delay = investigationDepth === 'comprehensive' ? 4000 : 
                   investigationDepth === 'standard' ? 2500 : 1500;
      await new Promise(resolve => setTimeout(resolve, delay));

      // Generate comprehensive investigation
      const investigationResult = generateAddressInvestigation(address);
      setInvestigation(investigationResult);

    } catch (err) {
      setError('Failed to investigate address. Please try again.');
    } finally {
      setIsInvestigating(false);
    }
  }, [generateAddressInvestigation, investigationDepth]);

  const copyToClipboard = useCallback((text: string) => {
    navigator.clipboard.writeText(text);
  }, []);

  const getRiskColor = useCallback((level: string) => {
    switch (level) {
      case 'CRITICAL': return 'text-red-800 bg-red-100 border-red-400';
      case 'HIGH': return 'text-red-700 bg-red-50 border-red-300';
      case 'MEDIUM': return 'text-yellow-700 bg-yellow-50 border-yellow-300';
      default: return 'text-green-700 bg-green-50 border-green-300';
    }
  }, []);

  const getPriorityColor = useCallback((priority: string) => {
    switch (priority) {
      case 'URGENT': return 'text-red-800 bg-red-100 border-red-400';
      case 'HIGH': return 'text-orange-700 bg-orange-100 border-orange-300';
      case 'MEDIUM': return 'text-yellow-700 bg-yellow-100 border-yellow-300';
      default: return 'text-green-700 bg-green-100 border-green-300';
    }
  }, []);

  const getLabelCategoryColor = useCallback((category: string) => {
    const colors = {
      'Exchange': 'text-blue-700 bg-blue-100 border-blue-300',
      'Sanctions': 'text-red-800 bg-red-100 border-red-400',
      'Historical': 'text-purple-700 bg-purple-100 border-purple-300',
      'Service': 'text-green-700 bg-green-100 border-green-300',
      'Investigation': 'text-orange-700 bg-orange-100 border-orange-300',
      'Identity': 'text-indigo-700 bg-indigo-100 border-indigo-300',
      'General': 'text-gray-700 bg-gray-100 border-gray-300'
    };
    return colors[category as keyof typeof colors] || 'text-gray-700 bg-gray-100 border-gray-300';
  }, []);

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
          Address Investigation
        </h1>
        <p className="text-blue-100 text-base sm:text-lg mb-4 lg:mb-6">
          Comprehensive blockchain address investigation with risk assessment, compliance screening, and forensic analysis.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          <div className="bg-white/10 rounded-lg p-3 lg:p-4">
            <h3 className="font-semibold mb-2 text-sm sm:text-base">Risk Assessment</h3>
            <p className="text-xs sm:text-sm text-blue-100">Comprehensive risk scoring and analysis</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3 lg:p-4">
            <h3 className="font-semibold mb-2 text-sm sm:text-base">Compliance Screening</h3>
            <p className="text-xs sm:text-sm text-blue-100">OFAC, sanctions, and regulatory checks</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3 lg:p-4">
            <h3 className="font-semibold mb-2 text-sm sm:text-base">Connection Analysis</h3>
            <p className="text-xs sm:text-sm text-blue-100">Network mapping and relationship tracking</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3 lg:p-4">
            <h3 className="font-semibold mb-2 text-sm sm:text-base">Investigation Notes</h3>
            <p className="text-xs sm:text-sm text-blue-100">Professional case documentation</p>
          </div>
        </div>
      </motion.div>

      {/* Search and Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                value={addressInput}
                onChange={(e) => setAddressInput(e.target.value)}
                placeholder="Enter Bitcoin address for investigation..."
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                onKeyPress={(e) => e.key === 'Enter' && investigateAddress(addressInput)}
              />
              <motion.button
                onClick={() => investigateAddress(addressInput)}
                disabled={isInvestigating}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isInvestigating ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Search className="w-4 h-4" />
                  </motion.div>
                ) : (
                  <Search className="w-4 h-4" />
                )}
              </motion.button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
            <select
              value={investigationDepth}
              onChange={(e) => setInvestigationDepth(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="basic">Basic Investigation</option>
              <option value="standard">Standard Investigation</option>
              <option value="comprehensive">Comprehensive Investigation</option>
            </select>
          </div>
        </div>

        {/* Sample Addresses */}
        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-2">Try these investigation cases:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {sampleAddresses.map((sample, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setAddressInput(sample.address);
                  investigateAddress(sample.address);
                }}
                className="text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="font-mono text-xs text-gray-700 truncate">{sample.address}</div>
                <div className="text-xs text-gray-500 mt-1">{sample.description}</div>
                <div className="text-xs text-blue-600 font-medium mt-1">{sample.type}</div>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Error Display */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 rounded-lg p-4"
        >
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <span className="text-red-700 font-medium">{error}</span>
          </div>
        </motion.div>
      )}

      {/* Investigation Results */}
      <AnimatePresence>
        {investigation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Investigation Overview */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-8 h-8" />
                  <h3 className="text-xl font-bold">Investigation Results</h3>
                </div>
                <div className={`px-4 py-2 rounded-full border-2 ${getPriorityColor(investigation.investigationNotes.investigationPriority)} bg-white`}>
                  <span className="font-bold">{investigation.investigationNotes.investigationPriority} PRIORITY</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-blue-100 text-sm mb-1">Current Balance</div>
                  <div className="text-2xl font-bold">{investigation.basicInfo.balance.toFixed(8)} BTC</div>
                  <div className="text-xs text-blue-200">${(investigation.basicInfo.balance * 43250).toLocaleString()}</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-blue-100 text-sm mb-1">Total Received</div>
                  <div className="text-2xl font-bold">{investigation.basicInfo.totalReceived.toFixed(2)} BTC</div>
                  <div className="text-xs text-blue-200">Lifetime incoming</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-blue-100 text-sm mb-1">Transactions</div>
                  <div className="text-2xl font-bold">{investigation.basicInfo.transactionCount}</div>
                  <div className="text-xs text-blue-200">Total activity</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-blue-100 text-sm mb-1">Risk Score</div>
                  <div className="text-2xl font-bold">{investigation.riskAssessment.riskScore}%</div>
                  <div className="text-xs text-blue-200">{investigation.riskAssessment.riskLevel} RISK</div>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="bg-white rounded-lg shadow-lg border border-gray-200">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {[
                    { id: 'overview', label: 'Overview', icon: BarChart3 },
                    { id: 'transactions', label: 'Transaction Analysis', icon: Activity },
                    { id: 'connections', label: 'Connections', icon: Network },
                    { id: 'investigation', label: 'Investigation Notes', icon: FileText }
                  ].map((tab) => (
                    <motion.button
                      key={tab.id}
                      onClick={() => setSelectedTab(tab.id as any)}
                      className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm ${
                        selectedTab === tab.id
                          ? 'border-blue-500 text-blue-600'
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
                    {/* Basic Information */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <span className="text-sm text-gray-600">First Seen:</span>
                            <span className="font-semibold text-gray-900">{investigation.basicInfo.firstSeen}</span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <span className="text-sm text-gray-600">Last Activity:</span>
                            <span className="font-semibold text-gray-900">{investigation.basicInfo.lastActivity}</span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <span className="text-sm text-gray-600">Total Sent:</span>
                            <span className="font-semibold text-gray-900">{investigation.basicInfo.totalSent.toFixed(8)} BTC</span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <span className="text-sm text-gray-600">Average Transaction:</span>
                            <span className="font-semibold text-gray-900">{investigation.transactionAnalysis.averageAmount.toFixed(8)} BTC</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Address Labels</h4>
                        <div className="space-y-2 max-h-64 overflow-y-auto">
                          {investigation.labels.map((label, index) => (
                            <div key={index} className={`p-3 border rounded-lg ${getLabelCategoryColor(label.category)}`}>
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-medium">{label.label}</span>
                                <span className="text-xs">{label.confidence}% confidence</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-xs opacity-80">{label.source}</span>
                                <span className="text-xs font-medium">{label.category}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Risk Assessment */}
                    <div className={`p-6 rounded-lg border ${getRiskColor(investigation.riskAssessment.riskLevel)}`}>
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-semibold">Risk Assessment</h4>
                        <span className="text-3xl font-bold">{investigation.riskAssessment.riskScore}%</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          {investigation.riskAssessment.riskFactors.length > 0 && (
                            <div>
                              <div className="text-sm font-medium mb-2">Risk Factors:</div>
                              <div className="space-y-1">
                                {investigation.riskAssessment.riskFactors.map((factor, index) => (
                                  <div key={index} className="flex items-center space-x-2 text-sm">
                                    <AlertTriangle className="w-3 h-3" />
                                    <span>{factor}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                        <div>
                          {investigation.riskAssessment.complianceFlags.length > 0 && (
                            <div>
                              <div className="text-sm font-medium mb-2">Compliance Flags:</div>
                              <div className="space-y-1">
                                {investigation.riskAssessment.complianceFlags.map((flag, index) => (
                                  <div key={index} className="flex items-center space-x-2 text-sm">
                                    <Shield className="w-3 h-3" />
                                    <span className="font-medium">{flag}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          {investigation.riskAssessment.sanctionsCheck && (
                            <div className="mt-3 p-2 bg-red-100 border border-red-300 rounded">
                              <div className="text-sm font-medium text-red-900">⚠️ SANCTIONS ALERT</div>
                              <div className="text-xs text-red-700">Address matches sanctions screening criteria</div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Geographic Analysis */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="text-lg font-semibold text-blue-900 mb-4">Geographic Analysis</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <div className="text-sm font-medium text-blue-900 mb-2">Likely Regions:</div>
                          <div className="text-sm text-blue-800">
                            {investigation.geographicAnalysis.likelyRegions.join(', ')}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-blue-900 mb-2">Exchange Connections:</div>
                          <div className="text-sm text-blue-800">
                            {investigation.geographicAnalysis.exchangeConnections.join(', ')}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-blue-900 mb-2">Jurisdictional Risk:</div>
                          <div className="text-sm text-blue-800">{investigation.geographicAnalysis.jurisdictionalRisk}</div>
                        </div>
                      </div>
                    </div>

                    {/* Address Details */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="text-md font-semibold text-gray-800 mb-3">Address Information</h4>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-sm text-gray-600">Bitcoin Address:</span>
                          <div className="font-mono text-sm text-gray-900 break-all">{investigation.address}</div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <motion.button
                            onClick={() => copyToClipboard(investigation.address)}
                            className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            title="Copy address"
                          >
                            <Copy className="w-4 h-4" />
                          </motion.button>
                          <motion.a
                            href={`https://blockchair.com/bitcoin/address/${investigation.address}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            title="View on explorer"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </motion.a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedTab === 'transactions' && (
                  <div className="space-y-6">
                    {/* Transaction Statistics */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="text-sm font-medium text-green-900 mb-2">Incoming Transactions</div>
                        <div className="text-2xl font-bold text-green-800">{investigation.transactionAnalysis.incomingTx}</div>
                      </div>
                      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                        <div className="text-sm font-medium text-red-900 mb-2">Outgoing Transactions</div>
                        <div className="text-2xl font-bold text-red-800">{investigation.transactionAnalysis.outgoingTx}</div>
                      </div>
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="text-sm font-medium text-blue-900 mb-2">Average Amount</div>
                        <div className="text-lg font-bold text-blue-800">{investigation.transactionAnalysis.averageAmount.toFixed(8)} BTC</div>
                      </div>
                      <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                        <div className="text-sm font-medium text-purple-900 mb-2">Largest Transaction</div>
                        <div className="text-lg font-bold text-purple-800">{investigation.transactionAnalysis.largestTransaction.toFixed(8)} BTC</div>
                      </div>
                    </div>

                    {/* Pattern Analysis */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">Frequency Pattern</h4>
                        <p className="text-gray-700">{investigation.transactionAnalysis.frequencyPattern}</p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">Timing Analysis</h4>
                        <p className="text-gray-700">{investigation.transactionAnalysis.timingAnalysis}</p>
                      </div>
                    </div>
                  </div>
                )}

                {selectedTab === 'connections' && (
                  <div className="space-y-6">
                    {/* Connected Addresses */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Connected Addresses</h4>
                      <div className="space-y-3 max-h-96 overflow-y-auto">
                        {investigation.connections.map((connection, index) => (
                          <div key={index} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-mono text-sm text-gray-900">{connection.address}</span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                connection.riskScore > 70 ? 'bg-red-100 text-red-800' :
                                connection.riskScore > 40 ? 'bg-yellow-100 text-yellow-800' :
                                'bg-green-100 text-green-800'
                              }`}>
                                {connection.riskScore}% risk
                              </span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                              <div>
                                <span className="text-gray-600">Relationship:</span>
                                <span className="ml-2 font-medium text-gray-900">{connection.relationship}</span>
                              </div>
                              <div>
                                <span className="text-gray-600">Transactions:</span>
                                <span className="ml-2 font-medium text-gray-900">{connection.transactionCount}</span>
                              </div>
                              <div>
                                <span className="text-gray-600">Total Amount:</span>
                                <span className="ml-2 font-medium text-gray-900">{connection.totalAmount.toFixed(4)} BTC</span>
                              </div>
                            </div>
                            {connection.labels.length > 0 && (
                              <div className="mt-2">
                                <div className="flex flex-wrap gap-1">
                                  {connection.labels.map((label, labelIndex) => (
                                    <span
                                      key={labelIndex}
                                      className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium"
                                    >
                                      {label}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {selectedTab === 'investigation' && (
                  <div className="space-y-6">
                    {/* Investigation Priority */}
                    <div className={`p-6 rounded-lg border ${getPriorityColor(investigation.investigationNotes.investigationPriority)}`}>
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-semibold">Investigation Priority</h4>
                        <span className="text-2xl font-bold">{investigation.investigationNotes.investigationPriority}</span>
                      </div>
                      <div className="text-sm opacity-80">
                        {investigation.investigationNotes.investigationPriority === 'URGENT' ? 'Immediate action required - potential sanctions or criminal activity' :
                         investigation.investigationNotes.investigationPriority === 'HIGH' ? 'Enhanced monitoring and due diligence recommended' :
                         investigation.investigationNotes.investigationPriority === 'MEDIUM' ? 'Standard monitoring procedures apply' :
                         'Low priority - routine monitoring sufficient'}
                      </div>
                    </div>

                    {/* Suspicious Activities */}
                    {investigation.investigationNotes.suspiciousActivities.length > 0 && (
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Suspicious Activities</h4>
                        <div className="space-y-2">
                          {investigation.investigationNotes.suspiciousActivities.map((activity, index) => (
                            <div key={index} className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                              <AlertTriangle className="w-4 h-4 text-red-600" />
                              <span className="text-red-800">{activity}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Recommended Actions */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Recommended Actions</h4>
                      <div className="space-y-2">
                        {investigation.investigationNotes.recommendedActions.map((action, index) => (
                          <div key={index} className="flex items-center space-x-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                            <CheckCircle className="w-4 h-4 text-blue-600" />
                            <span className="text-blue-800">{action}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Investigation Depth */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Investigation Details</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-indigo-600">{investigationDepth}</div>
                          <div className="text-sm text-gray-600">Investigation Depth</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">{investigation.labels.length}</div>
                          <div className="text-sm text-gray-600">Data Sources</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-600">{investigation.connections.length}</div>
                          <div className="text-sm text-gray-600">Connections Found</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* External Tools */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <h4 className="text-md font-semibold text-gray-800 mb-3">External Investigation Tools</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <motion.a
                  href={`https://oxt.me/address/${investigation.address}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ExternalLink className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium">OXT Investigation</span>
                </motion.a>
                <motion.a
                  href={`https://www.walletexplorer.com/address/${investigation.address}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ExternalLink className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium">WalletExplorer</span>
                </motion.a>
                <motion.a
                  href={`https://blockchair.com/bitcoin/address/${investigation.address}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ExternalLink className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium">Blockchair</span>
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AddressInvestigationPage;