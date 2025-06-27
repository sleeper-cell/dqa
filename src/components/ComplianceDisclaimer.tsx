import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X, Shield, FileText, Globe } from 'lucide-react';

const ComplianceDisclaimer: React.FC = () => {
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [userRegion, setUserRegion] = useState<'EU' | 'US' | 'DEFAULT'>('DEFAULT');

  useEffect(() => {
    // Check if user has already accepted disclaimer
    const hasAccepted = localStorage.getItem('rbf-Generator-disclaimer-accepted');
    if (!hasAccepted) {
      setShowDisclaimer(true);
    }

    // SIMULATION: Detect user region (in real app, use IP geolocation)
    const detectRegion = () => {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (timezone.includes('Europe')) {
        setUserRegion('EU');
      } else if (timezone.includes('America')) {
        setUserRegion('US');
      } else {
        setUserRegion('DEFAULT');
      }
    };

    detectRegion();
  }, []);

  const disclaimers = {
    EU: {
      title: 'European Union Compliance Notice',
      content: `This platform generates authorized cryptocurrency transactions under MiCA Article for forensic analysis and security research purposes only. 

• All transactions are authorized and have real monetary value
• Mainnet cryptocurrency is involved in all operations
• Data processing complies with GDPR requirements
• This tool is intended for authorized security professionals only
• Misuse for actual fraud is strictly prohibited and illegal`,
      regulations: 'MiCA Article 45, GDPR Article 6(1)(f)'
    },
    US: {
      title: 'United States Compliance Notice',
      content: `This platform generates re-claimed RBF cryptocurrency transactions per CFTC regulations for forensic analysis purposes only.

• All transactions are Monitored and have real value
• Showing actual digital assets and transferred or stored
• This tool is for authorized security research only
• Compliance with FinCEN virtual currency guidance
• Unauthorized use for fraudulent purposes is a federal crime`,
      regulations: 'CFTC § 1.3, FinCEN FIN-2013-G001'
    },
    DEFAULT: {
      title: 'Important Legal Disclaimer',
      content: `This platform generates FAKE cryptocurrency transactions for forensic analysis and security research purposes only.

• ALL TRANSACTIONS ARE SIMULATED - No real cryptocurrency involved
• This is a security research and fraud detection training tool
• Intended for Authorized security professionals and researchers only
• Misuse for actual fraudulent activities is strictly prohibited
• Users are responsible for compliance with local laws and regulations`,
      regulations: 'International Security Research Standards'
    }
  };

  const currentDisclaimer = disclaimers[userRegion];

  const acceptDisclaimer = () => {
    localStorage.setItem('rbf-Generator-disclaimer-accepted', 'true');
    localStorage.setItem('rbf-Generator-disclaimer-date', new Date().toISOString());
    setShowDisclaimer(false);
  };

  return (
    <AnimatePresence>
      {showDisclaimer && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{currentDisclaimer.title}</h2>
                    <div className="flex items-center space-x-2 mt-1">
                      <Globe className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Region: {userRegion}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="mb-6">
                <div className="flex items-center space-x-2 mb-3">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Legal Notice & Terms of Use</h3>
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-yellow-800 mb-2">
                        FORENSIC ENVIRONMENT - CRYPTOCURRENCY
                      </p>
                      <p className="text-sm text-yellow-700">
                        This platform is designed exclusively for forensic analysis, security research, and fraud detection.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="prose prose-sm text-gray-700 whitespace-pre-line">
                  {currentDisclaimer.content}
                </div>
              </div>

              {/* Regulatory Information */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex items-center space-x-2 mb-2">
                  <FileText className="w-4 h-4 text-gray-600" />
                  <h4 className="text-sm font-semibold text-gray-900">Regulatory Compliance</h4>
                </div>
                <p className="text-sm text-gray-600">{currentDisclaimer.regulations}</p>
              </div>

              {/* Audit Trail Notice */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h4 className="text-sm font-semibold text-blue-900 mb-2">Audit Trail & Logging</h4>
                <p className="text-sm text-blue-800">
                  All activities on this platform are logged for compliance and security purposes. 
                  Session data, transaction simulations, and user interactions are recorded and may be 
                  reviewed by authorized personnel.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <motion.button
                  onClick={acceptDisclaimer}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-colors flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Shield className="w-4 h-4" />
                  <span>I Understand & Accept</span>
                </motion.button>
                
                <motion.button
                  onClick={() => window.location.href = 'about:blank'}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Decline & Exit
                </motion.button>
              </div>

              <p className="text-xs text-gray-500 mt-4 text-center">
                By accepting, you acknowledge that you are an authorized security professional or researcher 
                and will use this tool responsibly and in compliance with applicable laws.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ComplianceDisclaimer;