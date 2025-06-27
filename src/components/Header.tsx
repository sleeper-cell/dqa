import React, { useState } from 'react';
import { 
  Shield, 
  Activity, 
  Settings, 
  AlertTriangle, 
  Sun, 
  Moon, 
  X, 
  Palette, 
  Bell, 
  User,
  Search,
  Download,
  Upload,
  Filter,
  Bookmark,
  History,
  HelpCircle,
  Globe,
  Zap,
  Database,
  Key,
  Lock,
  Cpu,
  BarChart3,
  TrendingUp,
  Eye,
  Radar,
  Target,
  Crosshair,
  Layers,
  Network,
  GitBranch,
  Workflow,
  Calendar,
  Clock,
  MapPin,
  Fingerprint,
  Brain,
  Microscope,
  Satellite,
  Radio,
  Webhook,
  Code,
  Server,
  Cloud,
  HardDrive,
  Smartphone,
  Tablet,
  Laptop,
  Monitor as MonitorIcon,
  Tv,
  Watch,
  Headphones,
  Camera,
  Mic,
  Speaker,
  Printer,
  Mouse,
  Keyboard,
  Gamepad2,
  Joystick,
  Headset,
  Webcam,
  Wifi,
  Bluetooth,
  Usb
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  onThemeChange: (themeName: string) => void;
  currentTheme: string;
  riskLevel: number;
}

