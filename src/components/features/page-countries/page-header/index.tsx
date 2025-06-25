"use client";

// vendors
import React from "react";
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";

// styles
import "./styles.scss";

// types
interface PageHeaderProps {
  totalCount: number;
  shownCount: number;
  searchTerm: string;
  searchLoading: boolean;
  onSearchChange: (value: string) => void;
}

function PageHeader({
  totalCount,
  shownCount,
  searchTerm,
  searchLoading,
  onSearchChange,
}: PageHeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="page-header"
    >
      <div className="header-content">
        <div className="header-main">
          <div className="title-section">
            <p>
              Total: <span className="total-count">{totalCount}</span>
              Shown: <span className="shown-count">{shownCount}</span>
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="search-container"
          >
            <div className="search-input-wrapper">
              <input
                type="text"
                placeholder="Search countries..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="search-input"
              />
              <div className="search-icon">
                {searchLoading ? (
                  <div className="search-spinner"></div>
                ) : (
                  <FaSearch />
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}

export default PageHeader;
