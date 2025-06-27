import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Skull, 
  Search, 
  Shield, 
  AlertTriangle, 
  Database, 
  Activity, 
  Clock, 
  Download, 
  Upload, 
  Eye, 
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
  Crosshair,
  TrendingUp,
  BarChart3
} from 'lucide-react';

interface RansomwareAnalysis {
  hash: string;
  family: string;
  variant: string;
  firstSeen: string;
  lastSeen: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  status: 'Active' | 'Inactive' | 'Declining' | 'Emerging';
  encryptionType: string;
  fileExtensions: string[];
  ransom: {
    amount: number;
    currency: string;
    paymentMethods: string[];
    instructions: string;
  };
  distribution: {
    methods: string[];
    vectors: string[];
    campaigns: string[];
  };
  technicalDetails: {
    persistence: string[];
    c2Servers: string[];
    fileSignatures: string[];
    registryChanges: string[];
    networkIndicators: string[];
  };
  impactAssessment: {
    affectedSectors: string[];
    geographicSpread: string[];
    estimatedVictims: number;
    averageDowntime: number;
    averageCost: number;
  };
  mitigationSteps: {
    prevention: string[];
    detection: string[];
    containment: string[];
    eradication: string[];
    recovery: string[];
  };
  decryptionAvailable: boolean;
  decryptionTools: Array<{
    name: string;
    provider: string;
    url: string;
    effectiveness: number;
    lastUpdated: string;
  }>;
  relatedMalware: string[];
  attribution: {
    group: string;
    confidence: number;
    indicators: string[];
  };
}