const Header: React.FC<HeaderProps> = ({ onThemeChange, currentTheme, riskLevel }) => {
  const [showSettings, setShowSettings] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(5);
  const [performanceMode, setPerformanceMode] = useState('balanced');
  const [searchQuery, setSearchQuery] = useState('');

  const getRiskColor = (level: number) => {
    if (level < 30) return 'text-green-500';
    if (level < 70) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getRiskLabel = (level: number) => {
    if (level < 30) return 'LOW RISK';
    if (level < 70) return 'MEDIUM RISK';
    return 'HIGH RISK';
  };

  const toggleTheme = () => {
    onThemeChange(currentTheme === 'white' ? 'dark' : 'white');
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
    setShowQuickActions(false);
  };

  const toggleQuickActions = () => {
    setShowQuickActions(!showQuickActions);
    setShowSettings(false);
  };

  const handleNotificationToggle = () => {
    setNotifications(!notifications);
    if (!notifications) {
      console.log('Notifications enabled');
    }
  };

  const handleAutoRefreshToggle = () => {
    setAutoRefresh(!autoRefresh);
  };

  const handleRefreshIntervalChange = (interval: number) => {
    setRefreshInterval(interval);
  };

  const handlePerformanceModeChange = (mode: string) => {
    setPerformanceMode(mode);
  };

  const quickActions = [
    { icon: Search, label: 'Global Search', action: () => console.log('Global search') },
    { icon: Download, label: 'Export Data', action: () => console.log('Export data') },
    { icon: Upload, label: 'Import Data', action: () => console.log('Import data') },
    { icon: Filter, label: 'Advanced Filters', action: () => console.log('Advanced filters') },
    { icon: Bookmark, label: 'Bookmarks', action: () => console.log('Bookmarks') },
    { icon: History, label: 'Recent Activity', action: () => console.log('Recent activity') }
  ];

  return (
    <>
      <motion.header 
        className="backdrop-blur-sm border-b px-4 sm:px-6 lg:px-8 py-3 lg:py-4 sticky top-0 z-50 transition-colors duration-300"
        style={{ 
          backgroundColor: currentTheme === 'dark' ? 'rgba(30, 41, 59, 0.95)' : 'rgba(255, 255, 255, 0.95)',
          borderColor: currentTheme === 'dark' ? '#374151' : '#e5e7eb'
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-2 lg:space-x-3 min-w-0 flex-1">
            <motion.div
              className="p-1.5 lg:p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Shield className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
            </motion.div>
            <div className="min-w-0">
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold truncate" style={{ color: 'var(--color-text)' }}>
                TX ANALYZER Crypto Forensics
              </h1>
              <p className="text-xs sm:text-sm hidden sm:block" style={{ color: 'var(--color-text-secondary)' }}>
                Professional Blockchain Analysis Platform
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4 lg:space-x-6 flex-shrink-0">
            {/* Global Search */}
            <div className="hidden md:flex relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search transactions, addresses..."
                className="w-64 px-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{
                  backgroundColor: 'var(--color-surface)',
                  borderColor: currentTheme === 'dark' ? '#374151' : '#e5e7eb',
                  color: 'var(--color-text)'
                }}
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>

            {/* Risk Level Indicator */}
            <motion.div 
              className="flex items-center space-x-1 lg:space-x-2 px-2 lg:px-3 py-1 rounded-full"
              style={{ backgroundColor: currentTheme === 'dark' ? '#374151' : '#f3f4f6' }}
              animate={{ scale: riskLevel > 70 ? [1, 1.05, 1] : 1 }}
              transition={{ duration: 0.5, repeat: riskLevel > 70 ? Infinity : 0 }}
            >
              <AlertTriangle className={`w-3 h-3 lg:w-4 lg:h-4 ${getRiskColor(riskLevel)}`} />
              <span className={`text-xs lg:text-sm font-medium ${getRiskColor(riskLevel)} hidden sm:inline`}>
                {getRiskLabel(riskLevel)}
              </span>
              <span className="text-xs lg:text-sm" style={{ color: 'var(--color-text-secondary)' }}>({riskLevel}%)</span>
            </motion.div>

            {/* Quick Actions Button */}
            <motion.button
              onClick={toggleQuickActions}
              className="p-2 rounded-lg transition-colors"
              style={{ 
                backgroundColor: showQuickActions ? 'var(--color-primary)' : (currentTheme === 'dark' ? '#374151' : '#f3f4f6'),
                color: showQuickActions ? 'white' : 'var(--color-text-secondary)'
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Quick Actions"
            >
              <Zap className="w-4 h-4 lg:w-5 lg:h-5" />
            </motion.button>

            {/* Theme Toggle Button */}
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-lg transition-colors"
              style={{ 
                backgroundColor: currentTheme === 'dark' ? '#374151' : '#f3f4f6',
                color: 'var(--color-text)'
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title={`Switch to ${currentTheme === 'white' ? 'dark' : 'light'} theme`}
            >
              {currentTheme === 'white' ? (
                <Moon className="w-4 h-4 lg:w-5 lg:h-5" />
              ) : (
                <Sun className="w-4 h-4 lg:w-5 lg:h-5" />
              )}
            </motion.button>

            {/* Status Indicators */}
            <div className="hidden sm:flex items-center space-x-3 lg:space-x-4">
              <motion.div 
                className="flex items-center space-x-1"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Activity className="w-3 h-3 lg:w-4 lg:h-4 text-green-500" />
                <span className="text-xs lg:text-sm" style={{ color: 'var(--color-text-secondary)' }}>Live</span>
              </motion.div>
              
              {/* Settings Button */}
              <motion.button
                onClick={toggleSettings}
                className="p-1.5 lg:p-2 rounded-lg transition-colors hover:bg-opacity-80"
                style={{ 
                  backgroundColor: showSettings ? 'var(--color-primary)' : (currentTheme === 'dark' ? '#374151' : '#f3f4f6'),
                  color: showSettings ? 'white' : 'var(--color-text-secondary)'
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title="Settings"
              >
                <Settings className="w-4 h-4 lg:w-5 lg:h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Quick Actions Panel */}
      <AnimatePresence>
        {showQuickActions && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setShowQuickActions(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-20 right-4 w-80 z-50 shadow-2xl rounded-xl"
              style={{ 
                backgroundColor: 'var(--color-surface)',
                border: `1px solid ${currentTheme === 'dark' ? '#374151' : '#e5e7eb'}`
              }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold" style={{ color: 'var(--color-text)' }}>Quick Actions</h3>
                  <motion.button
                    onClick={() => setShowQuickActions(false)}
                    className="p-1 rounded-lg transition-colors"
                    style={{ 
                      color: 'var(--color-text-secondary)',
                      backgroundColor: currentTheme === 'dark' ? '#374151' : '#f3f4f6'
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {quickActions.map((action, index) => (
                    <motion.button
                      key={index}
                      onClick={action.action}
                      className="p-3 rounded-lg border transition-colors text-left"
                      style={{
                        backgroundColor: 'var(--color-background)',
                        borderColor: currentTheme === 'dark' ? '#374151' : '#e5e7eb',
                        color: 'var(--color-text)'
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <action.icon className="w-5 h-5 mb-2" style={{ color: 'var(--color-primary)' }} />
                      <div className="text-sm font-medium">{action.label}</div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setShowSettings(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed right-0 top-0 h-full w-80 z-50 shadow-2xl"
              style={{ 
                backgroundColor: 'var(--color-surface)',
                borderLeft: `1px solid ${currentTheme === 'dark' ? '#374151' : '#e5e7eb'}`
              }}
            >
              <div className="p-6 h-full overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <Settings className="w-5 h-5" style={{ color: 'var(--color-primary)' }} />
                    <h2 className="text-lg font-semibold" style={{ color: 'var(--color-text)' }}>Settings</h2>
                  </div>
                  <motion.button
                    onClick={() => setShowSettings(false)}
                    className="p-1 rounded-lg transition-colors"
                    style={{ 
                      color: 'var(--color-text-secondary)',
                      backgroundColor: currentTheme === 'dark' ? '#374151' : '#f3f4f6'
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                </div>

                {/* Theme Settings */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium mb-3 flex items-center space-x-2" style={{ color: 'var(--color-text)' }}>
                    <Palette className="w-4 h-4" />
                    <span>Appearance</span>
                  </h3>
                  <div className="space-y-2">
                    <motion.button
                      onClick={() => onThemeChange('white')}
                      className={`w-full p-3 rounded-lg border text-left transition-colors ${
                        currentTheme === 'white' 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                      style={currentTheme !== 'white' ? {
                        borderColor: currentTheme === 'dark' ? '#374151' : '#e5e7eb',
                        backgroundColor: 'transparent'
                      } : {}}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center space-x-3">
                        <Sun className="w-4 h-4 text-yellow-500" />
                        <div>
                          <div className="font-medium" style={{ color: 'var(--color-text)' }}>Light Theme</div>
                          <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>Clean and bright interface</div>
                        </div>
                      </div>
                    </motion.button>
                    
                    <motion.button
                      onClick={() => onThemeChange('dark')}
                      className={`w-full p-3 rounded-lg border text-left transition-colors ${
                        currentTheme === 'dark' 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                      style={currentTheme !== 'dark' ? {
                        borderColor: currentTheme === 'dark' ? '#374151' : '#e5e7eb',
                        backgroundColor: 'transparent'
                      } : {}}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center space-x-3">
                        <Moon className="w-4 h-4 text-blue-500" />
                        <div>
                          <div className="font-medium" style={{ color: 'var(--color-text)' }}>Dark Theme</div>
                          <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>Easy on the eyes</div>
                        </div>
                      </div>
                    </motion.button>
                  </div>
                </div>

                {/* Performance Settings */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium mb-3 flex items-center space-x-2" style={{ color: 'var(--color-text)' }}>
                    <Cpu className="w-4 h-4" />
                    <span>Performance</span>
                  </h3>
                  <div className="space-y-2">
                    {['high', 'balanced', 'battery'].map((mode) => (
                      <motion.button
                        key={mode}
                        onClick={() => handlePerformanceModeChange(mode)}
                        className={`w-full p-3 rounded-lg border text-left transition-colors ${
                          performanceMode === mode 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 hover:bg-gray-50'
                        }`}
                        style={performanceMode !== mode ? {
                          borderColor: currentTheme === 'dark' ? '#374151' : '#e5e7eb',
                          backgroundColor: 'transparent'
                        } : {}}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="font-medium capitalize" style={{ color: 'var(--color-text)' }}>{mode} Performance</div>
                        <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                          {mode === 'high' && 'Maximum speed and responsiveness'}
                          {mode === 'balanced' && 'Optimal balance of speed and efficiency'}
                          {mode === 'battery' && 'Reduced resource usage'}
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Notifications */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium mb-3 flex items-center space-x-2" style={{ color: 'var(--color-text)' }}>
                    <Bell className="w-4 h-4" />
                    <span>Notifications</span>
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>Security Alerts</div>
                        <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>Get notified of high-risk transactions</div>
                      </div>
                      <motion.button
                        onClick={handleNotificationToggle}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          notifications ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                        whileTap={{ scale: 0.95 }}
                      >
                        <motion.span
                          className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                          animate={{ x: notifications ? 24 : 4 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      </motion.button>
                    </div>
                  </div>
                </div>

                {/* Auto Refresh */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium mb-3 flex items-center space-x-2" style={{ color: 'var(--color-text)' }}>
                    <Activity className="w-4 h-4" />
                    <span>Data Refresh</span>
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>Auto Refresh</div>
                        <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>Automatically update data</div>
                      </div>
                      <motion.button
                        onClick={handleAutoRefreshToggle}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          autoRefresh ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                        whileTap={{ scale: 0.95 }}
                      >
                        <motion.span
                          className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                          animate={{ x: autoRefresh ? 24 : 4 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      </motion.button>
                    </div>
                    
                    {autoRefresh && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <div className="text-sm font-medium mb-2" style={{ color: 'var(--color-text)' }}>
                          Refresh Interval: {refreshInterval}s
                        </div>
                        <div className="flex space-x-2">
                          {[3, 5, 10, 30].map((interval) => (
                            <motion.button
                              key={interval}
                              onClick={() => handleRefreshIntervalChange(interval)}
                              className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                                refreshInterval === interval
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                              }`}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              {interval}s
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* User Preferences */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium mb-3 flex items-center space-x-2" style={{ color: 'var(--color-text)' }}>
                    <User className="w-4 h-4" />
                    <span>User Preferences</span>
                  </h3>
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg" style={{ backgroundColor: currentTheme === 'dark' ? '#374151' : '#f3f4f6' }}>
                      <div className="text-sm font-medium mb-1" style={{ color: 'var(--color-text)' }}>Session Info</div>
                      <div className="text-xs space-y-1" style={{ color: 'var(--color-text-secondary)' }}>
                        <div>User ID: crypto_analyst_001</div>
                        <div>Role: Senior Forensic Analyst</div>
                        <div>Session: {new Date().toLocaleString()}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* About */}
                <div className="pt-4 border-t" style={{ borderColor: currentTheme === 'dark' ? '#374151' : '#e5e7eb' }}>
                  <div className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                    <div className="font-medium mb-2">Crypto Forensics Pro v2.0</div>
                    <div className="space-y-1">
                      <div>• Professional blockchain analysis platform</div>
                      <div>• Real-time fraud detection & compliance</div>
                      <div>• Enterprise-grade security & audit trails</div>
                      <div>• GDPR, MiCA & FATF compliant</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;