import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Send, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  TrendingUp, 
  Zap,
  Bitcoin,
  Coins
} from 'lucide-react';
import { TransactionGenerator } from '../utils/transactionGenerator';
import { FraudDetectionEngine } from '../utils/fraudDetection';
import type { FakeTransaction, RiskScore } from '../types';

interface TransactionSimulatorProps {
  onRiskUpdate: (riskLevel: number) => void;
}

const TransactionSimulator: React.FC<TransactionSimulatorProps> = ({ onRiskUpdate }) => {
  const [transactions, setTransactions] = useState<FakeTransaction[]>([]);
  const [selectedCoin, setSelectedCoin] = useState<'BTC' | 'ETH'>('BTC');
  const [isGenerating, setIsGenerating] = useState(false);
  const [riskScores, setRiskScores] = useState<Map<string, RiskScore>>(new Map());
  
  const autoGenerateRef = useRef<number | null>(null);
  const statusUpdateRef = useRef<number | null>(null);
  const riskUpdateTimeoutRef = useRef<number | null>(null);

  // Stable auto-generation with reduced frequency and controlled timing
  useEffect(() => {
    if (autoGenerateRef.current) {
      clearInterval(autoGenerateRef.current);
    }

    autoGenerateRef.current = window.setInterval(() => {
      if (Math.random() > 0.85) { // Reduced frequency: 15% chance every 8 seconds
        generateTransaction();
      }
    }, 8000); // Increased interval

    return () => {
      if (autoGenerateRef.current) {
        clearInterval(autoGenerateRef.current);
        autoGenerateRef.current = null;
      }
    };
  }, [selectedCoin]); // Only depend on selectedCoin

  // Smooth status updates with minimal re-renders
  useEffect(() => {
    if (statusUpdateRef.current) {
      clearInterval(statusUpdateRef.current);
    }

    statusUpdateRef.current = window.setInterval(() => {
      setTransactions(prev => {
        let hasChanges = false;
        const updated = prev.map(tx => {
          const now = Date.now();
          
          if (tx.status === 'pending' && now - tx.timestamp > tx.mempoolDelay * 1000) {
            hasChanges = true;
            return { ...tx, status: 'mempool' as const };
          }
          if (tx.status === 'mempool' && now - tx.timestamp > (tx.mempoolDelay + 15) * 1000) {
            hasChanges = true;
            return { ...tx, status: 'confirmed' as const, confirmations: Math.floor(Math.random() * 6) + 1 };
          }
          return tx;
        });
        
        return hasChanges ? updated : prev; // Only update if there are actual changes
      });
    }, 3000); // Slower status updates

    return () => {
      if (statusUpdateRef.current) {
        clearInterval(statusUpdateRef.current);
        statusUpdateRef.current = null;
      }
    };
  }, []);

  // Optimized risk level update with proper debouncing
  const updateRiskLevel = useCallback((newTransactions: FakeTransaction[]) => {
    if (riskUpdateTimeoutRef.current) {
      clearTimeout(riskUpdateTimeoutRef.current);
    }
    
    riskUpdateTimeoutRef.current = window.setTimeout(() => {
      if (newTransactions.length > 0) {
        const report = FraudDetectionEngine.generateRiskReport(newTransactions);
        onRiskUpdate(report.averageRiskScore);
      }
    }, 1000); // Longer debounce
  }, [onRiskUpdate]);

  useEffect(() => {
    updateRiskLevel(transactions);
    
    return () => {
      if (riskUpdateTimeoutRef.current) {
        clearTimeout(riskUpdateTimeoutRef.current);
        riskUpdateTimeoutRef.current = null;
      }
    };
  }, [transactions, updateRiskLevel]);

  const generateTransaction = useCallback(() => {
    if (isGenerating) return; // Prevent multiple simultaneous generations
    
    setIsGenerating(true);
    
    // Use requestAnimationFrame for smooth updates
    requestAnimationFrame(() => {
      const newTx = TransactionGenerator.generateFakeTransaction(selectedCoin);
      const riskScore = FraudDetectionEngine.detectScamPatterns(newTx);
      
      setTransactions(prev => [newTx, ...prev.slice(0, 9)]); // Reduced from 14 to 9 for better performance
      setRiskScores(prev => new Map(prev.set(newTx.txid, riskScore)));
      
      setTimeout(() => setIsGenerating(false), 200); // Small delay to prevent rapid clicking
    });
  }, [selectedCoin, isGenerating]);

  const generateRBFTransaction = useCallback((originalTx: FakeTransaction) => {
    const rbfTx = TransactionGenerator.generateRBFTransaction(originalTx);
    const riskScore = FraudDetectionEngine.detectScamPatterns(rbfTx);
    
    setTransactions(prev => [rbfTx, ...prev]);
    setRiskScores(prev => new Map(prev.set(rbfTx.txid, riskScore)));
  }, []);

  // Stable memoized helper functions
  const getStatusIcon = useCallback((status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-3 h-3 text-yellow-500 sm:w-4 sm:h-4" />;
      case 'mempool':
        return <TrendingUp className="w-3 h-3 text-blue-500 sm:w-4 sm:h-4" />;
      case 'confirmed':
        return <CheckCircle className="w-3 h-3 text-green-500 sm:w-4 sm:h-4" />;
      default:
        return <AlertCircle className="w-3 h-3 text-gray-500 sm:w-4 sm:h-4" />;
    }
  }, []);

  const getRiskBadge = useCallback((riskScore: RiskScore) => {
    const colors = {
      ALLOW: 'bg-green-100 text-green-800',
      WARN: 'bg-yellow-100 text-yellow-800',
      BAN: 'bg-red-100 text-red-800'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[riskScore.action]}`}>
        {riskScore.action} ({riskScore.score}%)
      </span>
    );
  }, []);

  // Optimized transaction list with minimal animations
  const TransactionList = React.memo(() => (
    <div className="space-y-3 overflow-y-auto max-h-96">
      {transactions.map((tx) => {
        const riskScore = riskScores.get(tx.txid);
        
        return (
          <motion.div
            key={tx.txid}
            initial={false}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="p-3 transition-shadow duration-200 border border-gray-200 rounded-lg sm:p-4 hover:shadow-md"
            style={{ backgroundColor: 'var(--color-surface, #ffffff)' }}
          >
            <div className="flex flex-col justify-between space-y-3 sm:flex-row sm:items-start sm:space-y-0">
              <div className="flex-1 min-w-0">
                <div className="flex items-center mb-2 space-x-2">
                  {tx.coin === 'BTC' ? (
                    <Bitcoin className="flex-shrink-0 w-3 h-3 text-orange-500 sm:w-4 sm:h-4" />
                  ) : (
                    <Coins className="flex-shrink-0 w-3 h-3 text-blue-500 sm:w-4 sm:h-4" />
                  )}
                  <span className="font-mono text-xs text-gray-600 truncate sm:text-sm">
                    {tx.txid.substring(0, 12)}...{tx.txid.substring(tx.txid.length - 4)}
                  </span>
                  {getStatusIcon(tx.status)}
                  <span className="text-xs text-gray-500 capitalize">{tx.status}</span>
                </div>

                <div className="grid grid-cols-1 gap-2 text-xs sm:grid-cols-2 sm:gap-4 sm:text-sm">
                  <div>
                    <span className="text-gray-500">Value:</span>
                    <span className="ml-2 font-medium">{tx.value.toFixed(8)} {tx.coin}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Fee:</span>
                    <span className="ml-2 font-medium">{tx.fee.toFixed(8)} {tx.coin}</span>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-gray-500">From:</span>
                    <span className="ml-2 font-mono text-xs break-all">
                      {tx.inputAddress.substring(0, 20)}...
                    </span>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-gray-500">To:</span>
                    <span className="ml-2 font-mono text-xs break-all">
                      {tx.outputAddress.substring(0, 20)}...
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-row items-center space-x-2 sm:flex-col sm:items-end sm:space-x-0 sm:space-y-2">
                {riskScore && getRiskBadge(riskScore)}
                
                {tx.rbfEnabled && tx.status !== 'confirmed' && (
                  <button
                    onClick={() => generateRBFTransaction(tx)}
                    className="flex-shrink-0 px-3 py-1 text-xs font-medium text-orange-800 transition-colors duration-200 bg-orange-100 rounded-full hover:bg-orange-200"
                  >
                    RBF
                  </button>
                )}
              </div>
            </div>

            {riskScore && riskScore.flags.length > 0 && (
              <div className="pt-3 mt-3 border-t border-gray-100">
                <div className="flex flex-wrap gap-1">
                  {riskScore.flags.slice(0, 3).map((flag, flagIndex) => (
                    <span
                      key={flagIndex}
                      className="px-2 py-1 text-xs font-medium text-red-700 rounded bg-red-50"
                    >
                      {flag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        );
      })}

      {transactions.length === 0 && (
        <div className="py-8 text-center text-gray-500 sm:py-12">
          <Send className="w-8 h-8 mx-auto mb-4 opacity-50 sm:w-12 sm:h-12" />
          <p className="text-sm sm:text-base">No transactions yet. Click "Generate TX" to start simulation.</p>
        </div>
      )}
    </div>
  ));

  return (
    <div className="p-4 bg-white shadow-lg rounded-xl sm:p-6" style={{ backgroundColor: 'var(--color-surface, #ffffff)' }}>
      <div className="flex flex-col justify-between mb-4 space-y-3 sm:flex-row sm:items-center sm:mb-6 sm:space-y-0">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="p-1.5 sm:p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex-shrink-0">
            <Zap className="w-4 h-4 text-white sm:w-5 sm:h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold sm:text-xl" style={{ color: 'var(--color-text, #111827)' }}>Transaction Generator</h2>
            <p className="text-xs sm:text-sm" style={{ color: 'var(--color-text-secondary, #6b7280)' }}>Generate and analyze blockchain transactions</p>
          </div>
        </div>

        <div className="flex flex-col items-stretch space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-3">
          <select
            value={selectedCoin}
            onChange={(e) => setSelectedCoin(e.target.value as 'BTC' | 'ETH')}
            className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{ 
              backgroundColor: 'var(--color-surface, #ffffff)',
              borderColor: 'var(--color-text-secondary, #d1d5db)',
              color: 'var(--color-text, #111827)'
            }}
          >
            <option value="BTC">Bitcoin (BTC)</option>
            <option value="ETH">Ethereum (ETH)</option>
          </select>

          <motion.button
            onClick={generateTransaction}
            disabled={isGenerating}
            className="flex items-center justify-center px-4 py-2 space-x-2 text-sm font-medium text-white transition-transform duration-200 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 disabled:opacity-50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isGenerating ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Zap className="w-4 h-4" />
              </motion.div>
            ) : (
              <Send className="w-4 h-4" />
            )}
            <span>{isGenerating ? 'Generating...' : 'Generate TX'}</span>
          </motion.button>
        </div>
      </div>

      <TransactionList />
    </div>
  );
};

export default TransactionSimulator;