const RansomwareAnalysisPage: React.FC = () => {
  const [hashInput, setHashInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<RansomwareAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'technical' | 'impact' | 'mitigation'>('overview');
  const [showDecryptionTools, setShowDecryptionTools] = useState(false);

  // Sample ransomware families for demonstration
  const sampleRansomwareFamilies = useMemo(() => [
    {
      hash: 'a1b2c3d4e5f6789012345678901234567890123456789012345678901234567890',
      name: 'WannaCry (Historical Sample)',
      description: 'May 2017 global ransomware attack',
      type: 'Historical'
    },
    {
      hash: 'b2c3d4e5f6789012345678901234567890123456789012345678901234567890a1',
      name: 'Ryuk (Historical Sample)',
      description: 'Targeted high-value organizations',
      type: 'Historical'
    },
    {
      hash: 'c3d4e5f6789012345678901234567890123456789012345678901234567890a1b2',
      name: 'REvil/Sodinokibi (Historical Sample)',
      description: 'Ransomware-as-a-Service operation',
      type: 'Historical'
    },
    {
      hash: 'd4e5f6789012345678901234567890123456789012345678901234567890a1b2c3',
      name: 'LockBit (Historical Sample)',
      description: 'Enterprise-targeting ransomware',
      type: 'Historical'
    }
  ], []);

  // Generate comprehensive ransomware analysis
  const generateRansomwareAnalysis = useCallback((hash: string): RansomwareAnalysis => {
    const isWannaCry = hash.includes('a1b2c3');
    const isRyuk = hash.includes('b2c3d4');
    const isREvil = hash.includes('c3d4e5');
    const isLockBit = hash.includes('d4e5f6');

    let family: string;
    let variant: string;
    let severity: 'Critical' | 'High' | 'Medium' | 'Low';
    let status: 'Active' | 'Inactive' | 'Declining' | 'Emerging';
    let decryptionAvailable: boolean;

    if (isWannaCry) {
      family = 'WannaCry';
      variant = 'WannaCry 2.0';
      severity = 'Critical';
      status = 'Inactive';
      decryptionAvailable = true;
    } else if (isRyuk) {
      family = 'Ryuk';
      variant = 'Ryuk v2';
      severity = 'Critical';
      status = 'Declining';
      decryptionAvailable = false;
    } else if (isREvil) {
      family = 'REvil/Sodinokibi';
      variant = 'REvil.C';
      severity = 'Critical';
      status = 'Inactive';
      decryptionAvailable = true;
    } else if (isLockBit) {
      family = 'LockBit';
      variant = 'LockBit 3.0';
      severity = 'Critical';
      status = 'Inactive';
      decryptionAvailable = false;
    } else {
      const families = ['Conti', 'BlackCat/ALPHV', 'Hive', 'DarkSide', 'Maze'];
      family = families[Math.floor(Math.random() * families.length)];
      variant = `${family} ${Math.floor(Math.random() * 3) + 1}.0`;
      severity = Math.random() > 0.5 ? 'Critical' : 'High';
      status = Math.random() > 0.7 ? 'Active' : 'Inactive';
      decryptionAvailable = Math.random() > 0.6;
    }

    return {
      hash,
      family,
      variant,
      firstSeen: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      lastSeen: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      severity,
      status,
      encryptionType: ['RSA-2048 + AES-256', 'ChaCha20', 'Salsa20', 'AES-256'][Math.floor(Math.random() * 4)],
      fileExtensions: ['.encrypted', '.locked', '.crypt', '.enc', '.crypted', '.r4nsom'].slice(0, Math.floor(Math.random() * 3) + 1),
      ransom: {
        amount: Math.floor(Math.random() * 50) + 1,
        currency: 'Bitcoin',
        paymentMethods: ['Bitcoin', 'Monero'],
        instructions: 'Victims are instructed to contact attackers via Tor hidden service and pay ransom within 72 hours to receive decryption key.'
      },
      distribution: {
        methods: ['Phishing Emails', 'RDP Exploitation', 'Supply Chain Attack', 'Exploit Kits'].slice(0, Math.floor(Math.random() * 3) + 1),
        vectors: ['Malicious Email Attachments', 'Drive-by Downloads', 'Compromised Credentials'].slice(0, Math.floor(Math.random() * 2) + 1),
        campaigns: ['Operation CryptoLock', 'BlackTech Campaign', 'Eastern European Targeted Attacks'].slice(0, Math.floor(Math.random() * 2) + 1)
      },
      technicalDetails: {
        persistence: ['Registry Run Keys', 'Scheduled Tasks', 'WMI Event Subscription'].slice(0, Math.floor(Math.random() * 2) + 1),
        c2Servers: ['185.212.47.xx', '91.219.236.xx', 'hxxp://ransomware-c2.onion'].slice(0, Math.floor(Math.random() * 2) + 1),
        fileSignatures: ['0x504B0304', '0x4D5A9000', '0x7F454C46'].slice(0, Math.floor(Math.random() * 2) + 1),
        registryChanges: ['HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run', 'HKLM\\SYSTEM\\CurrentControlSet\\Services'].slice(0, Math.floor(Math.random() * 2) + 1),
        networkIndicators: ['DNS requests to dynamic domains', 'Unusual TLS certificate patterns', 'Tor network traffic'].slice(0, Math.floor(Math.random() * 2) + 1)
      },
      impactAssessment: {
        affectedSectors: ['Healthcare', 'Manufacturing', 'Government', 'Education', 'Financial Services'].slice(0, Math.floor(Math.random() * 3) + 2),
        geographicSpread: ['North America', 'Europe', 'Asia Pacific', 'Latin America'].slice(0, Math.floor(Math.random() * 3) + 1),
        estimatedVictims: Math.floor(Math.random() * 10000) + 100,
        averageDowntime: Math.floor(Math.random() * 20) + 3, // days
        averageCost: Math.floor(Math.random() * 1000000) + 100000 // dollars
      },
      mitigationSteps: {
        prevention: [
          'Implement robust backup strategy (3-2-1 rule)',
          'Keep systems and software updated',
          'Use email filtering and security awareness training',
          'Implement application whitelisting',
          'Deploy EDR/XDR solutions'
        ],
        detection: [
          'Monitor for suspicious encryption activity',
          'Watch for unusual file system activity',
          'Deploy ransomware canary files',
          'Implement behavioral analysis tools',
          'Monitor for known IOCs'
        ],
        containment: [
          'Isolate infected systems immediately',
          'Disable network shares',
          'Shut down vulnerable systems',
          'Block known C2 domains/IPs',
          'Preserve forensic evidence'
        ],
        eradication: [
          'Identify and remove malware artifacts',
          'Reset compromised credentials',
          'Patch exploited vulnerabilities',
          'Scan for persistent threats',
          'Verify complete removal'
        ],
        recovery: [
          'Restore from clean backups',
          'Implement phased recovery plan',
          'Verify data integrity',
          'Monitor for reinfection',
          'Document lessons learned'
        ]
      },
      decryptionAvailable,
      decryptionTools: decryptionAvailable ? [
        {
          name: `${family} Decryptor`,
          provider: 'No More Ransom Project',
          url: 'https://www.nomoreransom.org',
          effectiveness: Math.floor(Math.random() * 40) + 60, // 60-100%
          lastUpdated: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        },
        {
          name: 'Universal Ransomware Decryptor',
          provider: 'Emsisoft',
          url: 'https://www.emsisoft.com/ransomware-decryption-tools/',
          effectiveness: Math.floor(Math.random() * 30) + 40, // 40-70%
          lastUpdated: new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        }
      ] : [],
      relatedMalware: ['Emotet', 'TrickBot', 'Cobalt Strike', 'Qakbot'].slice(0, Math.floor(Math.random() * 3) + 1),
      attribution: {
        group: ['Wizard Spider', 'GOLD SOUTHFIELD', 'Indrik Spider', 'Pinchy Spider', 'Unknown'][Math.floor(Math.random() * 5)],
        confidence: Math.floor(Math.random() * 50) + 50, // 50-100%
        indicators: ['Code similarities', 'Infrastructure overlap', 'TTPs match known group', 'Ransom note format'].slice(0, Math.floor(Math.random() * 3) + 1)
      }
    };
  }, []);

  const analyzeRansomware = useCallback(async (hash: string) => {
    if (!hash.trim()) {
      setError('Please enter a file hash');
      return;
    }

    // Basic hash validation (SHA-256)
    if (!/^[a-fA-F0-9]{64}$/.test(hash.trim())) {
      setError('Invalid hash format. Please enter a valid SHA-256 hash (64 hexadecimal characters).');
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setAnalysis(null);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Generate comprehensive ransomware analysis
      const analysisResult = generateRansomwareAnalysis(hash);
      setAnalysis(analysisResult);

    } catch (err) {
      setError('Failed to analyze ransomware. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  }, [generateRansomwareAnalysis]);

  const copyToClipboard = useCallback((text: string) => {
    navigator.clipboard.writeText(text);
  }, []);

  const getSeverityColor = useCallback((severity: string) => {
    switch (severity) {
      case 'Critical': return 'text-red-800 bg-red-100 border-red-400';
      case 'High': return 'text-red-700 bg-red-50 border-red-300';
      case 'Medium': return 'text-yellow-700 bg-yellow-50 border-yellow-300';
      case 'Low': return 'text-blue-700 bg-blue-50 border-blue-300';
      default: return 'text-gray-700 bg-gray-100 border-gray-300';
    }
  }, []);

  const getStatusColor = useCallback((status: string) => {
    switch (status) {
      case 'Active': return 'text-red-700 bg-red-100 border-red-300';
      case 'Emerging': return 'text-orange-700 bg-orange-100 border-orange-300';
      case 'Declining': return 'text-yellow-700 bg-yellow-100 border-yellow-300';
      case 'Inactive': return 'text-green-700 bg-green-100 border-green-300';
      default: return 'text-gray-700 bg-gray-100 border-gray-300';
    }
  }, []);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-6 text-white bg-gradient-to-r from-red-600 to-purple-600 rounded-xl lg:p-8"
      >
        <h1 className="mb-3 text-2xl font-bold sm:text-3xl lg:text-4xl lg:mb-4">
          Ransomware Analysis
        </h1>
        <p className="mb-4 text-base text-red-100 sm:text-lg lg:mb-6">
          Comprehensive ransomware analysis, decryption tools, and recovery guidance for security professionals and incident responders.
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          <div className="p-3 rounded-lg bg-white/10 lg:p-4">
            <h3 className="mb-2 text-sm font-semibold sm:text-base">Ransomware Identification</h3>
            <p className="text-xs text-red-100 sm:text-sm">Family classification and variant analysis</p>
          </div>
          <div className="p-3 rounded-lg bg-white/10 lg:p-4">
            <h3 className="mb-2 text-sm font-semibold sm:text-base">Decryption Solutions</h3>
            <p className="text-xs text-red-100 sm:text-sm">Available decryptors and recovery tools</p>
          </div>
          <div className="p-3 rounded-lg bg-white/10 lg:p-4">
            <h3 className="mb-2 text-sm font-semibold sm:text-base">Technical Analysis</h3>
            <p className="text-xs text-red-100 sm:text-sm">IOCs, encryption methods, and TTPs</p>
          </div>
          <div className="p-3 rounded-lg bg-white/10 lg:p-4">
            <h3 className="mb-2 text-sm font-semibold sm:text-base">Incident Response</h3>
            <p className="text-xs text-red-100 sm:text-sm">Containment and recovery guidance</p>
          </div>
        </div>
      </motion.div>

      {/* Search and Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="p-6 bg-white border border-gray-200 shadow-lg rounded-xl"
      >
        <div className="flex flex-col justify-between space-y-4 lg:flex-row lg:items-center lg:space-y-0 lg:space-x-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                value={hashInput}
                onChange={(e) => setHashInput(e.target.value)}
                placeholder="Enter ransomware hash (SHA-256) for analysis..."
                className="w-full px-4 py-3 pr-12 font-mono text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                onKeyPress={(e) => e.key === 'Enter' && analyzeRansomware(hashInput)}
              />
              <motion.button
                onClick={() => analyzeRansomware(hashInput)}
                disabled={isAnalyzing}
                className="absolute p-2 text-white transform -translate-y-1/2 bg-purple-600 rounded-lg right-2 top-1/2 hover:bg-purple-700 disabled:opacity-50"
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
        </div>

        {/* Sample Ransomware Hashes */}
        <div className="mt-4">
          <p className="mb-2 text-sm text-gray-600">Try these historical ransomware samples (educational purposes):</p>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            {sampleRansomwareFamilies.map((sample, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setHashInput(sample.hash);
                  analyzeRansomware(sample.hash);
                }}
                className="p-3 text-left transition-colors border border-gray-200 rounded-lg hover:bg-gray-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="font-mono text-xs text-gray-700 truncate">{sample.hash}</div>
                <div className="mt-1 text-xs text-gray-500">{sample.description}</div>
                <div className="mt-1 text-xs font-medium text-purple-600">{sample.name}</div>
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
          className="p-4 border border-red-200 rounded-lg bg-red-50"
        >
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <span className="font-medium text-red-700">{error}</span>
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
            {/* Ransomware Overview */}
            <div className="p-6 text-white bg-gradient-to-r from-red-500 to-purple-600 rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Skull className="w-8 h-8" />
                  <h3 className="text-xl font-bold">Ransomware Analysis Results</h3>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-4 py-2 rounded-full border-2 ${getSeverityColor(analysis.severity)} bg-white`}>
                    <span className="font-bold">{analysis.severity}</span>
                  </span>
                  <span className={`px-4 py-2 rounded-full border-2 ${getStatusColor(analysis.status)} bg-white`}>
                    <span className="font-bold">{analysis.status}</span>
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="p-4 rounded-lg bg-white/10">
                  <div className="mb-1 text-sm text-red-100">Ransomware Family</div>
                  <div className="text-2xl font-bold">{analysis.family}</div>
                  <div className="text-xs text-red-200">Variant: {analysis.variant}</div>
                </div>
                <div className="p-4 rounded-lg bg-white/10">
                  <div className="mb-1 text-sm text-red-100">Encryption</div>
                  <div className="text-lg font-bold">{analysis.encryptionType}</div>
                  <div className="text-xs text-red-200">
                    Extensions: {analysis.fileExtensions.join(', ')}
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-white/10">
                  <div className="mb-1 text-sm text-red-100">Ransom Demand</div>
                  <div className="text-2xl font-bold">{analysis.ransom.amount} {analysis.ransom.currency}</div>
                  <div className="text-xs text-red-200">
                    Payment: {analysis.ransom.paymentMethods.join(', ')}
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-white/10">
                  <div className="mb-1 text-sm text-red-100">Decryption Available</div>
                  <div className="text-2xl font-bold">{analysis.decryptionAvailable ? 'YES' : 'NO'}</div>
                  <div className="text-xs text-red-200">
                    {analysis.decryptionAvailable 
                      ? `${analysis.decryptionTools.length} tools available` 
                      : 'No known decryption tools'}
                  </div>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-lg">
              <div className="border-b border-gray-200">
                <nav className="flex px-6 space-x-8">
                  {[
                    { id: 'overview', label: 'Overview', icon: Eye },
                    { id: 'technical', label: 'Technical Details', icon: Code },
                    { id: 'impact', label: 'Impact Analysis', icon: Target },
                    { id: 'mitigation', label: 'Mitigation & Recovery', icon: Shield }
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
                    {/* Basic Information */}
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                      <div>
                        <h4 className="mb-4 text-lg font-semibold text-gray-900">Ransomware Information</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                            <span className="text-sm text-gray-600">Family:</span>
                            <span className="font-semibold text-gray-900">{analysis.family}</span>
                          </div>
                          <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                            <span className="text-sm text-gray-600">Variant:</span>
                            <span className="font-semibold text-gray-900">{analysis.variant}</span>
                          </div>
                          <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                            <span className="text-sm text-gray-600">First Seen:</span>
                            <span className="font-semibold text-gray-900">{analysis.firstSeen}</span>
                          </div>
                          <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                            <span className="text-sm text-gray-600">Last Seen:</span>
                            <span className="font-semibold text-gray-900">{analysis.lastSeen}</span>
                          </div>
                          <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                            <span className="text-sm text-gray-600">Encryption:</span>
                            <span className="font-semibold text-gray-900">{analysis.encryptionType}</span>
                          </div>
                          <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                            <span className="text-sm text-gray-600">File Extensions:</span>
                            <span className="font-semibold text-gray-900">{analysis.fileExtensions.join(', ')}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="mb-4 text-lg font-semibold text-gray-900">Distribution Methods</h4>
                        <div className="space-y-3">
                          <div className="p-3 rounded-lg bg-gray-50">
                            <div className="mb-2 text-sm text-gray-600">Primary Vectors:</div>
                            <div className="space-y-1">
                              {analysis.distribution.methods.map((method, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                  <span className="text-sm text-gray-900">{method}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div className="p-3 rounded-lg bg-gray-50">
                            <div className="mb-2 text-sm text-gray-600">Attack Vectors:</div>
                            <div className="space-y-1">
                              {analysis.distribution.vectors.map((vector, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                  <span className="text-sm text-gray-900">{vector}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          {analysis.distribution.campaigns.length > 0 && (
                            <div className="p-3 rounded-lg bg-gray-50">
                              <div className="mb-2 text-sm text-gray-600">Known Campaigns:</div>
                              <div className="space-y-1">
                                {analysis.distribution.campaigns.map((campaign, index) => (
                                  <div key={index} className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    <span className="text-sm text-gray-900">{campaign}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Ransom Details */}
                    <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                      <h4 className="mb-4 text-lg font-semibold text-red-900">Ransom Demand Details</h4>
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-red-800">{analysis.ransom.amount} {analysis.ransom.currency}</div>
                          <div className="text-sm text-red-700">Typical Ransom Amount</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-red-800">{analysis.ransom.paymentMethods.join(', ')}</div>
                          <div className="text-sm text-red-700">Payment Methods</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-red-800">{analysis.impactAssessment.averageDowntime} days</div>
                          <div className="text-sm text-red-700">Average Downtime</div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="mb-2 text-sm font-medium text-red-900">Ransom Note Pattern:</div>
                        <div className="p-3 font-mono text-sm text-red-800 bg-red-100 border border-red-300 rounded-lg">
                          {analysis.ransom.instructions}
                        </div>
                      </div>
                    </div>

                    {/* Attribution */}
                    <div className="p-4 border border-purple-200 rounded-lg bg-purple-50">
                      <h4 className="mb-4 text-lg font-semibold text-purple-900">Threat Actor Attribution</h4>
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div className="text-center">
                          <div className="text-xl font-bold text-purple-800">{analysis.attribution.group}</div>
                          <div className="text-sm text-purple-700">Attributed Group</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xl font-bold text-purple-800">{analysis.attribution.confidence}%</div>
                          <div className="text-sm text-purple-700">Attribution Confidence</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-purple-800">{analysis.relatedMalware.join(', ')}</div>
                          <div className="text-sm text-purple-700">Related Malware</div>
                        </div>
                      </div>
                      {analysis.attribution.indicators.length > 0 && (
                        <div className="mt-4">
                          <div className="mb-2 text-sm font-medium text-purple-900">Attribution Indicators:</div>
                          <div className="space-y-1">
                            {analysis.attribution.indicators.map((indicator, index) => (
                              <div key={index} className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                <span className="text-sm text-purple-800">{indicator}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Hash Information */}
                    <div className="p-4 rounded-lg bg-gray-50">
                      <h4 className="mb-3 font-semibold text-gray-800 text-md">Sample Information</h4>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-sm text-gray-600">SHA-256 Hash:</span>
                          <div className="font-mono text-sm text-gray-900 break-all">{analysis.hash}</div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <motion.button
                            onClick={() => copyToClipboard(analysis.hash)}
                            className="p-2 text-gray-500 transition-colors hover:text-gray-700"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            title="Copy hash"
                          >
                            <Copy className="w-4 h-4" />
                          </motion.button>
                          <motion.a
                            href={`https://www.virustotal.com/gui/file/${analysis.hash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-gray-500 transition-colors hover:text-gray-700"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            title="View on VirusTotal"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </motion.a>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedTab === 'technical' && (
                  <div className="space-y-6">
                    {/* Technical Details */}
                    <div>
                      <h4 className="mb-4 text-lg font-semibold text-gray-900">Technical Analysis</h4>
                      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        <div>
                          <h5 className="mb-3 font-semibold text-gray-800">Persistence Mechanisms</h5>
                          <div className="space-y-2">
                            {analysis.technicalDetails.persistence.map((mechanism, index) => (
                              <div key={index} className="flex items-center p-3 space-x-2 border border-red-200 rounded-lg bg-red-50">
                                <Lock className="w-4 h-4 text-red-600" />
                                <span className="text-red-800">{mechanism}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h5 className="mb-3 font-semibold text-gray-800">Registry Modifications</h5>
                          <div className="space-y-2">
                            {analysis.technicalDetails.registryChanges.map((change, index) => (
                              <div key={index} className="flex items-center p-3 space-x-2 border border-blue-200 rounded-lg bg-blue-50">
                                <Database className="w-4 h-4 text-blue-600" />
                                <span className="font-mono text-sm text-blue-800">{change}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Network Indicators */}
                    <div>
                      <h4 className="mb-4 text-lg font-semibold text-gray-900">Network Indicators</h4>
                      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        <div>
                          <h5 className="mb-3 font-semibold text-gray-800">Command & Control Servers</h5>
                          <div className="space-y-2">
                            {analysis.technicalDetails.c2Servers.map((server, index) => (
                              <div key={index} className="flex items-center p-3 space-x-2 border border-purple-200 rounded-lg bg-purple-50">
                                <Server className="w-4 h-4 text-purple-600" />
                                <span className="font-mono text-sm text-purple-800">{server}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h5 className="mb-3 font-semibold text-gray-800">Network Behavior</h5>
                          <div className="space-y-2">
                            {analysis.technicalDetails.networkIndicators.map((indicator, index) => (
                              <div key={index} className="flex items-center p-3 space-x-2 border border-green-200 rounded-lg bg-green-50">
                                <Network className="w-4 h-4 text-green-600" />
                                <span className="text-green-800">{indicator}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* File Indicators */}
                    <div>
                      <h4 className="mb-4 text-lg font-semibold text-gray-900">File Indicators</h4>
                      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        <div>
                          <h5 className="mb-3 font-semibold text-gray-800">File Signatures</h5>
                          <div className="space-y-2">
                            {analysis.technicalDetails.fileSignatures.map((signature, index) => (
                              <div key={index} className="flex items-center p-3 space-x-2 border border-yellow-200 rounded-lg bg-yellow-50">
                                <FileText className="w-4 h-4 text-yellow-600" />
                                <span className="font-mono text-sm text-yellow-800">{signature}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h5 className="mb-3 font-semibold text-gray-800">Encrypted File Extensions</h5>
                          <div className="flex flex-wrap gap-2">
                            {analysis.fileExtensions.map((ext, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 text-sm font-medium text-red-800 bg-red-100 rounded-full"
                              >
                                {ext}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedTab === 'impact' && (
                  <div className="space-y-6">
                    {/* Impact Assessment */}
                    <div>
                      <h4 className="mb-4 text-lg font-semibold text-gray-900">Impact Assessment</h4>
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                          <div className="mb-2 text-sm font-medium text-red-900">Estimated Victims</div>
                          <div className="text-2xl font-bold text-red-800">{analysis.impactAssessment.estimatedVictims.toLocaleString()}</div>
                        </div>
                        <div className="p-4 border border-orange-200 rounded-lg bg-orange-50">
                          <div className="mb-2 text-sm font-medium text-orange-900">Average Downtime</div>
                          <div className="text-2xl font-bold text-orange-800">{analysis.impactAssessment.averageDowntime} days</div>
                        </div>
                        <div className="p-4 border border-yellow-200 rounded-lg bg-yellow-50">
                          <div className="mb-2 text-sm font-medium text-yellow-900">Average Cost</div>
                          <div className="text-2xl font-bold text-yellow-800">${analysis.impactAssessment.averageCost.toLocaleString()}</div>
                        </div>
                      </div>
                    </div>

                    {/* Affected Sectors */}
                    <div>
                      <h4 className="mb-4 text-lg font-semibold text-gray-900">Affected Sectors</h4>
                      <div className="flex flex-wrap gap-3">
                        {analysis.impactAssessment.affectedSectors.map((sector, index) => (
                          <div key={index} className="p-3 border border-blue-200 rounded-lg bg-blue-50">
                            <div className="font-medium text-blue-900">{sector}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Geographic Spread */}
                    <div>
                      <h4 className="mb-4 text-lg font-semibold text-gray-900">Geographic Distribution</h4>
                      <div className="flex flex-wrap gap-3">
                        {analysis.impactAssessment.geographicSpread.map((region, index) => (
                          <div key={index} className="p-3 border border-green-200 rounded-lg bg-green-50">
                            <div className="font-medium text-green-900">{region}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Decryption Tools */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-semibold text-gray-900">Decryption Availability</h4>
                        <motion.button
                          onClick={() => setShowDecryptionTools(!showDecryptionTools)}
                          className="text-sm text-blue-600 transition-colors hover:text-blue-800"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {showDecryptionTools ? 'Hide Details' : 'Show Details'}
                        </motion.button>
                      </div>
                      
                      <div className={`p-4 rounded-lg ${analysis.decryptionAvailable ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                        <div className="flex items-center mb-3 space-x-2">
                          {analysis.decryptionAvailable ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-600" />
                          )}
                          <span className={`font-medium ${analysis.decryptionAvailable ? 'text-green-900' : 'text-red-900'}`}>
                            {analysis.decryptionAvailable 
                              ? 'Decryption tools are available for this ransomware' 
                              : 'No known decryption tools available at this time'}
                          </span>
                        </div>
                        
                        <AnimatePresence>
                          {showDecryptionTools && analysis.decryptionAvailable && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="space-y-3"
                            >
                              {analysis.decryptionTools.map((tool, index) => (
                                <div key={index} className="p-3 bg-white border border-green-200 rounded-lg">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="font-medium text-gray-900">{tool.name}</span>
                                    <span className="text-sm text-gray-600">Effectiveness: {tool.effectiveness}%</span>
                                  </div>
                                  <div className="mb-2 text-sm text-gray-700">Provider: {tool.provider}</div>
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs text-gray-500">Last Updated: {tool.lastUpdated}</span>
                                    <motion.a
                                      href={tool.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-800"
                                      whileHover={{ scale: 1.05 }}
                                    >
                                      <span>Download</span>
                                      <ExternalLink className="w-3 h-3" />
                                    </motion.a>
                                  </div>
                                </div>
                              ))}
                              
                              <div className="p-3 border border-blue-200 rounded-lg bg-blue-50">
                                <div className="flex items-center mb-2 space-x-2">
                                  <Info className="w-4 h-4 text-blue-600" />
                                  <span className="font-medium text-blue-900">Additional Resources</span>
                                </div>
                                <div className="space-y-2 text-sm text-blue-800">
                                  <div className="flex items-center space-x-2">
                                    <ExternalLink className="w-3 h-3" />
                                    <a 
                                      href="https://www.nomoreransom.org" 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="hover:underline"
                                    >
                                      No More Ransom Project
                                    </a>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <ExternalLink className="w-3 h-3" />
                                    <a 
                                      href="https://www.emsisoft.com/ransomware-decryption-tools/" 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="hover:underline"
                                    >
                                      Emsisoft Decryption Tools
                                    </a>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <ExternalLink className="w-3 h-3" />
                                    <a 
                                      href="https://www.cisa.gov/stopransomware" 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="hover:underline"
                                    >
                                      CISA StopRansomware
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                          
                          {showDecryptionTools && !analysis.decryptionAvailable && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                            >
                              <div className="p-3 mt-3 border border-blue-200 rounded-lg bg-blue-50">
                                <div className="flex items-center mb-2 space-x-2">
                                  <Info className="w-4 h-4 text-blue-600" />
                                  <span className="font-medium text-blue-900">What to do when no decryptor is available</span>
                                </div>
                                <div className="space-y-2 text-sm text-blue-800">
                                  <p>1. Do not pay the ransom unless absolutely necessary - it funds criminal activity and doesn't guarantee recovery</p>
                                  <p>2. Restore from clean backups if available</p>
                                  <p>3. Preserve encrypted files for future decryptors</p>
                                  <p>4. Report to law enforcement</p>
                                  <p>5. Check No More Ransom periodically for new decryption tools</p>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                )}

                {selectedTab === 'mitigation' && (
                  <div className="space-y-6">
                    {/* Prevention */}
                    <div>
                      <h4 className="mb-4 text-lg font-semibold text-gray-900">Prevention Measures</h4>
                      <div className="space-y-2">
                        {analysis.mitigationSteps.prevention.map((step, index) => (
                          <div key={index} className="flex items-center p-3 space-x-2 border border-blue-200 rounded-lg bg-blue-50">
                            <Shield className="w-4 h-4 text-blue-600" />
                            <span className="text-blue-800">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Detection */}
                    <div>
                      <h4 className="mb-4 text-lg font-semibold text-gray-900">Detection Methods</h4>
                      <div className="space-y-2">
                        {analysis.mitigationSteps.detection.map((step, index) => (
                          <div key={index} className="flex items-center p-3 space-x-2 border border-purple-200 rounded-lg bg-purple-50">
                            <Eye className="w-4 h-4 text-purple-600" />
                            <span className="text-purple-800">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Containment & Recovery */}
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                      <div>
                        <h4 className="mb-4 text-lg font-semibold text-gray-900">Containment Steps</h4>
                        <div className="space-y-2">
                          {analysis.mitigationSteps.containment.map((step, index) => (
                            <div key={index} className="flex items-center p-3 space-x-2 border border-red-200 rounded-lg bg-red-50">
                              <Lock className="w-4 h-4 text-red-600" />
                              <span className="text-red-800">{step}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="mb-4 text-lg font-semibold text-gray-900">Recovery Process</h4>
                        <div className="space-y-2">
                          {analysis.mitigationSteps.recovery.map((step, index) => (
                            <div key={index} className="flex items-center p-3 space-x-2 border border-green-200 rounded-lg bg-green-50">
                              <Unlock className="w-4 h-4 text-green-600" />
                              <span className="text-green-800">{step}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Emergency Resources */}
                    <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
                      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        <div>
                          <h4 className="mb-2 font-semibold text-blue-900">📞 Emergency Contacts</h4>
                          <ul className="space-y-1 text-sm text-blue-800">
                            <li>• <strong>FBI IC3:</strong> <a href="https://ic3.gov" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">ic3.gov</a></li>
                            <li>• <strong>CISA:</strong> 1-888-282-0870</li>
                            <li>• <strong>Europol EC3:</strong> +31 70 302 5000</li>
                            <li>• <strong>24/7 Incident Response:</strong> <a href="https://www.cisa.gov/report" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.cisa.gov/report</a></li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="mb-2 font-semibold text-blue-900">🔍 Additional Resources</h4>
                          <ul className="space-y-1 text-sm text-blue-800">
                            <li>• <a href="https://www.nomoreransom.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">No More Ransom Project</a></li>
                            <li>• <a href="https://www.cisa.gov/stopransomware" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">CISA StopRansomware</a></li>
                            <li>• <a href="https://www.ic3.gov/Home/Ransomware" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">FBI Ransomware Guidance</a></li>
                            <li>• <a href="https://www.ncsc.gov.uk/ransomware/home" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">NCSC Ransomware Guidance</a></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* External Analysis Tools */}
            <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
              <h4 className="mb-3 font-semibold text-gray-800 text-md">External Analysis Tools</h4>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
                <motion.a
                  href={`https://www.virustotal.com/gui/file/${analysis.hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-3 space-x-2 transition-colors bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ExternalLink className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium">VirusTotal</span>
                </motion.a>
                <motion.a
                  href="https://www.nomoreransom.org/crypto-sheriff.php"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-3 space-x-2 transition-colors bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ExternalLink className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium">Crypto Sheriff</span>
                </motion.a>
                <motion.a
                  href="https://id-ransomware.malwarehunterteam.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-3 space-x-2 transition-colors bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ExternalLink className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium">ID Ransomware</span>
                </motion.a>
                <motion.a
                  href="https://www.cisa.gov/stopransomware/ransomware-guide"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-3 space-x-2 transition-colors bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ExternalLink className="w-4 h-4 text-red-600" />
                  <span className="text-sm font-medium">CISA Guide</span>
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RansomwareAnalysisPage;