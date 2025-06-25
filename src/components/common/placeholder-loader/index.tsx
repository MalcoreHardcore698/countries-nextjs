"use client";

// vendors
import React from "react";
import { motion } from "framer-motion";

// styles
import "./styles.scss";

// types
interface PlaceholderLoaderProps {
  message?: string;
  subMessage?: string;
}

function PlaceholderLoader({
  message = "Loading",
  subMessage,
}: PlaceholderLoaderProps) {
  return (
    <div className="placeholder-loader">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="loading-card"
      >
        <div className="spinner-container">
          <div className="spinner"></div>
          <div className="spinner-inner"></div>
        </div>

        <p className="main-text">{message}</p>

        {subMessage && <p className="sub-text">{subMessage}</p>}
      </motion.div>
    </div>
  );
}

export default PlaceholderLoader;
