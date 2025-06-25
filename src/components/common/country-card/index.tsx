"use client";

// vendors
import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

// constants
const DEFAULT_FLAG_URL = "https://placeholder.co/150x100";

// styles
import "./styles.scss";

// types
import { Country } from "@/types/country";

interface CountryCardProps {
  country: Country;
  onRemove: (isoCode2: string) => void;
}

function CountryCard({ country, onRemove }: CountryCardProps) {
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = () => {
    setIsRemoving(true);
  };

  const onAnimationComplete = () => {
    if (isRemoving) {
      onRemove(country.isoCode2);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 1 }}
      animate={{
        opacity: isRemoving ? 0 : 1,
        x: isRemoving ? 50 : 0,
      }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      onAnimationComplete={onAnimationComplete}
      className="country-card-motion"
    >
      <div className="country-card">
        <Image
          src={country.flagUrl || DEFAULT_FLAG_URL}
          alt={country.nameRu || "Flag"}
          width={24}
          height={16}
          className="country-card__flag"
          fetchPriority="high"
          loading="eager"
        />

        <span className="country-card__name">{country.nameRu}</span>

        <div className="country-card__actions">
          <Link href={`/country/${country.isoCode2}`} passHref>
            <button className="country-card__button country-card__button--view">
              View
            </button>
          </Link>

          <button
            onClick={handleRemove}
            className="country-card__button country-card__button--delete"
            disabled={isRemoving}
          >
            Delete
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default CountryCard;
