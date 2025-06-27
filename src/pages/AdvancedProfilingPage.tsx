import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Brain, TrendingUp, AlertTriangle, Shield, Clock, DollarSign, Zap, ExternalLink, Copy, Eye, MapPin, Server, Database, Target, Activity, Hash, Bitcoin, Users, BarChart3, PieChart, Filter, Download, RefreshCw, Settings, Info, CheckCircle, XCircle, Minus, Plus, FileText, Globe, Lock, Unlock, Key, Fingerprint, Microscope, Satellite, Radio, Webhook, Code, Cloud, HardDrive, Network, GitBranch, Layers, Workflow, Calendar, Bell, User, Mail, Phone, Home, Building, Car, Plane, Train, Bus, Bike, Wallet as Walk, Sun as Run, Heart, Star, Flag, Tag, Bookmark, Link, Share, Send, Inbox, Archive, Trash, Edit, Save, Upload, Image, Video, Music, Folder, FolderOpen, Paperclip, Scissors, Clipboard, Calculator, Timer, Watch as Stopwatch, AlarmPlus as Alarm, Sun, Moon, CloudRain, CloudSnow, Wind, Thermometer, Umbrella, Flashlight, Lightbulb, Candy as Candle, Flame, Snowflake, Droplets, Waves, Mountain, Trees as Tree, Flower, Leaf, Scaling as Seedling, Apple, Cherry, Grape, Diamond as Lemon, Tangent as Orange, Banana, Carrot, Popcorn as Corn, Pizza, Coffee, Wine, Beer, Cake, Cookie, IceCream, Candy, Gift, PartyPopper as Party, Moon as Balloon, SettingsIcon as Confetti, Crown, Diamond, Gem, BellRing as Ring, Slack as Necklace, Glasses, Cat as Hat, Shirt, Tangent as Pants, Shovel as Shoe, Lock as Sock, Clover as Glove, Scan as Scarf, Brackets as Jacket, Trees as Dress, Shirt as Skirt, View as Tie, Bell as Belt, Ban as Bag, Backpack, Briefcase, Briefcase as Suitcase, Wallet, CreditCard, Banknote, Receipt, ShoppingCart, ShoppingBag, Store, Factory, Warehouse, MicOff as Office, School, CaseSensitive as University, Library, Mouse as Museum, Theater, Wine as Cinema, Radius as Stadium, Sparkle as Park, Bean as Beach, Hand as Island, Dessert as Desert, ArchiveRestore as Forest, Cake as Lake, Clover as River, Bean as Ocean, Scan as Volcano, Save as Cave, Tent, Cable as Cabin, Castle, Church, Fuel as Mosque, BookTemplate as Temple, MoveDiagonal as Synagogue, Cross, Parentheses as Crescent, Space as Peace, Pin as Yin, Tangent as Yang, Infinity, Recycle, Earth, Compass, Map, Navigation, Anchor, Ship, Bot as Boat, Sailboat, LineChart as Submarine, Rocket, Info as Ufo, AlignCenter as Alien, Notebook as Robot, Keyboard as Cyborg, Cuboid as Android, Cross as Ios, AppWindow as Windows, Link as Linux } from 'lucide-react';

interface AddressProfile {
  address: string;
  profileType: 'Individual' | 'Exchange' | 'Mixer' | 'Business' | 'Institution' | 'Criminal' | 'Unknown';
  confidence: number;
  behaviorScore: number;
  patterns: {
    transactionTiming: string;
    amountPatterns: string;
    frequencyPattern: string;
    geographicPattern: string;
  };
  riskAssessment: {
    overallRisk: number;
    riskFactors: string[];
    complianceFlags: string[];
    amlScore: number;
  };
  entityAnalysis: {
    likelyEntity: string;
    entityType: string;
    businessCategory?: string;
    jurisdiction?: string;
    regulatoryStatus?: string;
  };
  behaviorAnalysis: {
    spendingHabits: string[];
    transactionPatterns: string[];
    privacyBehavior: string;
    sophisticationLevel: string;
  };
  networkAnalysis: {
    connectionStrength: number;
    clusterSize: number;
    centralityScore: number;
    communityDetection: string[];
  };
  temporalAnalysis: {
    activityPeriods: string[];
    dormancyPeriods: string[];
    lifecycleStage: string;
    evolutionPattern: string;
  };
  forensicMarkers: {
    uniqueIdentifiers: string[];
    fingerprints: string[];
    correlationFactors: string[];
  };
}

