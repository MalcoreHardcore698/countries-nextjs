"use client";

// vendors
import React from "react";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa6";
import Link from "next/link";

// styles
import "./styles.scss";

function Navigation() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="back-navigation"
    >
      <Link href="/" className="back-link">
        <FaArrowLeft />
        Back to list
      </Link>
    </motion.div>
  );
}

export default Navigation;
