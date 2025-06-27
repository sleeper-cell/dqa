// SIMULATION: Fraud detection engine for behavioral analysis

import type { FakeTransaction, RiskScore, UserSession } from '../types';
import { ErrorHandler, ErrorSeverity, ErrorSource } from './errorHandler';

export class FraudDetectionEngine {
  private static readonly SCAM_ADDRESSES = [
    // SIMULATION: Known scam addresses for testing
    '1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2',
    '3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy',
    'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh'
  ];

  private static readonly ILLICIT_KEYWORDS = [
    'ransom', 'darknet', 'mixer', 'tumbler', 'laundering'
  ];

  // SIMULATION: Analyze transaction patterns for fraud indicators
  static detectScamPatterns(tx: FakeTransaction, userSession?: UserSession): RiskScore {
    try {
      if (!tx) {
        throw new Error('Transaction is undefined or null');
      }
      
      let riskScore = 0;
      const flags: string[] = [];

      // Check against known scam addresses
      if (this.SCAM_ADDRESSES.includes(tx.inputAddress) || 
          this.SCAM_ADDRESSES.includes(tx.outputAddress)) {
        riskScore += 50;
        flags.push('BLACKLIST_ADDRESS');
      }

      // Analyze transaction value patterns
      if (tx.value > 5) {
        riskScore += 20;
        flags.push('HIGH_VALUE_TX');
      }

      // Check for rapid RBF attempts
      if (userSession && userSession.rbfAttempts > 5) {
        riskScore += 30;
        flags.push('RBF_FLOODING');
      }

      // Analyze fee patterns (unusually high fees might indicate urgency/fraud)
      const feePercentage = (tx.fee / tx.value) * 100;
      if (feePercentage > 5) {
        riskScore += 15;
        flags.push('SUSPICIOUS_FEE');
      }

      // Random simulation factor for demonstration
      riskScore += Math.random() * 20;

      // Determine action based on risk score
      let action: 'ALLOW' | 'WARN' | 'BAN' = 'ALLOW';
      if (riskScore > 80) {
        action = 'BAN';
      } else if (riskScore > 50) {
        action = 'WARN';
      }

      return {
        score: Math.min(Math.round(riskScore), 100),
        flags,
        action
      };
    } catch (error) {
      ErrorHandler.handleError(
        `Failed to detect scam patterns: ${error}`,
        ErrorSeverity.ERROR,
        ErrorSource.DATA
      );
      
      // Return a safe default risk score
      return {
        score: 50,
        flags: ['ERROR_DETECTION_FAILED'],
        action: 'WARN'
      };
    }
  }

  // SIMULATION: Track user behavior patterns
  static trackUserSession(session: UserSession): void {
    try {
      if (!session) {
        throw new Error('Session is undefined or null');
      }
      
      console.log(`[FRAUD_DETECTION] Tracking session: ${session.id}`);
      
      // Analyze mouse movement patterns for bot detection
      if (session.mouseMovements && session.mouseMovements.length > 10) {
        const movements = session.mouseMovements.slice(-10);
        const isLinear = this.detectLinearMouseMovement(movements);
        
        if (isLinear) {
          console.log(`[FRAUD_DETECTION] Suspicious linear mouse movement detected for session ${session.id}`);
        }
      }

      // Check for rapid-fire actions
      if (session.rbfAttempts > 10) {
        console.log(`[FRAUD_DETECTION] Excessive RBF attempts detected: ${session.rbfAttempts}`);
      }
    } catch (error) {
      ErrorHandler.handleError(
        `Failed to track user session: ${error}`,
        ErrorSeverity.WARNING,
        ErrorSource.DATA
      );
    }
  }

  // SIMULATION: Detect bot-like linear mouse movements
  private static detectLinearMouseMovement(movements: Array<{ x: number; y: number; timestamp: number }>): boolean {
    try {
      if (!movements || movements.length < 3) return false;

      let linearCount = 0;
      for (let i = 2; i < movements.length; i++) {
        const dx1 = movements[i-1].x - movements[i-2].x;
        const dy1 = movements[i-1].y - movements[i-2].y;
        const dx2 = movements[i].x - movements[i-1].x;
        const dy2 = movements[i].y - movements[i-1].y;

        // Check if movements are in the same direction (linear)
        if (Math.abs(dx1 - dx2) < 5 && Math.abs(dy1 - dy2) < 5) {
          linearCount++;
        }
      }

      return linearCount > movements.length * 0.7; // 70% linear movements
    } catch (error) {
      ErrorHandler.handleError(
        `Failed to detect linear mouse movement: ${error}`,
        ErrorSeverity.WARNING,
        ErrorSource.DATA
      );
      return false;
    }
  }

  // SIMULATION: Generate risk assessment report
  static generateRiskReport(transactions: FakeTransaction[]): {
    totalTransactions: number;
    highRiskCount: number;
    flaggedAddresses: string[];
    averageRiskScore: number;
  } {
    try {
      if (!transactions || !Array.isArray(transactions)) {
        throw new Error('Transactions must be a valid array');
      }
      
      if (transactions.length === 0) {
        return {
          totalTransactions: 0,
          highRiskCount: 0,
          flaggedAddresses: [],
          averageRiskScore: 0
        };
      }
      
      const riskScores = transactions.map(tx => this.detectScamPatterns(tx));
      const highRiskCount = riskScores.filter(score => score.score > 70).length;
      const flaggedAddresses = [...new Set(
        transactions
          .filter((_, index) => riskScores[index].score > 70)
          .flatMap(tx => [tx.inputAddress, tx.outputAddress])
      )];
      
      const averageRiskScore = riskScores.reduce((sum, score) => sum + score.score, 0) / riskScores.length;

      return {
        totalTransactions: transactions.length,
        highRiskCount,
        flaggedAddresses,
        averageRiskScore: Math.round(averageRiskScore)
      };
    } catch (error) {
      ErrorHandler.handleError(
        `Failed to generate risk report: ${error}`,
        ErrorSeverity.ERROR,
        ErrorSource.DATA
      );
      
      // Return safe defaults
      return {
        totalTransactions: transactions?.length || 0,
        highRiskCount: 0,
        flaggedAddresses: [],
        averageRiskScore: 50
      };
    }
  }
}