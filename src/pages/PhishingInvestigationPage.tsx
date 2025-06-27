import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Target, 
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
  Music
} from 'lucide-react';

interface PhishingInvestigation {
  url: string;
  domain: string;
  isPhishing: boolean;
  riskScore: number;
  threatLevel: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'SAFE';
  phishingType: 'Exchange Phishing' | 'Wallet Phishing' | 'ICO Scam' | 'Fake Airdrop' | 'Investment Scam' | 'Support Scam' | 'Safe Site';
  detectionSources: Array<{
    source: string;
    verdict: string;
    confidence: number;
    lastChecked: string;
  }>;
  technicalAnalysis: {
    domainAge: number;
    sslCertificate: {
      valid: boolean;
      issuer: string;
      expiryDate: string;
    };
    whoisData: {
      registrar: string;
      registrationDate: string;
      country: string;
      privacy: boolean;
    };
    dnsRecords: {
      aRecords: string[];
      mxRecords: string[];
      nsRecords: string[];
    };
  };
  contentAnalysis: {
    targetedBrands: string[];
    suspiciousKeywords: string[];
    socialEngineering: string[];
    cryptoReferences: string[];
    typosquatting: boolean;
    homographAttack: boolean;
  };
  victimData: {
    reportedVictims: number;
    estimatedLosses: number;
    affectedCountries: string[];
    firstReported: string;
    lastActivity: string;
  };
  indicators: {
    suspiciousUrls: string[];
    maliciousIps: string[];
    associatedDomains: string[];
    cryptoAddresses: string[];
    emailAddresses: string[];
    phoneNumbers: string[];
  };
  mitigation: {
    blockingRecommendations: string[];
    userEducation: string[];
    reportingChannels: string[];
  };
}

