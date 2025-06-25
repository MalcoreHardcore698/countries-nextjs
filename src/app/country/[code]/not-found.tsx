"use client";

// vendors
import React from "react";
import { useRouter } from "next/navigation";

// components
import PlaceholderError from "@/components/common/placeholder-error";

function NotFound() {
  const router = useRouter();

  const handleRetry = () => {
    router.push("/");
  };

  return (
    <PlaceholderError
      error={{ message: "Country not found" }}
      onRetry={handleRetry}
    />
  );
}

export default NotFound;
