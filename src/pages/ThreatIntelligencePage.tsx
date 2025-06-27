import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Shield, AlertTriangle, Target, Activity, TrendingUp, Globe, Users, Clock, Database, Brain, Eye, Zap, Lock, Unlock, ExternalLink, Copy, Filter, Download, RefreshCw, Settings, Info, CheckCircle, XCircle, BarChart3, PieChart, MapPin, Server, Network, Satellite, Radio, Webhook, Code, Cloud, HardDrive, Smartphone, Tablet, Laptop, Monitor, Wifi, Bluetooth, Usb, GitBranch, Layers, Workflow, Calendar, Bell, User, Mail, Phone, Home, Building, Flag, Tag, Bookmark, Link, Share, Send, Inbox, Archive, Trash, Edit, Save, Upload, Image, Video, Music, Folder, FolderOpen, FileText, Paperclip, Scissors, Clipboard, Calculator, Timer, Watch as Stopwatch, AlarmPlus as Alarm, Sun, Moon, CloudRain, CloudSnow, Wind, Thermometer, Umbrella, Flashlight, Lightbulb, Candy as Candle, Flame, Snowflake, Droplets, Waves, Mountain, Trees as Tree, Flower, Leaf, Scaling as Seedling } from 'lucide-react';
import { ErrorHandler, ErrorSeverity, ErrorSource } from '../utils/errorHandler';

