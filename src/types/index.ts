// Type definitions for fake blockchain transactions and fraud detection

export interface FakeTransaction {
  txid: string;
  inputAddress: string;
  outputAddress: string;
  value: number;
  fee: number;
  timestamp: number;
  status: 'pending' | 'mempool' | 'confirmed';
  confirmations: number;
  coin: 'BTC' | 'ETH';
  mempoolDelay: number;
  rbfEnabled: boolean;
}

export interface RiskScore {
  score: number;
  flags: string[];
  action: 'ALLOW' | 'WARN' | 'BAN';
}

export interface UserSession {
  id: string;
  ipAddress: string;
  userAgent: string;
  startTime: number;
  mouseMovements: Array<{ x: number; y: number; timestamp: number }>;
  rbfAttempts: number;
}

export interface LiveTransaction {
  txid: string;
  value: number;
  time: string;
  fromAddress: string;
  toAddress: string;
  status: 'unconfirmed' | 'confirmed';
}

export interface Theme {
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  success: string;
  warning: string;
  error: string;
  font: string;
  txAnimation: 'blockchain-3d' | 'matrix-code' | 'pulse' | 'glow';
}

// Error handling types
export interface AppError {
  message: string;
  severity: 'info' | 'warning' | 'error' | 'critical';
  source: 'api' | 'ui' | 'data' | 'network' | 'auth' | 'unknown';
  timestamp: Date;
  data?: any;
  stack?: string;
}