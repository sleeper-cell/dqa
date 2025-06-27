import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import HashAnalyzerPage from './pages/HashAnalyzerPage';
import RBFCheckerPage from './pages/RBFCheckerPage';
import AddressInvestigationPage from './pages/AddressInvestigationPage';
import WalletClusteringPage from './pages/WalletClusteringPage';
import DeFiAnalysisPage from './pages/DeFiAnalysisPage';
import AdvancedProfilingPage from './pages/AdvancedProfilingPage';
import RansomwareAnalysisPage from './pages/RansomwareAnalysisPage';
import MalwareDetectionPage from './pages/MalwareDetectionPage';
import PhishingInvestigationPage from './pages/PhishingInvestigationPage';
import DarknetMonitoringPage from './pages/DarknetMonitoringPage';
import ThreatIntelligencePage from './pages/ThreatIntelligencePage';
import VulnerabilityAssessmentPage from './pages/VulnerabilityAssessmentPage';
import TransactionSimulatorPage from './pages/TransactionSimulatorPage';
import FraudDashboardPage from './pages/FraudDashboardPage';
import LiveTransactionsPage from './pages/LiveTransactionsPage';
import ComplianceReportsPage from './pages/ComplianceReportsPage';
import RiskAnalyticsPage from './pages/RiskAnalyticsPage';
import AuditLogsPage from './pages/AuditLogsPage';
import ComplianceDisclaimer from './components/ComplianceDisclaimer';
import { themes, applyTheme } from './utils/themes';
import { ErrorHandler, ErrorSeverity, ErrorSource, ErrorBoundary } from './utils/errorHandler';

