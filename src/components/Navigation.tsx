import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  Hash, 
  RefreshCw, 
  Zap, 
  Shield, 
  Activity, 
  Eye, 
  BarChart3,
  Settings,
  Home,
  ChevronDown,
  Search,
  Database,
  AlertTriangle,
  Bitcoin,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  FileText,
  MapPin,
  Network,
  Coins,
  Brain,
  Microscope,
  Skull,
  Building2,
  Lock,
  Bug,
  Crosshair,
  Radar,
  Target,
  Fingerprint
} from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  currentTheme: string;
  onCollapseChange?: (collapsed: boolean) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, onPageChange, currentTheme, onCollapseChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile/desktop
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      
      // Auto-collapse on mobile
      if (mobile) {
        setIsCollapsed(false);
        setIsMenuOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Notify parent component when collapse state changes
  useEffect(() => {
    if (onCollapseChange) {
      onCollapseChange(isCollapsed);
    }
  }, [isCollapsed, onCollapseChange]);

  // Professional crypto analysis features - only real, working features
  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: Home,
      description: 'Main overview and analytics'
    },
    {
      id: 'analysis',
      label: 'Transaction Analysis',
      icon: Search,
      hasDropdown: true,
      children: [
        {
          id: 'hash-analyzer',
          label: 'Hash Analyzer',
          icon: Hash,
          description: 'Real transaction hash analysis with RBF detection'
        },
        {
          id: 'rbf-checker',
          label: 'RBF Checker',
          icon: RefreshCw,
          description: 'Check Replace-by-Fee status'
        },
        {
          id: 'address-investigation',
          label: 'Address Investigation',
          icon: MapPin,
          description: 'Comprehensive address analysis and investigation'
        },
        {
          id: 'wallet-clustering',
          label: 'Wallet Clustering',
          icon: Network,
          description: 'Advanced wallet clustering and network analysis'
        },
        {
          id: 'defi-analysis',
          label: 'DeFi Analysis',
          icon: Coins,
          description: 'Uniswap/DEX, yield farming, and flash loan analysis'
        },
        {
          id: 'advanced-profiling',
          label: 'Advanced Profiling',
          icon: Microscope,
          description: 'Professional address profiling with pattern recognition'
        }
      ]
    },
    {
      id: 'security',
      label: 'Security & Threats',
      icon: Shield,
      hasDropdown: true,
      children: [
        {
          id: 'ransomware-analysis',
          label: 'Ransomware Analysis',
          icon: Skull,
          description: 'Ransomware tracking, victim support, and recovery tools'
        },
        {
          id: 'malware-detection',
          label: 'Malware Detection',
          icon: Bug,
          description: 'Cryptocurrency malware and trojan analysis'
        },
        {
          id: 'phishing-investigation',
          label: 'Phishing Investigation',
          icon: Target,
          description: 'Crypto phishing scam detection and analysis'
        },
        {
          id: 'darknet-monitoring',
          label: 'Darknet Monitoring',
          icon: Eye,
          description: 'Dark web marketplace surveillance and tracking'
        },
        {
          id: 'threat-intelligence',
          label: 'Threat Intelligence',
          icon: Radar,
          description: 'Real-time threat feeds and intelligence gathering'
        },
        {
          id: 'vulnerability-assessment',
          label: 'Vulnerability Assessment',
          icon: Lock,
          description: 'Blockchain and smart contract security analysis'
        }
      ]
    },
    {
      id: 'simulation',
      label: 'Testing Tools',
      icon: Zap,
      hasDropdown: true,
      children: [
        {
          id: 'transaction-Generator',
          label: 'Transaction Generator',
          icon: Bitcoin,
          description: 'Generate test transactions for analysis'
        }
      ]
    },
    {
      id: 'monitoring',
      label: 'Live Monitoring',
      icon: Activity,
      hasDropdown: true,
      children: [
        {
          id: 'fraud-dashboard',
          label: 'Fraud Dashboard',
          icon: Shield,
          description: 'Real-time fraud detection metrics'
        },
        {
          id: 'live-transactions',
          label: 'Live Transactions',
          icon: Eye,
          description: 'Monitor real blockchain transactions'
        }
      ]
    },
    {
      id: 'analytics',
      label: 'Analytics & Reports',
      icon: BarChart3,
      hasDropdown: true,
      children: [
        {
          id: 'risk-analytics',
          label: 'Risk Analytics',
          icon: TrendingUp,
          description: 'Risk assessment and analysis'
        },
        {
          id: 'compliance-reports',
          label: 'Compliance Reports',
          icon: FileText,
          description: 'Generate compliance documentation'
        },
        {
          id: 'audit-logs',
          label: 'Audit Logs',
          icon: AlertTriangle,
          description: 'Security audit trails'
        }
      ]
    }
  ];

  const toggleCollapse = () => {
    if (!isMobile) {
      setIsCollapsed(!isCollapsed);
      setActiveDropdown(null);
    }
  };

  const handleCollapsedItemClick = (item: any) => {
    if (isCollapsed && !isMobile) {
      setIsCollapsed(false);
      setTimeout(() => {
        if (item.hasDropdown) {
          setActiveDropdown(item.id);
        } else {
          handlePageChange(item.id);
        }
      }, 150);
    } else {
      if (item.hasDropdown) {
        toggleDropdown(item.id);
      } else {
        handlePageChange(item.id);
      }
    }
  };

  const handlePageChange = (pageId: string) => {
    onPageChange(pageId);
    setIsMenuOpen(false);
    setActiveDropdown(null);
  };

  const toggleDropdown = (itemId: string) => {
    if (isCollapsed && !isMobile) return;
    setActiveDropdown(activeDropdown === itemId ? null : itemId);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setActiveDropdown(null);
  };

  const isActivePage = (pageId: string) => {
    return currentPage === pageId;
  };

  const isActiveParent = (item: any) => {
    if (item.children) {
      return item.children.some((child: any) => isActivePage(child.id));
    }
    return isActivePage(item.id);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <motion.button
        onClick={toggleMenu}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg shadow-lg"
        style={{ 
          backgroundColor: 'var(--color-surface)',
          color: 'var(--color-text)'
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </motion.button>

      {/* Desktop Navigation */}
      <motion.nav 
        className="hidden lg:block fixed left-0 top-0 h-full z-40 border-r transition-all duration-300 ease-in-out"
        style={{ 
          backgroundColor: 'var(--color-surface)',
          borderColor: currentTheme === 'dark' ? '#374151' : '#e5e7eb'
        }}
        animate={{ width: isCollapsed ? 80 : 320 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="p-4 h-full overflow-y-auto relative">
          {/* Logo and Collapse Button Container */}
          <div className="flex items-center justify-between mb-6 relative">
            <AnimatePresence mode="wait">
              {!isCollapsed ? (
                <motion.div
                  key="expanded-logo"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center space-x-3 flex-1 min-w-0"
                >
                  <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex-shrink-0">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h1 className="text-sm font-bold truncate" style={{ color: 'var(--color-text)' }}>
                      TX ANALYZER Crypto Forensics
                    </h1>
                    <p className="text-xs truncate" style={{ color: 'var(--color-text-secondary)' }}>
                      Professional Platform
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="collapsed-logo"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg mx-auto"
                >
                  <Shield className="w-5 h-5 text-white" />
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Collapse Button - Always visible and properly positioned */}
            <motion.button
              onClick={toggleCollapse}
              className="p-2 rounded-lg transition-colors hover:bg-opacity-80 flex-shrink-0 relative z-10"
              style={{ 
                backgroundColor: currentTheme === 'dark' ? '#374151' : '#f3f4f6',
                color: 'var(--color-text-secondary)'
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title={isCollapsed ? "Expand menu" : "Collapse menu"}
            >
              {isCollapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </motion.button>
          </div>

          {/* Navigation Items */}
          <div className="space-y-2">
            {menuItems.map((item) => (
              <div key={item.id}>
                {item.hasDropdown ? (
                  <>
                    <motion.button
                      onClick={() => handleCollapsedItemClick(item)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                        isActiveParent(item) 
                          ? 'bg-blue-100 text-blue-900' 
                          : 'hover:bg-gray-100'
                      }`}
                      style={!isActiveParent(item) ? {
                        color: 'var(--color-text)',
                        backgroundColor: 'transparent'
                      } : {}}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      title={isCollapsed ? item.label : undefined}
                    >
                      <div className="flex items-center space-x-3 min-w-0">
                        <item.icon className="w-5 h-5 flex-shrink-0" />
                        <AnimatePresence>
                          {!isCollapsed && (
                            <motion.span
                              initial={{ opacity: 0, width: 0 }}
                              animate={{ opacity: 1, width: 'auto' }}
                              exit={{ opacity: 0, width: 0 }}
                              transition={{ duration: 0.2 }}
                              className="font-medium whitespace-nowrap truncate"
                            >
                              {item.label}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>
                      <AnimatePresence>
                        {!isCollapsed && (
                          <motion.div
                            initial={{ opacity: 0, rotate: 0 }}
                            animate={{ 
                              opacity: 1, 
                              rotate: activeDropdown === item.id ? 180 : 0 
                            }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="flex-shrink-0"
                          >
                            <ChevronDown className="w-4 h-4" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.button>
                    
                    <AnimatePresence>
                      {activeDropdown === item.id && !isCollapsed && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="ml-4 mt-2 space-y-1"
                        >
                          {item.children?.map((child) => (
                            <motion.button
                              key={child.id}
                              onClick={() => handlePageChange(child.id)}
                              className={`w-full text-left p-3 rounded-lg transition-colors ${
                                isActivePage(child.id) 
                                  ? 'bg-blue-100 text-blue-900 border-l-4 border-blue-500' 
                                  : 'hover:bg-gray-50'
                              }`}
                              style={!isActivePage(child.id) ? {
                                color: 'var(--color-text)',
                                backgroundColor: 'transparent'
                              } : {}}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <div className="flex items-center space-x-3">
                                <child.icon className="w-4 h-4" />
                                <div>
                                  <div className="font-medium text-sm">{child.label}</div>
                                  <div className="text-xs opacity-70">{child.description}</div>
                                </div>
                              </div>
                            </motion.button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <motion.button
                    onClick={() => handleCollapsedItemClick(item)}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                      isActivePage(item.id) 
                        ? 'bg-blue-100 text-blue-900 border-l-4 border-blue-500' 
                        : 'hover:bg-gray-100'
                    }`}
                    style={!isActivePage(item.id) ? {
                      color: 'var(--color-text)',
                      backgroundColor: 'transparent'
                    } : {}}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    title={isCollapsed ? item.label : undefined}
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    <AnimatePresence>
                      {!isCollapsed && (
                        <motion.div
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: 'auto' }}
                          exit={{ opacity: 0, width: 0 }}
                          transition={{ duration: 0.2 }}
                          className="min-w-0"
                        >
                          <div className="font-medium whitespace-nowrap truncate">{item.label}</div>
                          <div className="text-xs opacity-70 whitespace-nowrap truncate">{item.description}</div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setIsMenuOpen(false)}
            />
            
            <motion.nav
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="lg:hidden fixed left-0 top-0 h-full w-80 z-50 border-r"
              style={{ 
                backgroundColor: 'var(--color-surface)',
                borderColor: currentTheme === 'dark' ? '#374151' : '#e5e7eb'
              }}
            >
              <div className="p-6 h-full overflow-y-auto">
                {/* Mobile Logo */}
                <div className="flex items-center space-x-3 mb-8 mt-12">
                  <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>
                      TX ANALYZER Crypto Forensics
                    </h1>
                    <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                      Professional Platform
                    </p>
                  </div>
                </div>

                {/* Mobile Navigation Items */}
                <div className="space-y-2">
                  {menuItems.map((item) => (
                    <div key={item.id}>
                      {item.hasDropdown ? (
                        <>
                          <motion.button
                            onClick={() => toggleDropdown(item.id)}
                            className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                              isActiveParent(item) 
                                ? 'bg-blue-100 text-blue-900' 
                                : 'hover:bg-gray-100'
                            }`}
                            style={!isActiveParent(item) ? {
                              color: 'var(--color-text)',
                              backgroundColor: 'transparent'
                            } : {}}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="flex items-center space-x-3">
                              <item.icon className="w-5 h-5" />
                              <span className="font-medium">{item.label}</span>
                            </div>
                            <motion.div
                              animate={{ rotate: activeDropdown === item.id ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ChevronDown className="w-4 h-4" />
                            </motion.div>
                          </motion.button>
                          
                          <AnimatePresence>
                            {activeDropdown === item.id && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="ml-4 mt-2 space-y-1"
                              >
                                {item.children?.map((child) => (
                                  <motion.button
                                    key={child.id}
                                    onClick={() => handlePageChange(child.id)}
                                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                                      isActivePage(child.id) 
                                        ? 'bg-blue-100 text-blue-900 border-l-4 border-blue-500' 
                                        : 'hover:bg-gray-50'
                                    }`}
                                    style={!isActivePage(child.id) ? {
                                      color: 'var(--color-text)',
                                      backgroundColor: 'transparent'
                                    } : {}}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                  >
                                    <div className="flex items-center space-x-3">
                                      <child.icon className="w-4 h-4" />
                                      <div>
                                        <div className="font-medium text-sm">{child.label}</div>
                                        <div className="text-xs opacity-70">{child.description}</div>
                                      </div>
                                    </div>
                                  </motion.button>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <motion.button
                          onClick={() => handlePageChange(item.id)}
                          className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                            isActivePage(item.id) 
                              ? 'bg-blue-100 text-blue-900 border-l-4 border-blue-500' 
                              : 'hover:bg-gray-100'
                          }`}
                          style={!isActivePage(item.id) ? {
                            color: 'var(--color-text)',
                            backgroundColor: 'transparent'
                          } : {}}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <item.icon className="w-5 h-5" />
                          <div>
                            <div className="font-medium">{item.label}</div>
                            <div className="text-xs opacity-70">{item.description}</div>
                          </div>
                        </motion.button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;