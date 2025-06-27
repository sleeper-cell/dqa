import { toast } from 'react-hot-toast';
import React from 'react';

// Error severity levels
export enum ErrorSeverity {
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
  CRITICAL = 'critical'
}

// Error source categories
export enum ErrorSource {
  API = 'api',
  UI = 'ui',
  DATA = 'data',
  NETWORK = 'network',
  AUTHENTICATION = 'auth',
  UNKNOWN = 'unknown'
}

// Error interface
export interface AppError {
  message: string;
  severity: ErrorSeverity;
  source: ErrorSource;
  timestamp: Date;
  data?: any;
  stack?: string;
}

// Global error handler
export class ErrorHandler {
  private static errors: AppError[] = [];
  private static maxErrorsStored = 100;
  private static isReportingEnabled = true;

  // Log and handle errors
  static handleError(
    error: Error | string,
    severity: ErrorSeverity = ErrorSeverity.ERROR,
    source: ErrorSource = ErrorSource.UNKNOWN,
    data?: any
  ): AppError {
    const errorMessage = typeof error === 'string' ? error : error.message;
    const stack = typeof error === 'string' ? undefined : error.stack;
    
    const appError: AppError = {
      message: errorMessage,
      severity,
      source,
      timestamp: new Date(),
      data,
      stack
    };

    // Store error in history
    this.errors.unshift(appError);
    
    // Trim error history if needed
    if (this.errors.length > this.maxErrorsStored) {
      this.errors = this.errors.slice(0, this.maxErrorsStored);
    }

    // Log to console
    this.logError(appError);
    
    // Display UI notification based on severity
    this.notifyUser(appError);
    
    // Report to monitoring service if enabled and critical
    if (this.isReportingEnabled && severity === ErrorSeverity.CRITICAL) {
      this.reportError(appError);
    }

    return appError;
  }

  // Get error history
  static getErrorHistory(): AppError[] {
    return [...this.errors];
  }

  // Clear error history
  static clearErrorHistory(): void {
    this.errors = [];
  }

  // Log error to console with appropriate formatting
  private static logError(error: AppError): void {
    const timestamp = error.timestamp.toISOString();
    const prefix = `[${timestamp}] [${error.severity.toUpperCase()}] [${error.source}]`;
    
    switch (error.severity) {
      case ErrorSeverity.CRITICAL:
        console.error(`${prefix} ${error.message}`, error.data || '', error.stack || '');
        break;
      case ErrorSeverity.ERROR:
        console.error(`${prefix} ${error.message}`, error.data || '');
        break;
      case ErrorSeverity.WARNING:
        console.warn(`${prefix} ${error.message}`, error.data || '');
        break;
      default:
        console.info(`${prefix} ${error.message}`, error.data || '');
    }
  }

  // Display user notification
  private static notifyUser(error: AppError): void {
    try {
      // Only show UI notifications for warnings and above
      if (error.severity === ErrorSeverity.INFO) {
        return;
      }

      // Use toast for notifications if available
      if (typeof toast !== 'undefined') {
        switch (error.severity) {
          case ErrorSeverity.CRITICAL:
          case ErrorSeverity.ERROR:
            toast.error(error.message);
            break;
          case ErrorSeverity.WARNING:
            toast.warning(error.message);
            break;
          default:
            toast(error.message);
        }
      } else {
        // Fallback if toast is not available
        if (error.severity === ErrorSeverity.CRITICAL || error.severity === ErrorSeverity.ERROR) {
          console.error(`Error: ${error.message}`);
        }
      }
    } catch (e) {
      // Fallback if notification fails
      console.error('Failed to show notification:', e);
    }
  }

  // Report error to monitoring service
  private static reportError(error: AppError): void {
    // Simulate error reporting to a monitoring service
    console.log(`[ERROR REPORTING] Would send to monitoring service:`, error);
    
    // In a real implementation, you would send to a service like Sentry
    // if (typeof Sentry !== 'undefined') {
    //   Sentry.captureException(error);
    // }
  }

  // Wrap async function with error handling
  static async wrapAsync<T>(
    fn: () => Promise<T>,
    errorMessage: string = 'Operation failed',
    severity: ErrorSeverity = ErrorSeverity.ERROR,
    source: ErrorSource = ErrorSource.UNKNOWN
  ): Promise<T | null> {
    try {
      return await fn();
    } catch (error) {
      this.handleError(
        error instanceof Error ? error : new Error(`${errorMessage}: ${error}`),
        severity,
        source
      );
      return null;
    }
  }

  // Wrap synchronous function with error handling
  static wrapSync<T>(
    fn: () => T,
    errorMessage: string = 'Operation failed',
    severity: ErrorSeverity = ErrorSeverity.ERROR,
    source: ErrorSource = ErrorSource.UNKNOWN
  ): T | null {
    try {
      return fn();
    } catch (error) {
      this.handleError(
        error instanceof Error ? error : new Error(`${errorMessage}: ${error}`),
        severity,
        source
      );
      return null;
    }
  }
}

// React error boundary component
export class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback?: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    ErrorHandler.handleError(
      error,
      ErrorSeverity.ERROR,
      ErrorSource.UI,
      { componentStack: errorInfo.componentStack }
    );
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <h3 className="text-lg font-semibold text-red-800 mb-2">Something went wrong</h3>
          <p className="text-red-600">
            An error occurred in this component. Please try refreshing the page.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

// Utility function to safely parse JSON
export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json) as T;
  } catch (error) {
    ErrorHandler.handleError(
      `Failed to parse JSON: ${error}`,
      ErrorSeverity.WARNING,
      ErrorSource.DATA
    );
    return fallback;
  }
}

// Utility function to safely access nested object properties
export function safeGet<T>(obj: any, path: string, defaultValue: T): T {
  try {
    const keys = path.split('.');
    let result = obj;
    
    for (const key of keys) {
      if (result === undefined || result === null) {
        return defaultValue;
      }
      result = result[key];
    }
    
    return (result === undefined || result === null) ? defaultValue : result as T;
  } catch (error) {
    ErrorHandler.handleError(
      `Failed to access property path ${path}: ${error}`,
      ErrorSeverity.WARNING,
      ErrorSource.DATA
    );
    return defaultValue;
  }
}

// Utility function for safe API calls
export async function safeApiCall<T>(
  apiCall: () => Promise<T>,
  errorMessage: string = 'API call failed',
  defaultValue?: T
): Promise<T | undefined> {
  try {
    return await apiCall();
  } catch (error) {
    ErrorHandler.handleError(
      error instanceof Error ? error : new Error(`${errorMessage}: ${error}`),
      ErrorSeverity.ERROR,
      ErrorSource.API
    );
    return defaultValue;
  }
}