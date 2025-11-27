/**
 * Error Tracking Utility
 * Centralized error logging and tracking
 * Integrated with CodeRabbit for error debugging
 */

interface ErrorContext {
  userId?: string;
  path?: string;
  userAgent?: string;
  componentStack?: string | null;
  errorBoundary?: boolean;
  [key: string]: any;
}

class ErrorTracker {
  private isProduction = process.env.NODE_ENV === 'production';
  private errorTrackingEnabled = process.env.NEXT_PUBLIC_ERROR_TRACKING_ENABLED === 'true';

  /**
   * Log an error with context
   * Enhanced for CodeRabbit debugging
   */
  logError(error: Error | unknown, context?: ErrorContext): void {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : undefined;
    const errorName = error instanceof Error ? error.name : 'UnknownError';

    // Enhanced error object for debugging
    const errorData = {
      name: errorName,
      message: errorMessage,
      stack: errorStack,
      context: {
        ...context,
        timestamp: new Date().toISOString(),
        environment: this.isProduction ? 'production' : 'development',
        url: typeof window !== 'undefined' ? window.location.href : undefined,
      },
    };

    // In production, send to error tracking service
    if (this.isProduction && this.errorTrackingEnabled) {
      // TODO: Integrate with error tracking service (Sentry, LogRocket, etc.)
      // Example: Sentry.captureException(error, { extra: context });
      
      // Structured error logging for CodeRabbit analysis
      console.error('[ERROR]', JSON.stringify(errorData, null, 2));
    } else {
      // In development, use detailed console.error for debugging
      console.error('🔴 [ERROR TRACKER]', {
        name: errorName,
        message: errorMessage,
        stack: errorStack,
        ...errorData.context,
      });
      
      // Also log stack trace separately for better readability
      if (errorStack) {
        console.error('📍 Stack Trace:', errorStack);
      }
    }
  }

  /**
   * Log a warning
   */
  logWarning(message: string, context?: ErrorContext): void {
    if (this.isProduction && this.errorTrackingEnabled) {
      // TODO: Send to error tracking service
      console.warn('[WARNING]', { message, context, timestamp: new Date().toISOString() });
    } else {
      console.warn('Warning:', message, context);
    }
  }

  /**
   * Log info (for debugging)
   */
  logInfo(message: string, context?: ErrorContext): void {
    if (!this.isProduction) {
      console.log('ℹ️ [INFO]', message, context);
    }
  }

  /**
   * Log debug information (only in development)
   * Useful for CodeRabbit debugging
   */
  logDebug(message: string, context?: ErrorContext): void {
    if (!this.isProduction && process.env.NEXT_PUBLIC_DEBUG === 'true') {
      console.debug('🐛 [DEBUG]', message, context);
    }
  }

  /**
   * Track performance metrics
   */
  logPerformance(metric: string, duration: number, context?: ErrorContext): void {
    if (this.isProduction && this.errorTrackingEnabled) {
      console.log('[PERFORMANCE]', {
        metric,
        duration,
        context,
        timestamp: new Date().toISOString(),
      });
    } else if (!this.isProduction) {
      console.log('⚡ [PERFORMANCE]', metric, `${duration}ms`, context);
    }
  }
}

// Export singleton instance
export const errorTracker = new ErrorTracker();

/**
 * Convenience function for logging errors
 */
export function logError(error: Error | unknown, context?: ErrorContext): void {
  errorTracker.logError(error, context);
}

/**
 * Convenience function for logging warnings
 */
export function logWarning(message: string, context?: ErrorContext): void {
  errorTracker.logWarning(message, context);
}

/**
 * Convenience function for logging info
 */
export function logInfo(message: string, context?: ErrorContext): void {
  errorTracker.logInfo(message, context);
}

/**
 * Convenience function for logging debug information
 */
export function logDebug(message: string, context?: ErrorContext): void {
  errorTracker.logDebug(message, context);
}

/**
 * Convenience function for logging performance metrics
 */
export function logPerformance(metric: string, duration: number, context?: ErrorContext): void {
  errorTracker.logPerformance(metric, duration, context);
}

