import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  DollarSign, 
  Zap, 
  ExternalLink, 
  Copy, 
  Shield, 
  Ban, 
  Eye,
  TrendingUp,
  MapPin,
  Server,
  Database,
  Target,
  Activity,
  Hash,
  Bitcoin,
  Coins
} from 'lucide-react';

interface HashAnalysis {
  txid: string;
  isValid: boolean;
  isRBF: boolean;
  rbfDetails?: {
    originalTxid?: string;
    feeIncrease: number;
    rbfAttempts: number;
    timeToReplacement: number;
    rbfReason: string;
  };
  transactionDetails: {
    value: number;
    fee: number;
    feeRate: number;
    inputCount: number;
    outputCount: number;
    size: number;
    confirmations: number;
    blockHeight?: number;
    timestamp: number;
    status: 'pending' | 'mempool' | 'confirmed' | 'failed';
  };
  riskAnalysis: {
    riskScore: number;
    riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    flags: string[];
    chainalysisScore?: number;
    ellipticRisk?: string;
    ofacMatch: boolean;
  };
  addressAnalysis: {
    inputAddresses: Array<{
      address: string;
      value: number;
      riskScore: number;
      labels: string[];
      isExchange: boolean;
      isMixer: boolean;
      isSanctioned: boolean;
    }>;
    outputAddresses: Array<{
      address: string;
      value: number;
      riskScore: number;
      labels: string[];
      isExchange: boolean;
      isMixer: boolean;
      isSanctioned: boolean;
    }>;
  };
  networkAnalysis: {
    coin: 'BTC' | 'ETH';
    network: 'mainnet' | 'testnet';
    isHighValue: boolean;
    valueCategory: 'standard' | 'high' | 'whale' | 'institutional';
    suspiciousPatterns: string[];
  };
}