function App() {
  const [currentTheme, setCurrentTheme] = useState('white');
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [riskLevel, setRiskLevel] = useState(25);
  const [isMobile, setIsMobile] = useState(false);
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);

  // Detect mobile device
  useEffect(() => {
    try {
      const checkMobile = () => {
        const mobile = window.innerWidth < 1024;
        setIsMobile(mobile);
        
        // Auto-collapse navigation on mobile
        if (mobile) {
          setIsNavCollapsed(false);
        }
      };

      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    } catch (error) {
      ErrorHandler.handleError(
        `Failed to detect mobile device: ${error}`,
        ErrorSeverity.WARNING,
        ErrorSource.UI
      );
    }
  }, []);

  // Apply theme changes
  useEffect(() => {
    try {
      const theme = themes[currentTheme];
      if (theme) {
        applyTheme(theme);
      } else {
        throw new Error(`Theme "${currentTheme}" not found`);
      }
    } catch (error) {
      ErrorHandler.handleError(
        `Failed to apply theme: ${error}`,
        ErrorSeverity.WARNING,
        ErrorSource.UI
      );
      // Fallback to white theme
      if (currentTheme !== 'white') {
        setCurrentTheme('white');
      }
    }
  }, [currentTheme]);

  const handleThemeChange = (themeName: string) => {
    try {
      if (!themes[themeName]) {
        throw new Error(`Invalid theme name: ${themeName}`);
      }
      setCurrentTheme(themeName);
    } catch (error) {
      ErrorHandler.handleError(
        `Failed to change theme: ${error}`,
        ErrorSeverity.WARNING,
        ErrorSource.UI
      );
    }
  };

  const handleRiskUpdate = (newRiskLevel: number) => {
    try {
      if (typeof newRiskLevel !== 'number' || newRiskLevel < 0 || newRiskLevel > 100) {
        throw new Error(`Invalid risk level: ${newRiskLevel}`);
      }
      setRiskLevel(newRiskLevel);
    } catch (error) {
      ErrorHandler.handleError(
        `Failed to update risk level: ${error}`,
        ErrorSeverity.WARNING,
        ErrorSource.DATA
      );
    }
  };

  const handlePageChange = (page: string) => {
    try {
      setCurrentPage(page);
    } catch (error) {
      ErrorHandler.handleError(
        `Failed to change page: ${error}`,
        ErrorSeverity.WARNING,
        ErrorSource.UI
      );
    }
  };

  // Handle navigation collapse state changes
  const handleNavCollapseChange = (collapsed: boolean) => {
    try {
      setIsNavCollapsed(collapsed);
    } catch (error) {
      ErrorHandler.handleError(
        `Failed to change navigation collapse state: ${error}`,
        ErrorSeverity.INFO,
        ErrorSource.UI
      );
    }
  };

  const renderCurrentPage = () => {
    try {
      switch (currentPage) {
        case 'dashboard':
          return <Dashboard riskLevel={riskLevel} onRiskUpdate={handleRiskUpdate} isMobile={isMobile} />;
        case 'hash-analyzer':
          return <HashAnalyzerPage />;
        case 'rbf-checker':
          return <RBFCheckerPage />;
        case 'address-investigation':
          return <AddressInvestigationPage />;
        case 'wallet-clustering':
          return <WalletClusteringPage />;
        case 'defi-analysis':
          return <DeFiAnalysisPage />;
        case 'advanced-profiling':
          return <AdvancedProfilingPage />;
        case 'ransomware-analysis':
          return <RansomwareAnalysisPage />;
        case 'malware-detection':
          return <MalwareDetectionPage />;
        case 'phishing-investigation':
          return <PhishingInvestigationPage />;
        case 'darknet-monitoring':
          return <DarknetMonitoringPage />;
        case 'threat-intelligence':
          return <ThreatIntelligencePage />;
        case 'vulnerability-assessment':
          return <VulnerabilityAssessmentPage />;
        case 'transaction-simulator':
          return <TransactionSimulatorPage />;
        case 'fraud-dashboard':
          return <FraudDashboardPage />;
        case 'live-transactions':
          return <LiveTransactionsPage />;
        case 'compliance-reports':
          return <ComplianceReportsPage />;
        case 'risk-analytics':
          return <RiskAnalyticsPage />;
        case 'audit-logs':
          return <AuditLogsPage />;
        default:
          return <Dashboard riskLevel={riskLevel} onRiskUpdate={handleRiskUpdate} isMobile={isMobile} />;
      }
    } catch (error) {
      ErrorHandler.handleError(
        `Failed to render page "${currentPage}": ${error}`,
        ErrorSeverity.ERROR,
        ErrorSource.UI
      );
      
      // Fallback to dashboard on error
      return (
        <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
          <h3 className="text-lg font-semibold text-red-800 mb-2">Page Error</h3>
          <p className="text-red-700">
            There was an error loading this page. Please try refreshing or selecting a different page.
          </p>
        </div>
      );
    }
  };

  // Calculate the correct margin based on navigation state
  const getMainContentMargin = () => {
    try {
      if (isMobile) {
        return 'lg:ml-0'; // No margin on mobile (uses hamburger menu)
      }
      return isNavCollapsed ? 'lg:ml-20' : 'lg:ml-80'; // 80px collapsed, 320px expanded
    } catch (error) {
      ErrorHandler.handleError(
        `Failed to calculate main content margin: ${error}`,
        ErrorSeverity.INFO,
        ErrorSource.UI
      );
      return 'lg:ml-0'; // Fallback
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: 'var(--color-background)' }}>
        {/* Toast notifications container */}
        <Toaster position="top-right" />
        
        {/* Compliance Disclaimer */}
        <ComplianceDisclaimer />

        {/* Navigation */}
        <Navigation 
          currentPage={currentPage}
          onPageChange={handlePageChange}
          currentTheme={currentTheme}
          onCollapseChange={handleNavCollapseChange}
        />

        {/* Header and Main Content with proper responsive spacing */}
        <div className={`transition-all duration-300 ease-in-out ${getMainContentMargin()}`}>
          <Header 
            onThemeChange={handleThemeChange}
            currentTheme={currentTheme}
            riskLevel={riskLevel}
          />

          {/* Main Content */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderCurrentPage()}
            </motion.div>
          </main>

          {/* Footer */}
          <footer className="border-t transition-colors duration-300" style={{ backgroundColor: 'var(--color-surface)', borderColor: currentTheme === 'dark' ? '#374151' : '#e5e7eb' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                <div>
                  <h3 className="font-semibold mb-3 lg:mb-4" style={{ color: 'var(--color-text)' }}>TX ANALYZER Crypto Forensics</h3>
                  <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                    Professional forensic blockchain analysis platform for security research, compliance, and fraud detection.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-3 lg:mb-4" style={{ color: 'var(--color-text)' }}>Compliance</h3>
                  <ul className="space-y-1 lg:space-y-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                    <li>• GDPR Compliant</li>
                    <li>• MiCA Article 45</li>
                    <li>• FATF Standards</li>
                    <li>• FinCEN Guidelines</li>
                  </ul>
                </div>
                <div className="sm:col-span-2 lg:col-span-1">
                  <h3 className="font-semibold mb-3 lg:mb-4" style={{ color: 'var(--color-text)' }}>Security Features</h3>
                  <ul className="space-y-1 lg:space-y-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                    <li>• Advanced hash analysis & RBF detection</li>
                    <li>• Real-time fraud detection & compliance</li>
                    <li>• Professional transaction monitoring</li>
                    <li>• Enterprise audit trail logging</li>
                    <li>• Comprehensive address investigation</li>
                    <li>• Advanced wallet clustering analysis</li>
                    <li>• DeFi protocol analysis & MEV detection</li>
                    <li>• Professional address profiling & pattern recognition</li>
                    <li>• Ransomware tracking & victim support</li>
                    <li>• Exchange analysis & money laundering detection</li>
                  </ul>
                </div>
              </div>
              <div className="border-t mt-6 lg:mt-8 pt-6 lg:pt-8 text-center" style={{ borderColor: currentTheme === 'dark' ? '#374151' : '#e5e7eb' }}>
                <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                  © 2025 TX ANALYZER Crypto Forensics. All rights reserved. 
                  <span className="font-semibold text-blue-600 ml-2 block sm:inline">
                    PROFESSIONAL BLOCKCHAIN ANALYSIS PLATFORM
                  </span>
                </p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;