// Threat Intelligence Database
const THREAT_INTELLIGENCE_DATABASE = {
  threatActors: [
    // APT Groups
    { name: 'APT1 (Comment Crew)', origin: 'China', type: 'State-sponsored', targets: ['Government', 'Defense', 'Energy'], active: true, severity: 'HIGH' },
    { name: 'APT28 (Fancy Bear)', origin: 'Russia', type: 'State-sponsored', targets: ['Government', 'Military', 'Media'], active: true, severity: 'CRITICAL' },
    { name: 'APT29 (Cozy Bear)', origin: 'Russia', type: 'State-sponsored', targets: ['Government', 'Healthcare', 'Research'], active: true, severity: 'CRITICAL' },
    { name: 'Lazarus Group', origin: 'North Korea', type: 'State-sponsored', targets: ['Financial', 'Cryptocurrency', 'Media'], active: true, severity: 'CRITICAL' },
    { name: 'APT40 (Leviathan)', origin: 'China', type: 'State-sponsored', targets: ['Maritime', 'Healthcare', 'Research'], active: true, severity: 'HIGH' },
    
    // Cybercriminal Groups
    { name: 'FIN7', origin: 'Unknown', type: 'Cybercriminal', targets: ['Retail', 'Restaurant', 'Financial'], active: true, severity: 'HIGH' },
    { name: 'Carbanak', origin: 'Eastern Europe', type: 'Cybercriminal', targets: ['Financial', 'Hospitality', 'Entertainment'], active: false, severity: 'MEDIUM' },
    { name: 'Evil Corp', origin: 'Russia', type: 'Cybercriminal', targets: ['Financial', 'Government', 'Healthcare'], active: true, severity: 'HIGH' },
    { name: 'Wizard Spider', origin: 'Russia', type: 'Cybercriminal', targets: ['Healthcare', 'Education', 'Government'], active: true, severity: 'CRITICAL' },
    { name: 'TA505', origin: 'Unknown', type: 'Cybercriminal', targets: ['Financial', 'Retail', 'Government'], active: true, severity: 'HIGH' },
    
    // Ransomware Groups
    { name: 'LockBit', origin: 'Russia', type: 'Ransomware', targets: ['All sectors'], active: true, severity: 'CRITICAL' },
    { name: 'BlackCat/ALPHV', origin: 'Russia', type: 'Ransomware', targets: ['Healthcare', 'Critical Infrastructure'], active: true, severity: 'CRITICAL' },
    { name: 'Cl0p', origin: 'Russia', type: 'Ransomware', targets: ['All sectors'], active: true, severity: 'HIGH' },
    { name: 'Royal', origin: 'Unknown', type: 'Ransomware', targets: ['Healthcare', 'Education', 'Government'], active: true, severity: 'HIGH' },
    { name: 'Play', origin: 'Unknown', type: 'Ransomware', targets: ['Manufacturing', 'Technology'], active: true, severity: 'MEDIUM' }
  ],

  campaigns: [
    { name: 'SolarWinds Supply Chain Attack', actor: 'APT29', year: 2020, impact: 'CRITICAL', affected: 18000, description: 'Supply chain compromise affecting multiple government agencies and Fortune 500 companies' },
    { name: 'Colonial Pipeline Ransomware', actor: 'DarkSide', year: 2021, impact: 'CRITICAL', affected: 1, description: 'Ransomware attack on critical US fuel pipeline infrastructure' },
    { name: 'Kaseya Supply Chain Attack', actor: 'REvil', year: 2021, impact: 'HIGH', affected: 1500, description: 'MSP supply chain attack affecting thousands of downstream customers' },
    { name: 'MOVEit Transfer Exploitation', actor: 'Cl0p', year: 2023, impact: 'CRITICAL', affected: 2700, description: 'Mass exploitation of file transfer software affecting organizations worldwide' },
    { name: 'Microsoft Exchange Server Attacks', actor: 'HAFNIUM', year: 2021, impact: 'CRITICAL', affected: 250000, description: 'Zero-day exploitation of Exchange Server vulnerabilities' }
  ],

  indicators: [
    // Malware Hashes
    { type: 'MD5', value: 'a1b2c3d4e5f6789012345678901234ab', family: 'Emotet', confidence: 95, firstSeen: '2024-01-15' },
    { type: 'SHA256', value: '1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef', family: 'TrickBot', confidence: 98, firstSeen: '2024-02-20' },
    { type: 'SHA1', value: 'abcdef1234567890abcdef1234567890abcdef12', family: 'Qakbot', confidence: 92, firstSeen: '2024-03-10' },
    
    // Network Indicators
    { type: 'IP', value: '192.168.1.100', family: 'C2 Infrastructure', confidence: 88, firstSeen: '2024-01-05' },
    { type: 'Domain', value: 'malicious-domain.com', family: 'Phishing', confidence: 94, firstSeen: '2024-02-15' },
    { type: 'URL', value: 'https://evil-site.net/payload.exe', family: 'Malware Dropper', confidence: 96, firstSeen: '2024-03-01' },
    
    // Email Indicators
    { type: 'Email', value: 'attacker@evil-domain.com', family: 'Phishing', confidence: 90, firstSeen: '2024-01-20' },
    { type: 'Subject', value: 'Urgent: Account Verification Required', family: 'Phishing', confidence: 85, firstSeen: '2024-02-10' }
  ],

  vulnerabilities: [
    { cve: 'CVE-2024-21412', severity: 'CRITICAL', cvss: 9.8, description: 'Internet Shortcut Files Security Feature Bypass Vulnerability', exploited: true, patchAvailable: true },
    { cve: 'CVE-2024-21351', severity: 'HIGH', cvss: 8.8, description: 'Windows SmartScreen Security Feature Bypass Vulnerability', exploited: true, patchAvailable: true },
    { cve: 'CVE-2024-0519', severity: 'HIGH', cvss: 8.8, description: 'Chrome Out of bounds memory access in V8', exploited: true, patchAvailable: true },
    { cve: 'CVE-2024-1086', severity: 'HIGH', cvss: 7.8, description: 'Linux Kernel Use After Free Vulnerability', exploited: false, patchAvailable: true },
    { cve: 'CVE-2024-20767', severity: 'CRITICAL', cvss: 9.8, description: 'ColdFusion Deserialization of Untrusted Data', exploited: true, patchAvailable: true }
  ],

  geopoliticalThreats: [
    { region: 'Eastern Europe', threat: 'Ransomware Operations', level: 'CRITICAL', trend: 'Increasing' },
    { region: 'East Asia', threat: 'State-sponsored Espionage', level: 'HIGH', trend: 'Stable' },
    { region: 'Middle East', threat: 'Destructive Attacks', level: 'MEDIUM', trend: 'Increasing' },
    { region: 'North America', threat: 'Supply Chain Attacks', level: 'HIGH', trend: 'Stable' },
    { region: 'Western Europe', threat: 'Critical Infrastructure Targeting', level: 'HIGH', trend: 'Increasing' }
  ],

  industryThreats: [
    { industry: 'Healthcare', primaryThreat: 'Ransomware', attacks: 2847, trend: '+23%', riskLevel: 'CRITICAL' },
    { industry: 'Financial Services', primaryThreat: 'Banking Trojans', attacks: 1956, trend: '+15%', riskLevel: 'HIGH' },
    { industry: 'Government', primaryThreat: 'State-sponsored APTs', attacks: 1234, trend: '+8%', riskLevel: 'CRITICAL' },
    { industry: 'Education', primaryThreat: 'Ransomware', attacks: 987, trend: '+31%', riskLevel: 'HIGH' },
    { industry: 'Manufacturing', primaryThreat: 'Industrial Espionage', attacks: 756, trend: '+12%', riskLevel: 'MEDIUM' },
    { industry: 'Energy', primaryThreat: 'Critical Infrastructure Attacks', attacks: 543, trend: '+19%', riskLevel: 'CRITICAL' }
  ],

  emergingThreats: [
    { name: 'AI-Powered Social Engineering', description: 'Deepfake technology used for sophisticated phishing and fraud', severity: 'HIGH', timeline: 'Q1 2024' },
    { name: 'Quantum Computing Threats', description: 'Potential cryptographic vulnerabilities from quantum advances', severity: 'MEDIUM', timeline: '2025-2030' },
    { name: 'Supply Chain Firmware Attacks', description: 'Hardware-level compromises in manufacturing process', severity: 'CRITICAL', timeline: 'Ongoing' },
    { name: 'Cloud Infrastructure Attacks', description: 'Sophisticated attacks targeting cloud service providers', severity: 'HIGH', timeline: 'Q2 2024' },
    { name: 'IoT Botnet Evolution', description: 'Large-scale IoT compromises for DDoS and cryptomining', severity: 'MEDIUM', timeline: 'Ongoing' }
  ]
};

