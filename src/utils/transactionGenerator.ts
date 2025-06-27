// SIMULATION: Fake transaction generation utilities for forensic testing

import type { FakeTransaction } from '../types';
import { ErrorHandler, ErrorSeverity, ErrorSource } from './errorHandler';

export class TransactionGenerator {
  private static readonly BTC_PREFIXES = ['1', '3', 'bc1'];
  private static readonly ETH_PREFIX = '0x';
  
  // SIMULATION: Generate forensic-valid fake transactions
  static generateFakeTransaction(coin: 'BTC' | 'ETH' = 'BTC'): FakeTransaction {
    try {
      const txid = this.generateTxId(coin);
      const value = Math.random() * 10; // Random value up to 10 BTC/ETH
      const fee = this.calculateRealisticFee(value, coin);
      
      return {
        txid,
        inputAddress: this.generateFakeAddress(coin, 'input'),
        outputAddress: this.generateFakeAddress(coin, 'output'),
        value: parseFloat(value.toFixed(8)),
        fee: parseFloat(fee.toFixed(8)),
        timestamp: Date.now(),
        status: 'pending',
        confirmations: 0,
        coin,
        mempoolDelay: Math.floor(Math.random() * 28) + 2, // 2-30 seconds
        rbfEnabled: Math.random() > 0.3 // 70% chance of RBF enabled
      };
    } catch (error) {
      ErrorHandler.handleError(
        error instanceof Error ? error : new Error(`Failed to generate fake transaction: ${error}`),
        ErrorSeverity.ERROR,
        ErrorSource.DATA
      );
      
      // Return a fallback transaction to prevent UI crashes
      return {
        txid: `error-${Date.now()}`,
        inputAddress: coin === 'BTC' ? '1ErrorAddress' : '0xErrorAddress',
        outputAddress: coin === 'BTC' ? '1ErrorAddress' : '0xErrorAddress',
        value: 0.1,
        fee: 0.001,
        timestamp: Date.now(),
        status: 'pending',
        confirmations: 0,
        coin,
        mempoolDelay: 5,
        rbfEnabled: false
      };
    }
  }

  // SIMULATION: Generate realistic transaction IDs
  private static generateTxId(coin: 'BTC' | 'ETH'): string {
    try {
      const chars = '0123456789abcdef';
      if (coin === 'BTC') {
        return Array.from({ length: 64 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
      } else {
        return this.ETH_PREFIX + Array.from({ length: 64 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
      }
    } catch (error) {
      ErrorHandler.handleError(
        `Failed to generate transaction ID: ${error}`,
        ErrorSeverity.WARNING,
        ErrorSource.DATA
      );
      return coin === 'BTC' ? 
        '0000000000000000000000000000000000000000000000000000000000000000' : 
        '0x0000000000000000000000000000000000000000000000000000000000000000';
    }
  }

  // SIMULATION: Generate fake but realistic-looking addresses
  private static generateFakeAddress(coin: 'BTC' | 'ETH', type: 'input' | 'output'): string {
    try {
      const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
      
      if (coin === 'BTC') {
        const prefix = this.BTC_PREFIXES[Math.floor(Math.random() * this.BTC_PREFIXES.length)];
        const length = prefix === 'bc1' ? 42 : 34;
        const address = Array.from({ length: length - prefix.length }, () => 
          chars[Math.floor(Math.random() * chars.length)]
        ).join('');
        return prefix + address;
      } else {
        return this.ETH_PREFIX + Array.from({ length: 40 }, () => 
          '0123456789abcdef'[Math.floor(Math.random() * 16)]
        ).join('');
      }
    } catch (error) {
      ErrorHandler.handleError(
        `Failed to generate address: ${error}`,
        ErrorSeverity.WARNING,
        ErrorSource.DATA
      );
      return coin === 'BTC' ? '1DefaultAddress123456789012345678901234' : '0xDefaultAddress00000000000000000000000000000000';
    }
  }

  // SIMULATION: Calculate realistic fee based on network conditions
  private static calculateRealisticFee(value: number, coin: 'BTC' | 'ETH'): number {
    try {
      if (coin === 'BTC') {
        // BTC fees typically 0.0001 to 0.001 BTC
        return Math.random() * 0.0009 + 0.0001;
      } else {
        // ETH fees in ETH equivalent
        return Math.random() * 0.01 + 0.001;
      }
    } catch (error) {
      ErrorHandler.handleError(
        `Failed to calculate fee: ${error}`,
        ErrorSeverity.WARNING,
        ErrorSource.DATA
      );
      return coin === 'BTC' ? 0.0005 : 0.005; // Default fallback fees
    }
  }

  // SIMULATION: Simulate RBF fee bump (15% increase)
  static generateRBFTransaction(originalTx: FakeTransaction): FakeTransaction {
    try {
      if (!originalTx) {
        throw new Error('Original transaction is undefined or null');
      }
      
      const newFee = originalTx.fee * 1.15; // 15% fee increase for RBF
      
      return {
        ...originalTx,
        txid: this.generateTxId(originalTx.coin),
        fee: parseFloat(newFee.toFixed(8)),
        timestamp: Date.now(),
        status: 'pending',
        confirmations: 0
      };
    } catch (error) {
      ErrorHandler.handleError(
        `Failed to generate RBF transaction: ${error}`,
        ErrorSeverity.ERROR,
        ErrorSource.DATA
      );
      
      // Return a copy of the original transaction with minimal changes to prevent UI crashes
      return {
        ...originalTx,
        fee: originalTx.fee * 1.1,
        timestamp: Date.now()
      };
    }
  }
}