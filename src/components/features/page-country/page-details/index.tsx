"use client";

// vendors
import React from "react";
import { motion } from "framer-motion";
import { FaBarcode, FaFlag } from "react-icons/fa6";
import Image from "next/image";

// types
import { Country } from "@/types/country";

// styles
import "./styles.scss";

// types
interface PageDetailsProps {
  country: Country;
}

function PageDetails({ country }: PageDetailsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="page-details"
    >
      <div className="page-details__card">
        <div className="page-details__card-header">
          <FaFlag className="page-details__card-icon blue" />
          <h3 className="page-details__card-title">Flag</h3>
        </div>

        <div className="page-details__card-content">
          <div className="page-details__flag-image-container">
            {country.flagUrl ? (
              <Image
                src={country.flagUrl}
                alt={`Flag of ${country.nameRu}`}
                fill
                className="flag-image"
                sizes="(max-width: 384px) 100vw, 384px"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                }}
              />
            ) : (
              <div className="flag-placeholder">No flag</div>
            )}
          </div>
        </div>
      </div>

      <div className="page-details__card">
        <div className="page-details__card-header">
          <FaBarcode className="page-details__card-icon green" />
          <h3 className="page-details__card-title">ISO codes</h3>
        </div>

        <div className="page-details__card-content">
          <div className="page-details__info-row">
            <span className="page-details__label">ISO Alpha-2:</span>
            <span className="page-details__value blue">{country.isoCode2}</span>
          </div>

          <div className="page-details__info-row">
            <span className="page-details__label">ISO Alpha-3:</span>
            <span className="page-details__value green">
              {country.isoCode3}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default PageDetails;
