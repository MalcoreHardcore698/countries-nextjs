"use client";

// vendors
import React from "react";
import { motion } from "framer-motion";

// components
import PageDetails from "./page-details";
import PageNavigation from "./page-navigation";

// styles
import "./styles.scss";

// types
import { Country } from "@/types/country";

interface PageCountryProps {
  country: Country;
}

function PageCountry({ country }: PageCountryProps) {
  return (
    <div className="page-country">
      <div className="page-country__container">
        <PageNavigation />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="page-country__card"
        >
          <PageDetails country={country} />
        </motion.div>
      </div>
    </div>
  );
}

export default PageCountry;