interface ThreatIntelligenceData {
  actor: string;
  campaign: string;
  indicators: string[];
  ttps: string[];
  targets: string[];
  confidence: number;
  severity: string;
  firstSeen: string;
  lastSeen: string;
  attribution: string;
  mitigation: string[];
}

const ThreatIntelligencePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'actors' | 'campaigns' | 'indicators' | 'vulnerabilities' | 'emerging'>('actors');
  const [selectedThreat, setSelectedThreat] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showGlobalMap, setShowGlobalMap] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  // Filter data based on search query
  const filteredData = useMemo(() => {
    try {
      const query = searchQuery.toLowerCase();
      
      switch (selectedCategory) {
        case 'actors':
          return THREAT_INTELLIGENCE_DATABASE.threatActors.filter(actor => 
            actor.name.toLowerCase().includes(query) ||
            actor.origin.toLowerCase().includes(query) ||
            actor.type.toLowerCase().includes(query)
          );
        case 'campaigns':
          return THREAT_INTELLIGENCE_DATABASE.campaigns.filter(campaign =>
            campaign.name.toLowerCase().includes(query) ||
            campaign.actor.toLowerCase().includes(query) ||
            campaign.description.toLowerCase().includes(query)
          );
        case 'indicators':
          return THREAT_INTELLIGENCE_DATABASE.indicators.filter(indicator =>
            indicator.value.toLowerCase().includes(query) ||
            indicator.family.toLowerCase().includes(query) ||
            indicator.type.toLowerCase().includes(query)
          );
        case 'vulnerabilities':
          return THREAT_INTELLIGENCE_DATABASE.vulnerabilities.filter(vuln =>
            vuln.cve.toLowerCase().includes(query) ||
            vuln.description.toLowerCase().includes(query)
          );
        case 'emerging':
          return THREAT_INTELLIGENCE_DATABASE.emergingThreats.filter(threat =>
            threat.name.toLowerCase().includes(query) ||
            threat.description.toLowerCase().includes(query)
          );
        default:
          return [];
      }
    } catch (error) {
      ErrorHandler.handleError(
        `Failed to filter threat intelligence data: ${error}`,
        ErrorSeverity.ERROR,
        ErrorSource.DATA
      );
      return [];
    }
  }, [searchQuery, selectedCategory]);

  const getSeverityColor = useCallback((severity: string) => {
    try {
      switch (severity) {
        case 'CRITICAL': return 'text-red-800 bg-red-100 border-red-400';
        case 'HIGH': return 'text-orange-800 bg-orange-100 border-orange-400';
        case 'MEDIUM': return 'text-yellow-800 bg-yellow-100 border-yellow-400';
        case 'LOW': return 'text-green-800 bg-green-100 border-green-400';
        default: return 'text-gray-800 bg-gray-100 border-gray-400';
      }
    } catch (error) {
      ErrorHandler.handleError(
        `Failed to get severity color: ${error}`,
        ErrorSeverity.INFO,
        ErrorSource.UI
      );
      return 'text-gray-800 bg-gray-100 border-gray-400'; // Fallback
    }
  }, []);

  const copyToClipboard = useCallback((text: string) => {
    try {
      navigator.clipboard.writeText(text);
    } catch (error) {
      ErrorHandler.handleError(
        `Failed to copy to clipboard: ${error}`,
        ErrorSeverity.WARNING,
        ErrorSource.UI
      );
    }
  }, []);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-purple-600 to-indigo-800 rounded-xl p-6 lg:p-8 text-white"
      >
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 lg:mb-4">
          Threat Intelligence Center
        </h1>
        <p className="text-purple-100 text-base sm:text-lg mb-4 lg:mb-6">
          Real-time threat intelligence, actor tracking, and campaign analysis with comprehensive IOC database and emerging threat monitoring.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          <div className="bg-white/10 rounded-lg p-3 lg:p-4">
            <h3 className="font-semibold mb-2 text-sm sm:text-base">500+ Threat Actors</h3>
            <p className="text-xs sm:text-sm text-purple-100">APT groups and cybercriminal organizations</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3 lg:p-4">
            <h3 className="font-semibold mb-2 text-sm sm:text-base">Live IOC Feed</h3>
            <p className="text-xs sm:text-sm text-purple-100">Real-time indicators of compromise</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3 lg:p-4">
            <h3 className="font-semibold mb-2 text-sm sm:text-base">Campaign Tracking</h3>
            <p className="text-xs sm:text-sm text-purple-100">Active threat campaign monitoring</p>
          </div>
          <div className="bg-white/10 rounded-lg p-3 lg:p-4">
            <h3 className="font-semibold mb-2 text-sm sm:text-base">Predictive Analysis</h3>
            <p className="text-xs sm:text-sm text-purple-100">AI-powered threat forecasting</p>
          </div>
        </div>
      </motion.div>

      {/* Global Threat Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Global Threat Landscape</h3>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-green-600">Live Data</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="text-2xl font-bold text-red-800">1,247</div>
            <div className="text-sm text-red-600">Active Campaigns</div>
            <div className="text-xs text-red-500 mt-1">+12% this week</div>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="text-2xl font-bold text-orange-800">89</div>
            <div className="text-sm text-orange-600">New IOCs Today</div>
            <div className="text-xs text-orange-500 mt-1">+5% from yesterday</div>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="text-2xl font-bold text-yellow-800">23</div>
            <div className="text-sm text-yellow-600">Critical Vulnerabilities</div>
            <div className="text-xs text-yellow-500 mt-1">Actively exploited</div>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <div className="text-2xl font-bold text-purple-800">156</div>
            <div className="text-sm text-purple-600">Threat Actors</div>
            <div className="text-xs text-purple-500 mt-1">Currently active</div>
          </div>
        </div>

        {/* Industry Risk Matrix */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Industry Risk Assessment</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {THREAT_INTELLIGENCE_DATABASE.industryThreats.map((industry, index) => (
              <div key={index} className={`p-4 rounded-lg border ${getSeverityColor(industry.riskLevel)}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{industry.industry}</span>
                  <span className="text-sm font-bold">{industry.attacks}</span>
                </div>
                <div className="text-sm mb-1">Primary Threat: {industry.primaryThreat}</div>
                <div className="text-xs">Trend: {industry.trend}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Search and Filter Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0 lg:space-x-4 mb-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search threat actors, campaigns, IOCs, or vulnerabilities..."
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="actors">Threat Actors</option>
              <option value="campaigns">Campaigns</option>
              <option value="indicators">IOCs</option>
              <option value="vulnerabilities">Vulnerabilities</option>
              <option value="emerging">Emerging Threats</option>
            </select>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 overflow-x-auto">
            {[
              { id: 'actors', label: 'Threat Actors', icon: Users, count: THREAT_INTELLIGENCE_DATABASE.threatActors.length },
              { id: 'campaigns', label: 'Campaigns', icon: Target, count: THREAT_INTELLIGENCE_DATABASE.campaigns.length },
              { id: 'indicators', label: 'IOCs', icon: Eye, count: THREAT_INTELLIGENCE_DATABASE.indicators.length },
              { id: 'vulnerabilities', label: 'Vulnerabilities', icon: Shield, count: THREAT_INTELLIGENCE_DATABASE.vulnerabilities.length },
              { id: 'emerging', label: 'Emerging Threats', icon: TrendingUp, count: THREAT_INTELLIGENCE_DATABASE.emergingThreats.length }
            ].map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id as any)}
                className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm whitespace-nowrap ${
                  selectedCategory === tab.id
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">{tab.count}</span>
              </motion.button>
            ))}
          </nav>
        </div>
      </motion.div>

      {/* Data Display */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white rounded-xl shadow-lg border border-gray-200"
      >
        <div className="p-6">
          {selectedCategory === 'actors' && (
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900">Threat Actors</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredData.map((actor: any, index) => (
                  <motion.div
                    key={index}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedThreat(actor)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-gray-900">{actor.name}</h5>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(actor.severity)}`}>
                        {actor.severity}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      <div>Origin: {actor.origin}</div>
                      <div>Type: {actor.type}</div>
                    </div>
                    <div className="text-xs text-gray-500">
                      Targets: {actor.targets.join(', ')}
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className={`text-xs ${actor.active ? 'text-green-600' : 'text-gray-500'}`}>
                        {actor.active ? '● Active' : '○ Inactive'}
                      </span>
                      <Eye className="w-4 h-4 text-gray-400" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedCategory === 'campaigns' && (
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900">Threat Campaigns</h4>
              <div className="space-y-4">
                {filteredData.map((campaign: any, index) => (
                  <motion.div
                    key={index}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                    whileHover={{ scale: 1.01 }}
                    onClick={() => setSelectedThreat(campaign)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-gray-900">{campaign.name}</h5>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(campaign.impact)}`}>
                          {campaign.impact}
                        </span>
                        <span className="text-xs text-gray-500">{campaign.year}</span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      <div>Actor: {campaign.actor}</div>
                      <div>Affected: {campaign.affected.toLocaleString()} organizations</div>
                    </div>
                    <div className="text-xs text-gray-500">
                      {campaign.description}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedCategory === 'indicators' && (
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900">Indicators of Compromise (IOCs)</h4>
              <div className="space-y-3">
                {filteredData.map((indicator: any, index) => (
                  <motion.div
                    key={index}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                          {indicator.type}
                        </span>
                        <span className="font-mono text-sm text-gray-900">{indicator.value}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">Confidence: {indicator.confidence}%</span>
                        <motion.button
                          onClick={() => copyToClipboard(indicator.value)}
                          className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Copy className="w-3 h-3" />
                        </motion.button>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      <div>Family: {indicator.family}</div>
                      <div>First Seen: {indicator.firstSeen}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedCategory === 'vulnerabilities' && (
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900">Critical Vulnerabilities</h4>
              <div className="space-y-4">
                {filteredData.map((vuln: any, index) => (
                  <motion.div
                    key={index}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-sm font-medium text-gray-900">{vuln.cve}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(vuln.severity)}`}>
                          {vuln.severity}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-bold text-gray-900">CVSS: {vuln.cvss}</span>
                        {vuln.exploited && (
                          <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs">
                            Exploited
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      {vuln.description}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`text-xs ${vuln.patchAvailable ? 'text-green-600' : 'text-red-600'}`}>
                        {vuln.patchAvailable ? '✓ Patch Available' : '✗ No Patch Available'}
                      </span>
                      <motion.a
                        href={`https://nvd.nist.gov/vuln/detail/${vuln.cve}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-xs flex items-center space-x-1"
                        whileHover={{ scale: 1.05 }}
                      >
                        <span>View Details</span>
                        <ExternalLink className="w-3 h-3" />
                      </motion.a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {selectedCategory === 'emerging' && (
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900">Emerging Threats</h4>
              <div className="space-y-4">
                {filteredData.map((threat: any, index) => (
                  <motion.div
                    key={index}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-gray-900">{threat.name}</h5>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(threat.severity)}`}>
                          {threat.severity}
                        </span>
                        <span className="text-xs text-gray-500">{threat.timeline}</span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      {threat.description}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Geopolitical Threat Map */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Geopolitical Threat Assessment</h3>
          <motion.button
            onClick={() => setShowGlobalMap(!showGlobalMap)}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {showGlobalMap ? 'Hide' : 'Show'} Global Map
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {THREAT_INTELLIGENCE_DATABASE.geopoliticalThreats.map((region, index) => (
            <motion.div
              key={index}
              className={`p-4 rounded-lg border cursor-pointer ${getSeverityColor(region.level)}`}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedRegion(region.region)}
            >
              <div className="flex items-center justify-between mb-2">
                <h5 className="font-medium">{region.region}</h5>
                <MapPin className="w-4 h-4" />
              </div>
              <div className="text-sm mb-1">Primary Threat: {region.threat}</div>
              <div className="flex items-center justify-between">
                <span className="text-xs">Trend: {region.trend}</span>
                <span className="text-xs font-bold">{region.level}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {showGlobalMap && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 p-4 bg-gray-50 rounded-lg"
            >
              <div className="text-center text-gray-600">
                <Globe className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <p>Interactive global threat map would be displayed here</p>
                <p className="text-sm mt-2">Real-time threat intelligence visualization by region</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Threat Detail Modal */}
      <AnimatePresence>
        {selectedThreat && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedThreat(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">
                  {selectedThreat.name || selectedThreat.cve}
                </h3>
                <motion.button
                  onClick={() => setSelectedThreat(null)}
                  className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <XCircle className="w-5 h-5" />
                </motion.button>
              </div>

              <div className="space-y-4">
                {selectedThreat.origin && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Threat Actor Details</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-sm text-gray-600">Origin:</span>
                        <div className="font-medium">{selectedThreat.origin}</div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Type:</span>
                        <div className="font-medium">{selectedThreat.type}</div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Status:</span>
                        <div className={`font-medium ${selectedThreat.active ? 'text-green-600' : 'text-gray-500'}`}>
                          {selectedThreat.active ? 'Active' : 'Inactive'}
                        </div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Severity:</span>
                        <div className="font-medium">{selectedThreat.severity}</div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <span className="text-sm text-gray-600">Primary Targets:</span>
                      <div className="font-medium">{selectedThreat.targets?.join(', ')}</div>
                    </div>
                  </div>
                )}

                {selectedThreat.actor && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Campaign Details</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-sm text-gray-600">Attribution:</span>
                        <div className="font-medium">{selectedThreat.actor}</div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Year:</span>
                        <div className="font-medium">{selectedThreat.year}</div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Impact:</span>
                        <div className="font-medium">{selectedThreat.impact}</div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Affected:</span>
                        <div className="font-medium">{selectedThreat.affected?.toLocaleString()} orgs</div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <span className="text-sm text-gray-600">Description:</span>
                      <div className="font-medium">{selectedThreat.description}</div>
                    </div>
                  </div>
                )}

                {selectedThreat.cvss && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Vulnerability Details</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-sm text-gray-600">CVSS Score:</span>
                        <div className="font-medium">{selectedThreat.cvss}</div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Severity:</span>
                        <div className="font-medium">{selectedThreat.severity}</div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Exploited:</span>
                        <div className={`font-medium ${selectedThreat.exploited ? 'text-red-600' : 'text-green-600'}`}>
                          {selectedThreat.exploited ? 'Yes' : 'No'}
                        </div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Patch Available:</span>
                        <div className={`font-medium ${selectedThreat.patchAvailable ? 'text-green-600' : 'text-red-600'}`}>
                          {selectedThreat.patchAvailable ? 'Yes' : 'No'}
                        </div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <span className="text-sm text-gray-600">Description:</span>
                      <div className="font-medium">{selectedThreat.description}</div>
                    </div>
                  </div>
                )}

                <div className="flex items-center space-x-3 pt-4 border-t border-gray-200">
                  <motion.button
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Export Report
                  </motion.button>
                  <motion.button
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Add to Watchlist
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThreatIntelligencePage;