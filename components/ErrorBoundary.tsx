'use client';

import { Component, ReactNode } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { errorTracker } from '@/lib/errorTracking';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  /**
  * Logs errors and metadata when a child component throws, using errorTracker for diagnostics.
  * @example
  * componentDidCatch(error, errorInfo)
  * undefined
  * @param {{Error}} {{error}} - Error object thrown by a child component.
  * @param {{React.ErrorInfo}} {{errorInfo}} - Additional React error info including component stack.
  * @returns {{void}} Void return value.
  **/
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Use errorTracker for proper error logging and debugging
    const path = typeof window !== 'undefined' ? (window.location.pathname || undefined) : undefined;
    const userAgent = typeof window !== 'undefined' ? (window.navigator.userAgent || undefined) : undefined;
    
    errorTracker.logError(error, {
      componentStack: errorInfo.componentStack || undefined,
      errorBoundary: true,
      path,
      userAgent,
    });
  }

  /**
  * ErrorBoundary stops errors in its children from crashing the whole app by showing a friendly fallback UI, tracking hasError and error state internally and offering a manual refresh flow.
  * @component
  * @example
  *   <ErrorBoundary fallback={<FallbackComponent />} />
  * @prop {{React.ReactNode}} children - Primary content to display when no rendering error has occurred.
  * @prop {{React.ReactNode}} [fallback] - Optional custom UI to show when an error has been caught; if omitted a default centered message with a refresh button appears.
  */
  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="max-w-md w-full text-center">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <AlertCircle className="size-16 text-red-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
              <p className="text-gray-600 mb-6">
                We&apos;re sorry, but something unexpected happened. Please try refreshing the page.
              </p>
              <button
                onClick={() => {
                  this.setState({ hasError: false, error: undefined });
                  window.location.reload();
                }}
                className="inline-flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
              >
                <RefreshCw className="size-5" />
                <span>Refresh Page</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

