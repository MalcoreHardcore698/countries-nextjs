"use client";

// vendors
import React, { Component, ErrorInfo, ReactNode } from "react";
import { motion } from "framer-motion";

// styles
import "./styles.scss";

// types
interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    if (process.env.NODE_ENV === "development") {
      console.error("Error Boundary caught an error:", error, errorInfo);
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="error-boundary">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="error-container"
          >
            <div className="error-icon">💥</div>
            <h1 className="error-title">Something went wrong</h1>
            <p className="error-message">
              An unexpected error occurred. Please try refreshing the page or
              return later.
            </p>

            {process.env.NODE_ENV === "development" && this.state.error && (
              <details className="error-details">
                <summary className="details-summary">
                  Error details (only in development mode)
                </summary>
                <div className="details-content">
                  <p className="error-name">
                    {this.state.error.name}: {this.state.error.message}
                  </p>
                  <pre className="error-stack">{this.state.error.stack}</pre>
                </div>
              </details>
            )}

            <div className="error-actions">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={this.handleReset}
                className="action-button retry-button"
              >
                Try again
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => (window.location.href = "/")}
                className="action-button home-button"
              >
                Back to home
              </motion.button>
            </div>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