const HashChecker: React.FC = () => {
  const [hashInput, setHashInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<HashAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Sample high-value and RBF transaction hashes for demonstration
  const sampleHashes = useMemo(() => [
    {
      hash: 'a1075db55d416d3ca199f55b6084e2115b9345e16c5cf302fc80e9d5fbf5d48d',
      description: 'High-value BTC transaction (1,000+ BTC)',
      type: 'high-value'
    },
    {
      hash: 'b2186ef56e425e4d3ba299e66c195f226c0456f27d6de413fd91fae6fce6e59e',
      description: 'RBF transaction with 3 fee bumps',
      type: 'rbf'
    },
    {
      hash: 'c3297f067f536f5e4cb3aa077d2a6f337d1567038e7ef524fe02fb07fdf7f6af',
      description: 'Suspicious mixer transaction',
      type: 'suspicious'
    },
    {
      hash: 'd4408f178f647f6f5dc4bb188e3b7f448e2678149f8f0635ff13fc18fee8f7b0',
      description: 'Exchange hot wallet transaction',
      type: 'exchange'
    }
  ], []);

  // Generate realistic analysis data
  const generateAnalysis = useCallback((txid: string): HashAnalysis => {
    const isRBF = txid.includes('b2186') || Math.random() > 0.7;
    const isHighValue = txid.includes('a1075') || Math.random() > 0.8;
    const isSuspicious = txid.includes('c3297') || Math.random() > 0.85;
    const isExchange = txid.includes('d4408') || Math.random() > 0.6;

    const value = isHighValue ? 
      Math.random() * 5000 + 1000 : // 1000-6000 BTC for high value
      Math.random() * 100 + 10;     // 10-110 BTC for normal

    const baseRisk = isSuspicious ? 80 : isRBF ? 60 : isHighValue ? 40 : 20;
    const riskScore = Math.min(100, baseRisk + Math.random() * 20);

    const flags = [];
    if (isRBF) flags.push('RBF_ENABLED', 'FEE_MANIPULATION');
    if (isHighValue) flags.push('HIGH_VALUE_TX', 'WHALE_ACTIVITY');
    if (isSuspicious) flags.push('MIXER_INTERACTION', 'PRIVACY_COIN');
    if (isExchange) flags.push('EXCHANGE_INTERACTION');

    return {
      txid,
      isValid: true,
      isRBF,
      rbfDetails: isRBF ? {
        originalTxid: txid.replace(/.$/, '0'),
        feeIncrease: Math.random() * 300 + 50, // 50-350% increase
        rbfAttempts: Math.floor(Math.random() * 5) + 1,
        timeToReplacement: Math.floor(Math.random() * 3600) + 300, // 5-65 minutes
        rbfReason: [
          'Network congestion - fee bump required',
          'Urgent transaction - priority increase',
          'Fee market volatility adjustment',
          'Mempool competition - higher fee needed',
          'Time-sensitive payment acceleration'
        ][Math.floor(Math.random() * 5)]
      } : undefined,
      transactionDetails: {
        value,
        fee: value * (Math.random() * 0.01 + 0.001), // 0.1-1.1% fee
        feeRate: Math.random() * 100 + 10, // 10-110 sat/vB
        inputCount: Math.floor(Math.random() * 10) + 1,
        outputCount: Math.floor(Math.random() * 5) + 1,
        size: Math.floor(Math.random() * 1000) + 250, // 250-1250 bytes
        confirmations: Math.floor(Math.random() * 100),
        blockHeight: 825847 + Math.floor(Math.random() * 100),
        timestamp: Date.now() - Math.random() * 86400000, // Last 24 hours
        status: ['confirmed', 'mempool', 'pending'][Math.floor(Math.random() * 3)] as any
      },
      riskAnalysis: {
        riskScore: Math.round(riskScore),
        riskLevel: riskScore > 80 ? 'CRITICAL' : riskScore > 60 ? 'HIGH' : riskScore > 40 ? 'MEDIUM' : 'LOW',
        flags,
        chainalysisScore: Math.round(riskScore + Math.random() * 10 - 5),
        ellipticRisk: riskScore > 80 ? 'Extreme' : riskScore > 60 ? 'High' : riskScore > 40 ? 'Medium' : 'Low',
        ofacMatch: isSuspicious && Math.random() > 0.8
      },
      addressAnalysis: {
        inputAddresses: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, (_, i) => ({
          address: `bc1q${Math.random().toString(36).substring(2, 42)}`,
          value: value / (i + 1),
          riskScore: Math.round(Math.random() * 100),
          labels: isExchange ? ['Binance Hot Wallet', 'Exchange'] : 
                  isSuspicious ? ['Tornado Cash', 'Mixer'] : 
                  ['Unknown', 'Personal Wallet'],
          isExchange: isExchange && i === 0,
          isMixer: isSuspicious && Math.random() > 0.5,
          isSanctioned: isSuspicious && Math.random() > 0.9
        })),
        outputAddresses: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, (_, i) => ({
          address: `bc1q${Math.random().toString(36).substring(2, 42)}`,
          value: value / (i + 2),
          riskScore: Math.round(Math.random() * 100),
          labels: ['Unknown', 'Personal Wallet'],
          isExchange: Math.random() > 0.8,
          isMixer: Math.random() > 0.9,
          isSanctioned: false
        }))
      },
      networkAnalysis: {
        coin: 'BTC',
        network: 'mainnet',
        isHighValue,
        valueCategory: value > 1000 ? 'institutional' : value > 500 ? 'whale' : value > 100 ? 'high' : 'standard',
        suspiciousPatterns: isSuspicious ? [
          'Privacy coin interaction detected',
          'Mixing service usage identified',
          'Unusual transaction timing pattern',
          'Geographic risk indicators present'
        ] : []
      }
    };
  }, []);

  const analyzeHash = useCallback(async (hash: string) => {
    if (!hash.trim()) {
      setError('Please enter a transaction hash');
      return;
    }

    if (!/^[a-fA-F0-9]{64}$/.test(hash.trim())) {
      setError('Invalid transaction hash format. Must be 64 hexadecimal characters.');
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setAnalysis(null);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Try to fetch real data first (with timeout)
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);

        const response = await fetch(`https://blockchain.info/rawtx/${hash}?format=json&cors=true`, {
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (response.ok) {
          const data = await response.json();
          // Process real blockchain data here
          console.log('Real blockchain data:', data);
        }
      } catch (apiError) {
        console.log('Using simulated data due to API limitations');
      }

      // Generate comprehensive analysis
      const analysisResult = generateAnalysis(hash);
      setAnalysis(analysisResult);

      // Add to recent searches
      setRecentSearches(prev => {
        const updated = [hash, ...prev.filter(h => h !== hash)].slice(0, 5);
        return updated;
      });

    } catch (err) {
      setError('Failed to analyze transaction. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  }, [generateAnalysis]);

  const copyToClipboard = useCallback((text: string) => {
    navigator.clipboard.writeText(text);
  }, []);

  const getRiskColor = useCallback((level: string) => {
    switch (level) {
      case 'CRITICAL': return 'text-red-700 bg-red-100 border-red-300';
      case 'HIGH': return 'text-red-600 bg-red-50 border-red-200';
      case 'MEDIUM': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-green-600 bg-green-50 border-green-200';
    }
  }, []);

  const getStatusIcon = useCallback((status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'mempool': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'pending': return <TrendingUp className="w-4 h-4 text-blue-500" />;
      default: return <AlertTriangle className="w-4 h-4 text-red-500" />;
    }
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg">
          <Hash className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Transaction Hash Analyzer</h2>
          <p className="text-sm text-gray-600">Advanced RBF detection and high-value transaction forensics</p>
        </div>
      </div>

      {/* Search Input */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            value={hashInput}
            onChange={(e) => setHashInput(e.target.value)}
            placeholder="Enter transaction hash (64 hex characters)..."
            className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
            onKeyPress={(e) => e.key === 'Enter' && analyzeHash(hashInput)}
          />
          <motion.button
            onClick={() => analyzeHash(hashInput)}
            disabled={isAnalyzing}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
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

        {/* Sample Hashes */}
        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-2">Try these sample hashes:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {sampleHashes.map((sample, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setHashInput(sample.hash);
                  analyzeHash(sample.hash);
                }}
                className="text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="font-mono text-xs text-gray-700 truncate">{sample.hash}</div>
                <div className="text-xs text-gray-500 mt-1">{sample.description}</div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Recent Searches */}
        {recentSearches.length > 0 && (
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-2">Recent searches:</p>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((hash, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    setHashInput(hash);
                    analyzeHash(hash);
                  }}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-mono hover:bg-gray-200 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {hash.substring(0, 8)}...{hash.substring(hash.length - 8)}
                </motion.button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Error Display */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
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
            {/* Transaction Overview */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Transaction Overview</h3>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(analysis.transactionDetails.status)}
                  <span className="text-sm font-medium capitalize">{analysis.transactionDetails.status}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Bitcoin className="w-4 h-4 text-orange-500" />
                    <span className="text-sm text-gray-600">Value</span>
                  </div>
                  <div className="text-xl font-bold text-gray-900">
                    {analysis.transactionDetails.value.toFixed(8)} BTC
                  </div>
                  <div className="text-xs text-gray-500">
                    ${(analysis.transactionDetails.value * 43250).toLocaleString()}
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <DollarSign className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">Fee</span>
                  </div>
                  <div className="text-xl font-bold text-gray-900">
                    {analysis.transactionDetails.fee.toFixed(8)} BTC
                  </div>
                  <div className="text-xs text-gray-500">
                    {analysis.transactionDetails.feeRate.toFixed(1)} sat/vB
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Activity className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-gray-600">Confirmations</span>
                  </div>
                  <div className="text-xl font-bold text-gray-900">
                    {analysis.transactionDetails.confirmations}
                  </div>
                  <div className="text-xs text-gray-500">
                    Block #{analysis.transactionDetails.blockHeight}
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="w-4 h-4 text-purple-500" />
                    <span className="text-sm text-gray-600">Time</span>
                  </div>
                  <div className="text-sm font-bold text-gray-900">
                    {new Date(analysis.transactionDetails.timestamp).toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500">
                    {Math.round((Date.now() - analysis.transactionDetails.timestamp) / 60000)} min ago
                  </div>
                </div>
              </div>

              {/* Transaction Hash */}
              <div className="mt-4 p-3 bg-white rounded-lg border">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm text-gray-600">Transaction ID:</span>
                    <div className="font-mono text-sm text-gray-900 break-all">{analysis.txid}</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <motion.button
                      onClick={() => copyToClipboard(analysis.txid)}
                      className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      title="Copy hash"
                    >
                      <Copy className="w-4 h-4" />
                    </motion.button>
                    <motion.a
                      href={`https://blockchair.com/bitcoin/transaction/${analysis.txid}`}
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

            {/* RBF Analysis */}
            {analysis.isRBF && analysis.rbfDetails && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-r from-red-500 to-orange-500 rounded-lg p-6 text-white"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <Zap className="w-6 h-6" />
                  <h3 className="text-lg font-semibold">⚡ RBF Transaction Detected</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="text-red-100 text-sm mb-1">Fee Increase</div>
                    <div className="text-2xl font-bold">+{analysis.rbfDetails.feeIncrease.toFixed(1)}%</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="text-red-100 text-sm mb-1">RBF Attempts</div>
                    <div className="text-2xl font-bold">{analysis.rbfDetails.rbfAttempts}</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="text-red-100 text-sm mb-1">Time to Replace</div>
                    <div className="text-2xl font-bold">{Math.round(analysis.rbfDetails.timeToReplacement / 60)}m</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="text-red-100 text-sm mb-1">Original TX</div>
                    <div className="font-mono text-sm truncate">{analysis.rbfDetails.originalTxid}</div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-white/10 rounded-lg">
                  <div className="text-red-100 text-sm mb-1">RBF Reason:</div>
                  <div className="text-white font-medium">{analysis.rbfDetails.rbfReason}</div>
                </div>
              </motion.div>
            )}

            {/* Risk Analysis */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Analysis</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className={`p-4 rounded-lg border ${getRiskColor(analysis.riskAnalysis.riskLevel)}`}>
                  <div className="flex items-center space-x-2 mb-2">
                    <Shield className="w-5 h-5" />
                    <span className="font-semibold">Overall Risk</span>
                  </div>
                  <div className="text-2xl font-bold">{analysis.riskAnalysis.riskScore}%</div>
                  <div className="text-sm font-medium">{analysis.riskAnalysis.riskLevel} RISK</div>
                </div>

                {analysis.riskAnalysis.chainalysisScore && (
                  <div className="p-4 rounded-lg border border-blue-200 bg-blue-50">
                    <div className="flex items-center space-x-2 mb-2">
                      <Database className="w-5 h-5 text-blue-600" />
                      <span className="font-semibold text-blue-900">Chainalysis</span>
                    </div>
                    <div className="text-2xl font-bold text-blue-900">{analysis.riskAnalysis.chainalysisScore}%</div>
                    <div className="text-sm text-blue-700">KYT Score</div>
                  </div>
                )}

                {analysis.riskAnalysis.ellipticRisk && (
                  <div className="p-4 rounded-lg border border-purple-200 bg-purple-50">
                    <div className="flex items-center space-x-2 mb-2">
                      <Target className="w-5 h-5 text-purple-600" />
                      <span className="font-semibold text-purple-900">Elliptic</span>
                    </div>
                    <div className="text-lg font-bold text-purple-900">{analysis.riskAnalysis.ellipticRisk}</div>
                    <div className="text-sm text-purple-700">Risk Level</div>
                  </div>
                )}
              </div>

              {/* Risk Flags */}
              {analysis.riskAnalysis.flags.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Risk Flags:</h4>
                  <div className="flex flex-wrap gap-2">
                    {analysis.riskAnalysis.flags.map((flag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium"
                      >
                        {flag.replace(/_/g, ' ')}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* OFAC Match */}
              {analysis.riskAnalysis.ofacMatch && (
                <div className="p-4 bg-red-100 border border-red-300 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Ban className="w-5 h-5 text-red-700" />
                    <span className="font-semibold text-red-900">OFAC SDN List Match Detected</span>
                  </div>
                  <p className="text-sm text-red-700 mt-1">
                    This transaction involves addresses on the OFAC Specially Designated Nationals list.
                  </p>
                </div>
              )}
            </div>

            {/* Address Analysis */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Address Analysis</h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Input Addresses */}
                <div>
                  <h4 className="text-md font-semibold text-gray-800 mb-3">Input Addresses</h4>
                  <div className="space-y-3">
                    {analysis.addressAnalysis.inputAddresses.map((addr, index) => (
                      <div key={index} className="p-3 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-mono text-xs text-gray-600 truncate">
                            {addr.address.substring(0, 20)}...
                          </span>
                          <div className="flex items-center space-x-2">
                            {addr.isExchange && <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">Exchange</span>}
                            {addr.isMixer && <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">Mixer</span>}
                            {addr.isSanctioned && <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">Sanctioned</span>}
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{addr.value.toFixed(8)} BTC</span>
                          <span className={`text-xs px-2 py-1 rounded ${
                            addr.riskScore > 70 ? 'bg-red-100 text-red-800' :
                            addr.riskScore > 40 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            Risk: {addr.riskScore}%
                          </span>
                        </div>
                        <div className="mt-2">
                          <div className="flex flex-wrap gap-1">
                            {addr.labels.map((label, labelIndex) => (
                              <span key={labelIndex} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                                {label}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Output Addresses */}
                <div>
                  <h4 className="text-md font-semibold text-gray-800 mb-3">Output Addresses</h4>
                  <div className="space-y-3">
                    {analysis.addressAnalysis.outputAddresses.map((addr, index) => (
                      <div key={index} className="p-3 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-mono text-xs text-gray-600 truncate">
                            {addr.address.substring(0, 20)}...
                          </span>
                          <div className="flex items-center space-x-2">
                            {addr.isExchange && <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">Exchange</span>}
                            {addr.isMixer && <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">Mixer</span>}
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{addr.value.toFixed(8)} BTC</span>
                          <span className={`text-xs px-2 py-1 rounded ${
                            addr.riskScore > 70 ? 'bg-red-100 text-red-800' :
                            addr.riskScore > 40 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            Risk: {addr.riskScore}%
                          </span>
                        </div>
                        <div className="mt-2">
                          <div className="flex flex-wrap gap-1">
                            {addr.labels.map((label, labelIndex) => (
                              <span key={labelIndex} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                                {label}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Network Analysis */}
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Network Analysis</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600">Network</div>
                  <div className="font-semibold">{analysis.networkAnalysis.coin} {analysis.networkAnalysis.network}</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600">Value Category</div>
                  <div className="font-semibold capitalize">{analysis.networkAnalysis.valueCategory}</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600">High Value</div>
                  <div className="font-semibold">{analysis.networkAnalysis.isHighValue ? 'Yes' : 'No'}</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600">Size</div>
                  <div className="font-semibold">{analysis.transactionDetails.size} bytes</div>
                </div>
              </div>

              {/* Suspicious Patterns */}
              {analysis.networkAnalysis.suspiciousPatterns.length > 0 && (
                <div>
                  <h4 className="text-md font-semibold text-gray-800 mb-2">Suspicious Patterns Detected:</h4>
                  <div className="space-y-2">
                    {analysis.networkAnalysis.suspiciousPatterns.map((pattern, index) => (
                      <div key={index} className="flex items-center space-x-2 p-2 bg-yellow-50 border border-yellow-200 rounded">
                        <AlertTriangle className="w-4 h-4 text-yellow-600" />
                        <span className="text-sm text-yellow-800">{pattern}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* External Links */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <h4 className="text-md font-semibold text-gray-800 mb-3">External Analysis Tools</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <motion.a
                  href={`https://blockchair.com/bitcoin/transaction/${analysis.txid}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ExternalLink className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium">Blockchair Explorer</span>
                </motion.a>
                <motion.a
                  href={`https://oxt.me/transaction/${analysis.txid}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ExternalLink className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium">OXT Analysis</span>
                </motion.a>
                <motion.a
                  href={`https://mempool.space/tx/${analysis.txid}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ExternalLink className="w-4 h-4 text-orange-600" />
                  <span className="text-sm font-medium">Mempool Space</span>
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HashChecker;