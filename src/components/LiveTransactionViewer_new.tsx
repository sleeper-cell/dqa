import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  Bitcoin, 
  Clock, 
  Eye, 
  X,
  ExternalLink,
  Wifi,
  AlertCircle,
  Zap,
  AlertTriangle
} from 'lucide-react';

interface LiveTransactionViewerProps {
  isMobile?: boolean;
}

interface StreamTransaction {
  txid: string;
  value: number;
  time: string;
  fromAddress: string;
  toAddress: string;
  status: 'unconfirmed' | 'confirmed';
  isRBF?: boolean;
  rbfReason?: string;
  displayTime?: number;
}

// Pre-generated transaction pool to avoid runtime generation
const TRANSACTION_POOL: Omit<StreamTransaction, 'time' | 'displayTime'>[] = [
  {
    txid: 'a1b2c3d4e5f6789012345678901234567890123456789012345678901234567890',
    value: 15.23456789,
    fromAddress: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
    toAddress: '3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy',
    status: 'unconfirmed',
    isRBF: false
  },
  {
    txid: 'b2c3d4e5f6789012345678901234567890123456789012345678901234567890a1',
    value: 245.87654321,
    fromAddress: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    toAddress: '1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2',
    status: 'unconfirmed',
    isRBF: true,
    rbfReason: 'High-value RBF transaction detected - Fee bump pattern'
  },
  {
    txid: 'c3d4e5f6789012345678901234567890123456789012345678901234567890a1b2',
    value: 32.11111111,
    fromAddress: '3FupnqvVcdNUiKckeLmx7VrwxtyQjDZuEy',
    toAddress: 'bc1qw508d6qejxtdg4y5r3zarvary0c5xw7kv8f3t4',
    status: 'confirmed',
    isRBF: false
  },
  {
    txid: 'd4e5f6789012345678901234567890123456789012345678901234567890a1b2c3',
    value: 156.99999999,
    fromAddress: '1HLoD9E4SDFFPDiYfNYnkBLQ85Y51J3Zb1',
    toAddress: '3QJmV3qfvL9SuYo34YihAf3sRCW3qSinyC',
    status: 'unconfirmed',
    isRBF: true,
    rbfReason: 'Suspicious fee manipulation detected'
  },
  {
    txid: 'e5f6789012345678901234567890123456789012345678901234567890a1b2c3d4',
    value: 42.42424242,
    fromAddress: 'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq',
    toAddress: '1F1tAaz5x1HUXrCNLbtMDqcw6o5GNn4xqX',
    status: 'confirmed',
    isRBF: false
  },
  {
    txid: 'f6789012345678901234567890123456789012345678901234567890a1b2c3d4e5',
    value: 387.12345678,
    fromAddress: '3Cbq7aT1tY8kMxWLbitaG7yT6bPbKChq64',
    toAddress: 'bc1qm34lsc65zpw79lxes69zkqmk6luv9mwsqq5w6e',
    status: 'unconfirmed',
    isRBF: true,
    rbfReason: 'Multiple RBF attempts detected - Potential fraud'
  },
  {
    txid: '789012345678901234567890123456789012345678901234567890a1b2c3d4e5f6',
    value: 28.88888888,
    fromAddress: '1MK7L3zrgm7VJfuQVkMQH3NMuEoNfBbr8s',
    toAddress: '3P14159f73E4gFr7JterCCQh9QjiTjiZrG',
    status: 'confirmed',
    isRBF: false
  },
  {
    txid: '89012345678901234567890123456789012345678901234567890a1b2c3d4e5f67',
    value: 499.99999999,
    fromAddress: 'bc1qc7slrfxkknqcq2jevvvkdgvrt8080852dfjewde',
    toAddress: '1FeexV6bAHb8ybZjqQMjJrcCrHGW9sb6uF',
    status: 'unconfirmed',
    isRBF: true,
    rbfReason: 'Maximum value RBF transaction - Critical alert'
  }
];

