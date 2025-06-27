import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Coins, TrendingUp, AlertTriangle, Shield, Clock, DollarSign, Zap, ExternalLink, Copy, Eye, MapPin, Server, Database, Target, Activity, Hash, Bitcoin, Users, BarChart3, PieChart, Filter, Download, RefreshCw, Settings, Info, CheckCircle, XCircle, Minus, Plus, FileText, Globe, Lock, Unlock, Key, Fingerprint, Brain, Microscope, Satellite, Radio, Webhook, Code, Cloud, HardDrive, Network, GitBranch, Layers, Workflow, Calendar, Bell, User, Mail, Phone, Home, Building, Car, Plane, Train, Bus, Bike, Wallet as Walk, Sun as Run, Heart, Star, Flag, Tag, Bookmark, Link, Share, Send, Inbox, Archive, Trash, Edit, Save, Upload, Image, Video, Music, Folder, FolderOpen, Paperclip, Scissors, Clipboard, Calculator, Timer, Watch as Stopwatch, AlarmPlus as Alarm, Sun, Moon, CloudRain, CloudSnow, Wind, Thermometer, Umbrella, Flashlight, Lightbulb, Candy as Candle, Flame, Snowflake, Droplets, Waves, Mountain, Trees as Tree, Flower, Leaf, Scaling as Seedling, Apple, Cherry, Grape, Diamond as Lemon, Tangent as Orange, Banana, Carrot, Popcorn as Corn, Pizza, Coffee, Wine, Beer, Cake, Cookie, IceCream, Candy, Gift, PartyPopper as Party, Moon as Balloon, SettingsIcon as Confetti, Crown, Diamond, Gem, BellRing as Ring, Slack as Necklace, Glasses, Cat as Hat, Shirt, Tangent as Pants, Shovel as Shoe, Lock as Sock, Clover as Glove, Scan as Scarf, Brackets as Jacket, Trees as Dress, Shirt as Skirt, View as Tie, Bell as Belt, Ban as Bag, Backpack, Briefcase, Briefcase as Suitcase, Wallet, CreditCard, Banknote, Receipt, ShoppingCart, ShoppingBag, Store, Factory, Warehouse, MicOff as Office, School, CaseSensitive as University, Library, Mouse as Museum, Theater, Wine as Cinema, Radius as Stadium, Sparkle as Park, Bean as Beach, Hand as Island, Dessert as Desert, ArchiveRestore as Forest, Cake as Lake, Clover as River, Bean as Ocean, Scan as Volcano, Save as Cave, Tent, Cable as Cabin, Castle, Church, Fuel as Mosque, BookTemplate as Temple, MoveDiagonal as Synagogue, Cross, Parentheses as Crescent, Space as Peace, Pin as Yin, Tangent as Yang, Infinity, Recycle, Earth, Compass, Map, Navigation, Anchor, Ship, Bot as Boat, Sailboat, LineChart as Submarine, Rocket, Info as Ufo, AlignCenter as Alien, Notebook as Robot, Keyboard as Cyborg, Cuboid as Android, Cross as Ios, AppWindow as Windows, Link as Linux } from 'lucide-react';

interface DeFiAnalysis {
  address: string;
  protocol: string;
  protocolType: 'DEX' | 'Lending' | 'Yield Farming' | 'Staking' | 'Bridge' | 'Insurance' | 'Derivatives';
  totalValueLocked: number;
  userPosition: number;
  yieldEarned: number;
  transactionCount: number;
  firstInteraction: string;
  lastActivity: string;
  riskScore: number;
  riskFactors: string[];
  mevExposure: {
    frontrunning: number;
    sandwichAttacks: number;
    arbitrage: number;
    liquidations: number;
  };
  protocolRisks: {
    smartContractRisk: number;
    liquidityRisk: number;
    impermanentLoss: number;
    governanceRisk: number;
  };
  interactions: Array<{
    protocol: string;
    type: string;
    amount: number;
    timestamp: string;
    txHash: string;
  }>;
  yieldFarming: {
    pools: Array<{
      name: string;
      apy: number;
      tvl: number;
      userStake: number;
      rewards: number;
    }>;
  };
  flashLoanActivity: {
    count: number;
    totalVolume: number;
    suspiciousPatterns: string[];
  };
}

