import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ErrorHandler, ErrorSeverity, ErrorSource, ErrorBoundary } from './utils/errorHandler';

// Global error handler for uncaught exceptions
window.addEventListener('error', (event) => {
  ErrorHandler.handleError(
    event.error || new Error(event.message),
    ErrorSeverity.ERROR,
    ErrorSource.UNKNOWN,
    { 
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno
    }
  );
});

// Global error handler for unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  ErrorHandler.handleError(
    event.reason instanceof Error ? event.reason : new Error(String(event.reason)),
    ErrorSeverity.ERROR,
    ErrorSource.UNKNOWN,
    { type: 'unhandledRejection' }
  );
});

try {
  const rootElement = document.getElementById('root');
  
  if (!rootElement) {
    throw new Error('Root element not found');
  }
  
  createRoot(rootElement).render(
    <StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StrictMode>
  );
} catch (error) {
  ErrorHandler.handleError(
    error instanceof Error ? error : new Error(`Failed to render app: ${error}`),
    ErrorSeverity.CRITICAL,
    ErrorSource.UI
  );
  
  // Fallback rendering in case of critical error
  const rootElement = document.getElementById('root');
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="padding: 20px; background-color: #fee2e2; border: 1px solid #ef4444; border-radius: 8px; margin: 20px;">
        <h2 style="color: #b91c1c; font-size: 18px; margin-bottom: 10px;">Application Error</h2>
        <p style="color: #7f1d1d;">The application failed to start. Please refresh the page or contact support if the issue persists.</p>
      </div>
    `;
  }
}