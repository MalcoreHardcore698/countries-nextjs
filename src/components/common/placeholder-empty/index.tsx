"use client";

// vendors
import React from "react";
import { motion } from "framer-motion";

// styles
import "./styles.scss";

// types
interface PlaceholderEmptyProps {
  searchTerm: string;
}

function PlaceholderEmpty({ searchTerm }: PlaceholderEmptyProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="placeholder-empty"
    >
      <div className="empty-state-card">
        <div className="emoji">🔍</div>

        <h3>Nothing found</h3>

        <p>
          {searchTerm
            ? "Try changing the search query"
            : "No countries available to display"}
        </p>
      </div>
    </motion.div>
  );
}

export default PlaceholderEmpty;