const DeFiAnalysisPage: React.FC = () => {
  const [addressInput, setAddressInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<DeFiAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'yield' | 'risks' | 'mev'>('overview');
  const [protocolFilter, setProtocolFilter] = useState<'all' | 'uniswap' | 'aave' | 'compound'>('all');

  // Sample DeFi addresses for demonstration
  const sampleDeFiAddresses = useMemo(() => [
    {
      address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
      description: 'Uniswap V3 Liquidity Provider',
      protocol: 'Uniswap'
    },
    {
      address: '0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9',
      description: 'Aave Lending Pool Participant',
      protocol: 'Aave'
    },
    {
      address: '0xc00e94Cb662C3520282E6f5717214004A7f26888',
      description: 'Compound Finance User',
      protocol: 'Compound'
    },
    {
      address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
      description: 'Yearn Finance Vault Depositor',
      protocol: 'Yearn'
    }
  ], []);

  // Generate realistic DeFi analysis
  const generateDeFiAnalysis = useCallback((address: string): DeFiAnalysis => {
    const protocols = ['Uniswap', 'Aave', 'Compound', 'Yearn', 'Curve', 'SushiSwap', 'MakerDAO', 'Synthetix'];
    const protocolTypes: Array<'DEX' | 'Lending' | 'Yield Farming' | 'Staking' | 'Bridge' | 'Insurance' | 'Derivatives'> = 
      ['DEX', 'Lending', 'Yield Farming', 'Staking', 'Bridge', 'Insurance', 'Derivatives'];
    
    const protocol = protocols[Math.floor(Math.random() * protocols.length)];
    const protocolType = protocolTypes[Math.floor(Math.random() * protocolTypes.length)];
    
    const totalValueLocked = Math.random() * 1000000 + 50000; // $50k - $1M
    const userPosition = Math.random() * 100000 + 1000; // $1k - $100k
    const yieldEarned = userPosition * (Math.random() * 0.2 + 0.05); // 5-25% yield
    
    const riskScore = Math.round(Math.random() * 60 + 20); // 20-80% for DeFi
    
    return {
      address,
      protocol,
      protocolType,
      totalValueLocked,
      userPosition,
      yieldEarned,
      transactionCount: Math.floor(Math.random() * 500) + 50,
      firstInteraction: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      lastActivity: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      riskScore,
      riskFactors: [
        'Smart contract risk',
        'Impermanent loss exposure',
        'Liquidity risk',
        'MEV vulnerability'
      ].filter(() => Math.random() > 0.5),
      mevExposure: {
        frontrunning: Math.round(Math.random() * 20),
        sandwichAttacks: Math.round(Math.random() * 15),
        arbitrage: Math.round(Math.random() * 30),
        liquidations: Math.round(Math.random() * 10)
      },
      protocolRisks: {
        smartContractRisk: Math.round(Math.random() * 40 + 20),
        liquidityRisk: Math.round(Math.random() * 60 + 20),
        impermanentLoss: Math.round(Math.random() * 80 + 10),
        governanceRisk: Math.round(Math.random() * 50 + 10)
      },
      interactions: Array.from({ length: Math.floor(Math.random() * 10) + 5 }, (_, i) => ({
        protocol: protocols[Math.floor(Math.random() * protocols.length)],
        type: ['Swap', 'Deposit', 'Withdraw', 'Claim', 'Stake'][Math.floor(Math.random() * 5)],
        amount: Math.random() * 10000 + 100,
        timestamp: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        txHash: `0x${Math.random().toString(16).substring(2, 66)}`
      })),
      yieldFarming: {
        pools: Array.from({ length: Math.floor(Math.random() * 5) + 2 }, () => ({
          name: `${protocols[Math.floor(Math.random() * protocols.length)]}-ETH Pool`,
          apy: Math.random() * 200 + 10, // 10-210% APY
          tvl: Math.random() * 10000000 + 1000000, // $1M - $10M
          userStake: Math.random() * 50000 + 1000,
          rewards: Math.random() * 5000 + 100
        }))
      },
      flashLoanActivity: {
        count: Math.floor(Math.random() * 20),
        totalVolume: Math.random() * 1000000 + 100000,
        suspiciousPatterns: [
          'Rapid liquidation patterns',
          'Arbitrage exploitation',
          'Price manipulation attempts'
        ].filter(() => Math.random() > 0.7)
      }
    };
  }, []);

  const analyzeDeFiAddress = useCallback(async (address: string) => {
    if (!address.trim()) {
      setError('Please enter an Ethereum address');
      return;
    }

    // Basic Ethereum address validation
    if (!/^0x[a-fA-F0-9]{40}$/.test(address.trim())) {
      setError('Invalid Ethereum address format');
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setAnalysis(null);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Generate comprehensive DeFi analysis
      const analysisResult = generateDeFiAnalysis(address);
      setAnalysis(analysisResult);

    } catch (err) {
      setError('Failed to analyze DeFi address. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  }, [generateDeFiAnalysis]);

  const copyToClipboard = useCallback((text: string) => {
    navigator.clipboard.writeText(text);
  }, []);

  const getRiskColor = useCallback((level: number) => {
    if (level > 70) return 'text-red-700 bg-red-100 border-red-300';
    if (level > 40) return 'text-yellow-700 bg-yellow-100 border-yellow-300';
    return 'text-green-700 bg-green-100 border-green-300';
  }, []);

  const getProtocolColor = useCallback((protocol: string) => {
    const colors = {
      'Uniswap': 'text-pink-700 bg-pink-100 border-pink-300',
      'Aave': 'text-blue-700 bg-blue-100 border-blue-300',
      'Compound': 'text-green-700 bg-green-100 border-green-300',
      'Yearn': 'text-purple-700 bg-purple-100 border-purple-300',
      'Curve': 'text-yellow-700 bg-yellow-100 border-yellow-300',
      'SushiSwap': 'text-red-700 bg-red-100 border-red-300',
      'MakerDAO': 'text-orange-700 bg-orange-100 border-orange-300',
      'Synthetix': 'text-indigo-700 bg-indigo-100 border-indigo-300'
    };
    return colors[protocol as keyof typeof colors] || 'text-gray-700 bg-gray-100 border-gray-300';
  }, []);

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
          DeFi Protocol Analysis
        </h1>
        <p className="text-purple-100 text-base sm:text-lg mb-4 lg:mb-6">
          Comprehensive analysis of DeFi interactions, yield farming, MEV exposure, and protocol risks for forensic investigation.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          <div className="bg-white/10 rounded-lg p-3 lg:p-4">
            <h3 className="font-semibold mb-2 text-sm sm:text-base">Protocol Analysis</h3>
            <p className="text-xs sm:text-sm text-purple-100">Uniswap, Aave, Compound, and more</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3 lg:p-4">
            <h3 className="font-semibold mb-2 text-sm sm:text-base">Yield Farming</h3>
            <p className="text-xs sm:text-sm text-purple-100">Track liquidity provision and rewards</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3 lg:p-4">
            <h3 className="font-semibold mb-2 text-sm sm:text-base">MEV Detection</h3>
            <p className="text-xs sm:text-sm text-purple-100">Frontrunning and sandwich attack analysis</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3 lg:p-4">
            <h3 className="font-semibold mb-2 text-sm sm:text-base">Flash Loans</h3>
            <p className="text-xs sm:text-sm text-purple-100">Monitor flash loan usage and patterns</p>
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
                placeholder="Enter Ethereum address for DeFi analysis..."
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono text-sm"
                onKeyPress={(e) => e.key === 'Enter' && analyzeDeFiAddress(addressInput)}
              />
              <motion.button
                onClick={() => analyzeDeFiAddress(addressInput)}
                disabled={isAnalyzing}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
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

          <select
            value={protocolFilter}
            onChange={(e) => setProtocolFilter(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">All Protocols</option>
            <option value="uniswap">Uniswap</option>
            <option value="aave">Aave</option>
            <option value="compound">Compound</option>
          </select>
        </div>

        {/* Sample Addresses */}
        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-2">Try these DeFi addresses:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {sampleDeFiAddresses.map((sample, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setAddressInput(sample.address);
                  analyzeDeFiAddress(sample.address);
                }}
                className="text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="font-mono text-xs text-gray-700 truncate">{sample.address}</div>
                <div className="text-xs text-gray-500 mt-1">{sample.description}</div>
                <div className="text-xs text-purple-600 font-medium mt-1">{sample.protocol}</div>
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
        {analysis && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* DeFi Overview */}
            <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Coins className="w-8 h-8" />
                  <h3 className="text-xl font-bold">DeFi Protocol Analysis</h3>
                </div>
                <div className={`px-4 py-2 rounded-full border-2 ${getProtocolColor(analysis.protocol)} bg-white`}>
                  <span className="font-bold">{analysis.protocol}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-purple-100 text-sm mb-1">User Position</div>
                  <div className="text-2xl font-bold">${analysis.userPosition.toLocaleString()}</div>
                  <div className="text-xs text-purple-200">Current value</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-purple-100 text-sm mb-1">Yield Earned</div>
                  <div className="text-2xl font-bold">${analysis.yieldEarned.toLocaleString()}</div>
                  <div className="text-xs text-purple-200">Total rewards</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-purple-100 text-sm mb-1">Transactions</div>
                  <div className="text-2xl font-bold">{analysis.transactionCount}</div>
                  <div className="text-xs text-purple-200">DeFi interactions</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-purple-100 text-sm mb-1">Protocol Type</div>
                  <div className="text-lg font-bold">{analysis.protocolType}</div>
                  <div className="text-xs text-purple-200">Primary category</div>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="bg-white rounded-lg shadow-lg border border-gray-200">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {[
                    { id: 'overview', label: 'Overview', icon: BarChart3 },
                    { id: 'yield', label: 'Yield Farming', icon: TrendingUp },
                    { id: 'risks', label: 'Risk Analysis', icon: Shield },
                    { id: 'mev', label: 'MEV Exposure', icon: Zap }
                  ].map((tab) => (
                    <motion.button
                      key={tab.id}
                      onClick={() => setSelectedTab(tab.id as any)}
                      className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm ${
                        selectedTab === tab.id
                          ? 'border-purple-500 text-purple-600'
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
                    {/* Protocol Information */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Protocol Information</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <span className="text-sm text-gray-600">Protocol:</span>
                            <span className="font-semibold text-gray-900">{analysis.protocol}</span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <span className="text-sm text-gray-600">Type:</span>
                            <span className="font-semibold text-gray-900">{analysis.protocolType}</span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <span className="text-sm text-gray-600">Total Value Locked:</span>
                            <span className="font-semibold text-gray-900">${analysis.totalValueLocked.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <span className="text-sm text-gray-600">First Interaction:</span>
                            <span className="font-semibold text-gray-900">{analysis.firstInteraction}</span>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <span className="text-sm text-gray-600">Last Activity:</span>
                            <span className="font-semibold text-gray-900">{analysis.lastActivity}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Recent Interactions</h4>
                        <div className="space-y-2 max-h-64 overflow-y-auto">
                          {analysis.interactions.slice(0, 5).map((interaction, index) => (
                            <div key={index} className="p-3 border border-gray-200 rounded-lg">
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-medium text-gray-900">{interaction.type}</span>
                                <span className="text-sm text-gray-600">{interaction.timestamp}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">{interaction.protocol}</span>
                                <span className="font-semibold text-gray-900">${interaction.amount.toLocaleString()}</span>
                              </div>
                              <div className="text-xs text-gray-500 font-mono mt-1 truncate">
                                {interaction.txHash}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Address Details */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="text-md font-semibold text-gray-800 mb-3">Address Information</h4>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-sm text-gray-600">Ethereum Address:</span>
                          <div className="font-mono text-sm text-gray-900 break-all">{analysis.address}</div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <motion.button
                            onClick={() => copyToClipboard(analysis.address)}
                            className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            title="Copy address"
                          >
                            <Copy className="w-4 h-4" />
                          </motion.button>
                          <motion.a
                            href={`https://etherscan.io/address/${analysis.address}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            title="View on Etherscan"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </motion.a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedTab === 'yield' && (
                  <div className="space-y-6">
                    {/* Yield Farming Pools */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Active Yield Farming Pools</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {analysis.yieldFarming.pools.map((pool, index) => (
                          <div key={index} className="p-4 border border-gray-200 rounded-lg">
                            <div className="flex items-center justify-between mb-3">
                              <h5 className="font-semibold text-gray-900">{pool.name}</h5>
                              <span className="text-lg font-bold text-green-600">{pool.apy.toFixed(1)}% APY</span>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">TVL:</span>
                                <span className="font-medium text-gray-900">${pool.tvl.toLocaleString()}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Your Stake:</span>
                                <span className="font-medium text-gray-900">${pool.userStake.toLocaleString()}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Rewards:</span>
                                <span className="font-medium text-green-600">${pool.rewards.toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Flash Loan Activity */}
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h4 className="text-lg font-semibold text-yellow-900 mb-4">Flash Loan Activity</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-yellow-800">{analysis.flashLoanActivity.count}</div>
                          <div className="text-sm text-yellow-700">Flash Loans</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-yellow-800">${analysis.flashLoanActivity.totalVolume.toLocaleString()}</div>
                          <div className="text-sm text-yellow-700">Total Volume</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-yellow-800">{analysis.flashLoanActivity.suspiciousPatterns.length}</div>
                          <div className="text-sm text-yellow-700">Suspicious Patterns</div>
                        </div>
                      </div>
                      {analysis.flashLoanActivity.suspiciousPatterns.length > 0 && (
                        <div className="mt-4">
                          <div className="text-sm font-medium text-yellow-900 mb-2">Detected Patterns:</div>
                          <div className="space-y-1">
                            {analysis.flashLoanActivity.suspiciousPatterns.map((pattern, index) => (
                              <div key={index} className="flex items-center space-x-2 text-sm">
                                <AlertTriangle className="w-3 h-3 text-yellow-600" />
                                <span className="text-yellow-800">{pattern}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {selectedTab === 'risks' && (
                  <div className="space-y-6">
                    {/* Overall Risk Assessment */}
                    <div className={`p-6 rounded-lg border ${getRiskColor(analysis.riskScore)}`}>
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-semibold">Overall Risk Assessment</h4>
                        <span className="text-3xl font-bold">{analysis.riskScore}%</span>
                      </div>
                      <div className="text-sm opacity-80">
                        {analysis.riskScore > 70 ? 'High Risk - Enhanced monitoring recommended' :
                         analysis.riskScore > 40 ? 'Medium Risk - Standard DeFi risks present' :
                         'Low Risk - Conservative DeFi usage patterns'}
                      </div>
                    </div>

                    {/* Protocol-Specific Risks */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Protocol Risk Breakdown</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-red-900">Smart Contract Risk</span>
                            <span className="text-lg font-bold text-red-800">{analysis.protocolRisks.smartContractRisk}%</span>
                          </div>
                          <div className="text-sm text-red-700">Code vulnerabilities and exploits</div>
                        </div>
                        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-yellow-900">Liquidity Risk</span>
                            <span className="text-lg font-bold text-yellow-800">{analysis.protocolRisks.liquidityRisk}%</span>
                          </div>
                          <div className="text-sm text-yellow-700">Pool liquidity and slippage</div>
                        </div>
                        <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-orange-900">Impermanent Loss</span>
                            <span className="text-lg font-bold text-orange-800">{analysis.protocolRisks.impermanentLoss}%</span>
                          </div>
                          <div className="text-sm text-orange-700">LP token value fluctuation</div>
                        </div>
                        <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-purple-900">Governance Risk</span>
                            <span className="text-lg font-bold text-purple-800">{analysis.protocolRisks.governanceRisk}%</span>
                          </div>
                          <div className="text-sm text-purple-700">Protocol governance changes</div>
                        </div>
                      </div>
                    </div>

                    {/* Risk Factors */}
                    {analysis.riskFactors.length > 0 && (
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Identified Risk Factors</h4>
                        <div className="space-y-2">
                          {analysis.riskFactors.map((factor, index) => (
                            <div key={index} className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                              <AlertTriangle className="w-4 h-4 text-red-600" />
                              <span className="text-red-800">{factor}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {selectedTab === 'mev' && (
                  <div className="space-y-6">
                    {/* MEV Exposure Overview */}
                    <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-6">
                      <h4 className="text-lg font-semibold text-orange-900 mb-4">MEV Exposure Analysis</h4>
                      <p className="text-sm text-orange-800 mb-4">
                        Maximal Extractable Value (MEV) represents potential value extraction from transaction ordering and inclusion.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="text-center p-3 bg-white rounded-lg border border-orange-200">
                          <div className="text-2xl font-bold text-orange-800">{analysis.mevExposure.frontrunning}</div>
                          <div className="text-sm text-orange-700">Frontrunning</div>
                        </div>
                        <div className="text-center p-3 bg-white rounded-lg border border-orange-200">
                          <div className="text-2xl font-bold text-orange-800">{analysis.mevExposure.sandwichAttacks}</div>
                          <div className="text-sm text-orange-700">Sandwich Attacks</div>
                        </div>
                        <div className="text-center p-3 bg-white rounded-lg border border-orange-200">
                          <div className="text-2xl font-bold text-orange-800">{analysis.mevExposure.arbitrage}</div>
                          <div className="text-sm text-orange-700">Arbitrage</div>
                        </div>
                        <div className="text-center p-3 bg-white rounded-lg border border-orange-200">
                          <div className="text-2xl font-bold text-orange-800">{analysis.mevExposure.liquidations}</div>
                          <div className="text-sm text-orange-700">Liquidations</div>
                        </div>
                      </div>
                    </div>

                    {/* MEV Protection Recommendations */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="text-lg font-semibold text-blue-900 mb-4">MEV Protection Recommendations</h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-blue-600" />
                          <span className="text-sm text-blue-800">Use private mempools (Flashbots Protect)</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-blue-600" />
                          <span className="text-sm text-blue-800">Set appropriate slippage tolerance</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-blue-600" />
                          <span className="text-sm text-blue-800">Consider MEV-resistant protocols</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-blue-600" />
                          <span className="text-sm text-blue-800">Monitor transaction timing</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* External Tools */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <h4 className="text-md font-semibold text-gray-800 mb-3">External DeFi Analysis Tools</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <motion.a
                  href={`https://debank.com/profile/${analysis.address}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ExternalLink className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium">DeBank Portfolio</span>
                </motion.a>
                <motion.a
                  href={`https://zapper.fi/account/${analysis.address}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ExternalLink className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium">Zapper Analysis</span>
                </motion.a>
                <motion.a
                  href={`https://etherscan.io/address/${analysis.address}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ExternalLink className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium">Etherscan</span>
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DeFiAnalysisPage;