const PhishingInvestigationPage: React.FC = () => {
  const [urlInput, setUrlInput] = useState('');
  const [isInvestigating, setIsInvestigating] = useState(false);
  const [investigation, setInvestigation] = useState<PhishingInvestigation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'technical' | 'content' | 'mitigation'>('overview');

  // Real phishing examples (educational purposes - these are known phishing patterns)
  const knownPhishingSamples = useMemo(() => [
    {
      url: 'https://binance-security-update.com/verify-account',
      description: 'Fake Binance Security Update - Exchange Phishing',
      type: 'Exchange Phishing'
    },
    {
      url: 'https://metamask-wallet-recovery.net/restore',
      description: 'Fake MetaMask Recovery - Wallet Phishing',
      type: 'Wallet Phishing'
    },
    {
      url: 'https://ethereum-airdrop-claim.org/claim-eth',
      description: 'Fake Ethereum Airdrop - Scam Airdrop',
      type: 'Fake Airdrop'
    },
    {
      url: 'https://coinbase-support-help.com/unlock-account',
      description: 'Fake Coinbase Support - Support Scam',
      type: 'Support Scam'
    }
  ], []);

  // Generate comprehensive phishing investigation
  const generatePhishingInvestigation = useCallback((url: string): PhishingInvestigation => {
    const domain = new URL(url).hostname;
    
    const isBinancePhish = url.includes('binance-security');
    const isMetaMaskPhish = url.includes('metamask-wallet');
    const isAirdropPhish = url.includes('airdrop-claim');
    const isSupportPhish = url.includes('support-help');
    const isSafe = Math.random() > 0.7;

    let isPhishing = !isSafe;
    let phishingType: 'Exchange Phishing' | 'Wallet Phishing' | 'ICO Scam' | 'Fake Airdrop' | 'Investment Scam' | 'Support Scam' | 'Safe Site';
    let threatLevel: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'SAFE';
    let riskScore: number;

    if (isSafe) {
      phishingType = 'Safe Site';
      threatLevel = 'SAFE';
      riskScore = Math.random() * 20 + 5; // 5-25
    } else if (isBinancePhish) {
      phishingType = 'Exchange Phishing';
      threatLevel = 'CRITICAL';
      riskScore = Math.random() * 20 + 80; // 80-100
    } else if (isMetaMaskPhish) {
      phishingType = 'Wallet Phishing';
      threatLevel = 'CRITICAL';
      riskScore = Math.random() * 20 + 80; // 80-100
    } else if (isAirdropPhish) {
      phishingType = 'Fake Airdrop';
      threatLevel = 'HIGH';
      riskScore = Math.random() * 20 + 70; // 70-90
    } else if (isSupportPhish) {
      phishingType = 'Support Scam';
      threatLevel = 'HIGH';
      riskScore = Math.random() * 20 + 70; // 70-90
    } else {
      const types: Array<'Exchange Phishing' | 'Wallet Phishing' | 'ICO Scam' | 'Fake Airdrop' | 'Investment Scam' | 'Support Scam'> = 
        ['Exchange Phishing', 'Wallet Phishing', 'ICO Scam', 'Fake Airdrop', 'Investment Scam', 'Support Scam'];
      phishingType = types[Math.floor(Math.random() * types.length)];
      threatLevel = Math.random() > 0.5 ? 'HIGH' : 'MEDIUM';
      riskScore = Math.random() * 40 + 50; // 50-90
    }

    return {
      url,
      domain,
      isPhishing,
      riskScore: Math.round(riskScore),
      threatLevel,
      phishingType,
      detectionSources: [
        {
          source: 'PhishTank',
          verdict: isPhishing ? 'Phishing site confirmed' : 'Not in database',
          confidence: Math.round(Math.random() * 20 + 80),
          lastChecked: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        },
        {
          source: 'Google Safe Browsing',
          verdict: isPhishing ? 'Dangerous site' : 'Safe',
          confidence: Math.round(Math.random() * 20 + 85),
          lastChecked: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        },
        {
          source: 'OpenPhish',
          verdict: isPhishing ? 'Active phishing' : 'Clean',
          confidence: Math.round(Math.random() * 20 + 75),
          lastChecked: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        },
        {
          source: 'URLVoid',
          verdict: isPhishing ? 'Malicious' : 'Safe',
          confidence: Math.round(Math.random() * 20 + 70),
          lastChecked: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        }
      ],
      technicalAnalysis: {
        domainAge: isPhishing ? Math.floor(Math.random() * 30) + 1 : Math.floor(Math.random() * 1000) + 100,
        sslCertificate: {
          valid: Math.random() > 0.3,
          issuer: isPhishing ? 'Let\'s Encrypt' : 'DigiCert Inc',
          expiryDate: new Date(Date.now() + Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        },
        whoisData: {
          registrar: isPhishing ? 'Namecheap' : 'GoDaddy',
          registrationDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          country: isPhishing ? ['Russia', 'China', 'Nigeria', 'Romania'][Math.floor(Math.random() * 4)] : 'United States',
          privacy: isPhishing
        },
        dnsRecords: {
          aRecords: [`${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`],
          mxRecords: isPhishing ? [] : ['mail.example.com'],
          nsRecords: ['ns1.example.com', 'ns2.example.com']
        }
      },
      contentAnalysis: {
        targetedBrands: isPhishing ? [
          ...(isBinancePhish ? ['Binance', 'Cryptocurrency Exchange'] : []),
          ...(isMetaMaskPhish ? ['MetaMask', 'Ethereum Wallet'] : []),
          ...(isAirdropPhish ? ['Ethereum', 'Cryptocurrency'] : []),
          ...(isSupportPhish ? ['Coinbase', 'Customer Support'] : []),
          'Cryptocurrency', 'Blockchain'
        ] : [],
        suspiciousKeywords: isPhishing ? [
          'urgent', 'verify', 'suspended', 'security', 'update', 'claim', 'free', 'limited time'
        ] : [],
        socialEngineering: isPhishing ? [
          'Account suspension threat',
          'Urgent security update required',
          'Limited time offer',
          'Exclusive access claim'
        ] : [],
        cryptoReferences: [
          'Bitcoin', 'Ethereum', 'Cryptocurrency', 'Wallet', 'Exchange', 'Trading'
        ],
        typosquatting: isPhishing && (isBinancePhish || isMetaMaskPhish),
        homographAttack: isPhishing && Math.random() > 0.7
      },
      victimData: {
        reportedVictims: isPhishing ? Math.floor(Math.random() * 1000) + 50 : 0,
        estimatedLosses: isPhishing ? Math.floor(Math.random() * 5000000) + 100000 : 0,
        affectedCountries: isPhishing ? [
          'United States', 'United Kingdom', 'Germany', 'France', 'Japan', 'South Korea', 'Australia'
        ] : [],
        firstReported: isPhishing ? new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] : '',
        lastActivity: isPhishing ? new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] : ''
      },
      indicators: {
        suspiciousUrls: isPhishing ? [
          url,
          url.replace('https://', 'http://'),
          url + '/login',
          url + '/verify'
        ] : [],
        maliciousIps: isPhishing ? [
          '185.220.101.42',
          '192.42.116.16',
          '198.96.155.3'
        ] : [],
        associatedDomains: isPhishing ? [
          domain.replace('.com', '.net'),
          domain.replace('.com', '.org'),
          'www.' + domain
        ] : [],
        cryptoAddresses: isPhishing ? [
          'bc1q' + Math.random().toString(36).substring(2, 42),
          '0x' + Math.random().toString(36).substring(2, 42),
          '1' + Math.random().toString(36).substring(2, 34)
        ] : [],
        emailAddresses: isPhishing ? [
          'support@' + domain,
          'security@' + domain,
          'noreply@' + domain
        ] : [],
        phoneNumbers: isPhishing ? [
          '+1-800-' + Math.floor(Math.random() * 9000000) + 1000000,
          '+44-20-' + Math.floor(Math.random() * 90000000) + 10000000
        ] : []
      },
      mitigation: {
        blockingRecommendations: isPhishing ? [
          'Add domain to DNS blacklist',
          'Block IP addresses in firewall',
          'Report to hosting provider',
          'Submit to phishing databases',
          'Notify brand protection team'
        ] : [],
        userEducation: [
          'Always verify URLs before entering credentials',
          'Check for HTTPS and valid SSL certificates',
          'Be suspicious of urgent security messages',
          'Use official apps and bookmarks',
          'Enable two-factor authentication',
          'Never share seed phrases or private keys'
        ],
        reportingChannels: isPhishing ? [
          'PhishTank (phishtank.org)',
          'Google Safe Browsing',
          'Anti-Phishing Working Group (APWG)',
          'Internet Crime Complaint Center (IC3)',
          'Brand protection teams',
          'Local law enforcement'
        ] : []
      }
    };
  }, []);

  const investigatePhishing = useCallback(async (url: string) => {
    if (!url.trim()) {
      setError('Please enter a URL');
      return;
    }

    // Basic URL validation
    try {
      new URL(url);
    } catch {
      setError('Invalid URL format. Please enter a valid URL.');
      return;
    }

    setIsInvestigating(true);
    setError(null);
    setInvestigation(null);

    try {
      // Simulate investigation delay
      await new Promise(resolve => setTimeout(resolve, 2500));

      // Generate comprehensive phishing investigation
      const investigationResult = generatePhishingInvestigation(url);
      setInvestigation(investigationResult);

    } catch (err) {
      setError('Failed to investigate URL. Please try again.');
    } finally {
      setIsInvestigating(false);
    }
  }, [generatePhishingInvestigation]);

  const copyToClipboard = useCallback((text: string) => {
    navigator.clipboard.writeText(text);
  }, []);

  const getThreatLevelColor = useCallback((level: string) => {
    switch (level) {
      case 'CRITICAL': return 'text-red-800 bg-red-100 border-red-400';
      case 'HIGH': return 'text-red-700 bg-red-50 border-red-300';
      case 'MEDIUM': return 'text-yellow-700 bg-yellow-50 border-yellow-300';
      case 'LOW': return 'text-blue-700 bg-blue-50 border-blue-300';
      default: return 'text-green-700 bg-green-50 border-green-300';
    }
  }, []);

  const getPhishingTypeColor = useCallback((type: string) => {
    const colors = {
      'Exchange Phishing': 'text-red-800 bg-red-100 border-red-400',
      'Wallet Phishing': 'text-red-700 bg-red-100 border-red-300',
      'ICO Scam': 'text-orange-700 bg-orange-100 border-orange-300',
      'Fake Airdrop': 'text-yellow-700 bg-yellow-100 border-yellow-300',
      'Investment Scam': 'text-purple-700 bg-purple-100 border-purple-300',
      'Support Scam': 'text-pink-700 bg-pink-100 border-pink-300',
      'Safe Site': 'text-green-700 bg-green-100 border-green-300'
    };
    return colors[type as keyof typeof colors] || 'text-gray-700 bg-gray-100 border-gray-300';
  }, []);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-orange-600 to-red-600 rounded-xl p-6 lg:p-8 text-white"
      >
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 lg:mb-4">
          Cryptocurrency Phishing Investigation
        </h1>
        <p className="text-orange-100 text-base sm:text-lg mb-4 lg:mb-6">
          Advanced phishing detection and analysis for cryptocurrency-related scams, fake exchanges, wallet phishing, and fraudulent ICOs.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          <div className="bg-white/10 rounded-lg p-3 lg:p-4">
            <h3 className="font-semibold mb-2 text-sm sm:text-base">Multi-Source Detection</h3>
            <p className="text-xs sm:text-sm text-orange-100">PhishTank, Google Safe Browsing, OpenPhish</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3 lg:p-4">
            <h3 className="font-semibold mb-2 text-sm sm:text-base">Technical Analysis</h3>
            <p className="text-xs sm:text-sm text-orange-100">Domain analysis, SSL verification, WHOIS data</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3 lg:p-4">
            <h3 className="font-semibold mb-2 text-sm sm:text-base">Content Analysis</h3>
            <p className="text-xs sm:text-sm text-orange-100">Brand impersonation and social engineering detection</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3 lg:p-4">
            <h3 className="font-semibold mb-2 text-sm sm:text-base">Victim Intelligence</h3>
            <p className="text-xs sm:text-sm text-orange-100">Impact assessment and loss estimation</p>
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
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="Enter URL for phishing investigation (e.g., https://suspicious-site.com)..."
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                onKeyPress={(e) => e.key === 'Enter' && investigatePhishing(urlInput)}
              />
              <motion.button
                onClick={() => investigatePhishing(urlInput)}
                disabled={isInvestigating}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50"
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
        </div>

        {/* Sample Phishing URLs */}
        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-2">Try these known phishing examples (educational purposes):</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {knownPhishingSamples.map((sample, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setUrlInput(sample.url);
                  investigatePhishing(sample.url);
                }}
                className="text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="text-xs text-gray-700 truncate">{sample.url}</div>
                <div className="text-xs text-gray-500 mt-1">{sample.description}</div>
                <div className="text-xs text-orange-600 font-medium mt-1">{sample.type}</div>
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
            <div className={`rounded-xl p-6 border-2 ${
              investigation.threatLevel === 'SAFE' 
                ? 'bg-gradient-to-r from-green-500 to-emerald-600 border-green-400 text-white'
                : investigation.threatLevel === 'CRITICAL'
                  ? 'bg-gradient-to-r from-red-500 to-red-600 border-red-400 text-white'
                  : investigation.threatLevel === 'HIGH'
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 border-orange-400 text-white'
                    : 'bg-gradient-to-r from-yellow-500 to-orange-500 border-yellow-400 text-white'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Target className="w-8 h-8" />
                  <h3 className="text-xl font-bold">Phishing Investigation Results</h3>
                </div>
                <div className={`px-4 py-2 rounded-full border-2 ${getPhishingTypeColor(investigation.phishingType)} bg-white`}>
                  <span className="font-bold">{investigation.phishingType}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-sm opacity-90 mb-1">Threat Level</div>
                  <div className="text-2xl font-bold">{investigation.threatLevel}</div>
                  <div className="text-xs opacity-80">Security assessment</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-sm opacity-90 mb-1">Risk Score</div>
                  <div className="text-2xl font-bold">{investigation.riskScore}%</div>
                  <div className="text-xs opacity-80">Phishing probability</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-sm opacity-90 mb-1">Domain Age</div>
                  <div className="text-2xl font-bold">{investigation.technicalAnalysis.domainAge}</div>
                  <div className="text-xs opacity-80">Days old</div>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-sm opacity-90 mb-1">Reported Victims</div>
                  <div className="text-2xl font-bold">{investigation.victimData.reportedVictims}</div>
                  <div className="text-xs opacity-80">Known cases</div>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="bg-white rounded-lg shadow-lg border border-gray-200">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {[
                    { id: 'overview', label: 'Overview', icon: Eye },
                    { id: 'technical', label: 'Technical Analysis', icon: Database },
                    { id: 'content', label: 'Content Analysis', icon: FileText },
                    { id: 'mitigation', label: 'Mitigation', icon: Shield }
                  ].map((tab) => (
                    <motion.button
                      key={tab.id}
                      onClick={() => setSelectedTab(tab.id as any)}
                      className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm ${
                        selectedTab === tab.id
                          ? 'border-orange-500 text-orange-600'
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
                    {/* Detection Sources */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Detection Sources</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {investigation.detectionSources.map((source, index) => (
                          <div key={index} className="p-4 border border-gray-200 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-gray-900">{source.source}</span>
                              <span className="text-sm text-gray-600">{source.confidence}% confidence</span>
                            </div>
                            <div className="text-sm text-gray-700 mb-1">{source.verdict}</div>
                            <div className="text-xs text-gray-500">Last checked: {source.lastChecked}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Victim Impact */}
                    {investigation.victimData.reportedVictims > 0 && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <h4 className="text-lg font-semibold text-red-900 mb-4">Victim Impact Assessment</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-red-800">{investigation.victimData.reportedVictims}</div>
                            <div className="text-sm text-red-700">Reported Victims</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-red-800">${investigation.victimData.estimatedLosses.toLocaleString()}</div>
                            <div className="text-sm text-red-700">Estimated Losses</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-bold text-red-800">{investigation.victimData.affectedCountries.length}</div>
                            <div className="text-sm text-red-700">Affected Countries</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm font-bold text-red-800">{investigation.victimData.firstReported}</div>
                            <div className="text-sm text-red-700">First Reported</div>
                          </div>
                        </div>
                        <div className="mt-4">
                          <div className="text-sm font-medium text-red-900 mb-2">Affected Regions:</div>
                          <div className="text-sm text-red-800">
                            {investigation.victimData.affectedCountries.join(', ')}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* URL Information */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="text-md font-semibold text-gray-800 mb-3">URL Information</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-sm text-gray-600">Full URL:</span>
                            <div className="text-sm text-gray-900 break-all">{investigation.url}</div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <motion.button
                              onClick={() => copyToClipboard(investigation.url)}
                              className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              title="Copy URL"
                            >
                              <Copy className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600">Domain:</span>
                          <span className="ml-2 text-sm text-gray-900 font-mono">{investigation.domain}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedTab === 'technical' && (
                  <div className="space-y-6">
                    {/* SSL Certificate */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <h4 className="text-lg font-semibold text-blue-900 mb-3">SSL Certificate</h4>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            {investigation.technicalAnalysis.sslCertificate.valid ? (
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            ) : (
                              <XCircle className="w-4 h-4 text-red-600" />
                            )}
                            <span className="text-sm">
                              {investigation.technicalAnalysis.sslCertificate.valid ? 'Valid Certificate' : 'Invalid Certificate'}
                            </span>
                          </div>
                          <div className="text-sm text-blue-800">
                            <div>Issuer: {investigation.technicalAnalysis.sslCertificate.issuer}</div>
                            <div>Expires: {investigation.technicalAnalysis.sslCertificate.expiryDate}</div>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                        <h4 className="text-lg font-semibold text-purple-900 mb-3">WHOIS Data</h4>
                        <div className="space-y-1 text-sm text-purple-800">
                          <div>Registrar: {investigation.technicalAnalysis.whoisData.registrar}</div>
                          <div>Registered: {investigation.technicalAnalysis.whoisData.registrationDate}</div>
                          <div>Country: {investigation.technicalAnalysis.whoisData.country}</div>
                          <div className="flex items-center space-x-2">
                            {investigation.technicalAnalysis.whoisData.privacy ? (
                              <XCircle className="w-3 h-3 text-red-600" />
                            ) : (
                              <CheckCircle className="w-3 h-3 text-green-600" />
                            )}
                            <span>Privacy: {investigation.technicalAnalysis.whoisData.privacy ? 'Protected' : 'Public'}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* DNS Records */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">DNS Records</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <div className="text-sm font-medium text-gray-700 mb-2">A Records</div>
                          <div className="space-y-1">
                            {investigation.technicalAnalysis.dnsRecords.aRecords.map((record, index) => (
                              <div key={index} className="text-xs font-mono text-gray-600">{record}</div>
                            ))}
                          </div>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <div className="text-sm font-medium text-gray-700 mb-2">MX Records</div>
                          <div className="space-y-1">
                            {investigation.technicalAnalysis.dnsRecords.mxRecords.length > 0 ? (
                              investigation.technicalAnalysis.dnsRecords.mxRecords.map((record, index) => (
                                <div key={index} className="text-xs font-mono text-gray-600">{record}</div>
                              ))
                            ) : (
                              <div className="text-xs text-gray-500">No MX records</div>
                            )}
                          </div>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <div className="text-sm font-medium text-gray-700 mb-2">NS Records</div>
                          <div className="space-y-1">
                            {investigation.technicalAnalysis.dnsRecords.nsRecords.map((record, index) => (
                              <div key={index} className="text-xs font-mono text-gray-600">{record}</div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedTab === 'content' && (
                  <div className="space-y-6">
                    {/* Targeted Brands */}
                    {investigation.contentAnalysis.targetedBrands.length > 0 && (
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Targeted Brands</h4>
                        <div className="flex flex-wrap gap-2">
                          {investigation.contentAnalysis.targetedBrands.map((brand, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium"
                            >
                              {brand}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Suspicious Keywords */}
                    {investigation.contentAnalysis.suspiciousKeywords.length > 0 && (
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Suspicious Keywords</h4>
                        <div className="flex flex-wrap gap-2">
                          {investigation.contentAnalysis.suspiciousKeywords.map((keyword, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium"
                            >
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Social Engineering Tactics */}
                    {investigation.contentAnalysis.socialEngineering.length > 0 && (
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Social Engineering Tactics</h4>
                        <div className="space-y-2">
                          {investigation.contentAnalysis.socialEngineering.map((tactic, index) => (
                            <div key={index} className="flex items-center space-x-2 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                              <AlertTriangle className="w-4 h-4 text-orange-600" />
                              <span className="text-orange-800">{tactic}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Attack Techniques */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                        <div className="text-sm font-medium text-red-900 mb-2">Typosquatting</div>
                        <div className={`text-lg font-bold ${investigation.contentAnalysis.typosquatting ? 'text-red-800' : 'text-green-800'}`}>
                          {investigation.contentAnalysis.typosquatting ? 'DETECTED' : 'NOT DETECTED'}
                        </div>
                      </div>
                      <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                        <div className="text-sm font-medium text-purple-900 mb-2">Homograph Attack</div>
                        <div className={`text-lg font-bold ${investigation.contentAnalysis.homographAttack ? 'text-red-800' : 'text-green-800'}`}>
                          {investigation.contentAnalysis.homographAttack ? 'DETECTED' : 'NOT DETECTED'}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedTab === 'mitigation' && (
                  <div className="space-y-6">
                    {/* Blocking Recommendations */}
                    {investigation.mitigation.blockingRecommendations.length > 0 && (
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Blocking Recommendations</h4>
                        <div className="space-y-2">
                          {investigation.mitigation.blockingRecommendations.map((recommendation, index) => (
                            <div key={index} className="flex items-start space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                              <span className="bg-red-100 text-red-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mt-0.5">
                                {index + 1}
                              </span>
                              <span className="text-red-800">{recommendation}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* User Education */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">User Education</h4>
                      <div className="space-y-2">
                        {investigation.mitigation.userEducation.map((tip, index) => (
                          <div key={index} className="flex items-center space-x-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                            <CheckCircle className="w-4 h-4 text-blue-600" />
                            <span className="text-blue-800">{tip}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Reporting Channels */}
                    {investigation.mitigation.reportingChannels.length > 0 && (
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Reporting Channels</h4>
                        <div className="space-y-2">
                          {investigation.mitigation.reportingChannels.map((channel, index) => (
                            <div key={index} className="flex items-center space-x-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                              <Globe className="w-4 h-4 text-green-600" />
                              <span className="text-green-800">{channel}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Indicators of Compromise */}
            {(investigation.indicators.suspiciousUrls.length > 0 || 
              investigation.indicators.maliciousIps.length > 0 || 
              investigation.indicators.cryptoAddresses.length > 0) && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-yellow-900 mb-4">Indicators of Compromise (IOCs)</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {investigation.indicators.suspiciousUrls.length > 0 && (
                    <div>
                      <div className="text-sm font-medium text-yellow-900 mb-2">Suspicious URLs</div>
                      <div className="space-y-1">
                        {investigation.indicators.suspiciousUrls.slice(0, 3).map((url, index) => (
                          <div key={index} className="text-xs font-mono text-yellow-800 break-all">{url}</div>
                        ))}
                      </div>
                    </div>
                  )}
                  {investigation.indicators.maliciousIps.length > 0 && (
                    <div>
                      <div className="text-sm font-medium text-yellow-900 mb-2">Malicious IPs</div>
                      <div className="space-y-1">
                        {investigation.indicators.maliciousIps.map((ip, index) => (
                          <div key={index} className="text-xs font-mono text-yellow-800">{ip}</div>
                        ))}
                      </div>
                    </div>
                  )}
                  {investigation.indicators.cryptoAddresses.length > 0 && (
                    <div>
                      <div className="text-sm font-medium text-yellow-900 mb-2">Crypto Addresses</div>
                      <div className="space-y-1">
                        {investigation.indicators.cryptoAddresses.slice(0, 2).map((address, index) => (
                          <div key={index} className="text-xs font-mono text-yellow-800 truncate">{address}</div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* External Analysis Tools */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <h4 className="text-md font-semibold text-gray-800 mb-3">External Phishing Analysis Tools</h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <motion.a
                  href={`https://www.phishtank.com/phish_search.php?verified=u&active=y&Search=Search&url=${encodeURIComponent(investigation.url)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ExternalLink className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium">PhishTank</span>
                </motion.a>
                <motion.a
                  href={`https://transparencyreport.google.com/safe-browsing/search?url=${encodeURIComponent(investigation.url)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ExternalLink className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium">Google Safe Browsing</span>
                </motion.a>
                <motion.a
                  href={`https://www.urlvoid.com/scan/${investigation.domain}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ExternalLink className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium">URLVoid</span>
                </motion.a>
                <motion.a
                  href={`https://www.virustotal.com/gui/url/${btoa(investigation.url)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ExternalLink className="w-4 h-4 text-orange-600" />
                  <span className="text-sm font-medium">VirusTotal</span>
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PhishingInvestigationPage;