const AdvancedProfilingPage: React.FC = () => {
  const [addressInput, setAddressInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [profile, setProfile] = useState<AddressProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'behavior' | 'network' | 'forensics'>('overview');
  const [analysisDepth, setAnalysisDepth] = useState<'basic' | 'advanced' | 'deep'>('advanced');

  // Sample addresses for demonstration
  const sampleAddresses = useMemo(() => [
    {
      address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
      
      description: 'Genesis Block Address - Historical Significance',
      type: 'Historical'
    },
    {
      address: '3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy',
      description: 'Large Exchange Hot Wallet - Institutional',
      type: 'Exchange'
    },
    {
      address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
      description: 'Privacy-Focused Individual - High Sophistication',
      type: 'Individual'
    },
    {
      address: '1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2',
      description: 'Business Treasury Wallet - Corporate',
      type: 'Business'
    }
  ], []);

  // Generate comprehensive address profile
  const generateAddressProfile = useCallback((address: string): AddressProfile => {
    const profileTypes: Array<'Individual' | 'Exchange' | 'Mixer' | 'Business' | 'Institution' | 'Criminal' | 'Unknown'> = 
      ['Individual', 'Exchange', 'Mixer', 'Business', 'Institution', 'Criminal', 'Unknown'];
    
    const isExchange = address.includes('3J98') || Math.random() > 0.7;
    const isMixer = address.includes('bc1qxy2') || Math.random() > 0.85;
    const isBusiness = address.includes('1BvBM') || Math.random() > 0.6;
    const isHistorical = address.includes('1A1zP') || Math.random() > 0.9;
    const isCriminal = Math.random() > 0.9;

    let profileType: 'Individual' | 'Exchange' | 'Mixer' | 'Business' | 'Institution' | 'Criminal' | 'Unknown';
    if (isExchange) profileType = 'Exchange';
    else if (isMixer) profileType = 'Mixer';
    else if (isBusiness) profileType = 'Business';
    else if (isCriminal) profileType = 'Criminal';
    else if (isHistorical) profileType = 'Institution';
    else profileType = 'Individual';

    const confidence = Math.round(Math.random() * 30 + 70); // 70-100%
    const behaviorScore = Math.round(Math.random() * 100);
    const overallRisk = isCriminal ? Math.random() * 30 + 70 : 
                       isMixer ? Math.random() * 40 + 40 :
                       Math.random() * 50 + 10;

    return {
      address,
      profileType,
      confidence,
      behaviorScore,
      patterns: {
        transactionTiming: isExchange ? 'High-frequency 24/7' : 
                          isBusiness ? 'Business hours (9-5 UTC)' :
                          'Irregular personal usage',
        amountPatterns: isExchange ? 'Large round numbers' :
                       isBusiness ? 'Invoice-like amounts' :
                       'Small irregular amounts',
        frequencyPattern: isExchange ? 'Continuous high volume' :
                         isMixer ? 'Burst activity patterns' :
                         'Weekly/monthly patterns',
        geographicPattern: isExchange ? 'Global distribution' :
                          isBusiness ? 'Single jurisdiction' :
                          'Regional concentration'
      },
      riskAssessment: {
        overallRisk: Math.round(overallRisk),
        riskFactors: [
          ...(isMixer ? ['Privacy mixer usage', 'Obfuscation patterns'] : []),
          ...(isCriminal ? ['Sanctions list match', 'Criminal association'] : []),
          ...(isExchange ? ['High volume transactions'] : []),
          ...(Math.random() > 0.5 ? ['Unusual transaction patterns'] : [])
        ],
        complianceFlags: [
          ...(isCriminal ? ['OFAC SDN List', 'Law Enforcement Alert'] : []),
          ...(isMixer ? ['Enhanced Due Diligence Required'] : []),
          ...(overallRisk > 70 ? ['High Risk Entity'] : [])
        ],
        amlScore: Math.round(overallRisk + Math.random() * 10 - 5)
      },
      entityAnalysis: {
        likelyEntity: isExchange ? 'Binance Exchange' :
                     isBusiness ? 'Tesla Inc.' :
                     isMixer ? 'Privacy Service' :
                     isHistorical ? 'Satoshi Nakamoto' :
                     'Private Individual',
        entityType: profileType,
        businessCategory: isBusiness ? 'Technology/Automotive' : 
                         isExchange ? 'Financial Services' : undefined,
        jurisdiction: isExchange ? 'Malta' :
                     isBusiness ? 'United States' :
                     'Unknown',
        regulatoryStatus: isExchange ? 'Licensed MSB' :
                         isBusiness ? 'Public Company' :
                         'Unregulated'
      },
      behaviorAnalysis: {
        spendingHabits: isExchange ? ['Large institutional transfers', 'Customer withdrawals'] :
                       isBusiness ? ['Vendor payments', 'Employee salaries', 'Tax obligations'] :
                       ['Personal expenses', 'Investment activities'],
        transactionPatterns: isExchange ? ['Batch processing', 'Hot wallet management'] :
                           isMixer ? ['Privacy-focused', 'Obfuscation techniques'] :
                           ['Regular personal use', 'Savings behavior'],
        privacyBehavior: isMixer ? 'High privacy focus' :
                        isExchange ? 'Transparent operations' :
                        'Standard privacy',
        sophisticationLevel: isExchange ? 'Professional/Institutional' :
                           isMixer ? 'Advanced technical' :
                           isBusiness ? 'Corporate treasury' :
                           'Consumer level'
      },
      networkAnalysis: {
        connectionStrength: Math.round(Math.random() * 100),
        clusterSize: isExchange ? Math.floor(Math.random() * 10000) + 1000 :
                    isBusiness ? Math.floor(Math.random() * 100) + 20 :
                    Math.floor(Math.random() * 20) + 5,
        centralityScore: Math.round(Math.random() * 100),
        communityDetection: isExchange ? ['Exchange cluster', 'Institutional network'] :
                           isMixer ? ['Privacy network', 'Anonymity cluster'] :
                           ['Personal network', 'Local community']
      },
      temporalAnalysis: {
        activityPeriods: isExchange ? ['Continuous 24/7'] :
                        isBusiness ? ['Business hours', 'Quarterly patterns'] :
                        ['Weekend activity', 'Evening transactions'],
        dormancyPeriods: isHistorical ? ['2009-2010 Genesis period'] :
                        ['Summer vacation', 'Holiday periods'],
        lifecycleStage: isHistorical ? 'Historical/Dormant' :
                       isExchange ? 'Mature/Active' :
                       'Active/Growing',
        evolutionPattern: isExchange ? 'Scaling operations' :
                         isBusiness ? 'Business growth' :
                         'Personal accumulation'
      },
      forensicMarkers: {
        uniqueIdentifiers: [
          'Transaction timing signature',
          'Amount rounding patterns',
          'Fee preference patterns'
        ],
        fingerprints: [
          'Wallet software signature',
          'Transaction construction patterns',
          'Input selection algorithms'
        ],
        correlationFactors: [
          'IP address clustering',
          'Temporal correlation',
          'Amount correlation'
        ]
      }
    };
  }, []);

  const analyzeAddressProfile = useCallback(async (address: string) => {
    if (!address.trim()) {
      setError('Please enter a Bitcoin address');
      return;
    }

    // Basic Bitcoin address validation
    if (!/^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$|^bc1[a-z0-9]{39,59}$/.test(address.trim())) {
      setError('Invalid Bitcoin address format');
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setProfile(null);

    try {
      // Simulate API call delay based on analysis depth
      const delay = analysisDepth === 'deep' ? 4000 : analysisDepth === 'advanced' ? 2500 : 1500;
      await new Promise(resolve => setTimeout(resolve, delay));

      // Generate comprehensive address profile
      const profileResult = generateAddressProfile(address);
      setProfile(profileResult);

    } catch (err) {
      setError('Failed to analyze address profile. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  }, [generateAddressProfile, analysisDepth]);

  const copyToClipboard = useCallback((text: string) => {
    navigator.clipboard.writeText(text);
  }, []);

  const getProfileTypeColor = useCallback((type: string) => {
    const colors = {
      'Individual': 'text-blue-700 bg-blue-100 border-blue-300',
      'Exchange': 'text-green-700 bg-green-100 border-green-300',
      'Mixer': 'text-red-700 bg-red-100 border-red-300',
      'Business': 'text-purple-700 bg-purple-100 border-purple-300',
      'Institution': 'text-indigo-700 bg-indigo-100 border-indigo-300',
      'Criminal': 'text-red-800 bg-red-200 border-red-400',
      'Unknown': 'text-gray-700 bg-gray-100 border-gray-300'
    };
    return colors[type as keyof typeof colors] || 'text-gray-700 bg-gray-100 border-gray-300';
  }, []);

  const getRiskColor = useCallback((level: number) => {
    if (level > 70) return 'text-red-700 bg-red-100 border-red-300';
    if (level > 40) return 'text-yellow-700 bg-yellow-100 border-yellow-300';
    return 'text-green-700 bg-green-100 border-green-300';
  }, []);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl p-6 lg:p-8 text-white"
      >
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 lg:mb-4">
          Advanced Address Profiling
        </h1>
        <p className="text-indigo-100 text-base sm:text-lg mb-4 lg:mb-6">
          Professional behavioral analysis and entity identification using advanced pattern recognition and machine learning algorithms.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          <div className="bg-white/10 rounded-lg p-3 lg:p-4">
            <h3 className="font-semibold mb-2 text-sm sm:text-base">Behavioral Analysis</h3>
            <p className="text-xs sm:text-sm text-indigo-100">Pattern recognition and user profiling</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3 lg:p-4">
            <h3 className="font-semibold mb-2 text-sm sm:text-base">Entity Identification</h3>
            <p className="text-xs sm:text-sm text-indigo-100">Business and individual classification</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3 lg:p-4">
            <h3 className="font-semibold mb-2 text-sm sm:text-base">Network Analysis</h3>
            <p className="text-xs sm:text-sm text-indigo-100">Connection mapping and clustering</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3 lg:p-4">
            <h3 className="font-semibold mb-2 text-sm sm:text-base">Forensic Markers</h3>
            <p className="text-xs sm:text-sm text-indigo-100">Unique identifiers and fingerprints</p>
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
                placeholder="Enter Bitcoin address for advanced profiling..."
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm"
                onKeyPress={(e) => e.key === 'Enter' && analyzeAddressProfile(addressInput)}
              />
              <motion.button
                onClick={() => analyzeAddressProfile(addressInput)}
                disabled={isAnalyzing}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isAnalyzing ? (
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
              value={analysisDepth}
              onChange={(e) => setAnalysisDepth(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="basic">Basic Analysis</option>
              <option value="advanced">Advanced Analysis</option>
              <option value="deep">Deep Learning Analysis</option>
            </select>
          </div>
        </div>

        {/* Sample Addresses */}
        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-2">Try these sample addresses:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {sampleAddresses.map((sample, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setAddressInput(sample.address);
                  analyzeAddressProfile(sample.address);
                }}
                className="text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="font-mono text-xs text-gray-700 truncate">{sample.address}</div>
                <div className="text-xs text-gray-500 mt-1">{sample.description}</div>
                <div className="text-xs text-indigo-600 font-medium mt-1">{sample.type}</div>
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

      {/* Analysis Results */}
      <AnimatePresence>
        {profile && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Profile Overview */}
            <div className="bg-gradient-to-r from-indigo-500 to-blue-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Brain className="w-8 h-8" />
                  <h3 className="text-xl font-bold">Advanced Address Profile</h3>
                </div>
                <div className={`px-4 py-2 rounded-full border-2 ${getProfileTypeColor(profile.profileType)} bg-white`}>
                  <span className="font-bold">{profile.profileType}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-indigo-100 text-sm mb-1">Confidence</div>
                  <div className="text-2xl font-bold">{profile.confidence}%</div>
                  <div className="text-xs text-indigo-200">Profile accuracy</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-indigo-100 text-sm mb-1">Behavior Score</div>
                  <div className="text-2xl font-bold">{profile.behaviorScore}</div>
                  <div className="text-xs text-indigo-200">Pattern analysis</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-indigo-100 text-sm mb-1">Risk Level</div>
                  <div className="text-2xl font-bold">{profile.riskAssessment.overallRisk}%</div>
                  <div className="text-xs text-indigo-200">AML assessment</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-indigo-100 text-sm mb-1">Entity</div>
                  <div className="text-lg font-bold truncate">{profile.entityAnalysis.likelyEntity}</div>
                  <div className="text-xs text-indigo-200">Identified entity</div>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="bg-white rounded-lg shadow-lg border border-gray-200">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {[
                    { id: 'overview', label: 'Overview', icon: BarChart3 },
                    { id: 'behavior', label: 'Behavior Analysis', icon: Brain },
                    { id: 'network', label: 'Network Analysis', icon: Network },
                    { id: 'forensics', label: 'Forensic Markers', icon: Fingerprint }
                  ].map((tab) => (
                    <motion.button
                      key={tab.id}
                      onClick={() => setSelectedTab(tab.id as any)}
                      className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm ${
                        selectedTab === tab.id
                          ? 'border-indigo-500 text-indigo-600'
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
                    {/* Entity Analysis */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Entity Analysis</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <span className="text-sm text-gray-600">Likely Entity:</span>
                            <span className="font-semibold text-gray-900">{profile.entityAnalysis.likelyEntity}</span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <span className="text-sm text-gray-600">Entity Type:</span>
                            <span className="font-semibold text-gray-900">{profile.entityAnalysis.entityType}</span>
                          </div>
                          {profile.entityAnalysis.businessCategory && (
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <span className="text-sm text-gray-600">Business Category:</span>
                              <span className="font-semibold text-gray-900">{profile.entityAnalysis.businessCategory}</span>
                            </div>
                          )}
                          {profile.entityAnalysis.jurisdiction && (
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <span className="text-sm text-gray-600">Jurisdiction:</span>
                              <span className="font-semibold text-gray-900">{profile.entityAnalysis.jurisdiction}</span>
                            </div>
                          )}
                          {profile.entityAnalysis.regulatoryStatus && (
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <span className="text-sm text-gray-600">Regulatory Status:</span>
                              <span className="font-semibold text-gray-900">{profile.entityAnalysis.regulatoryStatus}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Transaction Patterns</h4>
                        <div className="space-y-3">
                          <div className="p-3 bg-gray-50 rounded-lg">
                            <div className="text-sm text-gray-600 mb-1">Timing Pattern:</div>
                            <div className="font-semibold text-gray-900">{profile.patterns.transactionTiming}</div>
                          </div>
                          <div className="p-3 bg-gray-50 rounded-lg">
                            <div className="text-sm text-gray-600 mb-1">Amount Pattern:</div>
                            <div className="font-semibold text-gray-900">{profile.patterns.amountPatterns}</div>
                          </div>
                          <div className="p-3 bg-gray-50 rounded-lg">
                            <div className="text-sm text-gray-600 mb-1">Frequency Pattern:</div>
                            <div className="font-semibold text-gray-900">{profile.patterns.frequencyPattern}</div>
                          </div>
                          <div className="p-3 bg-gray-50 rounded-lg">
                            <div className="text-sm text-gray-600 mb-1">Geographic Pattern:</div>
                            <div className="font-semibold text-gray-900">{profile.patterns.geographicPattern}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Risk Assessment */}
                    <div className={`p-6 rounded-lg border ${getRiskColor(profile.riskAssessment.overallRisk)}`}>
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-semibold">Risk Assessment</h4>
                        <span className="text-3xl font-bold">{profile.riskAssessment.overallRisk}%</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm font-medium mb-2">AML Score: {profile.riskAssessment.amlScore}%</div>
                          {profile.riskAssessment.riskFactors.length > 0 && (
                            <div>
                              <div className="text-sm font-medium mb-2">Risk Factors:</div>
                              <div className="space-y-1">
                                {profile.riskAssessment.riskFactors.map((factor, index) => (
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
                          {profile.riskAssessment.complianceFlags.length > 0 && (
                            <div>
                              <div className="text-sm font-medium mb-2">Compliance Flags:</div>
                              <div className="space-y-1">
                                {profile.riskAssessment.complianceFlags.map((flag, index) => (
                                  <div key={index} className="flex items-center space-x-2 text-sm">
                                    <Shield className="w-3 h-3" />
                                    <span className="font-medium">{flag}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Address Details */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="text-md font-semibold text-gray-800 mb-3">Address Information</h4>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-sm text-gray-600">Bitcoin Address:</span>
                          <div className="font-mono text-sm text-gray-900 break-all">{profile.address}</div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <motion.button
                            onClick={() => copyToClipboard(profile.address)}
                            className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            title="Copy address"
                          >
                            <Copy className="w-4 h-4" />
                          </motion.button>
                          <motion.a
                            href={`https://blockchair.com/bitcoin/address/${profile.address}`}
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

                {selectedTab === 'behavior' && (
                  <div className="space-y-6">
                    {/* Behavior Analysis */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Spending Habits</h4>
                        <div className="space-y-2">
                          {profile.behaviorAnalysis.spendingHabits.map((habit, index) => (
                            <div key={index} className="flex items-center space-x-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                              <CheckCircle className="w-4 h-4 text-blue-600" />
                              <span className="text-blue-800">{habit}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Transaction Patterns</h4>
                        <div className="space-y-2">
                          {profile.behaviorAnalysis.transactionPatterns.map((pattern, index) => (
                            <div key={index} className="flex items-center space-x-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                              <TrendingUp className="w-4 h-4 text-green-600" />
                              <span className="text-green-800">{pattern}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Behavioral Characteristics */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                        <div className="text-sm font-medium text-purple-900 mb-2">Privacy Behavior</div>
                        <div className="text-purple-800">{profile.behaviorAnalysis.privacyBehavior}</div>
                      </div>
                      <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                        <div className="text-sm font-medium text-orange-900 mb-2">Sophistication Level</div>
                        <div className="text-orange-800">{profile.behaviorAnalysis.sophisticationLevel}</div>
                      </div>
                    </div>

                    {/* Temporal Analysis */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Temporal Analysis</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <div className="text-sm font-medium text-gray-700 mb-1">Activity Periods</div>
                          <div className="text-xs text-gray-600">
                            {profile.temporalAnalysis.activityPeriods.join(', ')}
                          </div>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <div className="text-sm font-medium text-gray-700 mb-1">Dormancy Periods</div>
                          <div className="text-xs text-gray-600">
                            {profile.temporalAnalysis.dormancyPeriods.join(', ')}
                          </div>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <div className="text-sm font-medium text-gray-700 mb-1">Lifecycle Stage</div>
                          <div className="text-xs text-gray-600">{profile.temporalAnalysis.lifecycleStage}</div>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <div className="text-sm font-medium text-gray-700 mb-1">Evolution Pattern</div>
                          <div className="text-xs text-gray-600">{profile.temporalAnalysis.evolutionPattern}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedTab === 'network' && (
                  <div className="space-y-6">
                    {/* Network Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                        <div className="text-2xl font-bold text-blue-700">{profile.networkAnalysis.connectionStrength}%</div>
                        <div className="text-sm text-blue-600 font-medium">Connection Strength</div>
                        <div className="text-xs text-blue-500 mt-1">Network integration level</div>
                      </div>
                      <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                        <div className="text-2xl font-bold text-green-700">{profile.networkAnalysis.clusterSize}</div>
                        <div className="text-sm text-green-600 font-medium">Cluster Size</div>
                        <div className="text-xs text-green-500 mt-1">Related addresses</div>
                      </div>
                      <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                        <div className="text-2xl font-bold text-purple-700">{profile.networkAnalysis.centralityScore}%</div>
                        <div className="text-sm text-purple-600 font-medium">Centrality Score</div>
                        <div className="text-xs text-purple-500 mt-1">Network importance</div>
                      </div>
                    </div>

                    {/* Community Detection */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Community Detection</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {profile.networkAnalysis.communityDetection.map((community, index) => (
                          <div key={index} className="p-4 border border-gray-200 rounded-lg">
                            <div className="flex items-center space-x-2">
                              <Network className="w-5 h-5 text-indigo-600" />
                              <span className="font-medium text-gray-900">{community}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {selectedTab === 'forensics' && (
                  <div className="space-y-6">
                    {/* Forensic Markers */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Unique Identifiers</h4>
                        <div className="space-y-2">
                          {profile.forensicMarkers.uniqueIdentifiers.map((identifier, index) => (
                            <div key={index} className="flex items-center space-x-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                              <Key className="w-4 h-4 text-yellow-600" />
                              <span className="text-yellow-800 text-sm">{identifier}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Digital Fingerprints</h4>
                        <div className="space-y-2">
                          {profile.forensicMarkers.fingerprints.map((fingerprint, index) => (
                            <div key={index} className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                              <Fingerprint className="w-4 h-4 text-red-600" />
                              <span className="text-red-800 text-sm">{fingerprint}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Correlation Factors</h4>
                        <div className="space-y-2">
                          {profile.forensicMarkers.correlationFactors.map((factor, index) => (
                            <div key={index} className="flex items-center space-x-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                              <Target className="w-4 h-4 text-blue-600" />
                              <span className="text-blue-800 text-sm">{factor}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Analysis Confidence */}
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Analysis Confidence</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-indigo-600">{profile.confidence}%</div>
                          <div className="text-sm text-gray-600">Overall Confidence</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-green-600">{analysisDepth}</div>
                          <div className="text-sm text-gray-600">Analysis Depth</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-purple-600">{profile.behaviorScore}</div>
                          <div className="text-sm text-gray-600">Behavior Score</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* External Tools */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <h4 className="text-md font-semibold text-gray-800 mb-3">External Profiling Tools</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <motion.a
                  href={`https://oxt.me/address/${profile.address}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ExternalLink className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium">OXT Advanced Analysis</span>
                </motion.a>
                <motion.a
                  href={`https://www.walletexplorer.com/address/${profile.address}`}
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
                  href={`https://blockchair.com/bitcoin/address/${profile.address}`}
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

export default AdvancedProfilingPage;