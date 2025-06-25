"use client";

// vendors
import React from "react";
import { motion } from "framer-motion";

// styles
import "./styles.scss";

// types
interface PlaceholderErrorProps {
  error: { message: string };
  onRetry: () => void;
}

function PlaceholderError({ error, onRetry }: PlaceholderErrorProps) {
  return (
    <div className="placeholder-error">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="error-card"
      >
        <div className="error-icon">⚠️</div>

        <h2>Error loading</h2>

        <p className="error-message">{error.message}</p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRetry}
          className="retry-button"
        >
          Try again
        </motion.button>
      </motion.div>
    </div>
  );
}

export default PlaceholderError;