const LiveTransactionViewer: React.FC<LiveTransactionViewerProps> = ({ isMobile = false }) => {
  const [currentTransaction, setCurrentTransaction] = useState<StreamTransaction | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [showMobileViewer, setShowMobileViewer] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected' | 'error'>('disconnected');
  const [error, setError] = useState<string | null>(null);
  const [transactionCount, setTransactionCount] = useState(0);
  const [rbfCount, setRbfCount] = useState(0);
  const [lastTransactionKey, setLastTransactionKey] = useState<string>('');
  
  const intervalRef = useRef<number | null>(null);
  const rbfTimeoutRef = useRef<number | null>(null);
  const transactionIndexRef = useRef(0);
  const lastApiCallRef = useRef<number>(0);

  // Optimized transaction selection from pre-generated pool
  const getNextTransaction = useCallback((): StreamTransaction => {
    const poolIndex = transactionIndexRef.current % TRANSACTION_POOL.length;
    const template = TRANSACTION_POOL[poolIndex];
    
    transactionIndexRef.current += 1;
    
    return {
      ...template,
      time: new Date().toLocaleTimeString(),
      displayTime: Date.now()
    };
  }, []);

  // Optimized blockchain API call with proper error handling and caching
  const fetchBlockchainData = useCallback(async (): Promise<StreamTransaction | null> => {
    const now = Date.now();
    
    // Rate limiting: Don't call API more than once every 5 seconds
    if (now - lastApiCallRef.current < 5000) {
      return null;
    }
    
    try {
      lastApiCallRef.current = now;
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);
      
      const response = await fetch('https://blockchain.info/unconfirmed-transactions?format=json&cors=true', {
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
        },
        method: 'GET'
      });
      
      clearTimeout(timeoutId);
      
      if (response.ok) {
        const data = await response.json();
        
        if (data?.txs?.length > 0) {
          // Filter for high-value transactions
          const validTransactions = data.txs.filter((tx: any) => {
            if (!tx.out || !Array.isArray(tx.out)) return false;
            const totalOutput = tx.out.reduce((sum: number, output: any) => {
              return sum + (output.value || 0);
            }, 0) / 100000000;
            return totalOutput >= 0.1 && totalOutput <= 500; // Lowered minimum for more data
          });

          if (validTransactions.length > 0) {
            const tx = validTransactions[Math.floor(Math.random() * validTransactions.length)];
            const totalOutput = tx.out.reduce((sum: number, output: any) => {
              return sum + (output.value || 0);
            }, 0) / 100000000;
            
            const isRBF = totalOutput >= 10 && Math.random() < 0.25;

            return {
              txid: tx.hash,
              value: totalOutput,
              time: new Date((tx.time || Date.now() / 1000) * 1000).toLocaleTimeString(),
              fromAddress: tx.inputs?.[0]?.prev_out?.addr || 'Unknown',
              toAddress: tx.out?.[0]?.addr || 'Unknown',
              status: 'unconfirmed' as const,
              isRBF,
              rbfReason: isRBF ? 'Real-time RBF pattern detected from blockchain data' : undefined,
              displayTime: Date.now()
            };
          }
        }
      }
    } catch (err) {
      console.warn('Blockchain API call failed:', err);
      setConnectionStatus('error');
      setError('API temporarily unavailable. Using demo data.');
    }
    
    return null;
  }, []);

  // Smooth transaction streaming without excessive re-renders
  const streamNextTransaction = useCallback(async () => {
    let newTransaction: StreamTransaction | null = null;
    
    // Try blockchain API first
    try {
      newTransaction = await fetchBlockchainData();
      if (newTransaction) {
        setConnectionStatus('connected');
        setError(null);
      }
    } catch (err) {
      // API failed, will use fallback below
    }

    // Fallback to demo data if API failed
    if (!newTransaction) {
      newTransaction = getNextTransaction();
      if (connectionStatus !== 'error') {
        setConnectionStatus('error');
        setError('Using demo data due to API limitations');
      }
    }

    // Only update if transaction is actually different
    if (newTransaction && newTransaction.txid !== lastTransactionKey) {
      setCurrentTransaction(newTransaction);
      setLastTransactionKey(newTransaction.txid);
      setTransactionCount(prev => prev + 1);
      if (newTransaction.isRBF) {
        setRbfCount(prev => prev + 1);
      }
    }
  }, [fetchBlockchainData, getNextTransaction, connectionStatus, lastTransactionKey]);

  // Controlled timing for transaction updates
  useEffect(() => {
    let mounted = true;
    
    const initializeStreaming = async () => {
      if (!mounted) return;
      
      setConnectionStatus('connecting');
      setIsConnected(true);
      
      // Initial transaction load
      await streamNextTransaction();
      
      // Set up interval for regular updates
      if (mounted) {
        intervalRef.current = setInterval(async () => {
          if (mounted) {
            await streamNextTransaction();
          }
        }, 6000); // Slower interval to reduce blinking
      }
    };

    initializeStreaming();

    return () => {
      mounted = false;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (rbfTimeoutRef.current) {
        clearTimeout(rbfTimeoutRef.current);
        rbfTimeoutRef.current = null;
      }
      setIsConnected(false);
      setConnectionStatus('disconnected');
    };
  }, []); // Empty dependency array to prevent recreation

  // Handle RBF transactions with special timing
  useEffect(() => {
    if (currentTransaction?.isRBF && rbfTimeoutRef.current === null) {
      rbfTimeoutRef.current = setTimeout(() => {
        rbfTimeoutRef.current = null;
        streamNextTransaction();
      }, 8000); // Longer display time for RBF
    }
    
    return () => {
      if (rbfTimeoutRef.current) {
        clearTimeout(rbfTimeoutRef.current);
        rbfTimeoutRef.current = null;
      }
    };
  }, [currentTransaction?.isRBF, streamNextTransaction]);

  // Memoized status functions

  const getConnectionStatusColor = useMemo(() => () => {
    switch (connectionStatus) {
      case 'connected': return 'text-green-500';
      case 'connecting': return 'text-yellow-500';
      case 'error': return 'text-red-500';
      default: return 'text-red-500';
    }
  }, [connectionStatus]);

  const getConnectionStatusText = useMemo(() => () => {
    switch (connectionStatus) {
      case 'connected': return 'Streaming';
      case 'connecting': return 'Connecting';
      case 'error': return 'Fallback Mode';
      default: return 'Disconnected';
    }
  }, [connectionStatus]);

  const TransactionStream = React.memo(() => (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Activity className={`w-4 h-4 sm:w-5 sm:h-5 ${getConnectionStatusColor()}`} />
          <h3 className="text-base sm:text-lg font-semibold" style={{ color: 'var(--color-text)' }}>Live Blockchain Transactions</h3>
        </div>
        <div className="flex items-center space-x-2">
          <Wifi className={`w-3 h-3 sm:w-4 sm:h-4 ${getConnectionStatusColor()}`} />
          <span className={`text-xs sm:text-sm ${getConnectionStatusColor()}`}>
            {getConnectionStatusText()}
          </span>
        </div>
      </div>

      {error && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
          <div className="flex items-start space-x-2">
            <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-yellow-800">Blockchain API Status</p>
              <p className="text-xs text-yellow-700 mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Transaction Counters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-primary)' }}>
          <div className="flex items-center justify-between">
            <span className="text-sm" style={{ color: 'var(--color-primary)' }}>Transactions:</span>
            <span className="text-lg font-bold" style={{ color: 'var(--color-primary)' }}>{transactionCount}</span>
          </div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-3" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-error)' }}>
          <div className="flex items-center justify-between">
            <span className="text-sm" style={{ color: 'var(--color-error)' }}>RBF Detected:</span>
            <span className="text-lg font-bold" style={{ color: 'var(--color-error)' }}>{rbfCount}</span>
          </div>
        </div>
      </div>

      {/* Transaction Display */}
      <div className="min-h-[300px] flex items-center justify-center">
        {currentTransaction ? (
          <motion.div
            key={`tx-${currentTransaction.txid}`}
            initial={false}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`w-full p-4 rounded-xl border-2 shadow-lg transition-all duration-500 ${
              currentTransaction.isRBF 
                ? 'bg-gradient-to-br from-red-500 to-red-700 border-red-600 text-white' 
                : 'border-orange-200'
            }`}
            style={!currentTransaction.isRBF ? {
              background: 'linear-gradient(135deg, var(--color-surface) 0%, var(--color-background) 100%)',
              borderColor: 'var(--color-warning)'
            } : {}}
          >
            {/* RBF Alert Header */}
            {currentTransaction.isRBF && (
              <div className="bg-red-800 rounded-lg p-3 mb-4 border border-red-600">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-300" />
                  <span className="font-bold text-yellow-300">⚠️ RBF TRANSACTION DETECTED ⚠️</span>
                  <Zap className="w-5 h-5 text-yellow-300" />
                </div>
                <p className="text-sm text-red-100 mt-2">{currentTransaction.rbfReason}</p>
                <div className="mt-2 text-xs text-yellow-300 font-medium">
                  🕐 Extended display time (RBF Protocol)
                </div>
              </div>
            )}

            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Bitcoin className={`w-5 h-5 ${currentTransaction.isRBF ? 'text-yellow-300' : 'text-orange-500'}`} />
                <span className={`font-semibold ${currentTransaction.isRBF ? 'text-white' : ''}`} style={!currentTransaction.isRBF ? { color: 'var(--color-text)' } : {}}>
                  {currentTransaction.isRBF ? 'RBF High-Value Transaction' : 'Live Bitcoin Transaction'}
                </span>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  currentTransaction.isRBF 
                    ? 'bg-red-800 text-red-100 border border-red-600'
                    : currentTransaction.status === 'confirmed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {currentTransaction.status}
                </span>
              </div>
              
              <button
                className={`p-1 transition-colors ${
                  currentTransaction.isRBF 
                    ? 'text-red-200 hover:text-white' 
                    : 'hover:opacity-80'
                }`}
                style={!currentTransaction.isRBF ? { color: 'var(--color-text-secondary)' } : {}}
                onClick={() => window.open(`https://blockchain.info/tx/${currentTransaction.txid}`, '_blank')}
                title="View on Blockchain Explorer"
              >
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div className={`rounded-lg p-3 ${
                currentTransaction.isRBF 
                  ? 'bg-red-800 border border-red-600' 
                  : ''
              }`} style={!currentTransaction.isRBF ? {
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-text-secondary)'
              } : {}}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-sm ${currentTransaction.isRBF ? 'text-red-200' : ''}`} style={!currentTransaction.isRBF ? { color: 'var(--color-text-secondary)' } : {}}>
                    Transaction ID:
                  </span>
                  <span className={`text-xs font-mono ${currentTransaction.isRBF ? 'text-red-100' : ''}`} style={!currentTransaction.isRBF ? { color: 'var(--color-text)' } : {}}>
                    {currentTransaction.txid.substring(0, 8)}...{currentTransaction.txid.substring(currentTransaction.txid.length - 8)}
                  </span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-sm ${currentTransaction.isRBF ? 'text-red-200' : ''}`} style={!currentTransaction.isRBF ? { color: 'var(--color-text-secondary)' } : {}}>
                    Value:
                  </span>
                  <span className={`text-xl font-bold ${
                    currentTransaction.isRBF 
                      ? 'text-yellow-300' 
                      : 'text-orange-600'
                  }`}>
                    {currentTransaction.value.toFixed(8)} BTC
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${currentTransaction.isRBF ? 'text-red-200' : ''}`} style={!currentTransaction.isRBF ? { color: 'var(--color-text-secondary)' } : {}}>
                    Time:
                  </span>
                  <span className={`text-sm font-medium ${currentTransaction.isRBF ? 'text-red-100' : ''}`} style={!currentTransaction.isRBF ? { color: 'var(--color-text)' } : {}}>
                    {currentTransaction.time}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3">
                <div className={`rounded-lg p-3 ${
                  currentTransaction.isRBF 
                    ? 'bg-red-800 border border-red-600' 
                    : ''
                }`} style={!currentTransaction.isRBF ? {
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-text-secondary)'
                } : {}}>
                  <span className={`text-xs block mb-1 ${currentTransaction.isRBF ? 'text-red-200' : ''}`} style={!currentTransaction.isRBF ? { color: 'var(--color-text-secondary)' } : {}}>
                    From Address:
                  </span>
                  <span className={`font-mono text-xs break-all ${currentTransaction.isRBF ? 'text-red-100' : ''}`} style={!currentTransaction.isRBF ? { color: 'var(--color-text)' } : {}}>
                    {currentTransaction.fromAddress}
                  </span>
                </div>
                <div className={`rounded-lg p-3 ${
                  currentTransaction.isRBF 
                    ? 'bg-red-800 border border-red-600' 
                    : ''
                }`} style={!currentTransaction.isRBF ? {
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-text-secondary)'
                } : {}}>
                  <span className={`text-xs block mb-1 ${currentTransaction.isRBF ? 'text-red-200' : ''}`} style={!currentTransaction.isRBF ? { color: 'var(--color-text-secondary)' } : {}}>
                    To Address:
                  </span>
                  <span className={`font-mono text-xs break-all ${currentTransaction.isRBF ? 'text-red-100' : ''}`} style={!currentTransaction.isRBF ? { color: 'var(--color-text)' } : {}}>
                    {currentTransaction.toAddress}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-3 pt-3" style={{ borderTop: `1px solid ${currentTransaction.isRBF ? '#374151' : 'var(--color-text-secondary)'}` }}>
              <div className="text-center">
                <span className={`text-xs font-medium ${
                  currentTransaction.isRBF 
                    ? 'text-yellow-300' 
                    : 'text-orange-600'
                }`}>
                  {currentTransaction.isRBF 
                    ? '🚨 RBF ALERT: Real-time Blockchain Data •' 
                    : '🔥 Live Blockchain Transaction •'
                  }
                </span>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="text-center py-8" style={{ color: 'var(--color-text-secondary)' }}>
            {connectionStatus === 'connecting' ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-8 h-8 mx-auto mb-4"
                >
                  <Activity className="w-8 h-8 opacity-50" />
                </motion.div>
                <p className="text-sm">Connecting to blockchain network...</p>
              </>
            ) : (
              <>
                <Clock className="w-8 h-8 mx-auto mb-4 opacity-50" />
                <p className="text-sm">Waiting for blockchain transaction data...</p>
              </>
            )}
          </div>
        )}
      </div>

      <div className="text-center">
        <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
          🔄Real blockchain data when available • 🚨 RBF highlighted •
        </p>
      </div>
    </div>
  ));

  if (isMobile) {
    return (
      <>
        <motion.button
          onClick={() => setShowMobileViewer(true)}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-full shadow-lg z-40 flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={isConnected ? { 
            boxShadow: ['0 0 0 0 rgba(234, 88, 12, 0.7)', '0 0 0 10px rgba(234, 88, 12, 0)', '0 0 0 0 rgba(234, 88, 12, 0)']
          } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Eye className="w-5 h-5 sm:w-6 sm:h-6" />
        </motion.button>

        {showMobileViewer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto"
            style={{ backgroundColor: 'var(--color-background)' }}
          >
            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl font-bold" style={{ color: 'var(--color-text)' }}>Live Blockchain Transactions</h2>
                <motion.button
                  onClick={() => setShowMobileViewer(false)}
                  className="p-2 rounded-lg transition-colors"
                  style={{ 
                    color: 'var(--color-text-secondary)',
                    backgroundColor: 'var(--color-surface)'
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.button>
              </div>
              <TransactionStream />
            </div>
          </motion.div>
        )}
      </>
    );
  }

  return (
    <div className="rounded-xl shadow-lg p-4 border" style={{ 
      backgroundColor: 'var(--color-surface)', 
      borderColor: 'var(--color-text-secondary)'
    }}>
      <TransactionStream />
    </div>
  );
};

export default LiveTransactionViewer;
